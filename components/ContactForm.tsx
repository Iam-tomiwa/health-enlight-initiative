"use client";

import { useState, type FormEvent } from "react";
import { ArrowRight } from "./icons";
import {
  volunteerPreferenceOptions,
  volunteerSkillOptions,
  volunteerStatusOptions,
} from "@/lib/volunteer-form";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

type Field =
  | "name"
  | "email"
  | "subject"
  | "message"
  | "whatsapp"
  | "lga"
  | "status"
  | "statusOther"
  | "preference"
  | "skillOther";

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
    whatsapp: "",
    lga: "",
    status: "",
    statusOther: "",
    preference: "",
    skillOther: "",
  });
  const [skills, setSkills] = useState<string[]>([]);
  const [newsletterOptIn, setNewsletterOptIn] = useState(false);
  const [website, setWebsite] = useState("");
  const [errors, setErrors] = useState<Partial<Record<Field, string>>>({});
  const [status, setStatus] = useState<"idle" | "sending" | "sent" | "error">(
    "idle",
  );

  const set = (field: Field, value: string) => {
    setValues((previous) => ({ ...previous, [field]: value }));
    if (errors[field])
      setErrors((previous) => ({ ...previous, [field]: undefined }));
    if (status === "error") setStatus("idle");
  };

  const validate = () => {
    const next: Partial<Record<Field, string>> = {};
    if (!values.name.trim()) next.name = "Please tell us your name.";
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(values.email.trim()))
      next.email = "Enter a valid email address.";
    if (variant === "volunteer") {
      if (!values.whatsapp.trim())
        next.whatsapp = "Enter your WhatsApp phone number.";
      if (!values.lga.trim()) next.lga = "Enter your Local Government Area.";
      if (
        !volunteerStatusOptions.includes(
          values.status as (typeof volunteerStatusOptions)[number],
        )
      )
        next.status =
          "Choose the option that best describes your current status.";
      if (values.status === "Other" && !values.statusOther.trim())
        next.statusOther = "Please specify your current status.";
      if (
        !volunteerPreferenceOptions.includes(
          values.preference as (typeof volunteerPreferenceOptions)[number],
        )
      )
        next.preference = "Choose how you would prefer to volunteer.";
      if (skills.length === 0)
        next.skillOther = "Select at least one skill or area of experience.";
      if (skills.includes("Other") && !values.skillOther.trim())
        next.skillOther =
          "Please specify your other skill or area of experience.";
    } else if (!values.message.trim()) {
      next.message = "Add a short message.";
    }
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
          ...(variant === "volunteer"
            ? {
                name: values.name,
                email: values.email.trim(),
                whatsapp: values.whatsapp,
                lga: values.lga,
                status: values.status,
                statusOther: values.statusOther,
                preference: values.preference,
                skills,
                skillOther: values.skillOther,
              }
            : {
                ...values,
                email: values.email.trim(),
              }),
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

  if (status === "sent") {
    return (
      <div
        className="rounded-3xl border border-line bg-brand-50/60 p-8 text-center"
        role="status"
      >
        <div className="mx-auto grid h-14 w-14 place-items-center rounded-full bg-brand text-white">
          <svg
            viewBox="0 0 24 24"
            className="h-7 w-7"
            fill="none"
            stroke="currentColor"
            strokeWidth={2}
          >
            <path
              d="m5 13 4 4L19 7"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </div>
        <h3 className="mt-5 font-display text-xl font-semibold text-ink">
          Thank you, {values.name.split(" ")[0] || "friend"}!
        </h3>
        <p className="mx-auto mt-2 max-w-sm text-sm text-muted">
          Your {variant === "volunteer" ? "volunteer application" : "message"}{" "}
          has been sent. We&apos;ll get back to you as soon as we can.
        </p>
      </div>
    );
  }

  return (
    <form onSubmit={onSubmit} noValidate className="space-y-5">
      <div className="grid gap-5 sm:grid-cols-2">
        <Field
          id={`${variant}-name`}
          label={variant === "volunteer" ? "Full Name" : "Name"}
          value={values.name}
          onChange={(value) => set("name", value)}
          error={errors.name}
          autoComplete="name"
        />
        <Field
          id={`${variant}-email`}
          label={variant === "volunteer" ? "Email Address" : "Email"}
          type="email"
          value={values.email}
          onChange={(value) => set("email", value)}
          error={errors.email}
          autoComplete="email"
        />
      </div>

      {variant === "volunteer" ? (
        <>
          <div className="grid gap-5 sm:grid-cols-2">
            <Field
              id="volunteer-whatsapp"
              label="WhatsApp Phone Number"
              type="tel"
              value={values.whatsapp}
              onChange={(value) => set("whatsapp", value)}
              error={errors.whatsapp}
              autoComplete="tel"
              placeholder="e.g. +234 801 234 5678"
            />
            <Field
              id="volunteer-lga"
              label="Local Government Area (LGA)"
              value={values.lga}
              onChange={(value) => set("lga", value)}
              error={errors.lga}
              autoComplete="address-level2"
            />
          </div>

          <SelectField
            id="volunteer-status"
            label="What best describes your current status?"
            value={values.status}
            onChange={(value) => set("status", value)}
            options={volunteerStatusOptions.map((option) => ({
              value: option,
              label: option,
            }))}
            error={errors.status}
          />
          {values.status === "Other" && (
            <Field
              id="volunteer-status-other"
              label="Please specify your current status"
              value={values.statusOther}
              onChange={(value) => set("statusOther", value)}
              error={errors.statusOther}
            />
          )}

          <SelectField
            id="volunteer-preference"
            label="How would you prefer to volunteer with HLI?"
            value={values.preference}
            onChange={(value) => set("preference", value)}
            options={volunteerPreferenceOptions.map((option) => ({
              value: option,
              label: option,
            }))}
            error={errors.preference}
          />

          <fieldset
            aria-describedby={
              errors.skillOther ? "volunteer-skills-error" : undefined
            }
          >
            <legend className="text-sm font-medium text-ink">
              What skills or areas of experience can you bring to the HLI team?{" "}
              <span className="text-red-600" aria-hidden="true">
                *
              </span>
            </legend>
            <p className="mt-1 text-sm text-muted">Select all that apply.</p>
            <div className="mt-3 grid gap-2 sm:grid-cols-2">
              {volunteerSkillOptions.map((skill) => {
                const checked = skills.includes(skill);
                return (
                  <label
                    key={skill}
                    className={`flex min-h-12 cursor-pointer items-center gap-3 rounded-2xl border px-4 py-3 text-sm transition-colors focus-within:ring-2 focus-within:ring-brand/20 ${checked ? "border-brand bg-brand-50" : "border-line bg-white hover:border-brand/50"}`}
                  >
                    <input
                      type="checkbox"
                      name="volunteer-skills"
                      value={skill}
                      checked={checked}
                      onChange={(event) => {
                        setSkills((current) =>
                          event.target.checked
                            ? [...current, skill]
                            : current.filter((selected) => selected !== skill),
                        );
                        if (errors.skillOther)
                          setErrors((current) => ({
                            ...current,
                            skillOther: undefined,
                          }));
                        if (status === "error") setStatus("idle");
                      }}
                      className="h-4 w-4 shrink-0 accent-brand"
                    />
                    <span>{skill}</span>
                  </label>
                );
              })}
            </div>
            {skills.includes("Other") && (
              <div className="mt-4">
                <Field
                  id="volunteer-skill-other"
                  label="Please specify your other skill or area of experience"
                  value={values.skillOther}
                  onChange={(value) => set("skillOther", value)}
                  error={errors.skillOther}
                />
              </div>
            )}
            {errors.skillOther && !skills.includes("Other") && (
              <p
                id="volunteer-skills-error"
                className="mt-2 text-xs font-medium text-red-600"
                role="alert"
              >
                {errors.skillOther}
              </p>
            )}
          </fieldset>
        </>
      ) : (
        <>
          <Field
            id="contact-subject"
            label="Subject"
            value={values.subject}
            onChange={(value) => set("subject", value)}
            optional
          />
          <Field
            id="contact-message"
            label="Message"
            value={values.message}
            onChange={(value) => set("message", value)}
            error={errors.message}
            textarea
          />
        </>
      )}

      {variant === "contact" ? (
        <div className="flex items-start gap-3">
          <input
            id="contact-newsletter"
            type="checkbox"
            checked={newsletterOptIn}
            onChange={(event) => setNewsletterOptIn(event.target.checked)}
            className="mt-1 h-4 w-4 shrink-0 accent-brand focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand"
          />
          <label
            htmlFor="contact-newsletter"
            className="text-sm leading-relaxed text-muted"
          >
            Email me HLI&apos;s newsletter and upcoming public events. I can
            unsubscribe at any time.
          </label>
        </div>
      ) : (
        <p className="text-sm leading-relaxed text-muted">
          By submitting this volunteer application, you&apos;ll be added to
          HLI&apos;s newsletter and upcoming public event emails. You can
          unsubscribe at any time.
        </p>
      )}

      <div
        className="absolute -left-[10000px] top-auto h-px w-px overflow-hidden"
        aria-hidden="true"
      >
        <label htmlFor={`${variant}-website`}>Leave this field empty</label>
        <input
          id={`${variant}-website`}
          name="website"
          tabIndex={-1}
          autoComplete="off"
          value={website}
          onChange={(event) => setWebsite(event.target.value)}
        />
      </div>

      {status === "error" && (
        <p className="text-sm text-red-700" role="alert">
          We couldn&apos;t send your{" "}
          {variant === "volunteer" ? "application" : "message"} right now.
          Please try again, or email us directly at
          thehealthenlightinitiative@gmail.com.
        </p>
      )}

      <button
        type="submit"
        disabled={status === "sending"}
        className="group inline-flex w-full items-center justify-center gap-2 rounded-full bg-brand px-6 py-3.5 text-sm font-semibold text-white shadow-soft transition-all duration-300 hover:bg-brand-700 hover:shadow-card disabled:cursor-not-allowed disabled:opacity-70 sm:w-auto"
      >
        {status === "sending"
          ? "Sending…"
          : variant === "volunteer"
            ? "Send application"
            : "Send message"}
        {status !== "sending" && (
          <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
        )}
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
  placeholder,
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
  placeholder?: string;
}) {
  const shared =
    "w-full rounded-2xl border bg-white px-4 py-3 text-sm text-ink outline-none transition-colors placeholder:text-muted/50 focus:border-brand focus:ring-2 focus:ring-brand/15";
  const border = error ? "border-red-400" : "border-line";

  return (
    <div>
      <label htmlFor={id} className="mb-1.5 block text-sm font-medium text-ink">
        {label}
        {optional && (
          <span className="ml-1 text-xs text-muted">(optional)</span>
        )}
      </label>
      {textarea ? (
        <textarea
          id={id}
          rows={5}
          value={value}
          onChange={(event) => onChange(event.target.value)}
          aria-invalid={!!error}
          aria-describedby={error ? `${id}-error` : undefined}
          className={`${shared} ${border} resize-none`}
        />
      ) : (
        <input
          id={id}
          type={type}
          value={value}
          onChange={(event) => onChange(event.target.value)}
          aria-invalid={!!error}
          aria-describedby={error ? `${id}-error` : undefined}
          autoComplete={autoComplete}
          placeholder={placeholder}
          className={`${shared} ${border}`}
        />
      )}
      {error && (
        <p
          id={`${id}-error`}
          className="mt-1.5 text-xs font-medium text-red-500"
        >
          {error}
        </p>
      )}
    </div>
  );
}

function SelectField({
  id,
  label,
  value,
  onChange,
  options,
  error,
  hint,
}: {
  id: string;
  label: string;
  value: string;
  onChange: (value: string) => void;
  options: Array<{ value: string; label: string }>;
  error?: string;
  hint?: string;
}) {
  return (
    <div>
      <label htmlFor={id} className="mb-1.5 block text-sm font-medium text-ink">
        {label}{" "}
        <span className="text-red-600" aria-hidden="true">
          *
        </span>
      </label>
      {hint && (
        <p id={`${id}-hint`} className="mb-2 text-sm text-muted">
          {hint}
        </p>
      )}
      <Select value={value} onValueChange={onChange}>
        <SelectTrigger
          id={id}
          aria-invalid={!!error}
          aria-required="true"
          aria-describedby={
            [hint ? `${id}-hint` : "", error ? `${id}-error` : ""]
              .filter(Boolean)
              .join(" ") || undefined
          }
          className={error ? "border-red-400" : ""}
        >
          <SelectValue placeholder="Select an option" />
        </SelectTrigger>
        <SelectContent>
          {options.map((option) => (
            <SelectItem key={option.value} value={option.value}>
              {option.label}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
      {error && (
        <p
          id={`${id}-error`}
          className="mt-1.5 text-xs font-medium text-red-600"
          role="alert"
        >
          {error}
        </p>
      )}
    </div>
  );
}
