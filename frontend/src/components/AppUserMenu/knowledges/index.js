import { useEffect, useState } from "react";
import {deleteKnowledge, getKnowledge, getKnowledges, saveKnowledge, updateKnowledge} from "../../../services/knowledges";
import { Link, useNavigate } from "react-router-dom";
import { useParams } from "react-router-dom";

function KnowledgesList() {
  const [knowledges, setKnowledges] = useState([]);

  useEffect(() => {
    getKnowledges(setKnowledges);
  }, []);

  return (
    <section>
      <h3>Listagem de Conhecimentos cadastrados</h3>
      <div className="collection-items-count">
        {knowledges.length} registros encontrados.
      </div>
      <div className="collection-items-new">
        <Link to="/appuser/knowledges/new" ><button>Adicionar novo Conhecimento</button></Link>
      </div>
      <ul className="collection-items">
        {
          knowledges.map(
            (item) => {
              return <Link key={item.id} to={`/appuser/knowledges/edit/${item.id}`}><li>{item.subject}</li></Link>
            }
          )
        }
      </ul>
    </section>
  )
}

function KnowledgeNew() {
  const [knowledge, setKnowledge] = useState([]);
  const navigate = useNavigate();
  
  function letsGo(sucess) {
    alert("Salvo com sucesso!")
    if(sucess) navigate('/appuser/knowledges/');
  }

  function handelInput (e) {
    e.preventDefault();
    const { name, value } = e.target;
    console.log(name, value);
    setKnowledge({ ...knowledge, [name]: value });
  };

  function handelSubmit(e) {
    e.preventDefault();
    
    // Se estiver ok, salva
    if (isValid(knowledge)) {
      saveKnowledge(letsGo, knowledge);
    }
    else {
      const element = document.getElementById('mensagemValidacao');
      element.classList.add('error-msg');
    }
  }  
  
  return knowledgeForm(knowledge, handelInput, handelSubmit)
}

function isValid(knowledge) {
  var isOK = true;
    
  // Valida se esta vazio
  if(!knowledge.subject) {
    isOK = false;
  }

  // Valida se esta vazio
  if(!knowledge.information) {
    isOK = false;
  }

  return isOK;
}

function KnowledgeEdit() {
  const [knowledge, setKnowledge] = useState([]);
  const { id } = useParams();
  const navigate = useNavigate();

  function letsGo(sucess) {
    alert("Salvo com sucesso!")
    if(sucess) navigate('/appuser/knowledges/');
  }

  useEffect(() => {
    getKnowledge(id, setKnowledge);
  }, [id]);

  function handelInput (e) {
    e.preventDefault();
    const { name, value } = e.target;
    console.log(name, value);
    setKnowledge({ ...knowledge, [name]: value });
  };

  function handelSubmit(e) {
    e.preventDefault();

    // Se estiver ok, atualiza
    if (isValid(knowledge)) {
      updateKnowledge(letsGo, knowledge)
    }
    else {
      const element = document.getElementById('mensagemValidacao');
      element.classList.add('error-msg');
    }
  }

  return knowledgeForm(knowledge, handelInput, handelSubmit)
}

function DeleteButton({data}) {
  const navigate = useNavigate();

  function letsGo(sucess) {
    alert("Salvo com sucesso!")
    if(sucess) navigate('/appuser/knowledges/');
  }

  function handleClick(e) {
    e.preventDefault();
    deleteKnowledge(letsGo, data.id)
  }
  
  if (data.id)
    return (<button id="btnDelete" className="button" onClick={handleClick}>Excluir permanentemente</button>)
}

function BackButton() {
  const navigate = useNavigate();

  function letsBack(e) {
    e.preventDefault();
    navigate('/appuser/knowledges/');
  }

  return (<button id="btnVoltar" className="button" onClick={letsBack}>Voltar à listagem</button>)
}

function knowledgeForm(knowledge, handelInput, handelSubmit) {
  return (
    <section>
      <h3>Formulário para Cadastro de Conhecimento</h3>
      <form onSubmit={handelSubmit} class="form-entity">
        <div>
          <label htmlFor="subject">
            * Assunto
          </label>
          <input
            type="text"
            id="subject"
            name="subject"
            value={knowledge.subject}
            onChange={handelInput}
          />
        </div>
        <br />
        <div>
          <label htmlFor="information">
          * Conteúdo
          </label>
          <textarea
            id="information"
            name="information"
            value={knowledge.information}
            onChange={handelInput}
          />
        </div>
        <p id="mensagemValidacao">* Os campos são de preenchimento obrigatório</p>
        <br />
        <button id="btnSalvar" className="button" type="submit">Salvar</button>
        <BackButton />
        <DeleteButton data={knowledge} />
      </form>

    </section>
  )
}


export {
  KnowledgesList,
  KnowledgeEdit,
  KnowledgeNew
}