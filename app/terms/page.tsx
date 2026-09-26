import type { Metadata } from "next";
import { LegalPage } from "@/components/Legal";
import { pilot, plans } from "@/content/pricing";
import { site } from "@/content/site";

export const metadata: Metadata = {
  title: "Terms",
  description: "The terms for using Doug.",
  alternates: { canonical: "/terms" },
};

const email = (
  <a className="link" href={`mailto:${site.contactEmail}`}>
    {site.contactEmail}
  </a>
);

export default function Terms() {
  const us = site.legalName;
  return (
    <LegalPage title="Terms of service" updated={site.legalUpdated}>
      <p>
        These terms are an agreement between you and {us} (&ldquo;Doug&rdquo;, &ldquo;we&rdquo;, &ldquo;us&rdquo;).
        They apply when you use the Doug call-answering service (the &ldquo;Service&rdquo;) or this website. By
        signing up for a pilot or a plan, or by forwarding calls to a Doug number, you agree to them. If you use
        Doug for a business, you confirm that you can accept these terms for that business, and &ldquo;you&rdquo;
        means the business.
      </p>

      <h2>1. Who can use Doug</h2>
      <p>
        You must be at least 18 and able to enter a binding contract. Doug is currently available for phone numbers
        in the United States, and speaks English only.
      </p>

      <h2>2. What Doug does, and what it doesn&rsquo;t</h2>
      <p>
        Doug answers calls that are forwarded or routed to a Doug number. It screens callers, may put a caller
        through to you, takes messages, and sends you a summary. Doug is an automated AI system. It can mishear,
        misunderstand, or misjudge how urgent a call is, and it may take a message when you would have wanted the
        call, or the other way round. Check your summaries, and don&rsquo;t rely on Doug as the only way someone can
        reach you about something that matters.
      </p>
      <p>
        <strong>
          Doug is not an emergency service. It can&rsquo;t contact 911 or any other emergency service, and it
          can&rsquo;t send help.
        </strong>{" "}
        If you might receive emergency calls, make sure callers have another way to get help. Anyone in an emergency
        should hang up and dial 911.
      </p>

      <h2>3. Your responsibilities</h2>
      <ul>
        <li>
          You have the right to use and forward every phone number you connect to Doug, and you pay any charges
          your phone carrier makes for forwarding.
        </li>
        <li>
          You&rsquo;re responsible for using Doug lawfully with your callers. Doug tells every caller that the call
          is recorded and transcribed and that it&rsquo;s an AI. You won&rsquo;t ask us to switch those notices off
          unless you&rsquo;ve confirmed, with your own legal advice, that it&rsquo;s lawful for your callers.
        </li>
        <li>
          You won&rsquo;t use Doug to make callers believe they&rsquo;re talking to a person, or to you.
        </li>
        <li>
          The information you give us, including hours, VIP and blocked numbers, and business details, is accurate.
          Doug repeats business details to callers exactly as you provide them.
        </li>
        <li>You keep your account access to yourself and tell us promptly if you think it has been misused.</li>
      </ul>

      <h2>4. Health, payment card and other sensitive information</h2>
      <p>
        Doug isn&rsquo;t built for regulated data. It isn&rsquo;t designed to meet HIPAA, and we don&rsquo;t sign
        business associate agreements. Unless we agree otherwise in writing, don&rsquo;t use Doug where callers will
        give protected health information as defined by HIPAA, payment card numbers, or similar regulated data, and
        don&rsquo;t put that kind of information in the business details you give Doug.
      </p>

      <h2>5. Acceptable use</h2>
      <p>You won&rsquo;t use Doug to:</p>
      <ul>
        <li>break any law, including laws on call recording, telemarketing, privacy and consumer protection;</li>
        <li>deceive, harass or threaten anyone, or impersonate a person or organization;</li>
        <li>handle calls for anyone else&rsquo;s phone number without their permission;</li>
        <li>
          interfere with the Service, probe it for weaknesses, or copy or reverse-engineer it, except where the law
          allows you to regardless of this term; or
        </li>
        <li>resell the Service without our written agreement.</li>
      </ul>
      <p>
        The code for this website is open source under its own license. That license covers the website code only,
        not the Service or the Doug name.
      </p>

      <h2>6. Pilot, plans and payment</h2>
      <p>
        The {pilot.days}-day pilot is free and you can stop at any time. We won&rsquo;t charge you anything when it
        ends unless you choose a paid plan. Our plans are{" "}
        {plans.map((p) => `${p.name} at $${p.price} a month`).join(" and ")}, in US dollars, plus any applicable
        taxes. Plans are billed monthly in advance through our payment provider, and renew each month until you
        cancel.
      </p>
      <p>
        Each plan includes a monthly allowance of call minutes that we agree with you in writing before billing
        starts. We won&rsquo;t charge for use beyond it without your agreement. If you go over it, we may ask you to
        move to a larger allowance, or pause screening until the next month, in which case callers can still leave
        a voicemail.
      </p>
      <p>
        If you have a founding-member price, it stays the same for as long as your subscription continues without a
        break. Otherwise we may change prices by telling you by email at least 30 days before your next billing
        date. The new price applies from that date, and you can cancel before it does.
      </p>

      <h2>7. Cancelling and refunds</h2>
      <p>
        You can cancel at any time by emailing us or replying to any email from us. Cancellation takes effect at the
        end of the billing month you&rsquo;ve paid for, and Doug keeps working until then. To stop Doug answering
        straight away, turn off call forwarding on your phone.
      </p>
      <p>
        <strong>Payments are non-refundable.</strong> We don&rsquo;t give refunds or credits for part of a month,
        for unused minutes, or for months in which you didn&rsquo;t use Doug, except where the law requires us to or
        where we&rsquo;ve charged you by mistake.
      </p>

      <h2>8. Your data</h2>
      <p>
        You own your data, including your call records, transcripts, messages and settings. You give us permission
        to use it only to provide, secure and improve the Service for you, and as our{" "}
        <a className="link" href="/privacy">
          privacy notice
        </a>{" "}
        describes. We don&rsquo;t use your call content to train AI models. By default, call records, transcripts,
        messages and voicemails are deleted after 30 days, and you can ask us to delete them sooner.
      </p>
      <p>
        If you get call summaries by text, you agree that we can send them to the numbers you give us. Message and
        data rates may apply, and you can reply STOP at any time to stop them.
      </p>

      <h2>9. Services we rely on</h2>
      <p>
        Doug depends on phone carriers and on other providers for calls, speech recognition, AI and voice. We
        aren&rsquo;t responsible for their outages or for how your carrier handles call forwarding. If one of them
        fails during a call, Doug plays a short apology and offers the caller a voicemail.
      </p>

      <h2>10. Early access and changes</h2>
      <p>
        Doug is new. We&rsquo;ll keep improving it, which means features can change, and we don&rsquo;t promise any
        particular uptime unless we agree it with you in writing. If we make a change that materially reduces what
        your paid plan does, we&rsquo;ll tell you in advance, and you can cancel.
      </p>

      <h2>11. Suspension and termination</h2>
      <p>
        We may suspend or end your use of Doug if you seriously or repeatedly break these terms, if you don&rsquo;t
        pay, or if we need to in order to protect callers, the Service or other customers, or to comply with the
        law. Where it&rsquo;s reasonable, we&rsquo;ll warn you first and give you a chance to fix the problem. If we
        stop offering Doug altogether, we&rsquo;ll give you at least 30 days&rsquo; notice and refund any payment for
        time after the Service ends. When your account ends, we delete your data as the privacy notice describes.
      </p>

      <h2>12. Disclaimer</h2>
      <p>
        EXCEPT AS THESE TERMS EXPRESSLY SAY, THE SERVICE IS PROVIDED &ldquo;AS IS&rdquo; AND &ldquo;AS
        AVAILABLE&rdquo;. TO THE EXTENT THE LAW ALLOWS, WE DISCLAIM ALL WARRANTIES, EXPRESS OR IMPLIED, INCLUDING
        MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NON-INFRINGEMENT. WE DON&rsquo;T PROMISE THAT DOUG
        WILL ANSWER EVERY CALL, UNDERSTAND EVERY CALLER, PUT THROUGH EVERY CALL YOU WOULD HAVE WANTED, OR WORK
        WITHOUT INTERRUPTION.
      </p>

      <h2>13. Limits on our liability</h2>
      <p>
        TO THE EXTENT THE LAW ALLOWS: (A) WE AREN&rsquo;T LIABLE FOR INDIRECT, INCIDENTAL, SPECIAL, CONSEQUENTIAL
        OR PUNITIVE DAMAGES, OR FOR LOST PROFITS, REVENUE, BUSINESS OR DATA, INCLUDING LOSSES FROM A MISSED,
        MISHANDLED OR WRONGLY SCREENED CALL; AND (B) OUR TOTAL LIABILITY FOR ALL CLAIMS ABOUT THE SERVICE OR THESE
        TERMS IS LIMITED TO THE GREATER OF THE AMOUNT YOU PAID US IN THE 12 MONTHS BEFORE THE CLAIM AROSE, OR $100.
        These limits don&rsquo;t apply where the law doesn&rsquo;t allow them, including for fraud, or for death or
        personal injury caused by negligence.
      </p>

      <h2>14. Indemnity</h2>
      <p>
        If someone brings a claim against us because of how you used Doug in breach of these terms or the law, for
        example by switching off the recording notice where that was unlawful, or by using Doug with a number you
        didn&rsquo;t have the right to use, you&rsquo;ll cover our reasonable costs and losses from that claim. We
        will tell you about the claim promptly and let you take part in defending it.
      </p>

      <h2>15. Governing law and disputes</h2>
      <p>
        These terms are governed by the laws of the State of {site.governingState}, USA, without regard to its
        conflict-of-laws rules. If we have a dispute, please email us first. Most things can be fixed that way.
        Otherwise, disputes will be decided by the state or federal courts located in {site.governingState}, and
        you and we agree to their jurisdiction. Either of us may bring an eligible claim in small-claims court
        instead. If you&rsquo;re a consumer living outside the US, you also keep any protections and any right to
        go to your local courts that your local law gives you.
      </p>

      <h2>16. Changes to these terms</h2>
      <p>
        We may update these terms. We&rsquo;ll change the date at the top and, for material changes, email
        customers at least 30 days before they take effect. If you keep using Doug after that, the new terms apply.
        If you don&rsquo;t agree to them, you can cancel before they take effect.
      </p>

      <h2>17. General</h2>
      <p>
        These terms, together with the privacy notice and anything we agree with you in writing, are the whole
        agreement between us about Doug. If any part turns out to be unenforceable, the rest still applies. If we
        don&rsquo;t enforce a term straight away, we can still enforce it later. You may not transfer these terms
        to anyone else without our agreement. We may transfer them as part of a merger or sale of our business.
        Neither of us is responsible for delays caused by events beyond reasonable control. We can send you
        notices by email to the address on your account, and you can send them to {email}.
      </p>

      <h2>Contact</h2>
      <p>
        {us}. Email {email}.
      </p>
    </LegalPage>
  );
}
