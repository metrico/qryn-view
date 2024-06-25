// Copyright (c) 2019 The Jaeger Authors.
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

import React from 'react';
import IoIosArrowDown from '@mui/icons-material/KeyboardArrowDown';
import IoIosArrowRight from '@mui/icons-material/ArrowForwardIos';

import { TraceSpanReference } from '../../types/trace';
import { uAlignIcon, ubMb1 } from '../../uberUtilityStyles';
import AccordianKeyValues from './AccordianKeyValues';
export type LinkTarget = '_blank' | '_self' | undefined;
export interface LinkModel<T = any> {
    href: string;
    title: string;
    target: LinkTarget;
    origin: T;
  
    // When a click callback exists, this is passed the raw mouse|react event
    onClick?: (e: any, origin?: any) => void;
  }


type AccordianReferencesProps = {
  data: TraceSpanReference[];
  highContrast?: boolean;
  interactive?: boolean;
  isOpen: boolean;
  openedItems?: Set<TraceSpanReference>;
  onItemToggle?: (reference: TraceSpanReference) => void;
  onToggle?: null | (() => void);
//   createFocusSpanLink: (traceId: string, spanId: string) => LinkModel<Field>;
};

type ReferenceItemProps = {
  data: TraceSpanReference[];
  interactive?: boolean;
  openedItems?: Set<TraceSpanReference>;
  onItemToggle?: (reference: TraceSpanReference) => void;
//   createFocusSpanLink: (traceId: string, spanId: string) => LinkModel<Field>;
};

// export for test
export function References(props: ReferenceItemProps) {
  const { data, /* createFocusSpanLink, */ openedItems, onItemToggle, interactive } = props;
//   const styles = useStyles2(getStyles);

  return (
    <div /* className={styles.AccordianReferencesContent} */>
      {data.map((reference, i) => (
        <div /* className={i < data.length - 1 ? styles.AccordianReferenceItem : undefined} */ key={i}>
          <div /* className={styles.item} */ key={`${reference.spanID}`}>
            {/*  <ReferenceLink reference={reference} createFocusSpanLink={null createFocusSpanLink }>
              <span  className={styles.itemContent} >
                {reference.span ? (
                  <span>
                    <span  className={cx('span-svc-name', styles.serviceName)}>
                      {reference.span.process.serviceName}
                    </span>
                    <small className="endpoint-name">{reference.span.operationName}</small>
                  </span>
                ) : (
                  <span className={cx('span-svc-name', styles.title)}>
                    View Linked Span <OpenInNewIcon />
                  </span>
                )}
                <small className={styles.debugInfo}>
                  <span className={styles.debugLabel} data-label="TraceID:">
                    {reference.traceID}
                  </span>
                  <span className={styles.debugLabel} data-label="SpanID:">
                    {reference.spanID}
                  </span>
                </small>
              </span>
            </ReferenceLink> */}
          </div>
          {!!reference.tags?.length && (
            <div /* className={styles.AccordianKeyValues} */>
              <AccordianKeyValues
                className={i < data.length - 1 ? ubMb1 : null}
                data={reference.tags || []}
                highContrast
                interactive={interactive}
                isOpen={openedItems ? openedItems.has(reference) : false}
                label={'attributes'}
                linksGetter={null}
                onToggle={interactive && onItemToggle ? () => onItemToggle(reference) : null}
              />
            </div>
          )}
        </div>
      ))}
    </div>
  );
}

const AccordianReferences: React.FC<AccordianReferencesProps> = ({
  data,
  interactive = true,
  isOpen,
  onToggle,
  onItemToggle,
  openedItems,
//   createFocusSpanLink,
}) => {
  const isEmpty = !Array.isArray(data) || !data.length;
  let arrow: React.ReactNode | null = null;
  let HeaderComponent: 'span' | 'a' = 'span';
  let headerProps: any | null = null;
  if (interactive) {
    arrow = isOpen ? <IoIosArrowDown className={uAlignIcon} /> : <IoIosArrowRight className={uAlignIcon} />;
    HeaderComponent = 'a';
    headerProps = {
      'aria-checked': isOpen,
      onClick: isEmpty ? null : onToggle,
      role: 'switch',
    };
  }

//   const styles = useStyles2(getStyles);
  return (
    <div /* className={styles.AccordianReferences} */>
      <HeaderComponent /* className={styles.AccordianReferencesHeader} */ {...headerProps}>
        {arrow}
        <strong>
          <span>References</span>
        </strong>{' '}
        ({data.length})
      </HeaderComponent>
      {isOpen && (
        <References
          data={data}
          openedItems={openedItems}
        //   createFocusSpanLink={createFocusSpanLink}
          onItemToggle={onItemToggle}
          interactive={interactive}
        />
      )}
    </div>
  );
};

export default React.memo(AccordianReferences);
