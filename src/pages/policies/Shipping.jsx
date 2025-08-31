import PolicyLayout from "../../components/PolicyLayout";

export default function Shipping() {
  return (
    <PolicyLayout title="Shipping & Delivery Policy">
      <section id="coverage">
        <h2>1. Service Coverage</h2>
        <p>
          We ship across India via leading courier partners. International shipping may be available
          on request—contact support before ordering.
        </p>
      </section>

      <section id="dispatch">
        <h2>2. Dispatch Time</h2>
        <p>
          Orders are typically processed within <strong>24–48 hours</strong> (business days).
          Made-to-order pieces can take longer; timelines are shown on product pages.
        </p>
      </section>

      <section id="delivery">
        <h2>3. Delivery Time</h2>
        <p>
          Metro cities: <strong>2–5</strong> business days; other locations: <strong>3–7</strong> business days.
          Remote areas may take longer due to courier constraints.
        </p>
      </section>

      <section id="fees">
        <h2>4. Shipping Fees</h2>
        <p>
          Shipping is free above <strong>₹999</strong> order value. Otherwise, fees are shown at checkout.
          COD (if available) may have an additional fee.
        </p>
      </section>

      <section id="tracking">
        <h2>5. Order Tracking</h2>
        <p>
          You’ll receive tracking details by email/SMS after dispatch. Use our Order Tracking page with
          your Order ID and phone/email.
        </p>
      </section>

      <section id="failed">
        <h2>6. Missed/Failed Delivery</h2>
        <p>
          Couriers attempt multiple deliveries. If undelivered and returned, we can reship (extra fee)
          or refund net of two-way shipping.
        </p>
      </section>

      <section id="damage">
        <h2>7. Damaged Parcels</h2>
        <p>
          If the outer box looks damaged or tampered, refuse delivery and contact support immediately
          with photos and an unboxing video.
        </p>
      </section>
    </PolicyLayout>
  );
}
