import { cx } from "@emotion/css";
import { ThemeProvider, useTheme } from "@emotion/react";
import { useCallback, useEffect, useState } from "react";
import useLogLabels from "./hooks/useLogLabels";
import { FlexColumn } from "./styles";

import { MetricsFormBuilderProps, Builder } from "./types";
import { FormBuilders } from "./FormBuilders";
import QueryPreview from "./QueryPreview";
import { useSelector } from "react-redux";
import { initialMetricsBuilder,binaryOperatorOpts } from "./consts";


export function MetricsFormBuilder(props: MetricsFormBuilderProps) {
    const { dataSourceId, labelValueChange, handleMetricsChange } = props;

    const dataSources = useSelector((store: any) => store.dataSources);

    const { start, stop } = useSelector((store: any) => store);

    // this one should be comming form selected metric

    const { logsResponse } = useLogLabels(dataSourceId, start, stop, dataSources); // pass here all data needed

    const [finalQuery, setFinalQuery] = useState("");
    const mainTheme = useTheme();


    const [builders, setBuilders] = useState<Builder[]>([initialMetricsBuilder]);


    const addBinaryOperation = useCallback(
        (idx: number) => {
            setBuilders((prev) => [...prev, { ...prev[idx], isBinary: true }]);
        },
            // eslint-disable-next-line react-hooks/exhaustive-deps
        [builders]
    );


    useEffect(()=>{
        labelValueChange(finalQuery)
            // eslint-disable-next-line react-hooks/exhaustive-deps
    },[finalQuery])

    useEffect(() => {
        setBuilders((prev) => {
            const next = [...prev];
            return next.map((builder: Builder) => ({
                ...builder,
                logsResponse,

            }));
        });
    }, [logsResponse]);


    const binaryToString = (builder: Builder) => {
        const { binaryValue } = builder;
        const { binaryOpt, vectOpt, vectValue } = binaryValue;
        let vectString = "";
        if (vectValue !== "") {
            vectString = `${vectOpt}(${vectValue})`;
        }
        return ` ${binaryOperatorOpts[binaryOpt]} ${vectString}`;
    };

    const finalQueryOperator = (builders: Builder[]) => {
        let finalQuery = "";

        builders.forEach((builder) => {
            if (!builder.isBinary) {
                finalQuery += builder.builderResult;
            } else {
                finalQuery += `${binaryToString(builder)} ${
                    builder.builderResult
                }`;
            }
        });
        return finalQuery;
    };

    useEffect(() => {
        setFinalQuery(finalQueryOperator(builders));
          // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [builders]);

    return (
        <ThemeProvider theme={mainTheme}>
            <div className={cx(FlexColumn)}>
                <FormBuilders
                    type={'metrics_search'}
                    addBinary={addBinaryOperation}
                    dataSourceId={dataSourceId}
                    logsResponse={logsResponse}
                    setBuilders={setBuilders}
                    builders={builders}
                    finalQuery={finalQuery}
                    
                />
                <QueryPreview queryText={finalQuery} />
            </div>
        </ThemeProvider>
    );
}
