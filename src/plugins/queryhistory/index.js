import styled from "@emotion/styled";
import {
    Badge,
    Box,
    createTheme,
    ThemeProvider,
    Typography,
} from "@mui/material";
import localService from "../../services/localService";
import Drawer from "@mui/material/Drawer";
import { useState, useEffect, forwardRef } from "react";
import { useSelector, useDispatch } from "react-redux";
import setQueryHistory from "../../actions/setQueryHistory";
import loadLogs from "../../actions/loadLogs";
import setHistoryOpen from "../../actions/setHistoryOpen";
import { setQuery } from "../../actions";
import { format } from "date-fns";
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";
import StarIcon from "@mui/icons-material/Star";
import StarBorderIcon from "@mui/icons-material/StarBorder";
import ContentCopyIcon from "@mui/icons-material/ContentCopy";
import DisplaySettingsIcon from "@mui/icons-material/DisplaySettings";
import HistoryIcon from "@mui/icons-material/History";
import CloseIcon from "@mui/icons-material/Close";
import SearchIcon from "@mui/icons-material/Search";
import LinkIcon from "@mui/icons-material/Link";
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import TabsUnstyled from "@mui/base/TabsUnstyled";
import TabsListUnstyled from "@mui/base/TabsListUnstyled";
import TabPanelUnstyled from "@mui/base/TabPanelUnstyled";
import { buttonUnstyledClasses } from "@mui/base/ButtonUnstyled";
import TabUnstyled, { tabUnstyledClasses } from "@mui/base/TabUnstyled";

// Dialog
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
// Snackbar

import Stack from "@mui/material/Stack";
import Snackbar from "@mui/material/Snackbar";
import MuiAlert from "@mui/material/Alert";

import Tooltip from "@mui/material/Tooltip";
import localUrl from "../../services/localUrl";
import setLinksHistory from "../../actions/setLinksHistory";

// Snackbar for clearing confirmation
const Alert = forwardRef(function Alert(props, ref) {
    return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

function HistorySnackbar({ succeed, resetSnackbar, message, type }) {
    const [open, setOpen] = useState(succeed);
    useEffect(() => {
        setOpen(succeed);
    }, [succeed]);
    const handleClick = () => {
        setOpen(true);
    };

    const handleClose = (event, reason) => {
        if (reason === "clickaway") {
            return;
        }

        setOpen(false);
        resetSnackbar();
    };

    return (
        <div>
            <Snackbar open={open} autoHideDuration={6000} onClose={handleClose}>
                <Alert
                    onClose={handleClose}
                    severity={type}
                    sx={{ width: "100%" }}
                >
                    {message}
                </Alert>
            </Snackbar>
        </div>
    );
}

// Alert Dialog for Clearing History
function AlertDialog({ clearHistory }) {
    const [open, setOpen] = useState(false);

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };
    function handleClearHistory() {
        clearHistory();
        setOpen(false);
    }
    return (
        <div>
            <Tooltip title={"Clear Query History"}>
                <ClearHistoryButton onClick={handleClickOpen}>
                    {"Clear History"}
                </ClearHistoryButton>
            </Tooltip>
            <Dialog
                open={open}
                onClose={handleClose}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
            >
                <DialogTitle id="alert-dialog-title">
                    {"Are you sure you want to clear the Query History?"}
                </DialogTitle>
                <DialogContent>
                    <DialogContentText id="alert-dialog-description">
                        {
                            "Click ‘Clear History’ to delete your query history permanently"
                        }
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <DialogCancelButton onClick={handleClose}>
                        Cancel
                    </DialogCancelButton>
                    <DialogConfirmButton onClick={handleClearHistory} autoFocus>
                        Clear History
                    </DialogConfirmButton>
                </DialogActions>
            </Dialog>
        </div>
    );
}

const blue = {
    50: "#F0F7FF",
    100: "#C2E0FF",
    200: "#80BFFF",
    300: "#66B2FF",
    400: "#3399FF",
    500: "#262626",
    600: "#0072E5",
    700: "#0059B2",
    800: "#004C99",
    900: "#003A75",
};

const Tab = styled(TabUnstyled)`
    color: #aaa;
    cursor: pointer;
    font-size: 13px;
    background-color: transparent;
    padding: 6px 10px;
    border: none;
    border-radius: 3px 3px 0px 0px;
    display: flex;
    justify-content: center;
    align-items: center;
    border-bottom: 1px solid transparent;
    transition: 0.2s all;

    &:hover {
        background-color: #666666;
    }

    &:focus {
        color: #aaa;
        border-radius: 3px 3px 0px 0px;

        outline-offset: 2px;
    }

    &.${tabUnstyledClasses.selected} {
        color: #eee;
        border-bottom: 1px solid #11abab;
    }

    &.${buttonUnstyledClasses.disabled} {
        opacity: 0.5;
        cursor: not-allowed;
    }
`;

const TabHistoryIcon = styled(HistoryIcon)`
    height: 16px;
    width: 16px;
    margin-right: 3px;
`;

const TabHistoryStarIcon = styled(StarBorderIcon)`
    height: 16px;
    width: 16px;
    margin-right: 3px;
`;
const TabHistorySettingIcon = styled(DisplaySettingsIcon)`
    height: 16px;
    width: 16px;
    margin-right: 3px;
`;

const TabHistoryLinkIcon = styled(LinkIcon)`
    height: 16px;
    width: 16px;
    margin-right: 3px;
`;

const TabHistorySearchIcon = styled(SearchIcon)`
    height: 21px;
    width: 16px;
    padding: 0px 3px;
    border-radius: 3px 0px 0px 3px;
    background: #121212;
`;

const TabHeaderContainer = styled.div`
    padding: 0px 15px;
    font-size: 13px;
    display: flex;
    align-items: center;
    justify-content: space-between;
    background: #8a8a8a50;
    height: 37px;
`;
const TabPanel = styled(TabPanelUnstyled)`
    width: 100%;
`;

const TabsList = styled(TabsListUnstyled)`
    min-width: 320px;
    background-color: ${blue[500]};
    border-bottom: 4px solid #2e2e2e;
    display: flex;
    align-items: center;
    align-content: space-between;
`;

const EmptyHistory = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
    color: #ddd;
    font-size: 14px;
    flex: 1;
    height: 50%;
`;
function EmptyHistoryDisplay({ message }) {
    return <EmptyHistory>{message}</EmptyHistory>;
}

function QueryHistoryTabs({
    historyTabHeader,
    historyTab,
    starredTab,
    closeButton,
    linksTabHeader,
    linksTab,
    starredTabHeader,
    settingTab,
    settingTabHeader,
}) {
    return (
        <TabsUnstyled defaultValue={0}>
            <TabsList>
                <Tab>
                    <TabHistoryIcon />

                    <span>{"Query History"}</span>
                </Tab>

                <Tab>
                    <TabHistoryLinkIcon />
                    <span>{"Links History"}</span>
                </Tab>

                <Tab>
                    <TabHistoryStarIcon />

                    <span>Starred</span>
                </Tab>
                <Tab>
                    <TabHistorySettingIcon />

                    <span>Settings</span>
                </Tab>
                {closeButton}
            </TabsList>
            <TabPanel value={0}>
                {historyTabHeader}
                {historyTab}
            </TabPanel>
            <TabPanel value={1}>
                {linksTabHeader}
                {linksTab}
            </TabPanel>

            <TabPanel value={2}>
                {starredTabHeader}
                {starredTab}
            </TabPanel>
            <TabPanel value={3}>
                {settingTabHeader}
                {settingTab}
            </TabPanel>
        </TabsUnstyled>
    );
}

export const theme = createTheme({
    palette: {
        mode: "dark",
        primary: {
            main: "#ddd",
            background: "#1a1a1a",
        },
    },
});

const QueryHistoryContainer = styled.div`
    height: 250px;
    overflow-y: auto;
    &::-webkit-scrollbar {
        width: 10px;
        background: black;
    }

    &::-webkit-scrollbar-thumb {
        border-radius: 10px;
        background: #444;
    }
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

const SettingItemContainer = styled.div`
    height: 100px;
    width: 240px;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    padding: 20px;
    background: #333;
    margin: 10px;
    border-radius: 3px;
    & div {
        font-size: 15px;
        color: orange;
    }
    & small {
        font-size: 12px;
        color: #ddd;
    }
`;
const SubmitButton = styled(HistoryButton)`
    background: #11abab;
`;

const ClearHistoryButton = styled(HistoryButton)`
    font-weight: bold;
    padding: 10px 20px;
    background: #088789;
    margin: 0;
    width: 100%;
`;
const StyledCloseButton = styled(HistoryButton)`
    background: none;
    color: #ddd;
    font-size: 14px;
    height: 16px;
    width: 16px;
    position: absolute;
    right: 0;
`;

const DialogCancelButton = styled(HistoryButton)`
    background: #646464;
    padding: 8px 16px;
`;
const DialogConfirmButton = styled(HistoryButton)`
    background: #088789;
    padding: 8px 16px;
`;

const FilterInput = styled.input`
    color: orange;
    background: #121212;
    border: none;
    height: 21px;
    margin: 0px 10px 0px 0px;
    padding: 0px;
    font-size: 13px;
    border-radius: 0px 3px 3px 0px;
    font-family: monospace;
    font-size: 12px;
    &:focus {
        outline: none;
    }
`;

function CloseButton({ onClose }) {
    return (
        <StyledCloseButton onClick={onClose}>
            <CloseIcon />
        </StyledCloseButton>
    );
}

const HistoryRow = styled.div`
    padding: 5px 10px;
    padding-left: 12px;
    background: #212121;
    margin: 5px;
    border-radius: 3px;
    font-size: 13px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    height: 30px;
`;

function QueryHistoryTab({
    queryHistory,
    copyQuery,
    handleDelete,
    handleStarItem,
    handleSubmit,
    filtered,
    emptyMessage,
}) {
    const [listDisplay, setListDisplay] = useState([]);
    useEffect(() => {
        setListDisplay(queryHistory);
    }, []);

    useEffect(() => {
        if (filtered.length > 0) {
            setListDisplay(filtered);
        }
    }, [filtered]);

    useEffect(() => {
        setListDisplay(queryHistory);
    }, [queryHistory]);
    // const listDisplay = filtered.length > 0 ? filtered : queryHistory
    return (
        <QueryHistoryContainer>
            {listDisplay.length > 0 ? (
                listDisplay.map((item, index) => (
                    <HistoryRow key={index}>
                        <span
                            style={{
                                paddingRight: "10px",
                                color: "#666",
                            }}
                        >
                            {listDisplay.length - index}
                        </span>
                        <span
                            style={{
                                flex: 1,
                                fontFamily: "monospace",
                                fontSize: "13px",
                                color: "#ddd",
                            }}
                        >
                            {item.data}{" "}
                        </span>

                        <span>
                            {format(item.timestamp, "yyyy/MM/dd HH:mm:ss")}
                        </span>

                        <div style={{ display: "flex" }}>
                            <Tooltip title={"Copy Query to Clipboard"}>
                                <HistoryButton
                                    onClick={(e) => copyQuery(item.data)}
                                >
                                    <ContentCopyIcon fontSize={"14px"} />
                                </HistoryButton>
                            </Tooltip>

                            <Tooltip title={"Delete Query"}>
                                <HistoryButton
                                    onClick={(e) => handleDelete(item)}
                                >
                                    <DeleteOutlineIcon fontSize={"14px"} />
                                </HistoryButton>
                            </Tooltip>

                            <Tooltip title={"Star / Unstar Query"}>
                                <HistoryButton
                                    onClick={(e) => handleStarItem(item)}
                                >
                                    {item.starred ? (
                                        <StarIcon fontSize={"14px"} />
                                    ) : (
                                        <StarBorderIcon fontSize={"14px"} />
                                    )}
                                </HistoryButton>
                            </Tooltip>

                            <Tooltip title={"Search Logs from Query"}>
                                <SubmitButton
                                    onClick={(e) => handleSubmit(item)}
                                >
                                    {"Show Logs"}
                                </SubmitButton>
                            </Tooltip>
                        </div>
                    </HistoryRow>
                ))
            ) : (
                <EmptyHistoryDisplay message={emptyMessage} />
            )}
        </QueryHistoryContainer>
    );
}
function LinksHistoryTab({
    linksHistory,
    copyLink,
    handleDelete,
    handleStarItem,
    handleSubmit,
    filtered,
    emptyMessage,
}) {
    const [listDisplay, setListDisplay] = useState([]);
    useEffect(() => {
        setListDisplay(linksHistory);
    }, []);
    useEffect(()=>{
        if(filtered.length>0){
            console.log(filtered)
            setListDisplay(filtered)
        }
    },[filtered])
    useEffect(() => {
        setListDisplay(linksHistory);
    }, [linksHistory]);

    return (
        <QueryHistoryContainer>
            {listDisplay.length > 0 ? (
                listDisplay.map((item, index) => (
                    <HistoryRow key={index}>
                        <span
                            style={{
                                paddingRight: "10px",
                                color: "#666",
                            }}
                        >
                            {listDisplay.length - index}
                        </span>

                        <span
                            style={{
                                flex: 1,
                                fontFamily: "monospace",
                                fontSize: "13px",
                                color: "#ddd",
                            }}
                        >
                            {decodeURIComponent(item.params.query)}{" "}
                        </span>
                        <div
                            style={{
                                display: "grid",
                                gridTemplateColumns: "1fr .25fr .25fr 1fr",
                                width: "50%",
                            }}
                        >
                            <span>API URL: {item.params.apiUrl}</span>
                            <span>limit: {item.params.limit}</span>

                            <span>step: {item.params.step}</span>
                            <span style={{
                                display:'flex',
                                alignItems:'center'
                            }}> <AccessTimeIcon fontSize={"14px"} style={{marginRight:'3px'}}/>{" "}
                                {item.fromDate}
                                {" - "}
                                {item.toDate}
                            </span>
                        </div>

                        <div style={{ display: "flex" }}>
                            <Tooltip title={"Copy Link to Clipboard"}>
                                <HistoryButton
                                    onClick={(e) => copyLink(item.data)}
                                >
                                    <LinkIcon fontSize={"14px"} />
                                </HistoryButton>
                            </Tooltip>

                            <Tooltip title={"Delete Query"}>
                                <HistoryButton
                                    onClick={(e) => handleDelete(item)}
                                >
                                    <DeleteOutlineIcon fontSize={"14px"} />
                                </HistoryButton>
                            </Tooltip>

                            <Tooltip title={"Star / Unstar Link"}>
                                <HistoryButton
                                    onClick={(e) => handleStarItem(item)}
                                >
                                    {item.starred ? (
                                        <StarIcon fontSize={"14px"} />
                                    ) : (
                                        <StarBorderIcon fontSize={"14px"} />
                                    )}
                                </HistoryButton>
                            </Tooltip>

                            <Tooltip title={"Search Logs from Query"}>
                                <SubmitButton
                                    onClick={(e) => handleSubmit(item.data)}
                                >
                                    {"Open In New Tab"}
                                </SubmitButton>
                            </Tooltip>
                        </div>
                    </HistoryRow>
                ))
            ) : (
                <EmptyHistoryDisplay message={emptyMessage} />
            )}
        </QueryHistoryContainer>
    );
}

function QueryHistoryTabHeader({
    queryHistory,
    clearHistory,
    filterItems,
    setFilteredItems,
}) {
    const [value, setValue] = useState("");

    function handleValueChange(e) {
        let edited = e.target.value;
console.log(edited)
        setValue(edited);
        const filtered = filterItems(queryHistory, edited);
        if (filtered.length > 0) {
            setFilteredItems(filtered);
            console.log(filtered)
        } else {
            setFilteredItems([]);
        }
    }

    return (
        <TabHeaderContainer>
            <div
                style={{
                    display: "flex",
                    alignItems: "center",
                }}
            >
                <TabHistorySearchIcon />
                <FilterInput
                    type="text"
                    value={value}
                    onChange={handleValueChange}
                    placeholder={"Search Queries"}
                />{" "}
                <span style={{ margin: "0px 4px" }}>
                    Total: {queryHistory.length}
                </span>
            </div>
        </TabHeaderContainer>
    );
}
function SettingHistoryTabHeader({  queryHistory,
    linksHistory,



}) {
    return (
        <TabHeaderContainer>
            <div
                style={{
                    display: "flex",
                    alignItems: "center",
                }}
            >
                <span style={{ margin: "0px 4px" }}>
                    Query History Rows: {queryHistory.length}
                </span>
                {" | "}
                <span style={{ margin: "0px 4px" }}>
                    Links History Rows: {linksHistory.length}
                </span>
            </div>
        </TabHeaderContainer>
    );
}

function SettingTab({ clearHistory,
    clearLinksHistory,}) {
    // const listDisplay = filtered.length > 0 ? filtered : queryHistory
    return (
        <QueryHistoryContainer>
            <div style={{ display: "flex" }}>
                <SettingItemContainer>
                    <div>Clear Query History</div>
                    <small>
                        Delete all of your query history, permanently.
                    </small>
                    <AlertDialog clearHistory={clearHistory} />
                </SettingItemContainer>
                <SettingItemContainer>
                    <div>Clear Links History</div>
                    <small>
                        Delete all of your links history, permanently.
                    </small>
                    <AlertDialog clearHistory={clearLinksHistory} />
                </SettingItemContainer>
            </div>
        </QueryHistoryContainer>
    );
}

const QueryHistoryDrawer = (props) => {
    const dispatch = useDispatch();
    const historyService = localService().historyStore();
    const linkService = localUrl();
    const queryHistory = useSelector((store) => store.queryHistory);
    const linksHistory = useSelector((store) => store.linksHistory);
    const historyOpen = useSelector((store) => store.historyOpen);

    const [starredItems, setStarredItems] = useState([]);
    const [filtered, setFiltered] = useState([]);
    const [linksFiltered, setLinksFiltered] = useState([]);
    const [starredFiltered, setStarredFiltered] = useState([]);
    const [succeed, setSucceed] = useState(false);
    const [copySucceed, setCopySucceed] = useState(false);
    const [trashedSucceed, setTrashedSucceed] = useState(false);
    const [starredSucceed, setStarredSucceed] = useState(false);
    const [unstarredSucceed, setUnstarredSucceed] = useState(false);
    const [linksStarredItems, setLinksStarredItems] = useState(false);
    function handleDelete(id) {
        const removed = historyService.remove(id);
        dispatch(setQueryHistory(removed));
        setTrashedSucceed(true);
    }

    function handleLinkDelete(id) {
        const removed = linkService.remove(id);
        dispatch(setLinksHistory(removed));
        setTrashedSucceed(true);
    }

    function handleSubmit(item) {
        dispatch(setQuery(item.data));
        dispatch(loadLogs());
    }

    function handleLinkSubmit(link) {
        window.open(link);
    }

    useEffect(() => {
        const starred = queryHistory.filter((f) => f.starred) || [];
        const linksStarred = linksHistory.filter((f) => f.starred) || [];
        setLinksStarredItems(linksStarred);
        setStarredItems(starred);
        console.log(linksHistory);
    }, [queryHistory, linksHistory]);

    function handleStarItem(item) {
        const updatedItem = { ...item, starred: item.starred ? false : true };
        const updated = historyService.update(updatedItem);
        dispatch(setQueryHistory(updated));
        if (updatedItem.starred) {
            setUnstarredSucceed(false);
            setStarredSucceed(true);
        } else {
            setStarredSucceed(false);
            setUnstarredSucceed(true);
        }
    }
    function handleStarLinkItem(item) {
        const updatedItem = { ...item, starred: item.starred ? false : true };
        const updated = linkService.update(updatedItem);
        dispatch(setLinksHistory(updated));
        if (updatedItem.starred) {
            setUnstarredSucceed(false);
            setStarredSucceed(true);
        } else {
            setStarredSucceed(false);
            setUnstarredSucceed(true);
        }
    }

    function copyQuery(item) {
        navigator.clipboard.writeText(item).then(
            function () {
                if (item.length > 0) {
                    setCopySucceed(true);
                }
            },
            function (err) {
                console.err("error on copy", err);
            }
        );
    }
    function handleClose() {
        dispatch(setHistoryOpen(false));
    }
    function clearHistory() {
        const historyClean = historyService.clean();
        dispatch(setQueryHistory(historyClean));
        if (historyClean?.length < 1) {
            setSucceed(true);
        }
    }

    function clearLinksHistory(){
        const historyClean = historyService.clean();
        dispatch(setLinksHistory(historyClean))
    }

    function filterItems(list, item) {
        return list.filter((f) =>
            f.data.toLowerCase().includes(item.toLowerCase())
        );
    }

    function setFilteredItems(list) {
        setFiltered(list);
    }

    function setFilterLinkItems(list) {
        setLinksFiltered(list)
    }

    function filterStarred(starred) {
        setStarredFiltered(starred);
    }
    
    function resetSnackbar() {
        setSucceed(false);
    }
    function resetCopy() {
        setCopySucceed(false);
    }
    function resetStarred() {
        setStarredSucceed(false);
    }
    function resetUnstarred() {
        setUnstarredSucceed(false);
    }
    function resetTrashed() {
        setTrashedSucceed(false);
    }

    return (
        <ThemeProvider theme={theme}>
            <Drawer
                anchor={"bottom"}
                style={{ height: "250px" }}
                open={historyOpen}
                variant={"persistent"}
            >
                <QueryHistoryTabs
                    historyTabHeader={
                        <QueryHistoryTabHeader
                            queryHistory={queryHistory}
                            clearHistory={clearHistory}
                            filterItems={filterItems}
                            setFilteredItems={setFilteredItems}
                        />
                    }
                    historyTab={
                        <QueryHistoryTab
                            queryHistory={queryHistory}
                            copyQuery={copyQuery}
                            handleDelete={handleDelete}
                            handleStarItem={handleStarItem}
                            handleSubmit={handleSubmit}
                            filtered={filtered}
                            emptyMessage={
                                "There is no query history. Please execute some queries and you will see a history here."
                            }
                        />
                    }
                    linksTabHeader={
                        <QueryHistoryTabHeader
                            queryHistory={linksHistory}
                            filterItems={filterItems}
                            setFilteredItems={setFilterLinkItems}
                        />
                    }
                    linksTab={
                        <LinksHistoryTab
                            linksHistory={linksHistory}
                            copyLink={copyQuery}
                            handleDelete={handleLinkDelete}
                            handleStarItem={handleStarLinkItem}
                            handleSubmit={handleLinkSubmit}
                            filtered={linksFiltered}
                            emptyMessage={
                                "There is no links history. Please execute some queries and share links and you will see a history here."
                            }
                        />
                    }
                    starredTabHeader={
                        <QueryHistoryTabHeader
                            queryHistory={starredItems}
                            clearHistory={clearHistory}
                            filterItems={filterItems}
                            setFilteredItems={filterStarred}
                        />
                    }
                    starredTab={
                        <QueryHistoryTab
                            queryHistory={starredItems}
                            copyQuery={copyQuery}
                            handleDelete={handleDelete}
                            handleStarItem={handleStarItem}
                            handleSubmit={handleSubmit}
                            filtered={starredFiltered}
                            emptyMessage={
                                "Click the ‘Star’ icon to save queries and find them here to reuse again"
                            }
                        />
                    }
                    settingTabHeader={
                        <SettingHistoryTabHeader
                            queryHistory={queryHistory}
                            linksHistory={linksHistory}
                        />
                    }
                    settingTab={<SettingTab 
                        clearHistory={clearHistory}
                        clearLinksHistory={clearLinksHistory}
                        />}
                    closeButton={<CloseButton onClose={handleClose} />}
                />
                <HistorySnackbar
                    succeed={succeed}
                    resetSnackbar={resetSnackbar}
                    message={"History Cleared succesfully"}
                    type={"info"}
                />
                <HistorySnackbar
                    succeed={copySucceed}
                    resetSnackbar={resetCopy}
                    message={"Copied successfully"}
                    type={"success"}
                />
                <HistorySnackbar
                    succeed={trashedSucceed}
                    resetSnackbar={resetTrashed}
                    message={"Deleted successfully"}
                    type={"info"}
                />
                <HistorySnackbar
                    succeed={starredSucceed}
                    resetSnackbar={resetStarred}
                    message={"Starred successfully"}
                    type={"success"}
                />
                <HistorySnackbar
                    succeed={unstarredSucceed}
                    resetSnackbar={resetUnstarred}
                    message={"Unstarred successfully"}
                    type={"info"}
                />
            </Drawer>
        </ThemeProvider>
    );
};

const QueryHistory = () => {
    return <QueryHistoryDrawer />;
};

export default QueryHistory;
