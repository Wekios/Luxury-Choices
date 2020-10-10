import React, { useState, useEffect } from "react";
import axios from "axios";

import { Link } from "react-router-dom";
import {
  Row,
  Col,
  Image,
  ListGroup,
  ListGroupItem,
  Card,
  Button,
} from "react-bootstrap";
import Rating from "components/Rating";

const ProductScreen = ({ match }) => {
  const [product, setProduct] = useState({});

  useEffect(() => {
    async function fetchProduct() {
      const { data } = await axios.get(`/api/products/${match.params.id}`);
      setProduct(data);
    }
    fetchProduct();
  }, [match.params.id]);

  const isProductInStock = !!product.countInStock;

  return (
    <>
      <Link className="btn btn-light my-3 " to="/">
        Go Back
      </Link>
      <Row>
        <Col md={6}>
          <Image src={product.image} alt={product.name} fluid />
        </Col>
        <Col md={3}>
          <ListGroup variant="flush">
            <ListGroupItem>
              <h2>{product.name}</h2>
            </ListGroupItem>
            <ListGroupItem>
              <Rating
                value={product.rating}
                text={`${product.numReviews} reviews`}
              />
            </ListGroupItem>
            <ListGroupItem>Price: {product.price}</ListGroupItem>
            <ListGroupItem>Description: {product.description}</ListGroupItem>
          </ListGroup>
        </Col>
        <Col md={3}>
          <Card>
            <ListGroup variant="flush">
              <ListGroupItem>
                <Row>
                  <Col>price:</Col>
                  <Col>{product.price}:</Col>
                </Row>
              </ListGroupItem>
            </ListGroup>

            <ListGroup variant="flush">
              <ListGroupItem>
                <Row>
                  <Col>Status:</Col>
                  <Col>{isProductInStock ? "In Stock" : "Out of Stock"}</Col>
                </Row>
              </ListGroupItem>
              <ListGroupItem>
                <Button
                  className="btn-block"
                  type="button"
                  disabled={!isProductInStock}
                >
                  Add to Cart
                </Button>
              </ListGroupItem>
            </ListGroup>
          </Card>
        </Col>
      </Row>
    </>
  );
};

export default ProductScreen;
