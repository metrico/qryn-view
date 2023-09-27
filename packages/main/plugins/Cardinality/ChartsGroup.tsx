import React, { useMemo } from "react";
import { type SeriesRowProps } from "./SeriesRow";
import { type QrynTheme } from "@ui/theme/types";
import { CardinalityChartsContainer } from "./ChartContainer";
import ChartContainer from "./ChartContainer";

type ChartsGroupProps = {
    rows: SeriesRowProps[];
    theme: QrynTheme;
};

export const formatValueTypesMapped = (
    valueTypesMapped: any,
    xAxisData,
    valueData,
    diffData
) => {
    return valueTypesMapped.reduce((acc: any, curr: any, i: number) => {
        let currName: any = xAxisData[i]?.split("=")[0];
        if (acc[currName] === undefined) {
            acc[currName] = {};
            acc[currName].names = [];
            acc[currName].values = [];
            acc[currName].diff = [];
        }
        acc[currName].names.push(curr);
        acc[currName].values.push(valueData[i]);
        acc[currName].diff.push(diffData[i]);
        return acc;
    }, {});
};

export const formatChartProps = (rows: SeriesRowProps[]) => {

    const xAxisData = rows?.map((row) => row.name);
    const valueData = rows?.map((row) => row.value);
    const diffData = rows?.map((row) =>
        row.diff < 0 ? row.diff * -1 : row.diff
    );
    const labelTypes = rows?.map((row) => row.name.split("=")[0]);
    const valueTypes: any = rows?.map((row) => row.name.split("=")[1]);

    return {
        xAxisData,
        valueData,
        diffData,
        labelTypes,
        valueTypes,
        valueTypesMapped: {},
        valueTypesKeys: [],
    };
};

export const useChartData = (rows: SeriesRowProps[]) => {
    return useMemo(() => {
        if (rows && rows?.length > 0) {
            const { xAxisData, valueData, diffData, labelTypes, valueTypes } =
                formatChartProps(rows);

            let valueTypesMapped = {};

            if (valueTypes?.[0] !== undefined) {
                valueTypesMapped = formatValueTypesMapped(
                    valueTypes,
                    xAxisData,
                    valueData,
                    diffData
                );
            }

            let valueTypesKeys = Object.keys(valueTypesMapped);

            return {
                xAxisData,
                valueData,
                diffData,
                labelTypes,
                valueTypes,
                valueTypesMapped,
                valueTypesKeys,
            };
        }

        return {
            xAxisData: [],
            valueData: [],
            diffData: [],
            labelTypes: [],
            valueTypes: [],
            valueTypesMapped: {},
            valueTypesKeys: [],
        };
    }, [rows]);
};

export const ChartsGroup: React.FC<ChartsGroupProps> = ({ rows, theme }) => {
    const chartData = useChartData(rows);


    if(rows.length === 0) return null

    return (
        <CardinalityChartsContainer>
            {chartData?.valueTypes[0] !== undefined ? (
                chartData?.valueTypesKeys?.map((chart, id) => (
                    <ChartContainer
                        key={id}
                        theme={theme}
                        rows={rows}
                        chart={chart}
                        hasDiff={false}
                        chartData={chartData}
                    />
                ))
            ) : (
                <ChartContainer
                    theme={theme}
                    rows={rows}
                    chartData={chartData}
                    hasDiff={true}
                />
            )}
        </CardinalityChartsContainer>
    );
};
