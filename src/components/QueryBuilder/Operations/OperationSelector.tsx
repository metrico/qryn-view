import {
    Menu,
    MenuButton,
    MenuItem,
    SubMenu as SubMenuInner,
} from "@szhsin/react-menu";
import "@szhsin/react-menu/dist/index.css";
import "@szhsin/react-menu/dist/transitions/slide.css";
import AddOutlinedIcon from "@mui/icons-material/AddOutlined";
import { useMemo } from "react";
import { css, cx, keyframes } from "@emotion/css";
import NavigateNextIcon from "@mui/icons-material/NavigateNext";
import classNames from "classnames";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import { useTheme } from "../../DataViews/components/QueryBuilder/hooks";
const menuShow = keyframes`
  from {
    opacity: 0;
  }
`;
const menuHide = keyframes`
  to {
    opacity: 0;
  }
`;
const menu = (theme: any) => css`
    font-family: sans-serif;
    font-size: 12px;
    user-select: none;
    color: ${theme.textColor} !important;
    background: ${theme.inputBg} !important;
    box-shadow: 1px 1px 20px 1px rgba(0, 0, 0, 0.1);
    border-radius: 3px;
    padding: 6px;
    min-width: 10rem;
`;

const submenuItem = (theme: any) => css`
    position: relative;
    font-size: 12px;
    color: ${theme.textColor} !important;
    background: ${theme.inputBg} !important;
    &::after {
        // content: <NavigateNextIcon/>;
        position: absolute;
        width: 4px;
        right: 0.625rem;
    }
    &:hover {
        background: ${theme.widgetContainer} !important;
    }
`;

const customSubMenu = css`
    display: flex;
    flex: 1;
    align-items: center;
    justify-content: space-between;
`;

const menuButtonStyles = (theme: any) => css`
    background: ${theme.inputBg};
    color: ${theme.textColor};
    border: 1px solid ${theme.buttonBorder};
    border-radius: 3px;
    padding: 4px 8px;
    display: flex;
    align-items: center;
    cursor: pointer;
    margin-left: 4px;
`;

const menuOpening = css`
    animation: ${menuShow} 0.15s ease-out;
`;

const menuClosing = css`
    animation: ${menuHide} 0.2s ease-out forwards;
`;

const menuItem = (theme: any) => css`
    // color:white;
    background: ${theme.inputBg} !important;
    color: ${theme.textColor} !important;
    border-radius: 3px;
    padding: 0.275rem 0.525rem;
    &:hover {
        background: ${theme.widgetContainer} !important;
    }
`;
const menuItemHover = (theme: any) => css`
    //  color: white !important;
    color: ${theme.textColor};
    background: ${theme.widgetContainer} !important;
`;

const menuItemClassName = ({ hover, disabled }: any, theme: any) =>
    classNames(menuItem(theme), {
        [menuItemHover(theme)]: hover,
    });

const submenuItemClassName = (modifiers: any, theme: any) => {
    return classNames(menuItemClassName(modifiers, theme), submenuItem(theme));
};

const menuClassName = (props: any /*{ state }: any */, theme: any) => {
    return classNames(menu(theme), {
        [menuOpening]: props.state === "opening",
        [menuClosing]: props.state === "closing",
    });
};

const SubMenu = (props: any) => {
    const { theme } = props;

    return (
        <SubMenuInner
            {...props}
            menuClassName={(e) => menuClassName(e, theme)}
            itemProps={{ className: (e) => submenuItemClassName(e, theme) }}
        />
    );
};

export const OperationsOptions: any = {
    Aggregations: [
        "Sum",
        "Min",
        "Max",
        "Avg",
        "Stddev",
        "Stdvar",
        "Count",
        "Topk",
        "Bottomk",
    ],
    "Range Functions": [
        "Rate",
        "Rate Counter",
        "Count Over Time",
        "Sum Over Time",
        "Bytes Rate",
        "Bytes Over Time",
        "Absent Over Time",
        "Avg Over Time",
        "Max Over Time",
        "Min Over Time",
        "First Over Time",
        "Last Over Time",
        "Quantile Over Time",
    ],
    Formats: [
        "Json",
        "Logfmt",
        "Regexp",
        "Pattern",
        "Unpack",
        "Line Format",
        //  "Label Format", // label format not supported yet
        "Unwrap", // unwrap should work later with range functions
    ],
    "Binary Operations": [
        "Add Scalar",
        "Subtract Scalar",
        "Multiply by scalar",
        "Divide by scalar",
        "Modulo by scalar",
        "Exponent",
        "Equal To",
        "Not Equal To",
        "Greater Than",
        "Less Than",
        "Greater Or Equal To",
        "Less Or Equal To",
        "Binary Operation With Query",
    ],
    "Label Filters": [
        "Label Filter Expression",
        "IP Label Filter Expression",
        "No Pipeline Errors",
    ],
    "Line Filters": [
        "Line Contains",
        "Line Does Not Contain",
        "Line Contains Case Insensitive",
        "Line Does Not Contain Case Insensitive",
        "Line Contains Regex Match",
        "Line Does Not Match Regex",
        "IP Line Filter Expression",
        "IP Line Not Filter Expression",
    ],
};

export type OperationOptions =
    | "Aggregations"
    | "Range Functions"
    | "Formats"
    | "Binary Operations"
    | "Label Filters"
    | "Line Filters";

export function CustomSubMenu({ item }: any) {
    return (
        <div className={cx(customSubMenu)}>
            {item} <NavigateNextIcon />
        </div>
    );
}

export const mainMenu = (theme: any) => css`
    margin-bottom: 6px;
    .szh-menu {
        background: ${theme.inputBg} !important;
        color: ${theme.textColor} !important;
    }
    .szh-menu__item {
        &:hover {
            background: ${theme.widgetContainer} !important;
        }
    }
`;

export default function OperationSelector({ menuClick }: any) {
    const operationTypes = useMemo(() => {
        return Object.keys(OperationsOptions);
    }, []);
    const theme = useTheme();
    return (
        <Menu
            className={cx(mainMenu(theme))}
            menuButton={
                <MenuButton className={cx(menuButtonStyles(theme))}>
                    {" "}
                    <AddOutlinedIcon
                        style={{ height: "13px", width: "13px" }}
                    />
                    <span
                        style={{
                            fontSize: "12px",
                            fontFamily: "sans-serif",
                        }}
                    >
                        Add Operator
                    </span>
                </MenuButton>
            }
        >
            {operationTypes?.map((t: any, i: number) => (
                <SubMenu label={t} key={i} theme={theme}>
                    {OperationsOptions[t]?.map((op: any, key: number) => (
                        <MenuItem
                            onClick={(e) => menuClick(e, op, t)}
                            style={{ fontSize: "12px" }}
                            key={key}
                        >
                            {op}
                        </MenuItem>
                    ))}
                </SubMenu>
            ))}
        </Menu>
    );
}

export function OperationSelectorFromType({ opType, onOperationSelect }: any) {
    const theme = useTheme();

    return (
        <Menu
            className={cx(mainMenu(theme))}
            menuButton={
                <KeyboardArrowDownIcon
                    style={{
                        height: "13px",
                        width: "13px",
                        margin: "0px 12px",
                        cursor: "pointer",
                    }}
                />
            }
        >
            {OperationsOptions[opType]?.map((op: any, key: number) => (
                <MenuItem
                    onClick={(e) => onOperationSelect(e, op)}
                    style={{ fontSize: "12px" }}
                    key={key}
                >
                    {op}
                </MenuItem>
            ))}
        </Menu>
    );
}
