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

import { ubRelative, textColor } from "../uberUtilityStyles";
const FlexRow =(theme:any)=> css`
color: ${theme?.textColor};
    display: flex;
    flex: 0 1 auto;
    flex-direction: row;
`;

type TTimelineRowProps = {
    theme:any;
    children: React.ReactNode;
    className?: string;
};

interface TimelineRowCellProps extends React.HTMLAttributes<HTMLDivElement> {
    children: React.ReactNode;
    className?: string;
    width: number;
    theme:any;
    style?: {};
}

export default function TimelineRow(props: TTimelineRowProps) {
    const { children, className = "", ...rest } = props;
    return (
        <div className={cx(FlexRow(props.theme), className)} {...rest}>
            {children}
        </div>
    );
}

TimelineRow.defaultProps = {
    className: "",
};

export function TimelineRowCell(props: TimelineRowCellProps) {
    console.log(props)

    const { children, className = "", width, style, theme, ...rest } = props;
    const widthPercent = `${width * 100}%`;
    const mergedStyle = {
        ...style,
        flexBasis: widthPercent,
        maxWidth: widthPercent,
    };
    return (
        <div
            className={cx(ubRelative, className, textColor(theme))}
            style={mergedStyle}
            data-testid="TimelineRowCell"
            {...rest}
        >
            {children}
        </div>
    );
}

TimelineRowCell.defaultProps = { className: "", style: {} };

TimelineRow.Cell = TimelineRowCell;
