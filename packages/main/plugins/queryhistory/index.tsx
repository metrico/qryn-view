import {
    Checkbox,
    FormControlLabel,
    FormGroup,
    MenuItem,
    ThemeProvider,
    Tooltip,
} from "@mui/material";
import localService from "../../services/localService";
import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import setQueryHistory from "@ui/store/actions/setQueryHistory";
import getData from "@ui/store/actions/getData";
import setHistoryOpen from "@ui/store/actions/setHistoryOpen";
import { createAlert } from "@ui/store/actions";
import { format } from "date-fns";
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";
import StarIcon from "@mui/icons-material/Star";
import StarBorderIcon from "@mui/icons-material/StarBorder";
import ContentCopyIcon from "@mui/icons-material/ContentCopy";

import LinkIcon from "@mui/icons-material/Link";
import AccessTimeIcon from "@mui/icons-material/AccessTime";
import Tabs from "@mui/base/Tabs";

import LaunchIcon from "@mui/icons-material/Launch";
import KeyboardArrowRightIcon from "@mui/icons-material/KeyboardArrowRight";
import ZoomOutMapIcon from "@mui/icons-material/ZoomOutMap";
import ZoomInMapIcon from "@mui/icons-material/ZoomInMap";
import KeyboardArrowDownOutlinedIcon from "@mui/icons-material/KeyboardArrowDownOutlined";
import { Typography } from "@mui/material";
import DOMPurify from "isomorphic-dompurify";
import localUrl from "../../services/localUrl";

import setLinksHistory from "@ui/store/actions/setLinksHistory";
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
    StyledDrawer,
    TabsContainer,
} from "./styled";

import AlertDialog from "./components/AlertDialog";
import EmptyHistoryDisplay from "./components/EmptyHistoryDisplay";
import CloseButton from "./components/CloseButton";
import { notificationTypes } from "@ui/qrynui/notifications/consts";

import { CustomMenu } from "@ui/main/components/StatusBar/components/daterangepicker";
import useTheme from "@ui/theme/useTheme";

function QueryHistoryTabs(props: any) {
    const {
        historyTabHeader,
        historyTab,
        starredHistoryTab,
        closeButton,
        linksTabHeader,
        linksTab,
        settingTab,
        settingTabHeader,
    }: any = props;
    return (
        <TabsContainer defaultValue={0}>
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
        </TabsContainer>
    );
}

function HistoryLinkParams({
    pos,
    item,
    copyLink,
    handleDelete,
    handleStarLinkItem,
    handleSubmit,
    label,
}: any) {
    const [open, setOpen] = useState(false);
    const { fromDate, toDate, type, url, queryInput, limit } = item;

    const openParams = () => {
        setOpen((opened) => (opened ? false : true));
    };

    return (
        <LinkParams open={open}>
            <HistoryLinkQuery pos={pos} onOpen={open} />

            <button
                className="open-button"
                onClick={() => {
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
                            fontSize="small"
                            style={{ marginRight: "3px" }}
                        />{" "}
                        {url}
                    </span>
                </Tooltip>

                <span style={{ whiteSpace: "nowrap" }}>limit: {limit}</span>

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
                    <Tooltip title={`${fromDate} - ${toDate}`}>
                        <AccessTimeIcon
                            style={{
                                marginRight: "3px",
                                height: "14px",
                                width: "14px",
                            }}
                        />
                    </Tooltip>{" "}
                    <TimeSpan>
                        {fromDate}
                        {" - "}
                        {toDate}
                    </TimeSpan>
                </div>
            </div>

            <div className="block-params">
                <p>
                    <span className="key"> Query:</span>{" "}
                    <span className="value">{queryInput}</span>{" "}
                </p>
                <p>
                    <span className="key"> API URL:</span>{" "}
                    <span className="value">{url}</span>{" "}
                </p>
                <p>
                    <span className="key"> Data Source Type:</span>{" "}
                    <span className="value">{type}</span>{" "}
                </p>
                <p>
                    <span className="key">From: </span>{" "}
                    <span className="value">{fromDate}</span>{" "}
                </p>
                <p>
                    <span className="key"> To: </span>{" "}
                    <span className="value"> {toDate}</span>{" "}
                </p>
                <p>
                    <span className="key">Limit: </span>{" "}
                    <span className="value">{limit}</span>{" "}
                </p>
                <p>
                    <span className="key"> Step:</span>{" "}
                    <span className="value">{item.params.step}</span>{" "}
                </p>
            </div>
            <HistoryLinkTools
                item={item}
                onOpen={open}
                copyLink={copyLink}
                handleDelete={handleDelete}
                handleStarLinkItem={handleStarLinkItem}
                handleSubmit={handleSubmit}
                label={label}
            />
        </LinkParams>
    );
}

function HistoryLinkQuery({ pos, onOpen }: any) {
    return (
        <div style={{ display: onOpen ? "none" : "flex", width: "30vw" }}>
            <RowData>
                {"Link "}
                {pos}{" "}
            </RowData>
        </div>
    );
}

function HistoryLinkTools(props: any) {
    const {
        item,
        onOpen,
        copyLink,
        handleDelete,
        handleStarLinkItem,
        handleSubmit,
        label,
    }: any = props;
    const theme = useTheme();
    const [anchorEl, setAnchorEl] = useState(null);
    const open = Boolean(anchorEl);
    const [isRelative, setIsRelative] = useState(false);

    const handleClick = (event: any) => {
        setAnchorEl((prev) => event.currentTarget);
        setIsRelative((prev) => isRelative);
    };
    const handleClose = (e: any, direction: any, option: any) => {
        setAnchorEl(null);
    };

    const handleChange = (event: any) => {
        setIsRelative((prev) => Boolean(event.target.checked));
    };

    return (
        <div
            style={{
                display: "flex",
                flexDirection: onOpen ? "column-reverse" : "row",
                justifyContent: "space-between",
                alignItems: "center",
            }}
        >
            <>
                <Tooltip title={"Copy Link to Clipboard"} placement="right-end">
                    <span style={{ display: "flex" }}>
                        <HistoryButton
                            onClick={(e: any) =>
                                copyLink(item?.data, "link", isRelative)
                            }
                            isActive={true}
                            style={{ flex: 1 }}
                            className={"URL-COPY"}
                            attachedside={"r"}
                        >
                            <LinkIcon
                                style={{ height: "14px", width: "14px" }}
                                fontSize="small"
                            />
                        </HistoryButton>
                        <HistoryButton
                            attachedside={"l"}
                            onClick={handleClick}
                            size={"small"}
                            className={"date-time-selector"}
                            aria-controls={open ? "backward-menu" : undefined}
                            aria-haspopup="true"
                            aria-expanded={open ? "true" : undefined}
                        >
                            <KeyboardArrowDownOutlinedIcon fontSize="small" />
                        </HistoryButton>
                        <CustomMenu
                            id="backward-menu"
                            anchorEl={anchorEl}
                            open={open}
                            onClose={handleClose}
                            qryntheme={theme}
                            size={"small"}
                        >
                            <MenuItem
                                key={`relativeTime`}
                                style={{ padding: "0 14px" }}
                            >
                                <FormGroup>
                                    <FormControlLabel
                                        style={{
                                            padding: "0",
                                            marginRight: 0,
                                            cursor: !label
                                                ? "not-allowed"
                                                : "default",
                                        }}
                                        checked={isRelative}
                                        onChange={handleChange}
                                        control={
                                            <Checkbox
                                                style={{
                                                    paddingRight: "0px",
                                                    marginRight: "3px",
                                                }}
                                                sx={{
                                                    "& .MuiSvgIcon-root": {
                                                        fontSize: 14,
                                                    },
                                                }}
                                                disabled={!label}
                                            />
                                        }
                                        label={
                                            <Typography
                                                style={{
                                                    fontSize: "12px",
                                                    color: theme.contrast,
                                                }}
                                            >
                                                Relative time
                                            </Typography>
                                        }
                                    />
                                </FormGroup>
                            </MenuItem>
                        </CustomMenu>
                    </span>
                </Tooltip>
            </>
            <Tooltip title={"Delete Query"}>
                <HistoryButton onClick={(e: any) => handleDelete(item)}>
                    <DeleteOutlineIcon
                        style={{ height: "14px", width: "14px" }}
                        fontSize="small"
                    />
                </HistoryButton>
            </Tooltip>

            <Tooltip title="Star / Unstar Link">
                <HistoryButton onClick={() => handleStarLinkItem(item)}>
                    {item.starred ? (
                        <StarIcon
                            style={{ height: "14px", width: "14px" }}
                            fontSize="small"
                        />
                    ) : (
                        <StarBorderIcon
                            style={{ height: "14px", width: "14px" }}
                            fontSize="small"
                        />
                    )}
                </HistoryButton>
            </Tooltip>

            <Tooltip title={"Search Logs from Query"}>
                <SubmitButton onClick={() => handleSubmit(item?.data)}>
                    <LaunchIcon className="open-icon" fontSize="small" />
                    <span className="open-text">Open In New Tab</span>
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
}: any) {
    const [listDisplay, setListDisplay] = useState([]);
    useEffect(() => {
        setListDisplay(queryHistory);
        // eslint-disable-next-line react-hooks/exhaustive-deps
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
    function queryNameDisplay(data: any) {
        let query = "";
        if (typeof data === "string") {
            try {
                query = JSON.parse(data)["queryInput"];
            } catch (e) {
                query = data;
            }
        }
        return query;
    }
    return (
        <QueryHistoryContainer className={isStarred ? "starredCont" : ""}>
            {listDisplay.length > 0 ? (
                listDisplay?.map((item: any, index: number) => (
                    <HistoryRow key={index}>
                        <span
                            style={{
                                color: "#666",
                                paddingRight: "10px",
                                width: "10px",
                                display: "flex",
                                alignItems: "center",
                            }}
                        >
                            {listDisplay.length - index}
                        </span>
                        <Tooltip title={item.data}>
                            <RowData>{queryNameDisplay(item.data)} </RowData>
                        </Tooltip>
                        <span>
                            {format(item.timestamp, "yyyy/MM/dd HH:mm:ss")}
                        </span>

                        <div style={{ display: "flex", alignItems: "center" }}>
                            <Tooltip title={"Copy Query to Clipboard"}>
                                <HistoryButton
                                    onClick={() => copyQuery(item.data)}
                                >
                                    <ContentCopyIcon
                                        style={{
                                            height: "14px",
                                            width: "14px",
                                        }}
                                        fontSize="small"
                                    />
                                </HistoryButton>
                            </Tooltip>

                            <Tooltip title={"Delete Query"}>
                                <HistoryButton
                                    onClick={() => handleDelete(item)}
                                >
                                    <DeleteOutlineIcon
                                        style={{
                                            height: "14px",
                                            width: "14px",
                                        }}
                                        fontSize="small"
                                    />
                                </HistoryButton>
                            </Tooltip>

                            <Tooltip title={"Star / Unstar Query"}>
                                <HistoryButton
                                    onClick={() => handleStarItem(item)}
                                >
                                    {item.starred ? (
                                        <StarIcon
                                            style={{
                                                height: "14px",
                                                width: "14px",
                                            }}
                                            fontSize="small"
                                        />
                                    ) : (
                                        <StarBorderIcon
                                            style={{
                                                height: "14px",
                                                width: "14px",
                                            }}
                                            fontSize="small"
                                        />
                                    )}
                                </HistoryButton>
                            </Tooltip>

                            <Tooltip title={"Search Logs from Query"}>
                                <SubmitButton
                                    onClick={() => handleSubmit(item)}
                                >
                                    <KeyboardArrowRightIcon
                                        className={"open-icon"}
                                    />
                                    <span className={"open-text"}>
                                        {"Show Results"}
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
    isStarred,
    label,
}: any) {
    const [listDisplay, setListDisplay] = useState([]);

    useEffect(() => {
        setListDisplay(linksHistory);
        // eslint-disable-next-line react-hooks/exhaustive-deps
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
        <QueryHistoryContainer className={isStarred ? "starredCont" : ""}>
            {listDisplay.length > 0 ? (
                listDisplay?.map((item, index) => (
                    <HistoryRow key={index}>
                        <span
                            style={{
                                paddingRight: "10px",
                                color: "#666",
                                width: "10px",
                                display: "flex",
                                alignItems: "center",
                            }}
                        >
                            {listDisplay?.length - index}
                        </span>

                        <HistoryLinkParams
                            pos={listDisplay?.length - index}
                            item={item}
                            copyLink={copyLink}
                            handleDelete={handleDelete}
                            handleStarLinkItem={handleStarLinkItem}
                            handleSubmit={handleSubmit}
                            label={label}
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
    label,
}: any) {
    const [queryListDisplay, setQueryListDisplay] = useState([]);
    const [linksListDisplay, setLinksListDisplay] = useState([]);

    useEffect(() => {
        setQueryListDisplay(starredQueries);
        setLinksListDisplay(starredLinks);
        // eslint-disable-next-line react-hooks/exhaustive-deps
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
        <Tabs defaultValue={0}>
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
                    label={label}
                />
            </TabPanel>
        </Tabs>
    );
}

function QueryHistoryTabHeader({
    queryHistory,
    filterItems,
    setFilteredItems,
    searchQueriesText,
}: any) {
    const [value, setValue] = useState("");

    function handleValueChange(e: any) {
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
                    value={DOMPurify.sanitize(value)}
                    onChange={handleValueChange}
                    placeholder={`Search ${searchQueriesText}`}
                />{" "}
                <span style={{ margin: "0px 4px" }}>
                    Total: {queryHistory.length}
                </span>
            </div>
        </TabHeaderContainer>
    );
}

function SettingHistoryTabHeader({ queryHistory, linksHistory }: any) {
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

function SettingTab({ clearHistory, clearLinksHistory }: any) {
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

const QueryHistory = (props: any) => {
    const LINK_COPIED = "Link Copied To Clipboard";
    const dispatch: any = useDispatch();
    const historyService = localService().historyStore();
    const linkService = localUrl();
    const queryHistory = useSelector((store: any) => store.queryHistory);
    const linksHistory = useSelector((store: any) => store.linksHistory);
    const historyOpen = useSelector((store: any) => store.historyOpen);
    const theme = useTheme();

    const [starredItems, setStarredItems] = useState([]);
    const [filtered, setFiltered] = useState([]);
    const [linksFiltered, setLinksFiltered] = useState([]);
    const [linksStarredFiltered, setLinksStarredFiltered] = useState([]);
    const [starredFiltered, setStarredFiltered] = useState([]);
    const [linksStarredItems, setLinksStarredItems] = useState(false);
    const start = useSelector ((store:any)=> store.start)
    const stop = useSelector ((store:any)=> store.stop)
    const label = useSelector(({ label }: any) => label);

    function handleDelete(id: any) {
        const removed = historyService.remove(id);
        dispatch(setQueryHistory(removed));
        dispatch(
            createAlert({
                message: "Query deleted succesfully",
                type: notificationTypes.info,
            })
        );
    }

    function handleLinkDelete(id: any) {
        const removed = linkService.remove(id);
        dispatch(setLinksHistory(removed));
    }

    function handleSubmit(item: any) {
        const initialObj = {
            id: "",
            limit: 100,
            panel: "left",
            queryInput: "",
            queryType: "range",
            direction: "forward",
        };
        let logData = {};
        try {
            logData = JSON.parse(item.data);
        } catch (e) {
            logData = { ...initialObj };
        }

        const {
            id,
            limit,
            panel,
            queryInput,
            queryType,
            type,
            dataSourceId,
            url,

            direction,
        }: any = logData;

        let querySubmit = "";

        let customStep = 0;

        if (queryInput.includes("$__interval")) {
            const timeDiff = (stop.getTime() - start.getTime()) / 1000;

            const timeProportion: number = timeDiff / 30;

            const screenProportion: number = +(1).toFixed(1);

            const intval = timeProportion / screenProportion;

            const ratiointval = Math.round(
                intval * (window as any).devicePixelRatio.toFixed(2)
            );
            querySubmit = queryInput.replace(
                /\[\$__interval\]/,
                `[${ratiointval}s]`
            );
            customStep = ratiointval;
        } else {
            querySubmit = queryInput;
        }

        dispatch(
            getData(
                type,
                querySubmit,
                queryType,
                limit,
                panel,
                id,
                direction || "forward",
                dataSourceId,
                url,
                customStep
            )
        );
    }

    function handleLinkSubmit(link: any) {
        window.open(link);
    }
    function filterItems(list: any, item: any) {
        return list?.filter((f: any) =>
            f.data.toLowerCase().includes(item.toLowerCase())
        );
    }
    function setFilteredItems(list: any) {
        setFiltered(list);
    }

    function setFilterLinkItems(list: any) {
        setLinksFiltered(list);
    }

    function filterStarred(starred: any) {
        setStarredFiltered(starred);
    }

    function filterLinkStarred(starred: any) {
        setLinksStarredFiltered(starred);
    }

    useEffect(() => {
        const starred = queryHistory?.filter((f: any) => f.starred) || [];
        const linksStarred = linksHistory?.filter((f: any) => f.starred) || [];
        setLinksStarredItems(linksStarred);
        setStarredItems(starred);
    }, [queryHistory, linksHistory]);

    function handleStarItem(item: any) {
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

    function handleStarLinkItem(item: any) {
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

    function alertSuccess() {
        dispatch(
            createAlert({
                type: "success",
                message: LINK_COPIED,
            })
        );
    }

    function shareDefaultLink(copyText: any) {
        navigator.clipboard.writeText(copyText).then(
            function () {
                alertSuccess();
            },
            function (err) {
                console.log("error on copy", err);
            }
        );
    }
    function shareDomLink(copyText: any) {
        let textArea: any = document.createElement("textarea");
        textArea.value = copyText;
        textArea.style = {
            position: "fixed",
            left: "-999999px",
            top: "-999999px",
        };

        document.body.appendChild(textArea);
        textArea.focus();
        textArea.select();

        return new Promise((res: any, rej: any) => {
            alertSuccess();
            document.execCommand("copy") ? res() : rej();
            textArea.remove();
        });
    }
    function copyQuery(item: any, type = "query", isRelative = false) {
        const url = new URL(item);
        const { hash } = url;
        const params = new URLSearchParams(hash.replace(/#/, ""));
        params.set("label", label);
        const locationWithLabel = new URL(window.location.href);
        locationWithLabel.hash = `#${params.toString()}`;
        const copyText =
            type === "query"
                ? JSON.parse(item)["queryInput"]
                : isRelative && label
                ? locationWithLabel
                : item;
        setTimeout(() => {
            if (navigator?.clipboard && window.isSecureContext) {
                shareDefaultLink(copyText);
            } else {
                shareDomLink(copyText);
            }
        }, 200);
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
            {historyOpen && (
                <StyledDrawer
                    anchor={"bottom"}
                    style={{ maxHeight: "250px" }}
                    open={historyOpen}
                    variant={"persistent"}
                    theme={theme}
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
                                label={label}
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
                                    "Click the 'Star' icon to save links and find them here to reuse again"
                                }
                                emptyLinkMessage={
                                    "Click the 'Star' icon to save queries and find them here to reuse again"
                                }
                                copyQuery={copyQuery}
                                label={label}
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
                </StyledDrawer>
            )}
        </ThemeProvider>
    );
};

export default QueryHistory;
