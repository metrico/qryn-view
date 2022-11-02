import DeleteForeverOutlined from "@mui/icons-material/DeleteForeverOutlined";
import { nanoid } from "nanoid";
import { useDispatch, useSelector } from "react-redux";
import setDataSources from "../store/setDataSources";
import { InputCol, InputGroup } from "../styles";
import { Field } from "../ui";
import { SectionHeader } from "./SectionHeader";

export const DataSourceHeaders = (props) => {
    const dispatch = useDispatch();

    const dataSources = useSelector((store) => store.dataSources);

    const { headers, id } = props;
    const onChange = (e, headerId, name) => {
        const value = e.target.value; // identify value changed
        const prevDs = dataSources.find((f) => f.id === id);
        const prevHeaders = prevDs["headers"] || [];

        const newHeaders = prevHeaders.map((m) => {
            if (m.id === headerId) {
                m[name] = value;
                return m;
            }
            return m;
        });

        const newDataSources = dataSources.map((ds) => {
            if (ds.id === id) {
                ds.headers = [...newHeaders];
            }
            return ds;
        });

        localStorage.setItem("dataSources", JSON.stringify(newDataSources));
        dispatch(setDataSources(newDataSources));
    };

    const onAdd = (e) => {
        e.preventDefault();
        const prevDataSource = dataSources?.find((f) => f.id === id);
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

            const newDataSources = dsClone?.map((ds) => {
                if (ds.id === id) {
                    return { ...newDataSource };
                }
                return ds;
            });

            localStorage.setItem("dataSources", JSON.stringify(newDataSources));
            dispatch(setDataSources(newDataSources));
        }
    };

    const onRemove = (_, headerId) => {
        const prevDataSource = dataSources?.find((f) => f.id === id);
        const prevHeaders = [...headers];
        const headerRm = prevHeaders.filter((f) => f.id !== headerId);
        const newDataSource = { ...prevDataSource, headers: [...headerRm] };
        const newDataSources = dataSources?.map((ds) => {
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
                        isEditing={false}
                        onClickAdd={onAdd}
                    />

                    {headers?.map((val, key) => (
                        <InputCol key={key}>
                            <InputGroup>
                                <Field
                                    label={"header"}
                                    value={val.header}
                                    onChange={(e) =>
                                        onChange(e, val.id, "header")
                                    }
                                />
                                <Field
                                    label={"value"}
                                    value={val.value}
                                    onChange={(e) =>
                                        onChange(e, val.id, "value")
                                    }
                                />
                                <DeleteForeverOutlined
                                    onClick={(e) => onRemove(e, val.id)}
                                    style={{ cursor: "pointer" }}
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
