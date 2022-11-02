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
import { Field, Select } from "../ui";

export const Settings = (props) => {
    const { headers, id, linkedFields, name, url, visType } = props;

    const dispatch = useDispatch();

    const state = useSelector(({ dataSources }) => dataSources);
    const visTypes = useSelector(({ visTypes }) => visTypes);

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
        const value = e.target.value;
        const newVal = onFieldChange(name, value);
        localStorage.setItem("dataSources", JSON.stringify(newVal));
        dispatch(setDataSources(newVal));
    };

    const onClickEdit = (e) => {
        setIsEditing((editing) => (editing ? false : true));
    };

    const onClickSubmit = (e) => {
        setIsEditing((editing) => (editing ? false : true));
    };

    const onClickCancel = (e) => {
        setIsEditing((editing) => (editing ? false : true));
    };

    return (
        <DataSourceSettingsCont>
            <SectionHeader
                onClickSubmit={onClickSubmit}
                onClickCancel={onClickCancel}
                onClickEdit={onClickEdit}
                isEditing={isEditing}
                isEdit={true}
                isAdd={false}
                title={"DataSource Settings"}
            />

            <InputCont>
                <InputCol>
                    <Field
                        locked={!isEditing}
                        value={name}
                        label={"Name"}
                        onChange={(e) => onChange(e, "name")}
                    />

                    <Field
                        locked={!isEditing}
                        value={url}
                        label={"URL"}
                        onChange={(e) => onChange(e, "url")}
                    />

                    <Select
                        locked={!isEditing}
                        label={"Preferred Visualization Type"}
                        opts={visTypes}
                        value={visType}
                        onChange={(e) => onChange(e, "visType")}
                    />
                </InputCol>
            </InputCont>

            <AuthFields {...props} />

            <DataSourceHeaders headers={headers} id={id} locked={!isEditing} />

            <LinkedFields
                {...props}
                locked={!isEditing}
                linkedFields={linkedFields}
            />
        </DataSourceSettingsCont>
    );
};
