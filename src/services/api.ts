import axios from "axios";
import { getToken, signOut } from "./Auth";
import { createHashHistory } from "history";
const history = createHashHistory();

export const api = axios.create({
    baseURL: 'http://localhost:3333/',
})

api.interceptors.request.use(
	async config => {
		const token = getToken();

		if (token) config.headers.Authorization = `Bearer ${token}`;

		return config;
	},
	error => {
		return Promise.reject(error);
	}
);

api.interceptors.response.use(
	async response => {
		return response;
	},
	error => {
		if (error.response && error.response.status === 401) {
			signOut();

			history.push('/login')
		}

		return Promise.reject(error);
	}
);
