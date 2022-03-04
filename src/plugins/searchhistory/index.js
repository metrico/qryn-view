import styled from "@emotion/styled";
import { Box, createTheme, ThemeProvider, Typography } from "@mui/material";
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
import TabsUnstyled from "@mui/base/TabsUnstyled";
import TabsListUnstyled from "@mui/base/TabsListUnstyled";
import TabPanelUnstyled from "@mui/base/TabPanelUnstyled";
import { buttonUnstyledClasses } from "@mui/base/ButtonUnstyled";
import TabUnstyled, { tabUnstyledClasses } from "@mui/base/TabUnstyled";

// Dialog
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
// Snackbar

import Stack from '@mui/material/Stack';
import Snackbar from '@mui/material/Snackbar';
import MuiAlert from '@mui/material/Alert';



// Snackbar for clearing confirmation
const Alert = forwardRef(function Alert(props, ref) {
    return <MuiAlert elevation={6} ref={ref} variant="outlined" {...props} />;
  });
  
 function CustomizedSnackbars({succeed,resetSnackbar}) {
    
    const [open, setOpen] = useState(succeed);
  useEffect(()=>{
setOpen(succeed)
 
  },[succeed])
    const handleClick = () => {
      setOpen(true);
    };
  
    const handleClose = (event, reason) => {
      if (reason === 'clickaway') {
        return;
      }
  
      setOpen(false);
      resetSnackbar()
    };
  
    return (
     <div>
        <Snackbar open={open} autoHideDuration={6000} onClose={handleClose}>
          <Alert onClose={handleClose} severity="info" sx={{ width: '100%' }}>
            Query History Cleared Succesfully
          </Alert>
        </Snackbar>
        </div>
    
    );
  }




// Alert Dialog for Clearing History
function AlertDialog({clearHistory}) {
    const [open, setOpen] = useState(false);
  
    const handleClickOpen = () => {
      setOpen(true);
    };
  
    const handleClose = () => {
      setOpen(false);
    };
   function handleClearHistory(){
            clearHistory()
            setOpen(false)
   }
    return (
      <div>
        <ClearHistoryButton onClick={handleClickOpen}>
                        {"Clear History"}
                    </ClearHistoryButton>
        <Dialog
          open={open}
          onClose={handleClose}
          aria-labelledby="alert-dialog-title"
          aria-describedby="alert-dialog-description"
        >
          <DialogTitle id="alert-dialog-title">
            {"Are You Sure Want to Clear Query History?"}
          </DialogTitle>
          <DialogContent>
            <DialogContentText id="alert-dialog-description">
            This Action Will Delete All Of Your Query History, Permanently.
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button onClick={handleClose}>Cancel</Button>
            <Button onClick={handleClearHistory} autoFocus>
              Clear History
            </Button>
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
        color: #ddd;
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

const TabHeaderContainer = styled.div`
    padding: 0px 10px;
    font-size: 13px;
    display: flex;
    align-items: center;
    justify-content: space-between;
    background: #8a8a8a50;
    height:37px;
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

function SearchHistoryTabs({
    historyTabHeader,
    historyTab,
    starredTab,
    closeButton,
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
                    <TabHistoryStarIcon />
                    <span>Starred</span>
                </Tab>
                <Tab>
                    {" "}
                    <TabHistorySettingIcon /> Settings
                </Tab>
                {closeButton}
            </TabsList>
            <TabPanel value={0}>
                {historyTabHeader}
                {historyTab}
            </TabPanel>
            <TabPanel value={1}>
                {starredTabHeader}
                {starredTab}
            </TabPanel>
            <TabPanel value={2}>
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
            main: "#fff",
            background: "#1a1a1a",
        },
    },
});

const SearchHistoryContainer = styled.div`
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
    width: 300px;
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

const FilterInput = styled.input`
    color: orange;
    background: #121212;
    border: none;
    margin: 3px;
    padding: 3px 6px;
    font-size: 13px;
    border-radius: 3px;
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
    height:30px;
`;

function SearchHistoryTab({
    queryHistory,
    copyQuery,
    handleDelete,
    handleStarItem,
    handleSubmit,
    filtered,
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
        <SearchHistoryContainer>
            {listDisplay &&
                listDisplay.map((item, index) => (
                    <HistoryRow key={index}>
                        <span style={{ flex: 1 }}>{item.data} </span>

                        <span>
                            {format(item.timestamp, "yyyy/MM/dd HH:mm:ss")}
                        </span>

                        <div style={{ display: "flex" }}>
                            <HistoryButton
                                onClick={(e) => copyQuery(item.data)}
                            >
                                <ContentCopyIcon fontSize={"14px"} />
                            </HistoryButton>
                            <HistoryButton onClick={(e) => handleDelete(item)}>
                                <DeleteOutlineIcon fontSize={"14px"} />
                            </HistoryButton>
                            <HistoryButton
                                onClick={(e) => handleStarItem(item)}
                            >
                                {item.starred ? (
                                    <StarIcon fontSize={"14px"} />
                                ) : (
                                    <StarBorderIcon fontSize={"14px"} />
                                )}
                            </HistoryButton>
                            <SubmitButton onClick={(e) => handleSubmit(item)}>
                                {"Show Logs"}
                            </SubmitButton>
                        </div>
                    </HistoryRow>
                ))}
        </SearchHistoryContainer>
    );
}

function SearchHistoryTabHeader({
    queryHistory,
    clearHistory,
    filterItems,
    setFilteredItems,
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
function SettingHistoryTabHeader({ clearHistory, queryHistory }) {
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
            </div>
        </TabHeaderContainer>
    );
}

function SettingTab({ clearHistory }) {
    // const listDisplay = filtered.length > 0 ? filtered : queryHistory
    return (
        <SearchHistoryContainer>
            <div>
                <SettingItemContainer>
                    <div>Clear Query History</div>
                    <small>
                        Delete all of your query history, permanently.
                    </small>
                    <AlertDialog 
                    clearHistory={clearHistory}
                    />
                   
                </SettingItemContainer>
            </div>
        </SearchHistoryContainer>
    );
}

const SearchHistoryDrawer = (props) => {
    const dispatch = useDispatch();
    const historyService = localService().historyStore();
    const queryHistory = useSelector((store) => store.queryHistory);
    const historyOpen = useSelector((store) => store.historyOpen);

    const [starredItems, setStarredItems] = useState([]);
    const [filtered, setFiltered] = useState([]);
    const [starredFiltered, setStarredFiltered] = useState([]);
    const [succeed,setSucceed] = useState(false)

    function handleDelete(id) {
        const removed = historyService.remove(id);
        dispatch(setQueryHistory(removed));
    }

    function handleSubmit(item) {
        dispatch(setQuery(item.data));
        dispatch(loadLogs());
    }

    useEffect(() => {
        const starred = queryHistory.filter((f) => f.starred) || [];
        setStarredItems(starred);
    }, [queryHistory]);

    function handleStarItem(item) {
        const updatedItem = { ...item, starred: item.starred ? false : true };
        const updated = historyService.update(updatedItem);
        dispatch(setQueryHistory(updated));
    }

    function copyQuery(item) {
        navigator.clipboard.writeText(item).then(
            function () {
                console.log("copied to clipboard", item);
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
        if(historyClean?.length < 1){
            console.log('succeed on main')
            setSucceed(true)
        }
    }

    function filterItems(list, item) {
        return list.filter((f) =>
            f.data.toLowerCase().includes(item.toLowerCase())
        );
    }

    function setFilteredItems(list) {
        setFiltered(list);
    }

    function filterStarred(starred) {
        setStarredFiltered(starred);
    }

    function resetSnackbar() {
        setSucceed(false)
    }

    return (
        <ThemeProvider theme={theme}>
            <Drawer anchor={"bottom"}
            
            style={{height:'250px'}}
            open={historyOpen} variant={"persistent"}>
                <SearchHistoryTabs
                    historyTabHeader={
                        <SearchHistoryTabHeader
                            queryHistory={queryHistory}
                            clearHistory={clearHistory}
                            filterItems={filterItems}
                            setFilteredItems={setFilteredItems}
                        />
                    }
                    historyTab={
                        <SearchHistoryTab
                            queryHistory={queryHistory}
                            copyQuery={copyQuery}
                            handleDelete={handleDelete}
                            handleStarItem={handleStarItem}
                            handleSubmit={handleSubmit}
                            filtered={filtered}
                        />
                    }
                    starredTabHeader={
                        <SearchHistoryTabHeader
                            queryHistory={starredItems}
                            clearHistory={clearHistory}
                            filterItems={filterItems}
                            setFilteredItems={filterStarred}
                        />
                    }
                    starredTab={
                        <SearchHistoryTab
                            queryHistory={starredItems}
                            copyQuery={copyQuery}
                            handleDelete={handleDelete}
                            handleStarItem={handleStarItem}
                            handleSubmit={handleSubmit}
                            filtered={starredFiltered}
                        />
                    }
                    settingTabHeader={
                        <SettingHistoryTabHeader
                            queryHistory={queryHistory}
                            clearHistory={clearHistory}
                        />
                    }
                    settingTab={<SettingTab clearHistory={clearHistory} />}
                    closeButton={<CloseButton onClose={handleClose} />}
                    
                />
                <CustomizedSnackbars
                succeed={succeed}
                resetSnackbar={resetSnackbar}
                />
            </Drawer>
        </ThemeProvider>
    );
};

const SearchHistory = () => {
    return <SearchHistoryDrawer />;
};

export default SearchHistory;
