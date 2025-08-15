import React, { useEffect, useState } from "react";
import { Container, Card, Row, Col } from "react-bootstrap";
import "./OrderInfo.css";
import axios from "axios";

const OrderInfo = () => {
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    const payLoader = localStorage.getItem("pay-loader");
    if (payLoader === "true") {
      localStorage.setItem("pay-loader", "false");
      window.location.reload();
    } else {
      const fetchOrders = async () => {
        try {
          const token = localStorage.getItem("jwt");
          const response = await axios.get("/api/order", {
            headers: {
              "Content-Type": "application/json",
              JWTCookie: token,
            },
          });
          setOrders(response.data.data.orders);
        } catch (error) {
          console.error("Error fetching orders:", error);
        }
      };

      fetchOrders();
    }
  }, []);

  return (
    <Container>
      <div className="order-info">
        <h2>Order Information</h2>
        <Row>
          {orders
            .sort((a, b) => new Date(b.orderDate) - new Date(a.orderDate))
            .map((order) =>
              order.items.map((item) => (
                <Col
                  style={{
                    width: "300px",
                    marginLeft: "auto",
                    marginRight: "auto",
                  }}
                  md={4}
                  key={item.product._id}>
                  <Card className="order-card">
                    <Card.Img
                      variant="top"
                      src={`http://127.0.0.1:5000/assets/images/${item.product.images}`}
                      alt={item.product.name}
                    />
                    <Card.Body>
                      <Card.Title>{item.product.name}</Card.Title>
                      <Card.Text>Quantity: {item.quantity}</Card.Text>
                      <Card.Text>
                        Price: &#x20B9; {item.product.price}
                      </Card.Text>
                      <Card.Text>
                        Ordered on:{" "}
                        {new Date(order.orderDate).toLocaleDateString()}
                      </Card.Text>
                      <Card.Text>
                        Status:{" "}
                        <span
                          className={`order-status ${
                            order.status === "Delivered" ? "co" : ""
                          }`}>
                          {order.status}
                        </span>
                      </Card.Text>{" "}
                    </Card.Body>
                  </Card>
                </Col>
              ))
            )}
        </Row>
      </div>
    </Container>
  );
};

export default OrderInfo;
