"use client";

import { useEffect, useRef, useState } from "react";
import type { PlanId } from "@/content/pricing";
import { track } from "@/lib/analytics";
import { type Errors, HONEYPOT, USES, VOLUMES, VOLUME_LABELS, validate } from "@/lib/early-access";
import { PLAN_EVENT } from "./Cta";
import f from "./EarlyAccess.module.css";

type Status = "idle" | "sending" | "done" | "error";

export function EarlyAccessForm() {
  const [status, setStatus] = useState<Status>("idle");
  const [errors, setErrors] = useState<Errors>({});
  const [message, setMessage] = useState("");
  const [use, setUse] = useState<PlanId>("personal");
  const [name, setName] = useState("");
  const [founding, setFounding] = useState<boolean | null>(null);
  const doneRef = useRef<HTMLDivElement>(null);
  const errorRef = useRef<HTMLParagraphElement>(null);

  // Pricing buttons preselect the matching use case.
  useEffect(() => {
    const onPlan = (e: Event) => setUse((e as CustomEvent<PlanId>).detail);
    window.addEventListener(PLAN_EVENT, onPlan);
    return () => window.removeEventListener(PLAN_EVENT, onPlan);
  }, []);

  useEffect(() => {
    if (status === "done") doneRef.current?.focus();
    if (status === "error") errorRef.current?.focus();
  }, [status]);

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget;
    const values = Object.fromEntries(new FormData(form).entries());
    const { data, errors: found } = validate(values);
    setErrors(found);
    if (!data) {
      const first = Object.keys(found)[0];
      form.querySelector<HTMLElement>(`[name="${first}"]`)?.focus();
      return;
    }

    setStatus("sending");
    setMessage("");
    try {
      const res = await fetch("/api/early-access", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...data, [HONEYPOT]: values[HONEYPOT] ?? "" }),
      });
      const body = await res.json().catch(() => ({}));
      if (res.ok) {
        setName(data.name.split(" ")[0]);
        setFounding(typeof body.founding === "boolean" ? body.founding : null);
        setStatus("done");
        track({ name: "form_submit", props: { use: data.use, status: "ok" } });
        return;
      }
      if (body.errors) setErrors(body.errors);
      setMessage(body.error ?? "Something went wrong on our side. Please try again.");
      setStatus("error");
    } catch {
      setMessage("You seem to be offline. Check your connection and try again. Nothing was lost.");
      setStatus("error");
    }
    track({ name: "form_submit", props: { use: data.use, status: "error" } });
  }

  if (status === "done") {
    return (
      <div ref={doneRef} tabIndex={-1} className={f.done} role="status">
        <p className="eyebrow">Request received</p>
        <p className={`display ${f.doneTitle}`}>Thank you{name ? `, ${name}` : ""}.</p>
        <p className="lede">
          Doug will reach out within 24 hours to set up your free pilot. There&rsquo;s nothing else you need to
          do now.
        </p>
        {founding === false && (
          <p className="muted">
            The founding-member seats have all been taken, so we&rsquo;ll confirm your price when we reach out.
          </p>
        )}
      </div>
    );
  }

  const err = (k: keyof Errors) =>
    errors[k] ? (
      <p id={`ea-${k}-error`} className={f.error}>
        {errors[k]}
      </p>
    ) : null;
  const describe = (k: keyof Errors, hint?: string) =>
    [errors[k] ? `ea-${k}-error` : "", hint ?? ""].filter(Boolean).join(" ") || undefined;

  return (
    <form className={f.form} onSubmit={onSubmit} noValidate aria-describedby="ea-intro">
      <p id="ea-intro" className="muted">
        Takes about 30 seconds. No card, no commitment.
      </p>

      <div className={f.field}>
        <label htmlFor="ea-name">Name</label>
        <input
          id="ea-name"
          name="name"
          autoComplete="name"
          required
          aria-invalid={!!errors.name}
          aria-describedby={describe("name")}
        />
        {err("name")}
      </div>

      <div className={f.field}>
        <label htmlFor="ea-email">Email</label>
        <input
          id="ea-email"
          name="email"
          type="email"
          autoComplete="email"
          inputMode="email"
          required
          aria-invalid={!!errors.email}
          aria-describedby={describe("email")}
        />
        {err("email")}
      </div>

      <div className={f.field}>
        <label htmlFor="ea-phone">
          Phone <span className="muted">(optional)</span>
        </label>
        <input
          id="ea-phone"
          name="phone"
          type="tel"
          autoComplete="tel"
          inputMode="tel"
          aria-invalid={!!errors.phone}
          aria-describedby={describe("phone", "ea-phone-hint")}
        />
        <p id="ea-phone-hint" className={f.hint}>
          Only if you&rsquo;d rather we call. We won&rsquo;t add it to any list.
        </p>
        {err("phone")}
      </div>

      <fieldset className={f.field} aria-describedby={describe("use")}>
        <legend>Who is Doug for?</legend>
        <div className={f.segmented}>
          {USES.map((u) => (
            <label key={u} className={f.option}>
              <input type="radio" name="use" value={u} checked={use === u} onChange={() => setUse(u)} />
              <span>{u === "personal" ? "Me — Personal" : "My business"}</span>
            </label>
          ))}
        </div>
        {err("use")}
      </fieldset>

      <div className={f.field}>
        <label htmlFor="ea-volume">Calls a week, roughly</label>
        <select
          id="ea-volume"
          name="volume"
          defaultValue=""
          required
          aria-invalid={!!errors.volume}
          aria-describedby={describe("volume")}
        >
          <option value="" disabled>
            Choose a range
          </option>
          {VOLUMES.map((v) => (
            <option key={v} value={v}>
              {VOLUME_LABELS[v]}
            </option>
          ))}
        </select>
        {err("volume")}
      </div>

      <div className={f.field}>
        <label htmlFor="ea-priority">
          What matters most to you? <span className="muted">(optional)</span>
        </label>
        <textarea
          id="ea-priority"
          name="priority"
          rows={3}
          maxLength={1000}
          placeholder="For example: never missing a new patient after 5pm"
        />
      </div>

      {/* Honeypot: hidden from people and assistive tech, irresistible to bots. */}
      <div className={f.trap} aria-hidden="true">
        <label htmlFor="ea-website">Website</label>
        <input id="ea-website" name={HONEYPOT} tabIndex={-1} autoComplete="off" />
      </div>

      {status === "error" && (
        <p ref={errorRef} tabIndex={-1} className={f.formError} role="alert">
          {message}
        </p>
      )}

      <div className={f.submit}>
        <button type="submit" className="btn" disabled={status === "sending"}>
          {status === "sending" ? "Sending…" : "Request early access"}
        </button>
        <p className={f.hint}>
          We&rsquo;ll only use this to contact you about Doug. See our{" "}
          <a className="link" href="/privacy">
            privacy notice
          </a>
          .
        </p>
      </div>
    </form>
  );
}
