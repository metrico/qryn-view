import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { LinkedFieldItem } from "../classes/LinkedFieldItem";
import setDataSources from "../store/setDataSources";
import { InputCont } from "../styles";
import { LinkedField } from "./LinkedField";
import { SectionHeader } from "./SectionHeader";

export const LinkedFields = (props: any) => {
    const { linkedFields, name, id } = props;

    const dataSources = useSelector((store: any) => store.dataSources);

    const dispatch = useDispatch();
    const [isEditing, setIsEditing] = useState(false);

    const onAddLinkedField = () => {
        // modify to add linked filed into datasources => linkedFields
        const newLinked = new LinkedFieldItem();
        newLinked.dataSource = name;
        newLinked.create();
        const linkedClone = JSON.parse(JSON.stringify(linkedFields));

        const newList = [...linkedClone, { ...newLinked }];

        const prevDataSources = JSON.parse(JSON.stringify(dataSources));

        const newDataSources = prevDataSources?.map((m: any) => {
            if (m.id === id) {
                return {
                    ...m,
                    linkedFields: newList,
                };
            }
            return m;
        });

        localStorage.setItem("dataSources", JSON.stringify(newDataSources));
        dispatch(setDataSources(newDataSources));
    };

    const fieldEditing = () => {
        setIsEditing(() => true);
        setTimeout(() => {
            setIsEditing(() => false);
        }, 800);
    };

    if (linkedFields?.length > 0) {
        return (
            <>
                <SectionHeader
                    title={"Linked Fields"}
                    isEdit={true}
                    isAdd={true}
                    onClickAdd={onAddLinkedField}
                    isEditing={isEditing}
                />

                <InputCont>
                    {linkedFields?.map((val: any, key: any) => (
                        <LinkedField
                            key={key}
                            {...val}
                            dataSourceId={id}
                            locked={false}
                            fieldEditing={fieldEditing}
                        />
                    ))}
                </InputCont>
            </>
        );
    }

    return null;
};
