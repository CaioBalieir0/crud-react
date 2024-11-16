/* eslint-disable react/prop-types */
import { useState } from "react";
import ModalBS from "react-bootstrap/Modal";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import axios from "axios";

function ModalAlterar({ product, onSave }) {
  const [show, setShow] = useState(false);

  const [name, setName] = useState("");
  const [category, setCategory] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [amount, setAmount] = useState("");

  const handleShow = () => {
    setName(product.name);
    setCategory(product.category);
    setDescription(product.description);
    setPrice(product.price);
    setAmount(product.amount);
    setShow(true);
  };

  const handleClose = () => setShow(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await axios.put(`http://localhost:8800/api/products/${product.id}`, {
        name,
        category,
        description,
        price,
        amount,
      });
      alert("Produto atualizado com sucesso!");
      if (onSave) onSave();
      handleClose();
    } catch (error) {
      console.error("Erro ao atualizar produto:", error);
    }
  };

  return (
    <>
      <Button variant="warning" onClick={handleShow}>
        Editar
      </Button>

      <ModalBS show={show} onHide={handleClose}>
        <ModalBS.Header closeButton>
          <ModalBS.Title>Editar Produto</ModalBS.Title>
        </ModalBS.Header>
        <ModalBS.Body>
          <Form onSubmit={handleSubmit}>
            <Form.Group controlId="formName">
              <Form.Label>Nome do Produto</Form.Label>
              <Form.Control
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
              />
            </Form.Group>

            <Form.Group controlId="formCategory" className="mt-3">
              <Form.Label>Categoria</Form.Label>
              <Form.Control
                type="text"
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                required
              />
            </Form.Group>

            <Form.Group controlId="formDescription" className="mt-3">
              <Form.Label>Descrição</Form.Label>
              <Form.Control
                as="textarea"
                rows={3}
                value={description}
                onChange={(e) => setDescription(e.target.value)}
              />
            </Form.Group>

            <Form.Group controlId="formPrice" className="mt-3">
              <Form.Label>Preço</Form.Label>
              <Form.Control
                type="number"
                value={price}
                onChange={(e) => setPrice(e.target.value)}
                required
              />
            </Form.Group>

            <Form.Group controlId="formAmount" className="mt-3">
              <Form.Label>Quantidade</Form.Label>
              <Form.Control
                type="number"
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
                required
              />
            </Form.Group>

            <div className="mt-4 d-flex justify-content-end">
              <Button variant="secondary" onClick={handleClose}>
                Cancelar
              </Button>
              <Button variant="primary" type="submit" className="ms-2">
                Salvar Alterações
              </Button>
            </div>
          </Form>
        </ModalBS.Body>
      </ModalBS>
    </>
  );
}

export default ModalAlterar;
