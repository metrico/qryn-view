import { css } from "@emotion/css";

export const cStyles = (theme: any, minWidth: number) => ({
    menu: (base: any) => ({
        ...base,
        fontSize: "12px",
        color: theme.textColor,
    }),
    control: (base: any) => ({
        ...base,
        fontSize: "12px",
        height: 28,
        minHeight: 28,
        boxShadow: "none",
        color: theme.textColor,
        // marginTop: "5px",
        minWidth,
    }),
    input: (base: any) => ({
        ...base,
        fontSize: "12px",
        color: theme.textColor,
    }),
    indicatorSeparator: (base: any) => ({
        display: "none",
    }),
    dropdownIndicator: (base: any) => ({
        padding: 0,
        svg: {
            height: 12,
        },
        color: theme.textColor,
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
        color: theme.textColor,
    }),
});

export const LabelValueContStyles = css`
    display: flex;
    flex-wrap: wrap;
    align-items: center;
    margin-left: 3px;
    margin-top: 3px;
`;
export const FlexCenter = css`
    display: flex;
    align-items: center;
`;

export const IconStyle = (theme: any) => css`
    color: ${theme.textColor};
    margin: 0px 5px;
    cursor: "pointer";
`;


export const InitialAddStyle = (theme: any) => css`
    display: flex;
    align-items: center;
    margin-top: 5px;
    cursor: pointer;
    color: ${theme.textColor};
`;

export const AddIconStyle = (theme: any) => css`
    margin: 0px 5px;
    color: ${theme.textColor};
`;

export const FlexWrap = css`
    display: flex;
    flex-wrap: wrap;
`;
