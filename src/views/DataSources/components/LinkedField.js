import { useDispatch, useSelector } from "react-redux";
import { LinkFieldsGroup, InputCol } from "../styles";
import { Field, QrynSwitch, Select } from "../ui";
import DeleteOutlineOutlinedIcon from "@mui/icons-material/DeleteOutlineOutlined";
import setDataSources from "../store/setDataSources";
import { useMemo } from "react";

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
        fieldEditing
    } = props;

    const dispatch = useDispatch();

    const dataSources = useSelector((store) => store.dataSources);

    const dataSourcesOpts = useMemo(() => {
        return dataSources.map((m) => ({
            name: m.name,
            value: m.id,
        }));
    }, [dataSources]);

    const onLinkedFieldChange = (prop, value) => {
        fieldEditing()

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
        fieldEditing()
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
        fieldEditing()
        const value = e.target.value;
        // setNewDataSources

        const newVal = onLinkedFieldChange(name, value);

        localStorage.setItem("dataSources", JSON.stringify(newVal));

        dispatch(setDataSources(newVal));
    };

    const onSwitchChange = (e, name) => {
        fieldEditing()
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

                <DeleteOutlineOutlinedIcon
                    onClick={onLinkedFieldRemove}
                    fontSize={"small"}
                    style={{
                        cursor: "pointer",
                        display: locked ? "none" : "inline-block",
                    }}
                />
            </InputCol>

            {/* <InputCol>
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
            </InputCol> */}
            <InputCol className="internal">
                <QrynSwitch
                    value={internalLink}
                    label={"Internal Link"}
                    onChange={(e) => onSwitchChange(e, "internalLink")}
                />

                <Select
                    label={""}
                    value={linkType}
                    opts={dataSourcesOpts}
                    selectType={"linkedField"}
                    onChange={(e) => onChange(e, "linkID")}
                />
            </InputCol>
        </LinkFieldsGroup>
    );
};
