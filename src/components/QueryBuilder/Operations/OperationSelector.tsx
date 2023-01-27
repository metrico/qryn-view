import { Menu, 
  MenuButton, 
  MenuItem,
  SubMenu as SubMenuInner } from "@szhsin/react-menu";
import "@szhsin/react-menu/dist/index.css";
import "@szhsin/react-menu/dist/transitions/slide.css";
import AddOutlinedIcon from "@mui/icons-material/AddOutlined";
import { useMemo } from "react";
import { css,keyframes } from "@emotion/css";
import rightArrow from "../chevron-right-solid.svg";
import classNames from "classnames";


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
const menu = css`
  font-family: sans-serif;
  font-size:12px;
  user-select: none;
  box-shadow: 1px 1px 20px 1px rgba(0, 0, 0, 0.1);
  border-radius: 3px;
  padding: 6px;
  min-width: 10rem;
`;

const submenuItem = css`
  position: relative;
  font-size: 12px;
  &::after {
    content: url(${rightArrow});
    position: absolute;
    width: 4px;
    right: 0.625rem;
  }
`;

const menuOpening = css`
  animation: ${menuShow} 0.15s ease-out;
`;

const menuClosing = css`
  animation: ${menuHide} 0.2s ease-out forwards;
`;

const menuItem = css`
  border-radius: 3px;
  padding: 0.275rem 0.525rem;
`;
const menuItemHover = css`
//  color: #fff;
  background: #59a2ff;
`;


const menuItemClassName = ({ hover, disabled }:any) =>
  classNames(menuItem, {
    [menuItemHover]: hover
  });

const submenuItemClassName = (modifiers:any) =>
  classNames(menuItemClassName(modifiers), submenuItem);


const menuClassName = ({ state }:any) =>
  classNames(menu, {
    [menuOpening]: state === "opening",
    [menuClosing]: state === "closing"
  });

const SubMenu =(props:any) => (
  <SubMenuInner
  {...props}
  menuClassName={menuClassName}
  itemProps={{className: submenuItemClassName}}
  />
)


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
        "Label Format",
        "Unwrap",
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
        "Line Contains Regex Match",
        "Line Does Not Match Regex",
        "IP Line Filter Expression",
    ],
};

export type OperationOptions =
    | "Aggregations"
    | "Range Functions"
    | "Formats"
    | "Binary Operations"
    | "Label Filters"
    | "Line Filters";

export default function OperationSelector() {
    const operationTypes = useMemo(() => {
        return Object.keys(OperationsOptions);
    }, []);

    return (
        <Menu
            menuButton={
                <MenuButton>
                    <AddOutlinedIcon
                        style={{ height: "13px", width: "13px" }}
                    />
                    Add Operator
                </MenuButton>
            }
        >
            {operationTypes?.map((t: any, i: number) => (
                <SubMenu label={t}>
                    {OperationsOptions[t]?.map((op: any, key: number) => (
                        <MenuItem style={{fontSize:'12px'}} key={key}>{op}</MenuItem>
                    ))}
                </SubMenu>
            ))}
        </Menu>
    );
}
