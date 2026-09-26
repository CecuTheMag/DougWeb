"use client";

import { useEffect, useReducer, useRef, useState, useSyncExternalStore } from "react";
import { scenarios, type Scenario } from "@/content/transcripts";
import styles from "./Transcript.module.css";

const CHAR_MS = 26; // roughly the pace of someone talking
const HOLD_MS = 2600; // how long a finished call stays on screen

interface Progress {
  line: number; // index of the line being typed
  chars: number; // characters typed on that line
  waiting: boolean; // pause before the line starts
}

interface State {
  index: number;
  progress: Progress;
  done: boolean;
  seconds: number;
}

const START: Progress = { line: 0, chars: 0, waiting: true };
const INITIAL: State = { index: 0, progress: START, done: false, seconds: 0 };

type Action = "tick" | "next" | "second";

/** Advance the conversation by exactly one step. */
function reducer(state: State, action: Action): State {
  if (action === "second") return { ...state, seconds: state.seconds + 1 };
  if (action === "next" || state.done) {
    return { ...INITIAL, index: (state.index + 1) % scenarios.length };
  }
  const { progress } = state;
  const line = scenarios[state.index].lines[progress.line];
  if (!line) return { ...state, done: true };
  if (progress.waiting) return { ...state, progress: { ...progress, waiting: false } };
  if (progress.chars < line.text.length) return { ...state, progress: { ...progress, chars: progress.chars + 1 } };
  const nextLine = progress.line + 1;
  const finished = nextLine >= scenarios[state.index].lines.length;
  return { ...state, progress: { line: nextLine, chars: 0, waiting: !finished }, done: finished };
}

/** How long to wait before the next step. */
function delayFor(state: State): number {
  if (state.done) return HOLD_MS;
  const line = scenarios[state.index].lines[state.progress.line];
  if (!line) return 0;
  return state.progress.waiting ? line.after : CHAR_MS;
}

const motionQuery = "(prefers-reduced-motion: reduce)";
function subscribeMotion(cb: () => void) {
  const mq = window.matchMedia(motionQuery);
  mq.addEventListener("change", cb);
  return () => mq.removeEventListener("change", cb);
}

type Phase = "ssr" | "typing" | "done" | "static";

export function Transcript() {
  const [state, dispatch] = useReducer(reducer, INITIAL);
  const [paused, setPaused] = useState(false);
  const [visible, setVisible] = useState(true);
  const root = useRef<HTMLDivElement>(null);

  // null on the server; true/false once we know the visitor's preference.
  const reduced = useSyncExternalStore(
    subscribeMotion,
    () => window.matchMedia(motionQuery).matches,
    () => null,
  );

  const phase: Phase = reduced === null ? "ssr" : reduced ? "static" : state.done ? "done" : "typing";
  const { index, progress, seconds } = state;
  const running = (phase === "typing" || phase === "done") && !paused && visible;

  // Stop working when nobody can see it.
  useEffect(() => {
    const el = root.current;
    if (!el || !("IntersectionObserver" in window)) return;
    const io = new IntersectionObserver(([e]) => setVisible(e.isIntersecting));
    io.observe(el);
    const onVis = () => setVisible(document.visibilityState === "visible");
    document.addEventListener("visibilitychange", onVis);
    return () => {
      io.disconnect();
      document.removeEventListener("visibilitychange", onVis);
    };
  }, []);

  // The typing clock: one timer per step.
  useEffect(() => {
    if (!running) return;
    const t = setTimeout(() => dispatch("tick"), delayFor(state));
    return () => clearTimeout(t);
  }, [running, state]);

  // The call timer, which only ticks while the call is "live".
  useEffect(() => {
    if (!running || phase !== "typing") return;
    const t = setInterval(() => dispatch("second"), 1000);
    return () => clearInterval(t);
  }, [running, phase]);

  const next = () => dispatch("next");

  const animated = phase === "typing" || phase === "done";

  return (
    <figure className={styles.figure}>
      <div ref={root} className={styles.panel} data-phase={phase} aria-hidden="true">
        <div className={styles.bar}>
          <span className={styles.live}>
            <span className={styles.dot} data-on={phase === "typing" && !paused} />
            {phase === "done" || phase === "static" ? "Call ended" : "Live call"}
          </span>
          <span className="num">{animated ? formatTime(seconds) : "0:12"}</span>
        </div>
        <div className={styles.stack}>
          {scenarios.map((s, i) => (
            <Call
              key={s.id}
              scenario={s}
              active={i === index}
              progress={animated && i === index ? progress : null}
              finished={i !== index || phase === "done" || phase === "static" || phase === "ssr"}
            />
          ))}
        </div>
      </div>
      <figcaption className={styles.caption}>
        <span>Examples of the three outcomes, not recordings.</span>
        {phase === "static" ? (
          <button type="button" className={styles.control} onClick={next}>
            Next example
          </button>
        ) : (
          <button
            type="button"
            className={styles.control}
            onClick={() => setPaused((p) => !p)}
            aria-pressed={paused}
          >
            {paused ? "Play" : "Pause"}
            <span className="sr-only"> the example calls</span>
          </button>
        )}
      </figcaption>
      <div className="sr-only">
        {scenarios.map((s) => (
          <p key={s.id}>
            {s.lines.map((l) => `${l.who === "doug" ? "Doug" : "Caller"}: ${l.text}`).join(" ")} Outcome:{" "}
            {s.chip}.
          </p>
        ))}
      </div>
    </figure>
  );
}

function Call({
  scenario,
  active,
  progress,
  finished,
}: {
  scenario: Scenario;
  active: boolean;
  progress: Progress | null;
  finished: boolean;
}) {
  const showAll = !progress || finished;
  return (
    <div className={styles.call} data-active={active}>
      <p className={styles.from}>{scenario.caller}</p>
      <ol className={styles.lines}>
        {scenario.lines.map((line, i) => {
          let typed = line.text.length;
          let thinking = false;
          if (!showAll && progress) {
            if (i > progress.line) typed = 0;
            else if (i === progress.line) {
              typed = progress.chars;
              thinking = progress.waiting && line.who === "doug";
            }
          }
          const started = showAll || (progress !== null && (i < progress.line || (i === progress.line && !progress.waiting)));
          return (
            <li key={i} className={styles.line} data-who={line.who} data-started={started}>
              <span className={styles.who}>
                {line.who === "doug" ? "Doug" : "Caller"}
                {thinking && <span className={styles.thinking} />}
              </span>
              <span className={styles.text}>
                <span>{line.text.slice(0, typed)}</span>
                <span className={styles.ghost}>{line.text.slice(typed)}</span>
              </span>
            </li>
          );
        })}
      </ol>
      <p
        className={styles.chip}
        data-outcome={scenario.outcome}
        data-shown={showAll || (progress !== null && progress.line >= scenario.lines.length)}
      >
        {scenario.chip}
      </p>
    </div>
  );
}

function formatTime(s: number) {
  return `${Math.floor(s / 60)}:${String(s % 60).padStart(2, "0")}`;
}
