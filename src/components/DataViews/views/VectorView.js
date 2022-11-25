import { forwardRef, useEffect, useRef, useState } from "react";
import QrynChart from "../components/Charts";
import { VectorTable } from "../components/Table/VectorTable/VectorTable";
import { ViewHeader } from "../components/ViewHeader";
import { ViewStyled } from "./styled";

export const VectorView = (props) => {
    const {
        viewRef,
        panelSize,
        viewHeight,
        setStreamClose,
        setMinimize,
        setMaxHeight,
        actualQuery,
        total,
        type,
        theight,
        streamData,
        viewWidth,
        limit
    } = props;
    const [size, setSize] = useState(0);

    const parentRef = useRef(null);
    useEffect(() => {
        setSize(parentRef.current.offsetHeight);
    }, [parentRef]);
    const streamDataChart = []; //streamData.dataRows.map((row, index)=>
    //     ({
    //         id: index,
    //         metric: row,
    //         values: [[row._time?.getTime() / 1000, row._value?.toString()]

    //         ]
    //     })
    // )
    console.log(streamData)
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
            <div className="view-content" ref={parentRef} id={actualQuery?.id + "-view"}>
                {false ? 
                <VectorTable
                    {...props}
                    size={size}
                    height={theight}
                    data={streamData}
                    actualQuery={actualQuery}
                /> :
                (
                    <QrynChart
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
