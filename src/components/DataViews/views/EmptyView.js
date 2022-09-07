import { ViewHeader } from "../components/ViewHeader";
import EmptyViewCont from "../components/EmptyViewCont";
import { ViewStyled } from "./styled";

export function EmptyView(props) {
    const {
        viewRef,
        panelSize,
        onStreamClose,
        onMinimize,
        onMaximize,
        actualQuery,
        total,
    } = props;

    return (
        <ViewStyled ref={viewRef} size={panelSize} vheight={"regular"}>
            <ViewHeader
                onClose={onStreamClose}
                onMinimize={onMinimize}
                onMaximize={onMaximize}
                actualQuery={actualQuery}
                total={total}
                type={"empty"}
                fixedSize={true}
                {...props}
            />
            <EmptyViewCont />
        </ViewStyled>
    );
}
