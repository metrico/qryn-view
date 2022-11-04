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

import { css } from "@emotion/css";
import cx from "classnames";
import jsonMarkup from "json-markup";
import * as React from "react";


import CopyIcon from "../../common/CopyIcon";
import { TNil } from "../../types";
import { TraceKeyValuePair, TraceLink } from "../../types/trace";
import { ubInlineBlock, uWidth100 } from "../../uberUtilityStyles";

import OpenInNewIcon from "@mui/icons-material/OpenInNew";
import styled from "@emotion/styled";
const copyIconClassName = "copyIcon";
const KeyValueTable = styled.div`
       background: #fff;
    border: 1px solid #ddd;
    margin-bottom: 0.5rem;
    max-height: 450px;
    overflow: auto;
`;
const Body = styled.tbody`
       vertical-align: baseline;
`;
const Row = styled.tr`
       & > td {
        padding: 0rem 0.5rem;
        height: 30px;
        line-height: 30px;
        box-sizing: border-box;
        font-size: 12px;
    }
    &:nth-child(2n) > td {
        background: #f5f5f5;
    }
    &:not(:hover) .${copyIconClassName} {
        visibility: hidden;
    }
`;
const KeyColumn = styled.td`
       color: #888;
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
            // eslint-disable-next-line no-empty
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
    linksGetter:
        | ((pairs: TraceKeyValuePair[], index: number) => TraceLink[])
        | TNil;
};

export default function KeyValuesTable(props: KeyValuesTableProps) {
    const { data, linksGetter } = props;
    //   const styles = useStyles2(getStyles);
    return (
        <KeyValueTable data-testid="KeyValueTable">
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
                            <Row key={`${row.key}-${i}`}>
                                <KeyColumn data-testid="KeyValueTable--keyColumn">
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
