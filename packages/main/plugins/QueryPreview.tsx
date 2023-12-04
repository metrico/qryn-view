import { cx, css } from "@emotion/css";
import  { useCallback, useEffect, useMemo, useState } from "react";
import Prism from "prismjs";
import "prismjs/components/prism-sql";
import { createEditor, Text } from "slate";
import { withHistory } from "slate-history";
import { Slate, Editable, withReact } from "slate-react";
import useTheme from '@ui/theme/useTheme';
import sanitizeWithSigns   from '@ui/helpers/sanitizeWithSigns'
interface Props {
    queryText: string;
    searchButton: any;
    logsRateButton?: any;
    queryInput?: any;
}

export const QueryPreviewContainer = (theme: any) => css`
    padding: 8px;
    display: flex;
    flex: 1;
    gap:4px;
    flex-direction: column;
    border-bottom: 1px solid ${theme.accentNeutral};
    background: ${theme.shadow};
    label {
        font-size: 11px;
        color: ${theme.contrast};

        padding: 4px 10px;
    }
    .action-buttons {
        display: flex;
        align-items: center;
        flex-direction: row;
        justify-content:flex-end;
        gap:2px;
    }
    @media (min-width: 420px) {
        flex-direction: row;
        align-items: center;
        &.action-buttons {
            margin-top: 0px;
        }
    }
`;

const CustomEditor = (theme: any) => css`
    flex: 1;
    background: ${theme.deep};
    color: ${theme.contrast};
    padding: 3px 6px;
    font-size: 12px;
    font-family: monospace;
    margin: 0px 5px;
    border-radius: 3px;
    line-height: 1.5;
    line-break: anywhere;
    overflow-y: scroll;
    @media (max-width: 420px) {
      margin:0px;
    }
`;
function Leaf({ attributes, children, leaf, theme }: any) {
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

    if (typeof token?.content === "string") {
        return token?.content.length;
    }

    return token?.content?.reduce((l: any, t: any) => l + getTokenLength(t), 0);
}

export default function QueryPreview(props: Props) {
    const theme = useTheme();

    const { queryText, searchButton, logsRateButton, queryInput } = props;
    const [initialValue, setInitialValue] = useState([
        {
            type: "paragraph",
            children: [{ text:  sanitizeWithSigns(queryText)}],
        },
    ]);

    const [language] = useState("sql");

    const decorate = useCallback(
        ([node, path]: any) => {
            const ranges: any[] = [];
            if (!Text.isText(node) || (node as any)?.length < 1) {
                return ranges;
            }
            const tokens = Prism.tokenize(node.text, Prism.languages[language]);
            let start = 0;
            for (const token of tokens) {
                const length = getTokenLength(token);
                const end = start + length;

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

    const renderLeaf = useCallback(
        (props:any) => <Leaf {...props} theme={theme} />,
   
        []
    );

    useEffect(() => {
        setInitialValue([
            {
                type: "paragraph",
                children: [{ text:  sanitizeWithSigns(props.queryText) }],
            },
        ]);
        editor.children = [{ text:  sanitizeWithSigns(props.queryText) }];
      
    }, [props.queryText]);

    const onChange = useCallback(
        (e:any) => {
            setInitialValue(e);
        },
       
        [initialValue]
    );

    useEffect(() => {
        if (initialValue !== queryInput && queryInput !== "") {
            setInitialValue([
                {
                    type: "paragraph",
                    children: [{ text:  sanitizeWithSigns(queryInput) }],
                },
            ]);
            editor.children = [{ text: sanitizeWithSigns(queryInput) }];
        }
      
    }, [queryInput]);

    const editor:any = useMemo(
        () => withHistory(withReact(createEditor() as any)),
        []
    );

    return (
        <div className={cx(QueryPreviewContainer(theme))}>
            <label>Raw Query</label>
            <Slate editor={editor} initialValue={initialValue} onChange={onChange}>
                <Editable
                    renderLeaf={renderLeaf}
                    decorate={decorate}
                    className={cx(CustomEditor(theme))}
                    readOnly
                    placeholder={queryText}
                />
            </Slate>
            <div className="action-buttons">
                {logsRateButton}
                {searchButton}
            </div>
        </div>
    );
}
