import axios from "axios"
import RESPONDEAI_API_URL from "./conf";

const respndeAIAPI = axios.create({ baseURL: RESPONDEAI_API_URL })

function answer(q, setData) {

  respndeAIAPI.post('/answer', { question: q })
    .then(function (response) {
      setData(response.data)
      console.log(response.data);
    })
    .catch(function (error) {
      console.error(error);
    })
}

export default answer