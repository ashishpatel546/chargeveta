"use client";

import { useEffect, useRef, useState } from "react";
import { Pause, Play, RotateCcw } from "lucide-react";

import { useInView, usePageVisible, useReducedMotion } from "@/lib/motion";

/*
 * One charging session, replayed at speed: the charger identifies the driver,
 * charges, stops, and ChargeVeta prices it into a GST receipt. Everything on
 * screen is a pure function of `t`, the milliseconds into the replay, so the
 * reduced-motion view is simply the last frame.
 */

const TARIFF = 18; // ₹ per kWh
const GST = 0.18;
const FINAL_KWH = 18.42;
const SESSION_MINUTES = 24.2;

const T_AUTH = 1100;
const T_START = 2100;
const T_STOP = 7600;
const T_RECEIPT = 8500;
const T_END = 13500; // receipt holds, then the replay loops

type Dir = "cp" | "cv";
type Frame = { at: number; dir: Dir; text: string };

const frames: Frame[] = [
  { at: 250, dir: "cp", text: 'StatusNotification {"status":"Available"}' },
  { at: T_AUTH, dir: "cp", text: 'Authorize {"idTag":"RF-7A21C9"}' },
  { at: 1500, dir: "cv", text: 'Authorize.conf {"status":"Accepted"}' },
  { at: T_START, dir: "cp", text: 'StartTransaction {"meterStart":0}' },
  { at: 2400, dir: "cv", text: 'StartTransaction.conf {"transactionId":48213}' },
  { at: 3700, dir: "cp", text: 'MeterValues {"Wh":5310,"W":59800,"SoC":48}' },
  { at: 5100, dir: "cp", text: 'MeterValues {"Wh":11870,"W":58600,"SoC":65}' },
  { at: 6500, dir: "cp", text: 'MeterValues {"Wh":16720,"W":41200,"SoC":78}' },
  { at: T_STOP, dir: "cp", text: 'StopTransaction {"meterStop":18420}' },
  { at: 8000, dir: "cv", text: 'StopTransaction.conf {"status":"Accepted"}' },
];

const clamp = (v: number, lo = 0, hi = 1) => Math.min(hi, Math.max(lo, v));

function sessionAt(t: number) {
  const p = clamp((t - T_START) / (T_STOP - T_START));
  // DC charging: fast and flat, tapering as the battery fills.
  const energy = FINAL_KWH * (1 - Math.pow(1 - p, 1.35));
  const charging = t >= T_START && t < T_STOP;
  const taper = p < 0.62 ? 1 : 1 - (p - 0.62) * 1.25;
  const wobble = Math.sin(t / 170) * 0.6 + Math.sin(t / 53) * 0.25;
  const power = charging ? 59.6 * taper + wobble : 0;
  const soc = Math.round(34 + 48 * (energy / FINAL_KWH));
  const minutes = SESSION_MINUTES * p;

  let status: { label: string; tone: "available" | "volt" | "charging" | "done" };
  if (t < T_AUTH) status = { label: "Available", tone: "available" };
  else if (t < T_START) status = { label: "Preparing", tone: "volt" };
  else if (t < T_STOP) status = { label: "Charging", tone: "charging" };
  else status = { label: "Finished", tone: "done" };

  return { energy, power, soc, minutes, status, charging };
}

const inr = (n: number) =>
  new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: "INR",
    minimumFractionDigits: 2,
  }).format(n);

const clock = (minutes: number) => {
  const s = Math.round(minutes * 60);
  const hh = String(Math.floor(s / 3600)).padStart(2, "0");
  const mm = String(Math.floor((s % 3600) / 60)).padStart(2, "0");
  const ss = String(s % 60).padStart(2, "0");
  return `${hh}:${mm}:${ss}`;
};

const toneClass = {
  available: "bg-available",
  volt: "bg-volt-on-dark",
  charging: "bg-charging",
  done: "bg-white/60",
} as const;

export default function LiveSession() {
  const reduced = useReducedMotion();
  const visible = usePageVisible();
  const [ref, inView] = useInView<HTMLDivElement>("0px");
  const [paused, setPaused] = useState(false);
  const [t, setT] = useState(0);
  const tRef = useRef(0);

  const running = !reduced && !paused && inView && visible;

  useEffect(() => {
    if (!running) return;
    let raf = 0;
    let last = performance.now();
    const tick = (now: number) => {
      const next = tRef.current + Math.min(now - last, 64);
      last = now;
      tRef.current = next >= T_END ? 0 : next;
      setT(tRef.current);
      raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [running]);

  const shown = reduced ? T_END - 1 : t;
  const s = sessionAt(shown);
  const cost = s.energy * TARIFF;
  const log = frames.filter((f) => f.at <= shown).slice(-5);
  const receipt = shown >= T_RECEIPT;
  const finalCost = FINAL_KWH * TARIFF;
  const finalGst = Math.round(finalCost * GST * 100) / 100;

  return (
    <div ref={ref} className="relative">
      <p className="sr-only">
        A replay of one charging session on ChargeVeta: the charger identifies
        the driver&apos;s card, charges {FINAL_KWH} kWh in about 24 minutes, and
        ChargeVeta prices it at ₹{TARIFF} per kWh into a receipt of{" "}
        {inr(finalCost + finalGst)} including 18% GST.
      </p>

      <div
        aria-hidden
        className="relative overflow-hidden rounded-[1.75rem] bg-ink p-5 text-white [contain:paint] shadow-[0_40px_80px_-40px_rgba(20,26,70,0.75)] sm:p-7"
      >
        {/* status lamp glow, the colour of the connector's state */}
        <div
          className={`glow pointer-events-none absolute -top-32 -right-28 h-80 w-80 opacity-35 transition-colors duration-700 ${toneClass[s.status.tone]}`}
        />

        <div className="relative flex items-start justify-between gap-4">
          <div>
            <p className="wide text-lg font-bold">CP-DEL-014</p>
            <p className="mt-0.5 text-sm text-white/55">
              Connector 1, CCS2, 60 kW DC
            </p>
          </div>
          <span className="flex items-center gap-2 rounded-full bg-white/8 px-3 py-1.5 text-sm font-medium ring-1 ring-white/12">
            <span
              className={`h-2 w-2 rounded-full ${toneClass[s.status.tone]} ${
                s.charging ? "animate-blink" : ""
              }`}
            />
            {s.status.label}
          </span>
        </div>

        <div className="relative mt-7 flex items-end gap-3">
          <span className="display tnum text-[3.6rem] font-bold text-white sm:text-[4.4rem]">
            {s.energy.toFixed(2)}
          </span>
          <span className="mb-2.5 text-lg font-medium text-white/55">kWh</span>
        </div>

        <dl className="relative mt-4 grid grid-cols-3 gap-3 border-t border-white/10 pt-4 text-sm">
          <div>
            <dt className="text-white/50">Power</dt>
            <dd className="tnum mt-1 font-semibold">
              {s.power.toFixed(1)} kW
            </dd>
          </div>
          <div>
            <dt className="text-white/50">Time</dt>
            <dd className="tnum mt-1 font-semibold">{clock(s.minutes)}</dd>
          </div>
          <div>
            <dt className="text-white/50">Cost so far</dt>
            <dd className="tnum mt-1 font-semibold text-charging">{inr(cost)}</dd>
          </div>
        </dl>

        <div className="relative mt-5">
          <div className="flex justify-between text-xs text-white/50">
            <span>Battery</span>
            <span className="tnum">{s.soc}%</span>
          </div>
          <div className="mt-1.5 h-2 overflow-hidden rounded-full bg-white/10">
            <div
              className="relative h-full rounded-full bg-gradient-to-r from-available to-charging"
              style={{ width: `${s.soc}%` }}
            >
              {s.charging ? (
                <span className="absolute inset-0 animate-[flow_1.2s_linear_infinite] bg-[linear-gradient(90deg,transparent,rgba(255,255,255,0.55),transparent)] bg-[length:40%_100%] bg-no-repeat" />
              ) : null}
            </div>
          </div>
        </div>

        {/* OCPP frames as they cross the wire */}
        <div className="relative mt-6 h-[9.25rem] overflow-hidden rounded-2xl bg-black/25 p-3.5 ring-1 ring-white/8">
          <p className="mb-2 flex justify-between text-[0.6875rem] text-white/40">
            <span>OCPP 1.6J</span>
            <span>wss://ocpp.chargeveta.in</span>
          </p>
          <ol className="space-y-1 font-mono text-[0.6875rem] leading-[1.45] sm:text-xs">
            {log.map((f) => (
              <li
                key={f.at}
                className="flex animate-[frame-in_.35s_ease-out] gap-2 truncate"
              >
                <span
                  className={`shrink-0 ${
                    f.dir === "cp" ? "text-charging" : "text-volt-on-dark"
                  }`}
                >
                  {f.dir === "cp" ? "charger →" : "← veta  "}
                </span>
                <span className="truncate text-white/80">{f.text}</span>
              </li>
            ))}
          </ol>

          {/* the receipt slides up over the log once the session is priced */}
          <div
            className={`absolute inset-x-2 bottom-2 rounded-xl bg-white p-3.5 text-ink shadow-xl transition-all duration-500 ease-out ${
              receipt
                ? "translate-y-0 opacity-100"
                : "pointer-events-none translate-y-[115%] opacity-0"
            }`}
          >
            <div className="flex items-center justify-between text-xs">
              <span className="font-semibold">Tax invoice CV/2026-27/000412</span>
              <span className="rounded-full bg-available-soft px-2 py-0.5 font-semibold text-available-text">
                Paid from wallet
              </span>
            </div>
            <div className="tnum mt-2 grid grid-cols-[1fr_auto] gap-x-4 gap-y-0.5 text-xs text-body">
              <span>
                {FINAL_KWH} kWh at ₹{TARIFF}.00
              </span>
              <span className="text-right">{inr(finalCost)}</span>
              <span>GST 18%</span>
              <span className="text-right">{inr(finalGst)}</span>
              <span className="font-bold text-ink">Total</span>
              <span className="text-right font-bold text-ink">
                {inr(finalCost + finalGst)}
              </span>
            </div>
          </div>
        </div>
      </div>

      {!reduced ? (
        <div className="mt-3 flex items-center justify-between px-1 text-xs text-muted">
          <span>A sample session, replayed about 260× faster</span>
          <div className="flex gap-1">
            <button
              type="button"
              onClick={() => setPaused((p) => !p)}
              className="flex min-h-11 items-center gap-1.5 rounded-lg px-3 font-medium text-ink hover:bg-white"
            >
              {paused ? <Play size={13} /> : <Pause size={13} />}
              {paused ? "Play" : "Pause"}
            </button>
            <button
              type="button"
              onClick={() => {
                tRef.current = 0;
                setT(0);
                setPaused(false);
              }}
              className="flex min-h-11 items-center gap-1.5 rounded-lg px-3 font-medium text-ink hover:bg-white"
            >
              <RotateCcw size={13} />
              Replay
            </button>
          </div>
        </div>
      ) : null}
    </div>
  );
}
