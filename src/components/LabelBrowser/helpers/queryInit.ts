import DOMPurify from "isomorphic-dompurify";
export default function queryInit(query: any) {
    return (
        query.split(/[  ]+/).map((m: any) => ({
            type: "paragraph",
            children: [
                {
                    text: DOMPurify.sanitize(m),
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
        ]
    );
}
