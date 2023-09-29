import React from "react";
import {
    StyledTabs,
    StyledTab,
} from "@ui/main/components/QueryItem/StyledTabs";
import { css, cx } from "@emotion/css";
export type SeriesHeaderProps = {
    title: string;
    theme: any;
    tabsValue?: number;
    onTabChange?: any;
};
// here should be the tabs for table / chart view
export const StyledTabsCont = (theme: any) => css`
    background: ${theme.WidgetBg};
    .MuiTabs-root {
        height: 20px !important;
        min-height: 20px;
    }
    .MuiButtonBase-root {
        min-height: 0;
    }
`;

const SeriesHeader: React.FC<SeriesHeaderProps> = ({
    title,
    tabsValue,
    onTabChange,
    theme,
}: SeriesHeaderProps) => {
    return (
        <div className="c-header">
            <div>{title}</div>
            <div className={cx(StyledTabsCont(theme))}>
                <StyledTabs value={tabsValue} onChange={onTabChange}>
                    <StyledTab label="Table" />
                    <StyledTab label="Chart" />
                </StyledTabs>
            </div>
        </div>
    );
};

export default SeriesHeader;
