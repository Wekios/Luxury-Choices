export interface QuantityControlProps {
  countInStock: number;
}

export function QuantityControl({ countInStock }: QuantityControlProps) {
  const options = [];
  for (let i = 1; i <= countInStock; i++) {
    options.push(
      <option key={i} value={i}>
        {i}
      </option>
    );
  }

  return <>{options}</>;
}
