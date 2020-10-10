import React from "react";
import { Spinner } from "react-bootstrap";

function Loader({ children }) {
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

export default Loader;
