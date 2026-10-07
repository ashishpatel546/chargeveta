"use client";

import { useState } from "react";
import { CheckCircle2 } from "lucide-react";

import { WhatsAppIcon } from "@/components/Brand";
import { whatsappHref } from "@/lib/site";

type Fields = {
  name: string;
  organisation: string;
  phone: string;
  email: string;
  city: string;
  role: string;
  chargers: string;
  message: string;
};

const roles = [
  "Running or planning a public charging network",
  "Putting chargers in a housing society or office",
  "Adding chargers at a hotel, mall or restaurant",
  "Managing an EV fleet",
  "Making or selling chargers",
  "A driver who needs help with a charge",
  "Something else",
];

const chargerCounts = [
  "Planning my first",
  "1 to 10",
  "11 to 50",
  "51 to 200",
  "More than 200",
];

const empty: Fields = {
  name: "",
  organisation: "",
  phone: "",
  email: "",
  city: "",
  role: roles[0],
  chargers: chargerCounts[0],
  message: "",
};

type Errors = Partial<Record<keyof Fields, string>>;

function validate(f: Fields): Errors {
  const e: Errors = {};
  if (!f.name.trim()) e.name = "Enter your name so we know who we're talking to.";
  const digits = f.phone.replace(/\D/g, "");
  if (!f.phone.trim()) e.phone = "Enter a phone number we can reply on.";
  else if (digits.length < 10 || digits.length > 13)
    e.phone = "Enter a 10-digit mobile number, with the country code if outside India.";
  if (f.email.trim() && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(f.email.trim()))
    e.email = "That email address is missing something. Check it, or leave it empty.";
  return e;
}

function compose(f: Fields) {
  const lines = [
    "Hello ChargeVeta,",
    "",
    `Name: ${f.name.trim()}`,
    f.organisation.trim() ? `Organisation: ${f.organisation.trim()}` : null,
    `Phone: ${f.phone.trim()}`,
    f.email.trim() ? `Email: ${f.email.trim()}` : null,
    f.city.trim() ? `City: ${f.city.trim()}` : null,
    `I am: ${f.role}`,
    f.role.startsWith("A driver") ? null : `Chargers: ${f.chargers}`,
    f.message.trim() ? `\n${f.message.trim()}` : null,
  ];
  return lines.filter((l) => l !== null).join("\n");
}

export default function ContactForm() {
  const [fields, setFields] = useState<Fields>(empty);
  const [errors, setErrors] = useState<Errors>({});
  const [sentUrl, setSentUrl] = useState<string | null>(null);

  const update =
    (key: keyof Fields) =>
    (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
      setFields((f) => ({ ...f, [key]: e.target.value }));
      if (errors[key]) setErrors((x) => ({ ...x, [key]: undefined }));
    };

  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const found = validate(fields);
    setErrors(found);
    const first = Object.keys(found)[0];
    if (first) {
      document.getElementById(`cf-${first}`)?.focus();
      return;
    }
    const url = whatsappHref(compose(fields));
    window.open(url, "_blank", "noopener,noreferrer");
    setSentUrl(url);
  };

  const input = (key: keyof Fields) =>
    `mt-2 block min-h-12 w-full rounded-xl border bg-white px-4 py-3 text-base text-ink outline-none transition-[border-color,box-shadow] placeholder:text-muted/70 focus:border-volt focus:ring-4 focus:ring-volt/15 ${
      errors[key] ? "border-faulted" : "border-line-strong"
    }`;

  const select =
    "mt-2 block min-h-12 w-full min-w-0 max-w-full cursor-pointer appearance-none truncate rounded-xl border border-line-strong bg-white bg-[length:12px] bg-[right_1rem_center] bg-no-repeat px-4 py-3 pr-10 text-base text-ink outline-none focus:border-volt focus:ring-4 focus:ring-volt/15";
  const chevron = {
    backgroundImage:
      "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='12' height='8' fill='none'%3E%3Cpath d='M1 1.5 6 6.5l5-5' stroke='%235f6688' stroke-width='1.8' stroke-linecap='round'/%3E%3C/svg%3E\")",
  };

  const errorText = (key: keyof Fields) =>
    errors[key] ? (
      <p id={`cf-${key}-error`} className="mt-1.5 text-sm text-faulted">
        {errors[key]}
      </p>
    ) : null;

  const describedBy = (key: keyof Fields) =>
    errors[key] ? `cf-${key}-error` : undefined;

  if (sentUrl) {
    return (
      <div role="status" className="flex h-full flex-col items-start justify-center py-6">
        <CheckCircle2 size={40} className="text-available" aria-hidden />
        <h2 className="wide mt-5 text-2xl font-bold text-ink">
          Your message is ready in WhatsApp.
        </h2>
        <p className="mt-3 max-w-md leading-relaxed">
          WhatsApp has opened with your details filled in. Press send there and
          we&apos;ll reply on the same chat, usually within a working day.
        </p>
        <div className="mt-7 flex flex-col gap-3 sm:flex-row">
          <a
            href={sentUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center justify-center gap-2 rounded-xl bg-[#1da851] px-5 py-3 font-semibold text-white hover:bg-[#178a43]"
          >
            <WhatsAppIcon size={18} />
            Open WhatsApp again
          </a>
          <button
            type="button"
            onClick={() => {
              setFields(empty);
              setSentUrl(null);
            }}
            className="rounded-xl px-5 py-3 font-semibold text-ink ring-1 ring-line-strong hover:ring-ink"
          >
            Write another message
          </button>
        </div>
      </div>
    );
  }

  return (
    <form noValidate onSubmit={onSubmit} className="grid grid-cols-1 gap-5 sm:grid-cols-2">
      <div>
        <label htmlFor="cf-name" className="text-sm font-semibold text-ink">
          Your name <span className="text-faulted">*</span>
        </label>
        <input
          id="cf-name"
          autoComplete="name"
          value={fields.name}
          onChange={update("name")}
          aria-invalid={Boolean(errors.name)}
          aria-describedby={describedBy("name")}
          className={input("name")}
        />
        {errorText("name")}
      </div>

      <div>
        <label htmlFor="cf-organisation" className="text-sm font-semibold text-ink">
          Company, society or site
        </label>
        <input
          id="cf-organisation"
          autoComplete="organization"
          value={fields.organisation}
          onChange={update("organisation")}
          className={input("organisation")}
        />
      </div>

      <div>
        <label htmlFor="cf-phone" className="text-sm font-semibold text-ink">
          Phone <span className="text-faulted">*</span>
        </label>
        <input
          id="cf-phone"
          type="tel"
          inputMode="tel"
          autoComplete="tel"
          placeholder="+91 98765 43210"
          value={fields.phone}
          onChange={update("phone")}
          aria-invalid={Boolean(errors.phone)}
          aria-describedby={describedBy("phone")}
          className={input("phone")}
        />
        {errorText("phone")}
      </div>

      <div>
        <label htmlFor="cf-email" className="text-sm font-semibold text-ink">
          Email
        </label>
        <input
          id="cf-email"
          type="email"
          autoComplete="email"
          value={fields.email}
          onChange={update("email")}
          aria-invalid={Boolean(errors.email)}
          aria-describedby={describedBy("email")}
          className={input("email")}
        />
        {errorText("email")}
      </div>

      <div className="sm:col-span-2">
        <label htmlFor="cf-role" className="text-sm font-semibold text-ink">
          Which describes you best?
        </label>
        <select
          id="cf-role"
          value={fields.role}
          onChange={update("role")}
          className={select}
          style={chevron}
        >
          {roles.map((r) => (
            <option key={r}>{r}</option>
          ))}
        </select>
      </div>

      {fields.role.startsWith("A driver") ? null : (
        <div>
          <label htmlFor="cf-chargers" className="text-sm font-semibold text-ink">
            How many chargers?
          </label>
          <select
            id="cf-chargers"
            value={fields.chargers}
            onChange={update("chargers")}
            className={select}
            style={chevron}
          >
            {chargerCounts.map((c) => (
              <option key={c}>{c}</option>
            ))}
          </select>
        </div>
      )}

      <div className={fields.role.startsWith("A driver") ? "sm:col-span-2" : ""}>
        <label htmlFor="cf-city" className="text-sm font-semibold text-ink">
          City
        </label>
        <input
          id="cf-city"
          autoComplete="address-level2"
          value={fields.city}
          onChange={update("city")}
          className={input("city")}
        />
      </div>

      <div className="sm:col-span-2">
        <label htmlFor="cf-message" className="text-sm font-semibold text-ink">
          What would you like to know?
        </label>
        <textarea
          id="cf-message"
          rows={4}
          value={fields.message}
          onChange={update("message")}
          placeholder="For example: we have 12 DC chargers from two makers and want drivers to pay by UPI."
          className={`${input("message")} resize-y`}
        />
      </div>

      <div className="flex flex-col gap-3 sm:col-span-2 sm:flex-row sm:items-center sm:justify-between">
        <p className="text-sm text-muted">
          This opens WhatsApp with your message filled in. Nothing is stored on
          this website.
        </p>
        <button
          type="submit"
          className="flex shrink-0 items-center justify-center gap-2 rounded-xl bg-[#1da851] px-6 py-3.5 font-semibold text-white shadow-[0_10px_24px_-12px_#1da851] transition-colors hover:bg-[#178a43]"
        >
          <WhatsAppIcon size={19} />
          Send on WhatsApp
        </button>
      </div>
    </form>
  );
}
