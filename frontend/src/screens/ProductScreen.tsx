import { useEffect, useState } from "react";
import { RouteComponentProps } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "store/store";
import { Link } from "react-router-dom";
import {
  Row,
  Col,
  Image,
  ListGroup,
  ListGroupItem,
  Card,
  Button,
  Form,
} from "react-bootstrap";
import { Rating } from "components/Rating";
import { Loader } from "components/Loader";
import { QuantityControl } from "components/QuantityControl";
import { Message } from "components/Message";
import { fetchProduct } from "features/product";
import { addToCart } from "features/cart";

export function ProductScreen({
  history,
  match,
}: RouteComponentProps<{ id: string }>) {
  const [quantity, setQuantity] = useState(1);
  const dispatch = useDispatch();

  const { product, loading, error } = useSelector(
    (state: RootState) => state.productDetails
  );

  useEffect(() => {
    dispatch(fetchProduct(match.params.id));
  }, [dispatch, match.params.id]);

  if (loading) return <Loader>Loading...</Loader>;

  if (error || !product) return <Message variant="danger">{error}</Message>;

  const addToCartHandler = () => {
    dispatch(addToCart(product._id, quantity));
    history.push("/cart");
  };

  const handleChangeQuantity = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newQuantity = +e.currentTarget.value;
    setQuantity(newQuantity);
  };

  const isProductInStock = product.countInStock >= 1;

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
                  <Form>
                    <Form.Group controlId="quantity-select">
                      <Form.Row className="align-items-center">
                        <Col>
                          <Form.Label>Quantity</Form.Label>
                        </Col>
                        <Col>
                          <Form.Control
                            as="select"
                            custom
                            onChange={handleChangeQuantity}
                          >
                            <QuantityControl
                              countInStock={product.countInStock}
                            />
                          </Form.Control>
                        </Col>
                      </Form.Row>
                    </Form.Group>
                  </Form>
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
}
