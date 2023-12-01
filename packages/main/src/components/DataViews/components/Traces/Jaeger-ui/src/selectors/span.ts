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

import fuzzy from 'fuzzy';
import { createSelector } from 'reselect';

import { getProcessServiceName } from './process';

export const getSpanId = (span:any) => span.spanID;
export const getSpanName = (span:any) => span.operationName;
export const getSpanDuration = (span:any) => span.duration;
export const getSpanTimestamp = (span:any) => span.startTime;
export const getSpanProcessId = (span:any) => span.processID;
export const getSpanReferences = (span:any) => span.references || [];
export const getSpanReferenceByType = createSelector(
  createSelector(({ span }:{span:any}) => span, getSpanReferences),
  ({ type }:{type:any}) => type,
  (references, type) => references.find((ref:any) => ref.refType === type)
);
export const getSpanParentId = createSelector(
  (span:any) => getSpanReferenceByType({ span, type: 'CHILD_OF' }),
  (childOfRef) => (childOfRef ? childOfRef.spanID : null)
);

export const getSpanProcess = (span:any) => {
  if (!span.process) {
    throw new Error(
      `
      you must hydrate the spans with the processes, perhaps
      using hydrateSpansWithProcesses(), before accessing a span's process
    `
    );
  }

  return span.process;
};

export const getSpanServiceName = createSelector(getSpanProcess, getProcessServiceName);

export const filterSpansForTimestamps = createSelector(
  ({ spans }:{ spans:any }) => spans,
  ({ leftBound }: { leftBound:any }) => leftBound,
  ({ rightBound }:{ rightBound:any }) => rightBound,
  (spans, leftBound, rightBound) =>
    spans.filter((span:any) => getSpanTimestamp(span) >= leftBound && getSpanTimestamp(span) <= rightBound)
);

export const filterSpansForText = createSelector(
  ({ spans }:{ spans:any }) => spans,
  ({ text }:{ text:any }) => text,
  (spans, text) =>
    fuzzy
      .filter(text, spans, {
        extract: (span) => `${getSpanServiceName(span)} ${getSpanName(span)}`,
      })
      .map(({ original }) => original)
);

const getTextFilterdSpansAsMap:any = createSelector(filterSpansForText, (matchingSpans) =>
  matchingSpans.reduce(
    (obj:any, span:any) => ({
      ...obj,
      [getSpanId(span)]: span,
    }),
    {}
  )
);

export const highlightSpansForTextFilter = createSelector(
  ({ spans }:{spans:any}) => spans,
  getTextFilterdSpansAsMap,
  (spans, textFilteredSpansMap) =>
    spans.map((span:any) => ({
      ...span,
      muted: !textFilteredSpansMap[getSpanId(span)],
    }))
);
