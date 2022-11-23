import { useEffect, useMemo, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import setDataSources from "../store/setDataSources";
import { InputCol, InputCont } from "../styles";
import { QrynSwitch, Select, Field } from "../ui";
import { TextAreaField } from "../ui/TextArea";
import { SectionHeader } from "./SectionHeader";

export function AuthFields(props) {
    const { auth, id } = props;
    const dispatch = useDispatch();

    const dataSources = useSelector((store) => store.dataSources);

    const [activeFields, setActiveFields] = useState([]);
    const [isEditing, setIsEditing] = useState(false);
    const fields = useMemo(() => {
        return Object.entries(auth)
            ?.map(([name, field]) => ({
                name,
                ...field,
            }))
            .filter((f) => f.name !== "fields");
    }, [auth]);

    const certFields = useMemo(() => {
        return Object.entries(auth)
            ?.map(([name, field]) => ({
                name,
                ...field,
            }))
            .find((f) => f.name === "fields");
    }, [auth]);

    const onValueChange = (value, name) => {
        const newAuth = JSON.parse(JSON.stringify(auth));
        newAuth[name].value = value;

        const dsCP = JSON.parse(JSON.stringify(dataSources));
        const newDataSources = dsCP.map((dataSource) => {
            if (dataSource.id === id) {
                return { ...dataSource, auth: { ...newAuth } };
            }
            return dataSource;
        });

        localStorage.setItem("dataSources", JSON.stringify(newDataSources));

        dispatch(setDataSources(newDataSources));

        return newDataSources;
    };

    useEffect(() => {
        const certFields = fields
            .filter((f) => f.form_type === "switch" && !!f?.value)
            ?.filter((f) => !!f.withFields)
            ?.map((m) => m.name);
        setActiveFields(certFields);
    }, [fields, setActiveFields]);

    const onSelectChange = (e, name) => {
        setIsEditing((_) => true);
        const value = e.target.value;
        onValueChange(value, name);
        setTimeout(() => {
            setIsEditing((_) => false);
        }, 600);
    };

    const onSwitchChange = (e, name) => {
        setIsEditing((_) => true);
        const value = e.target.checked;

        onValueChange(value, name);
        setTimeout(() => {
            setIsEditing((_) => false);
        }, 600);
    };

    const onCertValueChange = (e, name, cert) => {
        setIsEditing((_) => true);
        const value = e.target.value;
        const prevAuth = JSON.parse(JSON.stringify(auth));

        const newAuth = {
            ...prevAuth,
            fields: {
                ...prevAuth.fields,
                [cert]: prevAuth?.fields[cert]?.map((field) => {
                    if (field.name === name) {
                        field.value = value;
                        return { ...field };
                    }
                    return field;
                }),
            },
        };

        const prevDataSources = JSON.parse(JSON.stringify([...dataSources]));
        const newDataSources = prevDataSources?.map((ds) => {
            if (ds.id === id) {
                ds.auth = newAuth;
                return ds;
            }
            return ds;
        });

        localStorage.setItem("dataSources", JSON.stringify(newDataSources));
        dispatch(setDataSources(newDataSources));

        setTimeout(() => {
            setIsEditing((_) => false);
        }, 600);
    };

    return (
        <>
            <SectionHeader
                title={"HTTP Auth Fields"}
                isEditing={isEditing}
                isEdit={false}
                isAdd={false}
            />
            <InputCont>
                {fields &&
                    fields.map((field, key) => {
                        if (field.form_type === "select") {
                            return (
                                <Select
                                    key={key}
                                    value={field.value}
                                    name={field.name}
                                    onChange={(e) =>
                                        onSelectChange(e, field.name)
                                    }
                                    locked={false}
                                    opts={field.options}
                                    label={field.label}
                                />
                            );
                        }

                        if (field.form_type === "switch") {
                            return (
                                <QrynSwitch
                                    label={field.label}
                                    value={field.value}
                                    onChange={(e) =>
                                        onSwitchChange(e, field.name)
                                    }
                                    key={key}
                                />
                            );
                        }

                        return null;
                    })}
                <InputCol>
                    {activeFields &&
                        activeFields.map((val, key) => {
                            return (
                                <InputCol key={key}>
                                    {certFields[val] &&
                                        certFields[val]?.map((cert, y) => {
                                            if (
                                                cert.form_type === "input" ||
                                                cert.form_type === "password"
                                            ) {
                                                return (
                                                    <Field
                                                        key={y}
                                                        onChange={(e) =>
                                                            onCertValueChange(
                                                                e,
                                                                cert.name,
                                                                val
                                                            )
                                                        }
                                                        type={cert.form_type}
                                                        value={cert.value}
                                                        label={cert.label}
                                                        placeholder={
                                                            cert.placeholder
                                                        }
                                                    />
                                                );
                                            }

                                            if (cert.form_type === "textarea") {
                                                return (
                                                    <TextAreaField
                                                        key={y}
                                                        onChange={(e) =>
                                                            onCertValueChange(
                                                                e,
                                                                cert.name,
                                                                val
                                                            )
                                                        }
                                                        value={cert.value}
                                                        label={cert.label}
                                                        placeholder={
                                                            cert.placeholder
                                                        }
                                                    />
                                                );
                                            }
                                            return null;
                                        })}
                                </InputCol>
                            );
                        })}
                </InputCol>
            </InputCont>
        </>
    );
}
