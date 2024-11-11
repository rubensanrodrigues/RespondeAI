import { useState } from "react";
import answer from "../../../services/answer";

function Search() {  
  const [response, setResponse] = useState('');

  const keyUp = (event) => {
    if(event.key === 'Enter') {
      const question = event.target.value
      setResponse("")
      answer(question, setResponse) 
    }
  }

  const handleClick = () => {
    const element = document.getElementById('inputSearch');
    const question = element.value;
    setResponse("")
    answer(question, setResponse)
  }

  return (
    <section>
      <h2>Responde AI</h2>
      <div className="input-wrapper">
        <input
          autoFocus
          id="inputSearch"
          className="inputSearch"
          placeholder="Olá! Digite aqui sua dúvida e pressione enter."
          onKeyUp={(event) => keyUp(event)}
        />
        <button
          onClick={handleClick}
          title="Clique aqui para proceguir com a consulta de sua pergunta."
        >Ir!</button>
      </div>
      <p>{response}</p>
    </section>
  )
}

export default Search