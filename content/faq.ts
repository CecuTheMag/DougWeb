import { includedMinutes, pilot } from "./pricing";

export interface Faq {
  q: string;
  a: string[];
}

const minutesAnswer =
  includedMinutes.personal === null || includedMinutes.business === null
    ? [
        "During the pilot, the minutes Doug spends on your calls are on us.",
        "Before any billing starts we’ll agree a monthly allowance with you in writing. Nothing is charged beyond it without your say-so.",
      ]
    : [
        `Personal includes ${includedMinutes.personal} minutes of answered calls a month; Business includes ${includedMinutes.business}.`,
        "Nothing is charged beyond your allowance without your say-so.",
      ];

export const faqs: Faq[] = [
  {
    q: "Do I have to change my number?",
    a: [
      "No. You keep your number and your phone. With conditional call forwarding, your carrier sends the calls you don’t answer, decline, or can’t take on to your Doug line. You set it up once, with a short dial code or a setting on your phone.",
      "If you’d rather Doug answer first, we can move (port) a business number to Doug instead. Porting takes longer and depends on your carrier, so most people start with forwarding.",
    ],
  },
  {
    q: "What do callers hear?",
    a: [
      "First, a short notice that the call is recorded and transcribed. Then, on a personal line: “Hi, this is Doug, Alex’s AI assistant. Who am I speaking with, and what is this regarding?” On a business line: “Thanks for calling Bright Dental, this is Doug, the AI receptionist. How can I help you today?”",
      "Callers always know they’re talking to an AI. If one asks again, Doug says so plainly.",
    ],
  },
  {
    q: "What happens outside my hours?",
    a: [
      "On a personal line your phone stays quiet: callers are asked to leave a voicemail, and you get the summary.",
      "On a business line Doug keeps answering. It can’t put anyone through while you’re closed, so it takes a complete message with a callback number instead.",
    ],
  },
  {
    q: "What if Doug isn’t sure?",
    a: [
      "It takes a message. That’s the rule it’s built on: a missed message is easy to recover, an interruption isn’t. If a conversation goes round in circles, Doug takes a message and ends the call politely.",
      "If one of the services Doug relies on fails mid-call, the caller hears a short apology and can leave a voicemail. They never get silence or a dropped line from our side.",
    ],
  },
  {
    q: "Which languages does Doug speak?",
    a: ["English only for now."],
  },
  {
    q: "What do the minutes cost?",
    a: minutesAnswer,
  },
  {
    q: "How do I cancel?",
    a: [
      `Reply to any email from us. There’s no contract, and the ${pilot.days}-day pilot is free. To stop Doug answering immediately, turn off forwarding on your phone. It takes about ten seconds, and we’ll give you the exact code for your carrier during setup.`,
    ],
  },
];
