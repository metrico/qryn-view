import { ThemeProvider } from "@emotion/react";
import { useMemo, useState } from "react";
import { useSelector } from "react-redux";
import { themes } from "../../theme/themes";
import Logo from "./assets/qryn-logo.png";
import metrics_icon from "./assets/metrics_icon.png";
import logs_icon from "./assets/logs_icon.png";
import traces_icon from "./assets/traces_icon.png";
import SettingsOutlinedIcon from "@mui/icons-material/SettingsOutlined";
import {
    PageContainer,
    Label,
    Input,
    InputGroup,
    InputCol,
    LinkFieldsGroup,
    SettingsTitle,
    DatsourceSettingsCont,
} from "./styles";
import { useLinkedFields } from "./hooks/useLinkedField";

const DataSourceField = (props) => {
    const { value, label, onChange } = props;
    return (
        <InputGroup>
            <Label>{label}</Label>
            <Input className="ds-input" onChange={onChange} value={value} />
        </InputGroup>
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
    const { name, query, regex, urlLabel } = props;

    const onNameChange = (e) => {};
    const onUrlLabelChange = (e) => {};
    const onQueryChange = (e) => {};
    const onRegexChange = (e) => {};

    return (
        <LinkFieldsGroup>
            <InputCol>
                <DataSourceField
                    value={name}
                    label={"Name"}
                    onChange={onNameChange}
                />
                <DataSourceField
                    value={urlLabel}
                    label={"URL Label"}
                    onChange={onUrlLabelChange}
                />
            </InputCol>
            <InputCol>
                <DataSourceField
                    value={query}
                    label={"Query"}
                    onChange={onQueryChange}
                />
                <DataSourceField
                    value={regex}
                    label={"Regex"}
                    onChange={onRegexChange}
                />
            </InputCol>
        </LinkFieldsGroup>
    );
};

export const LinkedFields = (props) => {
    const { linkedFields } = props;
    if (linkedFields?.length > 0) {
        return (
            <div className="linked-fields-cont">
                <SettingsTitle>Linked Fields</SettingsTitle>
                {linkedFields?.map((val, key) => (
                    <LinkedField key={key} {...val} />
                ))}
            </div>
        );
    }

    return null;
};

export const DatasourceSettings = (props) => {
    const { open, linkedFields, name, url } = props;

    const isOpen = useMemo(() => open, [open]);

    const onNameChange = (e) => {
        console.log(e);
    };

    const onUrlChange = (e) => {
        console.log(e);
    };

    if (isOpen) {
        return (
            <DatsourceSettingsCont>
                <SettingsTitle>Datasource Settings</SettingsTitle>
                <InputCol>
                    <DataSourceField
                        value={name}
                        label={"Name"}
                        onChange={onNameChange}
                    />
                    <DataSourceField
                        value={url}
                        label={"URL"}
                        onChange={onUrlChange}
                    />
                </InputCol>
                <LinkedFields linkedFields={linkedFields} />
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
