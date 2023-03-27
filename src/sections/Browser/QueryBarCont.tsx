import QueryEditor from "../../plugins/queryeditor";
import HistoryButton from "../../qryn-ui/Buttons/HistoryButton";
import ShowLabelsButton from "../../qryn-ui/Buttons/ShowLabelsButton";
import ShowLogsButton from "../../qryn-ui/Buttons/ShowLogsButton";
import ShowLogsRateButton from "../../qryn-ui/Buttons/ShowLogsRateButton";
import { QueryBarContainer } from "./styles";
import  DOMPurify  from "isomorphic-dompurify";
// query bar container (full view)


export const QueryBarCont = (props: any) => {
    const {
        isSplit,
        isTabletOrMobile,
        isBuilder,
        dataSourceType,
        handleQueryChange,
        expr,
        queryValue,
        handleInputKeyDown,
        queryHistory,
        handleHistoryClick,
        queryValid,
        onSubmit,
        onSubmitRate,
        loading,
    } = props;
    const buttonsHidden = () =>
        !isSplit &&
        !isTabletOrMobile &&
        dataSourceType !== "flux" &&
        dataSourceType !== "traces";
    return (
        <QueryBarContainer>
            {buttonsHidden() && dataSourceType === "logs" && !isBuilder && (
                <ShowLabelsButton {...props} />
            )}
            {(dataSourceType !== "logs" || !isBuilder) &&
                dataSourceType !== "metrics" && (
                    <QueryEditor
                        onQueryChange={handleQueryChange}
                        defaultValue={DOMPurify.sanitize(expr || "")}
                        value={queryValue} // queryValue should change and or update on datasource change
                        onKeyDown={handleInputKeyDown}
                    />
                )}

            {buttonsHidden() && dataSourceType === "logs" && !isBuilder && (
                <>
                    <HistoryButton
                        queryLength={queryHistory.length}
                        handleHistoryClick={handleHistoryClick}
                    />
                    {dataSourceType === "logs" && !isBuilder && (
                        <ShowLogsRateButton
                            disabled={!queryValid}
                            onClick={onSubmitRate}
                            isMobile={false}
                        />
                    )}
                    <ShowLogsButton
                        disabled={!queryValid}
                        onClick={onSubmit}
                        isMobile={false}
                        loading={loading || false}
                    />
                </>
            )}
            {dataSourceType === "traces" &&
                dataSourceType === "metrics" &&
                isSplit && (
                    <>
                        <ShowLogsButton
                            disabled={!queryValid}
                            onClick={onSubmit}
                            isMobile={false}
                            loading={loading || false}
                        />
                    </>
                )}
        </QueryBarContainer>
    );
};
