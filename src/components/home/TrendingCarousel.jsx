
import mangalsutra2 from '../../assets/Mangalsutra/mangalsutra2.jpg';
import mangalsutra3 from '../../assets/Mangalsutra/mangalsutra5.jpg';
import mangalsutra from '../../assets/Mangalsutra/mangalsutra4.jpg'
import '../home/TrendingCarousel.css'; // Import custom styles

const TrendingCarousel = () => {
  return (
    <section className="py-5 bg-light">
      <div className="container">
        <h2 className="text-center fw-bold mb-4 text-warning">Trending Jewelry</h2>

        <div id="trendingCarousel" className="carousel slide" data-bs-ride="carousel">
          <div className="carousel-inner rounded-4 shadow overflow-hidden">

            {/* Slide 1 */}
            <div className="carousel-item active">
              <img
                src={mangalsutra2}
                className="d-block w-100"
                alt="Trending 1"
                style={{ height: "400px", objectFit: "contain", objectPosition: "center" }}
              />
              <div className="carousel-caption custom-caption bg-dark bg-opacity-50 rounded p-2">
                <h5 className="text-warning">Circular Floral Pattern Mangalsutra</h5>
                <p>Pure craftsmanship with 22K brilliance.</p>
              </div>
            </div>

            {/* Slide 2 */}
            <div className="carousel-item">
              <img
                src={mangalsutra3}
                className="d-block w-100"
                alt="Trending 2"
                style={{ height: "400px", objectFit: "contain", objectPosition: "center" }}
              />
              <div className="carousel-caption custom-caption bg-dark bg-opacity-50 rounded p-2">
                <h5 className="text-warning">Peacock Aura Mangalsutra Set</h5>
                <p>Shine bright with our bestseller mangalsutras</p>
              </div>
            </div>

            {/* Slide 3 */}
            <div className="carousel-item">
              <img
                src={mangalsutra}
                className="d-block w-100"
                alt="Trending 3"
                style={{ height: "400px", objectFit: "contain", objectPosition: "center" }}
              />
              <div className="carousel-caption custom-caption bg-dark bg-opacity-50 rounded p-2">
                <h5 className="text-warning">Twilight Bloom Mangalsutra Set</h5>
                <p>Classic design with a modern twist.</p>
              </div>
            </div>

          </div>

          {/* Carousel Controls */}
          <button
            className="carousel-control-prev custom-control"
            type="button"
            data-bs-target="#trendingCarousel"
            data-bs-slide="prev"
          >
            <span className="carousel-control-prev-icon" />
          </button>
          <button
            className="carousel-control-next custom-control"
            type="button"
            data-bs-target="#trendingCarousel"
            data-bs-slide="next"
          >
            <span className="carousel-control-next-icon" />
          </button>
        </div>
      </div>
    </section>
  );
};

export default TrendingCarousel;
