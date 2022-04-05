import { ThemeProvider, Tooltip } from "@mui/material";
import localService from "../../services/localService";
import Drawer from "@mui/material/Drawer";
import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import setQueryHistory from "../../actions/setQueryHistory";
import loadLogs from "../../actions/loadLogs";
import setHistoryOpen from "../../actions/setHistoryOpen";
import { createAlert, setQuery } from "../../actions";
import { format } from "date-fns";
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";
import StarIcon from "@mui/icons-material/Star";
import StarBorderIcon from "@mui/icons-material/StarBorder";
import ContentCopyIcon from "@mui/icons-material/ContentCopy";

import LinkIcon from "@mui/icons-material/Link";
import AccessTimeIcon from "@mui/icons-material/AccessTime";
import TabsUnstyled from "@mui/base/TabsUnstyled";

import LaunchIcon from "@mui/icons-material/Launch";
import KeyboardArrowRightIcon from "@mui/icons-material/KeyboardArrowRight";
import ZoomOutMapIcon from "@mui/icons-material/ZoomOutMap";
import ZoomInMapIcon from "@mui/icons-material/ZoomInMap";

import { notificationTypes } from "../notifications/consts";
import localUrl from "../../services/localUrl";

import setLinksHistory from "../../actions/setLinksHistory";
import {
    TabsList,
    Tab,
    TabHistoryIcon,
    TabHistoryLinkIcon,
    TabHistoryStarIcon,
    TabHistorySettingIcon,
    TabPanel,
    LinkParams,
    RowData,
    HistoryButton,
    SubmitButton,
    QueryHistoryContainer,
    TabHeaderContainer,
    TabHistorySearchIcon,
    FilterInput,
    SettingItemContainer,
    TimeSpan,
    HistoryRow,
    theme,
} from "./styled";

import AlertDialog from "./components/AlertDialog/AlertDialog";
import EmptyHistoryDisplay from "./components/EmptyHistoryDisplay/EmptyHistoryDisplay";
import CloseButton from "./components/CloseButton/CloseButton";

function QueryHistoryTabs({
    historyTabHeader,
    historyTab,
    starredHistoryTab,
    closeButton,
    linksTabHeader,
    linksTab,
    settingTab,
    settingTabHeader,
}) {
    return (
        <TabsUnstyled style={{ height: "320px" }} defaultValue={0}>
            <TabsList>
                <Tab>
                    <TabHistoryIcon />

                    <span>{"Queries"}</span>
                </Tab>

                <Tab>
                    <TabHistoryLinkIcon />
                    <span>{"Links"}</span>
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

            <TabPanel value={2}>{starredHistoryTab}</TabPanel>
            <TabPanel value={3}>
                {settingTabHeader}
                {settingTab}
            </TabPanel>
        </TabsUnstyled>
    );
}

function HistoryLinkParams({
    item,
    copyLink,
    handleDelete,
    handleStarLinkItem,
    handleSubmit,
}) {
    const [open, setOpen] = useState(false);

    const openParams = () => {
        setOpen((opened) => (opened ? false : true));
    };

    return (
        <LinkParams open={open}>
            <HistoryLinkQuery item={item} onOpen={open} />
            <button
                className="open-button"
                onClick={(e) => {
                    openParams();
                }}
            >
                {open ? (
                    <ZoomInMapIcon fontSize={"small"} />
                ) : (
                    <ZoomOutMapIcon fontSize={"small"} />
                )}
            </button>
            <div className="inline-params">
                <Tooltip title={"API URL"}>
                    <span
                        style={{
                            display: "flex",
                            alignItems: "center",
                        }}
                    >
                        <LinkIcon
                            fontSize="14px"
                            style={{ marginRight: "3px" }}
                        />{" "}
                        {item?.params?.apiUrl}
                    </span>
                </Tooltip>

                <span style={{ whiteSpace: "nowrap" }}>
                    limit: {item?.params?.limit}
                </span>

                <span style={{ whiteSpace: "nowrap" }}>
                    step: {item?.params?.step}
                </span>
                <div
                    style={{
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                    }}
                >
                    {" "}
                    <Tooltip title={item?.fromDate + " - " + item?.toDate}>
                        <AccessTimeIcon
                            fontSize={"14px"}
                            style={{ marginRight: "3px" }}
                        />
                    </Tooltip>{" "}
                    <TimeSpan>
                        {item?.fromDate}
                        {" - "}
                        {item?.toDate}
                    </TimeSpan>
                </div>
            </div>

            <div className="block-params">
                <p>
                    <span> Query:</span>{" "}
                    <span
                        style={{
                            margin: "5px",
                            lineHeight: "1.5",
                            textAlign: "right",
                        }}
                    >
                        {decodeURIComponent(item.params.query)}
                    </span>{" "}
                </p>
                <p>
                    <span> API URL:</span> <span>{item.params.apiUrl}</span>{" "}
                </p>
                <p>
                    <span>From: </span> <span>{item?.fromDate}</span>{" "}
                </p>
                <p>
                    <span> To: </span> <span> {item?.toDate}</span>{" "}
                </p>
                <p>
                    <span>Limit: </span> <span>{item.params.limit}</span>{" "}
                </p>
                <p>
                    <span> Step:</span> <span>{item.params.step}</span>{" "}
                </p>
            </div>
            <HistoryLinkTools
                item={item}
                onOpen={open}
                copyLink={copyLink}
                handleDelete={handleDelete}
                handleStarLinkItem={handleStarLinkItem}
                handleSubmit={handleSubmit}
            />
        </LinkParams>
    );
}

function HistoryLinkQuery({ item, onOpen }) {
    return (
        <div style={{ display: onOpen ? "none" : "flex", width: "30vw" }}>
            <Tooltip title={decodeURIComponent(item?.params?.query)}>
                <RowData>{decodeURIComponent(item?.params?.query)} </RowData>
            </Tooltip>
        </div>
    );
}

function HistoryLinkTools({
    item,
    onOpen,
    copyLink,
    handleDelete,
    handleStarLinkItem,
    handleSubmit,
}) {
    return (
        <div
            style={{
                display: "flex",
                flexDirection: onOpen ? "column-reverse" : "row",
                justifyContent: "space-between",
            }}
        >
            <Tooltip title={"Copy Link to Clipboard"}>
                <HistoryButton onClick={(e) => copyLink(item?.data)}>
                    <LinkIcon fontSize={"14px"} />
                </HistoryButton>
            </Tooltip>

            <Tooltip title={"Delete Query"}>
                <HistoryButton onClick={(e) => handleDelete(item)}>
                    <DeleteOutlineIcon fontSize={"14px"} />
                </HistoryButton>
            </Tooltip>

            <Tooltip title={"Star / Unstar Link"}>
                <HistoryButton onClick={(e) => handleStarLinkItem(item)}>
                    {item.starred ? (
                        <StarIcon fontSize={"14px"} />
                    ) : (
                        <StarBorderIcon fontSize={"14px"} />
                    )}
                </HistoryButton>
            </Tooltip>

            <Tooltip title={"Search Logs from Query"}>
                <SubmitButton onClick={(e) => handleSubmit(item?.data)}>
                    <LaunchIcon className={"open-icon"} fontSize={"13px"} />
                    <span className={"open-text"}>{"Open In New Tab"}</span>
                </SubmitButton>
            </Tooltip>
        </div>
    );
}

function QueryHistoryTab({
    queryHistory,
    copyQuery,
    handleDelete,
    handleStarItem,
    handleSubmit,
    filtered,
    emptyMessage,
    isStarred,
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
        <QueryHistoryContainer className={isStarred ? "starredCont" : ""}>
            {listDisplay.length > 0 ? (
                listDisplay?.map((item, index) => (
                    <HistoryRow key={index}>
                        <span
                            style={{
                                color: "#666",
                            }}
                        >
                            {listDisplay.length - index}
                        </span>
                        <Tooltip title={item.data}>
                            <RowData>{item.data} </RowData>
                        </Tooltip>
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
                                    <KeyboardArrowRightIcon
                                        className={"open-icon"}
                                    />
                                    <span className={"open-text"}>
                                        {"Show Logs"}
                                    </span>
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
    handleStarLinkItem,
    handleSubmit,
    filtered,
    emptyMessage,
}) {
    const [listDisplay, setListDisplay] = useState([]);

    useEffect(() => {
        setListDisplay(linksHistory);
    }, []);
    useEffect(() => {
        if (filtered.length > 0) {
            setListDisplay(filtered);
        }
    }, [filtered]);
    useEffect(() => {
        setListDisplay(linksHistory);
    }, [linksHistory]);

    return (
        <QueryHistoryContainer>
            {listDisplay.length > 0 ? (
                listDisplay?.map((item, index) => (
                    <HistoryRow key={index}>
                        <span
                            style={{
                                paddingRight: "10px",
                                color: "#666",
                            }}
                        >
                            {listDisplay?.length - index}
                        </span>

                        <HistoryLinkParams
                            item={item}
                            copyLink={copyLink}
                            handleDelete={handleDelete}
                            handleStarLinkItem={handleStarLinkItem}
                            handleSubmit={handleSubmit}
                        />
                    </HistoryRow>
                ))
            ) : (
                <EmptyHistoryDisplay message={emptyMessage} />
            )}
        </QueryHistoryContainer>
    );
}

function StarredHistoryTab({
    starredQueries,
    starredLinks,
    handleDeleteQuery,
    handleDeleteLink,
    handleStarItem,
    handleStarLinkItem,
    handleSubmitQuery,
    handleSubmitLink,
    filteredLinks,
    filteredQueries,
    setFilteredStarLink,
    setFilteredStarQuery,
    filterItems,
    emptyQueryMessage,
    emptyLinkMessage,
    copyQuery,
}) {
    const [queryListDisplay, setQueryListDisplay] = useState([]);
    const [linksListDisplay, setLinksListDisplay] = useState([]);

    useEffect(() => {
        setQueryListDisplay(starredQueries);
        setLinksListDisplay(starredLinks);
    }, []);

    useEffect(() => {
        if (filteredLinks.length > 0) {
            setLinksListDisplay(filteredLinks);
        }
        if (filteredQueries.length > 0) {
            setQueryListDisplay(filteredQueries);
        }
    }, [filteredLinks, filteredQueries]);

    useEffect(() => {
        setQueryListDisplay(starredQueries);
        setLinksListDisplay(starredLinks);
    }, [starredQueries, starredLinks]);

    return (
        <TabsUnstyled defaultValue={0}>
            <TabsList>
                <Tab>Queries</Tab>
                <Tab>Links</Tab>
            </TabsList>

            <TabPanel value={0}>
                <QueryHistoryTabHeader
                    searchQueriesText={"Queries"}
                    queryHistory={starredQueries}
                    filterItems={filterItems}
                    setFilteredItems={setFilteredStarQuery}
                />
                <QueryHistoryTab
                    queryHistory={queryListDisplay}
                    copyQuery={copyQuery}
                    handleDelete={handleDeleteQuery}
                    handleStarItem={handleStarItem}
                    handleSubmit={handleSubmitQuery}
                    filtered={filteredQueries}
                    emptyMessage={emptyQueryMessage}
                    isStarred={true}
                />
            </TabPanel>
            <TabPanel value={1}>
                <QueryHistoryTabHeader
                    searchQueriesText={"Links"}
                    queryHistory={starredLinks}
                    filterItems={filterItems}
                    setFilteredItems={setFilteredStarLink}
                />
                <LinksHistoryTab
                    linksHistory={linksListDisplay}
                    copyQuery={copyQuery}
                    handleDelete={handleDeleteLink}
                    handleStarLinkItem={handleStarLinkItem}
                    handleSubmit={handleSubmitLink}
                    filtered={filteredLinks}
                    emptyMessage={emptyLinkMessage}
                    isStarred={true}
                />
            </TabPanel>
        </TabsUnstyled>
    );
}

function QueryHistoryTabHeader({
    queryHistory,
    filterItems,
    setFilteredItems,
    searchQueriesText,
}) {
    const [value, setValue] = useState("");

    function handleValueChange(e) {
        let edited = e.target.value;
        setValue(edited);
        const filtered = filterItems(queryHistory, edited);
        if (filtered.length > 0) {
            setFilteredItems(filtered);
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
                    placeholder={"Search " + searchQueriesText}
                />{" "}
                <span style={{ margin: "0px 4px" }}>
                    Total: {queryHistory.length}
                </span>
            </div>
        </TabHeaderContainer>
    );
}

function SettingHistoryTabHeader({ queryHistory, linksHistory }) {
    return (
        <TabHeaderContainer>
            <div
                style={{
                    display: "flex",
                    alignItems: "center",
                }}
            >
                <span style={{ margin: "0px 4px" }}>
                    Query History Rows: {queryHistory?.length}
                </span>
                {" | "}
                <span style={{ margin: "0px 4px" }}>
                    Links History Rows: {linksHistory?.length}
                </span>
            </div>
        </TabHeaderContainer>
    );
}

function SettingTab({ clearHistory, clearLinksHistory }) {
    return (
        <QueryHistoryContainer>
            <div style={{ display: "flex" }}>
                <SettingItemContainer>
                    <div>Clear Query History</div>
                    <small>
                        Delete all of your query history, permanently.
                    </small>
                    <AlertDialog
                        dialogType={"Query"}
                        clearHistory={clearHistory}
                    />
                </SettingItemContainer>
                <SettingItemContainer>
                    <div>Clear Links History</div>
                    <small>
                        Delete all of your links history, permanently.
                    </small>
                    <AlertDialog
                        dialogType={"Links"}
                        clearHistory={clearLinksHistory}
                    />
                </SettingItemContainer>
            </div>
        </QueryHistoryContainer>
    );
}

const QueryHistory = (props) => {
    const dispatch = useDispatch();
    const historyService = localService().historyStore();
    const linkService = localUrl();
    const queryHistory = useSelector((store) => store.queryHistory);
    const linksHistory = useSelector((store) => store.linksHistory);
    const historyOpen = useSelector((store) => store.historyOpen);

    const [starredItems, setStarredItems] = useState([]);
    const [filtered, setFiltered] = useState([]);
    const [linksFiltered, setLinksFiltered] = useState([]);
    const [linksStarredFiltered, setLinksStarredFiltered] = useState([]);
    const [starredFiltered, setStarredFiltered] = useState([]);
    const [linksStarredItems, setLinksStarredItems] = useState(false);

    function handleDelete(id) {
        const removed = historyService.remove(id);
        dispatch(setQueryHistory(removed));
        dispatch(
            createAlert({
                message: "Query deleted succesfully",
                type: notificationTypes.info,
            })
        );
    }

    function handleLinkDelete(id) {
        const removed = linkService.remove(id);
        dispatch(setLinksHistory(removed));
    }

    function handleSubmit(item) {
        dispatch(setQuery(item.data));
        dispatch(loadLogs());
    }

    function handleLinkSubmit(link) {
        window.open(link);
    }
    function filterItems(list, item) {
        return list?.filter((f) =>
            f.data.toLowerCase().includes(item.toLowerCase())
        );
    }
    function setFilteredItems(list) {
        setFiltered(list);
    }

    function setFilterLinkItems(list) {
        setLinksFiltered(list);
    }

    function filterStarred(starred) {
        setStarredFiltered(starred);
    }

    function filterLinkStarred(starred) {
        setLinksStarredFiltered(starred);
    }
    useEffect(() => {
        const starred = queryHistory?.filter((f) => f.starred) || [];
        const linksStarred = linksHistory?.filter((f) => f.starred) || [];
        setLinksStarredItems(linksStarred);
        setStarredItems(starred);
    }, [queryHistory, linksHistory]);

    function handleStarItem(item) {
        const updatedItem = { ...item, starred: item.starred ? false : true };
        const updated = historyService.update(updatedItem);
        dispatch(setQueryHistory(updated));
        if (updatedItem.starred) {
            dispatch(
                createAlert({
                    message: "Query starred succesfully",
                    type: notificationTypes.success,
                })
            );
        } else {
            dispatch(
                createAlert({
                    message: "Query unstarred succesfully",
                    type: notificationTypes.success,
                })
            );
        }
    }
    function handleStarLinkItem(item) {
        const updatedItem = { ...item, starred: item.starred ? false : true };
        const updated = linkService.update(updatedItem);
        dispatch(setLinksHistory(updated));
        if (updatedItem.starred) {
            dispatch(
                createAlert({
                    message: "Link starred succesfully",
                    type: notificationTypes.success,
                })
            );
        } else {
            dispatch(
                createAlert({
                    message: "Link unstarred succesfully",
                    type: notificationTypes.success,
                })
            );
        }
    }
    function copyQuery(item) {
        navigator.clipboard.writeText(item).then(
            function () {
                if (item.length > 0) {
                    dispatch(
                        createAlert({
                            message: "Query copied succesfully",
                            type: notificationTypes.success,
                        })
                    );
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
            dispatch(
                createAlert({
                    message: "Query History cleared succesfully",
                    type: notificationTypes.info,
                })
            );
        }
    }

    function clearLinksHistory() {
        const historyClean = linkService.clean();
        dispatch(setLinksHistory(historyClean));
        if (historyClean?.length < 1) {
            dispatch(
                createAlert({
                    message: "Links History cleared succesfully",
                    type: notificationTypes.info,
                })
            );
        }
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
                            searchQueriesText={"Queries"}
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
                            searchQueriesText={"Links"}
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
                            handleStarLinkItem={handleStarLinkItem}
                            handleSubmit={handleLinkSubmit}
                            filtered={linksFiltered}
                            emptyMessage={
                                "There is no links history. Please execute some queries and share links and you will see a history here."
                            }
                        />
                    }
                    starredTabHeader={
                        <QueryHistoryTabHeader
                            searchQueriesText={"Queries"}
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
                    starredHistoryTab={
                        <StarredHistoryTab
                            starredQueries={starredItems}
                            starredLinks={linksStarredItems}
                            handleDeleteQuery={handleDelete}
                            handleDeleteLink={handleLinkDelete}
                            handleStarItem={handleStarItem}
                            handleStarLinkItem={handleStarLinkItem}
                            handleSubmitQuery={handleSubmit}
                            handleSubmitLink={handleLinkSubmit}
                            filterItems={filterItems}
                            setFilteredStarLink={filterLinkStarred}
                            setFilteredStarQuery={filterStarred}
                            filteredQueries={starredFiltered}
                            filteredLinks={linksStarredFiltered}
                            emptyQueryMessage={
                                "Click the ‘Star’ icon to save links and find them here to reuse again"
                            }
                            emptyLinkMessage={
                                "Click the ‘Star’ icon to save queries and find them here to reuse again"
                            }
                            copyQuery={copyQuery}
                        />
                    }
                    settingTabHeader={
                        <SettingHistoryTabHeader
                            queryHistory={queryHistory}
                            linksHistory={linksHistory}
                        />
                    }
                    settingTab={
                        <SettingTab
                            clearHistory={clearHistory}
                            clearLinksHistory={clearLinksHistory}
                        />
                    }
                    closeButton={<CloseButton onClose={handleClose} />}
                />
            </Drawer>
        </ThemeProvider>
    );
};

export default QueryHistory;
