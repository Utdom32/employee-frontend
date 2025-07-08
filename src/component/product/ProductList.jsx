import React, { useState } from "react";
import PropTypes from "prop-types";
import "./Product.css"; // Assuming you have a corresponding CSS file

const sampleProduct = {
  id: "123",
  name: "Premium Wireless Headphones",
  description:
    "Experience crystal-clear sound with our premium wireless headphones. Featuring noise cancellation, 30-hour battery life, and comfortable over-ear design.",
  price: 299.99,
  discountPrice: 249.99,
  images: [
    "https://example.com/headphones1.jpg",
    "https://example.com/headphones2.jpg",
    "https://example.com/headphones3.jpg",
  ],
  rating: 4.5,
  reviewCount: 128,
  sku: "HP-X500-BLK",
  category: "Audio",
  stock: 15,
  variants: [
    { id: "1", name: "Black", stock: 10 },
    { id: "2", name: "White", stock: 5 },
    { id: "3", name: "Blue", stock: 0 },
  ],
};
const ProductList = ({ product, onAddToCart }) => {
  const [selectedImage, setSelectedImage] = useState(0);
  const [quantity, setQuantity] = useState(1);

  const handleAddToCarts = (product, quantity) => {
    console.log(`Added ${quantity} ${product.name} to cart`);
    // Add your cart logic here
  };

  const handleQuantityChange = (e) => {
    const value = parseInt(e.target.value);
    if (value > 0 && value <= 10) {
      setQuantity(value);
    }
  };

  const handleAddToCart = () => {
    onAddToCart(product, quantity);
    setQuantity(1); // Reset quantity after adding to cart
  };

  return (
    <div className="product-container">
      <div className="product-gallery">
        <div className="thumbnail-container">
          {product.images.map((image, index) => (
            <img
              key={index}
              src={image}
              alt={`${product.name} thumbnail ${index + 1}`}
              className={`thumbnail ${selectedImage === index ? "active" : ""}`}
              onClick={() => setSelectedImage(index)}
            />
          ))}
        </div>
        <div className="main-image">
          <img src={product.images[selectedImage]} alt={product.name} />
        </div>
      </div>

      <div className="product-details">
        <h1 className="product-title">{product.name}</h1>

        <div className="product-price">
          {product.discountPrice ? (
            <>
              <span className="current-price">
                ${product.discountPrice.toFixed(2)}
              </span>
              <span className="original-price">
                ${product.price.toFixed(2)}
              </span>
              <span className="discount-percentage">
                {Math.round((1 - product.discountPrice / product.price) * 100)}%
                OFF
              </span>
            </>
          ) : (
            <span className="current-price">${product.price.toFixed(2)}</span>
          )}
        </div>

        <div className="product-rating">
          {[...Array(5)].map((_, i) => (
            <span
              key={i}
              className={`star ${i < product.rating ? "filled" : ""}`}
            >
              ★
            </span>
          ))}
          <span className="review-count">({product.reviewCount} reviews)</span>
        </div>

        <div className="product-description">
          <p>{product.description}</p>
        </div>

        {product.variants && (
          <div className="product-variants">
            <h3>Variants:</h3>
            <div className="variant-options">
              {product.variants.map((variant) => (
                <button
                  key={variant.id}
                  className={`variant-button ${
                    variant.stock === 0 ? "out-of-stock" : ""
                  }`}
                  disabled={variant.stock === 0}
                >
                  {variant.name}
                </button>
              ))}
            </div>
          </div>
        )}

        <div className="product-actions">
          <div className="quantity-selector">
            <button
              onClick={() => setQuantity((prev) => Math.max(1, prev - 1))}
              disabled={quantity <= 1}
            >
              -
            </button>
            <input
              type="number"
              min="1"
              max="10"
              value={quantity}
              onChange={handleQuantityChange}
            />
            <button
              onClick={() => setQuantity((prev) => Math.min(10, prev + 1))}
              disabled={quantity >= 10}
            >
              +
            </button>
          </div>

          <button
            className="add-to-cart-button"
            onClick={handleAddToCart}
            disabled={product.stock === 0}
          >
            {product.stock === 0 ? "Out of Stock" : "Add to Cart"}
          </button>
        </div>

        <div className="product-meta">
          <div className="meta-item">
            <span className="meta-label">SKU:</span>
            <span className="meta-value">{product.sku}</span>
          </div>
          <div className="meta-item">
            <span className="meta-label">Category:</span>
            <span className="meta-value">{product.category}</span>
          </div>
          <div className="meta-item">
            <span className="meta-label">Availability:</span>
            <span className="meta-value">
              {product.stock > 0 ? `${product.stock} in stock` : "Out of stock"}
            </span>
          </div>
        </div>
        <div className="App">
          <Product product={sampleProduct} onAddToCart={handleAddToCart} />
        </div>
      </div>
    </div>
  );
};

ProductList.propTypes = {
  product: PropTypes.shape({
    id: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    description: PropTypes.string.isRequired,
    price: PropTypes.number.isRequired,
    discountPrice: PropTypes.number,
    images: PropTypes.arrayOf(PropTypes.string).isRequired,
    rating: PropTypes.number,
    reviewCount: PropTypes.number,
    sku: PropTypes.string,
    category: PropTypes.string,
    stock: PropTypes.number,
    variants: PropTypes.arrayOf(
      PropTypes.shape({
        id: PropTypes.string.isRequired,
        name: PropTypes.string.isRequired,
        stock: PropTypes.number.isRequired,
      })
    ),
  }).isRequired,
  onAddToCart: PropTypes.func.isRequired,
};

export default ProductList;
