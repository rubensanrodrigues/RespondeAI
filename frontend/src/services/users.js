import axios from "axios"
import RESPONDEAI_API_URL from "./conf";
import { sessionGetToken } from "../session";

const respndeAIAPI = axios.create({ baseURL: RESPONDEAI_API_URL })

function getUsers(setData) {
  

  respndeAIAPI.get('/users',
    {
      headers: {
        'Authorization': sessionGetToken()
      }
    })
    .then(function (response) {
      setData(response.data.data);
    })
    .catch(function (error) {
      console.error(error);
    })
}

function getUser(id, setData) {

  respndeAIAPI.get(`/users/${id}`,
    {
      headers: {
        'Authorization': sessionGetToken()
      }
    })
    .then(function (response) {
      setData(response.data.data);
    })
    .catch(function (error) {
      console.error(error);
    })
}

function saveUser(canDoAction, knowledge) {

  respndeAIAPI.post('/users', knowledge, 
    {
      headers: {
        'Authorization': sessionGetToken()
      }
    })
    .then(function (response) {
      canDoAction(true);
    })
    .catch(function (error) {
      console.error(error);
    })
}

function updateUser(isDoAction, knowledge) {

  respndeAIAPI.put('/users', knowledge, 
    {
      headers: {
        'Authorization': sessionGetToken()
      }
    })
    .then(function (response) {
      isDoAction(true);
    })
    .catch(function (error) {
      console.error(error);
    })
}

function deleteUser(isDoAction, id) {

  respndeAIAPI.delete(`/users/${id}`,
    {
      headers: {
        'Authorization': sessionGetToken()
      }
    })
    .then(function (response) {
      isDoAction(true)
    })
    .catch(function (error) {
      console.error(error);
    })
}

export {
  getUsers,
  getUser,
  updateUser,
  saveUser,
  deleteUser
} 