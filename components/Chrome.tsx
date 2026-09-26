import Link from "next/link";
import { site } from "@/content/site";
import { Cta } from "./Cta";
import styles from "./Chrome.module.css";

export function Header() {
  return (
    <header className={`wrap ${styles.header}`}>
      <Link href="/" className={styles.mark} aria-label="Doug, home">
        Doug
      </Link>
      <nav aria-label="Primary" className={styles.nav}>
        <Link href="/#how" className={styles.navLink}>
          How it works
        </Link>
        <Link href="/#pricing" className={styles.navLink}>
          Pricing
        </Link>
        <Link href="/#faq" className={styles.navLink}>
          FAQ
        </Link>
        <Cta href="/#early-access" cta="early_access" location="header" className={`btn btn--ghost ${styles.cta}`}>
          Early access
        </Cta>
      </nav>
    </header>
  );
}

export function Footer() {
  const year = new Date().getFullYear();
  return (
    <footer className={`wrap ${styles.footer}`}>
      <p className={styles.mark}>Doug</p>
      <nav aria-label="Legal" className={styles.legal}>
        <Link href="/privacy" className="link">
          Privacy
        </Link>
        <Link href="/terms" className="link">
          Terms
        </Link>
        <a href={`mailto:${site.contactEmail}`} className="link">
          {site.contactEmail}
        </a>
      </nav>
      <p className={styles.small}>
        © {year} {site.legalName}. Doug is an AI assistant and tells every caller so.
      </p>
    </footer>
  );
}
