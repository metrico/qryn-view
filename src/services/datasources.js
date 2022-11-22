export function DerivedFiled() {
    this.name = "";
    this.regex = /^.*?traceI[d|D]=(\w+).*$/;
    this.query = "";
    this.urlLabel = "";
    this.internalLink = false;
    this.internalLinkOpt = "Tempo";
    this.errors = new Map();

    this.setName = (name) => {
        this.name = name;
    };

    this.getName = () => {
        return this.name;
    };

    this.setRegex = (regex) => {
        this.regex = regex;
    };

    this.getRegex = () => {
        return this.regex;
    };

    this.setQuery = (query) => {
        this.query = query;
    };

    this.getQuery = () => {
        return this.query;
    };

    this.setUrlLabel = (urlLabel) => {
        this.urlLabel = urlLabel;
    };

    this.getUrlLabel = () => {
        return this.urlLabel;
    };

    this.setInternalLink = (internalLink) => {
        this.internalLink = internalLink;
    };

    this.getInternalLink = () => {
        return this.internalLink;
    };

    this.setInternalLinkOpt = (internalLinkOpt) => {
        this.internalLinkOpt = internalLinkOpt;
    };

    this.getInternalLinkOpt = () => {
        return this.internalLinkOpt;
    };

    this.setError = (key, val) => {
        this.errors.set(key, val);
    };

    this.getError = (key) => {
        return this.errors.get(key);
    };

    this.setData = (derivedFields) => {
        const { name, regex, query, urlLabel, internalLink, internalLinkOpt } =
            derivedFields;

        this.setName(name);
        this.setRegex(regex);
        this.setQuery(query);
        this.setUrlLabel(urlLabel);
        this.setInternalLink(internalLink);
        this.setInternalLinkOpt(internalLinkOpt);
    };

    this.getData = () => {
        return {
            name: this.name,
            regex: this.regex,
            query: this.query,
            urlLabel: this.urlLabel,
            internalLink: this.internalLink,
            internalLinkOpt: this.internalLinkOpt,
            errors: this.errors,
        };
    };
}

export function DataSource() {
    this.url = "";
    this.name = "";
    this.errors = new Map();
    this.derived_fields = new Map();
    this.getUrl = () => {
        return this.url;
    };
    this.getName = () => {
        return this.name;
    };

    this.setError = (id, msg) => {
        if (typeof msg === "string" && typeof id === "string")
            this.errors.set(id, msg);
    };
    this.removeError = (id) => {
        this.errors.delete(id);
    };
    this.getError = (id) => {
        return this.errors.get(id) || null;
    };
    this.setUrl = (url) => {
        if (typeof url !== "string") {
            this.setError("url", "Datasource URL Should be a String");
            return;
        }

        const urlError = this.getError("url");
        if (urlError !== null) {
            this.errors.delete("url");
        }

        this.url = url;
    };
    this.setName = (name) => {
        if (typeof name !== "string") {
            this.setError("name", "Datasource Name Should be a String");
            return;
        }
        const nameError = this.getError("name");
        if (nameError !== null) {
            this.errors.delete("name");
        }

        this.name = name;
    };

    this.setDerivedFields = (dv) => {
        const df = new DerivedFiled().setData(dv);
        if (df) {
            this.derived_fields = new Map(df.name,df);
        }
    };
    this.getDerivedFields = () => {
        return Object.fromEntries(this.derived_fields);
    };
}
