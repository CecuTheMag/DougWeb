import { Footer, Header } from "./Chrome";
import s from "./Legal.module.css";

export function LegalPage({
  title,
  updated,
  children,
}: {
  title: string;
  updated: string;
  children: React.ReactNode;
}) {
  return (
    <>
      <Header />
      <main id="main" className={`wrap ${s.page}`}>
        <h1 className="display h2">{title}</h1>
        <p className="muted">Last updated: {updated}</p>
        <div className={s.body}>{children}</div>
      </main>
      <Footer />
    </>
  );
}
