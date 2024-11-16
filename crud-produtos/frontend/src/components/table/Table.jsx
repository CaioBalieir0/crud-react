import { useState, useEffect } from "react";
import axios from "axios";
import TableBS from "react-bootstrap/Table";
import ModalAlterar from "../modal/ModalAlterar";
import Button from "react-bootstrap/esm/Button";
import Search from "../search/Search";

export default function Table() {
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);

  const buscaProdutos = async () => {
    try {
      const res = await axios.get("http://localhost:8800/api/products");
      setProducts(res.data.products);
      setFilteredProducts(res.data.products);
    } catch (error) {
      setError(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    buscaProdutos();
  }, []);

  const handleShowModal = (product) => {
    setSelectedProduct(product);
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
    setSelectedProduct(null);
  };

  const refreshTable = () => {
    buscaProdutos();
  };

  const handleSearch = (searchTerm, categoryTerm) => {
    const filtered = products.filter((product) => {
      const matchesName = product.name
        .toLowerCase()
        .includes(searchTerm.toLowerCase());
      const matchesCategory = product.category
        .toLowerCase()
        .includes(categoryTerm.toLowerCase());
      return matchesName && matchesCategory;
    });
    setFilteredProducts(filtered);
  };

  if (loading) return <p>Carregando...</p>;
  if (error) return <p>Erro: {error}</p>;

  return (
    <>
      <Search refreshTable={refreshTable} onSearch={handleSearch} />
      <TableBS striped>
        <thead>
          <tr>
            <th>Nome</th>
            <th>Categoria</th>
            <th>Descrição</th>
            <th>Preço</th>
            <th>Alterar</th>
          </tr>
        </thead>
        <tbody>
          {filteredProducts.map((product) => (
            <tr key={product.id}>
              <td>{product.name}</td>
              <td>{product.category}</td>
              <td>{product.description}</td>
              <td>{product.price}</td>
              <td>
                <Button
                  variant="outline-primary"
                  onClick={() => handleShowModal(product)}
                >
                  Alterar
                </Button>
              </td>
            </tr>
          ))}
        </tbody>
      </TableBS>
      <ModalAlterar
        show={showModal}
        handleClose={handleCloseModal}
        product={selectedProduct}
        refreshTable={refreshTable}
      />
    </>
  );
}
