import { Alert, AlertProps } from "react-bootstrap";
import React from "react";

export function Message({ variant = "info", children }: AlertProps) {
  return <Alert variant={variant}>{children}</Alert>;
}
