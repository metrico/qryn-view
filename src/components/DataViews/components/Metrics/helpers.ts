export function getHeaders(dataSource) {
    const options = {
        method: "GET",
        headers: { "Content-Type": "application/json" },
    };

    const basicAuth = dataSource?.auth?.basicAuth.value;

    let reqHeaders = {};

    let auth = {};

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
