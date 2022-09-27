import { ThemeProvider } from "@emotion/react";
import { useMemo, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { themes } from "../../theme/themes";
import Logo from "./assets/qryn-logo.png";
import metrics_icon from "./assets/metrics_icon.png";
import logs_icon from "./assets/logs_icon.png";
import traces_icon from "./assets/traces_icon.png";
import SettingsOutlinedIcon from "@mui/icons-material/SettingsOutlined";
import EditOutlinedIcon from "@mui/icons-material/EditOutlined";
import {
    PageContainer,
    Label,
    Input,
    InputGroup,
    InputCol,
    InputCont,
    LinkFieldsGroup,
    SettingsTitle,
    DatsourceSettingsCont,
    DsButtonStyled,
} from "./styles";

import { useLinkedFields } from "./hooks/useLinkedField";
import { Switch } from "@mui/material";
import setLinkedFields from "./store/setLinkedFields";
import setDataSources from "./store/setDataSources";

const DataSourceField = (props) => {
    const { value, label, onChange, locked } = props;
    return (
        <InputGroup>
            <Label>{label}</Label>
            <Input
                className="ds-input"
                disabled={locked}
                onChange={onChange}
                value={value}
            />
        </InputGroup>
    );
};

const DataSourceSwitch = (props) => {
    const { value, onChange, locked } = props;
    return (
        <InputGroup>
            <Label>Internal Link</Label>
            <Switch
                disabled={locked}
                size={"small"}
                checked={value}
                onChange={onChange}
            />
        </InputGroup>
    );
};

const DataSourceSelect = (props) => {
    const { value, locked, onChange } = props;
    const ds = useSelector(({ dataSources }) => dataSources);

    return (
        <InputGroup>
            <select
                disabled={locked}
                defaultValue={value.toLowerCase()}
                onChange={onChange}
            >
                {ds?.map((field, key) => (
                    <option key={key} value={field.value}>
                        {field.name}
                    </option>
                ))}
            </select>
        </InputGroup>
    );
};

const SettingButton = (props) => {
    const { value, onClick, editing, primary } = props;
    return (
        <DsButtonStyled onClick={onClick} editing={editing} primary={primary}>
            {value}
        </DsButtonStyled>
    );
};

/**
 * 
 * 
dataSource: "Logs"
ds_id: "logs"
id: "-l6hS3i3MDhlQIkQCAJcc"
internalLink: true
linkType: "Traces"
name: "traceId"
query: "${__value.raw}"
regex: /^.*?traceI[d|D]=(\w+).*$/
urlLabel: ""
 */

export const LinkedField = (props) => {
    const {
        id,
        name,
        query,
        regex,
        url,
        urlLabel,
        internalLink,
        linkType,
        locked,
    } = props;

    const dispatch = useDispatch();
    const state = useSelector((store) => store.linkedFields);
    const onLinkedFieldChange = (prop, value) => {
        const arrayClone = JSON.parse(JSON.stringify(state));
        arrayClone.forEach((field) => {
            if (field.id === id) {
                field[prop] = value;
            }
        });

        return arrayClone;
    };

    const onNameChange = (e) => {
        const value = e.target.value;
        const newVal = onLinkedFieldChange("name", value);
        localStorage.setItem("linkedFields", JSON.stringify(newVal));
        dispatch(setLinkedFields(newVal));
    };
    const onUrlLabelChange = (e) => {
        const value = e.target.value;
        const newVal = onLinkedFieldChange("urlLabel", value);
        localStorage.setItem("linkedFields", JSON.stringify(newVal));
        dispatch(setLinkedFields(newVal));
    };
    const onUrlChange = (e) => {
        const value = e.target.value;
        const newVal = onLinkedFieldChange("url", value);
        localStorage.setItem("linkedFields", JSON.stringify(newVal));
        dispatch(setLinkedFields(newVal));
    };
    const onQueryChange = (e) => {
        const value = e.target.value;
        const newVal = onLinkedFieldChange("query", value);
        localStorage.setItem("linkedFields", JSON.stringify(newVal));
        dispatch(setLinkedFields(newVal));
    };
    const onRegexChange = (e) => {
        const value = e.target.value;
        const newVal = onLinkedFieldChange("regex", value);
        localStorage.setItem("linkedFields", JSON.stringify(newVal));
        dispatch(setLinkedFields(newVal));
    };
    const onInternalLinkChange = (e) => {
        const value = e.target.checked;
        const newVal = onLinkedFieldChange("internalLink", value);
        localStorage.setItem("linkedFields", JSON.stringify(newVal));
        dispatch(setLinkedFields(newVal));
    };
    const onDataSourceSelect = (e) => {
        const value = e.target.value;
        const newVal = onLinkedFieldChange("linkType", value);
        localStorage.setItem("linkedFields", JSON.stringify(newVal));
        dispatch(setLinkedFields(newVal));
    };

    return (
        <LinkFieldsGroup>
            <InputCol>
                <DataSourceField
                    value={name}
                    label={"Name"}
                    locked={locked}
                    onChange={onNameChange}
                />
                <DataSourceField
                    value={regex}
                    label={"Regex"}
                    locked={locked}
                    onChange={onRegexChange}
                />
                <DataSourceField
                    value={urlLabel}
                    label={"URL Label"}
                    locked={locked}
                    onChange={onUrlLabelChange}
                />
            </InputCol>
            <InputCol>
                <DataSourceField
                    value={query}
                    label={"Query"}
                    locked={locked}
                    onChange={onQueryChange}
                />

                <DataSourceField
                    value={url}
                    label={"URL"}
                    locked={locked}
                    onChange={onUrlChange}
                />
            </InputCol>
            <InputCol>
                <DataSourceSwitch
                    value={internalLink}
                    locked={locked}
                    onChange={onInternalLinkChange}
                />

                <DataSourceSelect
                    value={linkType}
                    locked={locked}
                    onChange={onDataSourceSelect}
                />
            </InputCol>
        </LinkFieldsGroup>
    );
};

export const LinkedFields = (props) => {
    const { linkedFields } = props;
    const [isEditing, setIsEditing] = useState(false);
    const onClickSubmit = (e) => {
        setIsEditing((isEditing) => (isEditing ? false : true));
    };
    const onClickEdit = (e) => {
        setIsEditing((editing) => (editing ? false : true));
    };
    const onClickCancel = (e) => {
        setIsEditing((editing) => (editing ? false : true));
    };
    if (linkedFields?.length > 0) {
        return (
            <>
                <SettingsTitle>
                    Linked Fields
                    <div className="edit-buttons">
                        <SettingButton
                            value={"Save"}
                            onClick={onClickSubmit}
                            editing={isEditing}
                            primary={true}
                        />
                        <SettingButton
                            value={"Cancel"}
                            onClick={onClickCancel}
                            editing={isEditing}
                            primary={false}
                        />
                        <EditOutlinedIcon
                            fontSize={"small"}
                            style={{
                                cursor: "pointer",
                                display: isEditing ? "none" : "flex",
                            }}
                            onClick={onClickEdit}
                        />
                    </div>
                </SettingsTitle>
                <InputCont>
                    {linkedFields?.map((val, key) => (
                        <LinkedField key={key} {...val} locked={!isEditing} />
                    ))}
                </InputCont>
            </>
        );
    }

    return null;
};

export const DatasourceSettings = (props) => {
    const { open, linkedFields, name, url, id, visType } = props;
    const dispatch = useDispatch();

    const state = useSelector(({ dataSources }) => dataSources);

    
    const onLinkedFieldChange = (prop, value) => {
        const arrayClone = JSON.parse(JSON.stringify(state));
        arrayClone.forEach((field) => {
            if (field.id === id) {
                field[prop] = value;
            }
        });

        return arrayClone;
    };

    const isOpen = useMemo(() => open, [open]);
    const [isEditing, setIsEditing] = useState(false);
    const onNameChange = (e) => {
        const value = e.target.value;
        const newVal = onLinkedFieldChange("name", value);
        localStorage.setItem("dataSources", JSON.stringify(newVal));
       dispatch(setDataSources(newVal));
    };

    const onUrlChange = (e) => {
        const value = e.target.value;
        const newVal = onLinkedFieldChange("url", value);
        localStorage.setItem("dataSources", JSON.stringify(newVal));
       dispatch(setDataSources(newVal));
    };

    const onVisTypeChange = (e) => {
        const value = e.target.value;
        const newVal = onLinkedFieldChange("visType", value)
        localStorage.setItem("dataSources", JSON.stringify(newVal))
        dispatch(setDataSources(newVal))
    }

    const onClickEdit = (e) => {
        setIsEditing((editing) => (editing ? false : true));
    };

    const onClickSubmit = (e) => {
        setIsEditing((editing) => (editing ? false : true));
    };

    const onClickCancel = (e) => {
        setIsEditing((editing) => (editing ? false : true));
    };

    if (isOpen) {
        return (
            <DatsourceSettingsCont>
                <SettingsTitle>
                    Datasource Settings{" "}
                    <div className="edit-buttons">
                        <SettingButton
                            value={"Save"}
                            onClick={onClickSubmit}
                            editing={isEditing}
                            primary={true}
                        />

                        <SettingButton
                            value={"Cancel"}
                            onClick={onClickCancel}
                            editing={isEditing}
                            primary={false}
                        />
                        <EditOutlinedIcon
                            fontSize={"small"}
                            style={{
                                cursor: "pointer",
                                display: isEditing ? "none" : "flex",
                            }}
                            onClick={onClickEdit}
                        />
                    </div>
                </SettingsTitle>
                <InputCont>
                    <InputCol>
                        <DataSourceField
                            locked={!isEditing}
                            value={name}
                            label={"Name"}
                            onChange={onNameChange}
                        />
                        <DataSourceField
                            locked={!isEditing}
                            value={url}
                            label={"URL"}
                            onChange={onUrlChange}
                        />
                                    <DataSourceField
                            locked={!isEditing}
                            value={visType}
                            label={"Preferred Visualization Type"}
                            onChange={onVisTypeChange}
                        />
                    </InputCol>
                </InputCont>
                <LinkedFields locked={!isEditing} linkedFields={linkedFields} />
            </DatsourceSettingsCont>
        );
    }

    return null;
};

export const Icon = ({ icon }) => {
    switch (icon) {
        case "metrics_icon":
            return (
                <img
                    height="40px"
                    className="logo"
                    src={metrics_icon}
                    alt="metrics"
                />
            );
        case "logs_icon":
            return (
                <img
                    height="40px"
                    className="logo"
                    src={logs_icon}
                    alt="logs"
                />
            );
        case "traces_icon":
            return (
                <img
                    height="40px"
                    className="logo"
                    src={traces_icon}
                    alt="traces"
                />
            );
        default:
            return (
                <img
                    height="40px"
                    className="logo"
                    src={logs_icon}
                    alt="logs"
                />
            );
    }
};

export function DataSourceItem({ type, name, url, icon, linkedFields, id, visType }) {
    const [open, setOpen] = useState(false);

    const onOpenSettings = (e) => {
        setOpen((evt) => (evt ? false : true));
    };
    return (
        <div className="ds-cont">
            <div className="ds-item">
                <Icon icon={icon} />
                <div className="ds-text">
                    <div className="ds-type">{type}</div>
                    <small>
                        {" "}
                        {name} | {url}
                    </small>
                </div>
                <SettingsOutlinedIcon
                    onClick={onOpenSettings}
                    className="setting-icon"
                    fontSize="small"
                />
            </div>
            <div className="ds-settings">
                <DatasourceSettings
                    id={id}
                    linkedFields={linkedFields}
                    name={name}
                    url={url}
                    open={open}
                    visType={visType}
                />
            </div>
        </div>
    );
}

export function DataSourcesList() {
    // get here each linked fields
    
    // const dispatch = useDispatch()

    // const dataSources = JSON.parse(localStorage.getItem("dataSources"));

    // if(dataSources?.length) {
    // dispatch(setDataSources(dataSources))    
    // }

    

    // const linkedFields = JSON.parse(localStorage.getItem("linkedFields"));

    // if(linkedFields?.length) {
    //     dispatch(setLinkedFields(linkedFields))
    // }


    const ds = useSelector(({ dataSources }) => dataSources);
    const lf = useSelector(({ linkedFields }) => linkedFields);

    const linked_fields = useLinkedFields(lf);


    if (ds?.length > 0) {
        return (
            <div>
                {ds.map((item, idx) => (
                    <DataSourceItem
                        key={idx}
                        {...item}
                        linkedFields={linked_fields[item.type]}
                    />
                ))}
            </div>
        );
    }
    return (
        <div>
            <h1>No Data Sources Found.</h1>
        </div>
    );
}

export function DataSourcesHeader() {
    return (
        <div className="ds-header">
            <img
                src={Logo}
                alt={"qryyn View"}
                height={"24px"}
                className={"logo"}
            />{" "}
            <h1>Data Sources</h1>
        </div>
    );
}

export default function DataSources() {


    
    const themeState = useSelector((store) => store.theme) || "light";

    const theme = useMemo(() => {
        return themes[themeState];
    }, [themeState]);
    return (
        <ThemeProvider theme={theme}>
            <PageContainer>
                <div className="cont">
                    <DataSourcesHeader />
                    <DataSourcesList />
                </div>
            </PageContainer>
        </ThemeProvider>
    );
}
