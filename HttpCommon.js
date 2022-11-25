import axios from "axios";

export default axios.create({
  baseURL: "https://api.smartcampus.my.id/public",
  headers: {
    "Content-type": "application/json"
  }
});