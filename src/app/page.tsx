import Image from "next/image";
import Link from "next/link";
import {
  BadgeIndianRupee,
  Building2,
  Cable,
  CloudOff,
  Cpu,
  FileText,
  KeyRound,
  ListChecks,
  RefreshCw,
  ShieldCheck,
  Smartphone,
  Wallet,
} from "lucide-react";

import { WhatsAppIcon } from "@/components/Brand";
import ConsolePreview from "@/components/ConsolePreview";
import CtaBand from "@/components/CtaBand";
import DriverPhone from "@/components/DriverPhone";
import Journey from "@/components/Journey";
import LiveSession from "@/components/LiveSession";
import Reveal from "@/components/Reveal";
import { whatsappHref } from "@/lib/site";

import connectors from "../../public/images/connectors-ccs2-type2.jpg";
import carPlugged from "../../public/images/car-plugged-in.jpg";
import fleet from "../../public/images/fleet-charging.jpg";

const india = [
  {
    icon: FileText,
    title: "GST invoices, issued for you",
    body: "Every session ends in a numbered tax invoice. Refunds go out as credit notes, so your accounts match the charger.",
  },
  {
    icon: BadgeIndianRupee,
    title: "UPI, cards and netbanking",
    body: "Drivers top up a wallet or pay by card through Razorpay. Money is counted to the paisa, never rounded on the way.",
  },
  {
    icon: Smartphone,
    title: "Sign in with a mobile number",
    body: "A one-time code is all a driver needs. No app store download either: the driver app installs straight from the browser.",
  },
  {
    icon: Building2,
    title: "Your network, your name",
    body: "Each operator gets a walled-off workspace with its own drivers, tariffs and staff. Resellers can run several from one place.",
  },
];

const resilience = [
  {
    icon: CloudOff,
    title: "Charging carries on through an outage",
    body: "If the connection to our servers drops, chargers are still answered and every reading is held, then delivered in order when it returns.",
  },
  {
    icon: KeyRound,
    title: "Cards keep working offline",
    body: "Recently approved cards are remembered for a short while, so a hiccup upstream doesn't leave a driver stranded at the bay.",
  },
  {
    icon: RefreshCw,
    title: "Updates without dropped chargers",
    body: "New versions roll out by finishing what's in flight and handing chargers over cleanly, not by cutting them off mid-session.",
  },
  {
    icon: ShieldCheck,
    title: "Chargers prove who they are",
    body: "Password and TLS certificate security profiles, signed firmware, and every security event a charger reports, kept.",
  },
  {
    icon: ListChecks,
    title: "Every staff action has a name on it",
    body: "Roles from owner to read-only viewer, API keys for integrations, and an audit log of who did what and from where.",
  },
  {
    icon: Cpu,
    title: "Your data stays yours",
    body: "Each operator's data is fenced off inside the database itself, not just in the app. Another tenant's charger can't even be found.",
  },
];

export default function Home() {
  return (
    <>
      {/* ---------------- Hero ---------------- */}
      <section className="shell grid grid-cols-1 items-center gap-12 pt-8 pb-20 lg:grid-cols-[1.05fr_1fr] lg:gap-16 lg:pt-16 lg:pb-28">
        <div>
          <h1 className="display text-[2.4rem] font-bold min-[400px]:text-[2.6rem] sm:text-[3.6rem] lg:text-[3.3rem] xl:text-[4.25rem]">
            Run your EV charging network from one screen.
          </h1>
          <p className="mt-6 max-w-xl text-lg leading-relaxed">
            ChargeVeta connects to your chargers, lets drivers start and pay
            from their phone, and turns every session into a GST invoice.
            Software for charge point operators, sites and fleets across India.
          </p>
          <div className="mt-9 flex flex-col gap-3 sm:flex-row">
            <Link
              href="/contact"
              className="rounded-xl bg-volt px-6 py-3.5 text-center font-semibold text-white shadow-[0_10px_24px_-10px_var(--color-volt)] transition-colors hover:bg-volt-hover"
            >
              Book a demo
            </Link>
            <a
              href={whatsappHref("Hello ChargeVeta, I'd like to know more.")}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-center gap-2 rounded-xl bg-white px-6 py-3.5 font-semibold text-ink ring-1 ring-line-strong transition-colors hover:ring-ink"
            >
              <WhatsAppIcon size={18} className="text-available" />
              Ask on WhatsApp
            </a>
          </div>

          <dl className="mt-12 grid grid-cols-1 max-w-lg grid-cols-3 gap-6 border-t border-line pt-6">
            <div>
              <dt className="text-sm text-muted">Protocols</dt>
              <dd className="wide mt-1 font-bold text-ink">OCPP 1.6J, 2.0.1, 2.1</dd>
            </div>
            <div>
              <dt className="text-sm text-muted">Chargers</dt>
              <dd className="wide mt-1 font-bold text-ink">AC and DC, any make</dd>
            </div>
            <div>
              <dt className="text-sm text-muted">Payments</dt>
              <dd className="wide mt-1 font-bold text-ink">UPI, cards, wallet</dd>
            </div>
          </dl>
        </div>

        <LiveSession />
      </section>

      {/* ---------------- Chargers ---------------- */}
      <section className="border-y border-line bg-white">
        <div className="shell grid grid-cols-1 items-center gap-12 py-20 lg:grid-cols-2 lg:gap-20 lg:py-28">
          <Reveal className="relative">
            <Image
              src={connectors}
              alt="A CCS2 DC connector beside a Type 2 AC connector, the two plugs most Indian four-wheelers charge with."
              placeholder="blur"
              sizes="(min-width: 1024px) 560px, 100vw"
              className="aspect-[4/3] rounded-[1.75rem] object-cover"
            />
            <div className="absolute -bottom-5 left-5 flex flex-wrap gap-2 sm:left-8">
              {["CCS2", "Type 2", "Bharat AC-001", "Bharat DC-001", "GB/T"].map((c) => (
                <span
                  key={c}
                  className="rounded-full bg-ink px-3 py-1.5 text-xs font-semibold text-white shadow-md"
                >
                  {c}
                </span>
              ))}
            </div>
          </Reveal>

          <div>
            <h2 className="display text-[2rem] font-bold sm:text-[2.75rem]">
              Works with the chargers you already own.
            </h2>
            <p className="mt-5 max-w-xl text-[1.0625rem] leading-relaxed">
              ChargeVeta speaks OCPP, the open language chargers use to talk to
              their software. Point a charger at your ChargeVeta address and it
              appears on your console, with its connectors read from what the
              charger reports.
            </p>
            <ul className="mt-8 grid grid-cols-1 gap-5 sm:grid-cols-2">
              {[
                ["OCPP 1.6J, 2.0.1 and 2.1", "Old and new chargers on one network, side by side."],
                ["Remote control", "Start, stop, reset, unlock and take a connector out of service."],
                ["Firmware and logs", "Push signed firmware and pull diagnostics from the console."],
                ["Reservations and local lists", "Hold a bay for a driver; keep cards on the charger itself."],
              ].map(([t, b]) => (
                <li key={t} className="flex gap-3">
                  <Cable size={20} className="mt-0.5 shrink-0 text-volt" aria-hidden />
                  <div>
                    <p className="font-semibold text-ink">{t}</p>
                    <p className="mt-1 text-[0.9375rem] leading-relaxed">{b}</p>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      {/* ---------------- Three surfaces ---------------- */}
      <section className="shell py-20 lg:py-28">
        <h2 className="display max-w-3xl text-[2rem] font-bold sm:text-[2.75rem]">
          A console for your team, an app for your drivers, a portal for your
          fleets.
        </h2>

        {/* Console */}
        <div className="mt-14 grid grid-cols-1 items-center gap-10 lg:mt-20 lg:grid-cols-[1fr_1.15fr] lg:gap-16">
          <div>
            <p className="text-sm font-semibold text-volt">For your operations team</p>
            <h3 className="wide mt-2 text-2xl font-bold text-ink sm:text-[1.75rem]">
              See every connector, as it changes.
            </h3>
            <p className="mt-4 max-w-lg leading-relaxed">
              The console shows each charger&apos;s state live, raises a
              notification the moment one faults, and lets your team fix it
              remotely. Revenue, energy and uptime reports export to CSV for
              your accountant.
            </p>
            <Link
              href="/platform#operations"
              className="mt-4 inline-flex min-h-11 items-center font-semibold text-volt underline-offset-4 hover:underline"
            >
              What the console does
            </Link>
          </div>
          <Reveal>
            <ConsolePreview />
          </Reveal>
        </div>

        {/* Driver app */}
        <div className="mt-24 grid grid-cols-1 items-center gap-10 lg:mt-32 lg:grid-cols-[1.15fr_1fr] lg:gap-16">
          <Reveal className="relative order-2 lg:order-1">
            <Image
              src={carPlugged}
              alt="A charging cable plugged into an electric car's charge port."
              placeholder="blur"
              sizes="(min-width: 1024px) 620px, 100vw"
              className="aspect-[5/4] w-full rounded-[1.75rem] object-cover sm:w-[85%]"
            />
            <div className="absolute right-0 -bottom-10 hidden sm:block lg:-right-10">
              <DriverPhone />
            </div>
          </Reveal>
          <div className="order-1 lg:order-2">
            <p className="text-sm font-semibold text-volt">For drivers</p>
            <h3 className="wide mt-2 text-2xl font-bold text-ink sm:text-[1.75rem]">
              Find a free charger, start it, pay. From the phone.
            </h3>
            <p className="mt-4 max-w-lg leading-relaxed">
              Drivers sign up with their mobile number, see nearby chargers and
              which are free, add money to a wallet, and start a session without
              a card. They get a push notification when it ends, with the
              receipt.
            </p>
            <div className="mt-8 sm:hidden">
              <DriverPhone />
            </div>
          </div>
        </div>

        {/* Fleets */}
        <div className="mt-24 grid grid-cols-1 items-center gap-10 lg:mt-36 lg:grid-cols-[1fr_1.15fr] lg:gap-16">
          <div>
            <p className="text-sm font-semibold text-volt">For fleets</p>
            <h3 className="wide mt-2 text-2xl font-bold text-ink sm:text-[1.75rem]">
              One bill a month for a whole fleet.
            </h3>
            <p className="mt-4 max-w-lg leading-relaxed">
              Add a fleet, its vehicles and its drivers&apos; cards. Its manager
              gets their own portal to see every session. Bill the fleet with a
              monthly invoice, or let each driver pay for their own charging.
            </p>
          </div>
          <Reveal className="relative">
            <Image
              src={fleet}
              alt="A row of white electric cars plugged into a charging post in a car park."
              placeholder="blur"
              sizes="(min-width: 1024px) 620px, 100vw"
              className="aspect-[3/2] rounded-[1.75rem] object-cover"
            />
            <div className="absolute -bottom-8 left-4 w-[16.5rem] rounded-2xl bg-white p-4 shadow-[0_24px_50px_-20px_rgba(20,26,70,0.5)] ring-1 ring-line sm:left-8">
              <div className="flex items-center justify-between">
                <p className="text-xs font-semibold text-ink">Fleet invoice, September</p>
                <span className="rounded-full bg-volt-soft px-2 py-0.5 text-[0.6875rem] font-semibold text-volt">
                  Issued
                </span>
              </div>
              <dl className="tnum mt-3 grid grid-cols-[1fr_auto] gap-y-1 text-xs">
                <dt className="text-muted">Vehicles</dt>
                <dd className="text-right font-medium text-ink">38</dd>
                <dt className="text-muted">Sessions</dt>
                <dd className="text-right font-medium text-ink">612</dd>
                <dt className="text-muted">Energy</dt>
                <dd className="text-right font-medium text-ink">2,914.6 kWh</dd>
                <dt className="font-semibold text-ink">Total with GST</dt>
                <dd className="text-right font-bold text-ink">₹61,906.10</dd>
              </dl>
            </div>
          </Reveal>
        </div>
      </section>

      {/* ---------------- Journey ---------------- */}
      <section className="border-y border-line bg-white">
        <div className="shell py-20 lg:py-28">
          <h2 className="display max-w-3xl text-[2rem] font-bold sm:text-[2.75rem]">
            From plug-in to GST invoice, with nobody touching a spreadsheet.
          </h2>
          <p className="mt-5 max-w-2xl text-[1.0625rem] leading-relaxed">
            Here is what happens, in order, every time a car plugs in to a
            charger on ChargeVeta.
          </p>
          <div className="mt-14">
            <Journey />
          </div>
        </div>
      </section>

      {/* ---------------- India ---------------- */}
      <section className="shell py-20 lg:py-28">
        <div className="grid grid-cols-1 gap-12 lg:grid-cols-[0.9fr_1.1fr] lg:gap-20">
          <div className="lg:sticky lg:top-28 lg:self-start">
            <h2 className="display text-[2rem] font-bold sm:text-[2.75rem]">
              Made for how India charges.
            </h2>
            <p className="mt-5 max-w-md text-[1.0625rem] leading-relaxed">
              Built in Delhi for Indian operators, so tax, payments and sign-in
              work the way your drivers and your accountant already expect.
            </p>
            <div className="mt-8 flex items-center gap-4 rounded-2xl bg-white p-5 ring-1 ring-line">
              <span className="grid grid-cols-1 h-12 w-12 shrink-0 place-items-center rounded-xl bg-charging-soft text-charging-text">
                <Wallet size={22} aria-hidden />
              </span>
              <p className="text-[0.9375rem] leading-relaxed">
                Pricing and tax are always worked out on the server, so the
                amount on the receipt is the amount the driver paid.
              </p>
            </div>
          </div>

          <ul className="divide-y divide-line border-y border-line">
            {india.map((item, i) => (
              <Reveal as="li" key={item.title} delay={i * 80} className="flex gap-5 py-8">
                <item.icon size={26} className="mt-1 shrink-0 text-volt" aria-hidden />
                <div>
                  <h3 className="wide text-xl font-bold text-ink">{item.title}</h3>
                  <p className="mt-2 max-w-lg leading-relaxed">{item.body}</p>
                </div>
              </Reveal>
            ))}
          </ul>
        </div>
      </section>

      {/* ---------------- Resilience ---------------- */}
      <section className="bg-ink text-white/70">
        <div className="shell py-20 lg:py-28">
          <h2 className="display max-w-3xl text-[2rem] font-bold text-white sm:text-[2.75rem]">
            Built so that a bad day upstream doesn&apos;t stop a car charging.
          </h2>
          <div className="mt-14 grid grid-cols-1 gap-x-12 gap-y-12 sm:grid-cols-2 lg:grid-cols-3">
            {resilience.map((item, i) => (
              <Reveal key={item.title} delay={(i % 3) * 90}>
                <item.icon size={22} className="text-charging" aria-hidden />
                <h3 className="wide mt-4 text-lg font-bold text-white">{item.title}</h3>
                <p className="mt-2 leading-relaxed">{item.body}</p>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <div className="pt-20 lg:pt-28">
        <CtaBand />
      </div>
    </>
  );
}
