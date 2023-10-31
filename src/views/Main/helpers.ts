import axios, { AxiosError, AxiosResponse } from "axios";
import { getDsHeaders } from "../../components/QueryBuilder/Operations/helpers";
import setDataSources from "../DataSources/store/setDataSources";
import { setShowDataSourceSetting } from "./setShowDataSourceSetting";


// updateDataSources:

export function updateDataSourcesWithUrl(
    dispatch: any,
    url: any,
    cookies: any,
    haveUrl: any,
    haveCookies: any,
    dataSources: any
) {
    let apiUrl = "";
    let basicAuth = false;
    let urlApi = false;
    let cookieAuth: any = {};

    if (haveUrl) {
        urlApi = true;
    }

    if (haveCookies) {
        let [auth, dsData] = cookies.split("@");
        let cookieDsData = "";
        if (dsData && dsData !== "") {
            try {
                if (typeof cookieDsData === "object" && cookieDsData["url"]) {
                    apiUrl = cookieDsData["url"];
                    haveUrl = true;
                    urlApi = true;
                }
            } catch (e) {
                console.log(e);
            }
        }

        let [user, pass] = auth.split(":");

        if (user !== "" && pass !== "") {
            cookieAuth = { user, password: pass };
            basicAuth = true;
        }
    }

    if (!haveUrl && basicAuth) {
        apiUrl = window.location.protocol + "//" + window.location.host;
        urlApi = true;
    }

    if (apiUrl === "") {
        urlApi = true;
        apiUrl = decodeURIComponent(url);
    }

    const dsCP = [...dataSources];
    const prevDs = JSON.parse(JSON.stringify(dsCP));

    const newDs = prevDs?.map((m: any) => ({
        ...m,
        url: urlApi ? apiUrl : m.url,
        auth: {
            ...m.auth,
            basicAuth: { ...m.auth.basicAuth, value: basicAuth },
            fields: {
                ...m.auth.fields,
                basicAuth: basicAuth
                    ? [...m.auth.fields.basicAuth]?.map((ba) => {
                          if (ba.name === "user") {
                              return { ...ba, value: cookieAuth.user };
                          }
                          if (ba.name === "password") {
                              return { ...ba, value: cookieAuth.password };
                          }
                          return ba;
                      })
                    : [...m.auth.fields.basicAuth],
            },
        },
    }));

    if (cookies && cookieAuth) {
        dispatch(setShowDataSourceSetting(false));
    }

    localStorage.setItem("dataSources", JSON.stringify(newDs));
    dispatch(setDataSources(newDs));
}

export const getAxiosConf = (datasource: any) => {
    let conf: any = {};
    let cors = datasource?.cors || false;
    let extraheaders = getDsHeaders(datasource);
    const headers = {
        ...extraheaders,
        "Content-Type": "application/json",
        Accept: "application/json",
    };

    const options: any = {
        method: "GET",
        headers: headers,
    };
    if (cors === true) {
        options.mode = "cors";
    }
    conf.options = options;
    conf.headers = headers;
    conf.validateStatus = (status: number) => {
        return (
            (status >= 200 && status < 400) || status === 404 || status === 500
        );
    };
    return conf;
};

export const getReadyResponse = async (url: string, conf: any, response: any) =>
    await axios
        .get(`${url}/ready`, conf)
        .then((res: AxiosResponse) => {
            if (res && res?.status && res?.headers) {
                response = {
                    status: res.status,
                    contentType: res?.headers?.["content-type"],
                    contentLength: res?.headers?.["content-length"],
                };
                return response;
            }
        })
        .catch((e: AxiosError) => {
            return e;
        })
        .finally(() => {
            return response;
        });

type AuthParams = {
    username: string;
    password: string;
};

export async function checkLocalAPI(
    url: string,
    datasource: any,
    auth?: AuthParams,
    isAuth?: boolean
): Promise<boolean> {
    let response: any = {};
    let conf = getAxiosConf(datasource);
    let opts: any = { ...conf };

    if (auth?.username !== "" && isAuth) {
        opts.auth = auth;
    }

    return new Promise(async (resolve, rej) => {
        try {
            let res = await getReadyResponse(url, opts, response);

            response = res;
        } catch (e: any) {
            rej(false);
        } finally {
            if (
                response &&
                response?.status === 200 &&
                (response?.contentType.includes("application/json") ||
                    response?.contentLength === "0")
            ) {
                resolve(true);
            } else {
                rej(false);
            }
        }
    });
}

export async function updateDataSourcesFromLocalUrl(
    dataSources: any,
    dispatch: Function,
    navigate: Function
) {
    const location = window.location.origin;
    const logsDs = dataSources.find((f: any) => f.type === "logs");
    const isBasicAuth = logsDs?.auth?.basicAuth?.value;
    let auth = { username: "", password: "" };
    let basicAuthFields = logsDs?.auth?.fields?.basicAuth;
    const isBasicAuthFields = basicAuthFields?.length > 0;
    if (isBasicAuth && isBasicAuthFields) {
        for (let field of basicAuthFields) {
            if (field?.name === "user") {
                auth.username = field?.value || "";
            }
            if (field?.name === "password") {
                auth.password = field?.value || "";
            }
        }
    }

    let dsReady = false;

    let isLocalReady = false;

    if (logsDs?.url !== "") {

        dsReady = await checkLocalAPI(logsDs.url, logsDs, auth, isBasicAuth); // add the auth in here

        if (!dsReady) {
            isLocalReady = await checkLocalAPI(location, logsDs);

            if (isLocalReady && !dsReady) {
                const dsCP = [...dataSources];
                const prevDs = JSON.parse(JSON.stringify(dsCP));

                const newDs = prevDs?.map((m: any) => ({
                    ...m,
                    url: location,
                }));
                localStorage.setItem("dataSources", JSON.stringify(newDs));
                dispatch(setDataSources(newDs));
            } else if (!dsReady && !isLocalReady) {
                navigate("datasources");
            }
        }
    }
}
