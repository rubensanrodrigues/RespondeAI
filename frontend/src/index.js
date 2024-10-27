import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import {App, AppUser, AppUserKnowledgeEdit, AppUserKnowledgeNew, AppUserKnowledges, AppUserUsers, AppUserUsersEdit, AppUserUsersNew} from './App';
import reportWebVitals from './reportWebVitals';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { UserLogout } from './components/AppUserMenu/session';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<App />} />
        <Route path='/appuser/' element={<AppUser />} />
        <Route path='/appuser/logout' element={<UserLogout />} />

        <Route path='/appuser/knowledges/' element={<AppUserKnowledges />} />
        <Route path='/appuser/knowledges/edit/:id' element={<AppUserKnowledgeEdit />} />
        <Route path='/appuser/knowledges/new' element={<AppUserKnowledgeNew />} />

        <Route path='/appuser/users/' element={<AppUserUsers />} />
        <Route path='/appuser/users/edit/:id' element={<AppUserUsersEdit />} />
        <Route path='/appuser/users/new' element={<AppUserUsersNew />} />
      </Routes>
    </BrowserRouter>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
