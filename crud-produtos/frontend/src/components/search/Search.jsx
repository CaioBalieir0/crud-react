/* eslint-disable react/prop-types */
import { useState } from "react";
import Form from "react-bootstrap/Form";
import InputGroup from "react-bootstrap/InputGroup";
import Button from "react-bootstrap/Button";
import Modal from "../modal/Modal";

export default function Search({ refreshTable, onSearch }) {
  const [searchTerm, setSearchTerm] = useState("");
  const [categoryTerm, setCategoryTerm] = useState("");

  // Atualiza o termo de busca para o nome
  const handleNameChange = (e) => {
    setSearchTerm(e.target.value);
  };

  // Atualiza o termo de busca para a categoria
  const handleCategoryChange = (e) => {
    setCategoryTerm(e.target.value);
  };

  // Filtrar produtos com base nos dois termos
  const handleSearch = () => {
    onSearch(searchTerm, categoryTerm);
  };
  const handleClear = () => {
    setSearchTerm("");
    setCategoryTerm("");
    refreshTable(); // Recarrega todos os produtos
  };
  return (
    <>
      <InputGroup className="mb-3">
        <Form.Control
          placeholder="Buscar por Nome"
          value={searchTerm}
          onChange={handleNameChange}
        />
        <Form.Control
          placeholder="Buscar por Categoria"
          value={categoryTerm}
          onChange={handleCategoryChange}
        />
        <Button variant="outline-danger" onClick={handleSearch}>
          Filtrar
        </Button>
        <Button variant="outline-secondary" onClick={handleClear}>
          Limpar
        </Button>
        <Modal refreshTable={refreshTable} />
      </InputGroup>
    </>
  );
}
