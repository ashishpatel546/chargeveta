"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { Menu, X } from "lucide-react";

import { Wordmark } from "@/components/Brand";
import { navLinks, site } from "@/lib/site";

export default function Header() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Close the mobile menu on navigation.
  const [lastPath, setLastPath] = useState(pathname);
  if (pathname !== lastPath) {
    setLastPath(pathname);
    setOpen(false);
  }

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  const isActive = (href: string) =>
    href === "/" ? pathname === "/" : pathname.startsWith(href);

  return (
    <header
      className={`sticky top-0 z-50 transition-[background-color,box-shadow] duration-300 ${
        scrolled || open
          ? "bg-paper/90 shadow-[0_1px_0_var(--color-line)] backdrop-blur-md"
          : "bg-paper"
      }`}
    >
      <div className="shell flex h-16 items-center justify-between gap-6 lg:h-[4.5rem]">
        <Wordmark />

        <nav aria-label="Main" className="hidden items-center gap-1 lg:flex">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              aria-current={isActive(link.href) ? "page" : undefined}
              className={`rounded-lg px-3.5 py-2 text-[0.9375rem] font-medium whitespace-nowrap transition-colors ${
                isActive(link.href)
                  ? "text-ink"
                  : "text-muted hover:text-ink"
              }`}
            >
              {link.name}
              <span
                aria-hidden
                className={`mx-auto mt-0.5 block h-0.5 rounded-full bg-charging transition-all duration-300 ${
                  isActive(link.href) ? "w-4" : "w-0"
                }`}
              />
            </Link>
          ))}
        </nav>

        <div className="hidden items-center gap-2 lg:flex">
          <a
            href={site.app.operatorUrl}
            className="rounded-lg px-3.5 py-2 text-[0.9375rem] font-medium whitespace-nowrap text-ink transition-colors hover:text-volt"
          >
            Sign in
          </a>
          <Link
            href="/contact"
            className="rounded-xl bg-ink px-4 py-2.5 text-[0.9375rem] font-semibold whitespace-nowrap text-white transition-colors hover:bg-volt"
          >
            Book a demo
          </Link>
        </div>

        <button
          type="button"
          onClick={() => setOpen((v) => !v)}
          aria-expanded={open}
          aria-controls="mobile-menu"
          aria-label={open ? "Close menu" : "Open menu"}
          className="grid grid-cols-1 h-11 w-11 place-items-center rounded-xl text-ink lg:hidden"
        >
          {open ? <X size={22} /> : <Menu size={22} />}
        </button>
      </div>

      <div
        id="mobile-menu"
        hidden={!open}
        className="menu-height overflow-y-auto overscroll-contain border-t border-line bg-paper lg:hidden"
      >
        <nav aria-label="Mobile" className="shell flex flex-col py-4">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              aria-current={isActive(link.href) ? "page" : undefined}
              className={`wide border-b border-line py-4 text-xl font-semibold ${
                isActive(link.href) ? "text-volt" : "text-ink"
              }`}
            >
              {link.name}
            </Link>
          ))}
          <div className="mt-6 grid grid-cols-1 gap-3">
            <Link
              href="/contact"
              className="rounded-xl bg-ink px-4 py-3.5 text-center font-semibold text-white"
            >
              Book a demo
            </Link>
            <a
              href={site.app.operatorUrl}
              className="rounded-xl border border-line-strong px-4 py-3.5 text-center font-semibold text-ink"
            >
              Sign in to the console
            </a>
            <a
              href={site.app.driverUrl}
              className="rounded-xl border border-line-strong px-4 py-3.5 text-center font-semibold text-ink"
            >
              Open the driver app
            </a>
          </div>
        </nav>
      </div>
    </header>
  );
}
