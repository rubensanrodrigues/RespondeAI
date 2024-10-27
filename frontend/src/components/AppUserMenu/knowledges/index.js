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
        <Link to="/appuser/knowledges/new" ><button>Adicionar novo Conhecimentos</button></Link>
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
    saveKnowledge(letsGo, knowledge)
  }  
  
  return knowledgeForm(knowledge, handelInput, handelSubmit)
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
    updateKnowledge(letsGo, knowledge)
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
    return (<button className="button" onClick={handleClick}>Excluir permanentemente</button>)
}

function BackButton() {
  const navigate = useNavigate();

  function letsBack(e) {
    e.preventDefault();
    navigate('/appuser/knowledges/');
  }

  return (<button className="button" onClick={letsBack}>Voltar à listagem</button>)
}

function knowledgeForm(knowledge, handelInput, handelSubmit) {
  return (
    <section>
      <form onSubmit={handelSubmit} class="form-entity">
        <div>
          <label>
            Assunto
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
          <label>
            Conteúdo
          </label>
          <textarea
            id="information"
            name="information"
            value={knowledge.information}
            onChange={handelInput}
          />
        </div>
        <br />
        <button className="button" type="submit">Salvar</button>
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