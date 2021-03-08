import { Link, RouteComponentProps } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { Row, Col, ListGroup, Image, Button, Card } from "react-bootstrap";
import { QuantityControl } from "components/QuantityControl";
import { Message } from "components/Message";
import { addToCart, removeFromCart } from "store/actions";
import { IRootState } from "store/store";
import { IProduct } from "model/product";

export function CartScreen({ history }: RouteComponentProps<any>) {
  const dispatch = useDispatch();
  const { cartItems } = useSelector((state: IRootState) => state.cart);

  const checkoutHandler = () => {
    history.push("/login?redirect=shipping");
  };

  const removeFromCartHandler = (id: string) => {
    dispatch(removeFromCart(id));
  };

  const isCartEmpty = cartItems.length === 0;

  return (
    <Row>
      <Col md={8}>
        <h1>Shopping Cart</h1>
        {isCartEmpty ? (
          <Message>
            Your cart is empty <Link to="/">Go back</Link>
          </Message>
        ) : (
          <ListGroup variant="flush">
            {cartItems.map((p: IProduct) => (
              <ListGroup.Item key={p._id}>
                <Row>
                  <Col md={2}>
                    <Image src={p.image} alt={p.name} fluid rounded />
                  </Col>
                  <Col md={3}>
                    <Link to={`/product/${p._id}`}>{p.name}</Link>
                  </Col>
                  <Col md={2}>${p.price}</Col>
                  <Col>
                    <QuantityControl
                      {...{
                        quantity: p.quantity,
                        countInStock: p.countInStock,
                        onChangeQuantity: (value) =>
                          dispatch(addToCart(p._id, value)),
                      }}
                    />
                  </Col>
                  <Col md={2}>
                    <Button
                      type="button"
                      variant="light"
                      onClick={() => removeFromCartHandler(p._id)}
                    >
                      <i className="fas fa-trash"></i>
                      Remove
                    </Button>
                  </Col>
                </Row>
              </ListGroup.Item>
            ))}
          </ListGroup>
        )}
      </Col>
      <Col md={4}>
        <Card>
          <ListGroup variant="flush">
            <ListGroup.Item>
              <h2>
                Subtotal (
                {cartItems.reduce(
                  (acc: number, p: IProduct) => acc + p.quantity,
                  0
                )}
                ) items
              </h2>
              $
              {cartItems
                .reduce(
                  (acc: number, p: IProduct) => acc + p.quantity * p.price,
                  0
                )
                .toFixed(2)}
            </ListGroup.Item>
            <ListGroup.Item>
              <Button
                type="button"
                className="btn-block"
                disabled={isCartEmpty}
                onClick={checkoutHandler}
              >
                Proceed to Checkout
              </Button>
            </ListGroup.Item>
          </ListGroup>
        </Card>
      </Col>
    </Row>
  );
}
