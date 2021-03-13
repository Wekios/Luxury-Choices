import { Col, Container, Row } from "react-bootstrap";

export function FormContainer({ children }: React.PropsWithChildren<{}>) {
  return (
    <Container>
      <Row>
        <Col xs={12} md={6}>
          {children}
        </Col>
      </Row>
    </Container>
  );
}
