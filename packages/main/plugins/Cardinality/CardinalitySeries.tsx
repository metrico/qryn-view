import React from "react";
import { cx } from "@emotion/css";
import { SeriesGroup } from "./SeriesGroup";
import { getSeriesProps } from "./helpers";
import Loader from "./Loader";
import { resultsContainerStyles, openCardinalityStyles } from "./styles";
import useTheme from "@ui/theme/useTheme";

type CardinalitySeriesProps = {
    formattedSeries: any;
    isCardinality: boolean;
    isLoading: boolean;
  
};
// This component is used to display the series data in the cardinality rows
const CardinalitySeries: React.FC<CardinalitySeriesProps> = ({
    formattedSeries,
    isCardinality,
    isLoading,
}) => {
    const theme = useTheme();
    return (
        <div
            className={cx(
                resultsContainerStyles,
                isCardinality && openCardinalityStyles
            )}
        >
            {!isLoading ? (
                formattedSeries?.map((series: any, key: number) => (
                    <SeriesGroup
                        theme={theme}
                        key={key}
                        {...getSeriesProps(series)}
                    />
                ))
            ) : (
                <Loader />
            )}
        </div>
    );
};

export default CardinalitySeries;
