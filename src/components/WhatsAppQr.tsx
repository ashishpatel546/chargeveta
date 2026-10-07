"use client";

import QRCode from "react-qr-code";

import { ChargeVetaMark } from "@/components/Brand";
import { whatsappHref } from "@/lib/site";

/** Scan with a phone camera to open a WhatsApp chat with ChargeVeta. */
export default function WhatsAppQr({ size = 156 }: { size?: number }) {
  return (
    <div className="relative inline-grid place-items-center rounded-2xl bg-white p-3.5">
      <QRCode
        value={whatsappHref("Hello ChargeVeta, I have a question.")}
        size={size}
        level="H"
        fgColor="#141A46"
        bgColor="#FFFFFF"
        title="QR code that opens a WhatsApp chat with ChargeVeta"
      />
      {/* level H tolerates the mark covering the centre */}
      <span className="absolute grid place-items-center rounded-lg bg-white p-1">
        <ChargeVetaMark size={Math.round(size * 0.2)} />
      </span>
    </div>
  );
}
