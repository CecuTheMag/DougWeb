import { pilot } from "@/content/pricing";
import { Cta } from "./Cta";
import { Transcript } from "./Transcript";
import styles from "./Hero.module.css";

export function Hero() {
  return (
    <section className={`wrap grid ${styles.hero}`} aria-labelledby="hero-title">
      <p className={`eyebrow ${styles.eyebrow}`}>An assistant for the calls you can&rsquo;t take</p>
      <h1 id="hero-title" className={`display ${styles.title}`}>
        Every call answered.{" "}
        <em className={styles.second}>Only the right ones reach&nbsp;you.</em>
      </h1>
      <div className={styles.copy}>
        <p className="lede">
          Doug picks up when you don&rsquo;t. It asks who&rsquo;s calling and why, puts urgent people
          straight through, and sends you a clean summary of everyone else.
        </p>
        <div className={styles.actions}>
          <Cta href="#early-access" cta="early_access" location="hero">
            Request early access
          </Cta>
          <Cta href="#hear" cta="hear_doug" location="hero" className="btn btn--ghost">
            Hear Doug take a call
          </Cta>
        </div>
        <p className={styles.reassure}>{pilot.lines.join(" · ")}</p>
      </div>
      <div className={styles.demo}>
        <Transcript />
      </div>
    </section>
  );
}
