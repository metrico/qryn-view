export default function queryInit(query) {
    return (
        query.split(/[  ]+/).map((m) => ({
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
