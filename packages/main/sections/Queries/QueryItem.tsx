import { ThemeProvider } from "@emotion/react";
import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import LabelBrowser from "@ui/main/components/LabelBrowser";
import { QueryItemContainer } from "@ui/main/components/QueryItem/QueryItemContainer";
import { useActiveTabs } from "@ui/plugins/PluginManagerFactory";
import SinglePlugin from "@ui/plugins/SinglePlugin";

import useTheme from "@ui/theme/useTheme";
import { setSplitView } from "@ui/store/actions";

import {
    panelAction,
    dataViewAction,
    setNewPanelData,
    filterPanel,
    filterLocal,
    getStoredQueries,
    setStoredQuery,
    setLocalTabsState,
    getLocalTabsState,
} from "./helpers";
import { useIdRefs } from "./hooks";

interface TabPanelProps {
    children?: React.ReactNode;
    index: number;
    value: number;
}

function TabPanel(props: TabPanelProps) {
    const { children, value, index, ...other } = props;

    return (
        <div
            role="tabpanel"
            hidden={value !== index}
            id={`simple-tabpanel-${index}`}
            aria-labelledby={`simple-tab-${index}`}
            {...other}
        >
            {value === index && <>{children}</>}
        </div>
    );
}

const QueryItem = (props: any) => {
    const { name, data } = props;

    console.log(data)
    const { id } = data;
    const [launchQuery, setLaunchQuery] = useState("");
    const dispatch: any = useDispatch();
    const dataView = useSelector((store: any) => store[`${name}DataView`]);
    const panelSelected = useSelector((store: any) => store[name]);
    const isQueryOpen = useState(true);
    const idRefs = useIdRefs(name);
    const theme = useTheme();
    const [tabsValue, setTabsValue] = useState(getLocalTabsState(name, id));

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

    const onTabChange = (e: React.SyntheticEvent, tabValue: number) => {
        setLocalTabsState(name, id, tabValue);
        setTabsValue(() => tabValue);
    };
    const { activeTabs, isActiveTabs } = useActiveTabs(`Query Item`);

    return (
        <ThemeProvider theme={theme}>
            <QueryItemContainer
                {...props}
                isQueryOpen={isQueryOpen}
                onDeleteQuery={onDeleteQuery}
                onAddQuery={onAddQuery}
                onTabChange={onTabChange}
                tabsValue={tabsValue}
                isTabs={isActiveTabs}
                activeTabs={activeTabs}
            >
                {isActiveTabs ? (
                    <div>
                        <TabPanel value={tabsValue} index={0}>
                            {isQueryOpen[0] && (
                                <LabelBrowser
                                    {...props}
                                    launchQuery={launchQuery}
                                />
                            )}
                        </TabPanel>
                        {activeTabs?.map((tab: any, i: number) => {
                            return (
                                <TabPanel
                                    value={tabsValue}
                                    key={i}
                                    index={i + 1}
                                >
                                    <SinglePlugin
                                        name={tab.name}
                                        section={"Query Item"}
                                        localProps={{ props, setLaunchQuery }}
                                    />
                                </TabPanel>
                            );
                        })}
                    </div>
                ) : (
                    <>
                        {isQueryOpen[0] && (
                            <LabelBrowser
                                {...props}
                                launchQuery={launchQuery}
                            />
                        )}
                    </>
                )}
            </QueryItemContainer>
        </ThemeProvider>
    );
};

export default QueryItem;
