import type { Metadata } from "next";
import Image from "next/image";
import { ExternalLink, Mail, MapPin, Phone } from "lucide-react";

import { AppMeSoft } from "@/components/Brand";
import CtaBand from "@/components/CtaBand";
import PageHeader from "@/components/PageHeader";
import { addressLines, mailHref, site, telHref } from "@/lib/site";

import bays from "../../../public/images/ev-parking-bays.jpg";

export const metadata: Metadata = {
  title: "About",
  description:
    "ChargeVeta is built by AppMeSoft Private Limited in Delhi: software for India's EV charging networks.",
  alternates: { canonical: "/about" },
};

const beliefs = [
  {
    title: "A charger that can't be paid for is a broken charger.",
    body: "Hardware gets the attention, but drivers walk away at the payment step. We put as much care into the wallet, the invoice and the refund as into the protocol.",
  },
  {
    title: "Open standards, so you're never locked in.",
    body: "ChargeVeta talks to chargers over OCPP, the open standard. You can buy chargers from whoever makes the best ones for your site, and they will work.",
  },
  {
    title: "Keep charging when something upstream fails.",
    body: "Internet links drop and servers restart. The system is built so that a driver mid-session never notices.",
  },
  {
    title: "Your numbers have to add up.",
    body: "Money is kept to the paisa, tax is worked out in one place, and every change is logged. Your accountant should never have to correct a receipt.",
  },
];

export default function AboutPage() {
  return (
    <>
      <PageHeader title="Software for the chargers India is putting in the ground.">
        <p>
          ChargeVeta is built by <AppMeSoft />, a software company in Delhi.
          We make the system that sits between a charger, the driver standing
          at it, and the business that owns it.
        </p>
      </PageHeader>

      <section className="shell pb-20 lg:pb-28">
        <Image
          src={bays}
          alt="Parking bays painted green and marked for electric vehicles, each with a charger."
          placeholder="blur"
          priority
          sizes="(min-width: 1216px) 1152px, 100vw"
          className="aspect-[21/9] w-full rounded-[1.75rem] object-cover"
        />
      </section>

      <section className="border-y border-line bg-white">
        <div className="shell grid grid-cols-1 gap-12 py-20 lg:grid-cols-[0.8fr_2fr] lg:gap-16 lg:py-28">
          <h2 className="display text-[2rem] font-bold sm:text-[2.5rem]">What we believe</h2>
          <ul className="grid grid-cols-1 gap-x-12 gap-y-10 sm:grid-cols-2">
            {beliefs.map((b) => (
              <li key={b.title}>
                <h3 className="wide text-lg font-bold text-ink">{b.title}</h3>
                <p className="mt-2 leading-relaxed">{b.body}</p>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section className="shell grid grid-cols-1 gap-12 py-20 lg:grid-cols-2 lg:gap-20 lg:py-28">
        <div>
          <h2 className="display text-[2rem] font-bold sm:text-[2.5rem]">
            The company behind it
          </h2>
          <div className="prose-cv mt-5">
            <p>
              <AppMeSoft /> builds software products for Indian businesses,
              including <a href="https://www.colegios.in">Colegios</a>, a
              management system for schools. ChargeVeta is our product for
              electric vehicle charging.
            </p>
            <p>
              We design, build and run it ourselves, from the code that talks
              to chargers to the app a driver taps. When you call us, you speak
              to the people who wrote it.
            </p>
          </div>
          <a
            href={site.company.website}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-6 inline-flex min-h-11 items-center gap-2 font-semibold text-volt underline-offset-4 hover:underline"
          >
            Visit appme.in
            <ExternalLink size={15} aria-hidden />
          </a>
        </div>

        <div className="rounded-[1.75rem] bg-white p-7 ring-1 ring-line sm:p-9">
          <h2 className="wide text-xl font-bold text-ink">Reach us</h2>
          <ul className="mt-5 space-y-2">
            <li>
              <a href={telHref} className="flex min-h-11 items-center gap-4 font-medium text-ink hover:text-volt">
                <Phone size={18} className="text-volt" aria-hidden />
                <span className="tnum">{site.contact.phone}</span>
              </a>
            </li>
            <li>
              <a href={mailHref} className="flex min-h-11 items-center gap-4 font-medium text-ink hover:text-volt">
                <Mail size={18} className="text-volt" aria-hidden />
                {site.contact.email}
              </a>
            </li>
            <li className="flex items-start gap-4 py-2.5 text-ink">
              <MapPin size={18} className="mt-0.5 text-volt" aria-hidden />
              <span>
                {addressLines[0]}
                <br />
                {addressLines[1]}
              </span>
            </li>
          </ul>
          <p className="mt-6 border-t border-line pt-5 text-sm text-muted">
            For anything about AppMeSoft itself, write to{" "}
            <a href={`mailto:${site.company.email}`} className="font-medium text-ink hover:text-volt">
              {site.company.email}
            </a>
            .
          </p>
        </div>
      </section>

      <CtaBand />
    </>
  );
}
