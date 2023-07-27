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

import { TNil } from "../types/index";

type Props = {
    allowClear?: boolean;
    inputProps: Record<string, any>;
    location: Location;
    match: any;
    trackFindFunction?: (str: string | TNil) => void;
    value: string | undefined;
    onChange: (value: string) => void;
};

const UiFindInput: React.FC<Props> = ({
    inputProps = {},
    value = "",
    onChange,
}) => {
    const [inputValue, setInputValue] = useState<string>(value);

    const clearUiFind = () => {
        onChange("");
    };

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const newValue = e.currentTarget.value;
        setInputValue(newValue);
        onChange(newValue);
    };

    return (
        <input
            placeholder="Find..."
            {...inputProps}
            onChange={handleInputChange}
            // suffix={suffix}
            value={inputValue}
        />
    );
};

export default UiFindInput;
