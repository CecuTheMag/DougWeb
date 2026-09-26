/**
 * Hero transcripts. These are illustrations of the three outcomes, written
 * from the real greeting and tool names in doug/agent. They are labeled as
 * examples on the page and must never be presented as recordings.
 *
 * `after` is how long to wait (ms) before the line starts, as if in a call.
 */

export type Outcome = "put-through" | "message" | "declined";

export interface Line {
  who: "caller" | "doug";
  text: string;
  after: number;
}

export interface Scenario {
  id: string;
  caller: string;
  outcome: Outcome;
  chip: string;
  lines: Line[];
}

export const scenarios: Scenario[] = [
  {
    id: "sister",
    caller: "Mobile · (415) ··· 0142",
    outcome: "put-through",
    chip: "Put through",
    lines: [
      { who: "doug", text: "Hi, this is Doug, Alex’s AI assistant. Who am I speaking with?", after: 400 },
      { who: "caller", text: "It’s Sam, his sister. Our dad’s just been taken to hospital.", after: 900 },
      { who: "doug", text: "I’m sorry, Sam. Let me put you through to Alex now.", after: 800 },
    ],
  },
  {
    id: "invoice",
    caller: "Office · (212) ··· 7730",
    outcome: "message",
    chip: "Message taken",
    lines: [
      { who: "doug", text: "Hi, this is Doug, Alex’s AI assistant. Who am I speaking with?", after: 400 },
      { who: "caller", text: "Dana from Acme. Just checking the invoice went through.", after: 900 },
      { who: "doug", text: "Thanks, Dana. I’ll pass that to Alex with your number.", after: 800 },
    ],
  },
  {
    id: "warranty",
    caller: "Unknown · (888) ··· 4410",
    outcome: "declined",
    chip: "Declined: spam",
    lines: [
      { who: "doug", text: "Hi, this is Doug, Alex’s AI assistant. Who am I speaking with?", after: 400 },
      { who: "caller", text: "We’ve been trying to reach you about your vehicle’s warranty.", after: 900 },
      { who: "doug", text: "Alex isn’t interested, thanks. Goodbye.", after: 800 },
    ],
  },
];
