import { VectorTable } from "../components/Table/VectorTable/VectorTable";
import { ViewHeader } from "../components/ViewHeader";
import { ViewStyled } from "./styled";

export function VectorView(props) {
    const {
        viewRef,
        panelSize,
        viewHeight,
        onStreamClose,
        onMinimize,
        onMaximize,
        actualQuery,
        total,
        type,
        theight,
        streamData,
        
    } = props;
    return (
        <ViewStyled ref={viewRef} size={panelSize} vheight={viewHeight}>
            <ViewHeader
                onClose={onStreamClose}
                onMinimize={onMinimize}
                onMaximize={onMaximize}
                actualQuery={actualQuery}
                total={total}
                type={type}
                {...props}
            />
            <div className="view-content" id={actualQuery?.id + "-view"}>
                <VectorTable
                    {...props}
                    height={theight}
                    data={streamData}
                    actualQuery={actualQuery}
                />
            </div>
        </ViewStyled>
    );
}
