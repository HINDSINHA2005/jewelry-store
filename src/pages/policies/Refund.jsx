import PolicyLayout from "../../components/PolicyLayout";

export default function Refund() {
  return (
    <PolicyLayout title="Refund Policy">
      <section id="overview">
        <h2>1. Overview</h2>
        <p>
          We want you to love your purchase. If there is a quality issue or you received the wrong
          product, you may request a refund under the terms below.
        </p>
      </section>

      <section id="eligibility">
        <h2>2. Eligibility</h2>
        <ul>
          <li>Request within <strong>7 days</strong> of delivery</li>
          <li>Unused, in original packaging with all tags & freebies</li>
          <li>Provide unboxing video/photos if item arrived damaged</li>
        </ul>
      </section>

      <section id="nonrefundable">
        <h2>3. Non-Refundable Items</h2>
        <ul>
          <li>Earrings (for hygiene), personalized/engraved items</li>
          <li>Sale or clearance items unless defective</li>
        </ul>
      </section>

      <section id="method">
        <h2>4. Refund Method & Time</h2>
        <p>
          Approved refunds are issued to the original payment method within <strong>5–7 business days</strong>
          after QC. COD orders are refunded via bank transfer/UPI as provided by you.
        </p>
      </section>

      <section id="process">
        <h2>5. How to Request</h2>
        <ol>
          <li>Email <a href="mailto:info@jewelora.in">info@jewelora.in</a> with order ID and reason.</li>
          <li>We’ll share the return shipping label or pickup details.</li>
          <li>After QC, we confirm approval or rejection of refund.</li>
        </ol>
      </section>

      <section id="shipping">
        <h2>6. Return Shipping</h2>
        <p>
          If the issue is on us (damaged/defective/wrong item), we cover return shipping. Otherwise,
          return shipping is borne by the customer.
        </p>
      </section>
    </PolicyLayout>
  );
}
