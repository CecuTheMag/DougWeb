import Link from "next/link";
import { Footer, Header } from "@/components/Chrome";

export default function NotFound() {
  return (
    <>
      <Header />
      <main id="main" className="wrap" style={{ paddingBlock: "var(--section)", display: "grid", gap: "var(--s-6)" }}>
        <p className="eyebrow">Not found</p>
        <h1 className="display h2">Nobody by that name here.</h1>
        <p className="lede">The page you asked for doesn&rsquo;t exist, or it has moved.</p>
        <p>
          <Link href="/" className="btn">
            Back to the front desk
          </Link>
        </p>
      </main>
      <Footer />
    </>
  );
}
