import person2 from '../../assets/person21.jpg'
import person1 from '../../assets/person1.jpg'
import person3 from '../../assets/person3.jpg'

const testimonials = [
  {
    id: 1,
    name: "Rupali Srivastava",
    review:
      "Absolutely stunning collection! I loved the Peacock Aura Mangalsutra set I bought. Fast delivery and beautiful packaging.",
    image: person1,
  },
  {
    id: 2,
    name: "Shobhit Srivastava",
    review:
      "Beautiful Rakhi and great value for money! The quality exceeded my expectations, and the customer service was amazing. Easy refunds made the whole experience hassle-free.",
    image: person2,
  },
  {
    id: 3,
    name: "Neha Singh",
    review:
      "Very elegant designs. The earrings I bought were perfect for my wedding!",
    image: person3,
  },
];

const Testimonials = () => {
  return (
    <section className="py-5 bg-white">
      <div className="container">
        <h2 className="text-center text-warning fw-bold mb-5">
          What Our Customers Say
        </h2>
        <div className="row">
          {testimonials.map((t) => (
            <div className="col-md-4 mb-4" key={t.id}>
              <div className="card h-100 shadow-sm border-0 p-3">
                <div className="d-flex align-items-center mb-3">
                  <img
                    src={t.image}
                    alt={t.name}
                    className="rounded-circle border border-warning"
                    width="60"
                    height="60"
                  />
                  <div className="ms-3">
                    <h6 className="mb-0 fw-bold">{t.name}</h6>
                    <small className="text-muted">Verified Buyer</small>
                  </div>
                </div>
                <p className="text-muted">“{t.review}”</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
