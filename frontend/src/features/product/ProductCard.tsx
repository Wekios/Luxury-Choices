import { IProduct } from "./productModel";
import { Link } from "react-router-dom";
import { Card } from "react-bootstrap";
import { Rating } from "../../components/Rating";

export function ProductCard({
  _id,
  image,
  name,
  rating,
  nrOfReviews,
  price,
}: IProduct) {
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
