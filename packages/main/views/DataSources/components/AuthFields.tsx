import { useEffect, useMemo, useState } from "react";
import { InputCol, InputCont } from "../styles";
import { QrynSwitch, Select, Field } from "../ui";
import { TextAreaField } from "../ui/TextArea";
import { SectionHeader } from "./SectionHeader";
import DOMPurify from "isomorphic-dompurify";

export type AuthFieldsProps = {
    auth?: any 
    id?: string 
    dataSources?: any 
    onDsChange?: (prev:any) => void
    fieldErrors?: any
}

export function AuthFields(props: AuthFieldsProps) {
   // console.log(props)
    const { auth, id, dataSources, onDsChange } = props;
    //const dispatch: any = useDispatch();

    //const dataSources = useSelector((store: any) => store.dataSources);

    const [activeFields, setActiveFields] = useState<any>([]);
    const [isEditing, setIsEditing] = useState(false);
    const fields = useMemo(() => {
        return Object.entries(auth)
            ?.map(([name, field]: [name: any, field: any]) => ({
                name,
                ...field,
            }))
            .filter((f) => f.name !== "fields");
    }, [auth]);

    const certFields = useMemo(() => {
        return Object.entries(auth)
            ?.map(([name, field]: [name: any, field: any]) => ({
                name,
                ...field,
            }))
            .find((f) => f.name === "fields");
    }, [auth]);

    const onValueChange = (value: any, name: any) => {
        const newAuth = JSON.parse(JSON.stringify(auth));
        newAuth[name].value = value;

        const dsCP = JSON.parse(JSON.stringify(dataSources));
        const newDataSources = dsCP.map((dataSource: any) => {
            if (dataSource.id === id) {
                return { ...dataSource, auth: { ...newAuth } };
            }
            return dataSource;
        });

        onDsChange(()=> newDataSources)
        //localStorage.setItem("dataSources", JSON.stringify(newDataSources));

        //dispatch(setDataSources(newDataSources));

        return newDataSources;
    };

    useEffect(() => {
        const certFields = fields
            .filter((f) => f.form_type === "switch" && !!f?.value)
            ?.filter((f) => !!f.withFields)
            ?.map((m) => m.name);
        setActiveFields(certFields);
    }, [fields, setActiveFields]);

    const onSelectChange = (e: any, name: any) => {
        setIsEditing(() => true);
        const value = e.target.value;
        onValueChange(value, name);
        setTimeout(() => {
            setIsEditing(() => false);
        }, 800);
    };

    const onSwitchChange = (e: any, name: any) => {
        setIsEditing(() => true);
        const value = e.target.checked;

        onValueChange(value, name);
        setTimeout(() => {
            setIsEditing(() => false);
        }, 800);
    };

    const onCertValueChange = (e: any, name: any, cert: any) => {
        setIsEditing(() => true);
        const value = e.target.value;
        const prevAuth = JSON.parse(JSON.stringify(auth));

        const newAuth = {
            ...prevAuth,
            fields: {
                ...prevAuth.fields,
                [cert]: prevAuth?.fields[cert]?.map((field: any) => {
                    if (field.name === name) {
                        field.value = value;
                        return { ...field };
                    }
                    return field;
                }),
            },
        };

        const prevDataSources = JSON.parse(JSON.stringify([...dataSources]));
        const newDataSources = prevDataSources?.map((ds: any) => {
            if (ds.id === id) {
                ds.auth = newAuth;
                return ds;
            }
            return ds;
        });

        //localStorage.setItem("dataSources", JSON.stringify(newDataSources));
        //dispatch(setDataSources(newDataSources));
        onDsChange(()=> newDataSources)
        setTimeout(() => {
            setIsEditing(() => false);
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
                                    value={DOMPurify.sanitize(field.value)}
                                    name={DOMPurify.sanitize(field.name)}
                                    onChange={(e: any) =>
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
                                    onChange={(e: any) =>
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
                        activeFields.map((val: any, key: any) => {
                            return (
                                <InputCol key={key}>
                                    {certFields[val] &&
                                        certFields[val]?.map(
                                            (cert: any, y: any) => {
                                                if (
                                                    cert.form_type ===
                                                        "input" ||
                                                    cert.form_type ===
                                                        "password"
                                                ) {
                                                    return (
                                                        <Field
                                                            key={y}
                                                            onChange={(
                                                                e: any
                                                            ) =>
                                                                onCertValueChange(
                                                                    e,
                                                                    cert.name,
                                                                    val
                                                                )
                                                            }
                                                            type={
                                                                cert.form_type
                                                            }
                                                            value={DOMPurify.sanitize(
                                                                cert.value
                                                            )}
                                                            label={cert.label}
                                                            placeholder={
                                                                cert.placeholder
                                                            }
                                                        />
                                                    );
                                                }

                                                if (
                                                    cert.form_type ===
                                                    "textarea"
                                                ) {
                                                    return (
                                                        <TextAreaField
                                                            key={y}
                                                            onChange={(
                                                                e: any
                                                            ) =>
                                                                onCertValueChange(
                                                                    e,
                                                                    cert.name,
                                                                    val
                                                                )
                                                            }
                                                            value={DOMPurify.sanitize(
                                                                cert.value
                                                            )}
                                                            label={cert.label}
                                                            placeholder={
                                                                cert.placeholder
                                                            }
                                                        />
                                                    );
                                                }
                                                return null;
                                            }
                                        )}
                                </InputCol>
                            );
                        })}
                </InputCol>
            </InputCont>
        </>
    );
}
