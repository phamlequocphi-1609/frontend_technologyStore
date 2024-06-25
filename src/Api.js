import axios from "axios";

export default axios.create({
  baseURL: `http://localhost:8800/my-shop/public/api`,
});
