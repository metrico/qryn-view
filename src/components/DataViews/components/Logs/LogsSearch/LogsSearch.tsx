import { css, cx } from "@emotion/css";
import { ThemeProvider } from "@emotion/react";
import { useState } from "react";
import { useTheme } from "../../QueryBuilder/hooks";
import { LogsLabelValueSelector } from "../../QueryBuilder/LogsLabelValueSelector";

export const FlexWrap = css`
    display: flex;
    flex-wrap: wrap;
    margin-top: 3px;
`;

export default function LogsSearch(props: any) {
    const {
        handleLogValueChange,
        data: { dataSourceId, hasStats },
        searchButton,
        logsRateButton,
        statsSwitch,
 
    } = props;

    const handleLogChange = (e: any) => {
        handleLogValueChange(e);
    };

    const theme = useTheme();

    const [labelFilters, setLabelFilters] = useState([] as any); // check label filters

    const onLabelValueChange = (e: any) => {
        setLabelFilters((prev: any) => {
            if (prev?.length > 0) {
                if (prev?.some((s: any) => s.id === e.id)) {
                    return prev.map((labelFilter: any) => {
                        if (labelFilter.label === e.label) {
                            return { ...e };
                        }
                        return labelFilter;
                    });
                }
            }
            return [e];
        });
    };

    return (
        <ThemeProvider theme={theme}>
            <div className={cx(FlexWrap)}>
                <LogsLabelValueSelector
                    onChange={onLabelValueChange}
                    dataSourceId={dataSourceId}
                    // value={metricValue.value} // we dont need initial metric value in this case

                    labelValueChange={handleLogChange}
                />
            </div>
            <div style={{ display: "flex", margin: "10px 0px" }}>
                {searchButton}
                {logsRateButton}
                {hasStats && statsSwitch}
            </div>
        </ThemeProvider>
    );
}
