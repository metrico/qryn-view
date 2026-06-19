import DOMPurify from "isomorphic-dompurify";
export default function queryInit(query: any) {
    const queryText = typeof query === "string" ? query : String(query ?? "");

    return queryText.split(/[  ]+/).map((m: any) => ({
        type: "paragraph",
        children: [
            {
                text: DOMPurify.sanitize(m),
            },
        ],
    })) || [
        {
            
            children: [
                {
                    text: DOMPurify.sanitize("Enter a cLoki Query"),
                },
            ],
        },
    ];
}
