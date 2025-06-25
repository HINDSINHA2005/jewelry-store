

const Newsletter = () => {
  return (
    <section className="py-5 bg-warning bg-gradient text-white">
      <div className="container text-center">
        <h2 className="fw-bold mb-3">Join Our Newsletter</h2>
        <p className="mb-4">
          Subscribe to get updates on new arrivals, offers, and other news.
        </p>
        <form className="row justify-content-center">
          <div className="col-md-6 mb-2">
            <input
              type="email"
              className="form-control form-control-lg"
              placeholder="Enter your email"
              required
            />
          </div>
          <div className="col-auto">
            <button className="btn btn-light btn-lg fw-semibold px-4" type="submit">
              Subscribe
            </button>
          </div>
        </form>
      </div>
    </section>
  );
};

export default Newsletter;
