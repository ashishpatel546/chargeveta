"use client";

import { useEffect, useRef, useState } from "react";
import { AlertTriangle, CheckCircle2, Search } from "lucide-react";

import { useInView, usePageVisible, useReducedMotion } from "@/lib/motion";

/*
 * A slice of the operator console, alive: connectors change state the way they
 * do on a real network, a charger faults, the operator resets it, and it comes
 * back. The script below is fixed so the first render matches the server.
 */

type State = "available" | "charging" | "faulted" | "offline";

type Station = { id: string; site: string; kw: number; connectors: State[] };

const initial: Station[] = [
  { id: "CP-DEL-014", site: "Saket, South Delhi", kw: 60, connectors: ["charging", "available"] },
  { id: "CP-NOI-007", site: "Sector 62, Noida", kw: 30, connectors: ["charging", "charging"] },
  { id: "CP-GGN-021", site: "Cyber City, Gurugram", kw: 120, connectors: ["available", "charging"] },
  { id: "CP-DEL-031", site: "Karol Bagh, Central Delhi", kw: 22, connectors: ["available", "available"] },
  { id: "CP-FBD-003", site: "Sector 15, Faridabad", kw: 7.4, connectors: ["charging"] },
];

type Step = {
  station: number;
  connector: number;
  to: State;
  toast?: { tone: "fault" | "ok"; text: string };
};

const script: Step[] = [
  { station: 3, connector: 0, to: "charging" },
  { station: 0, connector: 1, to: "charging" },
  { station: 1, connector: 1, to: "faulted", toast: { tone: "fault", text: "CP-NOI-007 connector 2 reported GroundFailure" } },
  { station: 4, connector: 0, to: "available" },
  { station: 1, connector: 1, to: "available", toast: { tone: "ok", text: "Reset accepted. CP-NOI-007 is back online" } },
  { station: 2, connector: 0, to: "charging" },
  { station: 3, connector: 0, to: "available" },
  { station: 0, connector: 1, to: "available" },
  { station: 4, connector: 0, to: "charging" },
  { station: 2, connector: 0, to: "available" },
];

const dot: Record<State, string> = {
  available: "bg-available",
  charging: "bg-charging",
  faulted: "bg-faulted",
  offline: "bg-line-strong",
};

const label: Record<State, string> = {
  available: "Available",
  charging: "Charging",
  faulted: "Faulted",
  offline: "Offline",
};

export default function ConsolePreview() {
  const reduced = useReducedMotion();
  const visible = usePageVisible();
  const [ref, inView] = useInView<HTMLDivElement>("0px");
  const [stations, setStations] = useState(initial);
  const step = useRef(0);
  const [toast, setToast] = useState<Step["toast"] | null>(null);
  const [energy, setEnergy] = useState(1284.6);

  useEffect(() => {
    if (reduced || !inView || !visible) return;
    const id = setInterval(() => {
      const n = step.current++ % script.length;
      const s = script[n];
      setStations((prev) =>
        prev.map((st, i) =>
          i === s.station
            ? {
                ...st,
                connectors: st.connectors.map((c, j) =>
                  j === s.connector ? s.to : c,
                ),
              }
            : st,
        ),
      );
      if (s.toast) setToast(s.toast);
      else if (n === 3 || n === 6) setToast(null);
    }, 1900);
    const meter = setInterval(() => setEnergy((e) => e + 0.37), 300);
    return () => {
      clearInterval(id);
      clearInterval(meter);
    };
  }, [reduced, inView, visible]);

  const all = stations.flatMap((s) => s.connectors);
  const charging = all.filter((c) => c === "charging").length;
  const faulted = all.filter((c) => c === "faulted").length;

  return (
    <div
      ref={ref}
      role="img"
      aria-label="The ChargeVeta operator console: a list of chargers across Delhi NCR with each connector's live status, how many are charging, and today's energy."
      className="overflow-hidden rounded-[1.5rem] bg-white shadow-[0_30px_70px_-35px_rgba(20,26,70,0.45)] ring-1 ring-line"
    >
      <div className="flex items-center gap-2 border-b border-line bg-paper/70 px-4 py-3">
        <span className="h-2.5 w-2.5 rounded-full bg-line-strong" />
        <span className="h-2.5 w-2.5 rounded-full bg-line-strong" />
        <span className="h-2.5 w-2.5 rounded-full bg-line-strong" />
        <span className="ml-3 truncate rounded-md bg-white px-3 py-1 text-xs text-muted ring-1 ring-line">
          app.chargeveta.in/stations
        </span>
      </div>

      <div className="grid grid-cols-3 divide-x divide-line border-b border-line">
        <div className="min-w-0 px-3 py-3.5 sm:px-4">
          <p className="text-xs text-muted">Charging now</p>
          <p className="tnum mt-1 text-lg font-bold text-ink sm:text-xl">{charging}</p>
        </div>
        <div className="min-w-0 px-3 py-3.5 sm:px-4">
          <p className="text-xs text-muted">Faulted</p>
          <p
            className={`tnum mt-1 text-lg font-bold transition-colors sm:text-xl ${
              faulted ? "text-faulted" : "text-ink"
            }`}
          >
            {faulted}
          </p>
        </div>
        <div className="min-w-0 px-3 py-3.5 sm:px-4">
          <p className="text-xs text-muted">
            Energy today<span className="min-[400px]:hidden">, kWh</span>
          </p>
          <p className="tnum mt-1 text-lg font-bold text-ink sm:text-xl">
            {energy.toLocaleString("en-IN", { maximumFractionDigits: 1, minimumFractionDigits: 1 })}
            <span className="ml-1 hidden text-xs font-medium text-muted min-[400px]:inline">kWh</span>
          </p>
        </div>
      </div>

      <div className="flex items-center gap-2 px-4 pt-3.5 pb-2 text-xs text-muted">
        <Search size={13} aria-hidden />
        Search stations, sites or cards
      </div>

      <ul className="relative px-2 pb-3">
        {stations.map((st) => (
          <li
            key={st.id}
            className="flex items-center justify-between gap-3 rounded-xl px-2.5 py-2.5 odd:bg-paper/60"
          >
            <div className="min-w-0">
              <p className="text-sm font-semibold text-ink">{st.id}</p>
              <p className="truncate text-xs text-muted">
                {st.site}, {st.kw} kW
              </p>
            </div>
            <div className="flex shrink-0 gap-1.5">
              {st.connectors.map((c, j) => (
                <span
                  key={j}
                  title={label[c]}
                  className={`flex items-center gap-1.5 rounded-full px-2 py-1 text-[0.6875rem] font-medium ring-1 transition-colors duration-500 ${
                    c === "faulted"
                      ? "bg-faulted/10 text-faulted ring-faulted/25"
                      : c === "charging"
                        ? "bg-charging-soft text-charging-text ring-charging/30"
                        : "bg-available-soft text-available-text ring-available/25"
                  }`}
                >
                  <span
                    className={`h-1.5 w-1.5 rounded-full ${dot[c]} ${
                      c === "charging" ? "animate-blink" : ""
                    }`}
                  />
                  <span className="hidden sm:inline">{label[c]}</span>
                  <span className="sm:hidden">{j + 1}</span>
                </span>
              ))}
            </div>
          </li>
        ))}

        <div
          aria-hidden
          className={`absolute inset-x-3 bottom-3 flex items-center gap-2.5 rounded-xl px-3.5 py-3 text-xs font-medium text-white shadow-lg transition-all duration-500 ${
            toast ? "translate-y-0 opacity-100" : "translate-y-4 opacity-0"
          } ${toast?.tone === "fault" ? "bg-faulted" : "bg-ink"}`}
        >
          {toast?.tone === "fault" ? (
            <AlertTriangle size={15} />
          ) : (
            <CheckCircle2 size={15} className="text-available" />
          )}
          <span className="truncate">{toast?.text ?? ""}</span>
        </div>
      </ul>
    </div>
  );
}
