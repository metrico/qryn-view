import { BarGaugeCell } from "../components/Cells/BarGaugeCell";
import { GeoCell } from "../GeoCell";
import { ImageCell } from "../ImageCell";
import { JSONViewCell } from "../JSONViewCell";
import { FieldType } from "../Tables";
import { DefaultCell } from "./DefaultCell";

export const TableCellDisplayMode = {
    Auto: "auto",
    BasicGauge: "basic",
    ColorBackground: "color-background",
    ColorBackgroundSolid: "color-background-solid",
    ColorText: "color-text",
    GradientGauge: "gradient-gauge",
    Image: "image",
    JSONView: "json-view",
    LcdGauge: "lcd-gauge",
};

export function getCellComponent(displayMode, field) {
    switch (displayMode) {
        case TableCellDisplayMode.ColorText:
        case TableCellDisplayMode.ColorBackground:
            return DefaultCell;
        case TableCellDisplayMode.Image:
            return ImageCell;
        case TableCellDisplayMode.LcdGauge:
        case TableCellDisplayMode.BasicGauge:
        case TableCellDisplayMode.GradientGauge:
            return BarGaugeCell;
        case TableCellDisplayMode.JSONView:
            return JSONViewCell;
        case field.type === FieldType.geo:
            return GeoCell;
        case field.type === FieldType.other:
            return JSONViewCell;

        default:
            return DefaultCell;
    }
}
