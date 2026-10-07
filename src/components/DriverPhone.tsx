"use client";

import { useEffect, useState } from "react";
import { BatteryCharging, MapPin, Plus, Wallet } from "lucide-react";

import { useInView, usePageVisible, useReducedMotion } from "@/lib/motion";

/*
 * The driver app mid-session: energy climbs, the wallet draws down at the
 * site's tariff. Loops every LOOP ms while on screen.
 */

const LOOP = 9000;
const KWH = 14.6;
const TARIFF = 18 * 1.18; // ₹/kWh including GST
const START_BALANCE = 1250;

const inr = (n: number) =>
  new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: "INR",
    minimumFractionDigits: 2,
  }).format(n);

export default function DriverPhone() {
  const reduced = useReducedMotion();
  const visible = usePageVisible();
  const [ref, inView] = useInView<HTMLDivElement>("0px");
  const [p, setP] = useState(0.62);

  useEffect(() => {
    if (reduced || !inView || !visible) return;
    let raf = 0;
    const t0 = performance.now();
    const tick = (now: number) => {
      setP(((now - t0) % LOOP) / LOOP);
      raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [reduced, inView, visible]);

  const kwh = KWH * p;
  const spent = kwh * TARIFF;

  return (
    <div
      ref={ref}
      role="img"
      aria-label="The ChargeVeta driver app on a phone, showing a session in progress, the energy delivered, and the wallet balance going down as the session is billed."
      className="w-[17rem] rounded-[2.6rem] bg-ink p-2.5 shadow-[0_40px_80px_-30px_rgba(20,26,70,0.7)] ring-1 ring-white/10"
    >
      <div className="overflow-hidden rounded-[2.1rem] bg-paper">
        <div className="flex justify-center pt-2.5">
          <span className="h-5 w-20 rounded-full bg-ink" />
        </div>
        <div className="px-4 pt-3 pb-5">
          <p className="text-xs text-muted">Good evening</p>
          <p className="wide text-lg font-bold text-ink">Riya</p>

          <div className="mt-3 rounded-2xl bg-ink p-4 text-white">
            <div className="flex items-center justify-between text-xs text-white/60">
              <span className="flex items-center gap-1.5">
                <BatteryCharging size={14} className="text-charging" />
                Charging
              </span>
              <span>CP-DEL-014</span>
            </div>
            <p className="display tnum mt-2 text-[2.1rem] font-bold text-white">
              {kwh.toFixed(2)}
              <span className="ml-1 text-sm font-medium text-white/55">kWh</span>
            </p>
            <div className="mt-2 h-1.5 overflow-hidden rounded-full bg-white/12">
              <div
                className="h-full rounded-full bg-charging"
                style={{ width: `${p * 100}%` }}
              />
            </div>
            <div className="mt-3 flex justify-between text-xs">
              <span className="text-white/60">This session</span>
              <span className="tnum font-semibold text-charging">{inr(spent)}</span>
            </div>
          </div>

          <div className="mt-3 flex items-center justify-between rounded-2xl bg-white p-3.5 ring-1 ring-line">
            <div className="flex items-center gap-2.5">
              <span className="grid h-9 w-9 place-items-center rounded-xl bg-volt-soft text-volt">
                <Wallet size={17} />
              </span>
              <div>
                <p className="text-[0.6875rem] text-muted">Wallet</p>
                <p className="tnum text-sm font-bold text-ink">
                  {inr(START_BALANCE - spent)}
                </p>
              </div>
            </div>
            <span className="flex shrink-0 items-center gap-1 rounded-lg bg-volt px-2.5 py-1.5 text-[0.6875rem] font-semibold whitespace-nowrap text-white">
              <Plus size={12} />
              Top up
            </span>
          </div>

          <div className="mt-3 rounded-2xl bg-white p-3.5 ring-1 ring-line">
            <p className="text-[0.6875rem] text-muted">Nearby</p>
            {[
              ["Cyber City, Gurugram", "2 of 2 free", true],
              ["Karol Bagh", "In use", false],
            ].map(([name, state, free]) => (
              <div key={name as string} className="mt-2 flex items-center justify-between text-xs">
                <span className="flex items-center gap-1.5 font-medium text-ink">
                  <MapPin size={12} className="text-muted" />
                  {name}
                </span>
                <span
                  className={`font-semibold ${
                    free ? "text-available-text" : "text-charging-text"
                  }`}
                >
                  {state}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
