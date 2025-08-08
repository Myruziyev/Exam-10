import React, { useState, useEffect } from "react";
import Header from "../Components/Header";
// Make sure the global styles and keyframes are loaded, or import them here if needed.

function About() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchProducts = async () => {
      const apiUrl = "https://api.escuelajs.co/api/v1/products";

      try {
        const response = await fetch(apiUrl);

        if (!response.ok) {
          throw new Error(
            `Failed to fetch products. Status: ${response.status}`
          );
        }

        const data = await response.json();
        setProducts(data);
      } catch (err) {
        console.error("Error fetching products:", err);
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  // Get unique categories
  const categories = [
    ...new Set(
      products.map((product) => product.category?.name).filter(Boolean)
    ),
  ];

  // Get a few sample products (e.g., the first 3)
  const sampleProducts = products.slice(0, 3);

  if (loading) {
    return (
      <>
        <Header />
        <main className="about-page">
          <div className="about-container">
            {/* New Styled Loading Section */}
            <div className="loading-container">
              <div className="loading-spinner"></div>
              <p className="loading-text">
                Loading our awesome products for you...
              </p>
            </div>
          </div>
        </main>

        {/* Internal styles for the new loading spinner */}
      </>
    );
  }

  if (error) {
    return (
      <>
        <Header />
        <main className="about-page">
          <div className="about-container">
            <section className="about-hero">
              <h1>About Our Store</h1>
              <p>Error loading information</p>
            </section>
            <section className="about-content">
              <div className="about-section">
                <p className="error">Failed to load products: {error}</p>
              </div>
            </section>
          </div>
        </main>
        {/* Include the rest of the styles here too if not using global styles */}
        <style jsx>{/* ... (rest of the styles from above) ... */}</style>
      </>
    );
  }

  return (
    <>
      <Header />
      <main className="about-page">
        <div className="about-container">
          <section className="about-hero">
            <h1>About Our Store</h1>
            <p>Discover a wide range of quality products tailored for you.</p>
          </section>

          <section className="about-content">
            <div className="about-section">
              <h2>Our Collection</h2>
              <p>
                Our store offers a diverse and curated selection of products
                across various categories. We source items designed to meet
                different needs and styles, ensuring quality and variety for our
                customers.
              </p>
            </div>

            <div className="about-section">
              <h2>Product Categories</h2>
              <p>
                Explore our wide range of products organized into convenient
                categories:
              </p>
              <ul>
                {categories.map((category, index) => (
                  <li key={index}>{category}</li>
                ))}
              </ul>
            </div>

            <div className="about-section">
              <h2>Featured Products</h2>
              <p>Here are some highlights from our collection:</p>
              <div className="featured-products-grid">
                {sampleProducts.map((product) => {
                  const imageUrl =
                    product.images?.[0] ||
                    "https://via.placeholder.com/150?text=No+Image";
                  const categoryName =
                    product.category?.name || "Uncategorized";
                  return (
                    <div key={product.id} className="product-card">
                      <img
                        src={imageUrl}
                        alt={product.title}
                        className="featured-product-image"
                        onError={(e) => {
                          e.target.onerror = null;
                          e.target.src =
                            "https://via.placeholder.com/150?text=Image+Error";
                        }}
                      />
                      <h3 className="featured-product-title">
                        {product.title}
                      </h3>
                      <p className="featured-product-price">${product.price}</p>
                      <p className="featured-product-category">
                        {categoryName}
                      </p>
                    </div>
                  );
                })}
              </div>
            </div>

            <div className="about-section">
              <h2>Why Shop With Us?</h2>
              <ul>
                <li>Curated selection of quality products</li>
                <li>Competitive pricing</li>
                <li>Secure online shopping</li>
                <li>Dedicated customer support</li>
                <li>Fast and reliable shipping options</li>
              </ul>
            </div>

            <div className="about-section">
              <h2>Contact Us</h2>
              <div className="contact-info">
                <p>
                  <strong>For general inquiries:</strong> contact@ourstore.com
                </p>
                <p>
                  <strong>Customer Support:</strong> support@ourstore.com
                </p>
              </div>
            </div>
          </section>
        </div>
      </main>
      {/* Include the rest of the styles here too if not using global styles */}
      <style jsx>{/* ... (rest of the styles from above) ... */}</style>
    </>
  );
}

export default About;
