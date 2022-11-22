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
import { useMemo, useState } from "react";
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

    const dataSourceOptions = useMemo(() => {
        return dataSources.map((m) => ({
            value: m.id,
            name: m.name,
            type: m.type,
            icon: m.icon,
        }));
    }, [dataSources]);
    const valueMemo = useMemo(() => {
        return (
            dataSourceOptions?.find(
                (f) => f.value === props.data.dataSourceId
            ) || ""
        );
    }, [props.data.dataSourceId, dataSourceOptions]);
    const [dataSourceValue, setDataSourceValue] = useState(valueMemo || "");

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
    const onDataSourceChange = (e) => {
        const value = e.target.value;
        const dataSource = dataSources.find((f) => f.id === value);
        const panelCP = JSON.parse(JSON.stringify(panel));
        setDataSourceValue((prev) => {
            return dataSource;
        });
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
