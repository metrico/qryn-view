import { useState } from "react";
import { DateRangePicker } from "../daterangepicker";
import CopyLinkButton from "../copylinkbutton/CopyLinkButton";
import { ThemeProvider } from "@emotion/react";
import SplitViewButton from "../SplitViewButton";
import { useMediaQuery } from "react-responsive";
import { useTheme } from "../../../DataViews/components/QueryBuilder/hooks";
import { css, cx } from "@emotion/css";

const StatusOptions = css`
    display: flex;
    align-items: center;
`;

const StatusSelectors = css`
    display: flex;
    align-items: center;
    .selector {
        margin-left: 10px;
        .label {
            flex: 1;
            color: #bfbfbf;
            white-space: nowrap;
            text-transform: uppercase;
            border-radius: 3px;
            font-size: 12px;
        }
    }
    & div {
        display: flex;
        align-items: center;
    }
`;

export function StatusBarSelectors() {
    const [open, setOpen] = useState(false);
    const isTabletOrMobile = useMediaQuery({ query: "(max-width: 914px)" });

    const theme = useTheme();
    const isOpen = (e: any) => {
        e?.preventDefault();
        setOpen(!open);
    };

    return (
        <ThemeProvider theme={theme}>
            <div className={cx(StatusOptions)}>
                <div className={cx(StatusSelectors)}>
                    {!isTabletOrMobile && <SplitViewButton />}

                    <CopyLinkButton />
                </div>

                <DateRangePicker isOpen={isOpen} />
            </div>
        </ThemeProvider>
    );
}
