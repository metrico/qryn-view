import { useSelector } from "react-redux";
import { useState } from "react";
import { setQueryLimit, setQueryStep } from "../../../../actions";
import { LocalizationProvider } from "@mui/lab";
import AdapterDateFns from "@mui/lab/AdapterDateFns";
import { StatusBarInput } from "../statusbarinput/StatusBarInput";
import { DateRangePicker } from "../daterangepicker";
import CopyLinkButton from "../copylinkbutton/CopyLinkButton";

export function StatusBarSelectors() {
    const queryLimit = useSelector((store) => store.limit);
    const queryStep = useSelector((store) => store.step);
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

                    <StatusBarInput
                        label={"Limit"}
                        value={queryLimit}
                        dispatchAction={setQueryLimit}
                        type={"limit"}
                    />
                    <StatusBarInput
                        label={"Step"}
                        value={queryStep}
                        dispatchAction={setQueryStep}
                        type={"limit"}
                    />
                </div>

                <DateRangePicker isOpen={isOpen} />
            </div>
        </LocalizationProvider>
    );
}
