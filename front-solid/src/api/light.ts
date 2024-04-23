import axios from "axios";

export const lightApi = axios.create({
  baseURL: 'http://localhost:8000',
  timeout: 10000,
  headers: {'Content-Type': 'application/json'}
});

export const lqsApi = axios.create({
  baseURL: 'http://localhost:5000',
  timeout: 10000,
  headers: {'Content-Type': 'application/json'}
});
