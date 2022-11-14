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
import { get as _get, maxBy as _maxBy, values as _values } from "lodash";
import * as React from "react";
import MdKeyboardArrowRight from "@mui/icons-material/KeyboardArrowRight";

import {
    TUpdateViewRangeTimeFunction,
    ViewRange,
    ViewRangeTimeUpdate,
} from "..";
import ExternalLinks from "../common/ExternalLinks";
import LabeledList from "../common/LabeledList";
import TraceName from "../common/TraceName";
import { getTraceLinks } from "../model/link-patterns";
import { getTraceName } from "../model/trace-viewer";
import { Trace } from "../types/trace";
import { uTxMuted } from "../uberUtilityStyles";
import { formatDuration } from "../utils/date";

import SpanGraph from "./SpanGraph";
import styled from "@emotion/styled";
import { useTheme } from "@emotion/react";
import moment from "moment";
const TracePageHeaderStyled = styled.header`
    & > :first-of-type {
        border-bottom: 1px solid #e8e8e8;
    }
    & > :nth-of-type(2) {
        background-color: #eee;
        border-bottom: 1px solid #e4e4e4;
    }
    & > :last-child {
        border-bottom: 1px solid #ccc;
    }
`;
const TracePageHeaderTitleRow = styled.div`
    align-items: center;
    display: flex;
`;
const TracePageHeaderBack = css`
    align-items: center;
    align-self: stretch;
    background-color: #fafafa;
    border-bottom: 1px solid #ddd;
    border-right: 1px solid #ddd;
    color: inherit;
    display: flex;
    font-size: 1.4rem;
    padding: 0 1rem;
    margin-bottom: -1px;
    &:hover {
        background-color: #f0f0f0;
        border-color: #ccc;
    }
`;
const TracePageHeaderTitleLink = css`
    align-items: center;
    display: flex;
    flex: 1;

    &:hover * {
        text-decoration: underline;
    }
    &:hover > *,
    &:hover small {
        text-decoration: none;
    }
    /* Adapt styles when changing from a element into button */
    background: transparent;
    text-align: left;
    border: none;
`;
const TracePageHeaderDetailToggle = css`
    font-size: 2.5rem;
    transition: transform 0.07s ease-out;
`;
const TracePageHeaderDetailToggleExpanded = css`
    transform: rotate(90deg);
`;
const TracePageHeaderTitle = css`
    color: inherit;
    flex: 1;
    font-size: 18px;
    line-height: 1em;
    margin: 0 0 0 0.5em;
    padding-bottom: 0.5em;
`;
const TracePageHeaderTitleCollapsible = css`
    margin-left: 0;
`;
const TracePageHeaderOverviewItems = css`
    border-bottom: 1px solid #e4e4e4;
    padding: 0.25rem 0.5rem !important;
`;
const TracePageHeaderOverviewItemValueDetail = styled.span`
    ${cx(
        css`
            color: #aaa;
        `,
        "trace-item-value-detail"
    )}
`;
const TracePageHeaderOverviewItemValue = styled.span`
    &:hover > .trace-item-value-detail {
        color: unset;
    }
`;
const TracePageHeaderTraceId = styled.small`
    white-space: nowrap;
    font-size: 80%;
`;

type TracePageHeaderEmbedProps = {
    canCollapse: boolean;
    hideMap: boolean;
    hideSummary: boolean;
    onSlimViewClicked: () => void;
    onTraceGraphViewClicked: () => void;
    slimView: boolean;
    trace: Trace;
    updateNextViewRangeTime: (update: ViewRangeTimeUpdate) => void;
    updateViewRangeTime: TUpdateViewRangeTimeFunction;
    viewRange: ViewRange;
    theme: any;
};

// const toTz = (dateInUtctimeZone:any) => {
//     const date = dateInUtc as MomentInput;
//     const zone = moment.tz.zone(timeZone);

//     if (zone && zone.name) {
//       return moment.utc(date).tz(zone.name);
//     }

//     switch (timeZone) {
//       case 'utc':
//         return moment.utc(date);
//       default:
//         return moment.utc(date).local();
//     }
//   };

// export const dateTimeFormat = (dateInUtc, options?) =>
//   toTz(dateInUtc, getTimeZone(options)).format(getFormat(options));

export const HEADER_ITEMS = [
    {
        key: "timestamp",
        label: "Trace Start:",
        renderer(trace: Trace) {
            const formattedTS = moment(trace?.startTime / 1000).format(
                "YYYY-MM-DDTHH:mm:ss.SSSZ"
            );
            return formattedTS;
        },
    },
    {
        key: "duration",
        label: "Duration:",
        renderer: (trace: Trace) => formatDuration(trace.duration),
    },
    {
        key: "service-count",
        label: "Services:",
        renderer (trace: Trace) {
            console.log(trace.services)
            return  new Set(_values(trace.services).map((p) => p.name)).size
        },
           
    },
    {
        key: "depth",
        label: "Depth:",
        renderer: (trace: Trace) =>
            _get(_maxBy(trace.spans, "depth"), "depth", 0) + 1,
    },
    {
        key: "span-count",
        label: "Total Spans:",
        renderer: (trace: Trace) => trace?.spans?.length,
    },
];

export default function TracePageHeader(props: TracePageHeaderEmbedProps) {
    const {
        canCollapse,
        hideMap,
        hideSummary,
        onSlimViewClicked,
        slimView,
        trace,
        updateNextViewRangeTime,
        updateViewRangeTime,
        viewRange,
    } = props;

    const theme = useTheme();
    //   const styles = useStyles2(getStyles);
    const links = React.useMemo(() => {
        if (!trace) {
            return [];
        }
        return getTraceLinks(trace);
    }, [trace]);

    if (!trace) {
        return null;
    }

    const summaryItems =
        !hideSummary &&
        !slimView &&
        HEADER_ITEMS.map((item) => {
            const { renderer, ...rest } = item;
            return { ...rest, value: renderer(trace /* , styles */) };
        });

    const title = (
        <h1
            className={cx(
                TracePageHeaderTitle,
                canCollapse && TracePageHeaderTitleCollapsible
            )}
        >
            <TraceName traceName={getTraceName(trace.spans)} />{" "}
            <TracePageHeaderTraceId className={uTxMuted}>
                {trace.traceID}
            </TracePageHeaderTraceId>
        </h1>
    );

    return (
        <TracePageHeaderStyled>
            <TracePageHeaderTitleRow>
                {links && links.length > 0 && (
                    <ExternalLinks
                        links={links}
                        className={TracePageHeaderBack}
                    />
                )}
                {canCollapse ? (
                    <button
                        type="button"
                        className={TracePageHeaderTitleLink}
                        onClick={onSlimViewClicked}
                        role="switch"
                        aria-checked={!slimView}
                    >
                        <MdKeyboardArrowRight
                            className={cx(
                                TracePageHeaderDetailToggle,
                                !slimView && TracePageHeaderDetailToggleExpanded
                            )}
                        />
                        {title}
                    </button>
                ) : (
                    title
                )}
            </TracePageHeaderTitleRow>
            {summaryItems && (
                <LabeledList
                    className={TracePageHeaderOverviewItems}
                    items={summaryItems}
                />
            )}
            {!hideMap && !slimView && (
                <SpanGraph
                    {...props}
                    theme={theme}
                    trace={trace}
                    viewRange={viewRange}
                    updateNextViewRangeTime={updateNextViewRangeTime}
                    updateViewRangeTime={updateViewRangeTime}
                />
            )}
        </TracePageHeaderStyled>
    );
}
