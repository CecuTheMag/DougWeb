"use client";

import { demo } from "@/content/site";
import { track } from "@/lib/analytics";
import s from "./Sections.module.css";

/**
 * Plays a real recording from our own pipeline, or says plainly that there
 * isn’t one yet. Never swap in an actor or a mockup.
 */
export function HearDoug() {
  if (!demo.src) {
    return (
      <div className={s.hearEmpty} role="note">
        <p className="eyebrow">Hear Doug take a call</p>
        <p className="h3">Audio sample coming soon.</p>
        <p className="muted">
          We&rsquo;ll post a real, unedited call handled by Doug, not an actor and not a mockup. Until then, the
          examples at the top of this page show what Doug says.
        </p>
      </div>
    );
  }
  return (
    <figure className={s.hearPlayer}>
      <figcaption className="eyebrow">Hear Doug take a call</figcaption>
      <audio
        controls
        preload="none"
        src={demo.src}
        onPlay={() => track({ name: "demo_play", props: { source: demo.src ?? "" } })}
      >
        Your browser can&rsquo;t play this audio.
      </audio>
      {demo.caption && <p className="muted">{demo.caption}</p>}
    </figure>
  );
}
