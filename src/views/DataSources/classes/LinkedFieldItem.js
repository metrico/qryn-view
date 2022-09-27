import { nanoid } from "nanoid";

export class LinkedFieldItem {
    constructor() {
        this.id = nanoid();
        this.dataSource = "Logs";
        this.ds_id = "logs";
        this.name = "traceID";
        this.regex = '^.*?"traceID" ="(w+)".*$/';
        this.query = "${__value.raw}";
        this.urlLabel = "";
        this.url = "";
        this.internalLink = true;
        this.linkType = "Traces";
    }

    create() {
        const {
            id,
            dataSource,
            ds_id,
            name,
            regex,
            query,
            urlLabel,
            url,
            internalLink,
            linkType,
        } = this;
        return {
            id,
            dataSource,
            ds_id,
            name,
            regex,
            query,
            urlLabel,
            url,
            internalLink,
            linkType,
        };
    }
}