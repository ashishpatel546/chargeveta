import type { Metadata, Viewport } from "next";
import { Archivo, JetBrains_Mono } from "next/font/google";
import "./globals.css";

import { WhatsAppIcon } from "@/components/Brand";
import Footer from "@/components/Footer";
import Header from "@/components/Header";
import { site, whatsappHref } from "@/lib/site";

const archivo = Archivo({
  variable: "--font-archivo",
  subsets: ["latin"],
  axes: ["wdth"],
  display: "swap",
});

const jetbrains = JetBrains_Mono({
  variable: "--font-jetbrains",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: {
    default: `${site.name}: EV charging station management software for India`,
    template: `%s | ${site.name}`,
  },
  description: site.description,
  applicationName: site.name,
  keywords: [
    "EV charging software",
    "charging station management system",
    "CSMS India",
    "OCPP 1.6",
    "OCPP 2.0.1",
    "EV charging app",
    "charge point operator software",
    "EV fleet charging",
  ],
  authors: [{ name: site.company.name, url: site.company.website }],
  creator: site.company.name,
  openGraph: {
    type: "website",
    locale: "en_IN",
    url: site.url,
    siteName: site.name,
    title: `${site.name}: run your EV charging network from one screen`,
    description: site.description,
  },
  twitter: {
    card: "summary_large_image",
    title: `${site.name}: run your EV charging network from one screen`,
    description: site.description,
  },
  alternates: { canonical: "/" },
};

export const viewport: Viewport = {
  themeColor: "#141A46",
  width: "device-width",
  initialScale: 1,
  // lets the page use the full screen on notched phones; safe-area insets
  // keep fixed elements clear of the notch and home indicator
  viewportFit: "cover",
};

const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Organization",
      name: site.company.name,
      url: site.company.website,
      email: site.company.email,
    },
    {
      "@type": "SoftwareApplication",
      name: site.name,
      url: site.url,
      applicationCategory: "BusinessApplication",
      operatingSystem: "Web, Android, iOS",
      description: site.description,
      publisher: { "@type": "Organization", name: site.company.name },
    },
    {
      "@type": "LocalBusiness",
      name: site.name,
      url: site.url,
      email: site.contact.email,
      telephone: site.contact.phone,
      address: {
        "@type": "PostalAddress",
        streetAddress: site.contact.address.line1,
        addressLocality: site.contact.address.locality,
        addressRegion: site.contact.address.city,
        postalCode: site.contact.address.postalCode,
        addressCountry: "IN",
      },
    },
  ],
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en-IN"
      className={`${archivo.variable} ${jetbrains.variable} antialiased`}
    >
      <body className="full-height flex flex-col">
        <a
          href="#main"
          className="sr-only z-60 rounded-lg bg-ink px-4 py-3 font-semibold text-white focus:not-sr-only focus:fixed focus:top-3 focus:left-3"
        >
          Skip to content
        </a>
        <Header />
        <main id="main" className="flex-1">
          {children}
        </main>
        <Footer />

        <a
          href={whatsappHref("Hello ChargeVeta, I have a question.")}
          target="_blank"
          rel="noopener noreferrer"
          aria-label="Chat with ChargeVeta on WhatsApp"
          className="wa-float fixed z-40 grid h-14 w-14 place-items-center rounded-full bg-[#25D366] text-white shadow-[0_12px_30px_-8px_rgba(18,140,70,0.6)] transition-transform hover:scale-105"
        >
          <WhatsAppIcon size={28} />
        </a>

        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd).replace(/</g, "\\u003c") }}
        />
      </body>
    </html>
  );
}
