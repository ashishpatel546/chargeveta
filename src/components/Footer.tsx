import Link from "next/link";
import { Mail, MapPin, Phone } from "lucide-react";

import { AppMeSoft, WhatsAppIcon, Wordmark } from "@/components/Brand";
import {
  addressLines,
  mailHref,
  navLinks,
  site,
  telHref,
  whatsappHref,
} from "@/lib/site";

export default function Footer() {
  return (
    <footer className="bg-ink text-white/70">
      <div className="shell grid grid-cols-1 gap-x-10 gap-y-12 py-16 sm:grid-cols-2 lg:grid-cols-[1.4fr_1fr_1fr_1.3fr] lg:py-20">
        <div>
          <Wordmark onDark />
          <p className="mt-5 max-w-xs text-[0.9375rem] leading-relaxed">
            Software for running EV charging networks: chargers, drivers,
            fleets, payments and invoices.
          </p>
          <p className="mt-6 text-sm">
            Built by{" "}
            <a href={site.company.website} className="inline-flex min-h-11 items-center hover:underline sm:min-h-0">
              <AppMeSoft onDark />
            </a>
          </p>
        </div>

        <nav aria-label="Footer">
          <h2 className="text-sm font-semibold text-white">Company</h2>
          <ul className="mt-3 text-[0.9375rem] sm:mt-4 sm:space-y-1">
            {navLinks.map((link) => (
              <li key={link.href}>
                <Link href={link.href} className="flex min-h-11 items-center hover:text-white sm:min-h-8">
                  {link.name}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <div>
          <h2 className="text-sm font-semibold text-white">Sign in</h2>
          <ul className="mt-3 text-[0.9375rem] sm:mt-4 sm:space-y-1">
            <li>
              <a href={site.app.operatorUrl} className="flex min-h-11 items-center hover:text-white sm:min-h-8">
                Operator console
              </a>
            </li>
            <li>
              <a href={site.app.driverUrl} className="flex min-h-11 items-center hover:text-white sm:min-h-8">
                Driver app
              </a>
            </li>
            <li>
              <a href={site.app.fleetUrl} className="flex min-h-11 items-center hover:text-white sm:min-h-8">
                Fleet portal
              </a>
            </li>
          </ul>
        </div>

        <div>
          <h2 className="text-sm font-semibold text-white">Talk to us</h2>
          <ul className="mt-3 text-[0.9375rem] sm:mt-4 sm:space-y-1.5">
            <li>
              <a href={telHref} className="flex min-h-11 items-center gap-3 hover:text-white sm:min-h-8">
                <Phone size={16} className="text-charging" aria-hidden />
                <span className="tnum">{site.contact.phone}</span>
              </a>
            </li>
            <li>
              <a
                href={whatsappHref("Hello ChargeVeta, I have a question.")}
                target="_blank"
                rel="noopener noreferrer"
                className="flex min-h-11 items-center gap-3 hover:text-white sm:min-h-8"
              >
                <WhatsAppIcon size={16} className="text-available" />
                WhatsApp us
              </a>
            </li>
            <li>
              <a href={mailHref} className="flex min-h-11 items-center gap-3 hover:text-white sm:min-h-8">
                <Mail size={16} className="text-charging" aria-hidden />
                {site.contact.email}
              </a>
            </li>
            <li>
              <a
                href={site.contact.mapsUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex min-h-11 items-start gap-3 py-2.5 hover:text-white sm:py-1"
              >
                <MapPin size={16} className="mt-1 text-charging" aria-hidden />
                <span>
                  {addressLines[0]}
                  <br />
                  {addressLines[1]}
                </span>
              </a>
            </li>
          </ul>
        </div>
      </div>

      <div className="border-t border-white/10">
        <div className="shell flex flex-col gap-3 py-6 text-sm sm:flex-row sm:items-center sm:justify-between">
          <p>
            © {site.launchYear} <AppMeSoft onDark />. All rights reserved.
          </p>
          <div className="-mx-2 flex gap-2">
            <Link href="/privacy" className="flex min-h-11 items-center px-2 hover:text-white sm:min-h-8">
              Privacy
            </Link>
            <Link href="/terms" className="flex min-h-11 items-center px-2 hover:text-white sm:min-h-8">
              Terms
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
