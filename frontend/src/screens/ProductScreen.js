import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

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
import Loader from "components/Loader";
import QuantityControl from "components/QuantityControl";
import Message from "components/Message";
import { listProductDetails, addToCart } from "store/actions";

const ProductScreen = ({ history, match }) => {
  const [quantity, setQuantity] = useState(1);
  const dispatch = useDispatch();

  const { product, loading, error } = useSelector(
    (state) => state.productDetails
  );

  useEffect(() => {
    dispatch(listProductDetails(match.params.id));
  }, [dispatch, match.params.id]);

  const addToCartHandler = () => {
    dispatch(addToCart(product._id, quantity));
    history.push("/cart");
  };

  if (loading) return <Loader>Loading...</Loader>;

  if (error) return <Message variant="danger">{error}</Message>;

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
            {product.rating && (
              <ListGroupItem>
                <Rating
                  value={product.rating}
                  text={`${product.nrOfReviews} reviews`}
                />
              </ListGroupItem>
            )}
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

              {isProductInStock && (
                <ListGroupItem>
                  <Row>
                    <Col>Quantity</Col>
                    <Col>
                      <QuantityControl
                        countInStock={product.countInStock}
                        quantity={quantity}
                        onChangeQuantity={(value) => setQuantity(value)}
                      />
                    </Col>
                  </Row>
                </ListGroupItem>
              )}

              <ListGroupItem>
                <Button
                  onClick={addToCartHandler}
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
