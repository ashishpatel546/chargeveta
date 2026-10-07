import type { Metadata } from "next";

import PageHeader from "@/components/PageHeader";
import { site } from "@/lib/site";

export const metadata: Metadata = {
  title: "Privacy",
  description: "How ChargeVeta and AppMeSoft Private Limited handle personal information.",
  alternates: { canonical: "/privacy" },
};

/* NOTE FOR THE TEAM: a plain-language starting point, not legal advice.
   Have it reviewed against the DPDP Act, 2023 before launch. */
export default function PrivacyPage() {
  return (
    <>
      <PageHeader title="Privacy">
        <p>How we handle personal information, in plain words.</p>
      </PageHeader>
      <article className="shell prose-cv pb-24">
        <p>
          ChargeVeta is operated by {site.company.name} (&quot;we&quot;). This
          page covers this website, {site.domain}, and the ChargeVeta
          application at {site.app.operatorUrl.replace("https://", "")}.
        </p>

        <h2>This website</h2>
        <p>
          This website does not ask you to create an account and does not store
          what you type into the contact form. Submitting the form opens
          WhatsApp on your device with your message filled in; nothing is sent
          until you press send in WhatsApp, and from then on WhatsApp&apos;s own
          privacy policy applies to that conversation.
        </p>

        <h2>The ChargeVeta application</h2>
        <p>
          When a charging operator uses ChargeVeta, the operator decides what
          is collected from its drivers and staff, and we process it on the
          operator&apos;s behalf. That typically includes:
        </p>
        <ul>
          <li>a driver&apos;s name, mobile number and, if given, email address;</li>
          <li>charging sessions: where, when, how much energy, and what it cost;</li>
          <li>wallet balances, payments and refunds (card and UPI details are handled by Razorpay, not stored by us);</li>
          <li>staff sign-ins and an audit log of their actions, with the network address they came from.</li>
        </ul>
        <p>
          Each operator&apos;s data is kept separate from every other
          operator&apos;s, and we use it only to run the service: starting and
          billing charges, issuing invoices, sending the notifications a user
          has asked for, and keeping the system secure.
        </p>

        <h2>Your choices</h2>
        <p>
          You can ask to see, correct or delete personal information we hold
          about you. If you are a driver, the charging operator you use is the
          first place to ask; you can also write to us at{" "}
          <a href={`mailto:${site.contact.email}`}>{site.contact.email}</a> and we
          will help, subject to what tax and accounting law requires us to keep.
        </p>

        <h2>Contact</h2>
        <p>
          {site.company.name}, {site.contact.address.line1},{" "}
          {site.contact.address.locality}-{site.contact.address.postalCode}.
          Email <a href={`mailto:${site.contact.email}`}>{site.contact.email}</a>.
        </p>
      </article>
    </>
  );
}
