import { Switch } from "@mui/material";
import { useEffect, useState } from "react";
import { css, cx } from "@emotion/css";
import { useDispatch, useSelector } from "react-redux";
import setDataSources from "../store/setDataSources";
import { Button, Field } from "../ui";
import DOMPurify from "isomorphic-dompurify";
import useTheme from "@ui/theme/useTheme"
import {z} from 'zod'
const InlineFlex = (theme: any) => css`
    display: flex;
    flex-direction: column;
    flex: 1;
    flex-wrap: wrap;
    width: 400px;
    border: 1px solid ${theme.accentNeutral};
    padding: 5px;
    border-radius: 3px;
    margin-left:10px;
`;

const oneForAllStyle = css`
    display: flex;
    padding: 4px 12px;
    font-size: 14px;
    border-radius: 4px;
    white-space: nowrap;
    align-items: center;
    justify-content: space-between;
`;

const FieldsCont = css`
    margin: 5px;
`;

const BasicAuth = css`
    margin-left: 20px;
    display: flex;
    align-items: center;
    span {
        font-size: 12px;
    }
`;

const ForAllButton = css`
    align-items: center;
    width: 100%;
    display: flex;
    margin-top: 10px;
    justify-content: space-between;
    flex: 1;
`;

// set a global url for all datasources

export const urlSchema = z.string().url()

const DEFAULT_URL = window.location.origin

export const DataSourcesFiller = (props: any) => {

    const [url, setUrl] = useState("");
    const [user, setUser] = useState("");
    const [password, setPassword] = useState("");
    const [oneForAll, setOneForAll] = useState(false);
    const [basicAuth, setBasicAuth] = useState(false);
    const [urlValid, setUrlValid] = useState(false)
    const dataSources = useSelector((store: any) => store.dataSources);
    const dispatch: any = useDispatch();
    const submitMessage = "Save";
    const theme = useTheme();

    const onUseForAll = (defaultUrl="") => {
        const changedUrl = defaultUrl === "" ? url : defaultUrl
        const prevDs = JSON.parse(JSON.stringify(dataSources));
        const newDs = prevDs?.map((m: any) => ({
            ...m,
            url:changedUrl,
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

    useEffect(()=>{
        if (url === ""){
            
            if(dataSources[0]?.url === "" && dataSources[1]?.url === "") {
                setUrl(DEFAULT_URL)
                onUseForAll(DEFAULT_URL)
            } else  {
                setUrl(dataSources[0]?.url)
            }
    
            setOneForAll(true)
            setUrlValid(true)
        } 
      
    },[url])

    const urlChange = (e: any) => {
           const value = e?.target?.value || "";
        const message = urlSchema.safeParse(value)
       
        setUrlValid(()=> message.success)

           setUrl(() => value);
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



    return (
        <div className={cx(InlineFlex(theme))}>
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
                        value={DOMPurify.sanitize(url)}
                        label={"url"}
                        onChange={urlChange}
                        placeholder={window.location.origin}
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
                            <span>Use Basic Auth</span>{" "}
                            <Switch
                                checked={basicAuth}
                                size={"small"}
                                onChange={onBasicAuthChange}
                            />{" "}
                        </div>
                        <Button
                            value={DOMPurify.sanitize(submitMessage)}
                            disabled={!urlValid}

                            onClick={onUseForAll}
                            editing={false}
                            primary={urlValid}
                        />
                    
                    </div>
                </div>
            )}
        </div>
    );
};
