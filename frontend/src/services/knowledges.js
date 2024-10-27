import axios from "axios"
import RESPONDEAI_API_URL from "./conf";
import { sessionGetToken } from "../session";


const respndeAIAPI = axios.create({ baseURL: RESPONDEAI_API_URL })

function getKnowledges(setData) {

  respndeAIAPI.get('/knowledges',
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

function getKnowledge(id, setData) {

  respndeAIAPI.get(`/knowledges/${id}`,
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

function saveKnowledge(canDoAction, knowledge) {

  respndeAIAPI.post('/knowledges', knowledge, 
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

function updateKnowledge(isDoAction, knowledge) {

  respndeAIAPI.put('/knowledges', knowledge, 
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

function deleteKnowledge(isDoAction, id) {

  respndeAIAPI.delete(`/knowledges/${id}`,
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
  getKnowledges,
  getKnowledge,
  updateKnowledge,
  saveKnowledge,
  deleteKnowledge
} 