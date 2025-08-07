import { useEffect } from "react";
import * as bootstrap from 'bootstrap';

export default function TambolaModal() {
  useEffect(() => {
    const modalElement = document.getElementById("tambolaModal");
    if (modalElement) {
      const modal = new bootstrap.Modal(modalElement);
      modal.show();

      // Cleanup to prevent body freeze
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
      id="tambolaModal"
      tabIndex="-1"
      aria-labelledby="tambolaModalLabel"
      aria-hidden="true"
    >
      <div className="modal-dialog modal-dialog-centered">
        <div className="modal-content border-0 rounded-4">
          <div className="modal-header border-0">
            <h5 className="modal-title text-primary" id="tambolaModalLabel">
              🎁 Play & Win – Tambola Event!
            </h5>
            <button
              type="button"
              className="btn-close"
              data-bs-dismiss="modal"
              aria-label="Close"
            ></button>
          </div>

          <div className="modal-body text-center">
            <img
              src="https://res.cloudinary.com/dvxaztwnz/image/upload/v1753637869/tambola_rbdlr0.png"
              alt="Tambola Promo"
              className="img-fluid rounded mb-3"
              style={{ maxHeight: "300px", objectFit: "cover" }}
            />
            <p className="text-muted">
              Join our festive Tambola game and stand a chance to win
              <strong> FREE jewelry, vouchers, and more!</strong>
            </p>
            <p className="text-danger fw-bold">Prizes worth ₹2500+</p>
            <a
              href="https://tambola.jewelora.in"
              className="btn btn-success px-4"
              target="_blank"
              rel="noopener noreferrer"
            >
              🎯 Participate Now
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
