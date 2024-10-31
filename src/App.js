import { FiSearch } from 'react-icons/fi';
import './style.css' 

function App() {
  return (
    <div className="container">
      <h1 className="title">Buscador de CEP</h1>

      <div className="container">
        <input type="text" placeholder="Digite seu CEP..."></input>

        <button className="button"></button>
        < FiSearch size={25} color="#fff"/>
      </div>

    <main className='main'>
      <h2>CEP: 79003222</h2>

      <span>Reua</span>
      <span>Complemento:</span>
      <span>Vila Rosa</span>
      <span>Campo Grande - MS</span>
    </main>

    </div>
  );
}

export default App;
