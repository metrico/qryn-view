import LabelBrowser from "../LabelBrowser";
import styled from "@emotion/styled";
import { useEffect, useMemo, useState } from "react";
import { ThemeProvider } from "@emotion/react";
import { themes } from "../../theme/themes";
import { useSelector, useDispatch } from "react-redux";
import { nanoid } from "nanoid";
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";
import AddOutlinedIcon from "@mui/icons-material/AddOutlined";
import KeyboardArrowRightOutlinedIcon from "@mui/icons-material/KeyboardArrowRightOutlined";
import KeyboardArrowDownOutlinedIcon from "@mui/icons-material/KeyboardArrowDownOutlined";
import { setLeftPanel } from "../../actions/setLeftPanel";
import { setRightPanel } from "../../actions/setRightPanel";
import loadLogs from "../../actions/loadLogs";
import { setRightDataView } from "../../actions/setRightDataView";
import { setLeftDataView } from "../../actions/setLeftDataView";
import { setSplitView } from "../StatusBar/components/SplitViewButton/setSplitView";

const QueryContainer = styled.div``;

const QueryItemToolbarStyled = styled.div`
    background: ${({ theme }) => `${theme.secondaryWidgetContainer}`};
    color: ${({ theme }) => `${theme.textColor}`};
    padding: 5px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    border-radius: 3px;
    margin-bottom: 3px;
    .query-title {
        display: flex;
        align-items: center;
    }
    .query-tools {
        display: flex;
        align-items: center;
    }
    .query-id {
        font-size: 13px;
        font-weight: bold;
        margin-left: 5px;
    }
`;

const ShowQueryButton = styled.button`
    background: none;
    border: none;
    padding: 0px 2px;
    cursor: pointer;
`;

const OpenQuery = styled(KeyboardArrowDownOutlinedIcon)`
    font-size: 13px;
    color: ${({ theme }) => theme.textColor};
`;

const CloseQuery = styled(KeyboardArrowRightOutlinedIcon)`
    font-size: 13px;
    color: ${({ theme }) => theme.textColor};
`;

function QueryId(props) {
    const [isEditing, setIsEditing] = useState(false);
    const [idText, setIdText] = useState(props.data.idRef);
    const storeTheme = useSelector(({ theme }) => theme);
    const theme = useMemo(() => {
        return themes[storeTheme];
    }, [storeTheme]);
    function onIdTextChange(e) {
        e.preventDefault();
        const txt = e.target.value;
        setIdText(txt);
    }

    function closeInput(e) {
        props.onIdRefUpdate(idText);
        setIsEditing(false);
    }

    function handleKeydown(e) {
        if (e.key === "Enter") {
            props.onIdRefUpdate(idText);
            setIsEditing(false);
        }
    }

    if (isEditing === true) {
        return (
            <>
                <input
                    style={{
                        background: "transparent",
                        border: "none",
                        outline: "none",
                        color: theme.textColor,
                    }}
                    value={idText}
                    placeholder={idText}
                    onChange={onIdTextChange}
                    onKeyDown={handleKeydown}
                    onBlur={closeInput}
                />
            </>
        );
    } else {
        return (
            <>
                <p className="query-id" onClick={(e) => setIsEditing(true)}>
                    {idText}
                </p>
            </>
        );
    }
}
export function QueryItemToolbar(props) {
    const dispatch = useDispatch();
    // update panel on id change
    const {data:{expr}} = props
    const panel = useSelector((store) => store[props.name]);
    const isEmbed = useSelector((store) => store.isEmbed);
    const panelAction = (panel, data) => {
        if (panel === "left") {
            return setLeftPanel(data);
        } else {
            return setRightPanel(data);
        }
    };

    function onIdRefUpdate(e) {
        const cPanel = [...panel];
        cPanel.forEach((panel) => {
            if (panel.id === props.data.id) {
                panel.idRef = e;
            }
        });

        dispatch(panelAction(props.name, cPanel));
    }

    return (
        <QueryItemToolbarStyled>
            <div className="query-title">
              {!isEmbed &&  <ShowQueryButton
                    onClick={() => {
                        props.isQueryOpen[1](
                            props.isQueryOpen[0] ? false : true
                        );
                    }}
                >
                    {props.isQueryOpen[0] ? <OpenQuery /> : <CloseQuery />}
                </ShowQueryButton>} 

                <QueryId onIdRefUpdate={onIdRefUpdate} {...props} />
                {isEmbed && <p style={{marginLeft:'20px',fontFamily:'monospace'}}>{expr}</p>}
            </div>
            {!isEmbed && (
                <div className="query-tools">
                    <AddOutlinedIcon
                        style={{
                            fontSize: "15px",
                            cursor: "pointer",
                            padding: "3px",
                        }}
                        onClick={props.onAddQuery}
                    />
                    <DeleteOutlineIcon
                        style={{
                            fontSize: "15px",
                            cursor: "pointer",
                            padding: "3px",
                        }}
                        onClick={props.onDeleteQuery}
                    />
                </div>
            )}
        </QueryItemToolbarStyled>
    );
}

export default function QueryItem(props) {
    // first data load
    useEffect(() => {
        const { expr, queryType, limit, panel, id } = props.data;
        dispatch(loadLogs(expr, queryType, limit, panel, id));
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
