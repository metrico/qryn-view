
import { useState } from "react";
import { LocalizationProvider } from "@mui/lab";
import AdapterDateFns from "@mui/lab/AdapterDateFns";
import { DateRangePicker } from "../daterangepicker";
import CopyLinkButton from "../copylinkbutton/CopyLinkButton";
import EmbedLinkButton from "../embedlinkbutton";

export function StatusBarSelectors() {

    const [open, setOpen] = useState();

    const isOpen = (e) => {
        e?.preventDefault();
        setOpen(!open);
    };

    return (
        <LocalizationProvider dateAdapter={AdapterDateFns}>
            <div className={"status-options"}>
                <div className={"status-selectors"}>
                    <CopyLinkButton />
                    <EmbedLinkButton/>
                </div>

                <DateRangePicker isOpen={isOpen} />
            </div>
        </LocalizationProvider>
    );
}
