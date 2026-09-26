import type { Metadata } from "next";
import { LegalPage } from "@/components/Legal";
import { site } from "@/content/site";

export const metadata: Metadata = {
  title: "Privacy",
  description: "How Doug handles call audio, transcripts, messages and early-access requests.",
  alternates: { canonical: "/privacy" },
};

const email = (
  <a className="link" href={`mailto:${site.contactEmail}`}>
    {site.contactEmail}
  </a>
);

export default function Privacy() {
  return (
    <LegalPage title="Privacy notice" updated={site.legalUpdated}>
      <p>
        This notice explains what personal information {site.legalName} (&ldquo;Doug&rdquo;, &ldquo;we&rdquo;,
        &ldquo;us&rdquo;) collects, why, who we share it with, how long we keep it, and the choices you have. It
        covers the Doug call-answering service and this website.
      </p>

      <h2>Who this covers</h2>
      <ul>
        <li>
          <strong>Customers</strong>: the people and businesses who sign up for Doug to answer their calls.
        </li>
        <li>
          <strong>Callers</strong>: anyone who calls a phone line that Doug answers for a customer.
        </li>
        <li>
          <strong>Visitors</strong>: people who use this website or request early access.
        </li>
      </ul>

      <h2>Our role</h2>
      <p>
        When Doug answers a call, it does so on behalf of the customer whose line it is. For call data we act as
        that customer&rsquo;s service provider (a &ldquo;processor&rdquo; under European law): we handle it to
        provide the service to them and for no other purpose. The customer decides how their line is set up and
        what happens to their messages. For customer account details and website visitors, we decide how the data
        is used and are responsible for it directly.
      </p>
      <p>
        If you called a line that Doug answers and have a question about your information, you can contact the
        person or business you called, or email us at {email}. We&rsquo;ll work with them to answer you.
      </p>

      <h2>What we collect when Doug answers a call</h2>
      <ul>
        <li>
          <strong>Call details</strong>: the caller&rsquo;s phone number, the number dialled, and the date, time
          and length of the call.
        </li>
        <li>
          <strong>Call audio</strong>: processed live so Doug can understand the caller and reply. We don&rsquo;t
          keep a recording of the live conversation.
        </li>
        <li>
          <strong>Voicemail recordings</strong>: if a caller leaves a voicemail, the recording is stored.
        </li>
        <li>
          <strong>Transcript and message</strong>: a written transcript of the conversation, the name and reason
          for calling the caller gives, and any message they leave.
        </li>
        <li>
          <strong>Caller history</strong>: for each customer, whether a number has called before, how many times
          and when, so Doug can recognise a repeat caller on that customer&rsquo;s line only.
        </li>
        <li>
          <strong>Usage figures</strong>: minutes, characters and tokens processed, and what each call cost to
          run, used for billing and capacity planning.
        </li>
      </ul>

      <h2>What we collect from customers</h2>
      <ul>
        <li>Name, email address, phone numbers, and the number calls are forwarded to.</li>
        <li>
          How the line is set up: available hours, time zone, VIP and blocked numbers, and any business details
          you give Doug to answer callers&rsquo; questions.
        </li>
        <li>
          If you connect a calendar: only whether you are free or busy at a given time. Doug can&rsquo;t see event
          titles, attendees or descriptions.
        </li>
        <li>
          Billing details. Payments are handled by our payment provider. We never see or store your full card
          number.
        </li>
        <li>Messages you send us, such as support requests.</li>
      </ul>

      <h2>What we collect on this website</h2>
      <ul>
        <li>
          <strong>Early-access requests</strong>: your name, email, phone number if you give one, whether Doug
          would be for personal or business use, roughly how many calls you get, and what you tell us you need.
        </li>
        <li>
          <strong>Analytics</strong>: we use Vercel Web Analytics to count page views and a few actions, such as
          pressing a button or submitting the form. It uses no cookies and doesn&rsquo;t track you across other
          sites.
        </li>
        <li>
          <strong>Security</strong>: your IP address is used briefly to limit how often the form can be submitted,
          to stop abuse. It isn&rsquo;t stored with your request.
        </li>
      </ul>
      <p>This website doesn&rsquo;t use advertising or tracking cookies.</p>

      <h2>How we use it</h2>
      <ul>
        <li>To answer calls, decide whether to put a caller through, take messages and send summaries.</li>
        <li>To bill customers and keep usage within the limits of their plan.</li>
        <li>To keep the service secure and working, and to fix it when it doesn&rsquo;t.</li>
        <li>To reply to early-access requests and set up pilots.</li>
        <li>To meet our legal obligations.</li>
      </ul>
      <p>
        We don&rsquo;t sell personal information, and we don&rsquo;t share it for targeted advertising. We
        don&rsquo;t use call content to train AI models, and where a provider offers a setting to exclude our data
        from model training, we use it.
      </p>

      <h2>Calls are recorded, transcribed and answered by an AI</h2>
      <p>
        Doug is an automated AI assistant. At the start of every call it tells the caller that the call is being
        recorded and transcribed, and that it&rsquo;s an AI. It never claims to be a person or to be the customer
        it answers for, and it says it&rsquo;s an AI to anyone who asks.
      </p>

      <h2>Text messages</h2>
      <p>
        Customers can choose to get call summaries by text message. We only text the numbers a customer gives us
        for this, and only about their calls. Message and data rates may apply. Reply STOP to stop the texts at any
        time, or HELP for help.{" "}
        <strong>
          We don&rsquo;t share mobile phone numbers or text-messaging consent with third parties or affiliates for
          their marketing.
        </strong>
      </p>

      <h2>Who we share it with</h2>
      <p>
        We use the providers below to run Doug. Each one only gets the data it needs to do its job, and is bound by
        its terms to protect it.
      </p>
      <ul>
        <li>Twilio: carries calls and text messages, and stores voicemail recordings.</li>
        <li>Deepgram: turns speech into text.</li>
        <li>Anthropic: the Claude AI model that reads the conversation and decides how Doug should reply.</li>
        <li>ElevenLabs: generates Doug&rsquo;s voice from the text of its replies.</li>
        <li>Resend: sends email, including call summaries.</li>
        <li>Our cloud hosting provider: runs our servers and stores the data described here.</li>
        <li>Google: only if a customer connects a calendar, to check free/busy times.</li>
        <li>Vercel and Upstash: host this website and store early-access requests.</li>
        <li>Our payment provider: processes subscription payments.</li>
      </ul>
      <p>
        We also disclose information if the law requires it, to protect people&rsquo;s safety or our rights, or as
        part of a merger or sale of our business, in which case this notice keeps applying to it.
      </p>

      <h2>Where it&rsquo;s processed</h2>
      <p>
        We and our providers mainly process data in the United States. If you&rsquo;re in the European Economic
        Area, the UK or Switzerland, your data is transferred to the US under the safeguards the law provides, such
        as the European Commission&rsquo;s standard contractual clauses or the EU&ndash;US Data Privacy Framework.
      </p>

      <h2>How long we keep it</h2>
      <ul>
        <li>
          Call records, transcripts, messages, caller history and voicemail recordings are deleted automatically
          after 30 days. A customer can ask us to delete everything about their line sooner, and we will.
        </li>
        <li>
          Customer account details are kept while the account is open, and deleted within 30 days after it closes.
        </li>
        <li>
          Billing records are kept for as long as tax and accounting law requires, which is usually up to seven
          years.
        </li>
        <li>
          Early-access requests are kept until you ask us to delete them, or until we no longer need them to
          contact you about Doug.
        </li>
      </ul>

      <h2>Security</h2>
      <p>
        Data is encrypted in transit between the phone network, our servers and our providers. We check that every
        request claiming to come from the phone network really does, and only the people who operate the service
        can see call data. Our operational logs leave out phone numbers and call content. No system is perfectly
        secure. If a breach affects your information, we&rsquo;ll tell you, and the authorities where the law
        requires it.
      </p>

      <h2>Your rights</h2>
      <p>
        You can ask us to tell you what personal information we hold about you, to give you a copy, to correct it
        or to delete it. Email {email}. We&rsquo;ll confirm who you are before acting on a request, and reply
        within 30 days, or sooner where the law requires it. We won&rsquo;t treat you differently for using these
        rights. If the data belongs to a customer&rsquo;s line, such as a message you left, we may pass your
        request to that customer.
      </p>
      <h3>United States</h3>
      <p>
        Depending on your state, including California, Colorado, Connecticut, Virginia and others, you may have the
        rights above plus the right to know the categories of information we collect and the providers we share it
        with (both listed on this page), and the right to appeal if we turn down your request. We don&rsquo;t sell
        or share personal information for targeted advertising, so there is nothing to opt out of. You can use an
        authorized agent to make a request on your behalf.
      </p>
      <h3>European Economic Area, UK and Switzerland</h3>
      <p>
        We use your data because we need to in order to provide a service you asked for (for customers and
        early-access requests), because it&rsquo;s in our or our customer&rsquo;s legitimate interest to answer
        and handle calls (for callers), or because the law requires it. Besides the rights above, you can object to
        or restrict our use of your data, and take your data elsewhere. You can also complain to your local data
        protection authority.
      </p>

      <h2>Children</h2>
      <p>
        Doug is for adults. Customers must be 18 or older, and we don&rsquo;t knowingly collect information from
        children except where a child happens to call a line that Doug answers. If you believe we hold a
        child&rsquo;s information that we shouldn&rsquo;t, email us and we&rsquo;ll delete it.
      </p>

      <h2>Changes to this notice</h2>
      <p>
        If we change this notice, we&rsquo;ll update the date at the top. If a change materially affects how we
        use your information, we&rsquo;ll tell customers by email before it takes effect.
      </p>

      <h2>Contact</h2>
      <p>
        {site.legalName}. Email {email} with any question about this notice or your data.
      </p>
    </LegalPage>
  );
}
