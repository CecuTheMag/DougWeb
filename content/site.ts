/** Site-wide facts. Edit these before launch. */

export const site = {
  name: "Doug",
  /** Production origin, no trailing slash. Used for canonical URLs, OG and the sitemap. */
  url: process.env.NEXT_PUBLIC_SITE_URL ?? "https://dougpicksup.com",
  title: "Doug — every call answered, only the right ones reach you",
  description:
    "Doug answers the calls you can’t take. It screens each caller, puts urgent people straight through, takes clean messages from everyone else and sends you a summary after every call.",
  contactEmail: "hello@dougpicksup.com",
  /** Legal entity shown in the footer and legal pages. */
  legalName: "Doug Corp",
  /** US state whose law governs the Terms. Change it if Doug Corp is registered elsewhere. */
  governingState: "Delaware",
  /** Shown as "Last updated" on the Privacy and Terms pages. Bump it whenever either changes. */
  legalUpdated: "September 26, 2026",
};

/** "Hear Doug take a call". Set `src` to a real recording from our own pipeline. */
export const demo = {
  src: null as string | null,
  caption: "",
};

/** The note from the team, near the bottom of the page. */
export const founder = {
  paragraphs: [
    "We built Doug because the calls that matter and the calls that don’t arrive on the same phone, and it rings the same way for both. Every time we silenced it, we were guessing what we’d missed.",
    "Doug is the assistant we wanted: it answers, asks the right two questions, and only interrupts when it should. It says up front that it’s an AI, it never pretends to be you, and when it isn’t sure, it takes a message.",
    "The first members will shape what it becomes. We read every request and set up each pilot ourselves.",
  ],
  signature: "The Doug team",
  role: "Doug Corp",
};
