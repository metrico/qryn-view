import Configurator from "./Configurator";
import { setIsCardinality } from "./store/setIsCardinality";
import { useDispatch, useSelector } from "react-redux";
import { useCardinalityData } from "./api/useCardinalityData";
import { useEffect } from "react";
import useTheme from "@ui/theme/useTheme";
import CardinalitySeries from "./CardinalitySeries";

export const Cardinality = () => {
    const dispatch: any = useDispatch();
    const theme = useTheme();
    const isCardinality = useSelector((store: any) => store.isCardinality);

    useEffect(() => {
        dispatch(setIsCardinality(true));
        return () => {
            dispatch(setIsCardinality(false));
        };
    }, []);

    const { totalSeries, formattedSeries, isLoading } = useCardinalityData();

    return (
        <div
            style={{
                flex: 1,
                display: "flex",
                flexDirection: "column",
            }}
        >
            <Configurator theme={theme} total={totalSeries} percent={35} />
            <CardinalitySeries
                formattedSeries={formattedSeries}
                isCardinality={isCardinality}
                isLoading={isLoading}
            />
        </div>
    );
};
