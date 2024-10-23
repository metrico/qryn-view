import { Plugin } from "../types";
import { nanoid } from "nanoid";

import { WebVitals } from "./WebVitals";

export const WebVitalsPlugin: Plugin = {
    name: "Monitor Web Vitals",
    section: "Status Bar",
    id: nanoid(),
    Component: WebVitals,
    description: "Web vitals for qryn-view",
    active: false,
    visible: false,
    roles: ["admin", "user", "guest", "superAdmin"],
};
