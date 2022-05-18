import { EmptyCell } from "../EmptyCell";
import { FooterCell } from "./FooterCell";


export function getFooterValue(index, footerValues=[]) {
    if (footerValues === undefined) {
      return EmptyCell;
    }
  
    return FooterCell({ value: footerValues[index] });
  }