/* eslint-disable react/prop-types */
import ModalBS from "react-bootstrap/Modal";
import ModalEdita from "./ModalEdita";
import ModalExclui from "./ModalExlui";

function ModalAlterar({ show, handleClose, product, refreshTable }) {
  const handleCloseAndRefresh = () => {
    handleClose(); // Fecha o modal
    refreshTable(); // Atualiza a tabela
  };

  return (
    <ModalBS show={show} onHide={handleCloseAndRefresh}>
      <ModalBS.Header closeButton>
        <ModalBS.Title>
          Alterar Produto: {product ? product.name : "Carregando..."}
        </ModalBS.Title>
      </ModalBS.Header>
      <ModalBS.Body className="d-flex justify-content-around">
        {product && (
          <>
            <ModalEdita product={product} refreshTable={refreshTable} />
            <ModalExclui product={product} refreshTable={refreshTable} />
          </>
        )}
      </ModalBS.Body>
    </ModalBS>
  );
}

export default ModalAlterar;
