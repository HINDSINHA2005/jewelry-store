// import { useEffect } from "react";
// import * as bootstrap from 'bootstrap';

// export default function TambolaModal() {
//   useEffect(() => {
//     const modalElement = document.getElementById("tambolaModal");
//     if (modalElement) {
//       const modal = new bootstrap.Modal(modalElement);
//       modal.show();

//       // Cleanup to prevent body freeze
//       modalElement.addEventListener("hidden.bs.modal", () => {
//         document.body.classList.remove("modal-open");
//         document.body.style.overflow = "";
//         const backdrop = document.querySelector(".modal-backdrop");
//         if (backdrop) backdrop.remove();
//       });
//     }
//   }, []);

//   return (
//     <div
//       className="modal fade"
//       id="tambolaModal"
//       tabIndex="-1"
//       aria-labelledby="tambolaModalLabel"
//       aria-hidden="true"
//     >
//       <div className="modal-dialog modal-dialog-centered">
//         <div className="modal-content border-0 rounded-4">
//           <div className="modal-header border-0">
//             <h5 className="modal-title text-primary" id="tambolaModalLabel">
//               🎁 Play & Win – Tambola Event!
//             </h5>
//             <button
//               type="button"
//               className="btn-close"
//               data-bs-dismiss="modal"
//               aria-label="Close"
//             ></button>
//           </div>

//           <div className="modal-body text-center">
//             <img
//               src="https://res.cloudinary.com/dvxaztwnz/image/upload/v1753637869/tambola_rbdlr0.png"
//               alt="Tambola Promo"
//               className="img-fluid rounded mb-3"
//               style={{ maxHeight: "300px", objectFit: "cover" }}
//             />
//             <p className="text-muted">
//               Join our festive Tambola game and stand a chance to win
//               <strong> FREE jewelry, vouchers, and more!</strong>
//             </p>
//             <p className="text-danger fw-bold">Prizes worth ₹2500+</p>
//             <a
//               href="https://tambola.jewelora.in"
//               className="btn btn-success px-4"
//               target="_blank"
//               rel="noopener noreferrer"
//             >
//               🎯 Participate Now
//             </a>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// }


import { useEffect } from "react";
import * as bootstrap from "bootstrap";

export default function PromoModal() {
  useEffect(() => {
    const modalElement = document.getElementById("promoModal");
    if (modalElement) {
      const modal = new bootstrap.Modal(modalElement);
      modal.show();

      // Cleanup on modal close to prevent body freeze
      modalElement.addEventListener("hidden.bs.modal", () => {
        document.body.classList.remove("modal-open");
        document.body.style.overflow = "";
        const backdrop = document.querySelector(".modal-backdrop");
        if (backdrop) backdrop.remove();
      });
    }
  }, []);

  return (
    <div
      className="modal fade"
      id="promoModal"
      tabIndex="-1"
      aria-labelledby="promoModalLabel"
      aria-hidden="true"
    >
      <div className="modal-dialog modal-dialog-centered">
        <div className="modal-content border-1 rounded-4 shadow-lg">
          <div className="modal-header border-0 pb-0">
            <h5
              className="modal-title text-warning fw-bold fs-4"
              id="promoModalLabel"
            >
              🎉 Get Up to <span className="text-danger">20% OFF</span> on Your First Order!
            </h5>
            <button
              type="button"
              className="btn-close"
              data-bs-dismiss="modal"
              aria-label="Close"
            ></button>
          </div>

          <div className="modal-body text-center px-4 pt-0">
            <img
              src="https://res.cloudinary.com/dvxaztwnz/image/upload/v1754764049/modal_mveu6q.png"
              alt="Jewelry Discount"
              className="img-fluid rounded mb-4 shadow"
              style={{ maxHeight: "220px", objectFit: "cover" }}
            />
            <p className="fs-5 text-dark mb-3">
              ✨ <strong>Follow us on Instagram</strong> to enjoy <span className="text-success">FREE SHIPPING</span> and exclusive discounts!
            </p>
            <p className="fs-6 text-secondary mb-4">
              Sign up, place your first order, and grab amazing offers on your favorite jewelry.
            </p>
            <a
              href="https://instagram.com/jewelora" 
              target="_blank"
              rel="noopener noreferrer"
              className="btn btn-outline-danger me-3 px-4 mt-4 fw-semibold"
            >
              <i className="bi bi-instagram me-2 "></i> Follow Instagram
            </a>
            <a
              href="/signup"
              className="btn btn-warning px-4 mt-4 fw-bold text-black"
            >
              Sign Up & Sign In
            </a>
            
          </div>
           <a
              href="/shop"
              className="btn btn-danger px-4 mb-2 mx-5 fw-semibold text-black"
            >
              Shop Now
            </a>
            <a
              href="/category"
              className="btn btn-primary px-4 mb-2 mx-5 fw-semibold text-black"
            >
              Categories
            </a>
        </div>
      </div>
    </div>
  );
}
