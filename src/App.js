import { useState } from "react";
import { FiSearch } from "react-icons/fi";
import "./style.css";
import api from "./services./api";

function App() {
  const [input, setInput] = useState("");

  async function handleSerach() {
    // 01310930/json/

    if (input == "") {
      alert("Preencha corretamente");
      return;
    }

    try {
      const response = await api.get(`${input}/json`);
      console.log(response)
    } catch {
      alert("Erro ao buscar")
    }
  }

  return (
    <div className="container">
      <h1 className="title">Buscador de CEP</h1>

      <div className="containerInput">
        <input
          type="text"
          placeholder="Digite seu CEP..."
          value={input}
          onChange={(event) => setInput(event.target.value)}
        />

        <button className="buttonSearch" onClick={handleSerach}>
          <FiSearch size={25} color="#fff" />
        </button>
      </div>

      <main className="main">
        <h2>CEP:</h2>

        <span>Rua:</span>
        <span>Complemento:</span>
        <span>Bairro:</span>
        <span>Localização:</span>
      </main>
    </div>
  );
}

export default App;
