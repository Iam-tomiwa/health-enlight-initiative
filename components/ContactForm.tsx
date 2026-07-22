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
  const [errors, setErrors] = useState<Partial<Record<Field, string>>>({});
  const [status, setStatus] = useState<"idle" | "sending" | "sent">("idle");

  const set = (f: Field, v: string) => {
    setValues((prev) => ({ ...prev, [f]: v }));
    if (errors[f]) setErrors((e) => ({ ...e, [f]: undefined }));
  };

  const validate = () => {
    const next: Partial<Record<Field, string>> = {};
    if (!values.name.trim()) next.name = "Please tell us your name.";
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(values.email))
      next.email = "Enter a valid email address.";
    if (!values.message.trim()) next.message = "Add a short message.";
    setErrors(next);
    return Object.keys(next).length === 0;
  };

  const onSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (!validate()) return;
    setStatus("sending");
    // No backend is wired up yet — this simulates a submission locally.
    setTimeout(() => setStatus("sent"), 900);
  };

  const labelFor =
    variant === "volunteer"
      ? "How would you like to help?"
      : "Message";

  if (status === "sent") {
    return (
      <div className="rounded-3xl border border-line bg-brand-50/60 p-8 text-center">
        <div className="mx-auto grid h-14 w-14 place-items-center rounded-full bg-brand text-white">
          <svg viewBox="0 0 24 24" className="h-7 w-7" fill="none" stroke="currentColor" strokeWidth={2}>
            <path d="m5 13 4 4L19 7" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </div>
        <h3 className="mt-5 font-display text-xl font-semibold text-ink">
          Thank you, {values.name.split(" ")[0] || "friend"}!
        </h3>
        <p className="mx-auto mt-2 max-w-sm text-sm text-muted">
          Your message has been captured. We&apos;ll get back to you as soon as we
          can.
        </p>
        <p className="mx-auto mt-4 max-w-sm text-xs text-muted/80">
          Note: this is a demo form. Connect an email service or form endpoint to
          receive submissions.
        </p>
      </div>
    );
  }

  return (
    <form onSubmit={onSubmit} noValidate className="space-y-5">
      <div className="grid gap-5 sm:grid-cols-2">
        <Field
          id="name"
          label="Name"
          value={values.name}
          onChange={(v) => set("name", v)}
          error={errors.name}
          autoComplete="name"
        />
        <Field
          id="email"
          label="Email"
          type="email"
          value={values.email}
          onChange={(v) => set("email", v)}
          error={errors.email}
          autoComplete="email"
        />
      </div>
      <Field
        id="subject"
        label="Subject"
        value={values.subject}
        onChange={(v) => set("subject", v)}
        optional
      />
      <Field
        id="message"
        label={labelFor}
        value={values.message}
        onChange={(v) => set("message", v)}
        error={errors.message}
        textarea
      />

      <button
        type="submit"
        disabled={status === "sending"}
        className="group inline-flex w-full items-center justify-center gap-2 rounded-full bg-brand px-6 py-3.5 text-sm font-semibold text-white shadow-soft transition-all duration-300 hover:bg-brand-700 hover:shadow-card disabled:cursor-not-allowed disabled:opacity-70 sm:w-auto"
      >
        {status === "sending" ? "Sending…" : "Send message"}
        {status !== "sending" && (
          <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
        )}
      </button>
      <p className="text-xs text-muted/80">
        This is a demo form and does not yet deliver email. Wire up a form
        endpoint to receive real submissions.
      </p>
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
  onChange: (v: string) => void;
  error?: string;
  type?: string;
  textarea?: boolean;
  optional?: boolean;
  autoComplete?: string;
}) {
  const shared =
    "w-full rounded-2xl border bg-white px-4 py-3 text-sm text-ink outline-none transition-colors placeholder:text-muted/50 focus:border-brand focus:ring-2 focus:ring-brand/15";
  const border = error ? "border-red-400" : "border-line";

  return (
    <div>
      <label htmlFor={id} className="mb-1.5 block text-sm font-medium text-ink">
        {label}
        {optional && <span className="ml-1 text-xs text-muted">(optional)</span>}
      </label>
      {textarea ? (
        <textarea
          id={id}
          rows={5}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          aria-invalid={!!error}
          aria-describedby={error ? `${id}-error` : undefined}
          className={`${shared} ${border} resize-none`}
        />
      ) : (
        <input
          id={id}
          type={type}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          aria-invalid={!!error}
          aria-describedby={error ? `${id}-error` : undefined}
          autoComplete={autoComplete}
          className={`${shared} ${border}`}
        />
      )}
      {error && (
        <p id={`${id}-error`} className="mt-1.5 text-xs font-medium text-red-500">
          {error}
        </p>
      )}
    </div>
  );
}
