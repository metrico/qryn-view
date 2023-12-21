import { Plugin } from "../types";
import { nanoid } from "nanoid";
import { Cardinality } from "./Cardinality";



export const CardinalViewPlugin: Plugin = {
    name: "Cardinality View",
    section: "Query Item",
    id: nanoid(),
    Component: Cardinality,
    description: "A cardinality view for labels",
    active: false,
    visible:true,
    roles: ["admin", "superAdmin"],
};
