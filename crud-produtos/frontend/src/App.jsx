import "./App.css";
import Table from "./components/table/Table";

function App() {
  return (
    <>
      <div
        style={{ width: "100%", color: "white" }}
        className="mb-5 p-3 bg-secondary"
      >
        <h2>
          CRUD de Produtos -{" "}
          <span className="text-decoration-underline">
            Caio Balieiro e Felipe Tavares 4ºADS
          </span>
        </h2>
      </div>
      <Table />
    </>
  );
}

export default App;
