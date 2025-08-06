import Header from "../Components/Header";
import "../App.css";

function About() {
  return (
    <>
      <Header />
      <main className="about-page">
        <div className="about-container">
          <section className="about-hero">
            <h1>About X Store</h1>
            <p>Your trusted partner for quality products and exceptional service</p>
          </section>

          <section className="about-content">
            <div className="about-section">
              <h2>Our Story</h2>
              <p>
                Founded with a passion for excellence, X Store has been serving our community 
                with high-quality products and outstanding customer service. What started as 
                a small venture has grown into a trusted name that customers rely on for 
                their everyday needs.
              </p>
            </div>

            <div className="about-section">
              <h2>Our Mission</h2>
              <p>
                We are committed to providing our customers with the best shopping experience 
                possible. Our mission is to offer quality products at competitive prices 
                while maintaining the highest standards of customer service and satisfaction.
              </p>
            </div>

            <div className="about-section">
              <h2>Why Choose Us?</h2>
              <ul>
                <li>.quality products from trusted brands</li>
                <li>Competitive pricing and regular promotions</li>
                <li>Fast and reliable delivery</li>
                <li>Exceptional customer service</li>
                <li>Easy returns and exchanges</li>
              </ul>
            </div>

            <div className="about-section">
              <h2>Contact Us</h2>
              <div className="contact-info">
                <p><strong>Phone:</strong> (123) 456-7890</p>
                <p><strong>Email:</strong> info@xstore.com</p>
                <p><strong>Address:</strong> 123 Main Street, City, State 12345</p>
              </div>
            </div>
          </section>
        </div>
      </main>
    </>
  );
}

export default About;