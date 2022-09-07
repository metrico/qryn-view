import { LogRows } from "../components/Logs/LogRows";
import { VectorTable } from "../components/Table/VectorTable/VectorTable";
import { ViewHeader } from "../components/ViewHeader";
import { ViewStyled } from "./styled";

     
     export default function LogsView(props){

        const {
            viewRef,
            panelSize,
            viewHeight,
            onStreamClose,
            onMaximize,
            onMinimize,
            actualQuery,
            total,
            type,
            theight,
            tableData,
            streamData
        } = props

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
                <div className="view-content">
                    {actualQuery?.tableView ? (
                        <VectorTable
                            {...props}
                            height={theight}
                            data={tableData}
                            actualQuery={actualQuery}
                        />
                    ) : (
                        <LogRows
                            {...props}
                            onClose={onStreamClose}
                            messages={streamData}
                            actualQuery={actualQuery}
                        />
                    )}
                </div>
            </ViewStyled>
        );
     }  