import { useState } from "react";
import { FiSearch, FiMapPin } from "react-icons/fi";
import "./style.css";
import api from "./services/api";

function App() {
  const [input, setInput] = useState("");
  const [cep, setCep] = useState({});

  async function handleSearch() {
    if (input === "") return alert("Digite um CEP!");
    try {
      const response = await api.get(`${input}/json`);
      if (response.data.erro) return alert("CEP inexistente!");
      setCep(response.data);
      setInput("");
    } catch {
      alert("Erro na busca!");
    }
  }

  return (
    <div className="container">
      <h1 className="title">Buscador <span>CEP</span></h1>

      <div className="search-box">
        <input
          type="text"
          placeholder="00000-000"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => e.key === 'Enter' && handleSearch()}
        />
        <button onClick={handleSearch}>
          <FiSearch size={22} color="#fff" />
        </button>
      </div>

      {Object.keys(cep).length > 0 && (
        <main className="result-card">
          <header className="card-header">
            <FiMapPin size={24} color="#38bdf8" />
            <h2>{cep.cep}</h2>
          </header>

          <div className="content">
            <div className="data-row">
              <label>Logradouro</label>
              <p>{cep.logradouro || "Não informado"}</p>
            </div>

            <div className="data-group">
              <div className="data-row">
                <label>Bairro</label>
                <p>{cep.bairro || "---"}</p>
              </div>
              <div className="data-row">
                <label>UF</label>
                <p>{cep.uf}</p>
              </div>
            </div>

            <div className="data-row">
              <label>Cidade</label>
              <p>{cep.localidade}</p>
            </div>

            {cep.complemento && (
              <div className="data-row highlight">
                <label>Complemento</label>
                <p>{cep.complemento}</p>
              </div>
            )}
          </div>
        </main>
      )}
    </div>
  );
}

export default App;