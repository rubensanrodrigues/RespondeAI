import { Navigate, useNavigate } from "react-router-dom";
import loginUser from "../../../services/session";
import { useState } from "react";
import { sessionLogoutUser } from "../../../session";

function UserLogin() {
  const navigate = useNavigate();
  const [msg, setMsg] = useState('')
  const [user, setUser] = useState({
    username: '',
    password: '',
  });

  function letsGo(sucess) {
    if (sucess) navigate('/appuser/knowledges/');
    else setMsg('Usuário ou senha inválidos!');
  }

  function handelInput(e) {
    e.preventDefault();
    const { name, value } = e.target;
    setUser({ ...user, [name]: value });
  };

  function handelSubmit(e) {
    e.preventDefault();
    loginUser(letsGo, user)
  }

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
              Senha
            </label>
            <input
              type="password"
              id="password"
              name="password"
              value={user.password}
              onChange={handelInput}
            />
          </div>
          <br />
          <span className="error-msg">{msg}&nbsp;</span>
          <br />
          <button className="button" type="submit">Login</button>
        </div>
      </form>
    </section>
  )
}

function UserLogout() {
  sessionLogoutUser();
  return <Navigate to='/appuser/' replace />;
}

export {
  UserLogin,
  UserLogout
} 