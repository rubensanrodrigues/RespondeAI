import { useEffect, useState } from "react";
import {deleteUser, getUser, getUsers, saveUser, updateUser} from "../../../services/users";
import { Link, useNavigate } from "react-router-dom";
import { useParams } from "react-router-dom";

function UsersList() {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    getUsers(setUsers);
  }, []);

  return (
    <section>
      <h3>Listagem de Usuários cadastrados</h3>
      <div className="collection-items-count">
        {users.length} registros encontrados.
      </div>
      <div className="collection-items-new">
        <Link to="/appuser/users/new" ><button>Adicionar novo Usuário</button></Link>
      </div>
      <ul className="collection-items">
        {
          users.map(
            (item) => {
              return <Link key={item.id} to={`/appuser/users/edit/${item.id}`}><li>{item.username}</li></Link>
            }
          )
        }
      </ul>
    </section>
  )
}

function UserNew() {
  const [user, setUser] = useState([]);
  const navigate = useNavigate();
  
  function letsGo(sucess) {
    alert("Salvo com sucesso!")
    if(sucess) navigate('/appuser/users/');
  }

  function handelInput (e) {
    e.preventDefault();
    const { name, value } = e.target;
    console.log(name, value);
    setUser({ ...user, [name]: value });
  };

  function handelSubmit(e) {
    e.preventDefault();

    // Se estiver ok, salva
    if (isValid(user)) {
      saveUser(letsGo, user);
    }
    else {
      const element = document.getElementById('mensagemValidacao');
      element.classList.add('error-msg');
    }
  }  
  
  return userForm(user, handelInput, handelSubmit)
}

function isValid(user) {
  var isOK = true;
    
  // Valida se esta vazio
  if (!user.username) {
    isOK = false;
  }
  // Valida quantidade de caracters
  else if(user.username.length < 5) {
    isOK = false;
  }

  // Valida se esta vazio
  if (!user.useremail) {
    isOK = false;
  }
  // Email valido precisa ter um @
  else if (!user.useremail.includes('@')) {
    isOK = false;
  }

  // Valida se esta vazio
  if (!user.password) {
    isOK = false;
  }
  // Valida quantidade de caracters
  else if(user.password.length < 5 || user.password.length > 20) {
    isOK = false;
  }

  return isOK;
}

function UserEdit() {
  const [user, setUser] = useState([]);
  const { id } = useParams();
  const navigate = useNavigate();

  function letsGo(sucess) {
    alert("Salvo com sucesso!")
    if(sucess) navigate('/appuser/users/');
  }

  useEffect(() => {
    getUser(id, setUser);
  }, [id]);

  function handelInput (e) {
    e.preventDefault();
    const { name, value } = e.target;
    console.log(name, value);
    setUser({ ...user, [name]: value });
  };

  function handelSubmit(e) {
    e.preventDefault();
    
    // Se estiver ok, salva
    if (isValid(user)) {
      updateUser(letsGo, user);
    }
    else {
      const element = document.getElementById('mensagemValidacao');
      element.classList.add('error-msg');
    }
  }

  return userForm(user, handelInput, handelSubmit)
}

function DeleteButton({data}) {
  const navigate = useNavigate();

  function letsGo(sucess) {
    alert("Salvo com sucesso!")
    if(sucess) navigate('/appuser/users/');
  }

  function handleClick(e) {
    e.preventDefault();
    deleteUser(letsGo, data.id)
  }
  
  if (data.id)
    return (<button id="btnDelete" className="button" onClick={handleClick}>Excluir permanentemente</button>)
}

function BackButton() {
  const navigate = useNavigate();

  function letsBack(e) {
    e.preventDefault();
    navigate('/appuser/users/');
  }

  return (<button id="btnVoltar" className="button" onClick={letsBack}>Voltar à listagem</button>)
}

function userForm(user, handelInput, handelSubmit) {
  return (
    <section>
      <h3>Formulário para Cadastro de Usuário</h3>
      <form onSubmit={handelSubmit} className="form-entity">
        <div className="form-user-container">
          <div>
            <label htmlFor="username">
              * Username (5 ou mais caracteres)
            </label>
            <input
              type="text"
              id="username"
              name="username"
              value={user.username}
              onChange={handelInput}
            />
          </div>
          <br />
          <div>
            <label htmlFor="useremail">
              * Email (email válido, não pode ser vazio)
            </label>
            <input
              type="text"
              id="useremail"
              name="useremail"
              value={user.useremail}
              onChange={handelInput}
            />
          </div>
          <br />
          <div>
            <label htmlFor="password">
              * Senha (deve conter de 5 até 20 caracteres)
            </label>
            <input
              type="password"
              id="password"
              name="password"
              value={user.password}
              onChange={handelInput}
            />
          </div>
          <p id="mensagemValidacao">* Os campos devem ser preenchidos conforme orientação</p>
          <br />
          <button id="btnSalvar" className="button" type="submit">Salvar</button>
          <BackButton />
          <DeleteButton data={user} />
        </div>
      </form>
    </section>
  )
}

export {
  UsersList,
  UserEdit,
  UserNew
}