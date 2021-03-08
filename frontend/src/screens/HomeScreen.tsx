import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { IRootState } from "store/store";
import { IProduct } from "model/product";

import { listProducts } from "store/actions";
import { Product } from "components/Product";
import { Col, Row } from "react-bootstrap";
import { Loader } from "components/Loader";
import { Message } from "components/Message";

export function HomeScreen() {
  const dispatch = useDispatch();
  const { loading, error, products } = useSelector(
    (state: IRootState) => state.productList
  );

  useEffect(() => {
    dispatch(listProducts());
  }, [dispatch]);

  let content;

  if (loading) {
    content = <Loader>Loading...</Loader>;
  } else if (error) {
    content = <Message variant="danger">{error}</Message>;
  } else {
    content = (
      <Row>
        {products?.map((product: IProduct) => (
          <Col key={product._id} sm={12} md={6} lg={4} xl={3}>
            <Product {...product} />
          </Col>
        ))}
      </Row>
    );
  }

  return (
    <>
      <h1>Latest Products</h1>
      {content}
    </>
  );
}
