import { useEffect, useState } from "react";
import { RouteComponentProps } from "react-router-dom";
import { Form, Button, Row, Col } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "store/store";
import { Message } from "components/Message";
import { Loader } from "components/Loader";
import { getUser, updateUserProfile, updateProfileReset } from "features/user";

export function ProfileScreen({ history }: RouteComponentProps) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [message, setMessage] = useState("");

  const dispatch = useDispatch();

  const { loading, error, userInfo, isProfileUpdated } = useSelector(
    (state: RootState) => state.user
  );

  useEffect(() => {
    if (!userInfo) history.push("/login");
    else {
      if (!userInfo.name) {
        dispatch(getUser("profile"));
      } else {
        setName(userInfo.name);
        setEmail(userInfo.email);
      }
    }
  }, [history, userInfo, dispatch]);

  useEffect(() => {
    return () => {
      updateProfileReset();
    };
  }, []);

  const submitHandler = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (password !== confirmPassword) setMessage("Passwords don't match");
    else {
      if (userInfo) {
        dispatch(updateUserProfile({ ...userInfo, name, email, password }));
      }
    }
  };

  if (loading) return <Loader />;

  return (
    <Row>
      <Col md={3}>
        <h2>User Profile</h2>
        {error && <Message variant="danger">{error}</Message>}
        {message && <Message variant="danger">{message}</Message>}
        {isProfileUpdated && (
          <Message variant="success">Profile Updated!</Message>
        )}
        <Form onSubmit={submitHandler}>
          <Form.Group controlId="name">
            <Form.Label>Name</Form.Label>
            <Form.Control
              type="name"
              placeholder="Enter name"
              required
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </Form.Group>
          <Form.Group controlId="email">
            <Form.Label>Email address</Form.Label>
            <Form.Control
              type="email"
              placeholder="Enter Email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </Form.Group>
          <Form.Group controlId="password">
            <Form.Label>Password</Form.Label>
            <Form.Control
              type="password"
              placeholder="Enter password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </Form.Group>
          <Form.Group controlId="confirmPassword">
            <Form.Label>Confirm password</Form.Label>
            <Form.Control
              type="password"
              placeholder="Confirm your password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
            />
          </Form.Group>
          <Button type="submit" variant="primary">
            Update
          </Button>
        </Form>
      </Col>

      <Col md={9}>
        <h2>My orders</h2>
      </Col>
    </Row>
  );
}
