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
import React from "react";

import KeyboardDoubleArrowDownIcon from "@mui/icons-material/KeyboardDoubleArrowDown";
import KeyboardDoubleArrowRightIcon from "@mui/icons-material/KeyboardDoubleArrowRight";
import KeyboardArrowRightIcon from "@mui/icons-material/KeyboardArrowRight";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import { Tooltip } from "@mui/material";
const TimelineCollapserStyles = css`
    align-items: center;
    display: flex;
    flex: none;
    gap:2px;
    justify-content: center;
    margin-right: 0.5rem;
`;

type CollapserProps = {
    theme: any;
    onCollapseAll: () => void;
    onCollapseOne: () => void;
    onExpandOne: () => void;
    onExpandAll: () => void;
};

export function TimelineCollapser(props: CollapserProps) {
    const { onExpandAll, onExpandOne, onCollapseAll, onCollapseOne } = props;
    //   const styles = useStyles2(getStyles);
    return (
        <div
            className={TimelineCollapserStyles}
            data-testid="TimelineCollapser"
        >
            <Tooltip title="Expand +1">
                <KeyboardArrowDownIcon
                    fontSize={"small"}
                    style={{ cursor: "pointer", color: props.theme.textColor }}
                    onClick={onExpandOne}
                />
            </Tooltip>
            <Tooltip title="Collapse +1">
                <KeyboardArrowRightIcon
                    fontSize={"small"}
                    style={{ cursor: "pointer", color: props.theme.textColor }}
                    onClick={onCollapseOne}
                />
            </Tooltip>

            <Tooltip title="Expand All">
                <KeyboardDoubleArrowDownIcon
                    fontSize={"small"}
                    style={{ cursor: "pointer", color: props.theme.textColor }}
                    onClick={onExpandAll}
                />
            </Tooltip>
            <Tooltip title="Collapse All">
                <KeyboardDoubleArrowRightIcon
                    fontSize={"small"}
                    style={{ cursor: "pointer", color: props.theme.textColor }}
                    onClick={onCollapseAll}
                />
            </Tooltip>
        </div>
    );
}
