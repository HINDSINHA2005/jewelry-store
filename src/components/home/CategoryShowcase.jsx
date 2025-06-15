import { Link } from "react-router-dom";
import ring from '../../assets/ring.jpg'
import earring from '../../assets/earring.webp'
import necklace from '../../assets/necklace.webp'
import bracelets from '../../assets/bracelet.webp'

const categories = [
  {
    name: "Rings",
    image: ring,
    slug: "rings",
  },
  {
    name: "Necklaces",
    image: necklace,
    slug: "necklaces",
  },
  {
    name: "Earrings",
    image: earring,
    slug: "earrings",
  },
  {
    name: "Bracelets",
    image: bracelets,
    slug: "bracelets",
  },
];

const CategoryShowcase = () => {
  return (
    <section className="py-5 bg-light">
      <div className="container">
        <h2 className="text-center mb-5 fw-bold text-warning">Shop by Category</h2>
        <div className="row g-4">
          {categories.map((category, index) => (
            <div className="col-12 col-sm-6 col-md-3" key={index}>
              <Link to={`/shop?category=${category.slug}`} className="text-decoration-none">
                <div className="card border-0 shadow-sm h-100 hover-zoom">
                  <img
                    src={category.image}
                    alt={category.name}
                    className="card-img-top"
                    style={{ height: "200px", objectFit: "cover" }}
                  />
                  <div className="card-body text-center">
                    <h5 className="card-title text-dark fw-semibold">{category.name}</h5>
                  </div>
                </div>
              </Link>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default CategoryShowcase;
