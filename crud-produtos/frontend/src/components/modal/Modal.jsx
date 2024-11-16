/* eslint-disable react/prop-types */
import { useState } from "react";
import ModalBS from "react-bootstrap/Modal";
import Form from "../form/FormP";
import Button from "react-bootstrap/Button";

function Example({ refreshTable }) {
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  return (
    <>
      <Button variant="outline-success" onClick={handleShow}>
        Add Produto
      </Button>

      <ModalBS show={show} onHide={handleClose}>
        <ModalBS.Header closeButton>
          <ModalBS.Title>Cadastrar Produto</ModalBS.Title>
        </ModalBS.Header>
        <ModalBS.Body>
          <Form onAddProduct={refreshTable} />{" "}
          {/* Passando refreshTable para o Form */}
        </ModalBS.Body>
      </ModalBS>
    </>
  );
}

export default Example;
