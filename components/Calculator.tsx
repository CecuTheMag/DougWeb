"use client";

import { useEffect, useId, useRef, useState } from "react";
import { track } from "@/lib/analytics";
import styles from "./Calculator.module.css";

const WEEKS_PER_MONTH = 52 / 12;

const money = new Intl.NumberFormat("en-US", {
  style: "currency",
  currency: "USD",
  maximumFractionDigits: 0,
});

interface Field {
  key: "calls" | "missed" | "convert" | "value";
  label: string;
  hint: string;
  min: number;
  max: number;
  step: number;
  format: (n: number) => string;
}

const FIELDS: Field[] = [
  { key: "calls", label: "Calls you get a week", hint: "", min: 1, max: 500, step: 1, format: (n) => `${n}` },
  {
    key: "missed",
    label: "Share you can’t pick up",
    hint: "In meetings, on a job, after hours",
    min: 0,
    max: 100,
    step: 1,
    format: (n) => `${n}%`,
  },
  {
    key: "convert",
    label: "Of those, share who’d have become customers",
    hint: "Not every missed caller is a lost sale. Be conservative.",
    min: 0,
    max: 100,
    step: 1,
    format: (n) => `${n}%`,
  },
  {
    key: "value",
    label: "What a new customer is worth to you",
    hint: "First job or first year, whichever you use",
    min: 0,
    max: 5000,
    step: 25,
    format: (n) => money.format(n),
  },
];

type Values = Record<Field["key"], number>;

export function Calculator() {
  const [v, setV] = useState<Values>({ calls: 40, missed: 20, convert: 25, value: 300 });
  const touched = useRef(false);
  const id = useId();

  const monthly = Math.round(v.calls * (v.missed / 100) * (v.convert / 100) * v.value * WEEKS_PER_MONTH);
  const lostCalls = Math.round(v.calls * (v.missed / 100) * WEEKS_PER_MONTH);

  // One event per visit, sent after the visitor has settled on their numbers.
  useEffect(() => {
    if (!touched.current) return;
    const t = setTimeout(() => {
      track({ name: "calculator_used", props: { monthly } });
      touched.current = false;
    }, 1500);
    return () => clearTimeout(t);
  }, [monthly]);

  const set = (key: Field["key"], raw: string, f: Field) => {
    const n = Number(raw);
    if (Number.isNaN(n)) return;
    touched.current = true;
    setV((prev) => ({ ...prev, [key]: Math.min(f.max, Math.max(f.min, n)) }));
  };

  return (
    <form className={styles.calc} onSubmit={(e) => e.preventDefault()} aria-describedby={`${id}-note`}>
      <div className={styles.fields}>
        {FIELDS.map((f) => (
          <div key={f.key} className={styles.field}>
            <div className={styles.row}>
              <label htmlFor={`${id}-${f.key}`}>{f.label}</label>
              <output htmlFor={`${id}-${f.key}`} className={`num ${styles.value}`}>
                {f.format(v[f.key])}
              </output>
            </div>
            <input
              id={`${id}-${f.key}`}
              type="range"
              min={f.min}
              max={f.max}
              step={f.step}
              value={v[f.key]}
              onChange={(e) => set(f.key, e.target.value, f)}
              aria-describedby={f.hint ? `${id}-${f.key}-hint` : undefined}
              className={styles.range}
            />
            {f.hint && (
              <p id={`${id}-${f.key}-hint`} className={styles.hint}>
                {f.hint}
              </p>
            )}
          </div>
        ))}
      </div>
      <div className={styles.result} aria-live="polite">
        <p className="eyebrow">By your numbers</p>
        <p className={`display num ${styles.total}`}>
          {money.format(monthly)}
          <span className={styles.per}>/month</span>
        </p>
        <p className={styles.sub}>
          About <span className="num">{lostCalls}</span> unanswered calls a month.
        </p>
        <p id={`${id}-note`} className={styles.note}>
          An estimate built only from the numbers you entered: calls a week × share missed × share
          who&rsquo;d have bought × customer value × 4.33 weeks. We don&rsquo;t add any industry
          averages.
        </p>
      </div>
    </form>
  );
}
