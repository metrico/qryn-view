// here we should :
// search for metrics values
// searc for label- values of metrics
import { ThemeProvider } from "@emotion/react";
import { useMemo, useState } from "react";
import { useSelector } from "react-redux";
import { themes } from "../../../../theme/themes";
import { Select } from "../../../../views/DataSources/ui";
import { useMetricsList } from "./useMetricsList";
import { useValuesFromMetrics } from "./useValuesFromMetrics";

export const OPERATOR_OPTIONS = [
    {name:'=',value:'equals'},
    {name:'~=',value:'regexequals'},
    {name:'!=',value:'excludeequals'},
    {name:'!~',value:'regexexclude'},
]


export const OPERATORS = {
    equals: '=',
    regexequals : '~=',
    excludeequals:'!=', 
    regexexclude:'!~'
}


export default function MetricsSearch(props: any) {
    const {
        data: { dataSourceType, dataSourceId, dataSourceURL },
    } = props;
    const metricsOpts = useValuesFromMetrics(dataSourceId);
    //   console.log(props)

    const [metricValue, setMetricValue] = useState(
        metricsOpts[0] || { name: "", value: "" }
    );

    const [labelFilters, setLabelFilters] = useState(
        [{metric:'',label:'',operator:'',value:''}]
    )


    // const {id} = props

    const storeTheme = useSelector(
        (store: { theme: "light" | "dark" }) => store.theme
    );

    const theme = useMemo(() => {
        return themes[storeTheme];
    }, [storeTheme]);

    const valuesOpts = useMetricsList(dataSourceId,metricValue.value)


    // type, url, id ?
    // const metricsList = useMetricsList(dataSourceId);

    const onMetricChange = (e: any) => {
        const value = e.target.value;
        setMetricValue((prev) => ({ ...prev, name: value, value }));
    };

    console.log(metricsOpts);
    // console.log(valuesFromMetrics)

    return (
        <ThemeProvider theme={theme}>
            <Select
                fullWidth={false}
                label={"Select Metric"}
                placeHolder={"Select Metric"}
                onChange={onMetricChange}
                value={metricValue}
                opts={metricsOpts}
                labelWidth={80}
            />
        </ThemeProvider>
    );
}
