
import ClokiChart from "../components/Charts";
import { VectorTable } from "../components/Table/VectorTable/VectorTable";
import { ViewHeader } from "../components/ViewHeader";
import { ViewStyled } from "./styled";

export const MatrixView = (props) => {
    const {
        viewRef,
        panelSize,
        viewHeight,
        setStreamClose,
        setMaxHeight,
        setMinimize,
        actualQuery,
        total,
        type,
        theight,
        tableData,
        viewWidth,
        limit,
        streamData,
    } = props;
    return (
        <ViewStyled ref={viewRef} size={panelSize} vheight={viewHeight}>
            <ViewHeader
                onClose={setStreamClose}
                setMinimize={setMinimize}
                setMaxHeight={setMaxHeight}
                actualQuery={actualQuery}
                total={total}
                type={type}
                {...props}
            />
            <div className="view-content">
                {actualQuery?.tableView ? (
                    <VectorTable
                        {...props}
                        height={theight}
                        data={tableData}
                        actualQuery={actualQuery}
                    />
                ) : (
                    <ClokiChart
                        {...props}
                        tWidth={viewWidth}
                        chartLimit={limit}
                        matrixData={streamData}
                        actualQuery={actualQuery}
                    />
                )}
            </div>
        </ViewStyled>
    );
};