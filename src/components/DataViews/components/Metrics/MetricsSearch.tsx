import { ThemeProvider } from "@emotion/react";
import { useTheme } from "../QueryBuilder/hooks";
import { cx } from "@emotion/css";
import { MetricsFormBuilder } from "../QueryBuilder/MetricsFormBuilder";
import { FlexWrap } from "../QueryBuilder/styles";
import { useSelector } from "react-redux";



/**
 * 
 * @param props 
 * @returns The metrics search component
 */
export default function MetricsSearch(props: any) {
    const {
        handleMetricValueChange, // goes to process AT query bar
        data: { dataSourceId, hasStats },
        searchButton,
        statsSwitch,
        logsRateButton,
    } = props;

    const handleMetricChange = (e: any) => {
        handleMetricValueChange(e);
    };

    const theme = useTheme();

    const isSplit = useSelector((store:any)=>store.isSplit)

    return (
        <ThemeProvider theme={theme}>
            <div className={cx(FlexWrap)}>
                <MetricsFormBuilder
                    {...props}
                    dataSourceId={dataSourceId}
                    labelValueChange={handleMetricChange}
                    searchButton={searchButton}
                    logsRateButton={logsRateButton}
                />
            </div>
            {hasStats && isSplit && (
                <div style={{ display: "flex", margin: "10px 0px" }}>
                    {statsSwitch}
                </div>
            )}
        </ThemeProvider>
    );
}
