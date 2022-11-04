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
import { get as _get } from "lodash";
import React from "react";

import KeyboardArrowDown from "@mui/icons-material/KeyboardArrowDown";
import KeyboardArrowRight from "@mui/icons-material/KeyboardArrowRight";
import { TraceSpan } from "../types/trace";
import spanAncestorIds from "../utils/span-ancestor-ids";
import styled from "@emotion/styled";

const SpanTreeOffset = css`
    color: #000;
    position: relative;
`;
const SpanTreeOffsetParent = css`
    &:hover {
        cursor: pointer;
    }
`;
const indentGuide = css`
    /* The size of the indentGuide is based off of the iconWrapper */
    padding-right: calc(0.5rem + 12px);
    height: 100%;
    border-left: 3px solid transparent;
    display: inline-flex;
    &::before {
        content: "";
        padding-left: 1px;
        background-color: lightgrey;
    }
`;
const indentGuideActive = css`
    border-color: darkgrey;
    &::before {
        background-color: transparent;
    }
`;
const IconWrapper = styled.span`
    position: absolute;
    right: 0.25rem;
`;

type TProps = {
    childrenVisible?: boolean;
    onClick?: () => void;
    span: TraceSpan;
    showChildrenIcon?: boolean;

    hoverIndentGuideIds: Set<string>;
    addHoverIndentGuideId: (spanID: string) => void;
    removeHoverIndentGuideId: (spanID: string) => void;
};

export class UnthemedSpanTreeOffset extends React.PureComponent<TProps> {
    static displayName = "UnthemedSpanTreeOffset";

    ancestorIds: string[];

    static defaultProps = {
        childrenVisible: false,
        showChildrenIcon: true,
    };

    constructor(props: TProps) {
        super(props);

        this.ancestorIds = spanAncestorIds(props.span);
        // Some traces have multiple root-level spans, this connects them all under one guideline and adds the
        // necessary padding for the collapse icon on root-level spans.
        this.ancestorIds.push("root");

        this.ancestorIds.reverse();
    }

    /**
     * If the mouse leaves to anywhere except another span with the same ancestor id, this span's ancestor id is
     * removed from the set of hoverIndentGuideIds.
     *
     * @param {Object} event - React Synthetic event tied to mouseleave. Includes the related target which is
     *     the element the user is now hovering.
     * @param {string} ancestorId - The span id that the user was hovering over.
     */
    handleMouseLeave = (
        event: React.MouseEvent<HTMLSpanElement>,
        ancestorId: string
    ) => {
        if (
            !(event.relatedTarget instanceof HTMLSpanElement) ||
            _get(event, "relatedTarget.dataset.ancestorId") !== ancestorId
        ) {
            this.props.removeHoverIndentGuideId(ancestorId);
        }
    };

    /**
     * If the mouse entered this span from anywhere except another span with the same ancestor id, this span's
     * ancestorId is added to the set of hoverIndentGuideIds.
     *
     * @param {Object} event - React Synthetic event tied to mouseenter. Includes the related target which is
     *     the last element the user was hovering.
     * @param {string} ancestorId - The span id that the user is now hovering over.
     */
    handleMouseEnter = (
        event: React.MouseEvent<HTMLSpanElement>,
        ancestorId: string
    ) => {
        if (
            !(event.relatedTarget instanceof HTMLSpanElement) ||
            _get(event, "relatedTarget.dataset.ancestorId") !== ancestorId
        ) {
            this.props.addHoverIndentGuideId(ancestorId);
        }
    };

    render() {
        const {
            childrenVisible,
            onClick,
            showChildrenIcon,
            span /*, theme */,
        } = this.props;
        const { hasChildren, spanID } = span;
        const wrapperProps = hasChildren
            ? { onClick, role: "switch", "aria-checked": childrenVisible }
            : null;
        const icon =
            showChildrenIcon &&
            hasChildren &&
            (childrenVisible ? <KeyboardArrowDown /> : <KeyboardArrowRight />);
        return (
            <span
                className={cx(SpanTreeOffset, {
                    [SpanTreeOffsetParent]: hasChildren,
                })}
                {...wrapperProps}
            >
                {this.ancestorIds.map((ancestorId) => (
                    <span
                        key={ancestorId}
                        className={cx(indentGuide, {
                            [indentGuideActive]:
                                this.props.hoverIndentGuideIds.has(ancestorId),
                        })}
                        data-ancestor-id={ancestorId}
                        data-testid="SpanTreeOffset--indentGuide"
                        onMouseEnter={(event) =>
                            this.handleMouseEnter(event, ancestorId)
                        }
                        onMouseLeave={(event) =>
                            this.handleMouseLeave(event, ancestorId)
                        }
                    />
                ))}
                {icon && (
                    <IconWrapper
                        onMouseEnter={(event) =>
                            this.handleMouseEnter(event, spanID)
                        }
                        onMouseLeave={(event) =>
                            this.handleMouseLeave(event, spanID)
                        }
                        data-testid="icon-wrapper"
                    >
                        {icon}
                    </IconWrapper>
                )}
            </span>
        );
    }
}

export default UnthemedSpanTreeOffset;
