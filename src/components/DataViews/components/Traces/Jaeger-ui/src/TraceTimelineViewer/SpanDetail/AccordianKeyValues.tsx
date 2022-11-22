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
import * as React from "react";
import KeyboardArrowDown from "@mui/icons-material/KeyboardArrowDown";
import KeyboardArrowRight from "@mui/icons-material/KeyboardArrowRight";
import { TNil } from "../../types";
import { TraceKeyValuePair, TraceLink } from "../../types/trace";
import { uAlignIcon, uTxEllipsis } from "../../uberUtilityStyles";

import * as markers from "./AccordianKeyValues.markers";
import KeyValuesTable from "./KeyValuesTable";
import styled from "@emotion/styled";
const header = css`
    cursor: pointer;
    overflow: hidden;
    display:flex;
    align-items:center;
    padding: 0.25em 0.1em;
    font-size:12px;
    text-overflow: ellipsis;
    white-space: nowrap;
    &:hover {
     //   background: #e8e8e8;
    }
`;
const headerEmpty = css`
    background: none;
    cursor: initial;
`;
const headerHighContrast = css`
    &:hover {
   //     background: #ddd;
    }
`;
export const emptyIcon = css`
  //  color: #aaa;
`;
const Summary = styled.ul`
    display: inline;
    list-style: none;
    padding: 0;
`;
const SummaryItem = styled.li`
    display: inline;
    margin-left: 0.7em;
    padding-right: 0.5rem;
    border-right: 1px solid #ddd;
    &:last-child {
        padding-right: 0;
        border-right: none;
    }
`;
const SummaryLabel = styled.span`
    color: #777;
`;
const SummaryDelim = styled.span`
    color: #bbb;
    padding: 0 0.2em;
`;

type AccordianKeyValuesProps = {
    className?: string | TNil;
    data: TraceKeyValuePair[];
    highContrast?: boolean;
    interactive?: boolean;
    isOpen: boolean;
    label: string;
    linksGetter:
        | ((pairs: TraceKeyValuePair[], index: number) => TraceLink[])
        | TNil;
    onToggle?: null | (() => void);
};

export function KeyValuesSummary(props: { data?: TraceKeyValuePair[] }) {
    const { data } = props;

    if (!Array.isArray(data) || !data.length) {
        return null;
    }

    return (
        <Summary>
            {data.map((item, i) => (
                // `i` is necessary in the key because item.key can repeat
                <SummaryItem key={`${item.key}-${i}`}>
                    <SummaryLabel>{item.key}</SummaryLabel>
                    <SummaryDelim>=</SummaryDelim>
                    {String(item.value)}
                </SummaryItem>
            ))}
        </Summary>
    );
}

KeyValuesSummary.defaultProps = {
    data: null,
};

export default function AccordianKeyValues(props:any) {

  

    const {
        className,
        data,
        highContrast,
        interactive,
        isOpen,
        label,
        linksGetter,
        onToggle,
    } = props;
    const isEmpty = !Array.isArray(data) || !data.length;
    const iconCls = cx(uAlignIcon, { [emptyIcon]: isEmpty });
    let arrow: React.ReactNode | null = null;
    let headerProps: {} | null = null;
    if (interactive) {
        arrow = isOpen ? (
            <KeyboardArrowDown className={iconCls} />
        ) : (
            <KeyboardArrowRight className={iconCls} />
        );
        headerProps = {
            "aria-checked": isOpen,
            onClick: isEmpty ? null : onToggle,
            role: "switch",
        };
    }

    return (
        <div className={cx(className, uTxEllipsis)}>
            <div
                className={cx(header, {
                    [headerEmpty]: isEmpty,
                    [headerHighContrast]: highContrast && !isEmpty,
                })}
                {...headerProps}
                data-testid="AccordianKeyValues--header"
            >
                {arrow}
                <strong data-test={markers.LABEL}>
                    {label}
                    {isOpen || ":"}
                </strong>
                {!isOpen && <KeyValuesSummary data={data} />}
            </div>
            {isOpen && <KeyValuesTable theme={props.theme} data={data} linksGetter={linksGetter} />}
        </div>
    );
}

AccordianKeyValues.defaultProps = {
    className: null,
    highContrast: false,
    interactive: true,
    onToggle: null,
};
