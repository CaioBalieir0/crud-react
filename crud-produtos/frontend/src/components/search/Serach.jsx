import Form from "react-bootstrap/Form";
import InputGroup from "react-bootstrap/InputGroup";
import Button from "react-bootstrap/Button";
import Modal from "../modal/Modal";

export default function Search() {
  return (
    <>
      <InputGroup>
        <Form.Control placeholder="Buscar Produto" className="" />
        <Button variant="outline-danger">Filtrar</Button>
        <Modal />
      </InputGroup>
    </>
  );
}
