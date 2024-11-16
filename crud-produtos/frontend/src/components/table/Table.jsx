import { useState, useEffect } from "react";
import axios from "axios";
import TableBS from "react-bootstrap/Table";
import ModalAlterar from "../modal/ModalAlterar"; // Certifique-se de que o caminho está correto
import Button from "react-bootstrap/esm/Button";

export default function Table() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);

  const buscaProdutos = async () => {
    try {
      const res = await axios.get("http://localhost:8800/api/products");
      setProducts(res.data.products);
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
    setSelectedProduct(product); // Definindo o produto selecionado
    setShowModal(true); // Abrindo o modal
  };

  const handleCloseModal = () => {
    setShowModal(false); // Fechando o modal
    setSelectedProduct(null); // Limpando o produto selecionado
  };

  if (loading) return <p>Carregando...</p>;
  if (error) return <p>Erro: {error}</p>;

  return (
    <>
      <TableBS stripped>
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
          {products.map((product) => (
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
      />
    </>
  );
}
