import { ImageResponse } from "next/og";

import { site } from "@/lib/site";

export const alt = "ChargeVeta: run your EV charging network from one screen";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OpengraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          background: "#141A46",
          color: "white",
          padding: 72,
          fontFamily: "sans-serif",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 20 }}>
          <svg viewBox="0 0 64 64" width={72} height={72}>
            <rect width="64" height="64" rx="15" fill="#232B6B" />
            <path d="M36 7 15 36h15l-4 21 23-31H34z" fill="#F4A51C" />
          </svg>
          <div style={{ display: "flex", fontSize: 44, fontWeight: 800 }}>
            Charge<span style={{ color: "#F4A51C" }}>Veta</span>
          </div>
        </div>
        <div style={{ display: "flex", flexDirection: "column" }}>
          <div style={{ fontSize: 76, fontWeight: 800, lineHeight: 1.05, letterSpacing: -2 }}>
            Run your EV charging network from one screen.
          </div>
          <div style={{ marginTop: 28, fontSize: 30, color: "rgba(255,255,255,0.7)" }}>
            OCPP chargers, a driver app with UPI, fleets and GST invoices.
          </div>
        </div>
        <div style={{ display: "flex", justifyContent: "space-between", fontSize: 26, color: "rgba(255,255,255,0.6)" }}>
          <span>{site.domain}</span>
          <span style={{ display: "flex" }}>
            <span style={{ color: "#93b4ff" }}>App</span>
            <span style={{ color: "#74d6a4" }}>Me</span>
            <span style={{ color: "#ffab54" }}>Soft</span>
            <span>&nbsp;Private Limited</span>
          </span>
        </div>
      </div>
    ),
    size,
  );
}
