import { cx, css } from "@emotion/css";
import { useState } from "react";

import QueryTypeSwitch from "../QueryTypeBar/components/QueryTypeSwitch";

const QueryTraceSwitch = css`
    margin-top: 10px;
    display: flex;
    height:30px;
`;

export interface SwitchOpts {
    label: string;
    value: string;
}

const SWITCH_OPTIONS = [
    { label: "Search", value: "search" },
    { label: "TraceID", value: "traceId" },
];

export interface TracesSwitchProps {
    value: string;
    onChange: (e: Event) => void;
}

export default function TracesSwitch(props: TracesSwitchProps) {
    const { value, onChange } = props;

    const [switchValue, setSwitchValue] = useState(value || "traceId");

    const onTraceQueryChange = (e: any) => {
        setSwitchValue((_) => e);
        onChange(e);
    };

    return (
        <div className={cx(QueryTraceSwitch)}>
            <QueryTypeSwitch
                label={"Query Type"}
                options={SWITCH_OPTIONS}
                onChange={onTraceQueryChange}
                defaultActive={switchValue}
            />
        </div>
    );
}
