import DOMPurify from "isomorphic-dompurify";
import { setLeftPanel, setRightPanel } from "./actions";
import sanitizeWithSigns from '../../helpers/sanitizeWithSigns'
export default function queryInit(query: any) {
    return query.split(/[  ]+/).map((m: any) => ({
        type: "paragraph",
        children: [
            {
                text: sanitizeWithSigns(m),
            },
        ],
    })) || [
        {
            type: "paragraph",
            children: [
                {
                    text: DOMPurify.sanitize("Enter a cLoki Query"),
                },
            ],
        },
    ];
}

export function onQueryValid(query: any) {
    return (
        query &&
        query !== "{" &&
        query !== "}" &&
        query !== "{}" &&
        query !== "" &&
        query?.length >= 7
    ); // TODO: make a proper query validation
}

export function panelAction(name: any, value: any) {
    if (name === "left") {
        return setLeftPanel(value);
    }
    return setRightPanel(value);
}