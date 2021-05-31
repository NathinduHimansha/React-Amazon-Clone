import axios from "axios";

const instance = axios.create({
  //API URL(GOOGLE CLOUD FUNCTIONS)
  baseURL: "https://us-central1-clone-f364c.cloudfunctions.net/api",

  //LOCALHOST
  //baseURL: "http://localhost:5001/clone-f364c/us-central1/api",
});

export default instance;
