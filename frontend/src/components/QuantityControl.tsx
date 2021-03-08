import React from "react";
import { Form } from "react-bootstrap";

export interface QuantityControlProps {
  countInStock: number;
  quantity: number;
  onChangeQuantity: (q: number) => void;
}

export function QuantityControl({
  countInStock,
  quantity,
  onChangeQuantity,
}: QuantityControlProps) {
  const handleChangeQuantity = (e: React.FormEvent<HTMLFormElement>) => {
    const newQuantity = +e.currentTarget.value;
    if (newQuantity) onChangeQuantity(newQuantity);
    else throw new Error("Quantity not a number");
  };

  return (
    <Form as="select" value={quantity} onChange={handleChangeQuantity}>
      <QuantityOptions {...{ countInStock }} />
    </Form>
  );
}

export function QuantityOptions({ countInStock }: { countInStock: number }) {
  let options = [];
  for (let i = 1; i <= countInStock; i++) {
    options.push(
      <option key={i} value={i}>
        {i}
      </option>
    );
  }

  return <>{options}</>;
}
