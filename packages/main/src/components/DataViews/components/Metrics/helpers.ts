export function getDsHeaders(dataSource: any) {
    let headerObj = {};
    if (dataSource?.headers?.length > 0) {
        for (let header of dataSource.headers) {
            const Obj = { [String(header["header"])]: header["value"] };
            headerObj = { ...headerObj, ...Obj };
        }
    }
    return headerObj;
}

export function getHeaders(dataSource: any) {
    let extraheaders = getDsHeaders(dataSource);
    const options = {
        method: "GET",
    };

    const basicAuth = dataSource?.auth?.basicAuth.value;

    let reqHeaders: any = {};

    let auth: any = {};

    if (basicAuth) {
        const authfields = dataSource?.auth?.fields?.basicAuth;

        for (let field of authfields) {
            if (field.name === "user") {
                auth.username = field.value;
            }
            if (field.name === "password") {
                auth.password = field.value;
            }
        }

        reqHeaders.auth = auth;
    }

    reqHeaders.options = options;
    reqHeaders.headers = {
        ...extraheaders,
        "Content-Type": "application/json",
    };

    return reqHeaders;
}
