/* eslint-disable react/prop-types */
import { useState } from "react";
import ModalBS from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
import axios from "axios";

function ModalExclui({ product, onDeleteSuccess }) {
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const handleDelete = async () => {
    try {
      await axios.delete(`http://localhost:8800/api/products/${product.id}`);

      // Exibir alerta de sucesso
      alert("Produto excluído com sucesso!");

      // Executa a função de callback se fornecida
      if (onDeleteSuccess) onDeleteSuccess();

      handleClose();
    } catch (error) {
      console.error("Erro ao excluir produto", error);
      alert("Erro ao excluir produto!");
    }
  };

  return (
    <>
      <Button variant="danger" onClick={handleShow}>
        Excluir
      </Button>

      <ModalBS show={show} onHide={handleClose}>
        <ModalBS.Header closeButton>
          <ModalBS.Title>Excluir produto</ModalBS.Title>
        </ModalBS.Header>
        <ModalBS.Body>Deseja realmente excluir este produto?</ModalBS.Body>
        <ModalBS.Footer>
          <Button variant="danger" onClick={handleDelete}>
            Excluir
          </Button>
          <Button variant="secondary" onClick={handleClose}>
            Cancelar
          </Button>
        </ModalBS.Footer>
      </ModalBS>
    </>
  );
}

export default ModalExclui;
