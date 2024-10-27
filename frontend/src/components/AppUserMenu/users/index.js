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
    saveUser(letsGo, user)
  }  
  
  return userForm(user, handelInput, handelSubmit)
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
    console.log(user)
    updateUser(letsGo, user)
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
    return (<button className="button" onClick={handleClick}>Excluir permanentemente</button>)
}

function BackButton() {
  const navigate = useNavigate();

  function letsBack(e) {
    e.preventDefault();
    navigate('/appuser/users/');
  }

  return (<button className="button" onClick={letsBack}>Voltar à listagem</button>)
}

function userForm(user, handelInput, handelSubmit) {
  return (
    <section>
      <form onSubmit={handelSubmit} className="form-entity">
        <div className="form-user-container">
          <div>
            <label>
              Username
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
            <label>
              Email
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
            <label>
              Senha
            </label>
            <input
              type="text"
              id="password"
              name="password"
              value={user.password}
              onChange={handelInput}
            />
          </div>
          <br />
          <button className="button" type="submit">Salvar</button>
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