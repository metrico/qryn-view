export function DerivedFiled() {
    this.name = "";
    this.regex = /^.*?traceI[d|D]=(\w+).*$/
    this.query = "";
    this.urlLabel = "";
    this.internalLink = false;
    this.internalLinkOpt = "Tempo";
    this.errors = new Map();
    
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
        if (typeof url === "string") {
            const urlError = this.getError("url");
            if (urlError !== null) {
                this.errors.delete("url");
            }

            this.url = url;
        } else {
            this.setError("url", "Datasource URL Should be a String");
        }
    };
    this.setName = (name) => {
        if (typeof name === "string") {
            const nameError = this.getError("name");
            if (nameError !== null) {
                this.errors.delete("name");
            }

            this.name = name;
        } else {
            this.setError("name", "Datasource Name Should be a String");
        }
    };
}
