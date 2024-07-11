import { cx } from "@emotion/css";
import { ThemeProvider, useTheme } from "@emotion/react";
import { useCallback, useEffect, useState } from "react";
import useLogLabels from "./hooks/useLogLabels";
import { FlexColumn } from "./styles";

import { MetricsFormBuilderProps, Builder } from "./types";
import { FormBuilders } from "./FormBuilders";
import { QueryPreviewContainer } from "@ui/plugins/QueryPreview";
import QueryEditor from "@ui/plugins/queryeditor";
import { useSelector } from "react-redux";
import { initialMetricsBuilder, binaryOperatorOpts } from "./consts";
import queryInit from "@ui/main/components/LabelBrowser/helpers/queryInit";

export function MetricsFormBuilder(props: MetricsFormBuilderProps) {
    const { dataSourceId, labelValueChange, searchButton, logsRateButton,data } =
        props;

    const dataSources = useSelector((store: any) => store.dataSources);

    const start = new Date(data?.start)
    const stop = new Date(data?.stop)

    const [editorValue, setEditorValue] = useState(queryInit(""));

    // this one should be comming form selected metric

    const { logsResponse } = useLogLabels(
        dataSourceId,
        start,
        stop,
        dataSources
    ); // pass here all data needed

    const [finalQuery, setFinalQuery] = useState("");
    const mainTheme = useTheme();

    const [builders, setBuilders] = useState<Builder[]>([
        initialMetricsBuilder,
    ]);

    const addBinaryOperation = useCallback(
        (idx: number) => {
            setBuilders((prev) => [...prev, { ...prev[idx], isBinary: true }]);
        },

        [builders]
    );

    useEffect(() => {
        labelValueChange(finalQuery);
        setEditorValue(queryInit(finalQuery));
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

    // send a 'logs query' to the builders

    const onEditorChange = (e) => {
        labelValueChange(e[0]?.children[0]?.text);
    };

    useEffect(() => {
        setFinalQuery(finalQueryOperator(builders));
    }, [builders]);

    return (
        <ThemeProvider theme={mainTheme}>
            <div className={cx(FlexColumn)}>
                <FormBuilders
                    start={start}
                    stop={stop}
                    type={"metrics_search"}
                    addBinary={addBinaryOperation}
                    dataSourceId={dataSourceId}
                    logsResponse={logsResponse}
                    setBuilders={setBuilders}
                    builders={builders}
                    finalQuery={finalQuery}
                />

                <div className={cx(QueryPreviewContainer(mainTheme))}>
                    <label>Raw Query</label>
                    <QueryEditor
                        onQueryChange={onEditorChange}
                        defaultValue={editorValue}
                        value={editorValue}
                    />
                    <div className="action-buttons">
                        {logsRateButton}
                        {searchButton}
                    </div>
                </div>
            </div>
        </ThemeProvider>
    );
}
// the queryPreview should be switched to a query editor with a button
