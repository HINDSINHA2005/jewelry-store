import React from 'react';
import Necklace1 from '../../assets/Necklace/Necklace1.jpg'
import mangalsutra from '../../assets/Mangalsutra/mangalsutra1.jpg'
import pendant from '../../assets/Pendants/pd1.jpg'
import bracelet from '../../assets/Bracelets/bracelet1.jpg'
// Using placeholder images for demonstration purposes to ensure consistent sizing.
// In a real application, you would manage your image assets consistently.
const categories = [
  { title: "Necklaces", image:Necklace1  },
  { title: "Mangalsutras", image: mangalsutra },
  { title: "Pendants", image:pendant },
  { title: "Bracelets", image: bracelet },
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