export default function queryInit(query: any) {
    return (
        query.split(/[  ]+/).map((m: any) => ({
            type: "paragraph",
            children: [
                {
                    text: m,
                },
            ],
        })) || [
            {
                type: "paragraph",
                children: [
                    {
                        text: "Enter a cLoki Query",
                    },
                ],
            },
        ]
    );
}
