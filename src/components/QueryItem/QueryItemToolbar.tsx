import { useDispatch, useSelector } from "react-redux";
import { setLeftPanel } from "../../actions/setLeftPanel";
import { setRightPanel } from "../../actions/setRightPanel";
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";
import {
    CloseQuery,
    OpenQuery,
    QueryItemToolbarStyled,
    ShowQueryButton,
} from "./style";
import AddOutlinedIcon from "@mui/icons-material/AddOutlined";
import { useEffect, useMemo, useState } from "react";
import { QueryId } from "./QueryId";
import { DataSourceSelect } from "./DataSourceSelect";
export function QueryItemToolbar(props: any) {
    const dispatch = useDispatch();
    // update panel on id change
    const {
        data: { expr },
    } = props;

    const panel = useSelector((store: any) => store[props.name]);
    const isEmbed = useSelector((store: any) => store.isEmbed);

    const dataSources = useSelector((store: any) => store.dataSources);

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

        setDataSourceValue((_) => optSelected);

        panelCP.forEach((panelCP: any) => {
            if (panelCP?.id === props?.data?.id) {
                panelCP.dataSourceId = dataSource?.id;
                panelCP.dataSourceType = dataSource?.type;
                panelCP.dataSourceURL = dataSource?.url;
            }
        });

        dispatch(panelAction(props.name, panelCP));
    };
    return (
        <QueryItemToolbarStyled>
            <div className="query-title">
                {!isEmbed && (
                    <ShowQueryButton
                        onClick={() => {
                            props.isQueryOpen[1](
                                props.isQueryOpen[0] ? false : true
                            );
                        }}
                    >
                        {props.isQueryOpen[0] ? <OpenQuery /> : <CloseQuery />}
                    </ShowQueryButton>
                )}

                <QueryId onIdRefUpdate={onIdRefUpdate} {...props} />
                {isEmbed && (
                    <p style={{ marginLeft: "20px", fontFamily: "monospace" }}>
                        {expr}
                    </p>
                )}
            </div>
            {!isEmbed && (
                <div className="query-tools">
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
            )}
        </QueryItemToolbarStyled>
    );
}
