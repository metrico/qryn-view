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
import React from "react";

import { Divider } from "../../common/Divider";
import LabeledList from "../../common/LabeledList";
import { SpanLinkFunc, TNil } from "../../types";
import {
    TraceKeyValuePair,
    TraceLink,
    TraceLog,
    TraceSpan,
    TraceSpanReference,
} from "../../types/trace";
import { ubM0, ubMb1, ubMy1, ubTxRightAlign } from "../../uberUtilityStyles";
import { TopOfViewRefType } from "../VirtualizedTraceView";
import { formatDuration } from "../utils";

import AccordianKeyValues from "./AccordianKeyValues";
import AccordianLogs from "./AccordianLogs";
import AccordianReferences from "./AccordianReferences";
import AccordianText from "./AccordianText";
import DetailState from "./DetailState";
import styled from "@emotion/styled";
import moment from "moment";

const Header = styled.div`
    display: flex;
    align-items: flex-start;
    justify-content: space-between;
    align-items: center;
    gap: 0 1rem;
    margin-bottom: 0.25rem;
`;
const ListWrapper = styled.div`
    overflow: hidden;
`;
const DebugInfo = styled.small`
    display: block;
    letter-spacing: 0.25px;
    margin: 0.5em 0 -0.75em;
    text-align: right;
    font-size: 80%;
`;
const DebugLabel = styled.span`
    &::before {
        color: #bbb;
        content: attr(data-label);
    }
`;
const AccordianWarnings = css`
    background: #fafafa;
    border: 1px solid #e4e4e4;
    margin-bottom: 0.25rem;
`;
const AccordianWarningsHeader = css`
    background: #fff7e6;
    padding: 0.25rem 0.5rem;
    &:hover {
        background: #ffe7ba;
    }
`;
const AccordianWarningsLabel = styled.span`
    color: #d36c08;
`;
const Textarea = styled.textarea`
    word-break: break-all;
    white-space: pre;
`;

type SpanDetailProps = {
    theme: any;
    detailState: DetailState;
    linksGetter:
        | ((links: TraceKeyValuePair[], index: number) => TraceLink[])
        | TNil;
    logItemToggle: (spanID: string, log: TraceLog) => void;
    logsToggle: (spanID: string) => void;
    processToggle: (spanID: string) => void;
    eventsToggle: (spanID:string) => void;
    span: TraceSpan;
    //   timeZone: TimeZone;
    tagsToggle: (spanID: string) => void;
    traceStartTime: number;
    warningsToggle: (spanID: string) => void;
    stackTracesToggle: (spanID: string) => void;
    referenceItemToggle: (
        spanID: string,
        reference: TraceSpanReference
    ) => void;
    referencesToggle: (spanID: string) => void;
    createSpanLink?: SpanLinkFunc;
    focusedSpanId?: string;
    topOfViewRefType?: TopOfViewRefType;
};

export default function SpanDetail(props: SpanDetailProps) {
    const {
        detailState,
        linksGetter,
        logItemToggle,
        logsToggle,
        processToggle,
        span,
        tagsToggle,
        traceStartTime,
        warningsToggle,
        stackTracesToggle,
        referencesToggle,
        referenceItemToggle,
    } = props;
    const {
        isTagsOpen,
        isProcessOpen,
        logs: logsState,
        isWarningsOpen,
        references: referencesState,
        isStackTracesOpen,
    } = detailState;
    const {
        operationName,
        process,
        duration,
        relativeStartTime,
        startTime,
        spanID,
        logs,
        tags,
        warnings,
        references,
        stackTraces,
    } = span;
    //   const { timeZone } = props;
    const overviewItems = [
        {
            key: "svc",
            label: "Service:",
            value: process.serviceName,
        },
        {
            key: "duration",
            label: "Duration:",
            value: formatDuration(duration),
        },
        {
            key: "start",
            label: "Start Time:",
            value:
                formatDuration(relativeStartTime) + getAbsoluteTime(startTime),
        },
        ...(span.childSpanCount > 0
            ? [
                  {
                      key: "child_count",
                      label: "Child Count:",
                      value: span.childSpanCount,
                  },
              ]
            : []),
    ];

    return (
        <div data-testid="span-detail-component">
            <Header>
                <h2 className={cx(ubM0)}>{operationName}</h2>
                <ListWrapper>
                    <LabeledList
                        theme={props.theme}
                        className={ubTxRightAlign}
                        divider={true}
                        items={overviewItems}
                    />
                </ListWrapper>
            </Header>
            <Divider className={ubMy1} type={"horizontal"} />
            <div>
                <div>
                    <AccordianKeyValues
                        theme={props.theme}
                        data={tags}
                        label="Attributes"
                        linksGetter={linksGetter}
                        isOpen={isTagsOpen}
                        onToggle={() => tagsToggle(spanID)}
                    />
                    {process.tags && (
                        <AccordianKeyValues
                            theme={props.theme}
                            className={ubMb1}
                            data={process.tags}
                            label="Resource"
                            linksGetter={linksGetter}
                            isOpen={isProcessOpen}
                            onToggle={() => processToggle(spanID)}
                        />
                    )}
                </div>
                {span?.events?.length > 0 &&  (
                    <AccordianLogs
                        linksGetter={linksGetter}
                        logs={span.events}
                        isOpen={logsState.isOpen}
                        openedItems={logsState.openedItems}
                        onToggle={() => logsToggle(spanID)}
                        onItemToggle={(logItem) =>
                            logItemToggle(spanID, logItem)
                        }
                        timestamp={traceStartTime}
                    />
                )}
                {logs && logs.length > 0 && (
                    <AccordianLogs
                        linksGetter={linksGetter}
                        logs={logs}
                        isOpen={logsState.isOpen}
                        openedItems={logsState.openedItems}
                        onToggle={() => logsToggle(spanID)}
                        onItemToggle={(logItem) =>
                            logItemToggle(spanID, logItem)
                        }
                        timestamp={traceStartTime}
                    />
                )}
                {warnings && warnings.length > 0 && (
                    <AccordianText
                        className={AccordianWarnings}
                        headerClassName={AccordianWarningsHeader}
                        label={
                            <AccordianWarningsLabel>
                                Warnings
                            </AccordianWarningsLabel>
                        }
                        data={warnings}
                        isOpen={isWarningsOpen}
                        onToggle={() => warningsToggle(spanID)}
                    />
                )}
                {stackTraces && stackTraces.length && (
                    <AccordianText
                        label="Stack trace"
                        data={stackTraces}
                        isOpen={isStackTracesOpen}
                        TextComponent={(textComponentProps) => {
                            let text;
                            if (textComponentProps.data?.length > 1) {
                                text = textComponentProps.data
                                    .map(
                                        (stackTrace, index) =>
                                            `StackTrace ${
                                                index + 1
                                            }:\n${stackTrace}`
                                    )
                                    .join("\n");
                            } else {
                                text = textComponentProps.data?.[0];
                            }
                            return (
                                <Textarea
                                    style={{ cursor: "unset" }}
                                    readOnly
                                    cols={10}
                                    rows={10}
                                    value={text}
                                />
                            );
                        }}
                        onToggle={() => stackTracesToggle(spanID)}
                    />
                )}
                {references &&
                    references.length > 0 &&
                    (references.length > 1 ||
                        references[0].refType !== "CHILD_OF") && (
                        <AccordianReferences
                            data={references}
                            isOpen={referencesState.isOpen}
                            openedItems={referencesState.openedItems}
                            onToggle={() => referencesToggle(spanID)}
                            onItemToggle={(reference) =>
                                referenceItemToggle(spanID, reference)
                            }
                        />
                    )}
                <DebugInfo>
                    <DebugLabel data-label="SpanID:" /> {spanID}
                </DebugInfo>
            </div>
        </div>
    );
}

export const getAbsoluteTime = (
    startTime: number /* , timeZone: TimeZone */
) => {
    return ` (${moment(startTime / 1000)?.format("HH:mm:ss.SSS")})`;
};
