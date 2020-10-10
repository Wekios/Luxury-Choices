import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import { listProducts } from "store/actions";
import Product from "components/Product";
import { Col, Row } from "react-bootstrap";
import Loader from "components/Loader";
import Message from "components/Message";

const HomeScreen = () => {
  const dispatch = useDispatch();
  const { loading, error, products } = useSelector(
    (state) => state.productList
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
        {products.map((product) => (
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
};

export default HomeScreen;
