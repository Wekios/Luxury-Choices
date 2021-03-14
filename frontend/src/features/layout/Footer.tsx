import { Container, Row, Col } from "react-bootstrap";

export function Footer() {
  return (
    <footer>
      <Container>
        <Row>
          <Col className="text-center py-3">Copyright &copy; Wekios</Col>
        </Row>
      </Container>
    </footer>
  );
}
