import React, { useState, useEffect } from "react";
import "./Cart.css";

const Cart = () => {
  const [cartItems, setCartItems] = useState([]);
  // const [orderPlaced, setOrderPlaced] = useState(false);
  const [orderPlaced] = useState(false);

  const fetchCartItems = async () => {
    try {
      const response = await fetch("http://127.0.0.1:5000/api/cart/", {
        method: "GET",
        headers: {
          JWTCookie: localStorage.getItem("jwt"),
        },
      });

      if (response.ok) {
        const result = await response.json();
        if (result.status === "success") {
          setCartItems(result.data.cart.products);
        } else {
          console.error("Failed to fetch cart items");
        }
      } else {
        console.error("Failed to fetch cart items");
      }
    } catch (error) {
      console.error("Error fetching cart items:", error);
    }
  };

  useEffect(() => {
    fetchCartItems();
  }, []);

  const handleCheckout = async () => {
    try {
      const response = await fetch("http://127.0.0.1:5000/api/payment/pay", {
        method: "GET",
        headers: {
          JWTCookie: localStorage.getItem("jwt"),
        },
      });

      if (response.ok) {
        const result = await response.json();
        if (result.responseCode === 200) {
          localStorage.setItem("pay-loader", "true");
          window.location.href = result.url;
        } else {
          console.error("Payment initiation failed");
        }
      } else {
        console.error("Payment initiation failed");
      }
    } catch (error) {
      console.error("Error initiating payment:", error);
    }
  };

  const getTotalAmount = () => {
    return cartItems.reduce(
      (total, item) => total + item.product.price * item.quantity,
      0
    );
  };

  const updateCart = async (url, method, body) => {
    try {
      const response = await fetch(url, {
        method: method,
        headers: {
          "Content-Type": "application/json",
          JWTCookie: localStorage.getItem("jwt"),
        },
        body: JSON.stringify(body),
      });

      if (response.ok) {
        const result = await response.json();
        if (result.status === "success") {
          fetchCartItems();
        } else {
          console.error("Failed to update cart");
        }
      } else {
        console.error("Failed to update cart");
      }
    } catch (error) {
      console.error("Error updating cart:", error);
    }
  };

  const increaseQuantity = (productId) => {
    updateCart("http://127.0.0.1:5000/api/cart/increase", "PATCH", {
      productId,
    });
  };

  const decreaseQuantity = (productId) => {
    updateCart("http://127.0.0.1:5000/api/cart/decrease", "PATCH", {
      productId,
    });
  };

  const removeFromCart = (productId) => {
    updateCart("http://127.0.0.1:5000/api/cart/delete", "DELETE", {
      productId,
    });
  };

  return (
    <div className="cart">
      <h1 className="cart-title">Your Cart</h1>
      {cartItems.length === 0 ? (
        <p className="empty-cart-message">Your cart is empty</p>
      ) : (
        <>
          <div className="cart-items">
            {cartItems.map((item) => (
              <div key={item.product._id} className="cart-item">
                <img
                  src={
                    `http://127.0.0.1:5000/assets/images/${item.product.images}` ||
                    "default-image.png"
                  }
                  alt={item.product.name}
                  className="cart-item-image"
                />
                <div className="item-details">
                  <h2 className="item-name">{item.product.name}</h2>
                  <p className="item-price">&#8377;{item.product.price}</p>
                  <div className="quantity-controls">
                    <button
                      className="quantity-button"
                      onClick={() => decreaseQuantity(item.product._id)}>
                      -
                    </button>
                    <span className="item-quantity">{item.quantity}</span>
                    <button
                      className="quantity-button"
                      onClick={() => increaseQuantity(item.product._id)}>
                      +
                    </button>
                  </div>
                  <button
                    className="remove-button"
                    onClick={() => removeFromCart(item.product._id)}>
                    Remove
                  </button>
                </div>
              </div>
            ))}
          </div>
          <div className="cart-total">
            <h2 className="total-amount">
              Total Amount: &#8377;{getTotalAmount()}
            </h2>
          </div>
          <div className="checkout">
            <button className="checkout-button" onClick={handleCheckout}>
              Proceed to Checkout
            </button>
          </div>
          {orderPlaced && (
            <div className="order-success">
              <p className="order-success-message">
                Order successfully placed!
              </p>
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default Cart;
