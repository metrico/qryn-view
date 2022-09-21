interface DataSourceHeader {
    name: string;
    isDefault: boolean;
}

interface HTTPHeaders {
    url: string;
    allowedCookies: string[];
    timeOut: number;
}

interface DatasourceAuth {
    basicAuth: boolean;
    withCredentials: boolean;
    TLSClientAuth: boolean;
    withCACert: boolean;
    skipTLSVerify: boolean;
    forwardOAuthIdentity: boolean;
}

interface CustomHTTPHeader {
    header: string;
    value: string; // this one should be a password type field
}

interface SettingsAlerting {
    manageAlertsViaAlertingUI: boolean;
    alertManagerDataSource: string;
    maximumLines: number;
}

interface LinkedField {
    name: string;
    regex: RegExp;
    query: string;
    url: string; // internal link switch: true: query, false: url
    urlLabel: string;
    internalLink: boolean;
    dataSource: string;
}

export class LogsDataSource {

    get datasourceHeader():DataSourceHeader {
        return this.datasourceHeader
    }

    set datasourceHeader(val:DataSourceHeader) {
        this.datasourceHeader = val
    }

    get httpHeaders():HTTPHeaders {
        return this.httpHeaders
    }

    set httpHeaders(val:HTTPHeaders) {
        this.httpHeaders = val
    }

    get dataSourceAuth():DatasourceAuth {
        return this.dataSourceAuth
    }

    set dataSourceAuth(val:DatasourceAuth) {
        this.dataSourceAuth = val
    }

    get customHTTPHeader():CustomHTTPHeader {
        return this.customHTTPHeader
    }

    set customHTTPHeader(val:CustomHTTPHeader) {
        this.customHTTPHeader = val
    }

    get settingsAlerting():SettingsAlerting {
        return this.settingsAlerting;
    }

    set settingsAlerting(val:SettingsAlerting) {
        this.settingsAlerting = val;
    }

    get linkedFileds():LinkedField[] {
        return this.linkedFileds
    }
    set linkedFields(val:LinkedField[]) {
        this.linkedFields = val
    }

    constuctor(){
        this.datasourceHeader = { name: "Logs", isDefault: false };

        this.httpHeaders = {
            url: "http://logs:3100",
            allowedCookies: [],
            timeOut: 0,
        };

        this.dataSourceAuth = {
            basicAuth: false,
            withCredentials: false,
            TLSClientAuth: false,
            withCACert: false,
            skipTLSVerify: false,
            forwardOAuthIdentity: false,
        };

    

        this.customHTTPHeader = {
            header: "",
            value: "",
        };
        this.settingsAlerting = {
            manageAlertsViaAlertingUI: false,
            alertManagerDataSource: "",
            maximumLines: 1000,
        };
    
        this.linkedFields = [
            {
                name: "traceId",
                regex: /^.*?traceI[d|D]=(\w+).*$/,
                query: "${__value.raw}",
                url: "",
                urlLabel: "",
                internalLink: true,
                dataSource: "Tempo",
            },
            {
                name: "traceID",
                regex: /^.*?"traceID":"(\w+)".*$/,
                query: "${__value.raw}",
                url: "",
                urlLabel: "",
                internalLink: true,
                dataSource: "Tempo",
            },
        ];
    }



    setLinkField(val:LinkedField) {
        this.linkedFields = [...this.linkedFields, val]
    }

}
