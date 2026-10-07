import data from "@/data/site.json";

/**
 * Every contact detail on the site comes from src/data/site.json. Change a
 * number, address or URL there and it changes everywhere: header, footer,
 * contact page, WhatsApp form, QR code and structured data.
 */
export const site = data;

const { contact } = site;

export const telHref = `tel:${contact.phone.replace(/[^+\d]/g, "")}`;
export const mailHref = `mailto:${contact.email}`;

/** wa.me link, optionally with a pre-filled message. */
export function whatsappHref(text?: string) {
  const base = `https://wa.me/${contact.whatsapp}`;
  return text ? `${base}?text=${encodeURIComponent(text)}` : base;
}

export const addressLines = [
  `${contact.address.line1}, ${contact.address.locality}`,
  `${contact.address.city} ${contact.address.postalCode}, ${contact.address.country}`,
];

export const addressOneLine = `${contact.address.line1}, ${contact.address.locality}-${contact.address.postalCode}`;

export const navLinks = [
  { name: "Home", href: "/" },
  { name: "Platform", href: "/platform" },
  { name: "Who it's for", href: "/solutions" },
  { name: "About", href: "/about" },
  { name: "Contact", href: "/contact" },
] as const;
