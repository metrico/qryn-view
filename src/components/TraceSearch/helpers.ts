export function getHeaders(dataSource: any) {
    const options = {
        method: "GET",
        headers: { "Content-Type": "application/json" },
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

    return reqHeaders;
}
