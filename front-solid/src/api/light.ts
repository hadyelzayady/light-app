import axios from "axios";
import { LQS_URL, TOP_SORT_URL } from "../constants/urls";

export const lightApi = axios.create({
	baseURL: TOP_SORT_URL,
	timeout: 10000,
	headers: { "Content-Type": "application/json" },
});

export const lqsApi = axios.create({
	baseURL: LQS_URL,
	timeout: 10000,
	headers: { "Content-Type": "application/json" },
});
