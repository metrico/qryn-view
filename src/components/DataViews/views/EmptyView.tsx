import { ViewHeader } from "../components/ViewHeader";
import EmptyViewCont from "../components/EmptyViewCont";
import { ViewStyled } from "./styled";

export function EmptyView(props: any) {
    const {
        viewRef,
        panelSize,
        setStreamClose,
        setMinimize,
        setMaxHeight,
        actualQuery,
        total,
        loading
    } = props;

    return (
        <ViewStyled ref={viewRef} size={panelSize} vheight={"regular"}>
            <ViewHeader
                onClose={setStreamClose}
                setMinimize={setMinimize}
                setMaxHeight={setMaxHeight}
                actualQuery={actualQuery}
                total={total}
                type={"empty"}
                fixedSize={true}
                {...props}
            />
            <EmptyViewCont loading={loading} />
        </ViewStyled>
    );
}
