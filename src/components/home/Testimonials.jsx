



import { useEffect, useState } from "react";
import { db } from "../../firebase";
import { collection, getDocs, orderBy, query } from "firebase/firestore";

// Static fallback testimonials
import person1 from "../../assets/person1.jpg";
import person2 from "../../assets/person21.jpg";
import person3 from "../../assets/person3.jpg";

const staticTestimonials = [
  {
    id: "s1",
    name: "Rupali Srivastava",
    review:
      "Absolutely stunning collection! I loved the Peacock Aura Mangalsutra set I bought. Fast delivery and beautiful packaging.",
    image: person1,
    rating: 5,
  },
  {
    id: "s2",
    name: "Shobhit Srivastava",
    review:
      "Beautiful Rakhi and great value for money! The quality exceeded my expectations, and the customer service was amazing.",
    image: person2,
    rating: 5,
  },
  {
    id: "s3",
    name: "Neha Singh",
    review:
      "Very elegant designs. The earrings I bought were perfect for my wedding!",
    image: person3,
    rating: 5,
  },
];

const Testimonials = () => {
  const [reviews, setReviews] = useState([]);

  useEffect(() => {
    const fetchReviews = async () => {
      try {
        const q = query(collection(db, "reviews"), orderBy("createdAt", "desc"));
        const snap = await getDocs(q);
        const firebaseReviews = snap.docs.map((doc) => ({
          id: doc.id,
          name: doc.data().customerName,
          review: doc.data().description,
          productPhoto: doc.data().photoUrl || null, // 👉 user uploaded photo (product)
          rating: doc.data().rating || 5,
          createdAt: doc.data().createdAt || null,
        }));

        // Combine static + firebase reviews
        setReviews([...firebaseReviews, ...staticTestimonials]);
      } catch (error) {
        console.error("Error fetching reviews:", error);
        setReviews(staticTestimonials); // fallback
      }
    };

    fetchReviews();
  }, []);

  return (
    <section className="py-5" style={{ backgroundColor: "#fffaf3" }}>
      <div className="container">
        <h2
          className="text-center fw-bold mb-5"
          style={{
            color: "#b8860b",
            fontFamily: "'Playfair Display', serif",
            fontSize: "2.2rem",
          }}
        >
          ❤️ What Our Customers Say ❤️
        </h2>

        {reviews.length === 0 ? (
          <p className="text-center text-muted">No reviews yet.</p>
        ) : (
          <div className="row">
            {reviews.map((r) => (
              <div className="col-md-4 mb-4" key={r.id}>
                <div
                  className="card h-100 border-0 shadow-lg"
                  style={{
                    borderRadius: "15px",
                    transition: "transform 0.3s ease, box-shadow 0.3s ease",
                    background: "#fff",
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.transform = "translateY(-8px)";
                    e.currentTarget.style.boxShadow =
                      "0 10px 25px rgba(0,0,0,0.15)";
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.transform = "translateY(0)";
                    e.currentTarget.style.boxShadow =
                      "0 4px 15px rgba(0,0,0,0.08)";
                  }}
                >
                  <div className="p-4 d-flex flex-column">
                    {/* Always show Letter Avatar */}
                    <div className="d-flex align-items-center mb-3">
                      <div
                        className="rounded-circle bg-warning text-white d-flex justify-content-center align-items-center"
                        style={{
                          width: "65px",
                          height: "65px",
                          fontSize: "1.2rem",
                          fontWeight: "bold",
                        }}
                      >
                        {r.name?.charAt(0)}
                      </div>

                      <div className="ms-3">
                        <h6
                          className="mb-1 fw-bold"
                          style={{
                            fontSize: "1rem",
                            color: "#333",
                          }}
                        >
                          {r.name}
                        </h6>
                        <small className="text-muted">Verified Buyer</small>
                        <div style={{ color: "#f4c430", fontSize: "0.9rem" }}>
                          {Array.from({ length: 5 }, (_, i) => (
                            <span key={i}>
                              {i < r.rating ? "⭐" : "☆"}
                            </span>
                          ))}
                        </div>
                      </div>
                    </div>

                  
                    <p
                      className="text-muted fst-italic flex-grow-1"
                      style={{
                        fontSize: "0.95rem",
                        lineHeight: "1.6",
                      }}
                    >
                      “{r.review}”
                    </p>

                    {/* Product Photo (only render if uploaded by user, no space otherwise) */}
{r.productPhoto ? (
  <div className="overflow-hidden rounded-3 mb-3">
    <img
      src={r.productPhoto}
      alt="Customer Product"
      className="img-fluid w-100"
      style={{
        maxHeight: "220px",
        objectFit: "cover",
        transition: "0.3s ease",
      }}
      onMouseOver={(e) =>
        (e.currentTarget.style.transform = "scale(1.05)")
      }
      onMouseOut={(e) =>
        (e.currentTarget.style.transform = "scale(1)")
      }
    />
  </div>
) : null}


                    {/* Date */}
                    {r.createdAt && (
                      <small className="text-muted d-block">
                        {r.createdAt.toDate().toLocaleDateString()}
                      </small>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
};

export default Testimonials;
