import axios from "axios";

export const baseURL = "https://pan-backend.vercel.app";

export default axios.create({
  baseURL,
});
