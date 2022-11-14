import { useDispatch, useSelector } from "react-redux";
import { LinkFieldsGroup, InputCol } from "../styles";
import { Field, QrynSwitch, Select } from "../ui";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
import setDataSources from "../store/setDataSources";

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
        dataSourceId,
    } = props;

    const dispatch = useDispatch();

    const dataSources = useSelector((store) => store.dataSources);

    const onLinkedFieldChange = (prop, value) => {
        const prevDataSources = JSON.parse(JSON.stringify(dataSources));
        const prevDs = prevDataSources.find((f) => f.id === dataSourceId);

        const prevLinked = prevDs["linkedFields"];

        const newLinked = prevLinked.map((m) => {
            if (m.id === id) {
                return { ...m, [prop]: value };
            }
            return m;
        });

        return prevDataSources.map((m) => {
            if (m.id === dataSourceId) {
                return { ...m, linkedFields: newLinked };
            }
            return m;
        });
    };

    const onLinkedFieldRemove = (e) => {
        const prevDataSources = JSON.parse(JSON.stringify(dataSources));
        const prevDs = prevDataSources.find((f) => f.id === dataSourceId);
        const prevLinked = prevDs["linkedFields"];
        const newLinked = prevLinked.filter((f) => f.id !== id);

        const newDataSources = prevDataSources.map((m) => {
            if (m.id === dataSourceId) {
                return { ...m, linkedFields: [...newLinked] };
            }
            return m;
        });

        localStorage.setItem("dataSources", JSON.stringify(newDataSources));
        dispatch(setDataSources(newDataSources));
    };

    const onChange = (e, name) => {
        const value = e.target.value;
        // setNewDataSources

        const newVal = onLinkedFieldChange(name, value);

        localStorage.setItem("dataSources", JSON.stringify(newVal));

        dispatch(setDataSources(newVal));
    };

    const onSwitchChange = (e, name) => {
        const value = e.target.checked;

        const newVal = onLinkedFieldChange(name, value);

        localStorage.setItem("dataSources", JSON.stringify(newVal));
        dispatch(setDataSources(newVal));
    };

    return (
        <LinkFieldsGroup>
            <InputCol>
                <Field
                    value={name}
                    label={"Name"}
                    onChange={(e) => onChange(e, "name")}
                />

                <Field
                    value={regex}
                    label={"Regex"}
                    onChange={(e) => onChange(e, "regex")}
                />

                <Field
                    value={urlLabel}
                    label={"URL Label"}
                    onChange={(e) => onChange(e, "urlLabel")}
                />

                <DeleteForeverIcon
                    onClick={onLinkedFieldRemove}
                    style={{
                        cursor: "pointer",
                        display: locked ? "none" : "inline-block",
                    }}
                />

            </InputCol>
            
            <InputCol>

                <Field
                    value={query}
                    label={"Query"}
                    onChange={(e) => onChange(e, "query")}
                />

                <Field
                    value={url}
                    label={"URL"}
                    onChange={(e) => onChange(e, "url")}
                />

            </InputCol>
            <InputCol>
                <QrynSwitch
                    value={internalLink}
                    label={"Internal Link"}
                    onChange={(e) => onSwitchChange(e, "internalLink")}
                />

                <Select
                    label={""}
                    value={linkType}
                    opts={dataSources}
                    selectType={'linkedField'}
                    onChange={(e) => onChange(e, "linkType")}
                />

            </InputCol>
        </LinkFieldsGroup>
    );
};
