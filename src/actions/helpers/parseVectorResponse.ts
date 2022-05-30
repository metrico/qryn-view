import { setColumnsData } from '.';
import setIsEmptyView from '../setIsEmptyView';
import { setVectorData } from '../setVectorData';
import {QueryResult} from '../types'
import { getAsyncResponse } from './parseResponse';
import { prepareCols } from "./prepareCols";
import { prepareVectorRows } from './prepareVectorRows';


/**
 * 
 * @param responseProps : QueryResult
 * process restult type: vector
 * 
 */
export function parseVectorResponse(responseProps: QueryResult) {
    const { result, debugMode, dispatch } = responseProps;
    try {
        const colsData = prepareCols(result);
        if (colsData.length > 0) {
            const columnsData = setColumnsData(colsData);
            const dataRows: any = prepareVectorRows(result);
            const vectorTableData = {
                columnsData,
                dataRows,
            };
            if (columnsData.length > 0 && dataRows.length > 0) {
                getAsyncResponse(
                    dispatch(setVectorData(vectorTableData || {}))
                ).then(() => {
                    if (result.length === 0) {
                        if (debugMode)
                            console.log(
                                "🚧 loadLogs / getting no data from matrix"
                            );
                        dispatch(setIsEmptyView(true));
                        dispatch(setVectorData({}))
                    }
                    dispatch(setIsEmptyView(false));
                });
            }
        }
    } catch (e) {
        if (debugMode)
            console.log(
                "🚧 loadLogs / getting an error from rendering vector type streams"
            );
        console.log(e);
    }
}
