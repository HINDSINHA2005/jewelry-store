import React from 'react';

// Using placeholder images for demonstration purposes to ensure consistent sizing.
// In a real application, you would manage your image assets consistently.
const categories = [
  { title: "Necklaces", image: "https://placehold.co/300x300/F0E68C/black?text=Necklaces" },
  { title: "Rings", image: "https://placehold.co/300x300/ADD8E6/black?text=Rings" },
  { title: "Earrings", image: "https://placehold.co/300x300/FFD700/black?text=Earrings" },
  { title: "Bracelets", image: "https://placehold.co/300x300/C0C0C0/black?text=Bracelets" },
];

const CategoryGrid = () => {
  return (
    <div className="row g-4">
      {categories.map((cat, index) => (
        <div className="col-md-3 col-sm-6" key={index}>
          <div className="card border-0 shadow-sm h-100 rounded-lg overflow-hidden"> {/* Added rounded-lg and overflow-hidden */}
            <img
              src={cat.image}
              className="card-img-top w-full h-48 object-cover" // Added w-full, h-48, object-cover for uniform size and aspect ratio
              alt={cat.title}
            />
            <div className="card-body text-center p-4"> {/* Added padding */}
              <h5 className="fw-bold text-gray-800 text-xl">{cat.title}</h5> {/* Tailwind color and text size */}
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default CategoryGrid;