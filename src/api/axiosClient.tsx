import axios from "axios";

const axiosClient = axios.create({
  baseURL: "https://jsonplaceholder.typicode.com", // برای کاربران تست
  headers: {
    "Content-Type": "application/json",
  },
});

export default axiosClient;
