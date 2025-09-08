


import { useEffect, useState } from "react";
import { db } from "../firebase";
import { collection, getDocs, orderBy, query } from "firebase/firestore";

const CustomerReviews = () => {
  const [reviews, setReviews] = useState([]);

  useEffect(() => {
    const fetchReviews = async () => {
      const q = query(collection(db, "reviews"), orderBy("createdAt", "desc"));
      const snap = await getDocs(q);
      setReviews(snap.docs.map((doc) => ({ id: doc.id, ...doc.data() })));
    };
    fetchReviews();
  }, []);

  return (
    <div className="container py-5">
      <h2 className="text-center text-warning fw-bold mb-5">
        ⭐ Customer Reviews
      </h2>

      {reviews.length === 0 ? (
        <p className="text-center text-muted">No reviews yet.</p>
      ) : (
        <div className="row g-4">
          {reviews.map((review) => (
            <div key={review.id} className="col-md-6">
              <div className="card border-0 shadow-lg h-100 rounded-4">
                <div className="card-body p-4 d-flex flex-column">
                  {/* Top section: Letter avatar + name + stars */}
                  <div className="d-flex align-items-center mb-3">
                    <div
                      className="rounded-circle bg-warning text-white d-flex justify-content-center align-items-center me-3"
                      style={{
                        width: "45px",
                        height: "45px",
                        fontWeight: "bold",
                      }}
                    >
                      {review.customerName?.charAt(0).toUpperCase()}
                    </div>

                    <div>
                      <h6 className="fw-semibold mb-0">
                         {review.customerName }
                      </h6>
                      <div>
                        {[1, 2, 3, 4, 5].map((star) => (
                          <span
                            key={star}
                            style={{
                              color:
                                star <= review.rating ? "#FFD700" : "#e0e0e0",
                              fontSize: "1rem",
                            }}
                          >
                            ★
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>

                  {/* Review Text */}
                  <p className="text-secondary flex-grow-1">
                    {review.description}
                  </p>

                  {/* Product Image (if uploaded by user) */}
                  {review.photoUrl && (
                    <div className="overflow-hidden rounded-3 mb-3">
                      <img
                        src={review.photoUrl}
                        alt="Customer Review"
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
                  )}

                  {/* Footer Meta */}
                  <small className="text-muted mt-auto">
                    {review.createdAt?.toDate().toLocaleString()}
                  </small>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default CustomerReviews;
