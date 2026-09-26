import type { CSSProperties } from "react";
import { faqs } from "@/content/faq";
import { budget, measured } from "@/content/latency";
import { founding, pilot, plans } from "@/content/pricing";
import { founder } from "@/content/site";
import { Calculator } from "./Calculator";
import { Cta } from "./Cta";
import { HearDoug } from "./HearDoug";
import s from "./Sections.module.css";

const stagger = (i: number) => ({ "--i": i }) as CSSProperties;

function Heading({ id, eyebrow, children }: { id: string; eyebrow: string; children: React.ReactNode }) {
  return (
    <header className={s.head}>
      <p className="eyebrow" data-reveal>
        {eyebrow}
      </p>
      <h2 id={id} className="display h2" data-reveal style={stagger(1)}>
        {children}
      </h2>
    </header>
  );
}

/* 2 — The cost of a missed call ------------------------------------------ */

export function Cost() {
  return (
    <section className="section" aria-labelledby="cost-title">
      <div className="wrap grid">
        <Heading id="cost-title" eyebrow="The cost of a missed call">
          You never see the calls you lose. <em className={s.quiet}>That&rsquo;s what makes them expensive.</em>
        </Heading>
        <div className={s.wide} data-reveal style={stagger(2)}>
          <Calculator />
        </div>
      </div>
    </section>
  );
}

/* 3 — How it works -------------------------------------------------------- */

const steps = [
  {
    title: "Forward your calls",
    body: "Keep your number and your phone. Your phone still rings first. If you decline a call, don’t answer, or have no signal, your carrier passes it on to your Doug line. That’s conditional call forwarding: a one-time setting or short dial code, and you can switch it off just as quickly.",
  },
  {
    title: "Doug answers and screens",
    body: "It says who it is, asks who’s calling and what it’s about, and applies your rules. VIPs skip the questions, blocked numbers never get through, and everyone else is screened in a short, polite conversation.",
  },
  {
    title: "You get the important ones",
    body: "Urgent callers are put straight through to you. Everyone else leaves a clean message with a callback number. Right after each call you get a summary by email and text: who called, what they want, how urgent it is, and what to do next.",
  },
];

export function HowItWorks() {
  return (
    <section id="how" className="section" aria-labelledby="how-title">
      <div className="wrap grid">
        <Heading id="how-title" eyebrow="How it works">
          Three steps. <em className={s.quiet}>One of them is yours.</em>
        </Heading>
        <ol className={s.steps}>
          {steps.map((step, i) => (
            <li key={step.title} className={s.step} data-reveal style={stagger(i)}>
              <span className={`display num ${s.stepNum}`} aria-hidden="true">
                0{i + 1}
              </span>
              <h3 className="h3">{step.title}</h3>
              <p className="muted">{step.body}</p>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}

/* 4 — Two ways to use Doug ------------------------------------------------- */

const personas = [
  {
    id: "personal",
    name: "Personal",
    who: "Founders, agents, consultants",
    line: "Protect your attention.",
    body: [
      "Doug is your gatekeeper. The people you mark as VIPs ring straight through during your hours. Everyone else is asked who they are and what they need, and only the urgent ones interrupt you.",
      "After hours your phone stays quiet. Callers can leave a voicemail, and you read the summary when you’re ready.",
    ],
  },
  {
    id: "business",
    name: "Business",
    who: "Clinics, contractors, studios",
    line: "Never lose a customer after hours.",
    body: [
      "Doug is your receptionist. It answers every call, including at nine at night, and answers questions from the details you give it. It never invents prices, availability or policies.",
      "Whatever the caller needs, Doug makes sure you have their name and a number to call back. While you’re closed it can’t put anyone through, so it takes a complete message instead.",
    ],
  },
];

export function Personas() {
  return (
    <section className="section" aria-labelledby="personas-title">
      <div className="wrap grid">
        <Heading id="personas-title" eyebrow="Two ways to use Doug">
          One assistant. <em className={s.quiet}>Two jobs.</em>
        </Heading>
        {personas.map((p, i) => (
          <article key={p.id} className={i === 0 ? s.personaA : s.personaB} data-reveal style={stagger(i)}>
            <p className="eyebrow">
              {p.name} · {p.who}
            </p>
            <h3 className={`display ${s.personaLine}`}>{p.line}</h3>
            <div className="prose muted">
              {p.body.map((para) => (
                <p key={para}>{para}</p>
              ))}
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}

/* 5 — The rules Doug lives by (each one is enforced in doug/agent) --------- */

const rules = [
  {
    rule: "When in doubt, take a message.",
    why: "A missed message is easy to recover. An unnecessary interruption isn’t. Doug is built to lean one way.",
  },
  {
    rule: "It can’t put a call through that it isn’t allowed to.",
    why: "Outside your hours, the ability to transfer is taken away, not just discouraged. A caller insisting it’s an emergency can’t talk Doug into it.",
  },
  {
    rule: "It says it’s an AI.",
    why: "It tells every caller up front that it’s an AI assistant, never claims to be you, and says so again to anyone who asks.",
  },
  {
    rule: "Your VIPs skip the line.",
    why: "Numbers you mark as VIP ring straight through during your hours, without being screened. Blocked numbers never ring at all.",
  },
];

export function Rules() {
  return (
    <section className="section" aria-labelledby="rules-title">
      <div className="wrap grid">
        <Heading id="rules-title" eyebrow="The rules Doug lives by">
          Written into the code, <em className={s.quiet}>not just the script.</em>
        </Heading>
        <ol className={s.rules}>
          {rules.map((r, i) => (
            <li key={r.rule} className={s.rule} data-reveal style={stagger(i)}>
              <p className={`display ${s.ruleText}`}>{r.rule}</p>
              <p className={`muted ${s.ruleWhy}`}>{r.why}</p>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}

/* 6 — Speed ----------------------------------------------------------------- */

export function Speed() {
  const total = budget.reduce((sum, st) => sum + st.ms, 0);
  return (
    <section id="hear" className="section" aria-labelledby="speed-title">
      <div className="wrap grid">
        <Heading id="speed-title" eyebrow="Speed">
          It answers like a person would. <em className={s.quiet}>Not like a phone menu.</em>
        </Heading>
        <div className={s.speedCopy} data-reveal style={stagger(2)}>
          {measured ? (
            <p className="lede">
              Measured on <span className="num">{measured.calls}</span> pilot calls: half of Doug&rsquo;s replies
              began within <span className="num">{measured.p50}</span>&nbsp;ms, and 95% within{" "}
              <span className="num">{measured.p95}</span>&nbsp;ms of the caller finishing.
            </p>
          ) : (
            <p className="lede">
              Every reply has a budget of about <span className="num">{total}</span>&nbsp;ms, from the moment the
              caller stops talking to the moment Doug starts. Doug starts speaking after its first sentence
              instead of waiting for the whole reply, and the audio is never converted between formats.
            </p>
          )}
        </div>
        <figure className={s.timeline} data-reveal style={stagger(3)}>
          <div className={s.bar} role="img" aria-label={`Latency budget: ${budget.map((b) => `${b.label} ${b.ms} ms`).join(", ")}. Total about ${total} ms.`}>
            {budget.map((b, i) => (
              <span
                key={b.label}
                className={s.seg}
                style={{ flexGrow: b.ms, ...stagger(i) } as CSSProperties}
              />
            ))}
          </div>
          <ol className={s.stages} aria-hidden="true">
            {budget.map((b) => (
              <li key={b.label} style={{ flexGrow: b.ms }}>
                <span className={`num ${s.ms}`}>{b.ms} ms</span>
                <span className={s.stageLabel}>{b.label}</span>
                <span className={s.stageDetail}>{b.detail}</span>
              </li>
            ))}
          </ol>
          <figcaption className={s.figNote}>
            {measured
              ? `Measured on live calls through our own pipeline, as of ${measured.asOf}.`
              : "This is a design budget, built from each provider’s published figures and our own settings. It hasn’t been measured on live calls yet. Once pilot calls give us real p50 and p95 numbers, we’ll publish them here."}
          </figcaption>
        </figure>
        <div className={s.hear} data-reveal>
          <HearDoug />
        </div>
      </div>
    </section>
  );
}

/* 7 — Trust and privacy ---------------------------------------------------- */

const processors = [
  { name: "Twilio", role: "Carries the phone call and its audio", href: "https://www.twilio.com/en-us/legal/privacy" },
  { name: "Deepgram", role: "Turns the caller’s speech into text", href: "https://deepgram.com/privacy" },
  { name: "Anthropic", role: "Claude, the model that understands and decides", href: "https://www.anthropic.com/legal/privacy" },
  { name: "ElevenLabs", role: "Doug’s voice", href: "https://elevenlabs.io/privacy-policy" },
];

const trust = [
  {
    term: "Callers are told",
    detail: "Every call starts with a notice that it’s recorded and transcribed. It’s on by default and stays on unless your lawyer says otherwise.",
  },
  {
    term: "Doug says what it is",
    detail: "It introduces itself as your assistant and tells anyone who asks that it’s an AI. Some states require that, and we’d do it anyway.",
  },
  {
    term: "30 days, then gone",
    detail: "Transcripts and messages are deleted after 30 days by default. Ask us and we delete everything about your line sooner.",
  },
  {
    term: "Encrypted in transit",
    detail: "Audio and data move over encrypted connections (TLS) between the phone network, our servers and each processor.",
  },
  {
    term: "Never sold",
    detail: "We don’t sell your data or your callers' data, and we don’t use your calls to train models.",
  },
];

export function Trust() {
  return (
    <section className="section" aria-labelledby="trust-title">
      <div className="wrap grid">
        <Heading id="trust-title" eyebrow="Trust and privacy">
          Discreet by design. <em className={s.quiet}>Plain about the details.</em>
        </Heading>
        <dl className={s.trust}>
          {trust.map((t, i) => (
            <div key={t.term} className={s.trustRow} data-reveal style={stagger(i)}>
              <dt className="h3">{t.term}</dt>
              <dd className="muted">{t.detail}</dd>
            </div>
          ))}
        </dl>
        <div className={s.processors} data-reveal>
          <h3 className="eyebrow">Who processes the audio</h3>
          <ul>
            {processors.map((p) => (
              <li key={p.name}>
                <a className="link" href={p.href} rel="noopener noreferrer" target="_blank">
                  {p.name}
                  <span className="sr-only"> privacy policy (opens in a new tab)</span>
                </a>
                <span className="muted"> — {p.role}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}

/* 8 — Pricing -------------------------------------------------------------- */

export function Pricing() {
  return (
    <section id="pricing" className="section" aria-labelledby="pricing-title">
      <div className="wrap grid">
        <Heading id="pricing-title" eyebrow="Founding-member pricing">
          One price. <em className={s.quiet}>Yours for as long as you stay.</em>
        </Heading>
        {plans.map((plan, i) => (
          <article key={plan.id} className={i === 0 ? s.planA : s.planB} data-reveal style={stagger(i)} aria-labelledby={`plan-${plan.id}`}>
            <p className="eyebrow">{plan.audience}</p>
            <h3 id={`plan-${plan.id}`} className="h3">
              {plan.name}
            </h3>
            <p className={`display num ${s.price}`}>
              ${plan.price}
              <span className={s.per}>/month</span>
            </p>
            <p className={s.planNote}>{founding.label}</p>
            <ul className={s.includes}>
              {plan.includes.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
            <Cta href="#early-access" cta="early_access" location={`pricing_${plan.id}`} plan={plan.id} className="btn">
              Request early access<span className="sr-only"> for {plan.name}</span>
            </Cta>
          </article>
        ))}
        <p className={s.pilot} data-reveal>
          {pilot.lines.join(". ")}. Cancel anytime.
          {founding.seats !== null && (
            <span className={s.cap}> Founding pricing is limited to the first {founding.seats} members.</span>
          )}
        </p>
      </div>
    </section>
  );
}

/* 9 — Founder note --------------------------------------------------------- */

export function Founder() {
  return (
    <section className="section" aria-labelledby="founder-title">
      <div className="wrap grid">
        <h2 id="founder-title" className="sr-only">
          A note from the team
        </h2>
        <blockquote className={s.founder} data-reveal>
          {founder.paragraphs.map((p) => (
            <p key={p}>{p}</p>
          ))}
          <footer className={s.sign}>
            <span className="display">{founder.signature}</span>
            <span className="muted">{founder.role}</span>
          </footer>
        </blockquote>
      </div>
    </section>
  );
}

/* 10 — FAQ ----------------------------------------------------------------- */

export function Faq() {
  return (
    <section id="faq" className="section" aria-labelledby="faq-title">
      <div className="wrap grid">
        <Heading id="faq-title" eyebrow="Questions">
          Before you ask.
        </Heading>
        <div className={s.faq}>
          {faqs.map((f) => (
            <details key={f.q} className={s.qa}>
              <summary>
                <span>{f.q}</span>
                <span className={s.plus} aria-hidden="true" />
              </summary>
              <div className={`prose muted ${s.answer}`}>
                {f.a.map((p) => (
                  <p key={p}>{p}</p>
                ))}
              </div>
            </details>
          ))}
        </div>
      </div>
    </section>
  );
}
