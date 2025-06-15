import ring from '../../assets/ring.jpg'
import bracelet from '../../assets/bracelet.webp'
import earring from '../../assets/earring.webp'
import necklace from '../../assets/necklace.webp'

const products = [
  {
    id: 1,
    name: "Elegant Gold Necklace",
    price: "₹12,999",
    image: necklace,
  },
  {
    id: 2,
    name: "Silver Stud Earrings",
    price: "₹1,899",
    image: earring,
  },
  {
    id: 3,
    name: "Diamond Ring",
    price: "₹24,999",
    image: ring,
  },
  {
    id: 4,
    name: "Ruby Bracelet",
    price: "₹5,499",
    image: bracelet,
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