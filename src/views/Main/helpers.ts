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

    return new Promise(async (resolve) => {
        try {
            let res = await getReadyResponse(url, opts, response);

            response = res;
        } catch (e: any) {
            resolve(false);
        } finally {
            if (response && response?.status === 200) {
                resolve(true);
            } else {
                resolve(false);
            }
        }
    });
}

// provision the basic auth fields data
export function basicAuthChecker(auth: any) {
    let authParams = { username: "", password: "" };

    const isBasicAuth = auth?.basicAuth?.value;

    const basicAuthFields = auth?.fields?.basicAuth;

    const isBasicAuthFields = basicAuthFields?.length > 0;

    if (isBasicAuth && isBasicAuthFields) {
        for (let field of basicAuthFields) {
            if (field?.name === "user") {
                authParams.username = field?.value || "";
            }
            if (field?.name === "password") {
                authParams.password = field?.value || "";
            }
        }
    }

    return {
        isBasicAuth,
        auth: authParams,
    };
}

export function setLocalDataSources(datasources: any) {
    // we could check datasources when typed in here
    localStorage.setItem("dataSources", JSON.stringify(datasources));
}

export function updateDataSourcesUrl(cb: Function, prevData: any, url: any) {
    // 1- take datasources
    const dsCP = [...prevData];

    // 2 - copy as previous
    const prevDs = JSON.parse(JSON.stringify(dsCP));

    // 3- update datasources value with new source
    const newDs = prevDs?.map((m: any) => ({
        ...m,
        url,
    }));

    // update localstorage datasources
    setLocalDataSources(newDs);
    // update datasources at store
    cb(setDataSources(newDs));
}

export async function updateDataSourcesFromLocalUrl(
    dataSources: any,
    dispatch: Function,
    navigate: Function
) {
    // current location
    const location = window.location.origin;

    let dsReady = false;

    const logsDs = dataSources.find((f: any) => f.type === "logs");

    const {
        isBasicAuth, // check if it has a basic auth
        auth, // provisions auth params
    } = basicAuthChecker(logsDs?.auth);

    if (logsDs?.url === "") {
        dsReady = await checkLocalAPI(logsDs.url, logsDs, auth, isBasicAuth); // add the auth in here

  

        if (dsReady) {
            updateDataSourcesUrl(dispatch, dataSources, location);
        } else {
            navigate("datasources");
        }
    } else {
        let dsReady = await checkLocalAPI(
            logsDs.url,
            logsDs,
            auth,
            isBasicAuth
        ); // add the auth in here

        if (!dsReady) {
            navigate("datasources");
        }
    }
}
