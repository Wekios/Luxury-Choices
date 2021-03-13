import { Alert, AlertProps } from "react-bootstrap";

export function Message({ variant = "info", children }: AlertProps) {
  return <Alert variant={variant}>{children}</Alert>;
}
