import axios from "axios";
import { environment } from "../environment/env.dev";
import errorInterceptor from "./error.interceptor";
const httpClient = axios.create({
baseURL: environment.API_URL,
});
errorInterceptor(httpClient);
export default httpClient;