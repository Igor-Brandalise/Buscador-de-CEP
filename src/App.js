import { useState } from "react";
import { FiSearch, FiMapPin } from "react-icons/fi";
import "./style.css";
import api from "./services/api";

function App() {
  const [input, setInput] = useState("");
  const [cep, setCep] = useState({});

  async function handleSearch() {
    if (input === "") {
      alert("Preencha corretamente");
      return;
    }

    try {
      const response = await api.get(`${input}/json`);
      if (response.data.erro) {
        alert("CEP não encontrado");
        return;
      }
      setCep(response.data);
      setInput("");
    } catch {
      alert("Erro ao buscar o CEP");
      setInput("");
    }
  }

  return (
    <div className="container">
      <header className="header">
        <div className="icon-box">
          <FiMapPin size={32} color="#38bdf8" />
        </div>
        <h1 className="title">Buscador <span>CEP</span></h1>
      </header>

      <div className="containerInput">
        <input
          type="text"
          placeholder="00000-000"
          value={input}
          onChange={(event) => setInput(event.target.value)}
          onKeyDown={(e) => e.key === 'Enter' && handleSearch()}
        />
        <button className="buttonSearch" onClick={handleSearch}>
          <FiSearch size={22} color="#fff" />
        </button>
      </div>

      {Object.keys(cep).length > 0 && (
        <main className="main-card">
          <div className="card-header">
            <h2>{cep.cep}</h2>
            <span className="tag">{cep.uf}</span>
          </div>
  
          <div className="info-grid">
            <div className="info-item">
              <label>Logradouro</label>
              <p>{cep.logradouro || "Não disponível"}</p>
            </div>

            {cep.complemento && (
              <div className="info-item">
                <label>Complemento</label>
                <p>{cep.complemento}</p>
              </div>
            )}

            <div className="info-item">
              <label>Bairro</label>
              <p>{cep.bairro}</p>
            </div>

            <div className="info-item">
              <label>Cidade</label>
              <p>{cep.localidade}</p>
            </div>
          </div>

          <a 
            href={`https://www.google.com{cep.logradouro},${cep.localidade}`}
            target="_blank"
            rel="noreferrer"
            className="map-link"
          >
            Ver no Google Maps
          </a>
        </main>
      )}
    </div>
  );
}

export default App;