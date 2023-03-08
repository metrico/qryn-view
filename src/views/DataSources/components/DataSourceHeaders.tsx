import DeleteOutlineOutlinedIcon from "@mui/icons-material/DeleteOutlineOutlined";
import { nanoid } from "nanoid";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import setDataSources from "../store/setDataSources";
import { InputCol, InputGroup } from "../styles";
import { Field } from "../ui";
import { SectionHeader } from "./SectionHeader";

export const DataSourceHeaders = (props: any) => {
    const dispatch = useDispatch();

    const dataSources = useSelector((store: any) => store.dataSources);
    const [editing, setEditing] = useState(false);
    const { headers, id } = props;
    const onChange = (e: any, headerId: any, name: any) => {
        setEditing(() => true);
        const value = e.target.value; // identify value changed
        const prevDs = dataSources.find((f: any) => f.id === id);
        const prevHeaders = prevDs["headers"] || [];

        const newHeaders = prevHeaders.map((m: any) => {
            if (m.id === headerId) {
                m[name] = value;
                return m;
            }
            return m;
        });

        const newDataSources = dataSources.map((ds: any) => {
            if (ds.id === id) {
                ds.headers = [...newHeaders];
            }
            return ds;
        });

        localStorage.setItem("dataSources", JSON.stringify(newDataSources));
        dispatch(setDataSources(newDataSources));
        setTimeout(() => {
            setEditing(() => false);
        }, 800);
    };

    const onAdd = (e: any) => {
        e.preventDefault();
        const prevDataSource = dataSources?.find((f: any) => f.id === id);
        const prevHeaders = prevDataSource["headers"];
        const dsClone = JSON.parse(JSON.stringify([...dataSources]));

        if (headers.length > 0) {
            const newHeaders = {
                ...prevHeaders[prevHeaders.length - 1],
                id: nanoid(),
            };

            const newDataSource = {
                ...prevDataSource,

                headers: [...prevDataSource.headers, newHeaders],
            };

            const newDataSources = dsClone?.map((ds: any) => {
                if (ds.id === id) {
                    return { ...newDataSource };
                }
                return ds;
            });

            localStorage.setItem("dataSources", JSON.stringify(newDataSources));
            dispatch(setDataSources(newDataSources));
        }
    };

    const onRemove = (_: any, headerId: any) => {
        const prevDataSource = dataSources?.find((f: any) => f.id === id);
        const prevHeaders = [...headers];
        const headerRm = prevHeaders.filter((f) => f.id !== headerId);
        const newDataSource = { ...prevDataSource, headers: [...headerRm] };
        const newDataSources = dataSources?.map((ds: any) => {
            if (ds.id === id) {
                return { ...newDataSource };
            }
            return ds;
        });

        localStorage.setItem("dataSources", JSON.stringify(newDataSources));
        dispatch(setDataSources(newDataSources));
    };

    return (
        <div className="">
            {headers && (
                <>
                    <SectionHeader
                        title={"Custom HTTP Headers"}
                        isEdit={false}
                        isAdd={true}
                        isEditing={editing}
                        onClickAdd={onAdd}
                    />

                    {headers?.map((val: any, key: any) => (
                        <InputCol key={key}>
                            <InputGroup>
                                <Field
                                    label={"header"}
                                    value={val.header}
                                    onChange={(e: any) =>
                                        onChange(e, val.id, "header")
                                    }
                                />
                                <Field
                                    label={"value"}
                                    value={val.value}
                                    onChange={(e: any) =>
                                        onChange(e, val.id, "value")
                                    }
                                />
                                <DeleteOutlineOutlinedIcon
                                    onClick={(e) => onRemove(e, val.id)}
                                    style={{
                                        cursor: "pointer",
                                        marginLeft: "10px",
                                    }}
                                    fontSize={"small"}
                                />
                            </InputGroup>
                        </InputCol>
                    ))}
                </>
            )}
        </div>
    );
};
