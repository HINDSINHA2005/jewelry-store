import mangalsutra2 from '../../assets/Mangalsutra/mangalsutra2.jpg';
import mangalsutra3 from '../../assets/Mangalsutra/mangalsutra5.jpg';
import necklace from '../../assets/Necklace/necklace1.jpg';
import Pendant from '../../assets/Pendants/pd1.jpg';


const products = [
  {
    id: 1,
    name: "Circular Floral Pattern Mangalsutra Set",
    price: "₹499",
    image: mangalsutra2,
  },
  {
    id: 2,
    name: "Peacock Aura Mangalsutra Set",
    price: "₹699",
    image: mangalsutra3,
  },
  {
    id: 3,
    name: "Blush Blossom Set",
    price: "₹1700",
    image: necklace,
  },
  {
    id: 4,
    name: "Ocean Heart Set",
    price: "₹1200",
    image: Pendant,
  },
];

const FeaturedProducts = () => {
  return (
    <section className="py-5 bg-light">
      <div className="container">
        <h2 className="text-center mb-4 text-warning fw-bold">Featured Products</h2>
        <div className="row">
          {products.map((product) => (
            <div className="col-sm-6 col-md-4 col-lg-3 mb-4" key={product.id}>
              <div className="card h-100 shadow-sm border-0">
                <img
                  src={product.image}
                  className="card-img-top" // You can keep Bootstrap's class if it provides default styling you like
                  alt={product.name}
                  style={{
                    height: '200px',    // Set a fixed height
                    objectFit: 'cover', // Ensures the image covers the area, cropping if necessary
                    width: '100%',      // Ensures the image takes the full width of its container
                  }}
                />
                <div className="card-body d-flex flex-column">
                  <h5 className="card-title fw-semibold">{product.name}</h5>
                  <p className="card-text text-muted mb-2">{product.price}</p>
                  <button className="btn btn-warning mt-auto fw-semibold text-white">
                    Add to Cart
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeaturedProducts;