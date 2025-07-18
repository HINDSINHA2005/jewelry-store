import { Link } from "react-router-dom";

import necklace from '../../assets/Necklace/Necklace1.jpg'
import bracelets from '../../assets/Bracelets/bracelet1.jpg'
import mangalsutra from '../../assets/Mangalsutra/mangalsutra1.jpg';
import pendant from '../../assets/Pendants/pd1.jpg';
import RAKHI1 from '../../assets/Rakhi/RAKHI26.jpg';
import BANGLE7 from '../../assets/Bangles/BANGLE7.jpg';
import KADHA8 from '../../assets/Kadha/KADHA8.jpg';
import bracelet2 from '../../assets/Rajvadi Bracelet/bracelet2.jpg';
import oxidised1 from '../../assets/Oxidised Necklaces/oxidised1.jpg';
import mod1 from '../../assets/Modern Mangalsutra/1.jpg';
import ear1 from '../../assets/earrings/e1.jpg';
import sp1 from '../../assets/Special Collection/sp1.jpg'
const categories = [
  {
    name: "Mangalsutra",
    image: mangalsutra,
    slug: "Mangalsutra",
  },
  {
    name: "Necklaces",
    image: necklace,
    slug: "Necklaces",
  },
  {
    name: "Pendants",
    image: pendant,
    slug: "Pendants",
  },
  {
    name:"Bangles",
    image:BANGLE7,
    slug:"Bangles",
  },
  {
    name: "Bracelets",
    image: bracelets,
    slug: "Bracelets",
  },
  {
    name: "KADA",
    image: KADHA8,
    slug: "Kada",
  },
  {
    name:"Rakhi",
    image:RAKHI1,
    slug:"Rakhi",
  },
  {
    name:"Rajvadhi Bracelet",
    image:bracelet2,
    slug:"Rajvadhi Bracelet",
  },
  {
    name:"Oxidised Necklaces",
    image:oxidised1,
    slug:"Oxidised Necklaces",
  },
  {
    name:"Modern Mangalsutra ",
    image:mod1,
    slug:"Modern Mangalsutra "

  },
  {
    name:"Special Collection ",
    image:sp1,
    slug:"Special Collection "

  },
  {
    name:"Earrings ",
    image:ear1,
    slug:"Earrings "

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
                    <h6 className="card-title text-warning fw-semibold">Click to see products </h6>
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