import type { Metadata } from "next";
import Image, { type StaticImageData } from "next/image";
import type { LucideIcon } from "lucide-react";
import { Building, Check, Factory, Hotel, Network, Truck } from "lucide-react";

import CtaBand from "@/components/CtaBand";
import PageHeader from "@/components/PageHeader";
import Reveal from "@/components/Reveal";

import bays from "../../../public/images/ev-parking-bays.jpg";
import fleet from "../../../public/images/fleet-charging.jpg";

export const metadata: Metadata = {
  title: "Who it's for",
  description:
    "ChargeVeta for charge point operators, housing societies and offices, hotels and malls, EV fleets, and charger makers who want to offer software with their hardware.",
  alternates: { canonical: "/solutions" },
};

type Audience = {
  id: string;
  icon: LucideIcon;
  title: string;
  lead: string;
  points: string[];
  image?: { src: StaticImageData; alt: string };
};

const audiences: Audience[] = [
  {
    id: "operators",
    icon: Network,
    title: "Charge point operators",
    lead: "You run public chargers across a city or a highway and earn per kilowatt-hour. ChargeVeta is the system behind the network.",
    points: [
      "Every charger and connector on one live screen, whatever its make",
      "A driver app under your name, with wallet top-ups and UPI",
      "Per-site tariffs and a GST invoice for every session",
      "Fault alerts and remote resets, so fewer site visits",
    ],
    image: {
      src: bays,
      alt: "Green-painted parking bays marked for electric vehicle charging, with charging posts at the kerb.",
    },
  },
  {
    id: "societies",
    icon: Building,
    title: "Housing societies and offices",
    lead: "A few chargers in a basement or a staff car park, shared by people you already know.",
    points: [
      "Only residents' or employees' cards start a charge",
      "Each person pays for their own energy from the app",
      "Or bill a block or a department once a month, as a fleet",
      "A report the committee or facilities team can read",
    ],
  },
  {
    id: "hospitality",
    icon: Hotel,
    title: "Hotels, malls and restaurants",
    lead: "Chargers that bring guests in and pay for themselves while they eat, shop or stay.",
    points: [
      "Guests start and pay from their phone, no card or counter needed",
      "Hold a bay for a guest who booked ahead",
      "Revenue per charger, ready for your accounts",
      "Your staff see which bays are free without walking out",
    ],
  },
  {
    id: "fleets",
    icon: Truck,
    title: "EV fleets",
    lead: "Cabs, delivery vans or company cars charging at depots and on the road.",
    points: [
      "Vehicles, drivers and their cards grouped under the fleet",
      "A fleet manager portal with every session in one place",
      "One monthly invoice, or each driver pays as they go",
      "Block a lost card in one tap, without touching the rest of the fleet",
    ],
    image: {
      src: fleet,
      alt: "A row of white electric cars charging side by side at a car park charger.",
    },
  },
  {
    id: "makers",
    icon: Factory,
    title: "Charger makers and resellers",
    lead: "Sell your chargers with software ready to go, instead of asking every buyer to find their own.",
    points: [
      "A separate, walled-off network for each customer you sell to",
      "OCPP 1.6J, 2.0.1 and 2.1, so your current and next models both work",
      "Push firmware and pull logs to support customers remotely",
      "Your customers get the console, the driver app and invoicing on day one",
    ],
  },
];

export default function SolutionsPage() {
  return (
    <>
      <PageHeader title="Whoever owns the charger, ChargeVeta runs it.">
        <p>
          The same platform runs a city-wide public network and four chargers
          in a society basement. Here is what it looks like for each.
        </p>
        <ul className="mt-6 flex flex-wrap gap-2">
          {audiences.map((a) => (
            <li key={a.id}>
              <a
                href={`#${a.id}`}
                className="flex min-h-11 items-center gap-2 rounded-full bg-white px-4 text-sm font-medium text-ink ring-1 ring-line transition-colors hover:ring-ink"
              >
                <a.icon size={15} className="text-volt" aria-hidden />
                {a.title}
              </a>
            </li>
          ))}
        </ul>
      </PageHeader>

      <div className="shell pb-16 lg:pb-24">
        {audiences.map((a) => (
          <section
            key={a.id}
            id={a.id}
            aria-labelledby={`${a.id}-title`}
            className="grid grid-cols-1 scroll-mt-24 gap-10 border-t border-line py-16 lg:grid-cols-2 lg:gap-16 lg:py-24"
          >
            <div>
              <span className="grid grid-cols-1 h-12 w-12 place-items-center rounded-2xl bg-ink text-charging">
                <a.icon size={22} aria-hidden />
              </span>
              <h2 id={`${a.id}-title`} className="display mt-6 text-[2rem] font-bold sm:text-[2.5rem]">
                {a.title}
              </h2>
              <p className="mt-4 max-w-lg text-[1.0625rem] leading-relaxed">{a.lead}</p>
            </div>

            <div>
              {a.image ? (
                <Reveal>
                  <Image
                    src={a.image.src}
                    alt={a.image.alt}
                    placeholder="blur"
                    sizes="(min-width: 1024px) 560px, 100vw"
                    className="mb-8 aspect-[16/10] rounded-[1.5rem] object-cover"
                  />
                </Reveal>
              ) : null}
              <ul className="divide-y divide-line rounded-2xl bg-white ring-1 ring-line">
                {a.points.map((p) => (
                  <li key={p} className="flex gap-3.5 px-5 py-4">
                    <Check size={18} className="mt-0.5 shrink-0 text-available" aria-hidden />
                    <span className="leading-relaxed text-ink">{p}</span>
                  </li>
                ))}
              </ul>
            </div>
          </section>
        ))}
      </div>

      <CtaBand
        title="Tell us what you're charging."
        body="A basement in Noida or a highway corridor, we'll show you how ChargeVeta would run it, with your chargers on a demo network."
      />
    </>
  );
}
