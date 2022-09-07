import { useState } from "react";
import { LocalizationProvider } from "@mui/lab";
import AdapterDateFns from "@mui/lab/AdapterDateFns";
import { DateRangePicker } from "../daterangepicker";
import CopyLinkButton from "../copylinkbutton/CopyLinkButton";

import { themes } from "../../../../theme/themes";
import { useSelector } from "react-redux";
import { ThemeProvider } from "@emotion/react";
import SplitViewButton from "../SplitViewButton";
import { useMediaQuery } from "react-responsive";

export function StatusBarSelectors() {
    const [open, setOpen] = useState();
    const isTabletOrMobile = useMediaQuery({ query: "(max-width: 914px)" });
    const theme = useSelector((store) => store.theme);
    const isOpen = (e) => {
        e?.preventDefault();
        setOpen(!open);
    };

    return (
        <ThemeProvider theme={themes[theme]}>
            <LocalizationProvider dateAdapter={AdapterDateFns}>
                <div className={"status-options"}>
                    <div className={"status-selectors"}>
                        {!isTabletOrMobile && <SplitViewButton />}

                        <CopyLinkButton />
                    </div>

                    <DateRangePicker isOpen={isOpen} />
                </div>
            </LocalizationProvider>
        </ThemeProvider>
    );
}
