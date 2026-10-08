import type { Metadata } from "next";
import type { ReactNode } from "react";

import CtaBand from "@/components/CtaBand";
import FlowDiagram, { type DiagramEdge, type DiagramNode } from "@/components/FlowDiagram";
import PageHeader from "@/components/PageHeader";
import { mailHref, site } from "@/lib/site";

export const metadata: Metadata = {
  title: "How it works: technical guide",
  description:
    "How ChargeVeta works end to end: the architecture, the addresses at app.chargeveta.in and ocpp.chargeveta.in, connecting a real OCPP charger, and every flow from a card tap to a GST receipt.",
  alternates: { canonical: "/how-it-works" },
};

const appHost = site.app.operatorUrl.replace("https://", "");
const ocppHost = `ocpp.${site.domain}`;

const sections = [
  { id: "overview", title: "Overview" },
  { id: "addresses", title: "Addresses" },
  { id: "connect", title: "Connect a charger" },
  { id: "boot", title: "Charger boots" },
  { id: "tap", title: "Card tap" },
  { id: "remote", title: "App start" },
  { id: "session", title: "Session to receipt" },
  { id: "payments", title: "Payments" },
  { id: "people", title: "Accounts" },
  { id: "fleets", title: "Fleets" },
  { id: "resilience", title: "When things fail" },
  { id: "security", title: "Security" },
  { id: "ocpp", title: "OCPP support" },
] as const;

/* ---------- the system at a glance ---------- */

const overviewNodes: DiagramNode[] = [
  { id: "drv", x: 16, y: 30, w: 190, h: 60, kind: "person", title: "Drivers", lines: ["installable driver app"] },
  { id: "stf", x: 16, y: 120, w: 190, h: 60, kind: "person", title: "Operator staff", lines: ["console · four roles"] },
  { id: "flm", x: 16, y: 210, w: 190, h: 60, kind: "person", title: "Fleet managers", lines: ["fleet portal"] },
  { id: "chg", x: 16, y: 330, w: 190, h: 70, kind: "charger", title: "Chargers", lines: ["OCPP 1.6 · 2.0.1 · 2.1"] },
  { id: "app", x: 250, y: 85, w: 200, h: 110, kind: "edge", title: appHost, lines: ["console · driver app", "fleet portal", "HTTPS"] },
  { id: "ocpp", x: 250, y: 330, w: 200, h: 70, kind: "edge", title: ocppHost, lines: ["wss:// · chargers only"] },
  { id: "api", x: 500, y: 95, w: 200, h: 80, kind: "core", title: "Business core (API)", lines: ["tenants · tariffs · billing"] },
  { id: "eng", x: 500, y: 330, w: 200, h: 70, kind: "engine", title: "OCPP engine", lines: ["holds every charger socket"] },
  { id: "out", x: 760, y: 10, w: 220, h: 60, kind: "outside", title: "Razorpay · email · push", lines: ["outside services"] },
  { id: "db", x: 760, y: 95, w: 220, h: 80, kind: "store", title: "PostgreSQL", lines: ["row-level security", "per operator"] },
  { id: "wrk", x: 760, y: 215, w: 220, h: 70, kind: "core", title: "Event worker", lines: ["sessions · receipts · alerts"] },
  { id: "q", x: 760, y: 330, w: 220, h: 70, kind: "store", title: "Event stream (Kafka)", lines: ["in order, per charger"] },
];

const overviewEdges: DiagramEdge[] = [
  { points: [[206, 60], [228, 60], [228, 115], [250, 115]] },
  { points: [[206, 150], [250, 150]] },
  { points: [[206, 240], [228, 240], [228, 180], [250, 180]] },
  { points: [[206, 365], [250, 365]], both: true, label: "OCPP-J", at: [228, 318] },
  { points: [[450, 135], [500, 135]] },
  { points: [[450, 365], [500, 365]], both: true },
  { points: [[560, 175], [560, 330]], label: "commands", at: [560, 230] },
  { points: [[640, 330], [640, 175]], label: "may it connect?\nmay it charge?", at: [655, 272] },
  { points: [[700, 365], [760, 365]], label: "events", at: [730, 352] },
  { points: [[870, 330], [870, 285]] },
  { points: [[870, 215], [870, 175]] },
  { points: [[700, 135], [760, 135]] },
  { points: [[600, 95], [600, 40], [760, 40]], label: "payments · messages", at: [670, 28] },
];

/* ---------- small building blocks ---------- */

function Section({
  id,
  no,
  title,
  intro,
  children,
}: {
  id: string;
  no: string;
  title: string;
  intro?: ReactNode;
  children: ReactNode;
}) {
  return (
    <section
      id={id}
      aria-labelledby={`${id}-title`}
      className="scroll-mt-36 border-b border-line py-14 last:border-0 lg:py-20"
    >
      <p className="font-mono text-sm font-medium text-charging-text">{no}</p>
      <h2 id={`${id}-title`} className="display mt-2 text-[1.85rem] font-bold sm:text-[2.4rem]">
        {title}
      </h2>
      {intro ? <div className="prose-cv mt-5 text-[1.0625rem]">{intro}</div> : null}
      <div className="mt-8">{children}</div>
    </section>
  );
}

type Step = { from: string; to?: string; text: string } | { heading: string };

/** A sequence of messages, as a numbered list a person can actually read on a phone. */
function Steps({ steps }: { steps: Step[] }) {
  // the step number of each message, skipping the headings between them
  const numbers = steps.map((_, i) => steps.slice(0, i + 1).filter((s) => !("heading" in s)).length);
  return (
    <ol className="rounded-2xl bg-white p-5 ring-1 ring-line sm:p-7">
      {steps.map((s, i) => {
        if ("heading" in s) {
          return (
            <li
              key={i}
              className="mt-5 mb-2 border-t border-line pt-4 font-mono text-xs font-medium tracking-wider text-muted uppercase first:mt-0 first:border-0 first:pt-0"
            >
              {s.heading}
            </li>
          );
        }
        return (
          <li key={i} className="flex gap-4 py-2">
            <span className="tnum mt-0.5 grid h-6 w-6 shrink-0 place-items-center rounded-full bg-paper font-mono text-xs font-medium text-ink ring-1 ring-line-strong">
              {numbers[i]}
            </span>
            <p className="leading-relaxed">
              <span className="font-semibold text-ink">
                {s.from}
                {s.to ? ` → ${s.to}` : ""}:
              </span>{" "}
              {s.text}
            </p>
          </li>
        );
      })}
    </ol>
  );
}

function Cards({ items }: { items: { title: string; body: ReactNode }[] }) {
  return (
    <ul className="mt-8 grid grid-cols-1 gap-4 sm:grid-cols-2">
      {items.map((c) => (
        <li key={c.title} className="rounded-2xl bg-white p-6 ring-1 ring-line">
          <h3 className="wide font-bold text-ink">{c.title}</h3>
          <div className="mt-2 text-[0.9375rem] leading-relaxed">{c.body}</div>
        </li>
      ))}
    </ul>
  );
}

function Table({ head, rows }: { head: string[]; rows: ReactNode[][] }) {
  return (
    <div className="no-scrollbar overflow-x-auto rounded-2xl bg-white ring-1 ring-line">
      <table className="w-full min-w-160 border-collapse text-left text-[0.9375rem]">
        <thead>
          <tr>
            {head.map((h) => (
              <th
                key={h}
                className="border-b border-line px-4 py-3 font-mono text-xs font-medium tracking-wider text-muted uppercase"
              >
                {h}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {rows.map((r, i) => (
            <tr key={i} className="align-top">
              {r.map((c, j) => (
                <td key={j} className={`border-b border-line px-4 py-3 ${j === 0 ? "font-medium text-ink" : ""}`}>
                  {c}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

function Code({ children }: { children: ReactNode }) {
  return (
    <code className="rounded bg-paper px-1.5 py-0.5 font-mono text-[0.85em] text-ink ring-1 ring-line wrap-anywhere">
      {children}
    </code>
  );
}

function Note({ children }: { children: ReactNode }) {
  return (
    <p className="mt-6 max-w-[68ch] border-l-4 border-charging py-1 pl-4 text-[0.9375rem] leading-relaxed">
      {children}
    </p>
  );
}

/* ---------- the page ---------- */

export default function HowItWorksPage() {
  return (
    <>
      <PageHeader title="How ChargeVeta works, end to end.">
        <p>
          A technical guide for your engineers, your charger installer and your
          finance team: what runs where, how to connect a real charger, and
          what happens at every step from a card tap to a GST receipt.
        </p>
      </PageHeader>

      <nav
        aria-label="Guide sections"
        className="sticky top-16 z-30 border-y border-line bg-paper/90 backdrop-blur-md lg:top-[4.5rem]"
      >
        <ul className="shell flex gap-1 no-scrollbar overflow-x-auto py-2.5">
          {sections.map((s) => (
            <li key={s.id} className="shrink-0">
              <a
                href={`#${s.id}`}
                className="flex min-h-11 items-center rounded-lg px-3 text-sm font-medium text-muted transition-colors hover:bg-white hover:text-ink"
              >
                {s.title}
              </a>
            </li>
          ))}
        </ul>
      </nav>

      <div className="shell py-4 lg:py-8">
        <Section
          id="overview"
          no="01"
          title="The system at a glance"
          intro={
            <>
              <p>
                ChargeVeta is a charging station management system (CSMS) that
                many operators share, each seeing only their own chargers,
                drivers and money. Three programs make it run. The{" "}
                <b>OCPP engine</b> is the only part that talks to chargers. It
                holds one long-lived WebSocket per charger. The{" "}
                <b>business core</b> holds every rule: who may charge, what it
                costs, who pays. The <b>apps</b> are the operator console, the
                driver app and the fleet portal.
              </p>
              <p>
                Chargers never talk to the business core directly, and browsers
                never talk to it directly either. Each goes through its own front
                door, so a fault or an attack on one side cannot walk through
                to the other.
              </p>
            </>
          }
        >
          <FlowDiagram
            id="overview"
            width={1000}
            height={420}
            label="People reach the apps at app.chargeveta.in; chargers reach the OCPP engine at ocpp.chargeveta.in. The engine asks the business core whether a charger may connect and a card may charge, receives commands from it, and streams events through Kafka to the event worker, which writes to PostgreSQL."
            nodes={overviewNodes}
            edges={overviewEdges}
          />
          <Cards
            items={[
              {
                title: "Commands: core → charger",
                body: "Remote start and stop, reset, unlock, configuration, firmware. The core asks the engine, and the engine sends the OCPP message on the charger's open socket.",
              },
              {
                title: "Questions: charger → core, answered at once",
                body: "May this charger connect? May this card charge, and who pays? These need an answer while the charger waits, so they are direct calls, not queued.",
              },
              {
                title: "Events: charger → core, in order",
                body: "Boot, status, meter readings, session start and end flow through Kafka, keyed per charger so each charger's events are processed in the order they happened.",
              },
              {
                title: "One record of every session",
                body: "The console, the driver app, the fleet portal, the receipt and the dashboards all read the same rows. A dashboard can never disagree with the invoice behind it.",
              },
            ]}
          />
        </Section>

        <Section
          id="addresses"
          no="02"
          title="Addresses on chargeveta.in"
          intro={
            <p>
              Everything lives under one domain. The marketing site is{" "}
              <Code>www.{site.domain}</Code>. The product is on its own subdomain,
              so the apps, their cookies and their installable versions are
              kept apart from the website.
            </p>
          }
        >
          <Table
            head={["Who", "Address", "Notes"]}
            rows={[
              ["Anyone (this website)", <Code key="w">https://www.{site.domain}</Code>, "Marketing and this guide. Holds no data."],
              [
                "Operator staff",
                <Code key="o">https://{appHost}/sign-in</Code>,
                "Operator code, email and password. Roles: owner, admin, operator, viewer.",
              ],
              [
                "Drivers",
                <Code key="d">https://{appHost}/driver</Code>,
                "Installable app (add to home screen). Sign in with a phone code.",
              ],
              [
                "Fleet managers",
                <Code key="f">https://{appHost}/fleet</Code>,
                "Read-only view of the fleet's drivers, sessions and statement; manages vehicles.",
              ],
              [
                "Platform team",
                <Code key="p">https://{appHost}/platform</Code>,
                "ChargeVeta's own staff: creates operators (tenants) and switches modules on.",
              ],
              [
                "Chargers",
                <Code key="c">wss://{ocppHost}/ocpp/&lt;operator code&gt;/&lt;charger id&gt;</Code>,
                "OCPP-J over WebSocket. Not behind any CDN proxy, so the socket goes straight to us.",
              ],
              [
                "Payment webhooks",
                <Code key="r">https://{appHost}/api/v1/payments/razorpay/webhook</Code>,
                "The one API route reachable from outside; everything else goes through the apps.",
              ],
            ]}
          />
          <Cards
            items={[
              {
                title: "Why the apps share one subdomain",
                body: (
                  <>
                    The console, driver app and fleet portal are one web
                    application served from the root of <Code>{appHost}</Code>,
                    each with its own sign-in and its own session cookie. The
                    driver app installs with its own scope (<Code>/driver</Code>),
                    so a driver’s home-screen icon opens only the driver app.
                  </>
                ),
              },
              {
                title: "Why chargers get their own host",
                body: (
                  <>
                    A charger holds its socket for days. <Code>{ocppHost}</Code>{" "}
                    goes straight to our servers with hour-long timeouts and a
                    ping every 30 seconds, and serves only <Code>/ocpp/…</Code>{" "}
                    and a health check. A web CDN in between would cut idle
                    sockets and hide the charger’s address.
                  </>
                ),
              },
              {
                title: "No tokens in the browser",
                body: "The apps keep sign-ins in httpOnly, secure cookies and call the core through their own same-origin proxy. Nothing a script on the page can read ever holds a token.",
              },
              {
                title: "Live updates",
                body: (
                  <>
                    Charger status and running sessions update live over a
                    WebSocket on the same host (<Code>/realtime</Code>), so they
                    work behind any firewall that allows the app itself.
                  </>
                ),
              },
            ]}
          />
        </Section>

        <Section
          id="connect"
          no="03"
          title="Connecting a real charger"
          intro={
            <p>
              Any charger that speaks OCPP 1.6J, 2.0.1 or 2.1 can join. You do
              not need a ChargeVeta-specific firmware or adapter. Commissioning
              takes two parts: create the charger in the console, then point the
              charger at us.
            </p>
          }
        >
          <h3 className="wide text-xl font-bold text-ink">Step 1: in the console</h3>
          <ol className="mt-4 max-w-[68ch] list-decimal space-y-3 pl-5 leading-relaxed">
            <li>
              Sign in at <Code>{appHost}/sign-in</Code> as an admin. Create the{" "}
              <b>site</b> first (address, map location, GSTIN state, tariff), if
              it is not there yet.
            </li>
            <li>
              <b>Chargers → Add charger.</b> Enter the charger ID exactly as the
              charger will send it (1–48 letters, digits, <Code>.</Code>{" "}
              <Code>_</Code> <Code>~</Code> <Code>-</Code>; e.g.{" "}
              <Code>DEL-CP-001</Code>), the OCPP version it runs, and the site.
            </li>
            <li>
              On the charger’s page, open <b>Connection password</b> and{" "}
              <b>generate</b> one (20–128 characters). Copy it now: it is stored
              only as a hash and can never be shown again, only replaced.
            </li>
          </ol>

          <h3 className="wide mt-10 text-xl font-bold text-ink">Step 2: on the charger</h3>
          <div className="mt-4">
            <Table
              head={["Setting", "Value"]}
              rows={[
                ["Central system / CSMS URL", <Code key="u">wss://{ocppHost}/ocpp/&lt;operator code&gt;</Code>],
                [
                  "Charge point identity",
                  "The charger ID from step 1. Most chargers append it to the URL themselves; if yours wants the full URL, end it with /<charger ID>.",
                ],
                ["OCPP version", "Same as the console: 1.6J, 2.0.1 or 2.1 (subprotocol ocpp1.6, ocpp2.0.1, ocpp2.1)"],
                [
                  "Security profile",
                  "2: TLS with HTTP Basic authentication (the default for new chargers). 1 only for a charger that cannot do TLS: see below.",
                ],
                ["Basic auth username", "The charger ID (if the charger sends one, it must match)"],
                [
                  "Basic auth password",
                  <>
                    The generated password (1.6: <Code>AuthorizationKey</Code>; 2.x:{" "}
                    <Code>BasicAuthPassword</Code>)
                  </>,
                ],
                ["TLS", "Public certificate, so no custom CA needs to be installed on the charger. Port 443."],
                ["Heartbeat", "Set by us at boot. Leave the charger's own value; we answer with ours."],
              ]}
            />
          </div>

          <h3 className="wide mt-10 text-xl font-bold text-ink">Step 3: check it</h3>
          <ul className="mt-4 max-w-[68ch] list-disc space-y-3 pl-5 leading-relaxed">
            <li>
              The charger shows <b>Online</b> on the Chargers page within
              seconds of connecting, and each connector appears with its status
              (connectors register themselves from what the charger reports).
            </li>
            <li>
              Its page shows the boot details (vendor, model, serial, firmware)
              and the address it connected from.
            </li>
            <li>
              Try <b>Remote start</b> with a test card, or tap a card that is
              linked to a driver, and watch the session appear live.
            </li>
          </ul>

          <Cards
            items={[
              {
                title: "Refused at connect?",
                body: "A wrong password, an unknown charger ID, a wrong operator code or a non-TLS connection on profile 2 is refused before the WebSocket opens (HTTP 401), never accepted and then dropped. Too many failures from one address are blocked for a few minutes. Check the ID's exact spelling and case first.",
              },
              {
                title: "Charger can't do TLS?",
                body: (
                  <>
                    Older chargers on security profile 1 (Basic auth without
                    TLS) can use <Code>ws://{ocppHost}/ocpp/…</Code> on port 80.
                    An admin switches that one charger to profile 1 under its
                    settings, <b>Connection security</b>; every other charger
                    stays on profile 2 and is refused without TLS. Profile 0
                    (no password) is never accepted.
                  </>
                ),
              },
              {
                title: "Client certificates (profile 3)",
                body: "Supported by the engine, with the charger's certificate pinned by its SHA-256 fingerprint. Not yet open on the shared network; talk to us if your chargers require it.",
              },
              {
                title: "Firewalls and SIM routers",
                body: (
                  <>
                    The charger only makes outbound connections to{" "}
                    <Code>{ocppHost}</Code> on 443 (or 80 for profile 1). Nothing
                    needs to reach the charger. A 4G router with a short NAT
                    timeout is fine: we ping every 30 seconds.
                  </>
                ),
              },
            ]}
          />
        </Section>

        <Section
          id="boot"
          no="04"
          title="A charger connects and boots"
          intro={
            <p>
              The engine keeps no database, so every connection is decided by
              the business core before the WebSocket opens. Which operator the
              charger belongs to comes from that answer, never from the URL the
              charger chose.
            </p>
          }
        >
          <Steps
            steps={[
              { from: "Charger", to: "Engine", text: "WebSocket upgrade to /ocpp/<operator>/<charger ID> with Basic auth and the OCPP subprotocol." },
              { from: "Engine", text: "Abuse guards first: connections per address, connect rate, a bounded queue of checks in flight." },
              { from: "Engine", to: "Core", text: "May this charger connect? The core checks the password hash, the security profile and that the transport was TLS." },
              { from: "Core", to: "Engine", text: "Yes: the charger, its operator, its OCPP version. Or no, and the upgrade is refused." },
              { heading: "connected" },
              { from: "Charger", to: "Engine", text: "BootNotification. Validated against the official OCPP schema for that version." },
              { from: "Engine", to: "Kafka", text: "Boot event recorded first, then the charger is told Accepted with our heartbeat interval. A charger is never accepted by a system with no record of it." },
              { from: "Charger", to: "Engine", text: "StatusNotification for each connector: Available, Preparing, Charging, Faulted…" },
              { from: "Engine", to: "Charger", text: "After the boot: the meter-value interval (60 s), the device model report on 2.x, and on 2.1 our price as SetDefaultTariff." },
              { heading: "every minute while connected" },
              { from: "Engine", to: "Core", text: "Is every socket I hold still allowed? A charger that was deactivated, deleted or quarantined, or whose operator was suspended, is disconnected." },
            ]}
          />
        </Section>

        <Section
          id="tap"
          no="05"
          title="A card tap: may it charge, and who pays?"
          intro={
            <p>
              The same decision answers a card tap, a session start, a remote
              start from the app and a reservation, so they can never disagree.
              First the card itself is checked; then, in a fixed order, who
              would pay.
            </p>
          }
        >
          <ol className="grid grid-cols-1 gap-3 sm:grid-cols-2">
            {[
              ["Card usable?", "Not blocked, not expired, not already charging elsewhere. Otherwise refused."],
              ["Does a fleet pay?", "The card's driver is in a fleet billed monthly: accepted, charged to the fleet's statement."],
              ["Free charging?", "Staff granted the card free charging (optionally until a date): accepted, the driver pays nothing."],
              ["Is it a driver's card?", "A card linked to no driver has nobody to pay: blocked."],
              ["Enough credit?", "Wallet above the start minimum, or a card hold waiting at this charger: accepted with a budget."],
              ["Otherwise", "NoCredit on 2.0.1 and 2.1 (shown as Blocked on 1.6, which has no such status)."],
            ].map(([q, a], i) => (
              <li key={q} className="flex gap-4 rounded-2xl bg-white p-5 ring-1 ring-line">
                <span className="tnum grid h-7 w-7 shrink-0 place-items-center rounded-full bg-ink font-mono text-xs font-medium text-white">
                  {i + 1}
                </span>
                <div>
                  <h3 className="font-semibold text-ink">{q}</h3>
                  <p className="mt-1 text-[0.9375rem] leading-relaxed">{a}</p>
                </div>
              </li>
            ))}
          </ol>
          <Note>
            If the core cannot be reached, the charger gets an error and falls
            back to its own local list of cards. We keep that list in sync, and
            it only holds cards someone else pays for (fleet cards and free
            charging), so an outage never lets an unpaid session through.
          </Note>
        </Section>

        <Section
          id="remote"
          no="06"
          title="Starting from the app or the console"
          intro={
            <p>
              A driver taps <b>Start</b> in the app, or an operator starts a
              session from the console. The card is checked before the charger
              is ever asked, so a refused card fails fast with a clear reason.
            </p>
          }
        >
          <Steps
            steps={[
              { from: "Driver app", to: "Core", text: "Start charging at this connector. A fleet driver with several vehicles picks the car first." },
              { from: "Core", text: "Who is asking and for which operator comes from the signed-in session. The card is adjudicated with the rule above." },
              { from: "Core", to: "Engine", text: "Remote start command, over the internal network only." },
              { from: "Engine", to: "Charger", text: "RequestStartTransaction (2.x) or RemoteStartTransaction (1.6) on the charger's open socket." },
              { from: "Charger", to: "Engine", text: "Accepted or Rejected." },
              { from: "Core", to: "Driver app", text: "The real outcome: accepted, rejected, timed out, or charger offline. Every command is recorded with who sent it." },
              { heading: "then" },
              { from: "Charger", to: "Engine", text: "The session starts (TransactionEvent Started / StartTransaction): next section." },
            ]}
          />
        </Section>

        <Section
          id="session"
          no="07"
          title="A session, from start to GST receipt"
          intro={
            <p>
              The tariff is fixed when the session starts. A wallet or card-hold
              session gets a <b>budget</b>, and we stop the charger before the
              money runs out, not after.
            </p>
          }
        >
          <Steps
            steps={[
              { from: "Charger", to: "Engine", text: "Session started, with the card." },
              { from: "Engine", to: "Core", text: "Allocate the session: tariff fixed, budget set (card hold plus wallet), fleet vehicle recorded if known." },
              { from: "Core", to: "Charger", text: "Accepted. On 2.1, the budget also travels as the charger's own transaction limit, a backstop if it loses its connection." },
              { heading: "every meter reading" },
              { from: "Charger", to: "Worker", text: "Energy, power, state of charge, through Kafka." },
              { from: "Worker", text: "Prices the session so far with the same code the receipt uses, tax included. Cost plus a safety reserve reaches the budget: ask for a stop." },
              { from: "Driver app", text: "Shows energy, time and cost so far, live." },
              { heading: "the session ends" },
              { from: "Charger", to: "Worker", text: "Session ended, with the final meter reading." },
              { from: "Worker", text: "Prices the whole session: energy, charging time, idle time past the grace period, session fee." },
              { from: "Worker", text: "Issues a numbered receipt (R-000042) with CGST + SGST, or IGST across states, and settles the wallet, the card hold, the fleet and any sponsor in the same database transaction." },
              { from: "Worker", to: "Driver app", text: "Push notification: session complete, receipt ready." },
            ]}
          />
          <Cards
            items={[
              {
                title: "Receipts never change",
                body: "Numbered per operator without gaps. A correction is a credit note (CN-…), never an edit, so your books always reconcile.",
              },
              {
                title: "Idle time, as the charger reports it",
                body: "On 2.x, charging time is the time the charger reported Charging. Idle fees start only after the car stopped drawing power and the grace period passed; a charger holding power back is never idle.",
              },
              {
                title: "Energy you can audit",
                body: "Billed from the charger's cumulative meter, or from its interval readings if it sends only those. The receipt records which.",
              },
              {
                title: "A charger that lost its link",
                body: "It keeps charging on its own. When it reconnects, its queued readings arrive and the session is priced in full. Any shortfall becomes a debt the driver settles before the next session.",
              },
            ]}
          />
        </Section>

        <Section
          id="payments"
          no="08"
          title="Payments through Razorpay"
          intro={
            <>
              <p>
                Drivers pay with a prepaid <b>wallet</b> (UPI, cards,
                netbanking) or a <b>card hold</b>: an amount authorised before
                charging and captured for the real price afterwards, with the
                rest refunded. ChargeVeta never holds the money; Razorpay does.
              </p>
              <p>
                The rule throughout: <b>Razorpay is asked, never told.</b> A
                webhook, a browser confirmation or a retry is only a reason to
                fetch the payment from Razorpay and act on what it says now. A
                repeated or out-of-order webhook changes nothing, and nothing
                is credited twice.
              </p>
            </>
          }
        >
          <Steps
            steps={[
              { heading: "wallet top-up" },
              { from: "Driver app", to: "Core", text: "Add ₹500." },
              { from: "Core", to: "Razorpay", text: "Create an order; Razorpay Checkout opens in the app." },
              { from: "Driver", to: "Razorpay", text: "Pays by UPI, card or netbanking." },
              { from: "Razorpay", to: "Core", text: "Signed webhook to /api/v1/payments/razorpay/webhook, and the app's own confirmation." },
              { from: "Worker", to: "Razorpay", text: "Fetch the payment: captured? Then credit the wallet exactly once." },
              { heading: "card hold" },
              { from: "Driver app", to: "Razorpay", text: "Authorise ₹X on a card (held, not taken); the charger starts." },
              { from: "Worker", to: "Razorpay", text: "After the receipt: capture the hold, refund the difference, follow the refund until it is processed." },
              { heading: "withdrawals" },
              { from: "Driver app", to: "Core", text: "Withdraw unused wallet money: paid back as refunds of the driver's own recent top-ups, newest first." },
            ]}
          />
        </Section>

        <Section
          id="people"
          no="09"
          title="Operators, staff and drivers"
          intro={
            <p>
              There is no public sign-up for operators. The ChargeVeta platform
              team creates each operator (a <b>tenant</b>) and its owner; the
              owner builds their own team. Staff, drivers, fleet managers and
              the platform team are four separate kinds of account, with
              separate sign-ins, sessions and permissions.
            </p>
          }
        >
          <Steps
            steps={[
              { heading: "a new operator" },
              { from: "Platform team", text: "Creates the operator: name, operator code (e.g. acme), owner's email. Switches on optional modules such as fleets." },
              { from: "Owner", text: "Receives a one-time setup link (valid 72 hours), chooses a password, signs in with the operator code." },
              { from: "Owner", text: "Adds sites, tariffs and chargers, and invites staff by email. Each invitee sets their own password." },
              { heading: "a driver" },
              { from: "Driver", text: "Opens the driver app, enters the operator code and a mobile number, types the six-digit code. The first code creates the account; the phone number is the account." },
              { from: "Driver", text: "Gets an app card automatically, so they can start a charger at once. Can add and confirm an email later, then set a password." },
              { from: "Staff", text: "Link physical RFID cards to a driver. Drivers can't claim a card themselves: a number printed on a card doesn't prove you hold it." },
            ]}
          />
          <div className="mt-8">
            <Table
              head={["Role", "Can"]}
              rows={[
                ["Viewer", "See everything for the operator: chargers, sessions, drivers, receipts, dashboards."],
                ["Operator", "Also run chargers: remote start and stop, reset, unlock."],
                ["Admin", "Also change setup: sites, tariffs, cards, fleets, users, charger settings."],
                ["Owner", "Everything, including making other owners."],
              ]}
            />
          </div>
        </Section>

        <Section
          id="fleets"
          no="10"
          title="Fleets"
          intro={
            <p>
              A fleet is a company whose drivers charge on an operator’s
              chargers: a bus depot, a delivery firm, a carmaker’s fleet. The
              module is switched on per operator. Each fleet chooses how it is
              billed, and that choice is snapshotted on every session, so
              changing it never rebills an old one.
            </p>
          }
        >
          <Cards
            items={[
              { title: "Driver pays", body: "Members pay each session from their own wallet or card; the fleet sees the sessions." },
              {
                title: "Fleet pays, monthly",
                body: "Members charge without paying; the fleet gets a monthly statement (price and GST shown apart), emailed from the 3rd of each month.",
              },
              {
                title: "Vehicles on sessions",
                body: "A driver with several vehicles picks the car in the app before starting, so cost per vehicle and per kWh are exact.",
              },
              {
                title: "Fleet managers",
                body: (
                  <>
                    Sign in at <Code>{appHost}/fleet</Code>: dashboard, members,
                    sessions, depots, statement and CSV export. Membership and
                    billing stay with the operator.
                  </>
                ),
              },
            ]}
          />
        </Section>

        <Section
          id="resilience"
          no="11"
          title="When something fails"
          intro={
            <p>
              Internet links drop and servers restart. Each part is built so
              that a driver mid-session doesn’t notice, and nothing is billed
              wrongly afterwards.
            </p>
          }
        >
          <Cards
            items={[
              {
                title: "The core is down",
                body: "Connected chargers stay connected. A charger reconnecting with exactly the credentials it used successfully in the last day is let back in. Card taps fall back to the charger's local list.",
              },
              {
                title: "The event stream is down",
                body: "The engine keeps answering chargers and buffers their events on disk, then sends them in order when the stream returns. Nothing is lost.",
              },
              {
                title: "A charger goes offline mid-session",
                body: "It keeps charging. Its final readings arrive when it reconnects and the session is priced in full. On 2.1 its own transaction limit stops it at the budget.",
              },
              {
                title: "A stop that never lands",
                body: "If a session reaches its budget and the charger doesn't stop, staff get a critical alert that retries the stop and escalates by email and text until someone acts.",
              },
              {
                title: "A deploy",
                body: "The engine drains on shutdown: new connections wait, answers in flight are sent, and chargers reconnect within seconds. Database changes are backed up first and rolled back if a health check fails.",
              },
              {
                title: "A payment webhook arrives twice",
                body: "Nothing happens twice. Every credit, capture and refund is keyed to the Razorpay payment and checked against Razorpay itself.",
              },
            ]}
          />
        </Section>

        <Section
          id="security"
          no="12"
          title="Security and data separation"
          intro={
            <p>
              Many operators share one database. Each operator’s rows are kept
              apart by PostgreSQL row-level security, enforced by the database
              itself rather than by remembering to filter in code.
            </p>
          }
        >
          <ul className="max-w-[68ch] list-disc space-y-3 pl-5 leading-relaxed">
            <li>
              The operator comes only from the signed-in session, never from a
              header, a URL or a form field. Asking for another operator’s
              record by its ID answers &ldquo;not found&rdquo;, so it doesn’t
              even confirm the ID exists.
            </li>
            <li>
              The application connects as a role that cannot bypass row-level
              security, and refuses to start if it could.
            </li>
            <li>
              Charger passwords and user passwords are stored only as argon2
              hashes. Charger passwords sent as configuration are hidden in
              the audit log and command history.
            </li>
            <li>
              The engine’s command interface is internal only and never
              reachable from the internet. The engine and the core each hold
              separate secrets; the event worker holds none of them.
            </li>
            <li>
              Every change by staff is in the operator’s audit log: who, what,
              when, from which address. Failed sign-ins are recorded too.
            </li>
            <li>
              Production refuses simulated text messages outright, and runs
              with test payment keys or a fixed sign-in code only when each one
              is switched on deliberately, by its own named setting.
            </li>
          </ul>
        </Section>

        <Section
          id="ocpp"
          no="13"
          title="OCPP support"
          intro={
            <p>
              OCPP 1.6J, 2.0.1 and 2.1 run side by side, chosen per charger.
              Every message in both directions is validated against the Open
              Charge Alliance’s own JSON schemas, and every request gets an
              answer, because a charger left without one retries forever.
            </p>
          }
        >
          <Table
            head={["Area", "What ChargeVeta does"]}
            rows={[
              ["Core", "Boot, heartbeat, status, authorize, sessions, meter values, data transfer"],
              ["Remote control", "Start, stop, reset, unlock connector, change availability, trigger message"],
              ["Configuration", "Get and change configuration (1.6), get and set variables, base reports (2.x)"],
              ["Cards", "Local authorization list, kept in sync with differential updates; reservations"],
              ["Smart charging", "Charging profiles and composite schedules"],
              ["Firmware and logs", "Firmware update (plain and signed), diagnostics and log upload"],
              ["Security", "Security profiles 1–3, certificate install and listing, security events; the 1.6 security extension"],
              ["Monitoring (2.x)", "Set, read and clear variable monitors; device events linked to the monitor that raised them"],
              ["Pricing (2.1)", "Our tariff on the charger's screen (with GST), and a per-session cost limit the charger enforces itself"],
            ]}
          />
          <Note>
            Tested against the open-source EVerest charger firmware on 1.6,
            2.0.1 and 2.1, and against scripted simulators. Have a charger
            model you want checked before you buy?{" "}
            <a href={mailHref} className="font-medium text-volt underline underline-offset-4">
              Write to {site.contact.email}
            </a>
            .
          </Note>
        </Section>
      </div>

      <CtaBand
        title="Bring a charger, we'll connect it with you."
        body="Send us the charger's make, model and OCPP version. We'll set it up on a demo network and run a session with your team, start to receipt."
      />
    </>
  );
}
