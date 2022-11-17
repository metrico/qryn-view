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
import styled from "@emotion/styled";
import cx from "classnames";
import * as React from "react";

const LabeledListStyles = css`
    list-style: none;
    margin: 0;
    padding: 0;
`;
const LabeledListStylesDivider = css`
    margin-right: -8px;
    display: flex;
    flex-wrap: wrap;
    justify-content: flex-end;
`;
const LabeledListItem = css`
    display: inline-block;
`;
const LabeledListItemDivider = css`
    border-right: 1px solid #ddd;
    padding: 0 8px;
`;
const LabeledListLabel = styled.span`
    color: #999;
    margin-right: 0.25rem;
    font-size:12px;
`;
const LabeledListValue = styled.strong`
    margin-right: 0.55rem;
    font-size:12px;
`;

type LabeledListProps = {
    className?: string;
    divider?: boolean;
    items: Array<{
        key: string;
        label: React.ReactNode;
        value: React.ReactNode;
    }>;
};

export default function LabeledList(props: LabeledListProps) {
    const { className, divider = false, items } = props;

    return (
        <ul
            className={cx(
                LabeledListStyles,
                className,
                divider ? LabeledListStylesDivider : ""
            )}
        >
            {items.map(({ key, label, value }) => {
                return (
                    <li
                        className={cx(
                            LabeledListItem,
                            divider ? LabeledListItemDivider : ""
                        )}
                        key={`${key}`}
                    >
                        <LabeledListLabel>{label}</LabeledListLabel>
                        <LabeledListValue>{value}</LabeledListValue>
                    </li>
                );
            })}
        </ul>
    );
}
