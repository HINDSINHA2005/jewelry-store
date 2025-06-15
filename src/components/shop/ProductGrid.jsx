import { Link } from "react-router-dom";

// Using placeholder images for demonstration purposes to ensure consistent sizing.
// In a real application, you would manage your image assets consistently.
const products = [
  {
    name: "Gold Necklace",
    price: "₹12,000",
    image: "https://placehold.co/300x300/F0E68C/black?text=Necklace",
  },
  {
    name: "Diamond Ring",
    price: "₹25,000",
    image: "https://placehold.co/300x300/ADD8E6/black?text=Ring",
  },
  {
    name: "Silver Bracelet",
    price: "₹8,000",
    image: "https://placehold.co/300x300/C0C0C0/black?text=Bracelet",
  },
  {
    name: "Traditional Jhumkas",
    price: "₹5,000",
    image: "https://placehold.co/300x300/FFD700/black?text=Jhumkas",
  },
];

const ProductGrid = () => {
  return (
    <div className="row g-4">
      {products.map((prod, index) => (
        <div className="col-md-3 col-sm-6" key={index}>
          <div className="card border-0 shadow-sm h-100 rounded-lg overflow-hidden">
            {" "}
            {/* Added rounded-lg and overflow-hidden */}
            <img
              src={prod.image}
              className="card-img-top w-full h-48 object-cover" // Added w-full, h-48, object-cover for uniform size and aspect ratio
              alt={prod.name}
            />
            <div className="card-body text-center p-4">
              {" "}
              {/* Added padding */}
              <h6 className="fw-bold text-lg mb-2">{prod.name}</h6>{" "}
              {/* Tailwind text size and margin */}
              <p className="text-amber-500 fw-semibold text-xl mb-3">
                {prod.price}
              </p>{" "}
              {/* Tailwind color, text size and margin */}
              <Link
                to={`/product/${index}`}
                className="btn btn-outline-warning btn-sm"
              >
                View Details
              </Link>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default ProductGrid;
