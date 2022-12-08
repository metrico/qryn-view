import { Switch } from "@mui/material";
import { useState } from "react";
import { css, cx } from "@emotion/css";
import { useDispatch, useSelector } from "react-redux";
import setDataSources from "../store/setDataSources";
import { Button, Field } from "../ui";
const InlineFlex = css`
    display: flex;
    flex-direction: column;
    flex: 1;
    flex-wrap: wrap;
    width: 400px;
    margin-top:5px;
    margin-left:10px;
    border: 1px solid lightgray;
    padding:5px;
    border-radius: 4px;
`;

const oneForAllStyle = css`
    display: flex;
    padding: 4px 12px;
   // border: 1px solid lightgray;
    font-size: 14px;
    border-radius: 4px;
    margin-left: 12px;
    white-space: nowrap;
    align-items: center;
    justify-content: space-between;
`;

const FieldsCont = css`
    //width: 200px;
    margin:5px;
`;

const ForAllButton = css`
width:100%;
    display: flex;
    margin-top:10px;
    justify-content: flex-end;
    flex:1;
`;

export const DataSourcesFiller = (props: any) => {
    const [url, setUrl] = useState("");
    const [user, setUser] = useState("");
    const [password, setPassword] = useState("");
    const [oneForAll, setOneForAll] = useState(false);
    const dataSources = useSelector((store: any) => store.dataSources);
    const dispatch = useDispatch();
    const submitMessage = "Save";
    const urlChange = (e: any) => {
        setUrl((_) => e.target.value);
    };
    const userChange = (e: any) => {
        setUser((_) => e.target.value);
    };
    const passwordChange = (e: any) => {
        setPassword((_) => e.target.value);
    };

    const onSwitchChange = (e: any) => {
        setOneForAll((_) => e.target.checked);
    };

    const onUseForAll = (e: any) => {
        const prevDs = JSON.parse(JSON.stringify(dataSources));
        const newDs = prevDs?.map((m: any) => ({
            ...m,
            url,
            auth: {
                ...m.auth,
                fields: {
                    ...m.auth.fields,
                    basicAuth: [...m.auth.fields.basicAuth]?.map((ba: any) => {
                        if (ba.name === "user") {
                            return { ...ba, value: user };
                        }
                        if (ba.name === "password") {
                            return { ...ba, value: password };
                        }
                        return ba;
                    }),
                },
            },
        }));
        localStorage.setItem("dataSources", JSON.stringify(newDs));
        dispatch(setDataSources(newDs));
    };

    return (
        <div className={cx(InlineFlex)}>
            <div className={cx(oneForAllStyle)}>
                Use one setting for all Data Sources
                <Switch
                    checked={oneForAll}
                    size={"small"}
                    onChange={onSwitchChange}
                />
            </div>
            {oneForAll && (
                <div className={cx(FieldsCont)}>
                    <Field
                        value={url}
                        label={"url"}
                        onChange={urlChange}
                        placeholder={"http://qryn.dev"}
                    />
                    <Field
                        value={user}
                        label={"user"}
                        onChange={userChange}
                        placeholder={"default"}
                    />
                    <Field
                        value={password}
                        label={"password"}
                        onChange={passwordChange}
                        type={'password'}
                        placeholder={""}
                    />
                    <div className={cx(ForAllButton)}>
                        <Button
                            value={submitMessage}
                            onClick={onUseForAll}
                            editing={false}
                            primary={true}
                        />
                    </div>
                </div>
            )}
        </div>
    );
};
