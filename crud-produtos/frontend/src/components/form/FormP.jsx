import { useState } from "react";
import Button from "react-bootstrap/Button";
import Col from "react-bootstrap/Col";
import Form from "react-bootstrap/Form";
import Row from "react-bootstrap/Row";

function FormP() {
  const [validated, setValidated] = useState(false);
  const [formData, setFormData] = useState({
    name: "", // nome do produto
    category: "", // categoria do produto
    description: "", // descrição do produto
    price: "", // preço do produto
    amount: "", // quantidade do produto
  });

  // Função para lidar com a mudança dos campos
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  // Função para enviar o formulário
  const handleSubmit = async (event) => {
    const form = event.currentTarget;
    event.preventDefault();
    if (form.checkValidity() === false) {
      event.stopPropagation();
    }

    setValidated(true);

    // Validação simples
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
      // Verificar os dados antes de enviar
      console.log("Enviando dados para a API: ", formData);

      try {
        const response = await fetch("http://localhost:8800/api/products", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(formData), // Envia os dados como JSON
        });

        const data = await response.json(); // Resposta da API
        if (response.ok) {
          alert("Produto cadastrado com sucesso!");
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
