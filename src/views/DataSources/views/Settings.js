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

export const Settings = (props) => {
    const { headers, id, linkedFields, name, url } = props;

    const dispatch = useDispatch();

    const state = useSelector(({ dataSources }) => dataSources);

    const onFieldChange = (prop, value) => {
        const arrayClone = JSON.parse(JSON.stringify(state));
        arrayClone.forEach((field) => {
            if (field.id === id) {
                field[prop] = value;
            }
        });

        return arrayClone;
    };

    const [isEditing, setIsEditing] = useState(false);

    const onChange = (e, name) => {
        setIsEditing((prev) => true);
        const value = e.target.value;

        const newVal = onFieldChange(name, value);
        localStorage.setItem("dataSources", JSON.stringify(newVal));
        dispatch(setDataSources(newVal));
        setTimeout(() => {
            setIsEditing((prev) => false);
        }, 800);
    };

    return (
        <DataSourceSettingsCont>
            <SectionHeader
                isEditing={isEditing}
                isEdit={true}
                isAdd={false}
                title={"DataSource Settings"}
            />

            <InputCont>
                <InputCol>
                    <Field
                        value={name}
                        label={"Name"}
                        onChange={(e) => onChange(e, "name")}
                    />

                    <Field
                        value={url}
                        label={"URL"}
                        onChange={(e) => onChange(e, "url")}
                    />

                    {/* <Select
                        label={"Preferred Visualization Type"}
                        opts={visTypes}
                        value={visType}
                        onChange={(e) => onChange(e, "visType")}
                    /> */}
                </InputCol>
            </InputCont>

            <AuthFields {...props} />

            <DataSourceHeaders headers={headers} id={id} />

            <LinkedFields {...props} linkedFields={linkedFields} />
        </DataSourceSettingsCont>
    );
};
