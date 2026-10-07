import Link from "next/link";
import { Phone } from "lucide-react";

import { WhatsAppIcon } from "@/components/Brand";
import { site, telHref, whatsappHref } from "@/lib/site";

export default function CtaBand({
  title = "See your own chargers on ChargeVeta.",
  body = "Tell us how many chargers you run or plan to. We'll connect one of them to a demo network and walk you through a live session, start to invoice.",
}: {
  title?: string;
  body?: string;
}) {
  return (
    <section className="shell pb-20 lg:pb-28">
      <div className="relative overflow-hidden rounded-[2rem] bg-ink px-6 [contain:paint] py-12 text-white sm:px-10 lg:px-16 lg:py-16">
        {/* a charging bay's floor marking, drawn rather than photographed */}
        <svg
          aria-hidden
          viewBox="0 0 400 400"
          className="pointer-events-none absolute -right-16 -bottom-24 h-[26rem] w-[26rem] text-white/[0.05]"
        >
          <path d="M226 20 92 214h96l-26 166 146-200H210z" fill="currentColor" />
        </svg>

        <div className="relative grid grid-cols-1 gap-10 lg:grid-cols-[1.4fr_1fr] lg:items-end">
          <div>
            <h2 className="display text-[2rem] font-bold text-white sm:text-[2.6rem]">
              {title}
            </h2>
            <p className="mt-4 max-w-xl text-[1.0625rem] leading-relaxed text-white/70">
              {body}
            </p>
          </div>
          <div className="flex flex-col gap-3 sm:flex-row lg:flex-col">
            <Link
              href="/contact"
              className="rounded-xl bg-charging px-5 py-3.5 text-center font-semibold text-ink transition-colors hover:bg-white"
            >
              Book a demo
            </Link>
            <a
              href={whatsappHref("Hello ChargeVeta, I'd like to see a demo.")}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-center gap-2 rounded-xl bg-white/10 px-5 py-3.5 font-semibold text-white ring-1 ring-white/15 transition-colors hover:bg-white/15"
            >
              <WhatsAppIcon size={18} />
              Chat on WhatsApp
            </a>
            <a
              href={telHref}
              className="flex items-center justify-center gap-2 rounded-xl px-5 py-3 text-sm font-medium text-white/70 transition-colors hover:text-white"
            >
              <Phone size={15} aria-hidden />
              <span className="tnum">Call {site.contact.phone}</span>
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
