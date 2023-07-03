import { css } from "@emotion/css";

export const cStyles = (theme: any, minWidth: number, flexOne?: boolean) => ({
    container: (base: any) => ({
        ...base,
        flex: flexOne ? 1 : "",
    }),
    menu: (base: any) => ({
        ...base,
        fontSize: "12px",
        color: theme.contrast,
    }),
    control: (base: any) => ({
        ...base,
        fontSize: "12px",
        height: 28,
        minHeight: 28,
        boxShadow: "none",
        color: theme.contrast,
        border: `1px solid ${theme.accentNeutral}`,
        // marginTop: "5px",
        minWidth,
        flex: flexOne ? 1 : "",
    }),
    input: (base: any) => ({
        ...base,
        fontSize: "12px",
        color: theme.contrast,
    }),
    indicatorSeparator: (base: any) => ({
        display: "none",
    }),
    dropdownIndicator: (base: any) => ({
        padding: 0,
        svg: {
            height: 12,
        },
        color: theme.contrast,
    }),
    clearIndicator: (base: any) => ({
        padding: 0,
        svg: {
            height: 12,
        },
    }),
    singleValue: (base: any) => ({
        ...base,
        fontSize: "12px",
        height: 30,
        minHeight: 30,
        margin: 0,
        padding: 0,
        marginTop: "4px",
        color: theme.contrast,
    }),
    valueContainer: (base: any) => ({
        ...base,
        display: "flex",
        flex: flexOne ? 1 : "",
    }),
});

export const LabelValueContStyles = css`
    display: flex;
    flex-wrap: wrap;
    align-items: center;
    gap: 3px;
`;
export const FlexCenter = css`
    display: flex;
    align-items: center;
`;

export const IconStyle = (theme: any) => css`
    color: ${theme.contrast};
    border: 1px solid ${theme.accentNeutral};
    margin-left: 3px;
    cursor: pointer;

    padding: 6px;
    display: flex;
    align-items: center;
    justify-content: center;
    border-radius: 3px;
`;

export const InitialAddStyle = (theme: any) => css`
    display: flex;
    align-items: center;
    margin-top: 3px;
    margin-left: 3px;
    cursor: pointer;
    color: ${theme.contrast};
    padding: 0px 12px;
    border-radius: 3px;
    height: 28px;
    small {
        font-size: 12px;
        margin: 0;
        padding: 0;
    }
`;

export const AddIconStyle = (theme: any) => css`
    color: ${theme.contrast};
    margin-right: 2px;
`;

export const FlexWrap = css`
    display: flex;
    flex-wrap: wrap;
    gap: 4px;
    margin: 0px 0px;
`;

export const FlexColumn = css`
    display: flex;
    flex-direction: column;
    flex: 1;
`;
export const MetricsContStyle = css`
    display: flex;
    flex-wrap: wrap;
    align-items: center;
`;
export const MetricsButtonsContStyle = css`
    display: flex;
    margin: 10px 0px;
`;
