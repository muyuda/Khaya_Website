// api/axiosClient.ts
import axios from 'axios';

const axiosClient = axios.create({
  baseURL: 'http://localhost:8080/v1',
  timeout: 10000, // 10 seconds
  headers: {
    'Content-Type': 'application/json',
  },
});

export default axiosClient;