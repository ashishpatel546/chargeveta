import Link from "next/link";

/**
 * The ChargeVeta mark: the same bolt the app at app.chargeveta.in uses for its
 * icon, on the product navy, with the bolt lit in charging amber.
 */
export function ChargeVetaMark({ size = 36 }: { size?: number }) {
  return (
    <svg
      viewBox="0 0 64 64"
      width={size}
      height={size}
      aria-hidden
      className="shrink-0"
    >
      <rect width="64" height="64" rx="15" fill="#141A46" />
      <path
        d="M36 7 15 36h15l-4 21 23-31H34z"
        fill="#F4A51C"
        stroke="#F4A51C"
        strokeWidth="2"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export function Wordmark({ onDark = false }: { onDark?: boolean }) {
  return (
    <Link
      href="/"
      aria-label="ChargeVeta home"
      className="flex min-h-11 items-center gap-2.5 rounded-lg"
    >
      <ChargeVetaMark size={34} />
      <span
        className={`wide text-[1.3rem] font-extrabold tracking-[-0.03em] ${
          onDark ? "text-white" : "text-ink"
        }`}
      >
        Charge<span className={onDark ? "text-charging" : "text-volt"}>Veta</span>
      </span>
    </Link>
  );
}

/**
 * AppMeSoft, set the way the company writes it: App in blue, Me in green,
 * Soft in saffron. Every mention of the company goes through this so the
 * split never drifts.
 */
export function AppMeSoft({
  onDark = false,
  suffix = "Private Limited",
  className = "",
}: {
  onDark?: boolean;
  suffix?: string | null;
  className?: string;
}) {
  return (
    <span className={`font-bold whitespace-nowrap ${className}`}>
      <span className={onDark ? "text-app-on-dark" : "text-app"}>App</span>
      <span className={onDark ? "text-me-on-dark" : "text-me"}>Me</span>
      <span className={onDark ? "text-soft-on-dark" : "text-soft"}>Soft</span>
      {suffix ? (
        <span className={`font-semibold ${onDark ? "text-white/75" : "text-body"}`}>
          {" "}
          {suffix}
        </span>
      ) : null}
    </span>
  );
}

export function WhatsAppIcon({
  size = 20,
  className = "",
}: {
  size?: number;
  className?: string;
}) {
  return (
    <svg
      viewBox="0 0 24 24"
      width={size}
      height={size}
      fill="currentColor"
      aria-hidden
      className={`shrink-0 ${className}`}
    >
      <path d="M17.47 14.38c-.3-.15-1.75-.86-2.02-.96-.27-.1-.47-.15-.67.15-.2.3-.77.96-.94 1.16-.17.2-.35.22-.64.07-.3-.15-1.25-.46-2.38-1.47-.88-.79-1.47-1.76-1.64-2.05-.17-.3-.02-.46.13-.6.13-.14.3-.35.45-.52.15-.18.2-.3.3-.5.1-.2.05-.37-.03-.52-.07-.15-.67-1.61-.92-2.2-.24-.58-.49-.5-.67-.51h-.57c-.2 0-.52.07-.79.37-.27.3-1.04 1.02-1.04 2.48s1.07 2.88 1.21 3.07c.15.2 2.1 3.2 5.08 4.49.71.3 1.26.49 1.7.63.71.22 1.36.19 1.87.12.57-.09 1.75-.72 2-1.41.25-.69.25-1.29.17-1.41-.07-.12-.27-.2-.57-.35M12.05 21.5h-.01a9.4 9.4 0 0 1-4.8-1.31l-.34-.2-3.57.93.95-3.48-.22-.36a9.43 9.43 0 0 1-1.45-5.03c0-5.2 4.24-9.44 9.45-9.44a9.4 9.4 0 0 1 6.68 2.77 9.38 9.38 0 0 1 2.76 6.68c0 5.21-4.24 9.44-9.45 9.44M20.1 3.9A11.32 11.32 0 0 0 12.05.56C5.77.56.66 5.67.66 11.95c0 2 .53 3.96 1.52 5.69L.56 23.5l6-1.57a11.36 11.36 0 0 0 5.48 1.39h.01c6.28 0 11.39-5.11 11.39-11.39 0-3.04-1.19-5.9-3.34-8.04" />
    </svg>
  );
}
