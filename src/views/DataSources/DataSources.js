import { ThemeProvider } from "@emotion/react";
import { useMemo, useState } from "react";
import { useSelector } from "react-redux";
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
        name,
        query,
        regex,
        url,
        urlLabel,
        internalLink,
        linkType,
        locked,
    } = props;

    const onNameChange = (e) => {};
    const onUrlLabelChange = (e) => {};
    const onUrlChange = (e) => {};
    const onQueryChange = (e) => {};
    const onRegexChange = (e) => {};
    const onInternalLinkChange = (e) => {};
    const onDataSourceSelect = (e) => {};

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
    const { open, linkedFields, name, url } = props;

    const isOpen = useMemo(() => open, [open]);
    const [isEditing, setIsEditing] = useState(false);
    const onNameChange = (e) => {
        console.log(e);
    };

    const onUrlChange = (e) => {
        console.log(e);
    };

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

export function DataSourceItem({ type, name, url, icon, linkedFields }) {
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
                    linkedFields={linkedFields}
                    name={name}
                    url={url}
                    open={open}
                />
            </div>
        </div>
    );
}

export function DataSourcesList() {
    // get here each linked fields

    const ds = useSelector(({ dataSources }) => dataSources);
    const lf = useSelector(({ labelLinks }) => labelLinks);

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
    const themeState = useSelector(({ theme }) => theme);

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
