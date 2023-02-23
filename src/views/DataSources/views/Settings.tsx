import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
    DataSourceHeaders,
    LinkedFields,
    SectionHeader,
    AuthFields,
} from "../components";
import setDataSources from "../store/setDataSources";

import { DataSourceSettingsCont, InputCont, InputCol } from "../styles";
import { Field } from "../ui";

export const Settings = (props: any) => {
    const { headers, id, linkedFields, name, url }: any = props;

    const dispatch = useDispatch();

    const state = useSelector(({ dataSources }: any) => dataSources);
    const [fieldErrors, setFieldErrors] = useState({
        url: false,
        protocol: false,
    });
    const onFieldChange = (prop: any, value: any) => {
        const arrayClone = JSON.parse(JSON.stringify(state));
        arrayClone.forEach((field: any) => {
            if (field.id === id) {
                field[prop] = value;
            }
        });

        return arrayClone;
    };

    const [isEditing, setIsEditing] = useState(false);

    const checkURLProtocol = (value: URL | any) => {
        try {
            const current_protocol = window.location.protocol;
            const value_protocol = new URL(value)["protocol"];
            return { value: current_protocol === value_protocol, error: "" };
        } catch (e) {
            return { value: false, error: "url" };
        }
    };

    const onChange = (e: any, name: any) => {
        setIsEditing((_) => true);
        const value = e.target.value;
        // check here if name === url
        if (name === "url") {
            const protocol_match = checkURLProtocol(value);

            if (protocol_match?.error === "url") {
                setFieldErrors((prev) => ({ ...prev, url: true }));
            }

            if (!protocol_match?.value && protocol_match?.error === "") {
                setFieldErrors((prev) => ({ ...prev, protocol: true }));
            }

            if (protocol_match?.error === "" && protocol_match?.value) {
                setFieldErrors((prev) => ({
                    ...prev,
                    protocol: false,
                    url: false,
                }));
                const newVal = onFieldChange(name, value);
                localStorage.setItem("dataSources", JSON.stringify(newVal));
                dispatch(setDataSources(newVal));
                setTimeout(() => {
                    setIsEditing((_) => false);
                }, 800);
            }
        }

        const newVal = onFieldChange(name, value);
        localStorage.setItem("dataSources", JSON.stringify(newVal));
        dispatch(setDataSources(newVal));
        setTimeout(() => {
            setIsEditing((_) => false);
        }, 800);
    };

    return (
        <DataSourceSettingsCont>
            <SectionHeader
                isEditing={isEditing}
                isEdit={true}
                isAdd={false}
                title={"DataSource Settings"}
                fieldErrors={fieldErrors}
            />

            <InputCont>
                <InputCol>
                    <Field
                        value={name}
                        label={"Name"}
                        onChange={(e: any) => onChange(e, "name")}
                    />

                    <Field
                        value={url}
                        label={"URL"}
                        error={fieldErrors.url || fieldErrors.protocol}
                        onChange={(e: any) => onChange(e, "url")}
                    />
                </InputCol>
            </InputCont>

            <AuthFields {...props} />

            <DataSourceHeaders headers={headers} id={id} />

            <LinkedFields {...props} linkedFields={linkedFields} />
        </DataSourceSettingsCont>
    );
};
