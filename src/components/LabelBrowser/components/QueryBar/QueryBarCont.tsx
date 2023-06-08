import React from "react";
import { useSelector } from "react-redux";
import { QueryBarContainer } from "../styled";
import ShowLabelsButton from "../Buttons/ShowLabelsButton";
import QueryEditor from "../../../../plugins/queryeditor";
import DOMPurify from "isomorphic-dompurify";
import HistoryButton from "../Buttons/HistoryButton";
import ShowLogsRateButton from "../Buttons/ShowLogsRateButton";
import ShowLogsButton from "../Buttons/ShowLogsButton";

type QueryBarContProps = {

    //booleans
    isTabletOrMobile: boolean;
    isBuilder: boolean;
    isSplit: boolean;
    loading: boolean;
    queryValid: boolean;

    //data
    dataSourceType: string;
    expr: string;
    queryValue: any;
    queryHistory: any;
    labels:any;

    //handlers
    handleQueryChange: (e:any) => void;
    handleInputKeyDown: (e:any) => void;
    handleHistoryClick: (e:any) => void;

    //events
    onSubmit: (e:any) => void;
    onSubmitRate: (e:any) => void;
};

const QueryBarCont: React.FC<QueryBarContProps> = (props) => {
    const {
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
    const isSplit = useSelector((store: any) => store.isSplit);
    
    const dType = (type: string) => dataSourceType === type;

    const buttonsHidden = () =>
        !isSplit && dataSourceType !== "flux" && dataSourceType !== "traces";

    return (
        <QueryBarContainer>
            {!isTabletOrMobile && !isSplit && !isBuilder && dType("logs") && (
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

            {buttonsHidden() &&
                dataSourceType === "logs" &&
                !isBuilder &&
                !isTabletOrMobile && (
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
            {(dataSourceType === "traces" || dataSourceType === "metrics") && (
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

export default QueryBarCont;
