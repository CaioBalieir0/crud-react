/* eslint-disable react/prop-types */
import ModalBS from "react-bootstrap/Modal";
import ModalEdita from "./ModalEdita";
import ModalExclui from "./ModalExlui";

function ModalAlterar({ show, handleClose, product }) {
  return (
    <ModalBS show={show} onHide={handleClose}>
      <ModalBS.Header closeButton>
        <ModalBS.Title>
          Alterar Produto: {product ? product.name : "Carregando..."}
        </ModalBS.Title>
      </ModalBS.Header>
      <ModalBS.Body className="d-flex justify-content-around">
        {product && (
          <>
            <ModalEdita product={product} />
            <ModalExclui product={product} />
          </>
        )}
      </ModalBS.Body>
    </ModalBS>
  );
}

export default ModalAlterar;
