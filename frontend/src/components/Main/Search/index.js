import { useState } from "react";
import answer from "../../../services/answer";

function Search() {  
  const [response, setResponse] = useState('');

  const keyUp = (event) => {
    if(event.key === 'Enter') {
      const question = event.target.value
      answer(question, setResponse) 
    }
  }

  return (
    <section>
      <h2>Responde AI</h2>
      <input 
        placeholder="Olá! Digite aqui sua dúvida."
        onKeyUp={(event) => keyUp(event)}
        className="inputSearch"
      />
      <p>{response}</p>
    </section>
  )
}

export default Search