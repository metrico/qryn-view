
import { useState } from "react";
import { LocalizationProvider } from "@mui/lab";
import AdapterDateFns from "@mui/lab/AdapterDateFns";
import { DateRangePicker } from "../daterangepicker";
import CopyLinkButton from "../copylinkbutton/CopyLinkButton";

import { themes } from '../../../../theme/themes';
import { useSelector } from 'react-redux';
import { ThemeProvider } from '@emotion/react';
import SplitViewButton from "../SplitViewButton";


export function StatusBarSelectors() {

    const [open, setOpen] = useState();

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
                        <SplitViewButton />
                        <CopyLinkButton />
                     
                </div>

                <DateRangePicker isOpen={isOpen} />
            </div>
        </LocalizationProvider>
        </ThemeProvider>
    );
}
