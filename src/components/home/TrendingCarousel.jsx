import React from "react";
import product1 from "../../assets/trending1.jpg";
import product2 from "../../assets/trending2.jpg";
import product3 from "../../assets/trending3.jpg";

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
                src={product1}
                className="d-block w-100 object-fit-cover"
                alt="Trending 1"
                style={{ height: "400px", objectFit: "cover" }}
              />
              <div className="carousel-caption d-none d-md-block bg-dark bg-opacity-50 rounded p-2">
                <h5 className="text-warning">Elegant Gold Necklace</h5>
                <p>Pure craftsmanship with 22K brilliance.</p>
              </div>
            </div>

            {/* Slide 2 */}
            <div className="carousel-item">
              <img
                src={product2}
                className="d-block w-100"
                alt="Trending 2"
                style={{ height: "400px", objectFit: "cover" }}
              />
              <div className="carousel-caption d-none d-md-block bg-dark bg-opacity-50 rounded p-2">
                <h5 className="text-warning">Diamond Ring</h5>
                <p>Shine bright with our bestseller diamond rings.</p>
              </div>
            </div>

            {/* Slide 3 */}
            <div className="carousel-item">
              <img
                src={product3}
                className="d-block w-100"
                alt="Trending 3"
                style={{ height: "400px", objectFit: "cover" }}
              />
              <div className="carousel-caption d-none d-md-block bg-dark bg-opacity-50 rounded p-2">
                <h5 className="text-warning">Traditional Jhumkas</h5>
                <p>Classic design with a modern twist.</p>
              </div>
            </div>

          </div>

          {/* Carousel Controls */}
          <button
            className="carousel-control-prev"
            type="button"
            data-bs-target="#trendingCarousel"
            data-bs-slide="prev"
          >
            <span className="carousel-control-prev-icon" />
          </button>
          <button
            className="carousel-control-next"
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
