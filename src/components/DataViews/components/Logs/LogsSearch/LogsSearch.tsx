import { cx } from "@emotion/css";
import { ThemeProvider } from "@emotion/react";
import { FlexWrap } from "../styled";
import { useTheme } from "../../QueryBuilder/hooks";
import { LogsFormBuilder } from "../../QueryBuilder/LogsFormBuilder";
export default function LogsSearch(props: any) {
    
    const {
        handleLogValueChange,
        data: { dataSourceId, hasStats },
        searchButton,
        statsSwitch,
    } = props;

    const handleLogChange = (e: string) => {
        handleLogValueChange(e);
    };

    const theme = useTheme();

    return (
        <ThemeProvider theme={theme}>
            <div className={cx(FlexWrap)}>
                <LogsFormBuilder
                    {...props}
                    dataSourceId={dataSourceId}
                    labelValueChange={handleLogChange}
                    searchButton={searchButton}
                />
            </div>
            {hasStats && (
                <div style={{ display: "flex", margin: "10px 0px" }}>
                    {statsSwitch}
                </div>
            )}
        </ThemeProvider>
    );
}
