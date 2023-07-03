import { cx } from "@emotion/css";
import { ThemeProvider } from "@emotion/react";
import { FlexWrap } from "../styled";
import useTheme from "@ui/theme/useTheme"
import { LogsFormBuilder } from "../../QueryBuilder/LogsFormBuilder";
import { useSelector } from "react-redux";
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

    const isSplit = useSelector((store:any)=>store.isSplit)

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
            {hasStats && isSplit && (
                <div style={{ display: "flex", margin: "10px 0px" }}>
                    {statsSwitch}
                </div>
            )}
        </ThemeProvider>
    );
}
