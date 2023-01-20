// Copyright (c) 2019 Uber Technologies, Inc.
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

import React, { useState } from "react";
import Tooltip from "@mui/material/Tooltip";
import { css, cx } from "@emotion/css";
import { useTheme } from "./useTheme";
import ContentCopyIcon from "@mui/icons-material/ContentCopy";

type PropsType = {
    className?: string;
    copyText: string;
    //   icon?: IconName;
    tooltipTitle: string;
};

export const CopyButton = (theme: any) => css`
    font-size: 12px;
    padding: 3px 6px;
    border: 1px solid ${theme.buttonBorder};
    color: ${theme.textColor};
    .copy-icon {
      color: ${theme.textColor};
      height:13px !important;
      width:13px !important;
    }
`;
export default function CopyIcon(props: PropsType) {
    //   const styles = useStyles2(getStyles);

    const [hasCopied, setHasCopied] = useState(false);

    const theme = useTheme();

    const handleClick = () => {
        setHasCopied(true);
    };

    return (
        <Tooltip title={hasCopied ? "Copied" : props.tooltipTitle}>
            <button
                type="button"
                className={cx(CopyButton(theme))}
                onClick={handleClick}
            > <ContentCopyIcon className={'copy-icon'} fontSize={'small'}/></button>
        </Tooltip>
    );
}

CopyIcon.defaultProps = {
    icon: "copy",
    className: undefined,
};
