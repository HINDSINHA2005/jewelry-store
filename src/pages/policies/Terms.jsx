import PolicyLayout from "../../components/PolicyLayout";

export default function Terms() {
  return (
    <PolicyLayout title="Terms & Conditions">
      <section id="acceptance">
        <h2>1. Acceptance of Terms</h2>
        <p>
          Welcome to <strong>Jewelora</strong> (“we”, “us”, “our”). By accessing or using
          our website and services, you agree to these Terms & Conditions (“Terms”).
          If you disagree with any part, please do not use the site.
        </p>
      </section>

      <section id="eligibility">
        <h2>2. Eligibility & Account</h2>
        <p>You must be at least 18 years old or have parental consent to purchase.</p>
        <p>You are responsible for safeguarding your account credentials and all activity under it.</p>
      </section>

      <section id="products">
        <h2>3. Products, Pricing & Availability</h2>
        <p>
          We strive for accuracy but occasional errors in price, description, or availability may occur.
          We may cancel orders impacted by such errors with a full refund.
        </p>
      </section>

      <section id="orders">
        <h2>4. Order Acceptance</h2>
        <p>
          Your order is an offer to buy. We accept only when we dispatch the item(s) and share a
          shipping confirmation. We reserve the right to refuse/cancel any order.
        </p>
      </section>

      <section id="payments">
        <h2>5. Payments</h2>
        <p>
          We accept UPI, cards, net banking and COD (if shown at checkout). Prepaid refunds are credited to
          the original payment method per our Refund Policy.
        </p>
      </section>

      <section id="use">
        <h2>6. Acceptable Use</h2>
        <p>No unlawful activity, scraping, reverse engineering, or infringement of IP rights.</p>
      </section>

      <section id="ip">
        <h2>7. Intellectual Property</h2>
        <p>
          All content, logos, product photos, and designs are property of <strong>Jewelora</strong> or
          its licensors. You may not use them without prior written consent.
        </p>
      </section>

      <section id="warranty">
        <h2>8. Warranty Disclaimer</h2>
        <p>
          Except as expressly stated, the site and products are provided “as is” without warranties of
          any kind, to the maximum extent permitted by law.
        </p>
      </section>

      <section id="liability">
        <h2>9. Limitation of Liability</h2>
        <p>
          To the fullest extent permitted, <strong>Jewelora</strong> shall not be liable for indirect,
          incidental, or consequential damages arising from use of the site or products.
        </p>
      </section>

      <section id="law">
        <h2>10. Governing Law & Disputes</h2>
        <p>
          These Terms are governed by the laws of India. Courts at <em>Delhi</em> shall have
          exclusive jurisdiction, subject to applicable consumer laws.
        </p>
      </section>

      <section id="changes">
        <h2>11. Changes to Terms</h2>
        <p>We may update these Terms at any time. Continued use constitutes acceptance.</p>
      </section>

      <section id="contact">
        <h2>12. Contact</h2>
        <p>Legal name: <strong>Jewelora</strong></p>
        <p>Email: <a href="mailto:info@jewelora.in">info@jewelora.in</a></p>
      </section>
    </PolicyLayout>
  );
}
