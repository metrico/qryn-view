import { ThemeProvider } from "@emotion/react";
import { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import LabelBrowser from "../../components/LabelBrowser";
import { QueryItemToolbar } from "../../components/QueryItem/QueryItemToolbar";
import PluginRenderer from "../../plugins/PluginsRenderer";
import { useTheme } from "../../theme";
import { setSplitView } from "../actions";

import {
    panelAction,
    dataViewAction,
    setNewPanelData,
    filterPanel,
    filterLocal,
    getStoredQueries,
    setStoredQuery,
} from "./helpers";
import { useIdRefs } from "./hooks";

const QueryItem = (props: any) => {
    const { name, data } = props;
    const { id } = data;
    const dispatch = useDispatch();
    const dataView = useSelector((store: any) => store[`${name}DataView`]);
    const panelSelected = useSelector((store: any) => store[name]);
    const isQueryOpen = useState(true);
    const idRefs = useIdRefs(name);
    const theme = useTheme();

    const onAddQuery = () => {
        const panelData = setNewPanelData(panelSelected, data, idRefs);

        dispatch(panelAction(name, panelData));
    };

    const deleteStoredQuery = (): void => {
        const prevStored = getStoredQueries();

        if (prevStored?.length > 0) {
            const filtered = filterLocal(prevStored, id);
            setStoredQuery(filtered);
        }
    };

    const onDeleteQuery = (): void => {
        const filtered = filterPanel(panelSelected, id);

        const viewFiltered = filterPanel(dataView, id);

        const prevStoredQuery = getStoredQueries();

        if (prevStoredQuery?.length > 0) {
            deleteStoredQuery();
        }

        if (filtered) {
            dispatch(panelAction(name, filtered));
        }

        if (viewFiltered) {
            dispatch(dataViewAction(name, viewFiltered));
        }

        if (name === "right") {
            if (filtered.length === 0) {
                dispatch(setSplitView(false));
            }
        }
    };

    return (
        <ThemeProvider theme={theme}>
            <div>
                <QueryItemToolbar
                    {...props}
                    isQueryOpen={isQueryOpen}
                    onDeleteQuery={onDeleteQuery}
                    onAddQuery={onAddQuery}
                />

                {isQueryOpen[0] && <LabelBrowser {...props} />}
                {(data.dataSourceType === "metrics" ||
                    data.dataSourceType === "logs") && (
                    <PluginRenderer section={"Query Item"} localProps={props} />
                )}
            </div>
        </ThemeProvider>
    );
};

export default QueryItem;
