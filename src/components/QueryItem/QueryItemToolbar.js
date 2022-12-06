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
export function QueryItemToolbar(props) {
    const dispatch = useDispatch();
    // update panel on id change
    const {
        data: { expr },
    } = props;

    const panel = useSelector((store) => store[props.name]);
    const isEmbed = useSelector((store) => store.isEmbed);

    const dataSources = useSelector((store) => store.dataSources);

    const [extValue, setExtValue] = useState(props.data.dataSourceId);

    useEffect(() => {
        setExtValue(props.data.dataSourceId);
    }, []);

    useEffect(() => {
        setExtValue(props.data.dataSourceId);
    }, [props.data.dataSourceId]);

    const dataSourceOptions = useMemo(() => {
        if (dataSources.length > 0) {
            return dataSources.map((m) => ({
                value: m.id,
                name: m.name,
                type: m.type,
                icon: m.icon,
            }));
        }
        return null;
    }, [dataSources]);

    const [dataSourceValue, setDataSourceValue] = useState({
        value: props.data.dataSourceId,
        name:
            dataSources.find((f) => f.id === props?.data?.dataSourceId)?.[
                "name"
            ] || props.data.dataSourceId,
        type: props.data.dataSourceType,
        icon:
            dataSources.find((f) => f.id === props?.data?.dataSourceId)?.[
                "icon"
            ] || props.data.dataSourceId,
    });

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

    const getPrevDsLocal = () => {
        let localDataSources = [];
        try {
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

    const onDataSourceChange = (e) => {
        const value = e.target.value;
        const dataSource = dataSources.find((f) => f.id === value);
        const panelCP = JSON.parse(JSON.stringify(panel));
        const optSelected = dataSourceOptions.find((f) => f.value === value);

        const currentLocal = getPrevDsLocal();
        let newDsLocal = [];
        if (currentLocal?.length > 0) {
            const hasPrevQuery =
                currentLocal?.find((s) => s.queryId === props.data.id) || false;
            if (hasPrevQuery) {
                newDsLocal = currentLocal.map((m) => {
                    if (m.queryId === props.data.id) {
                        return {
                            queryId: m.queryId,
                            dataSourceId: dataSource.id,
                        };
                    }
                    return m;
                });
            } else {
                newDsLocal = [
                    ...currentLocal,
                    { queryId: props.data.id, dataSourceId: dataSource.id },
                ];
            }
        } else {
            newDsLocal = [
                ...currentLocal,
                { queryId: props.data.id, dataSourceId: dataSource.id },
            ];
        }
        localStorage.setItem("dsSelected", JSON.stringify(newDsLocal));

        setDataSourceValue((_) => optSelected);

        panelCP.forEach((panelCP) => {
            if (panelCP.id === props.data.id) {
                panelCP.dataSourceId = dataSource.id;
                panelCP.dataSourceType = dataSource.type;
                panelCP.dataSourceURL = dataSource.url;
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
