import { useState } from "react";
import { cx } from "@emotion/css";
import { useDispatch, useSelector } from "react-redux";
import setDataSources from "../store/setDataSources";
import { Button, Field } from "../ui";
import DOMPurify from "isomorphic-dompurify";
import useTheme from "@ui/theme/useTheme";
import CustomSwitch from "@ui/qrynui/CustomSwitch/CustomSwitch";
import {
    InlineFlex,
    FieldsCont,
    BasicAuth,
    ForAllButton,
    oneForAllStyle,
} from "./DatasourcesFiller.styles";

export const DataSourcesFiller = () => {
    const [url, setUrl] = useState("");
    const [user, setUser] = useState("");
    const [password, setPassword] = useState("");
    const [oneForAll, setOneForAll] = useState(false);
    const [basicAuth, setBasicAuth] = useState(false);
    const dataSources = useSelector((store: any) => store.dataSources);
    const dispatch: any = useDispatch();
    const submitMessage = "Save";
    const theme = useTheme();

    const urlChange = (e: any) => {
        const value = e?.target?.value || "";
        const strippedValue = value.replace(/\/$/, "");
        setUrl(() => strippedValue);
    };
    const userChange = (e: any) => {
        setUser(() => e.target.value);
    };
    const passwordChange = (e: any) => {
        setPassword(() => e.target.value);
    };

    const onSwitchChange = (e: any) => {
        setOneForAll(() => e.target.checked);
    };

    const onBasicAuthChange = (e: any) => {
        setBasicAuth(() => e.target.checked);
    };

    const onUseForAll = () => {
        const prevDs = JSON.parse(JSON.stringify(dataSources));
        const newDs = prevDs?.map((m: any) => ({
            ...m,
            url,
            auth: {
                ...m.auth,
                basicAuth: { ...m.auth.basicAuth, value: basicAuth },
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
        <div className={cx(InlineFlex(theme))}>
            <div className={cx(oneForAllStyle)}>
                Use one setting for all Data Sources
                <CustomSwitch
                    defaultActive={oneForAll}
                    onChange={onSwitchChange}
                />
            </div>
            {oneForAll && (
                <div className={cx(FieldsCont)}>
                    <Field
                        value={DOMPurify.sanitize(url)}
                        label={"url"}
                        onChange={urlChange}
                        placeholder={"http://qryn.dev"}
                    />
                    {basicAuth && (
                        <>
                            <Field
                                value={DOMPurify.sanitize(user)}
                                label={"user"}
                                onChange={userChange}
                                placeholder={"default"}
                            />
                            <Field
                                value={DOMPurify.sanitize(password)}
                                label={"password"}
                                onChange={passwordChange}
                                type={"password"}
                                placeholder={""}
                            />
                        </>
                    )}

                    <div className={cx(ForAllButton)}>
                        <div className={cx(BasicAuth)}>
                            <span>Use Basic Auth</span>
                            <CustomSwitch
                                defaultActive={basicAuth}
                                onChange={onBasicAuthChange}
                            />
                        </div>
                        <Button
                            value={DOMPurify.sanitize(submitMessage)}
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
