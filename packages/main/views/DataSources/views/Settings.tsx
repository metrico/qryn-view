import { useCallback, useEffect, useState } from "react";
import {  useSelector } from "react-redux";
import DOMPurify from "isomorphic-dompurify";
import {
    DataSourceHeaders,
    LinkedFields,
    SectionHeader,
    AuthFields,
} from "../components";
//import setDataSources from "../store/setDataSources";

import { DataSourceSettingsCont, InputCont, InputCol } from "../styles";
import { Field } from "../ui";



export const Settings = (props: any) => {
    const state = useSelector(({ dataSources }: any) => dataSources);
    const { saveSettings } = props
    // sets the initial and editable data
    const [settingsData, setSettingsData] = useState(props)
    const [initialDs, setInitialDs] = useState(state)
    // we will pass all props into the processor and from there get the initial values 

    //console.log(props) // this will be the initial fields before saving 
    // the ones triggered on the cancel button
    

    // const { headers, id, linkedFields, name, url, cors }: any = props;
    

  
    const [fieldErrors, setFieldErrors] = useState({
        url: false,
        protocol: false,
    });
    const onFieldChange = (prop: any, value: any) => {
        console.log(prop, value)
        let val = value;
        const arrayClone = JSON.parse(JSON.stringify(initialDs));
        
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
        console.log(value,name)
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
                setInitialDs( newVal)
                //setSettingsData( (prev) => ({...prev, ...newVal}))

                // localStorage.setItem("dataSources", JSON.stringify(newVal));
                // dispatch(setDataSources(newVal));
                saveSettings(newVal)
                setTimeout(() => {
                    setIsEditing(() => false);
                }, 800);
            }
        }

        const newVal = onFieldChange(name, value);
        setInitialDs(newVal)
        //setSettingsData( () => newVal)
       // localStorage.setItem("dataSources", JSON.stringify(newVal));
       // dispatch(setDataSources(newVal));
       saveSettings(newVal)
        setTimeout(() => {
            setIsEditing(() => false);
        }, 800);
    };

    const onSaveDsSettings = useCallback(()=>{
        saveSettings(initialDs)
      

    },[initialDs])

    useEffect(()=>{
        setSettingsData((prev) => ({ ...prev, ...initialDs?.find(f => f.id === prev.id)}))

    },[initialDs])

    return (
        <DataSourceSettingsCont>
            <SectionHeader
                isEditing={isEditing}
                isEdit={true}
                isAdd={false}
                title={"DataSource Settings"}
                fieldErrors={fieldErrors}
                saveSettings={onSaveDsSettings}
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
                dataSources={initialDs}
                onDsChange={setInitialDs}

             //{...props} 
             />

            <DataSourceHeaders
             id={settingsData.id}
             cors={settingsData.cors} 
             headers={settingsData.headers} 
             dataSources={initialDs}
             onDsChange={setInitialDs}
              />

            <LinkedFields
            // {...props} 
            id={settingsData.id}
            name={settingsData.name}
            onDsChange={setInitialDs}
            dataSources={initialDs}
            linkedFields={settingsData.linkedFields} />
            
        </DataSourceSettingsCont>
    );
};
