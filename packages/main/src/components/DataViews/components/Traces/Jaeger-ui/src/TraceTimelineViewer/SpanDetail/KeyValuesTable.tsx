// Copyright (c) 2017 Uber Technologies, Inc.
//
// Licensed under the Apache License, Version 2.0 (the "License");
// you may not use this file except in compliance with the License.
// You may obtain a copy of the License at
//
// http://www.apache.org/licenses/LICENSE-2.0
//
// Unless required by applicable law or agreed to in writing, software
// distributed under the License is distributed on an "AS IS" BASIS,
// WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
// See the License for the specific language governing permissions and
// limitations under the License.

import jsonMarkup from "../../utils/jsonMarkup";
import React from 'react';


import CopyIcon from "../../common/CopyIcon";
import { TNil } from "../../types";
import { TraceKeyValuePair, TraceLink } from "../../types/trace";
import { ubInlineBlock, uWidth100 } from "../../uberUtilityStyles";

import OpenInNewIcon from "@mui/icons-material/OpenInNew";
import styled from "@emotion/styled";
const copyIconClassName = "copyIcon";
const KeyValueTable = styled.div<{theme:any}>`
    background:${({theme})=>theme.background};
    border: 1px solid ${({theme})=>theme.accentNeutral};
    margin-bottom: 0.5rem;
    max-height: 450px;
    overflow: auto;
`;
const Body = styled.tbody`
       vertical-align: baseline;
`;
const Row = styled.tr<{theme:any}>`
color:${({theme})=>theme.contrast};
       & > td {
        padding: 0rem 0.5rem;
        height: 30px;
        line-height: 30px;
        box-sizing: border-box;
        font-size: 12px;
        color:${({theme})=>theme.contrast};
    }
    &:nth-of-type(2n) > td {
        background:${({theme})=>theme.shadow};
    }
    &:not(:hover) .${copyIconClassName} {
        visibility: hidden;
    }
`;
const KeyColumn = styled.td<{theme:any}>`
    color: ${({theme})=>theme.contrast} !important;
    white-space: pre;
    width: 125px;
`;
const CopyColumn = styled.td`
       text-align: right;
`;

const jsonObjectOrArrayStartRegex = /^(\[|\{)/;

function parseIfComplexJson(value: unknown) {
    // if the value is a string representing actual json object or array, then use json-markup
    if (typeof value === "string" && jsonObjectOrArrayStartRegex.test(value)) {
        // otherwise just return as is
        try {
            return JSON.parse(value);
        } catch (_) {}
    }
    return value;
}

export const LinkValue = (props: {
    href: string;
    title?: string;
    children: React.ReactNode;
}) => {
    return (
        <a
            href={props.href}
            title={props.title}
            target="_blank"
            rel="noopener noreferrer"
        >
            {props.children} <OpenInNewIcon />
        </a>
    );
};

LinkValue.defaultProps = {
    title: "",
};

type KeyValuesTableProps = {
    data: TraceKeyValuePair[];
    theme:any;
    linksGetter:
        | ((pairs: TraceKeyValuePair[], index: number) => TraceLink[])
        | TNil;
};

export default function KeyValuesTable(props: KeyValuesTableProps) {
    const { data, linksGetter, theme } = props;
    //   const styles = useStyles2(getStyles);
    return (
        <KeyValueTable theme={theme} data-testid="KeyValueTable">
            <table className={uWidth100}>
                <Body>
                    {data.map((row, i) => {
                        const markup = {
                            __html: jsonMarkup(parseIfComplexJson(row.value)),
                        };
                        const jsonTable = (
                            <div
                                className={ubInlineBlock}
                                dangerouslySetInnerHTML={markup}
                            />
                        );
                        const links = linksGetter ? linksGetter(data, i) : null;
                        let valueMarkup;
                        if (links && links.length) {
                            valueMarkup = (
                                <div>
                                    <LinkValue
                                        href={links[0].url}
                                        title={links[0].text}
                                    >
                                        {jsonTable}
                                    </LinkValue>
                                </div>
                            );
                        } else {
                            valueMarkup = jsonTable;
                        }
                        return (
                            // `i` is necessary in the key because row.key can repeat
                            <Row theme={theme} key={`${row.key}-${i}`}>
                                <KeyColumn theme={theme} data-testid="KeyValueTable--keyColumn">
                                    {row.key}
                                </KeyColumn>
                                <td>{valueMarkup}</td>
                                <CopyColumn>
                                    <CopyIcon
                                        className={copyIconClassName}
                                        copyText={JSON.stringify(row, null, 2)}
                                        tooltipTitle="Copy JSON"
                                    />
                                </CopyColumn>
                            </Row>
                        );
                    })}
                </Body>
            </table>
        </KeyValueTable>
    );
}
