import axios from "axios"
import RESPONDEAI_API_URL from "./conf";
import { sessionLoginUser } from "../session";

const respndeAIAPI = axios.create({ baseURL: RESPONDEAI_API_URL })

function loginUser(canDoAction, user) {

    respndeAIAPI.post('/login', user)
      .then(function (response) {

        sessionLoginUser(
            user.username,
            response.data.data.token
        );

        canDoAction(true);
      })
      .catch(function (error) {
        canDoAction(false);
      })
  }

  export default loginUser