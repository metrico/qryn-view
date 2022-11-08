import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { LinkedFieldItem } from "../classes/LinkedFieldItem";
import setDataSources from "../store/setDataSources";
import { InputCont } from "../styles";
import { LinkedField } from "./LinkedField";
import { SectionHeader } from "./SectionHeader";

export const LinkedFields = (props) => {
    const { linkedFields, name, id } = props;

    const dataSources = useSelector((store) => store.dataSources);

    const dispatch = useDispatch();
    const [isEditing, setIsEditing] = useState(false);
    const onClickSubmit = (e) => {
        setIsEditing((isEditing) => (isEditing ? false : true));
    };
    const onClickEdit = (e) => {
        setIsEditing((editing) => (editing ? false : true));
    };
    const onClickCancel = (e) => {
        setIsEditing((editing) => (editing ? false : true));
    };

    const onAddLinkedField = () => {
        // modify to add linked filed into datasources => linkedFields
        const newLinked = new LinkedFieldItem();
        newLinked.dataSource = name;
        newLinked.create();
        const linkedClone = JSON.parse(JSON.stringify(linkedFields));

        const newList = [...linkedClone, { ...newLinked }];

        const prevDataSources = JSON.parse(JSON.stringify(dataSources));

        const newDataSources = prevDataSources?.map((m) => {
            if (m.id === id) {
                return {
                    ...m,
                    linkedFields: newList,
                };
            }
            return m;
        });

        console.log(newDataSources);

        localStorage.setItem("dataSources", JSON.stringify(newDataSources));
        dispatch(setDataSources(newDataSources));
    };

    if (linkedFields?.length > 0) {
        return (
            <>
                <SectionHeader
                    title={"Linked Fields"}
                    isEdit={true}
                    isAdd={true}
                    onClickAdd={onAddLinkedField}
                    onCkickEdit={onClickEdit}
                    onClickCancel={onClickCancel}
                    onClickSubmit={onClickSubmit}
                    isEditing={isEditing}
                />

                <InputCont>
                    {linkedFields?.map((val, key) => (
                        <LinkedField
                            key={key}
                            {...val}
                            dataSourceId={id}
                            locked={false}
                        />
                    ))}
                </InputCont>
            </>
        );
    }

    return null;
};
