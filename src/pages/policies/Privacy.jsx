import PolicyLayout from "../../components/PolicyLayout";

export default function Privacy() {
  return (
    <PolicyLayout title="Privacy Policy">
      <section id="scope">
        <h2>1. Scope</h2>
        <p>
          This Privacy Policy describes how <strong>Jewelora</strong> collects, uses, and protects
          your personal data when you use our website or purchase from us.
        </p>
      </section>

      <section id="data-we-collect">
        <h2>2. Data We Collect</h2>
        <ul>
          <li>Contact details (name, email, phone, shipping address)</li>
          <li>Order and payment info (masked by payment gateway)</li>
          <li>Device, cookies, and analytics data</li>
          <li>Support communications and reviews</li>
        </ul>
      </section>

      <section id="use-of-data">
        <h2>3. How We Use Data</h2>
        <ul>
          <li>Process orders, payments, shipping, and returns</li>
          <li>Customer support and account management</li>
          <li>Fraud prevention and security</li>
          <li>Improve UX, run analytics, and personalize content</li>
          <li>Marketing with consent (you can opt out anytime)</li>
        </ul>
      </section>

      <section id="sharing">
        <h2>4. Sharing & Third Parties</h2>
        <p>
          We share data with logistics partners, payment gateways, analytics providers, and customer
          support tools—only as needed to deliver our services and comply with law.
        </p>
      </section>

      <section id="cookies">
        <h2>5. Cookies</h2>
        <p>
          We use essential, performance, and analytics cookies. You can control cookies via your browser
          settings; site features may be limited if disabled.
        </p>
      </section>

      <section id="security">
        <h2>6. Security</h2>
        <p>
          We implement reasonable technical and organizational measures. No method of transmission
          over the Internet is 100% secure.
        </p>
      </section>

      <section id="your-rights">
        <h2>7. Your Rights</h2>
        <ul>
          <li>Access, correct, or delete your data (subject to law)</li>
          <li>Withdraw marketing consent</li>
          <li>Request data portability where applicable</li>
        </ul>
      </section>

      <section id="retention">
        <h2>8. Data Retention</h2>
        <p>We retain data for as long as necessary for the purposes above or as required by law.</p>
      </section>

      <section id="intl">
        <h2>9. International Transfers</h2>
        <p>
          If we transfer data internationally, we use safeguards permitted by applicable laws.
        </p>
      </section>

      <section id="children">
        <h2>10. Children</h2>
        <p>Our services are not directed to children under 13. We do not knowingly collect their data.</p>
      </section>

      <section id="updates">
        <h2>11. Updates</h2>
        <p>We may update this Privacy Policy; changes are effective upon posting.</p>
      </section>

      <section id="contact">
        <h2>12. Contact</h2>
        <p>Email: <a href="mailto:info@jewelora.in">info@jewelora.in</a></p>
        <p>Instagram: <em>https://www.instagram.com/jew_elora/</em></p>
      </section>
    </PolicyLayout>
  );
}
