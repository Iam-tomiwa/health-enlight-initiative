"use client";

import { useState, type FormEvent } from "react";
import { ArrowRight } from "./icons";

type Field = "name" | "email" | "subject" | "message";

export default function ContactForm({
  variant = "contact",
}: {
  variant?: "contact" | "volunteer";
}) {
  const [values, setValues] = useState<Record<Field, string>>({
    name: "",
    email: "",
    subject: "",
    message: "",
  });
  const [newsletterOptIn, setNewsletterOptIn] = useState(false);
  const [website, setWebsite] = useState("");
  const [errors, setErrors] = useState<Partial<Record<Field, string>>>({});
  const [status, setStatus] = useState<"idle" | "sending" | "sent" | "error">(
    "idle",
  );

  const set = (field: Field, value: string) => {
    setValues((previous) => ({ ...previous, [field]: value }));
    if (errors[field]) setErrors((previous) => ({ ...previous, [field]: undefined }));
    if (status === "error") setStatus("idle");
  };

  const validate = () => {
    const next: Partial<Record<Field, string>> = {};
    if (!values.name.trim()) next.name = "Please tell us your name.";
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(values.email.trim()))
      next.email = "Enter a valid email address.";
    if (!values.message.trim()) next.message = "Add a short message.";
    setErrors(next);
    return Object.keys(next).length === 0;
  };

  const onSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!validate()) return;

    setStatus("sending");
    try {
      const response = await fetch("/api/forms", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...values,
          email: values.email.trim(),
          newsletterOptIn: variant === "volunteer" || newsletterOptIn,
          website,
          formType: variant,
        }),
      });

      if (!response.ok) throw new Error("Form submission failed");
      setStatus("sent");
    } catch {
      setStatus("error");
    }
  };

  const labelFor =
    variant === "volunteer" ? "How would you like to help?" : "Message";

  if (status === "sent") {
    return (
      <div className="rounded-3xl border border-line bg-brand-50/60 p-8 text-center" role="status">
        <div className="mx-auto grid h-14 w-14 place-items-center rounded-full bg-brand text-white">
          <svg viewBox="0 0 24 24" className="h-7 w-7" fill="none" stroke="currentColor" strokeWidth={2}>
            <path d="m5 13 4 4L19 7" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </div>
        <h3 className="mt-5 font-display text-xl font-semibold text-ink">
          Thank you, {values.name.split(" ")[0] || "friend"}!
        </h3>
        <p className="mx-auto mt-2 max-w-sm text-sm text-muted">
          Your {variant === "volunteer" ? "volunteer application" : "message"} has been sent. We&apos;ll get back to you as soon as we can.
        </p>
      </div>
    );
  }

  return (
    <form onSubmit={onSubmit} noValidate className="space-y-5">
      <div className="grid gap-5 sm:grid-cols-2">
        <Field id={`${variant}-name`} label="Name" value={values.name} onChange={(value) => set("name", value)} error={errors.name} autoComplete="name" />
        <Field id={`${variant}-email`} label="Email" type="email" value={values.email} onChange={(value) => set("email", value)} error={errors.email} autoComplete="email" />
      </div>
      <Field id={`${variant}-subject`} label="Subject" value={values.subject} onChange={(value) => set("subject", value)} optional />
      <Field id={`${variant}-message`} label={labelFor} value={values.message} onChange={(value) => set("message", value)} error={errors.message} textarea />

      {variant === "contact" ? (
        <div className="flex items-start gap-3">
          <input
            id="contact-newsletter"
            type="checkbox"
            checked={newsletterOptIn}
            onChange={(event) => setNewsletterOptIn(event.target.checked)}
            className="mt-1 h-4 w-4 shrink-0 accent-brand focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand"
          />
          <label htmlFor="contact-newsletter" className="text-sm leading-relaxed text-muted">
            Email me HLI&apos;s newsletter and upcoming public events. I can unsubscribe at any time.
          </label>
        </div>
      ) : (
        <p className="text-sm leading-relaxed text-muted">
          By submitting this volunteer application, you&apos;ll be added to our volunteer list and receive HLI&apos;s newsletter and upcoming public event emails. You can unsubscribe at any time.
        </p>
      )}

      <div className="absolute -left-[10000px] top-auto h-px w-px overflow-hidden" aria-hidden="true">
        <label htmlFor={`${variant}-website`}>Leave this field empty</label>
        <input id={`${variant}-website`} name="website" tabIndex={-1} autoComplete="off" value={website} onChange={(event) => setWebsite(event.target.value)} />
      </div>

      {status === "error" && (
        <p className="text-sm text-red-700" role="alert">
          We couldn&apos;t send your message right now. Please try again, or email us directly at thehealthenlightinitiative@gmail.com.
        </p>
      )}

      <button
        type="submit"
        disabled={status === "sending"}
        className="group inline-flex w-full items-center justify-center gap-2 rounded-full bg-brand px-6 py-3.5 text-sm font-semibold text-white shadow-soft transition-all duration-300 hover:bg-brand-700 hover:shadow-card disabled:cursor-not-allowed disabled:opacity-70 sm:w-auto"
      >
        {status === "sending" ? "Sending…" : variant === "volunteer" ? "Send application" : "Send message"}
        {status !== "sending" && <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />}
      </button>
    </form>
  );
}

function Field({
  id,
  label,
  value,
  onChange,
  error,
  type = "text",
  textarea,
  optional,
  autoComplete,
}: {
  id: string;
  label: string;
  value: string;
  onChange: (value: string) => void;
  error?: string;
  type?: string;
  textarea?: boolean;
  optional?: boolean;
  autoComplete?: string;
}) {
  const shared = "w-full rounded-2xl border bg-white px-4 py-3 text-sm text-ink outline-none transition-colors placeholder:text-muted/50 focus:border-brand focus:ring-2 focus:ring-brand/15";
  const border = error ? "border-red-400" : "border-line";

  return (
    <div>
      <label htmlFor={id} className="mb-1.5 block text-sm font-medium text-ink">
        {label}{optional && <span className="ml-1 text-xs text-muted">(optional)</span>}
      </label>
      {textarea ? (
        <textarea id={id} rows={5} value={value} onChange={(event) => onChange(event.target.value)} aria-invalid={!!error} aria-describedby={error ? `${id}-error` : undefined} className={`${shared} ${border} resize-none`} />
      ) : (
        <input id={id} type={type} value={value} onChange={(event) => onChange(event.target.value)} aria-invalid={!!error} aria-describedby={error ? `${id}-error` : undefined} autoComplete={autoComplete} className={`${shared} ${border}`} />
      )}
      {error && <p id={`${id}-error`} className="mt-1.5 text-xs font-medium text-red-500">{error}</p>}
    </div>
  );
}
