import axios from "axios";
import { environment } from "../environment/env.dev";
import errorInterceptor from "./error.interceptor";
const httpClient = axios.create({
baseURL: environment.apiUrl,
});
errorInterceptor(httpClient);
export default httpClient;