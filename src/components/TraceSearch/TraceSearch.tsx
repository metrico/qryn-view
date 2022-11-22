// export default useTracesService(){

import { css, cx } from "@emotion/css";
import { useMemo, useState } from "react";
import { Select } from "../../views/DataSources/ui";
import { useTraceNames } from "./useTraceNames";
import { useTraceServiceName } from "./useTraceServiceName";

const SearchColumn = css`
    display: flex;
    flex-direction: column;
`;

// }

export default function TracesSearch(props: any) {
    const {
        data: { dataSourceId },
    } = props;
    const serviceNameOpts = useTraceServiceName({ id: dataSourceId });
    const traceNameOpts = useTraceNames({ id: dataSourceId });
    const [searchValue, setSearchValue] = useState(serviceNameOpts[0] || "");
    const [spanValue, setSpanValue] = useState(traceNameOpts[0] || "");

    const [urlState, setUrlState] = useState({
        searchName: searchValue.value,
        name: spanValue.value,
        tags:'',
        minDuration:'',
        maxDuration:'',
        limit:20
        
    })

    
    
    // console.log(res)
    const onServiceChange = (e: any) => {
        console.log(e);
        const value = e?.target?.value || "";

        setSearchValue({ name: value, value: value });
        setUrlState(prev => ({...prev, searchName:value}))
    };

    const onSpanChange = (e: any) => {
        const value = e?.target?.value || "";
        setSpanValue({ name: value, value: value });
        
    };


    // add limit
    // add tags 
    // add minDuration
    // add maxDuration

    return (
        <div className={cx(SearchColumn)}>
            <Select
                label={"Service Name"}
                placeHolder={"Select a Service"}
                onChange={onServiceChange}
                value={searchValue}
                opts={serviceNameOpts}
            />

            <Select
                label={"Span Name"}
                placeHolder={"select a span"}
                onChange={onSpanChange}
                value={spanValue}
                opts={traceNameOpts}
            />
        </div>
    );
}
