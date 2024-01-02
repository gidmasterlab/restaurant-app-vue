import axios from "axios";
import router from "@/router";
import useMock from "@/mocks/Adapter";

const httpClient = axios.create({
	// baseURL: "add your env variable right here to connect with the API",
	timeout: 5000
});

httpClient.interceptors.request.use(async (request) => {
	// You can modify the request config here, so you can add headers with the access token for instance.
	// request.headers.Authorization = `Bearer ${accessToken}`;
	return request;
});

httpClient.interceptors.response.use(
	(response) => {
		// Any status code that lie within the range of 2xx cause this function to trigger
		// Right here you can parse the response and convert it to a standard type.
		return response.data;
	},
	(error) => {
		// Any status codes that falls outside the range of 2xx cause this function to trigger
		// As we're using a standard for API response using ResponseType, right here we should pass just the response data as error to the custom error page
		const response = error.response.data;
		const status = error.response.status;

		router.push(`/error/${status}`);
		return Promise.reject(response);
	}
);

export default useMock(httpClient);
