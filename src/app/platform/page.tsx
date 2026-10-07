import type { Metadata } from "next";
import Image from "next/image";

import ConsolePreview from "@/components/ConsolePreview";
import CtaBand from "@/components/CtaBand";
import PageHeader from "@/components/PageHeader";
import Reveal from "@/components/Reveal";
import { groups } from "@/lib/platform";

import kerbside from "../../../public/images/kerbside-charger.jpg";

export const metadata: Metadata = {
  title: "Platform",
  description:
    "Everything ChargeVeta does: OCPP charger management, a live console, a driver app with wallet and UPI, tariffs, GST invoices, fleet billing, roles, audit log and webhooks.",
  alternates: { canonical: "/platform" },
};

export default function PlatformPage() {
  return (
    <>
      <PageHeader title="Everything a charging network needs, in one product.">
        <p>
          Chargers, drivers, payments, fleets and your team, sharing one record
          of every session. Nothing to stitch together and nothing re-typed
          between systems.
        </p>
      </PageHeader>

      <section className="shell pb-16 lg:pb-24">
        <div className="relative grid grid-cols-1 gap-6 lg:grid-cols-[1fr_1.1fr] lg:items-center">
          <Image
            src={kerbside}
            alt="A dual-cable public DC charger standing on its own at a kerb."
            placeholder="blur"
            priority
            sizes="(min-width: 1024px) 560px, 100vw"
            className="aspect-[4/3] rounded-[1.75rem] object-cover"
          />
          <div className="lg:-ml-24">
            <ConsolePreview />
          </div>
        </div>
      </section>

      {/* jump links */}
      <nav
        aria-label="Platform sections"
        className="sticky top-16 z-30 border-y border-line bg-paper/90 backdrop-blur-md lg:top-[4.5rem]"
      >
        <ul className="shell flex gap-1 no-scrollbar overflow-x-auto py-2.5">
          {groups.map((g) => (
            <li key={g.id} className="shrink-0">
              <a
                href={`#${g.id}`}
                className="flex min-h-11 items-center rounded-lg px-3 text-sm font-medium text-muted transition-colors hover:bg-white hover:text-ink"
              >
                {g.title}
              </a>
            </li>
          ))}
        </ul>
      </nav>

      <div className="shell py-8 lg:py-12">
        {groups.map((group) => (
          <section
            key={group.id}
            id={group.id}
            aria-labelledby={`${group.id}-title`}
            className="grid grid-cols-1 scroll-mt-36 gap-8 border-b border-line py-14 last:border-0 lg:grid-cols-[0.8fr_2fr] lg:gap-16 lg:py-20"
          >
            <div className="lg:sticky lg:top-40 lg:self-start">
              <h2 id={`${group.id}-title`} className="display text-[1.85rem] font-bold sm:text-[2.25rem]">
                {group.title}
              </h2>
              <p className="mt-3 max-w-xs leading-relaxed">{group.intent}</p>
            </div>
            <ul className="grid grid-cols-1 gap-x-10 gap-y-9 sm:grid-cols-2">
              {group.features.map((f, i) => (
                <Reveal as="li" key={f.name} delay={(i % 2) * 70} className="flex gap-4">
                  <span className="grid grid-cols-1 h-10 w-10 shrink-0 place-items-center rounded-xl bg-white text-volt ring-1 ring-line">
                    <f.icon size={19} aria-hidden />
                  </span>
                  <div>
                    <h3 className="font-semibold text-ink">{f.name}</h3>
                    <p className="mt-1 text-[0.9375rem] leading-relaxed">{f.body}</p>
                  </div>
                </Reveal>
              ))}
            </ul>
          </section>
        ))}
      </div>

      <CtaBand />
    </>
  );
}
