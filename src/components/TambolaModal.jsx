


// import { useEffect } from "react";
// import * as bootstrap from "bootstrap";

// export default function PromoModal() {
//   useEffect(() => {
//     // Check if promo was already shown in this session
//     const hasSeenPromo = sessionStorage.getItem("promoShown");

//     if (!hasSeenPromo) {
//       const modalElement = document.getElementById("promoModal");
//       if (modalElement) {
//         const modal = new bootstrap.Modal(modalElement);
//         modal.show();

//         // Mark as shown for this session only
//         sessionStorage.setItem("promoShown", "true");

//         // Cleanup on modal close to prevent body freeze
//         modalElement.addEventListener("hidden.bs.modal", () => {
//           document.body.classList.remove("modal-open");
//           document.body.style.overflow = "";
//           const backdrop = document.querySelector(".modal-backdrop");
//           if (backdrop) backdrop.remove();
//         });
//       }
//     }
//   }, []);
// return (
//     <div
//       className="modal fade"
//       id="promoModal"
//       tabIndex="-1"
//       aria-labelledby="promoModalLabel"
//       aria-hidden="true"
//     >
//       <div className="modal-dialog modal-dialog-centered">
//         <div className="modal-content border-1 rounded-4 shadow-lg">
//           <div className="modal-header border-0 pb-0">
//             <h5
//               className="modal-title text-warning fw-bold fs-4"
//               id="promoModalLabel"
//             >
//               🎉 Get Up to <span className="text-danger">20% OFF</span> on Your First Order!
//             </h5>
//             <button
//               type="button"
//               className="btn-close"
//               data-bs-dismiss="modal"
//               aria-label="Close"
//             ></button>
//           </div>

//           <div className="modal-body text-center px-4 pt-0">
//             <img
//               src="https://res.cloudinary.com/dvxaztwnz/image/upload/v1754764049/modal_mveu6q.png"
//               alt="Jewelry Discount"
//               className="img-fluid rounded mb-4 shadow"
//               style={{ maxHeight: "220px", objectFit: "cover" }}
//             />
//             <p className="fs-5 text-dark mb-3">
//               ✨ <strong>Follow us on Instagram</strong> to enjoy{" "}
//               <span className="text-success">FREE SHIPPING</span> and exclusive discounts!
//             </p>
//             <p className="fs-6 text-secondary mb-2">
//               Sign up, place your first order, and grab amazing offers on your favorite jewelry.
//             </p>
//             <a
//               href="https://www.instagram.com/jew_elora/"
//               target="_blank"
//               rel="noopener noreferrer"
//               className="btn btn-outline-danger me-3 px-4 mt-4 fw-semibold"
//             >
//               <i className="bi bi-instagram me-2 "></i> Follow Instagram
//             </a>
           
//             <a
//               href="/signup"
//               className="btn btn-warning px-4 mt-4 fw-bold text-black"
//             >
//               Sign Up & Sign In
//             </a>
//           </div>

//           <a
//             href="/shop"
//             className="btn btn-danger px-4 mb-2 mx-5 fw-semibold text-black"
//           >
//             Shop Now
//           </a>
          
//         </div>
//       </div>
//     </div>
//   );
// }



import { useEffect } from "react";
import * as bootstrap from "bootstrap";

export default function PromoModal() {
  useEffect(() => {
    const hasSeenPromo = sessionStorage.getItem("promoShown");

    if (!hasSeenPromo) {
      const modalElement = document.getElementById("promoModal");
      if (modalElement) {
        const modal = new bootstrap.Modal(modalElement);
        modal.show();
        sessionStorage.setItem("promoShown", "true");

        modalElement.addEventListener("hidden.bs.modal", () => {
          document.body.classList.remove("modal-open");
          document.body.style.overflow = "";
          document.querySelector(".modal-backdrop")?.remove();
        });
      }
    }
  }, []);

  return (
    <div
      className="modal fade"
      id="promoModal"
      tabIndex="-1"
      aria-hidden="true"
    >
      <div className="modal-dialog modal-dialog-centered modal-md">
        <div className="modal-content rounded-4 shadow border-0">

          {/* Header */}
          <div className="modal-header border-0 pb-0">
            <h5 className="fw-bold text-warning fs-4">
              🎉 Flat <span className="text-danger">20% OFF</span> on First Order
            </h5>
            <button
              type="button"
              className="btn-close"
              data-bs-dismiss="modal"
            ></button>
          </div>

          {/* Body */}
          <div className="modal-body text-center px-4 pt-2">
            <img
              src="https://res.cloudinary.com/dvxaztwnz/image/upload/v1754764049/modal_mveu6q.png"
              alt="Jewelry Offer"
              className="img-fluid rounded-3 shadow-sm mb-3"
              style={{ maxHeight: "200px", objectFit: "cover" }}
            />

            <p className="fs-5 mb-2">
              ✨ Follow us on <strong>Instagram</strong> & get
            </p>

            <p className="fw-bold text-success fs-5 mb-3">
              FREE SHIPPING + Exclusive Deals
            </p>

            <p className="text-secondary small mb-4">
              Sign up today and unlock premium jewelry offers curated just for you.
            </p>

            {/* CTA GROUP */}
            <div className="d-grid gap-2">
              {/* Primary CTA */}
              <a
                href="https://www.instagram.com/jew_elora/"
                target="_blank"
                rel="noopener noreferrer"
                className="btn btn-danger fw-semibold py-2"
              >
                <i className="bi bi-instagram me-2"></i>
                Follow on Instagram
              </a>

              {/* Secondary CTA */}
              <a
                href="/signup"
                className="btn btn-warning fw-bold text-dark py-2"
              >
                Sign Up / Sign In
              </a>

              {/* Tertiary CTA */}
              <a
                href="/shop"
                className="btn btn-outline-dark fw-semibold py-2"
              >
                Shop Now
              </a>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}
