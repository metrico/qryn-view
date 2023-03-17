import { useSelector } from "react-redux";
import { useMediaQuery } from "react-responsive";
import { createItemData } from "./helpers";
import { useDataSourceMetaData } from "./hooks";
import { Row } from "./Row";
import { ILogsProps } from "./types";

/**
 *
 * @props {items, toggleItemActive, actQuery}
 * @returns  iterable of rows (items)
 */ 


export function LogsWrapper(props: ILogsProps) {
    const { items, toggleItemActive, actQuery, dataSourceId } = props;
    const { splitted } = actQuery;
    const itemData = createItemData(items, toggleItemActive);
    const isMobile = useMediaQuery({ query: "(max-width: 914px)" });
    const dataSourceData = useSelector(({ dataSources }: any) =>
        dataSources?.find((f: any) => f.id === dataSourceId)
    );
    const dataSourceMetaData = useDataSourceMetaData(dataSourceData);
    return itemData?.items?.map((log: any, key: any) => (
        <Row
            key={key}
            index={key}
            dataSourceId={dataSourceId}
            dataSourceData={dataSourceMetaData}
            actQuery={actQuery}
            log={log}
            isSplit={splitted}
            isMobile={isMobile}
            toggleItemActive={toggleItemActive}
        />
    ));
}