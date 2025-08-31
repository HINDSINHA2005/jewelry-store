import PolicyLayout from "../../components/PolicyLayout";

export default function Cancellation() {
  return (
    <PolicyLayout title="Cancellation Policy">
      <section id="before-ship">
        <h2>1. Before Shipment</h2>
        <p>
          You can cancel an order within <strong>12 hours</strong> of placement or before it ships,
          whichever is earlier, for a full refund.
        </p>
      </section>

      <section id="after-ship">
        <h2>2. After Shipment</h2>
        <p>
          Once shipped, cancellations aren’t possible. You may refuse delivery and we’ll process a
          refund minus shipping/handling once the package returns to us.
        </p>
      </section>

      <section id="special">
        <h2>3. Customized Orders</h2>
        <p>Personalized/engraved items cannot be cancelled once production begins.</p>
      </section>

      <section id="howto">
        <h2>4. How to Cancel</h2>
        <p>Email <a href="mailto:info@jewelora.in">info@jewelora.in</a> with your order ID.</p>
      </section>
    </PolicyLayout>
  );
}
