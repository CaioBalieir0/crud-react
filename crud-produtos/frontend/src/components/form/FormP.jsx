/* eslint-disable react/prop-types */
import { useState } from "react";
import Button from "react-bootstrap/Button";
import Col from "react-bootstrap/Col";
import Form from "react-bootstrap/Form";
import Row from "react-bootstrap/Row";

function FormP({ onAddProduct }) {
  // Recebe a função onAddProduct do componente pai
  const [validated, setValidated] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    category: "",
    description: "",
    price: "",
    amount: "",
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (event) => {
    const form = event.currentTarget;
    event.preventDefault();
    if (form.checkValidity() === false) {
      event.stopPropagation();
    }

    setValidated(true);

    if (
      !formData.name ||
      !formData.category ||
      !formData.price ||
      !formData.amount
    ) {
      alert("Por favor, preencha todos os campos obrigatórios!");
      return;
    }

    if (form.checkValidity()) {
      console.log("Enviando dados para a API: ", formData);

      try {
        const response = await fetch("http://localhost:8800/api/products", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(formData),
        });

        const data = await response.json();
        if (response.ok) {
          alert("Produto cadastrado com sucesso!");
          onAddProduct(); // Chama a função para atualizar a tabela
        } else {
          alert("Erro ao cadastrar produto: " + data.message);
        }
      } catch (error) {
        alert("Erro na conexão com a API: " + error.message);
      }
    }
  };

  return (
    <Form
      noValidate
      validated={validated}
      onSubmit={handleSubmit}
      className="text-start"
    >
      <Row className="mb-3">
        <Form.Group as={Col} md="4" controlId="validationCustom01">
          <Form.Label>Nome do produto</Form.Label>
          <Form.Control
            required
            type="text"
            placeholder="Nome do produto"
            name="name"
            value={formData.name}
            onChange={handleInputChange}
          />
        </Form.Group>
        <Form.Group as={Col} md="4" controlId="validationCustom02">
          <Form.Label>Categoria</Form.Label>
          <Form.Control
            required
            type="text"
            placeholder="Categoria"
            name="category"
            value={formData.category}
            onChange={handleInputChange}
          />
        </Form.Group>
        <Form.Group as={Col} md="4" controlId="validationCustom03">
          <Form.Label>Descrição</Form.Label>
          <Form.Control
            required
            type="text"
            placeholder="Descrição"
            name="description"
            value={formData.description}
            onChange={handleInputChange}
          />
        </Form.Group>
      </Row>

      <Row className="justify-content-center">
        <Form.Group as={Col} md="4" controlId="validationCustom04">
          <Form.Label>Preço</Form.Label>
          <Form.Control
            required
            type="number"
            placeholder="Preço"
            name="price"
            value={formData.price}
            onChange={handleInputChange}
          />
        </Form.Group>
        <Form.Group as={Col} md="4" controlId="validationCustom05">
          <Form.Label>Quantidade</Form.Label>
          <Form.Control
            required
            type="number"
            placeholder="Quantidade"
            name="amount"
            value={formData.amount}
            onChange={handleInputChange}
          />
        </Form.Group>
      </Row>
      <Row className="justify-content-center my-4 border-top border-white">
        <Button
          style={{ backgroundColor: "#198754", marginTop: "20px" }}
          type="submit"
        >
          Submit form
        </Button>
      </Row>
    </Form>
  );
}

export default FormP;
