/**
 * The latency section. Honesty rule: the site may only call a number
 * "measured" if it came from real calls through our own pipeline.
 *
 * `budget` is the design budget for one reply, built from each vendor’s
 * published figure and our own endpointing setting (see the repo README).
 * It has NOT been measured on live calls yet.
 *
 * When pilot calls produce real numbers (the pipeline records per-stage
 * timings on every call — see doug/observability), fill in `measured` and the
 * section switches to showing them.
 */

export interface Stage {
  label: string;
  detail: string;
  ms: number;
}

export const budget: Stage[] = [
  {
    label: "Caller finishes",
    detail: "Doug waits for a short pause so it doesn’t talk over anyone",
    ms: 300,
  },
  { label: "Words transcribed", detail: "Streaming speech-to-text, final result", ms: 100 },
  { label: "Reply begins", detail: "The model’s first words, before it finishes thinking", ms: 250 },
  { label: "Voice starts", detail: "Speech starts playing from the first sentence", ms: 150 },
];

export const measured: null | {
  p50: number;
  p95: number;
  calls: number;
  /** ISO date of the measurement window’s end. */
  asOf: string;
} = null;
