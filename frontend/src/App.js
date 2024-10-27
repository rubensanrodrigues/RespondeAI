import './App.css';
import AppUserMenu from './components/AppUserMenu';
import Header  from './components/Header'
import Main from './components/Main'
import {KnowledgeEdit, KnowledgeNew, KnowledgesList} from './components/AppUserMenu/knowledges';
import {UserEdit, UserNew, UsersList} from './components/AppUserMenu/users';
import {UserLogin} from './components/AppUserMenu/session';
import { sessionIsLoged } from './session';
import { Navigate } from 'react-router-dom';

function App() {
  return (
    <div className="App">
      <Header />
      <Main />
      <footer></footer>
    </div>
  );
}

function AppUser() {
  if (sessionIsLoged()) {
    return <Navigate to='/appuser/knowledges/' replace />;
  } else {
    return (
      <div className='App'>
        <div className='user-area'>
          <br />
          <h2>Área protegida!</h2>
          <b>Por favor faça seu login para prosseguir.</b>
          <br /><br />
          <UserLogin />
        </div>
      </div>
    );
  }
}

function AppUserKnowledges() {
  if (!sessionIsLoged()) {
    return <Navigate to='/appuser/' replace />;
  } else {
    return (
      <div className='App'>
        <div className='user-area'>
          <AppUserMenu />
          <KnowledgesList />
        </div>
      </div>
    );
  }
}

function AppUserKnowledgeEdit() {
  if (!sessionIsLoged()) {
    return <Navigate to='/appuser/' replace />;
  } else {
    return (
      <div className='App'>
        <div className='user-area'>
          <AppUserMenu />
          <KnowledgeEdit />
        </div>
      </div>
    );
  }
}

function AppUserKnowledgeNew() {
  if (!sessionIsLoged()) {
    return <Navigate to='/appuser/' replace />;
  } else {
    return (
      <div className='App'>
        <div className='user-area'>
          <AppUserMenu />
          <KnowledgeNew />
        </div>
      </div>
    );
  }
}

function AppUserUsers() {
  if (!sessionIsLoged()) {
    return <Navigate to='/appuser/' replace />;
  } else {
    return (
      <div className='App'>
        <div className='user-area'>
          <AppUserMenu />
          <UsersList />
        </div>
      </div>
    );
  }
}

function AppUserUsersEdit() {
  if (!sessionIsLoged()) {
    return <Navigate to='/appuser/' replace />;
  } else {
    return (
      <div className='App'>
        <div className='user-area'>
          <AppUserMenu />
          <UserEdit />
        </div>
      </div>
    );
  }
}

function AppUserUsersNew() {
  if (!sessionIsLoged()) {
    return <Navigate to='/appuser/' replace />;
  } else {
    return (
      <div className='App'>
        <div className='user-area'>
          <AppUserMenu />
          <UserNew />
        </div>
      </div>
    );
  }
}

export  {
  App,
  AppUser,
  AppUserKnowledges,
  AppUserKnowledgeEdit,
  AppUserKnowledgeNew,
  AppUserUsers,
  AppUserUsersEdit,
  AppUserUsersNew
}
