import type { LucideIcon } from "lucide-react";
import {
  Activity,
  BarChart3,
  Bell,
  CalendarClock,
  Car,
  Cable,
  CreditCard,
  FileText,
  Gauge,
  HardDriveDownload,
  KeyRound,
  Layers,
  Lock,
  MapPin,
  MonitorSmartphone,
  PlugZap,
  Receipt,
  RotateCcw,
  ScrollText,
  ShieldCheck,
  Tags,
  UserCog,
  Users,
  Wallet,
  Webhook,
} from "lucide-react";

/*
 * What ChargeVeta does, grouped the way an operator thinks about it. Each line
 * is something the product ships today; keep it that way when editing.
 */

export type Feature = { icon: LucideIcon; name: string; body: string };
export type Group = { id: string; title: string; intent: string; features: Feature[] };

export const groups: Group[] = [
  {
    id: "chargers",
    title: "Chargers",
    intent: "Connect any OCPP charger and control it from the console.",
    features: [
      { icon: Cable, name: "Three OCPP versions at once", body: "1.6J, 2.0.1 and 2.1 chargers run side by side on the same network." },
      { icon: PlugZap, name: "Connectors set up for you", body: "Connectors are created from what the charger reports. Rename or retire them any time." },
      { icon: RotateCcw, name: "Remote commands", body: "Start, stop, reset, unlock, change availability and trigger a status report remotely." },
      { icon: HardDriveDownload, name: "Firmware and diagnostics", body: "Push signed firmware updates and fetch log files without a site visit." },
      { icon: CalendarClock, name: "Reservations", body: "Hold a connector for a driver for a set time, then release it automatically." },
      { icon: ShieldCheck, name: "Charger security", body: "Security profiles 1 to 3: password, TLS, and client certificates, with security events kept." },
    ],
  },
  {
    id: "operations",
    title: "Operations",
    intent: "Know what every charger is doing, and act on it.",
    features: [
      { icon: Activity, name: "Live dashboard", body: "Connector states, running sessions and energy update on screen as they happen." },
      { icon: Bell, name: "Notifications", body: "Faults, offline chargers and payments that need attention raise an alert for your team." },
      { icon: Gauge, name: "Availability reports", body: "Uptime per charger and per connector, so you know which site needs a visit." },
      { icon: BarChart3, name: "Energy and revenue reports", body: "By site, by charger and by period, exported to CSV for your accountant." },
      { icon: MapPin, name: "Sites and locations", body: "Group chargers into sites with an address and map pin that drivers can find." },
      { icon: Tags, name: "Cards and access lists", body: "Issue RFID cards, block a lost one, and decide who may charge where." },
    ],
  },
  {
    id: "drivers",
    title: "Drivers",
    intent: "A charging app your drivers can use without help.",
    features: [
      { icon: MonitorSmartphone, name: "Installs from the browser", body: "A web app that installs on Android and iPhone, with no app store in between." },
      { icon: KeyRound, name: "Mobile number sign-in", body: "A one-time code to their phone, with email and password as an option." },
      { icon: MapPin, name: "Nearby chargers", body: "Which chargers are close and which connectors are free right now." },
      { icon: PlugZap, name: "Start without a card", body: "Start and stop a session from the phone, and watch energy and cost rise live." },
      { icon: Bell, name: "Push notifications", body: "A message when a session ends, a payment lands or a refund goes out." },
      { icon: Receipt, name: "Every receipt, kept", body: "Past sessions and their tax invoices, ready to download." },
    ],
  },
  {
    id: "payments",
    title: "Payments and billing",
    intent: "Get paid for every kilowatt-hour, with the tax right.",
    features: [
      { icon: Tags, name: "Tariffs", body: "Per-site tariffs with versions, so a price change never rewrites an old receipt." },
      { icon: Wallet, name: "Driver wallet", body: "Top up by UPI, card or netbanking through Razorpay; sessions draw it down." },
      { icon: CreditCard, name: "Card hold and capture", body: "Hold an amount when charging starts and capture only what was used." },
      { icon: FileText, name: "GST tax invoices", body: "A numbered invoice for every session, with GST worked out on the server." },
      { icon: ScrollText, name: "Credit notes and refunds", body: "Refunds are recorded as credit notes against the original invoice." },
      { icon: Layers, name: "Exact money", body: "Amounts are kept to the paisa from meter to invoice, never rounded in between." },
    ],
  },
  {
    id: "fleets",
    title: "Fleets",
    intent: "Charge a fleet and bill it the way the fleet wants.",
    features: [
      { icon: Car, name: "Fleets, vehicles and drivers", body: "Add a fleet, its vehicles and its members, each with their own cards." },
      { icon: UserCog, name: "Fleet manager portal", body: "A separate sign-in where a fleet's manager sees all of their sessions." },
      { icon: Receipt, name: "Monthly invoice or pay-as-you-go", body: "Bill the fleet once a month, or let each driver pay for their own charging." },
    ],
  },
  {
    id: "platform",
    title: "Team, security and integrations",
    intent: "Run it as a business, with the right people in the right places.",
    features: [
      { icon: Users, name: "Roles for your team", body: "Owner, admin, operator and viewer, each seeing and doing only what they should." },
      { icon: ScrollText, name: "Audit log", body: "Who changed what, when, and from which address." },
      { icon: Lock, name: "Isolated workspaces", body: "Each operator's data is separated inside the database itself." },
      { icon: KeyRound, name: "API keys", body: "Give your own systems scoped access to ChargeVeta's API." },
      { icon: Webhook, name: "Webhooks", body: "Signed alerts sent to your systems when a charger faults, goes offline or a payment needs attention." },
      { icon: Layers, name: "Many networks, one platform", body: "Resellers and charger makers can run a separate network for each customer." },
    ],
  },
];
