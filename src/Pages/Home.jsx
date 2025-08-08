// src/Pages/Home.js
import { useEffect, useState } from "react";
import { Link } from "react-router-dom"; // Import Link for navigation
import Header from "../Components/Header";
import "../App.css";

function Home() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    // Corrected the URL (removed extra space)
    fetch("https://api.escuelajs.co/api/v1/products")
      .then((res) => {
        if (!res.ok) throw new Error("Failed to fetch products.");
        return res.json();
      })
      .then((data) => {
        setProducts(data.slice(0, 12)); // Limit to 12 products
        setLoading(false);
      })
      .catch((err) => {
        setError(err.message);
        setLoading(false);
      });
  }, []);

  // Loading state with spinner
  if (loading) {
    return (
      <>
        <Header />
        <main className="products-page">
          <div className="loading-container">
            <div className="loading-spinner"></div>
            <p className="loading-text">Loading our awesome products for you...</p>
          </div>
        </main>
        {/* Internal styles for the loading spinner - Remove if defined globally */}
        <style>{`
          .loading-container {
            display: flex;
            flex-direction: column;
            align-items: center;
            justify-content: center;
            padding: 60px 20px;
          }

          .loading-spinner {
            width: 50px;
            height: 50px;
            border: 5px solid rgba(1, 174, 231, 0.2); /* Light transparent primary color */
            border-top: 5px solid #01aee7; /* Solid primary color */
            border-radius: 50%;
            /* Combined spin and pulse animations */
            animation: spin 1s linear infinite, pulse 1.5s ease-in-out infinite;
            margin-bottom: 20px;
          }

          .loading-text {
            font-size: 1.2rem;
            /* Unified text color using primary color */
            color: #01aee7;
            font-weight: 500;
          }

          /* Enhanced spin animation */
          @keyframes spin {
            0% { transform: rotate(0deg); }
            100% { transform: rotate(360deg); }
          }

          /* Added pulse animation for subtle scaling effect */
          @keyframes pulse {
            0%, 100% { transform: scale(1) rotate(0deg); }
            50% { transform: scale(1.1) rotate(180deg); }
          }
        `}</style>
      </>
    );
  }

  if (error) return <div className="error">Error: {error}</div>; // Added error class

  return (
    <>
      <Header />
      <main className="products-page"> {/* Use main tag for semantic structure */}
        <div className="product-grid">
          {products.map((product) => (
            <div className="product-card" key={product.id}>
              {/* Wrap the entire card content in a Link */}
              <Link to={`/product/${product.id}`} className="product-link">
                <img
                  src={product.images[0]}
                  alt={product.title}
                  onError={(e) => {
                    e.target.onerror = null;
                    e.target.src = "https://via.placeholder.com/150?text=Image+Error";
                  }}
                />
                <h3>{product.title}</h3>
                <p>${product.price}</p>
                {/* Optional: Display Category */}
                {/* <p>Category: {product.category?.name || 'N/A'}</p> */}
              </Link>
            </div>
          ))}
        </div>
      </main>
      {/* Styles for the product grid and cards */}
      <style>{`
        .products-page {
          padding: 20px;
          max-width: 1400px; /* Adjust max width as needed */
          margin: 0 auto;
        }
        .product-grid {
          display: grid;
          grid-template-columns: repeat(auto-fill, minmax(250px, 1fr)); /* Responsive grid */
          gap: 25px; /* Space between cards */
        }
        .product-card {
          background-color: #fff;
          border-radius: 10px;
          box-shadow: 0 4px 12px rgba(0, 0, 0, 0.05);
          overflow: hidden;
          transition: transform 0.3s ease, box-shadow 0.3s ease;
          text-align: center; /* Center content inside card */
        }
        .product-card:hover {
            transform: translateY(-5px);
            box-shadow: 0 6px 16px rgba(0, 0, 0, 0.1);
        }
        .product-link {
            text-decoration: none;
            color: inherit; /* Inherit text color */
            display: block; /* Make the link fill the card */
            padding: 15px;
        }
        .product-card img {
          width: 100%;
          height: 200px; /* Set a fixed height for images */
          object-fit: cover; /* Cover the area, potentially cropping */
          border-bottom: 1px solid #eee;
        }
        .product-card h3 {
          font-size: 1.2rem;
          margin: 15px 0 10px 0;
          color: #333;
        }
        .product-card p {
          font-size: 1.1rem;
          font-weight: bold;
          color: #01aee7;
          margin-bottom: 10px;
        }
        .error {
            color: #e74c3c;
            text-align: center;
            font-weight: bold;
            margin-top: 20px;
            padding: 20px;
        }
        /* Ensure loading styles are available if not global */
        .loading-container, .loading-spinner, .loading-text {
            /* Styles assumed to be defined in the loading block or globally */
        }
        @keyframes spin, @keyframes pulse {
            /* Keyframes assumed to be defined in the loading block or globally */
        }
      `}</style>
    </>
  );
}

export default Home;