import styled from "@emotion/styled";
import { createTheme, ThemeProvider } from "@mui/material";
import localService from "../../services/localService";
import Drawer from "@mui/material/Drawer";
import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import setQueryHistory from "../../actions/setQueryHistory";
import loadLogs from "../../actions/loadLogs";
import { setQuery } from "../../actions";
import { format } from "date-fns";

import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";
import StarIcon from "@mui/icons-material/Star";
import StarBorderIcon from "@mui/icons-material/StarBorder";
import ContentCopyIcon from "@mui/icons-material/ContentCopy";
import HistoryIcon from "@mui/icons-material/History";
import CloseIcon from "@mui/icons-material/Close";
import setHistoryOpen from "../../actions/setHistoryOpen";


export const theme = createTheme({
    palette: {
        mode: "dark",
        primary: {
            main: "#fff",
        },
    },
});

const SearchHistoryContainer = styled.div`
    height: 50px;
    background: #666;
    display: flex;
`;

const HistoryButton = styled.button`
    padding: 3px 6px;
    background: #333;
    border-radius: 3px;
    border: none;
    color: #ddd;
    display: flex;
    align-items: center;
    justify-content: center;
    margin: 0px 6px;
    cursor: pointer;
`;

const SubmitButton = styled(HistoryButton)`
    background: #11abab;
`;
const CloseButton = styled(HistoryButton)`
    background: none;
    color: #ddd;
    font-size: 14px;
`;
const SearchHistoryDrawer = (props) => {


    const dispatch = useDispatch();
    const historyService = localService().historyStore();
    const [drawerHistory, setDrawerHistory] = useState([]);
    const queryHistory = useSelector((store) => store.queryHistory);
    const historyOpen = useSelector((store) => store.historyOpen);
    const [open, setOpen] = useState(historyOpen);
    useEffect(() => {
        const state = historyService.getAll();
        //  setHistoryState(state)
        setDrawerHistory((drawerHistory) => [...drawerHistory, ...state]);
    }, []);


    useEffect(()=>{
        setOpen(historyOpen)
        console.log(historyOpen, "inside module")
    },[historyOpen])

    function handleDelete(id) {
        const removed = historyService.remove(id);
        dispatch(setQueryHistory(removed));
    }

    function handleSubmit(item) {
        dispatch(setQuery(item.data));
        dispatch(loadLogs());
    }

    function handleStarItem(item) {
        const updatedItem = { ...item, starred: item.starred ? false : true };
        const updated = historyService.update(updatedItem);
        dispatch(setQueryHistory(updated));
    }

    return (
        <ThemeProvider theme={theme}>
            <Drawer anchor={"bottom"} open={historyOpen} variant={"persistent"}>
                <div>
                    <div
                        style={{
                            padding: "10px",
                            fontSize: "13px",
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "space-between",
                        }}
                    >
                        <div
                            style={{
                                display: "flex",
                                alignItems: "center",
                            }}
                        >
                            <HistoryIcon style={{ color: "orange" }} />{" "}
                            <span style={{ margin: "0px 4px" }}> </span> Query
                            History ({queryHistory.length})
                        </div>

                        <CloseButton
                            onClick={(e) => {
                                dispatch(setHistoryOpen(false));
                            }}
                        >
                            <CloseIcon />
                        </CloseButton>
                    </div>

                    <div
                        style={{
                            maxHeight: "250px",
                            overflowY: "auto",
                        }}
                    >
                        {drawerHistory &&
                            queryHistory
                                .map((item, index) => (
                                    <div
                                        key={index}
                                        style={{
                                            padding: "5px",
                                            background: "#212121",
                                            margin: "5px",
                                            borderRadius: "3px",
                                            fontSize: "13px",
                                            display: "flex",
                                            justifyContent: "space-between",
                                            alignItems: "center",
                                        }}
                                    >
                                        <span
                                            style={{
                                                flex: 1,
                                            }}
                                        >
                                            {item.data}
                                        </span>

                                        <span>
                                            {format(
                                                item.timestamp,
                                                "yyyy/MM/dd HH:mm:ss"
                                            )}
                                        </span>

                                        <div style={{ display: "flex" }}>
                                            <HistoryButton>
                                                <ContentCopyIcon
                                                    fontSize={"14px"}
                                                />
                                            </HistoryButton>
                                            <HistoryButton
                                                onClick={(e) =>
                                                    handleDelete(item)
                                                }
                                            >
                                                <DeleteOutlineIcon
                                                    fontSize={"14px"}
                                                />
                                            </HistoryButton>
                                            <HistoryButton
                                                onClick={(e) =>
                                                    handleStarItem(item)
                                                }
                                            >
                                                {item.starred ? (
                                                    <StarIcon
                                                        fontSize={"14px"}
                                                    />
                                                ) : (
                                                    <StarBorderIcon
                                                        fontSize={"14px"}
                                                    />
                                                )}
                                            </HistoryButton>
                                            <SubmitButton
                                                onClick={(e) =>
                                                    handleSubmit(item)
                                                }
                                            >
                                                {"Show Logs"}
                                            </SubmitButton>
                                        </div>
                                    </div>
                                ))
                                .sort((a, b) =>
                                    a.timestamp < b.timestamp ? 1 : -1
                                )}
                    </div>
                </div>
                {/* history info will come in here */}
            </Drawer>
        </ThemeProvider>
    );
};

const SearchHistory = () => {
    return <SearchHistoryDrawer />;
};

export default SearchHistory;
