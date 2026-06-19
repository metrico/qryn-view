import styled from "@emotion/styled";
import { css } from "@emotion/css";
import { useCallback, useState, useMemo, useEffect, useRef } from "react";
import { createEditor, Text } from "slate";
import { Slate, Editable, withReact } from "slate-react";
import { withHistory } from "slate-history";
import Prism from "./prism";
import { normalizeSlateValue } from "./slateValue";
import { ThemeProvider } from "@emotion/react";
import useTheme from "@ui/theme/useTheme";
const CustomEditor = styled(Editable)`
    flex: 1;
    background: ${({ theme }: any) => theme.deep};
    border: 1px solid ${({ theme }: any) => theme.accentNeutral};
    color: ${({ theme }: any) => theme.contrast};
    padding: 4px 8px;
    font-size: 12px;
    font-family: monospace;
    margin: 0px 5px;
    border-radius: 3px;
    line-height: 1.5;
    line-break: anywhere;
    overflow-y: scroll;
`;

const QueryBar = styled.div`
    display: flex;
    align-items: center;
    flex: 1;
    max-width: 100%;
`;

function Leaf({ attributes, children, leaf }: any) {
    const theme = useTheme();
    return (
        <span
            {...attributes}
            className={css`
                font-family: monospace;
                // background: black;
                ${leaf.comment &&
                css`
                    color: blue;
                `}
                ${(leaf.operator || leaf.url) &&
                css`
                    color: ${theme.lightContrast};
                `}
        ${leaf.keyword &&
                css`
                    color: #57aed4;
                `}
        ${(leaf.variable || leaf.regex) &&
                css`
                    color: #e90;
                `}
        ${(leaf.number ||
                    leaf.boolean ||
                    leaf.tag ||
                    leaf.constant ||
                    leaf.symbol ||
                    leaf["attr-name"] ||
                    leaf.selector) &&
                css`
                    color: #dd4a68;
                `}
        ${leaf.punctuation &&
                css`
                    color: orange;
                `}
        ${(leaf.string || leaf.char) &&
                css`
                    color: green;
                `}
        ${(leaf.function || leaf["class-name"] || leaf["attr-name"]) &&
                css`
                    color: #dd4a68;
                `}
          ${leaf["context-labels"] &&
                css`
                    color: orange;
                `}
          ${leaf["label-key"] &&
                css`
                    color: green;
                `}
            `}
        >
            {children}
        </span>
    );
}

export function getTokenLength(token: any) {
    if (typeof token === "string") {
        return token?.length;
    }

    if (typeof token?.length === "number") {
        return token.length;
    }

    if (typeof token?.content === "string") {
        return token?.content.length;
    }

    if (Array.isArray(token?.content)) {
        return token.content.reduce((l: any, t: any) => l + getTokenLength(t), 0);
    }

    if (token?.content) {
        return getTokenLength(token.content);
    }

    return 0;
}

export default function QueryEditor({
    onQueryChange,
    value,
    defaultValue,
    onKeyDown,
}: // wrapperRef
any) {

    const theme = useTheme();
    const renderLeaf = useCallback((props) => <Leaf {...props} />, []);
    const editor = useMemo(
        () => withHistory(withReact(createEditor() as any)),
        []
    );
    const ref = useRef(null);
    const [language] = useState("sql");

    const decorate = useCallback(
        ([node, path]: any) => {
            const ranges: any[] = [];
            if (
                !Text.isText(node) ||
                typeof node.text !== "string" ||
                node.text.length < 1
            ) {
                return ranges;
            }
            const grammar = Prism.languages[language];
            if (!grammar) {
                return ranges;
            }

            const tokens = Prism.tokenize(node.text, grammar);
            let start = 0;
            for (const token of tokens) {
                const length = getTokenLength(token);
                if (!Number.isFinite(length) || length <= 0) {
                    continue;
                }

                const end = start + length;

                if (end > node.text.length) {
                    break;
                }

                if (typeof token !== "string") {
                    ranges.push({
                        [token.type]: true,
                        anchor: { path, offset: start },
                        focus: { path, offset: end },
                    });
                }
                start = end;
            }
            return ranges;
        },
        [language]
    );

    const [editorValue, setEditorValue] = useState(() =>
        normalizeSlateValue(value ?? defaultValue)
    );

    useEffect(() => {
        const nextValue = normalizeSlateValue(value ?? defaultValue);
        setEditorValue(nextValue);
        editor.children = nextValue;
    }, [defaultValue, editor, value]);

    return (
        <ThemeProvider theme={theme}>
            <QueryBar ref={ref}>
                <Slate
                    editor={editor}
                    initialValue={editorValue}
                    onChange={onQueryChange}
                >
                    <CustomEditor
                        decorate={decorate}
                        renderLeaf={renderLeaf}
                        placeholder={""}
                        onKeyDown={onKeyDown}
                        spellCheck="false"
                    />
                </Slate>
            </QueryBar>
        </ThemeProvider>
    );
}
