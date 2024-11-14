import Form from "react-bootstrap/Form";
import InputGroup from "react-bootstrap/InputGroup";
import Button from "react-bootstrap/Button";

export default function Search() {
  return (
    <>
      <InputGroup>
        <Form.Control placeholder="Buscar Produto" />
        <Button variant="outline-danger">Filtrar</Button>
      </InputGroup>
    </>
  );
}
