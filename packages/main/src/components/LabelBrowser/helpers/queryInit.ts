import DOMPurify from "isomorphic-dompurify";
export default function queryInit(query: any) {
    return query.split(/[  ]+/).map((m: any) => ({
        
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
