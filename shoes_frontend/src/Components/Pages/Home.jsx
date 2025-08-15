import React, { useState, useEffect } from "react";
import {
  Container,
  Carousel,
  Card,
  Row,
  Col,
  Button,
  Modal,
  Alert,
} from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import Clock from "../../UI/Clock";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faPhone,
  faInfoCircle,
  faShippingFast,
  faStoreAlt,
  faExchangeAlt,
} from "@fortawesome/free-solid-svg-icons";
import "../CSS/Home.css";

const Home = () => {
  const [show, setShow] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [showAlert, setShowAlert] = useState(false);
  const [alertMessage, setAlertMessage] = useState("");
  const [products, setProducts] = useState([]);

  const handleClose = () => setShow(false);
  const handleShow = (product) => {
    setSelectedProduct(product);
    setShow(true);
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
          productId: product._id,
          quantity: 1,
        }),
      });

      if (response.ok) {
        setAlertMessage(`${product.name} added to cart!`);
        setShowAlert(true);
        setTimeout(() => setShowAlert(false), 1500);
      } else {
        setAlertMessage("Failed to add item to cart.");
        setShowAlert(true);
      }
    } catch (error) {
      console.error("Error adding item to cart:", error);
      setAlertMessage("An error occurred.");
      setShowAlert(true);
    }
  };

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const cookie = localStorage.getItem("jwt");

        const response = await fetch(
          "http://127.0.0.1:5000/api/shoes/collections",
          {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
              JWTCookie: cookie,
            },
          }
        );

        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }

        const data = await response.json();
        setProducts(data.allShoes);
      } catch (error) {
        console.error("Error fetching products:", error);
      }
    };

    fetchProducts();
  }, []);

  return (
    <div>
      <Carousel className="head-contaner">
        <Carousel.Item>
          <img
            className="d-block w-100 "
            src="./banner.png"
            alt="First slide"
          />
          <img
            className="d-block shoes-img "
            src="./shoes2.png"
            alt="First slide"
          />
          <Carousel.Caption className="first-title">
            <h3>Welcome to Footwear Store</h3>
            <p>Discover the best footwear collection</p>
          </Carousel.Caption>
        </Carousel.Item>
      </Carousel>
      <section className="timer__count">
        <Container>
          <Row>
            <Col lg="6" md="12" className="count__down-col">
              <div className="clock__top-content">
                <h4 className="text-black fs-3 mb-2">
                  Limited offers Sneakers
                </h4>
              </div>
              <Clock />
              <motion.button
                whileHover={{ scale: 1.1 }}
                className="buy__btn store__btn">
                <Link to="/collections">Visit Store</Link>
              </motion.button>
            </Col>
            <Col lg="2" md="3" className="text-end counter__img">
              <img src={"./Image7.png"} alt="" />
            </Col>
          </Row>
        </Container>
      </section>
      <Container className="my-5">
        <h2 className="text-center mb-4">Featured Products</h2>
        {showAlert && (
          <Alert variant="success" className="alert-center">
            {alertMessage}
          </Alert>
        )}
        <Row className="home-ps">
          {products.map((product) => (
            <Col md={4} key={product._id}>
              <Card>
                <Card.Img
                  variant="top"
                  src={`http://127.0.0.1:5000/assets/images/${product.images}`}
                  onClick={() => handleShow(product)}
                />
                <Card.Body>
                  <Card.Title>{product.name}</Card.Title>
                  <Card.Text>{product.description}</Card.Text>
                  <Card.Text className="text-muted">
                    &#x20B9;{product.price}
                  </Card.Text>
                  <Button
                    variant="primary"
                    onClick={() => handleAddToCart(product)}>
                    Buy Now
                  </Button>
                </Card.Body>
              </Card>
            </Col>
          ))}
        </Row>
      </Container>
      <Container className="logos-section">
        <h2 className="text-center mb-4">Explore More</h2>
        <Row className="justify-content-center">
          <Col md={2} className="text-center">
            <Link to="/contact-us">
              <FontAwesomeIcon
                icon={faPhone}
                size="2x"
                style={{ color: "black" }}
              />
              <p>Contact Us</p>
            </Link>
          </Col>
          <Col md={2} className="text-center">
            <Link to="/order-info">
              <FontAwesomeIcon
                icon={faInfoCircle}
                size="2x"
                style={{ color: "black" }}
              />
              <p>Order Info</p>
            </Link>
          </Col>
          <Col md={2} className="text-center">
            <Link to="/shipping-info">
              <FontAwesomeIcon
                icon={faShippingFast}
                size="2x"
                style={{ color: "black" }}
              />
              <p>Shipping Info</p>
            </Link>
          </Col>
          <Col md={2} className="text-center">
            <Link to="/store-pickup">
              <FontAwesomeIcon
                icon={faStoreAlt}
                size="2x"
                style={{ color: "black" }}
              />
              <p>Store Pickup</p>
            </Link>
          </Col>
          <Col md={2} className="text-center">
            <Link to="/return-exchange">
              <FontAwesomeIcon
                icon={faExchangeAlt}
                size="2x"
                style={{ color: "black" }}
              />
              <p>Return & Exchange</p>
            </Link>
          </Col>
        </Row>
      </Container>
      <Modal show={show} onHide={handleClose} size="lg" centered>
        <Modal.Header closeButton>
          <Modal.Title style={{ color: "#fff" }}>
            {selectedProduct?.name}
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <img
            src={`http://127.0.0.1:5000/assets/images/${selectedProduct?.images}`}
            alt={selectedProduct?.name}
            className="w-100"
          />
          <p>{selectedProduct?.description}</p>
          <p className="text-muted" style={{ color: "#fff" }}>
            &#x20B9;{selectedProduct?.price}
          </p>
          {/* <Button
            variant="primary"
            onClick={() => handleAddToCart(selectedProduct)}>
            Add to Cart
          </Button> */}
        </Modal.Body>
      </Modal>
    </div>
  );
};

export default Home;
