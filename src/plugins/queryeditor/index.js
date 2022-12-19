import styled from "@emotion/styled";
import { css } from "@emotion/css";
import React, { useCallback, useState, useMemo, useEffect, useRef } from "react";

import { createEditor, Text } from "slate";
import { Slate, Editable, withReact } from "slate-react";
import { withHistory } from "slate-history";
import Prism from "prismjs";
import "prismjs/components/prism-promql";
import "prismjs/components/prism-sql";
import { themes } from "../../theme/themes";
import { ThemeProvider } from "@emotion/react";
import { useSelector } from "react-redux";
import { ResizableBox } from "../ResizableBox/ResiableBox";
import { useMediaQuery } from "react-responsive";
const CustomEditor = styled(Editable)`
    flex: 1;
    height: 100%;
    background: ${(props) => props.theme.inputBg};
    border: 1px solid ${(props) => props.theme.buttonBorder};
    color: ${(props) => props.theme.textColor};
    padding: 4px 8px;
    font-size: 1em;
    font-family: monospace;
    margin: 0px 5px;
    margin-bottom: 20px;
    border-radius: 3px;
    line-height: 1.5;
    line-break: anywhere;
    overflow-y: scroll;
`;
const Resizable = css`
    margin-bottom: 10px;
    width: 100%;
`;
const QueryBar = styled.div`
    display: flex;
    align-items: center;
    flex: 1;
    max-width: 100%;
`;

function Leaf({ attributes, children, leaf }) {
    const theme = useSelector((store) => store.theme);
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
                    color: ${themes[theme].textOff}};
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
const handle = ["se"];
const QUERY_BAR_WIDTH = 10000 // Set width above screen size, that way it doesn't go past "max-width: 100%" and fill container nicely.
const DEFAULT_QUERY_BAR_INNER_HEIGHT = 20;
export function getTokenLength(token) {
    if (typeof token === "string") {
        return token.length;
    }

    if (typeof token.content === "string") {
        return token.content.length;
    }

    return token.content.reduce((l, t) => l + getTokenLength(t), 0);
}

export default function QueryEditor({
    onQueryChange,
    value,
    onKeyDown: onKeyDownProp,
    defaultValue,
    isSplit,
    wrapperWidth
}) {
    const theme = useSelector((store) => store.theme);

    const renderLeaf = useCallback((props) => <Leaf {...props} />, []);
    const [height, setHeight] = useState(DEFAULT_QUERY_BAR_INNER_HEIGHT);
    const editor = useMemo(() => withHistory(withReact(createEditor())), []);
    const ref = useRef(null);
    const editorRef = useRef(null);
    const isInit = useState(true);
    const editorSize = editorRef?.current?.firstChild?.firstChild?.clientHeight;
    // Keep track of state for the value of the editor.

    const [language] = useState("sql");

    const decorate = useCallback(
        ([node, path]) => {
            const ranges = [];
            if (!Text.isText(node) || node.length < 1) {
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

    const [editorValue, setEditorValue] = useState(value);

    useEffect(() => {
        setEditorValue(value);
        adjustHeight(editorSize);
    }, []);

    const adjustHeight = useCallback((editorHeight) => {
        if (typeof editorHeight === 'undefined') {
            return;
        }
        if (isInit || height < editorHeight) {
            const maxHeight = window.innerHeight * 0.5;
            if (maxHeight < editorHeight) {
                setHeight(maxHeight)
            } else {
                setHeight(editorHeight)
            }
        }
    }, [editorSize, height])
    
    useEffect(() => {
        setEditorValue(value);
        editor.children = value;
    }, [value, setEditorValue]);
    useEffect(()=>{
        adjustHeight(editorSize);
    },[editorSize])
    const onResize = useCallback((e, {size}) => {
        setHeight(size.height);
    },[]);
    return (
        <ThemeProvider theme={themes[theme]}>
            <QueryBar ref={ref}>
                {/* <select value={language} onChange={(e) => setLanguage(e.target.value)}>
            <option value={"sql"}>{"SQL"}</option>
            <option value={"promql"}>{"promQL"}</option>
        </select> */}
                <Slate
                    editor={editor}
                    value={editorValue}
                    onChange={onQueryChange}
                    className="test"
                >
                    {" "}
                    <ResizableBox
                        height={height}
                        width={QUERY_BAR_WIDTH}
                        axis={"y"}
                        onResize={onResize}
                        lockAspectRatio={false}
                        minWidth={QUERY_BAR_WIDTH}
                        maxWidth={QUERY_BAR_WIDTH}
                        minHeight={DEFAULT_QUERY_BAR_INNER_HEIGHT}
                        maxHeight={window.innerHeight * 0.5}
                        resizeHandles={handle}
                        className={Resizable}
                    >
                        <span ref={editorRef}>
                        <CustomEditor
                            decorate={decorate}
                            renderLeaf={renderLeaf}
                            onKeyDown={onKeyDownProp}
                            spellCheck="false"
                        />
                        </span>
                    </ResizableBox>
                </Slate>
            </QueryBar>
        </ThemeProvider>
    );
}
