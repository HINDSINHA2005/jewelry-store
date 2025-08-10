// import person2 from '../../assets/person21.jpg'
// import person1 from '../../assets/person1.jpg'
// import person3 from '../../assets/person3.jpg'

// const testimonials = [
//   {
//     id: 1,
//     name: "Rupali Srivastava",
//     review:
//       "Absolutely stunning collection! I loved the Peacock Aura Mangalsutra set I bought. Fast delivery and beautiful packaging.",
//     image: person1,
//   },
//   {
//     id: 2,
//     name: "Shobhit Srivastava",
//     review:
//       "Beautiful Rakhi and great value for money! The quality exceeded my expectations, and the customer service was amazing.",
//     image: person2,
//   },
//   {
//     id: 3,
//     name: "Neha Singh",
//     review:
//       "Very elegant designs. The earrings I bought were perfect for my wedding!",
//     image: person3,
//   },
// ];

// const Testimonials = () => {
//   return (
//     <section className="py-5 bg-white">
//       <div className="container">
//         <h2 className="text-center text-warning fw-bold mb-5">
//           What Our Customers Say
//         </h2>
//         <div className="row">
//           {testimonials.map((t) => (
//             <div className="col-md-4 mb-4" key={t.id}>
//               <div className="card h-100 shadow-sm border-0 p-3">
//                 <div className="d-flex align-items-center mb-3">
//                   <img
//                     src={t.image}
//                     alt={t.name}
//                     className="rounded-circle border border-warning"
//                     width="60"
//                     height="60"
//                   />
//                   <div className="ms-3">
//                     <h6 className="mb-0 fw-bold">{t.name}</h6>
//                     <small className="text-muted">Verified Buyer</small>
//                   </div>
//                 </div>
//                 <p className="text-muted">“{t.review}”</p>
//               </div>
//             </div>
//           ))}
//         </div>
//       </div>
//     </section>
//   );
// };

// export default Testimonials;

import person2 from '../../assets/person21.jpg';
import person1 from '../../assets/person1.jpg';
import person3 from '../../assets/person3.jpg';

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
      "Beautiful Rakhi and great value for money! The quality exceeded my expectations, and the customer service was amazing.",
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

        <div className="row">
          {testimonials.map((t) => (
            <div className="col-md-4 mb-4" key={t.id}>
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
                <div className="p-4">
                  <div className="d-flex align-items-center mb-3">
                    <img
                      src={t.image}
                      alt={t.name}
                      className="rounded-circle border border-warning"
                      style={{
                        width: "65px",
                        height: "65px",
                        objectFit: "cover",
                        boxShadow: "0 4px 10px rgba(0,0,0,0.1)",
                      }}
                    />
                    <div className="ms-3">
                      <h6
                        className="mb-1 fw-bold"
                        style={{
                          fontSize: "1rem",
                          color: "#333",
                        }}
                      >
                        {t.name}
                      </h6>
                      <small className="text-muted">Verified Buyer</small>
                      <div style={{ color: "#f4c430", fontSize: "0.9rem" }}>
                        ⭐⭐⭐⭐⭐
                      </div>
                    </div>
                  </div>

                  <p
                    className="text-muted fst-italic"
                    style={{
                      fontSize: "0.95rem",
                      lineHeight: "1.6",
                    }}
                  >
                    “{t.review}”
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
