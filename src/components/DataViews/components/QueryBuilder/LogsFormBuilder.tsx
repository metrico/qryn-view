import { cx } from "@emotion/css";
import { ThemeProvider, useTheme } from "@emotion/react";
import { useCallback, useEffect, useState } from "react";
import useLogLabels from "./hooks/useLogLabels";
import { FlexColumn } from "./styles";

import { LogsFormBuilderProps, Builder } from "./types";
import { FormBuilders } from "./FormBuilders";
import QueryPreview from "./QueryPreview";
import { useSelector } from "react-redux";

const initialBuilder: Builder = {
    operations: [],
    labelsState: [],
    binaryValue: { binaryOpt: "divide", vectOpt: "on", vectValue: "" },
    builderResult: "",
    logsVolumeQuery: "",
    isBinary: false,
};

export const initialMetricsBuilder: Builder = {
    operations: [],
    labelsState: [],
    binaryValue: { binaryOpt: "divide", vectOpt: "on", vectValue: "" },
    builderResult: "",
    logsVolumeQuery: "",
    isBinary: false,
    isMetrics: true,
};

const binaryOperatorOpts: any = {
    minus: "-",
    plus: "+",
    by: "*",
    divide: "/",
    exp: "^",
    equals: "==",
    not_equals: "!=",
    modulo: "%",
    more: "<",
    less: ">",
    less_equals: "<=",
    more_equals: ">=",
};

export function LogsFormBuilder(props: LogsFormBuilderProps) {

    const {
        dataSourceId,
        labelValueChange,
        handleLogsVolumeChange,
        searchButton,
    } = props;

    const dataSources = useSelector((store: any) => store.dataSources);

    const { start, stop } = useSelector((store: any) => store);

    const { logsResponse } = useLogLabels(
        dataSourceId,
        start,
        stop,
        dataSources
    );

    const [finalQuery, setFinalQuery] = useState("");
    const mainTheme = useTheme();
    // set here if its metrics or logs
    const [builders, setBuilders] = useState<Builder[]>([initialBuilder]);

    const addBinaryOperation = useCallback(
        (idx: number) => {
            setBuilders((prev) => [...prev, { ...prev[idx], isBinary: true }]);
        },
        // eslint-disable-next-line react-hooks/exhaustive-deps
        [builders]
    );

    useEffect(() => {
        if (builders[0].logsVolumeQuery !== "") {
            handleLogsVolumeChange(builders[0].logsVolumeQuery);
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [builders]);

    useEffect(() => {
        labelValueChange(finalQuery);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [finalQuery]);

    useEffect(() => {
        setBuilders((prev) => {
            const next = [...prev];
            return next.map((builder: Builder) => ({
                ...builder,
                logsResponse,
            }));
        });
    }, [logsResponse]);

    // add logs to string and the logs volume

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
                    type={"logs_search"}
                    addBinary={addBinaryOperation}
                    dataSourceId={dataSourceId}
                    logsResponse={logsResponse}
                    setBuilders={setBuilders}
                    builders={builders}
                    finalQuery={finalQuery}
                />
                <QueryPreview
                    queryText={finalQuery}
                    searchButton={searchButton}
                
                />
            </div>
        </ThemeProvider>
    );
}
