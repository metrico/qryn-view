import { useState } from "react";
//import { useDispatch, useSelector } from "react-redux";
import { LinkedFieldItem } from "../classes/LinkedFieldItem";
//import setDataSources from "../store/setDataSources";
import { InputCont } from "../styles";
import { LinkedField } from "./LinkedField";
import { SectionHeader } from "./SectionHeader";

export type LinkedFieldsProps = {
    id: string;
    name: string;
    linkedFields: any;
    dataSources: any;
    onDsChange: (prev: any) => void;
};

export const LinkedFields = (props: LinkedFieldsProps) => {
    const { linkedFields, name, id, dataSources, onDsChange } = props;
    const [isEditing, setIsEditing] = useState(false);
    const onAddLinkedField = () => {
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

        onDsChange(newDataSources);
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
                    {linkedFields &&
                        linkedFields?.map((val: any, key: any) => (
                            <LinkedField
                                key={key}
                                {...val}
                                dataSourceId={id}
                                locked={false}
                                fieldEditing={fieldEditing}
                                dsChange={onDsChange}
                                dataSources={dataSources}
                            />
                        ))}
                </InputCont>
            </>
        );
    }

    return null;
};
