const EMPTY_SLATE_VALUE = [
    {
        type: "paragraph",
        children: [{ text: "" }],
    },
];

export const normalizeText = (value: any) => {
    if (value === undefined || value === null) {
        return "";
    }

    return typeof value === "string" ? value : String(value);
};

const normalizeLeaf = (child: any) => {
    const { children: _children, text: _text, ...marks } = child ?? {};

    return {
        ...marks,
        text: normalizeText(child?.text),
    };
};

export function normalizeSlateValue(value: any) {
    if (typeof value === "string") {
        return createSlateValue(value);
    }

    if (!Array.isArray(value) || value.length === 0) {
        return EMPTY_SLATE_VALUE;
    }

    return value.map((node) => {
        const children =
            Array.isArray(node?.children) && node.children.length > 0
                ? node.children.map(normalizeLeaf)
                : [{ text: normalizeText(node?.text) }];

        const { text: _text, ...rest } = node ?? {};

        return {
            type: "paragraph",
            ...rest,
            children,
        };
    });
}

export function createSlateValue(text: any) {
    return [{ type: "paragraph", children: [{ text: normalizeText(text) }] }];
}
