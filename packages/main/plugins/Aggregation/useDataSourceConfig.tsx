import { useMemo } from "react";

const useDataSourceConfig = (ds: any) => {
    return useMemo(() => {
        const { auth } = ds;
        let headersMap = ds.headers?.map((k: any) => ({ [k.header]: k.value }));
        let headers: any = {};

        for (let header of headersMap) {
            let entries: any = Object.entries(header)[0];
            headers[entries[0]] = entries[1];
        }
        const config: any = { headers };
        const hasBasicAuth = auth.basicAuth.value;

        if (hasBasicAuth) {
            const {
                fields: {
                    basicAuth: [us, pw],
                },
            } = auth;
            const username = us.value;
            const password = pw.value;
            config.auth = { username, password };
        }

        return config;
    }, [ds]);
};

export default useDataSourceConfig;
