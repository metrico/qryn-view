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

export default function QueryItem(props) {

    // first data load
    useEffect(() => {
        const { expr, queryType, limit, panel, id, dataSourceType } = props.data;
        dispatch(getData(dataSourceType,expr, queryType, limit, panel, id));
    }, []);

    const { name } = props;
    const idRefs = useMemo(() => {
        const alpha = Array.from(Array(26)).map((e, i) => i + 65);
        const alphabet = alpha.map(
            (x) =>
                name?.slice(0, 1)?.toUpperCase() + "-" + String.fromCharCode(x)
        );
        return alphabet;
    }, []);

    const dispatch = useDispatch();
    const theme = useSelector((store) => store.theme);
    const leftPanel = useSelector((store) => store.left);
    const rightPanel = useSelector((store) => store.right);
    const leftDV = useSelector((store) => store.leftDataView);
    const rightDV = useSelector((store) => store.rightDataView);

    const isQueryOpen = useState(true);

    const onDeleteQuery = () => {
        const filterPanel = (panel) => {
            if (panel.length > 1) {
                return panel.filter((query) => query.id !== props.data.id);
            } else {
                return panel;
            }
        };
        if (name === "left") {
            const lfiltered = filterPanel(leftPanel);
            const lviewFiltered = filterPanel(leftDV);
            dispatch(setLeftPanel(lfiltered));
            dispatch(setLeftDataView(lviewFiltered));
        }

        if (name === "right") {
            const rfiltered = filterPanel(rightPanel);
            const rviewFiltered = filterPanel(rightDV);
            dispatch(setRightPanel(rfiltered));
            dispatch(setRightDataView(rviewFiltered));
            if (rfiltered.length === 0) {
                dispatch(setSplitView(false));
            }
        }
    };

    const onAddQuery = () => {
        const getIdref = (lastIdx) => {
            if (lastIdx > idRefs.length - 1) {
                return `${idRefs[0]}${lastIdx}`;
            } else {
                return idRefs[lastIdx];
            }
        };

        const getLastIndex = (panel) => {
            return panel[panel.length - 1].lastIdx;
        };

        const setNewPanel = (lastIdx, panel, idRef) => {
            const newQuery = {
                ...props.data,
                id: nanoid(),
                idRef,
                lastIdx: lastIdx + 1,
                cp: 0,
            };
            return [...panel, newQuery];
        };

        const setNewPanelData = (panel) => {
            const lastIdx = getLastIndex(panel);
            const idRef = getIdref(lastIdx);
            return setNewPanel(lastIdx, panel, idRef);
        };

        if (name === "left") {
            const lPanel = setNewPanelData(leftPanel);
            dispatch(setLeftPanel(lPanel));
        }

        if (name === "right") {
            const rPanel = setNewPanelData(rightPanel);
            dispatch(setRightPanel(rPanel));
        }
    };

    return (
        <ThemeProvider theme={themes[theme]}>
            <QueryContainer>
                <QueryItemToolbar
                    isQueryOpen={isQueryOpen}
                    onDeleteQuery={onDeleteQuery}
                    onAddQuery={onAddQuery}
                    {...props}
                />
                {isQueryOpen[0] && <LabelBrowser {...props} />}
            </QueryContainer>
        </ThemeProvider>
    );
}
