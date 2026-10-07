import type { Metadata } from "next";
import { Clock, Mail, MapPin, Phone } from "lucide-react";

import { AppMeSoft, WhatsAppIcon } from "@/components/Brand";
import ContactForm from "@/components/ContactForm";
import PageHeader from "@/components/PageHeader";
import WhatsAppQr from "@/components/WhatsAppQr";
import { addressLines, mailHref, site, telHref, whatsappHref } from "@/lib/site";

export const metadata: Metadata = {
  title: "Contact",
  description: `Talk to the ChargeVeta team on WhatsApp, by phone on ${site.contact.phone}, or by email at ${site.contact.email}.`,
  alternates: { canonical: "/contact" },
};

export default function ContactPage() {
  const rows = [
    { icon: Phone, label: "Call", value: site.contact.phone, href: telHref, tnum: true },
    {
      icon: WhatsAppIcon,
      label: "WhatsApp",
      value: site.contact.phone,
      href: whatsappHref("Hello ChargeVeta, I have a question."),
      tnum: true,
      external: true,
    },
    { icon: Mail, label: "Email", value: site.contact.email, href: mailHref },
  ];

  return (
    <>
      <PageHeader title="Talk to the people who build it.">
        <p>
          Fill in the form and it opens WhatsApp with your message ready to
          send. Or scan the code, call us, or write.
        </p>
      </PageHeader>

      <section className="shell pb-20 lg:pb-28">
        <div className="grid grid-cols-1 gap-6 lg:grid-cols-[0.85fr_1.15fr]">
          {/* how to reach a person */}
          <div className="relative overflow-hidden rounded-[1.75rem] bg-ink p-7 text-white [contain:paint] sm:p-9">
            <div
              aria-hidden
              className="glow pointer-events-none absolute -top-32 -right-32 h-80 w-80 bg-charging/30"
            />
            <div className="relative">
              <h2 className="wide text-xl font-bold">Reach us directly</h2>
              <p className="mt-2 flex items-center gap-2 text-sm text-white/65">
                <Clock size={15} aria-hidden />
                {site.contact.hours}
              </p>

              <ul className="mt-7 space-y-3">
                {rows.map((r) => (
                  <li key={r.label}>
                    <a
                      href={r.href}
                      {...(r.external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
                      className="flex items-center gap-4 rounded-2xl bg-white/6 px-4 py-3.5 ring-1 ring-white/10 transition-colors hover:bg-white/12"
                    >
                      <span className="grid h-10 w-10 shrink-0 place-items-center rounded-xl bg-white/10 text-charging">
                        <r.icon size={18} aria-hidden />
                      </span>
                      <span className="min-w-0">
                        <span className="block text-xs text-white/55">{r.label}</span>
                        <span className={`block font-semibold [overflow-wrap:anywhere] ${r.tnum ? "tnum" : ""}`}>
                          {r.value}
                        </span>
                      </span>
                    </a>
                  </li>
                ))}
                <li>
                  <a
                    href={site.contact.mapsUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-4 rounded-2xl bg-white/6 px-4 py-3.5 ring-1 ring-white/10 transition-colors hover:bg-white/12"
                  >
                    <span className="grid h-10 w-10 shrink-0 place-items-center rounded-xl bg-white/10 text-charging">
                      <MapPin size={18} aria-hidden />
                    </span>
                    <span>
                      <span className="block text-xs text-white/55">Office</span>
                      <span className="block font-semibold">
                        {addressLines[0]}, {addressLines[1]}
                      </span>
                    </span>
                  </a>
                </li>
              </ul>

              <div className="mt-8 flex flex-col items-start gap-5 border-t border-white/10 pt-8 sm:flex-row sm:items-center">
                <WhatsAppQr />
                <div>
                  <p className="wide text-lg font-bold">Scan to chat on WhatsApp</p>
                  <p className="mt-2 max-w-[16rem] text-sm leading-relaxed text-white/65">
                    Point your phone&apos;s camera at the code. A chat with
                    ChargeVeta opens, ready for your question.
                  </p>
                </div>
              </div>

              <p className="mt-8 text-sm text-white/60">
                ChargeVeta is a product of <AppMeSoft onDark />.
              </p>
            </div>
          </div>

          {/* the form */}
          <div className="rounded-[1.75rem] bg-white p-7 ring-1 ring-line sm:p-9">
            <h2 className="wide text-xl font-bold text-ink">Send us a message</h2>
            <p className="mt-2 text-[0.9375rem]">
              Fields marked <span className="text-faulted">*</span> are needed
              so we can reply.
            </p>
            <div className="mt-7">
              <ContactForm />
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
