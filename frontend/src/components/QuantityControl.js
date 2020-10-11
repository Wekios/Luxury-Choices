import React from "react";

import { Form } from "react-bootstrap";

function QuantityControl({ countInStock, quantity, onChangeQuantity }) {
  const handleChangeQuantity = (e) => {
    const newQuantity = +e.target.value;
    if (newQuantity) onChangeQuantity(newQuantity);
    else throw new Error("Quantity not a number");
  };

  return (
    <Form as="select" value={quantity} onChange={handleChangeQuantity}>
      <QuantityOptions {...{ countInStock }} />
    </Form>
  );
}

function QuantityOptions({ countInStock }) {
  let options = [];
  for (let i = 1; i <= countInStock; i++) {
    options.push(
      <option key={i} value={i}>
        {i}
      </option>
    );
  }

  return options;
}

export default QuantityControl;
