import { useState } from "react";
import { FiSearch } from "react-icons/fi";
import "./style.css";

import api from "./services/api";

function App() {
  const [input, setInput] = useState("");
  const [cep, setCep] = useState({});

  async function handleSerach() {
    // 01310930/json/

    if (input == "") {
      alert("Preencha corretamente");
      return;
    }

    try {
      const response = await api.get(`${input}/json`);
      setCep(response.data);
      setInput("");
    } catch {
      alert("Erro ao buscar");
      setInput("");
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

      {Object.keys(cep).length > 0 && (
          <main className="main">
          <h2>  CEP: {cep.cep}</h2>
  
          <span> <i className="result"> Rua:          </i>   {cep.logradouro}              </span>
          <span> <i className="result"> Complemento:  </i>   {cep.complemento}             </span>
          <span> <i className="result"> Bairro:       </i>   {cep.bairro}                  </span>
          <span> <i className="result"> Localização:  </i>   {cep.localidade} - {cep.uf}   </span>
        </main>
      )}

      
    </div>
  );
}

export default App;
