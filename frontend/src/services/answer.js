import axios from "axios"

const answerAPI = axios.create({ baseURL: 'http://localhost:5000' })

function answer(q, setData) {

  answerAPI.post('/answer', { question: q })
    .then(function (response) {
      setData(response.data)
      console.log(response.data);
    })
    .catch(function (error) {
      console.error(error);
    })
}

export default answer