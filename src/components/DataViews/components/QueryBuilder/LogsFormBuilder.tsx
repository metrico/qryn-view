import { cx } from "@emotion/css";
import { ThemeProvider, useTheme } from "@emotion/react";
import { useCallback, useEffect, useMemo, useState } from "react";
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
    logsVolumeQuery:"",
    isBinary: false,
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
    const { dataSourceId, labelValueChange,  handleLogsVolumeChange } = props;

    const dataSources = useSelector((store: any) => store.dataSources);

    const { start, stop } = useSelector((store: any) => store);


    const { logsResponse } = useLogLabels(dataSourceId, start, stop, dataSources); // pass here all data needed

    const [finalQuery, setFinalQuery] = useState("");
    const mainTheme = useTheme();

    const [builders, setBuilders] = useState<Builder[]>([initialBuilder]);

    const [logsVolumeQuery, setLogsVolumeQuery] = useState("")

    const addBinaryOperation = useCallback(
        (idx: number) => {
            setBuilders((prev) => [...prev, { ...prev[idx], isBinary: true }]);
        },
        [builders]
    );


    useEffect(()=>{
    if(builders[0].logsVolumeQuery !== '') {
        setLogsVolumeQuery(builders[0].logsVolumeQuery)
        handleLogsVolumeChange(builders[0].logsVolumeQuery)
    }
    },[builders])

    useEffect(()=>{
        labelValueChange(finalQuery)
        
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
    }, [builders]);

    return (
        <ThemeProvider theme={mainTheme}>
            <div className={cx(FlexColumn)}>
                <FormBuilders
                    addBinary={addBinaryOperation}
                    dataSourceId={dataSourceId}
                    logsResponse={logsResponse}
                    setBuilders={setBuilders}
                    builders={builders}
                    finalQuery={finalQuery}
                    setLogsVolumeQuery={setLogsVolumeQuery}
                />
                <QueryPreview queryText={finalQuery} />
            </div>
        </ThemeProvider>
    );
}
