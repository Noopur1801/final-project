import React, { useState, useEffect } from "react";
import "./Collections.css";
import "@fortawesome/fontawesome-free/css/all.min.css";
import StarRating from "./StarRating";

const ProductDetailModal = ({ product, onClose }) => {
  if (!product) return null;

  return (
    <div className="modal" onClick={onClose}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <span style={{ color: "#fff" }} className="close" onClick={onClose}>
          &times;
        </span>
        <img
          src={`http://127.0.0.1:5000/assets/images/${product.image}`}
          alt={product.name}
          className="modal-image"
        />
        <h2 style={{ color: "#fff" }}>{product.name}</h2>
        <p>Price: &#8377;{product.price}</p>
        <p>Description: Detailed description of {product.name}</p>
      </div>
    </div>
  );
};

const Collections = () => {
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("Women");
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [showMessage, setShowMessage] = useState(false);
  const [ratings, setRatings] = useState({});

  useEffect(() => {
    const fetchData = async () => {
      const baseUrl = "http://127.0.0.1:5000/api/shoes/collections/";
      const categoryNames = ["men", "women", "kids"];

      const allCollections = await Promise.all(
        categoryNames.map(async (categoryName) => {
          const response = await fetch(`${baseUrl}${categoryName}`);
          const data = await response.json();

          return {
            name: categoryName.charAt(0).toUpperCase() + categoryName.slice(1),
            collections: [
              {
                name: "Shoes",
                description: `Various shoes for ${categoryName}.`,
                products: data.allShoes.map((shoe) => ({
                  id: shoe._id,
                  name: shoe.name,
                  image: shoe.images,
                  price: shoe.price,
                  ratings: shoe.ratings,
                })),
              },
            ],
          };
        })
      );

      setCategories(allCollections);

      const womenCategory = allCollections.find(
        (category) => category.name === "Women"
      );
      setSelectedCategory(womenCategory?.name || "Women");
    };

    fetchData();
  }, []);

  const handleCategoryChange = (e) => {
    const categoryName = e.target.value;
    setSelectedCategory(categoryName);
  };

  const handleAddToCart = async (product) => {
    try {
      const response = await fetch("http://127.0.0.1:5000/api/cart/add", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          JWTCookie: localStorage.getItem("jwt"),
        },
        body: JSON.stringify({
          productId: product.id,
          quantity: 1,
        }),
      });

      if (response.ok) {
        setShowMessage("Item added to cart!");
        setTimeout(() => {
          setShowMessage(false);
        }, 2000);
      } else {
        setShowMessage("Failed to add item to cart.");
      }
    } catch (error) {
      console.error("Error adding item to cart:", error);
      setShowMessage("An error occurred.");
    }
  };

  const handleRatingChange = (productId, rating) => {
    setRatings((prevRatings) => ({
      ...prevRatings,
      [productId]: rating,
    }));
  };

  return (
    <div className="collections-container">
      <div className="background-image"></div>
      <div style={{ padding: "20px" }} className="collections">
        <h1>Collections</h1>
        <div className="dropdown">
          <label htmlFor="category">Select Category:</label>
          <select
            id="category"
            value={selectedCategory}
            onChange={handleCategoryChange}>
            <option value="">Select a category</option>
            {categories.map((category) => (
              <option key={category.name} value={category.name}>
                {category.name}
              </option>
            ))}
          </select>
        </div>

        {selectedCategory && (
          <>
            {categories
              .filter((category) => category.name === selectedCategory)
              .map((category) => (
                <div key={category.name} className="category">
                  {category.collections.map((collection) => (
                    <div key={collection.name} className="collection">
                      <h2>{collection.name}</h2>
                      <p>{collection.description}</p>
                      <div className="products">
                        {collection.products.map((product) => (
                          <div key={product.id} className="product">
                            <img
                              style={{
                                width: "100%",
                                objectFit: "contain",
                                aspectRatio: "16/9",
                              }}
                              // src={"shoes2.png"}
                              src={`http://127.0.0.1:5000/assets/images/${product.image}`}
                              alt={product.name}
                              onClick={() => setSelectedProduct(product)}
                            />
                            <h3>{product.name}</h3>
                            <p>Price : &#8377;{product.price}</p>
                            <StarRating
                              rating={
                                ratings[product.ratings] ||
                                Math.floor(product.ratings)
                              }
                              onRatingChange={(rating) =>
                                handleRatingChange(product.id, rating)
                              }
                            />
                            <button
                              className="add-to-cart"
                              onClick={() => handleAddToCart(product)}>
                              Add to Cart
                            </button>
                          </div>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              ))}
          </>
        )}

        <ProductDetailModal
          product={selectedProduct}
          onClose={() => setSelectedProduct(null)}
        />

        {showMessage && <div className="message">{showMessage}</div>}
      </div>
    </div>
  );
};

export default Collections;
