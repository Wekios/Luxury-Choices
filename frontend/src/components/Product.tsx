import { IProduct } from "model/product";
import { Link } from "react-router-dom";
import { Card } from "react-bootstrap";
import { Rating } from "./Rating";

export interface ProductProps extends IProduct {}

export function Product({
  _id,
  image,
  name,
  rating,
  nrOfReviews,
  price,
}: ProductProps) {
  return (
    <Card className="my-3 p-3 rounded">
      <Link to={`/product/${_id}`}>
        <Card.Img src={image} variant="top" />
      </Link>
      <Card.Body>
        <Link to={`/product/${_id}`}>
          <Card.Title as="div">
            <strong>{name}</strong>
          </Card.Title>
        </Link>
        <Card.Text as="div">
          <Rating value={rating} text={`${nrOfReviews} reviews`} />
        </Card.Text>
        <Card.Text as="h3">${price}</Card.Text>
      </Card.Body>
    </Card>
  );
}
