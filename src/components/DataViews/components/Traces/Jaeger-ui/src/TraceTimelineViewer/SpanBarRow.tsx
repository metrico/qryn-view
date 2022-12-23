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

import { css, keyframes } from "@emotion/css";
import cx from "classnames";
import * as React from "react";
import IoAlert from "@mui/icons-material/Error";
import IoArrowRightA from "@mui/icons-material/ArrowRightAlt";
import { DURATION, NONE, TAG } from "../settings/SpanBarSettings";
import { SpanBarOptions, SpanLinkFunc, TNil } from "../types";
import { SpanLinks } from "../types/links";
import { TraceSpan } from "../types/trace";

import SpanBar from "./SpanBar";
// import { SpanLinksMenu } from "./SpanLinks";
import SpanTreeOffset from "./SpanTreeOffset";
import Ticks from "./Ticks";
import TimelineRow from "./TimelineRow";
import { formatDuration, ViewedBoundsFunctionType } from "./utils";
import styled from "@emotion/styled";

const spanBarClassName = "spanBar";
const spanBarLabelClassName = "spanBarLabel";
const nameWrapperClassName = "nameWrapper";
const nameWrapperMatchingFilterClassName = "nameWrapperMatchingFilter";
const viewClassName = "jaegerView";
const nameColumnClassName = "nameColumn";
const flash = keyframes`
    from {
      background-color: #68b9ff;
    }
    to {
      background-color: default;
    }
  `;

const nameWrapper = css`
    line-height: 27px;
    overflow: hidden;
    display: flex;
`;
const nameWrapperMatchingFilter = css`
    background-color: #fffce4;
`;
const nameColumn = css`
    position: relative;
    white-space: nowrap;
    z-index: 1;
    &:hover {
        z-index: 1;
    }
`;
const EndpointName = styled.small`
    color: #808080;
    font-size: 80%;
`;
const view = css`
    position: relative;
`;
const viewExpanded = (theme: any) => css`
    background: ${theme.viewBg};
    outline: 1px solid ${theme.viewBg};
`;
const viewExpandedAndMatchingFilter = (theme: any) => css`
    background: #fff3d7;
    outline: 1px solid ${theme.viewBg};
`;
const row = (theme: any) => css`
    &:hover .${spanBarClassName} {
        opacity: 1;
    }
    &:hover .${spanBarLabelClassName} {
        color: ${theme.textColor};
    }
    &:hover .${nameWrapperClassName} {
        background: ${theme.viewBg};
        background: linear-gradient(
            90deg,
            ${theme.widgetContainer},
            ${theme.viewBg} 75%,
            #eee
        );
    }
    &:hover .${viewClassName} {
        background-color: #f5f5f5;
        outline: 1px solid ${theme.viewBg};
    }
`;
const rowClippingLeft = css`
    & .nameColumn::before {
        content: " ";
        height: 100%;
        position: absolute;
        width: 6px;
        background-image: linear-gradient(
            to right,
            rgba(25, 25, 25, 0.25),
            rgba(32, 32, 32, 0)
        );
        left: 100%;
        z-index: -1;
    }
`;
const rowClippingRight = css`
    & .jaegerView::before {
        content: " ";
        height: 100%;
        position: absolute;
        width: 6px;
        background-image: linear-gradient(
            to left,
            rgba(25, 25, 25, 0.25),
            rgba(25, 25, 25, 0.25)
        );
        right: 0%;
        z-index: 1;
    }
`;
const rowExpanded = (theme: any) => css`
    color: ${theme.textColor};
    & .${spanBarClassName} {
        opacity: 1;
    }
    & .${spanBarLabelClassName} {
        color: ${theme.textColor};
    }
    & .${nameWrapperClassName}, &:hover .${nameWrapperClassName} {
        background: ${theme.viewBg};
        box-shadow: 0 1px 0 ${theme.inputBg};
    }
    & .${nameWrapperMatchingFilterClassName} {
        background: ${theme.widgetContainer};
    }
    &:hover .${viewClassName} {
        background: ${theme.widgetContainer};
    }
`;
const rowMatchingFilter = (theme: any) => css`
    background-color: ${theme.widgetContainer};
    &:hover .${nameWrapperClassName} {
        background: ${theme.widgetContainer};
    }
    &:hover .${viewClassName} {
        background-color: #f7f1c6;
        outline: 1px solid ${theme.viewBg};
    }
`;
const rowFocused = (theme: any) => css`
    background-color: ${theme.widgetContainer};
    animation: ${flash} 1s cubic-bezier(0.12, 0, 0.39, 0);
    &
        .${nameWrapperClassName},
        .${viewClassName},
        .${nameWrapperMatchingFilterClassName} {
        background-color: ${theme.widgetContainer};
        animation: ${flash} 1s cubic-bezier(0.12, 0, 0.39, 0);
    }
    & .${spanBarClassName} {
        opacity: 1;
    }
    & .${spanBarLabelClassName} {
        color: ${theme.textColor};
    }
    &:hover .${nameWrapperClassName}, :hover .${viewClassName} {
        background: #d5ebff;
        box-shadow: 0 1px 0 ${theme.viewBg};
    }
`;

const rowExpandedAndMatchingFilter = (theme: any) => css`
    &:hover .${viewClassName} {
        background: #ffeccf;
    }
`;

const name = (theme: any) => css`
    color: ${theme.textColor};
    cursor: pointer;
    flex: 1 1 auto;
    outline: none;
    overflow-y: hidden;
    overflow-x: auto;
    margin-right: 8px;
    padding-left: 4px;
    padding-right: 0.25em;
    position: relative;
    -ms-overflow-style: none;
    scrollbar-width: none;
    &::-webkit-scrollbar {
        display: none;
    }
    &::before {
        content: " ";
        position: absolute;
        top: 4px;
        bottom: 4px;
        left: 0;
        border-left: 4px solid;
        border-left-color: inherit;
    }
    &:focus {
        text-decoration: none;
    }
    &:hover > small {
        color: ${theme.textColor};
    }
    text-align: left;
    background: transparent;
    border: none;
`;
const nameDetailExpanded = css`
    &::before {
        bottom: 0;
    }
`;
const svcName = css`
    padding: 0 0.25rem 0 0.5rem;
    font-size: 1.05em;
`;
const svcNameChildrenCollapsed = css`
    font-weight: bold;
    font-style: italic;
`;
const errorIcon = css`
    border-radius: 6.5px;
    color: #fff;
    font-size: 0.85em;
    margin-right: 0.25rem;
    padding: 1px;
`;
const RpcColorMarker = styled.i`
    border-radius: 6.5px;
    display: inline-block;
    font-size: 0.85em;
    height: 1em;
    margin-right: 0.25rem;
    padding: 1px;
    width: 1em;
    vertical-align: middle;
`;
const labelRight = css`
    left: 100%;
`;
const labelLeft = css`
    right: 100%;
`;
export type TraceKeyValuePair<T = any> = {
    key: string;
    value: T;
};

type SpanBarRowProps = {
    theme: any;
    className?: string;
    color: string;
    spanBarOptions: SpanBarOptions | undefined;
    columnDivision: number;
    isChildrenExpanded: boolean;
    isDetailExpanded: boolean;
    isMatchingFilter: boolean;
    isFocused: boolean;
    onDetailToggled: (spanID: string) => void;
    onChildrenToggled: (spanID: string) => void;
    numTicks: number;
    rpc?:
        | {
              viewStart: number;
              viewEnd: number;
              color: string;
              operationName: string;
              serviceName: string;
          }
        | TNil;
    noInstrumentedServer?:
        | {
              color: string;
              serviceName: string;
          }
        | TNil;
    showErrorIcon: boolean;
    getViewedBounds: ViewedBoundsFunctionType;
    traceStartTime: number;
    span: TraceSpan;
    hoverIndentGuideIds: Set<string>;
    addHoverIndentGuideId: (spanID: string) => void;
    removeHoverIndentGuideId: (spanID: string) => void;
    clippingLeft?: boolean;
    clippingRight?: boolean;
    createSpanLink?: SpanLinkFunc;
};

/**
 * This was originally a stateless function, but changing to a PureComponent
 * reduced the render time of expanding a span row detail by ~50%. This is
 * even true in the case where the stateless function has the same prop types as
 * this class and arrow functions are created in the stateless function as
 * handlers to the onClick props. E.g. for now, the PureComponent is more
 * performance than the stateless function.
 */
export class UnthemedSpanBarRow extends React.PureComponent<SpanBarRowProps> {
    static displayName = "UnthemedSpanBarRow";
    static defaultProps: Partial<SpanBarRowProps> = {
        className: "",
        rpc: null,
    };

    _detailToggle = () => {
        this.props.onDetailToggled(this.props.span.spanID);
    };

    _childrenToggle = () => {
        this.props.onChildrenToggled(this.props.span.spanID);
    };

    render() {
        const {
            className,
            color,
            spanBarOptions,
            columnDivision,
            isChildrenExpanded,
            isDetailExpanded,
            isMatchingFilter,
            isFocused,
            numTicks,
            rpc,
            noInstrumentedServer,
            showErrorIcon,
            getViewedBounds,
            traceStartTime,
            span,
            hoverIndentGuideIds,
            addHoverIndentGuideId,
            removeHoverIndentGuideId,
            clippingLeft,
            clippingRight,
            //   theme,
            createSpanLink,
        } = this.props;
        const {
            duration,
            hasChildren: isParent,
            operationName,
            process: { serviceName },
        } = span;
        const label = formatDuration(duration);

        const viewBounds = getViewedBounds(
            span.startTime,
            span.startTime + span.duration
        );
        const viewStart = viewBounds.start;
        const viewEnd = viewBounds.end;

        const labelDetail = `${serviceName}::${operationName}`;
        let longLabel;
        let hintClassName;
        if (viewStart > 1 - viewEnd) {
            longLabel = `${labelDetail} | ${label}`;
            hintClassName = labelLeft;
        } else {
            longLabel = `${label} | ${labelDetail}`;
            hintClassName = labelRight;
        }

        const countLinks = (links?: SpanLinks): number => {
            if (!links) {
                return 0;
            }

            return Object.values(links).reduce(
                (count, arr) => count + arr.length,
                0
            );
        };
        return (
            <TimelineRow
                theme={this.props.theme}
                className={cx(
                    row,
                    {
                        [rowExpanded(this.props.theme)]: isDetailExpanded,
                        [rowMatchingFilter(this.props.theme)]: isMatchingFilter,
                        [rowExpandedAndMatchingFilter(this.props.theme)]:
                            isMatchingFilter && isDetailExpanded,
                        [rowFocused(this.props.theme)]: isFocused,
                        [rowClippingLeft]: clippingLeft,
                        [rowClippingRight]: clippingRight,
                    } as any, 
                    className
                )}
            >
                <TimelineRow.Cell
                    theme={this.props.theme}
                    className={cx(nameColumn, nameColumnClassName)}
                    width={columnDivision}
                >
                    <div
                        className={cx(nameWrapper, nameWrapperClassName, {
                            [nameWrapperMatchingFilter]: isMatchingFilter,
                            nameWrapperMatchingFilter: isMatchingFilter,
                        })}
                    >
                        <SpanTreeOffset
                            theme={this.props.theme}
                            onClick={
                                isParent ? this._childrenToggle : undefined
                            }
                            childrenVisible={isChildrenExpanded}
                            span={span}
                            hoverIndentGuideIds={hoverIndentGuideIds}
                            addHoverIndentGuideId={addHoverIndentGuideId}
                            removeHoverIndentGuideId={removeHoverIndentGuideId}
                        />
                        <button
                            type="button"
                            className={cx(name(this.props.theme), {
                                [nameDetailExpanded]: isDetailExpanded,
                            })}
                            aria-checked={isDetailExpanded}
                            title={labelDetail}
                            onClick={this._detailToggle}
                            role="switch"
                            style={{ borderColor: color }}
                            tabIndex={0}
                        >
                            <span
                                className={cx(svcName, {
                                    [svcNameChildrenCollapsed]:
                                        isParent && !isChildrenExpanded,
                                })}
                            >
                                {showErrorIcon && (
                                    <IoAlert
                                        style={{
                                            backgroundColor: span.errorIconColor
                                                ? span.errorIconColor
                                                : "#db2828",
                                        }}
                                        className={errorIcon}
                                    />
                                )}
                                {serviceName}{" "}
                                {rpc && (
                                    <span>
                                        <IoArrowRightA />{" "}
                                        <RpcColorMarker
                                            style={{ background: rpc.color }}
                                        />
                                        {rpc.serviceName}
                                    </span>
                                )}
                                {noInstrumentedServer && (
                                    <span>
                                        <IoArrowRightA />{" "}
                                        <RpcColorMarker
                                            style={{
                                                background:
                                                    noInstrumentedServer.color,
                                            }}
                                        />
                                        {noInstrumentedServer.serviceName}
                                    </span>
                                )}
                            </span>
                            <EndpointName>
                                {rpc ? rpc.operationName : operationName}
                            </EndpointName>
                            <EndpointName>
                                {" "}
                                {this.getSpanBarLabel(
                                    span,
                                    spanBarOptions,
                                    label
                                )}
                            </EndpointName>
                        </button>
                        {createSpanLink &&
                            (() => {
                                const links = createSpanLink(span);
                                const count = countLinks(links);
                                if (links && count === 1) {
                                    const link =
                                        links.logLinks?.[0] ??
                                        links.metricLinks?.[0] ??
                                        links.traceLinks?.[0] ??
                                        undefined;
                                    if (!link) {
                                        return null;
                                    }

                                    return (
                                        <a
                                            href={link.href}
                                            // Needs to have target otherwise preventDefault would not work due to angularRouter.
                                            target={"_blank"}
                                            style={{ marginRight: "5px" }}
                                            rel="noopener noreferrer"
                                            onClick={
                                                link.onClick
                                                    ? (event) => {
                                                          if (
                                                              !(
                                                                  event.ctrlKey ||
                                                                  event.metaKey ||
                                                                  event.shiftKey
                                                              ) &&
                                                              link.onClick
                                                          ) {
                                                              event.preventDefault();
                                                              link.onClick(
                                                                  event
                                                              );
                                                          }
                                                      }
                                                    : undefined
                                            }
                                        >
                                            {link.content}
                                        </a>
                                    );
                                } else if (links && count > 1) {
                                    return null;
                                    // return <SpanLinksMenu links={links} />;
                                } else {
                                    return null;
                                }
                            })()}
                    </div>
                </TimelineRow.Cell>
                <TimelineRow.Cell
                    theme={this.props.theme}
                    className={cx(view, viewClassName, {
                        [viewExpanded(this.props.theme)]: isDetailExpanded,
                        [viewExpandedAndMatchingFilter(this.props.theme)]:
                            isMatchingFilter && isDetailExpanded,
                    })}
                    data-testid="span-view"
                    style={{ cursor: "pointer" }}
                    width={1 - columnDivision}
                    onClick={this._detailToggle}
                >
                    <Ticks theme={this.props.theme} numTicks={numTicks} />
                    <SpanBar
                        rpc={rpc}
                        viewStart={viewStart}
                        viewEnd={viewEnd}
                        getViewedBounds={getViewedBounds}
                        color={color}
                        shortLabel={label}
                        longLabel={longLabel}
                        traceStartTime={traceStartTime}
                        span={span}
                        labelClassName={`${spanBarLabelClassName} ${hintClassName}`}
                        className={spanBarClassName}
                    />
                </TimelineRow.Cell>
            </TimelineRow>
        );
    }

    getSpanBarLabel = (
        span: TraceSpan,
        spanBarOptions: SpanBarOptions | undefined,
        duration: string
    ) => {
        const type = spanBarOptions?.type ?? "";

        if (type === NONE) {
            return "";
        } else if (type === "" || type === DURATION) {
            return `(${duration})`;
        } else if (type === TAG) {
            const tagKey = spanBarOptions?.tag?.trim() ?? "";
            if (tagKey !== "" && span.tags) {
                const tag = span.tags?.find((tag: TraceKeyValuePair) => {
                    return tag.key === tagKey;
                });
                const process = span.process?.tags?.find(
                    (process: TraceKeyValuePair) => {
                        return process.key === tagKey;
                    }
                );

                if (tag) {
                    return `(${tag.value})`;
                }
                if (process) {
                    return `(${process.value})`;
                }
            }
        }

        return "";
    };
}

export default UnthemedSpanBarRow;
