import { useState } from "react";
import { Toast } from "react-bootstrap";
import ToastContainer from "react-bootstrap/ToastContainer";

type ToastProps = {
  message: string;
  style: "danger" | "success";
  visible: boolean;
};

const ToastNotification = ({ message, style, visible }: ToastProps) => {
  const [show, setShow] = useState(visible);

  return (
    <ToastContainer position="top-end" className="p-3">
      <Toast
        show={show}
        onClose={() => setShow(false)}
        delay={4000}
        autohide
        bg={style}
      >
        <Toast.Header>
          <strong className="me-auto">
            {style === "success" ? "Success" : "Error"}
          </strong>
        </Toast.Header>
        <Toast.Body className="text-white">{message}</Toast.Body>
      </Toast>
    </ToastContainer>
  );
};

export default ToastNotification;
