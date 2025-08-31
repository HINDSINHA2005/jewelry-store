import PolicyLayout from "../../components/PolicyLayout";

export default function Replacement() {
  return (
    <PolicyLayout title="Replacement / Exchange Policy">
      <section id="window">
        <h2>1. Exchange Window</h2>
        <p>
          Exchanges are accepted within <strong>7 days</strong> of delivery for size, color, or
          defective items, subject to stock availability.
        </p>
      </section>

      <section id="conditions">
        <h2>2. Conditions</h2>
        <ul>
          <li>Item must be unused and in original packaging</li>
          <li>Include invoice, tags, and freebies</li>
          <li>Provide photos/video for damage claims</li>
        </ul>
      </section>

      <section id="exceptions">
        <h2>3. Exceptions</h2>
        <p>Earrings and personalized items are not exchangeable unless defective on arrival.</p>
      </section>

      <section id="howto">
        <h2>4. How to Request an Exchange</h2>
        <ol>
          <li>Contact us at <a href="mailto:info@jewelora.in">info@jewelora.in</a> with order ID.</li>
          <li>Choose replacement from available stock or request store credit.</li>
          <li>We’ll arrange pickup or share the return label; QC upon receipt.</li>
        </ol>
      </section>

      <section id="storecredit">
        <h2>5. Store Credit</h2>
        <p>
          If preferred item is unavailable, we can issue store credit valid for <strong>6 months</strong>.
        </p>
      </section>
    </PolicyLayout>
  );
}
