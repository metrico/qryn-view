import { useDispatch, useSelector } from "react-redux";
import { setLeftPanel } from "@ui/store/actions/setLeftPanel";
import { setRightPanel } from "@ui/store/actions/setRightPanel";
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";
import SyncIcon from "@mui/icons-material/Sync";
import {
    CloseQuery,
    OpenQuery,
    QueryItemContainerStyled,
    ShowQueryButton,
} from "./style";

import AddOutlinedIcon from "@mui/icons-material/AddOutlined";
import { useEffect, useMemo, useState } from "react";
import { QueryId } from "./QueryId";
import { DataSourceSelect } from "./DataSourceSelect/DataSourceSelect";
import SplitViewButton from "../StatusBar/components/SplitViewButton";
import { DateRangePicker } from "../StatusBar/components/daterangepicker";
import { Tooltip } from "@mui/material";
import { useMediaQuery } from "react-responsive";
import PluginRenderer from "@ui/plugins/PluginsRenderer";
import { StyledTabs, StyledTab } from "./StyledTabs";
import { css, cx } from "@emotion/css";
import useTheme from "@ui/theme/useTheme";

export const StyledTabsCont = (theme: any) => css`
    background: ${theme.WidgetBg};
    .MuiTabs-root {
        height: 20px !important;
        min-height: 20px;
    }
    .MuiButtonBase-root {
        min-height: 0;
    }
`;

export function QueryItemContainer(props: any) {
    const dispatch: any = useDispatch();
    // update panel on id change
    const { onTabChange, tabsValue, isTabs, activeTabs } = props;
    const { children } = props;
    const {
        data: { expr, open, id, start, stop, label, pickerOpen, idRef },
        isQueryOpen,
    } = props;

    const theme = useTheme();
    const left = useSelector((store: any) => store.left);
    const right = useSelector((store: any) => store.right);
    const panel = useSelector((store: any) => store[props.name]);
    const isEmbed = useSelector((store: any) => store.isEmbed);
    const isCardinality = useSelector((store: any) => store.isCardinality);
    const isSplit = useSelector((store: any) => store.isSplit);
    const dataSources = useSelector((store: any) => store.dataSources);
    const isTabletOrMobile = useMediaQuery({ query: "(max-width: 1013px)" });
    const [extValue, setExtValue] = useState(props.data.dataSourceId);

    const dataSourceOptions = useMemo(() => {
        if (dataSources.length > 0) {
            return dataSources.map((m: any) => ({
                value: m.id,
                name: m.name,
                type: m.type,
                icon: m.icon,
            }));
        }
        return null;
    }, [dataSources]);

    useEffect(() => {
        setExtValue(props.data.dataSourceId);
    }, []);

    useEffect(() => {
        if (props?.data?.dataSourceId) {
            setExtValue(props.data.dataSourceId);
        }
    }, [props.data.dataSourceId]);
    const [dataSourceValue, setDataSourceValue] = useState({
        value: props?.data?.dataSourceId || "32D16h5uYBqUUzhD",
        name:
            dataSources?.find(
                (f: any) => f?.id === props?.data?.dataSourceId
            )?.["name"] || props?.data?.dataSourceId,
        type: props?.data?.dataSourceType,
        icon:
            dataSources?.find((f: any) => f.id === props?.data?.dataSourceId)?.[
                "icon"
            ] || props?.data.dataSourceId,
    });

    const panelAction = (panel: any, data: any) => {
        if (panel === "left") {
            return setLeftPanel(data);
        } else {
            return setRightPanel(data);
        }
    };

    function onIdRefUpdate(e: any) {
        const cPanel = [...panel];
        cPanel.forEach((panel) => {
            if (panel.id === props.data.id) {
                panel.idRef = e;
            }
        });

        dispatch(panelAction(props.name, cPanel));
    }

    const getPrevDsLocal = () => {
        try {
            let localDataSources: any = "";
            localDataSources = localStorage.getItem("dsSelected");
            if (localDataSources) {
                return JSON.parse(localDataSources);
            } else {
                return [];
            }
        } catch (e) {
            console.log(e);
        }
    };

    const onDataSourceChange = (e: any) => {
        const value = e.target.value;
        const dataSource = dataSources.find((f: any) => f?.id === value);
        const panelCP = JSON.parse(JSON.stringify(panel));
        const optSelected = dataSourceOptions.find(
            (f: any) => f.value === value
        );

        const currentLocal = getPrevDsLocal();
        let newDsLocal = [];
        if (currentLocal?.length > 0) {
            const hasPrevQuery =
                currentLocal?.find(
                    (s: any) => s?.queryId === props?.data?.id
                ) || false;
            if (hasPrevQuery) {
                newDsLocal = currentLocal.map((m: any) => {
                    if (m.queryId === props?.data?.id) {
                        return {
                            queryId: m?.queryId,
                            dataSourceId: dataSource?.id,
                        };
                    }
                    return m;
                });
            } else {
                newDsLocal = [
                    ...currentLocal,
                    { queryId: props?.data?.id, dataSourceId: dataSource?.id },
                ];
            }
        } else {
            newDsLocal = [
                ...currentLocal,
                { queryId: props?.data?.id, dataSourceId: dataSource?.id },
            ];
        }
        localStorage.setItem("dsSelected", JSON.stringify(newDsLocal));
        
        setDataSourceValue(() => optSelected);

        panelCP.forEach((panelCP: any) => {
            if (panelCP?.id === props?.data?.id) {
                panelCP.dataSourceId = dataSource?.id;
                panelCP.dataSourceType = dataSource?.type;
                panelCP.dataSourceURL = dataSource?.url;
            }
        });

        dispatch(panelAction(props.name, panelCP));
    };

    const onStopChange = (e: any) => {
        const cPanel = [...panel];
        cPanel.forEach((panel) => {
            if (panel.id === props.data.id) {
                panel.stop = e;
            }
        });

        dispatch(panelAction(props.name, cPanel));
    };
    const onStartChange = (e: any) => {
        const cPanel = [...panel];
        cPanel.forEach((panel) => {
            if (panel.id === props.data.id) {
                panel.start = e;
            }
        });

        dispatch(panelAction(props.name, cPanel));
    };
    const onLabelChange = (e: any) => {
        const cPanel = [...panel];
        cPanel.forEach((panel) => {
            if (panel.id === props.data.id) {
                panel.label = e;
            }
        });

        dispatch(panelAction(props.name, cPanel));
    };

    const onPickerOpen = (e: any) => {
        const cPanel = [...panel];
        cPanel.forEach((panel) => {
            if (panel.id === props.data.id) {
                panel.pickerOpen = e;
            }
        });

        dispatch(panelAction(props.name, cPanel));
    };
    // update ranges of all queries from a panel
    const updateRanges = (panels: any[], name: string) => {
        panels.forEach((query: any) => {
            query.start = start;
            query.stop = stop;
            query.label = label;
        });
        dispatch(panelAction(name, panels));
    };

    // sync time ranges at all queries
    const onSyncTimeRanges = () => {
        const lCopy = [...left];
        const rCopy = [...right];
        updateRanges(lCopy, "left");
        updateRanges(rCopy, "right");
    };

    return (
        <QueryItemContainerStyled>
            <div className="query-tools-cont">
                <div className="query-title-tabs">
                    <QueryTitle
                        isEmbed={isEmbed}
                        idRef={idRef}
                        expr={expr}
                        onIdRefUpdate={onIdRefUpdate}
                        isQueryOpen={isQueryOpen}
                    />

                    {isTabs && (
                        <div className={cx(StyledTabsCont(theme))}>
                            <StyledTabs
                                value={tabsValue}
                                onChange={onTabChange}
                            >
                                <StyledTab label="Search" />
                                {activeTabs?.length > 0 &&
                                    activeTabs?.map(
                                        (tab: any, index: number) => (
                                            <StyledTab
                                                key={index}
                                                label={tab.name}
                                            />
                                        )
                                    )}
                            </StyledTabs>
                        </div>
                    )}
                </div>

                {(!isEmbed && !isCardinality) && (
                    <div className="query-tools">
                        <div
                            style={{ display: "flex", alignItems: "center" }}
                        ></div>
                        <div
                            style={{
                                display: "flex",
                                alignItems: "center",
                                justifySelf: "flex-end",
                            }}
                        >
                            <PluginRenderer
                                section={"Query Toolbar"}
                                localProps={props}
                            />
                            {!isTabletOrMobile && (
                                <SplitViewButton
                                    isSplit={isSplit}
                                    open={open}
                                    side={props.name}
                                />
                            )}
                            <DateRangePicker
                                id={id}
                                onStopChange={onStopChange}
                                onStartChange={onStartChange}
                                onLabelChange={onLabelChange}
                                onPickerOpen={onPickerOpen}
                                startTs={start}
                                stopTs={stop}
                                label={label}
                                pickerOpen={pickerOpen}
                            />

                            <Tooltip title={"Sync Time Ranges"}>
                                <SyncIcon
                                    style={{
                                        fontSize: "15px",
                                        cursor: "pointer",
                                        padding: "3px",
                                        marginLeft: "10px",
                                    }}
                                    onClick={onSyncTimeRanges}
                                />
                            </Tooltip>

                            <DataSourceSelect
                                extValue={extValue}
                                value={dataSourceValue}
                                onChange={onDataSourceChange}
                                opts={dataSourceOptions}
                                label={""}
                            />
                            <AddOutlinedIcon
                                style={{
                                    fontSize: "15px",
                                    cursor: "pointer",
                                    padding: "3px",
                                    marginLeft: "10px",
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
                    </div>
                )}
            </div>

            {/* add a flag in here for when we will have tabs */}

            {/* here we need the children container // the tabs */}
            {children}
        </QueryItemContainerStyled>
    );
}
// add the tabs on  here and the space for children.

export type QueryTitleProps = {
    isEmbed: boolean;
    onIdRefUpdate: (e:any) => void;
    expr: string;
    isQueryOpen: any;
    idRef: string;
};

export const QueryTitle: React.FC<QueryTitleProps> = (props) => {
    const { isEmbed, expr, isQueryOpen } = props;

    return (
        <div className="query-title">
            {!isEmbed && (
                <ShowQueryButton
                    onClick={() => {
                        isQueryOpen[1](isQueryOpen[0] ? false : true);
                    }}
                >
                    {isQueryOpen[0] ? <OpenQuery /> : <CloseQuery />}
                </ShowQueryButton>
            )}

            <QueryId {...props} />
            {isEmbed && (
                <p style={{ marginLeft: "20px", fontFamily: "monospace" }}>
                    {expr}
                </p>
            )}
        </div>
    );
};
