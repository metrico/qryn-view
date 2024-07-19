import { useEffect, useState } from "react";

import DOMPurify from "isomorphic-dompurify";
import {
    DataSourceHeaders,
    LinkedFields,
    SectionHeader,
    AuthFields,
} from "../components";

import { DataSourceSettingsCont, InputCont, InputCol } from "../styles";
import { Field } from "../ui";
import { useStoreSettings } from "../hooks/useStoreSettings";

export const Settings = (props: any) => {
    const [settingsData, setSettingsData] = useState(props);
    const { settings, storeSettings } = useStoreSettings();

    const [fieldErrors, setFieldErrors] = useState({
        url: false,
        protocol: false,
    });
    const onFieldChange = (prop: any, value: any) => {
        let val = value;
        const arrayClone = JSON.parse(JSON.stringify(settings));
        arrayClone.forEach((field: any) => {
            if (field.id === settingsData.id) {
                field[prop] = val;
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
        setIsEditing(() => true);
        const value = e.target.value;

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

                storeSettings(newVal);

                setTimeout(() => {
                    setIsEditing(() => false);
                }, 800);
            }
        }

        const newVal = onFieldChange(name, value);
        storeSettings(newVal);
        setTimeout(() => {
            setIsEditing(() => false);
        }, 800);
    };

    useEffect(() => {
        setSettingsData((prev) => ({
            ...prev,
            ...settings?.find((f) => f.id === prev.id),
        }));
    }, [settings]);

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
                        value={DOMPurify.sanitize(settingsData.name)}
                        label={"Name"}
                        onChange={(e: any) => onChange(e, "name")}
                    />

                    <Field
                        value={DOMPurify.sanitize(settingsData.url)}
                        label={"URL"}
                        error={fieldErrors.url || fieldErrors.protocol}
                        onChange={(e: any) => onChange(e, "url")}
                    />
                </InputCol>
            </InputCont>

            <AuthFields
                id={settingsData.id}
                auth={settingsData.auth}
                dataSources={settings}
                onDsChange={storeSettings}
            />

            <DataSourceHeaders
                id={settingsData.id}
                cors={settingsData.cors}
                headers={settingsData.headers}
                dataSources={settings}
                onDsChange={storeSettings}
            />

            <LinkedFields
                id={settingsData.id}
                name={settingsData.name}
                onDsChange={storeSettings}
                dataSources={settings}
                linkedFields={settingsData.linkedFields}
            />
        </DataSourceSettingsCont>
    );
};
