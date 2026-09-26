import { Footer, Header } from "@/components/Chrome";
import { EarlyAccessForm } from "@/components/EarlyAccess";
import { Hero } from "@/components/Hero";
import { Cost, Faq, Founder, HowItWorks, Personas, Pricing, Rules, Speed, Trust } from "@/components/Sections";
import { currency, pilot, plans } from "@/content/pricing";
import { site } from "@/content/site";
import styles from "./page.module.css";

// SoftwareApplication structured data. Only facts: no ratings, no reviews.
const jsonLd = {
  "@context": "https://schema.org",
  "@type": "SoftwareApplication",
  name: site.name,
  applicationCategory: "BusinessApplication",
  operatingSystem: "Any (works with any phone that supports call forwarding)",
  description: site.description,
  url: site.url,
  offers: plans.map((p) => ({
    "@type": "Offer",
    name: p.name,
    price: p.price,
    priceCurrency: currency,
    priceSpecification: {
      "@type": "UnitPriceSpecification",
      price: p.price,
      priceCurrency: currency,
      unitText: "MONTH",
    },
  })),
};

export default function Home() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd).replace(/</g, "\\u003c") }}
      />
      <Header />
      <main id="main">
        <Hero />
        <Cost />
        <HowItWorks />
        <Personas />
        <Rules />
        <Speed />
        <Trust />
        <Pricing />
        <Founder />
        <Faq />
        <section id="early-access" className="section" aria-labelledby="ea-title">
          <div className="wrap grid">
            <div className={styles.ctaCopy}>
              <p className="eyebrow" data-reveal>
                Early access
              </p>
              <h2 id="ea-title" className="display h2" data-reveal>
                Let Doug take the next call.
              </h2>
              <p className="lede" data-reveal>
                Tell us a little about your calls. We&rsquo;ll set up a free {pilot.days}-day pilot on your line, with no contract.
                If it isn&rsquo;t for you, switch forwarding off and that&rsquo;s the end of it.
              </p>
            </div>
            <div className={styles.form}>
              <EarlyAccessForm />
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
