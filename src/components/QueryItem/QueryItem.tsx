import LabelBrowser from "../LabelBrowser";
import styled from "@emotion/styled";
import { useEffect, useMemo, useState } from "react";
import { ThemeProvider } from "@emotion/react";
import { themes } from "../../theme/themes";
import { useSelector, useDispatch } from "react-redux";
import { nanoid } from "nanoid";

import { setLeftPanel } from "../../actions/setLeftPanel";
import { setRightPanel } from "../../actions/setRightPanel";
import getData from "../../actions/getData";
import { setRightDataView } from "../../actions/setRightDataView";
import { setLeftDataView } from "../../actions/setLeftDataView";
import { setSplitView } from "../StatusBar/components/SplitViewButton/setSplitView";
import { QueryItemToolbar } from "./QueryItemToolbar";

const QueryContainer = styled.div``;

const panelAction = (panel: any, data: any) => {
    if (panel === "left") {
        return setLeftPanel(data);
    } else {
        return setRightPanel(data);
    }
};

const dataViewAction = (panel: any, data: any) => {
    if (panel === "left") {
        return setLeftDataView(data);
    } else {
        return setRightDataView(data);
    }
};

export default function QueryItem(props: any) {
    const { name } = props;
    const {
        expr,
        queryType,
        limit,
        panel,
        id,
        dataSourceType,
        dataSourceId,
        direction,
        dataSourceURL,
    } = props.data;

    useEffect(() => {
        dispatch(
            getData(
                dataSourceType,
                expr,
                queryType,
                limit,
                panel,
                id,
                direction,
                dataSourceId,
                dataSourceURL
            )
        );
    }, []);

    const idRefs = useMemo(() => {
        const alpha = Array.from(Array(26)).map((e, i) => i + 65);
        const alphabet = alpha.map(
            (x) =>
                name?.slice(0, 1)?.toUpperCase() + "-" + String.fromCharCode(x)
        );
        return alphabet;
    }, []);

    const dispatch = useDispatch();
    const theme = useSelector((store: any) => store.theme);
    const dataView = useSelector((store: any) => store[`${name}DataView`]);
    const panelSelected = useSelector((store: any) => store[name]);
    const isQueryOpen = useState(true);
    
    function filterPanel(panel: any) {
        if (panel?.length > 1) {
            return panel?.filter((query: any) => query?.id !== props?.data?.id);
        } else {
            return panel;
        }
    }

    const onDeleteQuery = () => {
        const filtered = filterPanel(panelSelected);

        const viewFiltered = filterPanel(dataView);

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

    const onAddQuery = () => {
        const getIdref = (lastIdx: any) => {
            if (lastIdx > idRefs.length - 1) {
                return `${idRefs[0]}${lastIdx}`;
            } else {
                return idRefs[lastIdx];
            }
        };

        const getLastIndex = (panel: any) => {
            return panel[panel.length - 1].lastIdx;
        };

        const setNewPanel = (lastIdx: any, panel: any, idRef: any) => {
            const newQuery = {
                ...props.data,
                id: nanoid(),
                idRef,
                labels: [],
                expr: "",
                lastIdx: lastIdx + 1,
                cp: 0,
            };
            return [...panel, newQuery];
        };

        const setNewPanelData = (panel: any) => {
            const lastIdx = getLastIndex(panel);
            const idRef = getIdref(lastIdx);
            return setNewPanel(lastIdx, panel, idRef);
        };

        const panelData = setNewPanelData(panelSelected);

        dispatch(panelAction(name, panelData));
    };
    
    const _themes: any = themes;
    
    return (
        <ThemeProvider theme={_themes[theme]}>
            <QueryContainer>
                <QueryItemToolbar
                    {...props}
                    isQueryOpen={isQueryOpen}
                    onDeleteQuery={onDeleteQuery}
                    onAddQuery={onAddQuery}
                />
                {isQueryOpen[0] && <LabelBrowser {...props} />}
            </QueryContainer>
        </ThemeProvider>
    );
}
