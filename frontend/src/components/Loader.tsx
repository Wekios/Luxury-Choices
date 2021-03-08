import React from "react";
import { Spinner } from "react-bootstrap";

export function Loader({ children }: React.PropsWithChildren<{}>) {
  return (
    <Spinner
      animation="border"
      role="status"
      style={{
        width: "100px",
        height: "100px",
        margin: "auto",
        display: "block",
      }}
    >
      {children && <span className="sr-only">{children}</span>}
    </Spinner>
  );
}
