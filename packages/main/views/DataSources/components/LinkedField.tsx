import { LinkFieldsGroup, InputCol } from "../styles";
import { Field, QrynSwitch, Select } from "../ui";
import DeleteOutlineOutlinedIcon from "@mui/icons-material/DeleteOutlineOutlined";
import { useMemo } from "react";
import DOMPurify from 'isomorphic-dompurify'
export const LinkedField = (props:any) => {
    const {
        id,
        name,
        regex,
        urlLabel,
        internalLink,
        linkType,
        locked,
        dataSourceId,
        fieldEditing,
        dataSources,
        dsChange

    } = props;

    // const dispatch: any = useDispatch();

    // const dataSources = useSelector((store:any) => store.dataSources);

    const dataSourcesOpts = useMemo(() => {
        return dataSources.map((m:any) => ({
            name: m.name,
            value: m.id,
        }));
    }, [dataSources]);

    const onLinkedFieldChange = (prop:any, value:any) => {
        fieldEditing()

        const prevDataSources = JSON.parse(JSON.stringify(dataSources));
        const prevDs = prevDataSources.find((f:any) => f.id === dataSourceId);

        const prevLinked = prevDs["linkedFields"];

        const newLinked = prevLinked.map((m:any) => {
            if (m.id === id) {
                return { ...m, [prop]: value };
            }
            return m;
        });

        return prevDataSources.map((m:any) => {
            if (m.id === dataSourceId) {
                return { ...m, linkedFields: newLinked };
            }
            return m;
        });
    };

    const onLinkedFieldRemove = () => {
        fieldEditing()
        const prevDataSources = JSON.parse(JSON.stringify(dataSources));
        const prevDs = prevDataSources.find((f:any) => f.id === dataSourceId);
        const prevLinked = prevDs["linkedFields"];
        const newLinked = prevLinked.filter((f:any) => f.id !== id);

        const newDataSources = prevDataSources.map((m:any) => {
            if (m.id === dataSourceId) {
                return { ...m, linkedFields: [...newLinked] };
            }
            return m;
        });

       // localStorage.setItem("dataSources", JSON.stringify(newDataSources));
       // dispatch(setDataSources(newDataSources));
       dsChange(()=> newDataSources)
    };

    const onChange = (e:any, name:any) => {
        fieldEditing()
        const value = e.target.value;
        // setNewDataSources

        const newVal = onLinkedFieldChange(name, value);

        dsChange(()=> newVal)

    //    localStorage.setItem("dataSources", JSON.stringify(newVal));

    //    dispatch(setDataSources(newVal));
    };

    const onSwitchChange = (e:any, name:any) => {
        fieldEditing()
        const value = Boolean(e.target.checked);

        const newVal = onLinkedFieldChange(name, value);
        dsChange(()=> newVal)

      //  localStorage.setItem("dataSources", JSON.stringify(newVal));
      //  dispatch(setDataSources(newVal));
    };

    return (
        <LinkFieldsGroup>
            <InputCol>
                <Field
                    value={DOMPurify.sanitize(name)}
                    label={"Name"}
                    onChange={(e:any) => onChange(e, "name")}
                />

                <Field
                    value={DOMPurify.sanitize(regex)}
                    label={"Regex"}
                    onChange={(e:any) => onChange(e, "regex")}
                />

                <Field
                    value={DOMPurify.sanitize(urlLabel)}
                    label={"URL Label"}
                    onChange={(e:any) => onChange(e, "urlLabel")}
                />

                <DeleteOutlineOutlinedIcon
                    onClick={onLinkedFieldRemove}
                    fontSize={"small"}
                    style={{
                        marginLeft:'10px',
                        cursor: "pointer",
                        display: locked ? "none" : "inline-block",
                    }}
                />
            </InputCol>

            <InputCol className="internal">
                <QrynSwitch
                    value={internalLink}
                    label={"Internal Link"}
                    onChange={(e:any) => onSwitchChange(e, "internalLink")}
                />

                <Select
                    label={""}
                    value={DOMPurify.sanitize(linkType)}
                    opts={dataSourcesOpts}
                    selectType={"linkedField"}
                    onChange={(e:any) => onChange(e, "linkID")}
                />
            </InputCol>
        </LinkFieldsGroup>
    );
};
