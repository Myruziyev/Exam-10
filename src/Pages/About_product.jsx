// src/Pages/AboutProduct.js
import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import Header from "../Components/Header";
import "../App.css"; // Ensure global styles like spinner are available

function AboutProduct() {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    if (!id) {
      setError("Product ID not found in URL.");
      setLoading(false);
      return;
    }

    // Corrected the URL (removed extra space)
    fetch(`https://api.escuelajs.co/api/v1/products/${id}`)
      .then((res) => {
        if (!res.ok) {
          if (res.status === 404) {
            throw new Error("Product not found.");
          } else {
            throw new Error(`Failed to fetch product. Status: ${res.status}`);
          }
        }
        return res.json();
      })
      .then((data) => {
        setProduct(data);
        setLoading(false);
      })
      .catch((err) => {
        setError(err.message);
        setLoading(false);
      });
  }, [id]);

  // Loading state
  if (loading) {
    return (
      <>
        <Header />
        <main className="products-page">
          <div className="loading-container">
            <div className="loading-spinner"></div>
            <p className="loading-text">Loading product details...</p>
          </div>
        </main>
      </>
    );
  }

  // Error state
  if (error) {
    return (
      <>
        <Header />
        <main className="products-page">
          <div className="error-container">
            <p className="error">Error: {error}</p>
            <Link to="/" className="back-link">
              Go Back Home
            </Link>
          </div>
        </main>
      </>
    );
  }

  // Render product details if loaded successfully
  return (
    <>
      <Header />
      <main className="products-page">
        {" "}
        {/* Reuse class or create specific one */}
        {product && (
          <div className="product-detail-container">
            {/* Images Section */}
            <div className="product-detail-images">
              {/* For simplicity, showing the first image prominently */}
              {/* You could expand this to show thumbnails for other images */}
              <img
                className="product-detail-image"
                src={
                  product.images[0] ||
                  "https://via.placeholder.com/600x400?text=No+Image"
                }
                alt={product.title}
                onError={(e) => {
                  e.target.onerror = null;
                  e.target.src =
                    "https://via.placeholder.com/600x400?text=Image+Error";
                }}
              />
              {/* Optional: Display other images if they exist */}
              {/* {product.images.slice(1).map((img, index) => (
                <img
                  key={index}
                  className="product-detail-image"
                  src={img}
                  alt={`${product.title} ${index + 2}`}
                  onError={(e) => { e.target.src = 'https://via.placeholder.com/150?text=Img+Error'; }}
                />
              ))} */}
            </div>

            {/* Info Section */}
            <div className="product-detail-info">
              <h1 className="product-detail-title">{product.title}</h1>
              <p className="product-detail-price">${product.price}</p>
              <p className="product-detail-description">
                {product.description}
              </p>
              <p className="product-detail-category">
                Category: {product.category?.name || "N/A"}
              </p>
              <button className="product-detail-add-to-cart">
                Add to Cart
              </button>
            </div>
          </div>
        )}
      </main>

      {/* Updated Styles */}
      <style>{`
        .product-detail-container {
          display: flex;
          flex-direction: column;
          background-color: #fff;
          border-radius: 12px;
          box-shadow: 0 6px 18px rgba(0, 0, 0, 0.06);
          padding: 30px;
          margin-top: 20px;
        }

        .product-detail-images {
           margin-bottom: 30px;
        }

        .product-detail-image {
          width: 100%;
          max-width: 600px;
          height: auto;
          max-height: 500px;
          object-fit: contain;
          border-radius: 8px;
          margin-bottom: 15px;
          border: 1px solid #eee;
        }

        .product-detail-info {
        }

        .product-detail-title {
          font-size: 2rem;
          font-weight: bold;
          color: #333;
          margin-bottom: 15px;
        }

        .product-detail-price {
          font-size: 1.8rem;
          color: #01aee7;
          font-weight: bold;
          margin-bottom: 20px;
        }

        .product-detail-description {
          font-size: 1.1rem;
          color: #555;
          line-height: 1.6;
          margin-bottom: 20px;
        }

        .product-detail-category {
            font-size: 1rem;
            color: #777;
            background-color: #f0f8ff;
            padding: 5px 10px;
            border-radius: 5px;
            display: inline-block;
            margin-bottom: 20px;
        }

        .product-detail-add-to-cart {
            padding: 12px 24px;
            font-size: 1.1rem;
            font-weight: 600;
            background: #01aee7;
            color: white;
            border: none;
            border-radius: 10px;
            cursor: pointer;
            transition: background 0.3s ease;
        }

        .product-detail-add-to-cart:hover {
            background: #018cbf;
        }

        /* Responsive Layout */
        @media (min-width: 769px) {
          .product-detail-container {
            flex-direction: row;
            gap: 40px;
          }
          .product-detail-images {
            flex: 1;
            margin-bottom: 0;
          }
          .product-detail-info {
            flex: 1;
          }
          .product-detail-image {
            max-width: 100%;
          }
        }

        /* Reuse or adapt existing styles for consistency */
        .error {
            color: #e74c3c;
            text-align: center;
            font-weight: bold;
            margin-top: 20px;
        }
        .error-container {
             text-align: center;
             padding: 60px 20px;
        }
        .back-link {
             color: #01aee7;
             text-decoration: none;
             font-weight: 500;
             display: inline-block;
             margin-top: 15px;
        }
        .back-link:hover {
             text-decoration: underline;
        }
        .back-button {
          display: inline-block;
          padding: 10px 20px;
          background-color: #777; /* Different color for Back button */
          color: white;
          text-decoration: none;
          border-radius: 4px;
          font-weight: 500;
          transition: background-color 0.3s ease;
        }
        .back-button:hover {
          background-color: #555;
        }
        /* Assuming .loading-container, .loading-spinner, .loading-text are in App.css */
      `}</style>
    </>
  );
}

export default AboutProduct;
