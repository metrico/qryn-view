import axios from "axios";
import { getDsHeaders } from "@ui/main/src/components/QueryBuilder/Operations/helpers";
import store  from "@ui/store/store";
import { errorHandler } from "./errorHandler";
import { setApiError } from "./setApiError";

export default function loadLabelValues(
    id: any,
    label: any,
    labelList: string = "",
    url: any
) {
    if (!label || (label?.length <= 0 && label.lsList.length <= 0)) {
        return () => {};
    }

    const { dataSources } = store.getState();

    const actDataSource = dataSources.find((f: any) => f.id === id);

    const basicAuth = actDataSource?.auth?.basicAuth.value;

    let auth: any = {};

    let labelHeaders: any = {};

    if (basicAuth) {
        const authfields = actDataSource?.auth?.fields?.basicAuth;

        for (let field of authfields) {
            if (field.name === "user") {
                auth.username = field.value;
            }
            if (field.name === "password") {
                auth.password = field.value;
            }
        }

        labelHeaders.auth = auth;
    }

    const extraheaders = getDsHeaders(actDataSource);

    const headers = {
        ...extraheaders,
        "Content-Type": "application/json",
    };

    const options = {
        method: "GET",
        headers: headers,
    };

    labelHeaders.options = options;
    if (url) {
        return async (dispatch: Function) => {
            await axios
                .get(
                    `${url}/loki/api/v1/label/${label.name}/values`,
                    labelHeaders
                )
                ?.then((response) => {
                    if (response?.data?.data) {
                        const values = response?.data?.data?.map?.(
                            (value: any) => ({
                                label: label.name,
                                name: value,
                                selected: false,
                                inverted: false,
                            })
                        );

                        return values;
                    } else if (!response) {
                        dispatch(setApiError("URL NOT FOUND"));

                        return [];
                    }
                    dispatch(setApiError(""));
                    return response?.data?.data;
                })
                .catch((error) => {
                    const { message } = errorHandler(url);
                    dispatch(setApiError(message || "API NOT FOUND"));

                    console.log(error);
                    return [];
                });
        };
    }
    return [];
}
