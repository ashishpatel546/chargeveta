import type { Metadata } from "next";

import PageHeader from "@/components/PageHeader";
import { site } from "@/lib/site";

export const metadata: Metadata = {
  title: "Terms",
  description: "Terms for using the ChargeVeta website.",
  alternates: { canonical: "/terms" },
};

/* NOTE FOR THE TEAM: a plain-language starting point, not legal advice.
   Commercial terms for operators belong in each customer agreement. */
export default function TermsPage() {
  return (
    <>
      <PageHeader title="Terms">
        <p>The terms for using this website.</p>
      </PageHeader>
      <article className="shell prose-cv pb-24">
        <p>
          This website is published by {site.company.name}. By using it you
          agree to these terms. If you use the ChargeVeta application as an
          operator, your agreement with us governs that use; if you charge as a
          driver, the terms of the operator whose charger you use apply.
        </p>

        <h2>Information on this site</h2>
        <p>
          We describe the product as accurately as we can, but features change
          and examples on this site, including the numbers in the sample
          screens, are illustrations rather than offers. A written proposal
          from us is what sets out what you will get and what it costs.
        </p>

        <h2>Names and marks</h2>
        <p>
          ChargeVeta and AppMeSoft, and their logos, belong to{" "}
          {site.company.name}. Other names mentioned, such as OCPP and
          Razorpay, belong to their owners.
        </p>

        <h2>Law</h2>
        <p>
          These terms are governed by the laws of India, and the courts at
          Delhi have jurisdiction.
        </p>

        <h2>Contact</h2>
        <p>
          Questions about these terms:{" "}
          <a href={`mailto:${site.contact.email}`}>{site.contact.email}</a>.
        </p>
      </article>
    </>
  );
}
