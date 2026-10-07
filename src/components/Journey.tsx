import { BadgeIndianRupee, CreditCard, PlugZap, ReceiptText, ShieldCheck } from "lucide-react";

import Reveal from "@/components/Reveal";

/* A real sequence, so it is numbered. Energy flows along the cable that
   joins the steps, left to right, the way the session itself moves. */
const steps = [
  {
    icon: PlugZap,
    title: "Plug in",
    body: "The driver taps an RFID card, scans the charger's QR in the app, or signs in with their mobile number.",
  },
  {
    icon: ShieldCheck,
    title: "Authorise",
    body: "The card is checked against your list in milliseconds. If the internet drops, recently approved cards still work.",
  },
  {
    icon: BadgeIndianRupee,
    title: "Price",
    body: "Your tariff for that site applies as the energy flows. The driver watches the cost rise live in the app.",
  },
  {
    icon: CreditCard,
    title: "Pay",
    body: "Taken from the driver's wallet, held and captured on a card through Razorpay, or added to a fleet's monthly bill.",
  },
  {
    icon: ReceiptText,
    title: "Invoice",
    body: "A GST tax invoice is issued the moment the session closes. Refunds go out as proper credit notes.",
  },
];

export default function Journey() {
  return (
    <ol className="relative grid grid-cols-1 gap-10 lg:grid-cols-5 lg:gap-6">
      {/* the cable: vertical on phones, horizontal from lg */}
      <span
        aria-hidden
        className="absolute top-2 bottom-2 left-[1.375rem] w-[3px] rounded-full bg-[repeating-linear-gradient(180deg,var(--color-charging)_0_10px,transparent_10px_22px)] bg-[length:100%_44px] animate-[current-y_1.1s_linear_infinite] lg:top-[1.375rem] lg:right-[10%] lg:bottom-auto lg:left-[10%] lg:h-[3px] lg:w-auto lg:bg-[repeating-linear-gradient(90deg,var(--color-charging)_0_10px,transparent_10px_22px)] lg:bg-[length:44px_100%] lg:animate-[current-x_1.1s_linear_infinite]"
      />
      <span
        aria-hidden
        className="absolute top-2 bottom-2 left-[1.375rem] -z-0 w-[3px] rounded-full bg-line lg:hidden"
      />

      {steps.map((step, i) => (
        <Reveal
          as="li"
          key={step.title}
          delay={i * 110}
          className="relative flex gap-5 lg:block"
        >
          <span className="relative z-10 grid h-11 w-11 shrink-0 place-items-center rounded-full bg-ink text-charging ring-[6px] ring-paper">
            <step.icon size={20} aria-hidden />
          </span>
          <div className="lg:mt-5">
            <p className="tnum text-sm font-semibold text-muted">Step {i + 1}</p>
            <h3 className="wide mt-1 text-lg font-bold text-ink">{step.title}</h3>
            <p className="mt-2 text-[0.9375rem] leading-relaxed">{step.body}</p>
          </div>
        </Reveal>
      ))}
    </ol>
  );
}
