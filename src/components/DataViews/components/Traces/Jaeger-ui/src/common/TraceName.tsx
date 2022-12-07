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

import * as React from 'react';


import { FALLBACK_TRACE_NAME } from '../constants';
import { TNil } from '../types';

import BreakableText from './BreakableText';



type Props = {
  className?: string;
  traceName?: string | TNil;
};

export default function TraceName(props: Props) {
  const { className, traceName } = props;
  const text = String(traceName || FALLBACK_TRACE_NAME);
  const title = <BreakableText text={text} />;
  return <span className={className}>{title}</span>;
}
