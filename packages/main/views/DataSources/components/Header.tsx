import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { Button, QrynLogo } from "../ui";
import DOMPurify from "isomorphic-dompurify";
import useTheme from "@ui/theme/useTheme";
import { useStoreSettings } from "../hooks/useStoreSettings";
import { createAlert } from "@ui/store/actions";

export interface HeaderProps {
    title: string;
    datasource?: any;
}

export function Header(props: HeaderProps) {
    const dispatch:any = useDispatch()
    const { storeDataSources, setSettings } = useStoreSettings();
    const datasources = useSelector((store: any) => store.dataSources);
    const navigate = useNavigate();
    const theme = useTheme();
    const { title } = props;
    const isDsSaved = useSelector((store: any) => store.isDsSaved);

    const onSave = () => {
        storeDataSources()
        dispatch(createAlert({
            type:'success',
            message: "Data Source Setting Saved SuccessFully",

        }))
    }

    const backOne = () => {
            navigate(-1);
    };

    const cancelAction = () => {
        setSettings(datasources);
    };

    return (
        <div className="ds-header">
            <div style={{ display: "flex", alignItems: "center" }}>
                <div style={{ display: "flex", flexDirection: "column" }}>
                    <div style={{ display: "flex" }}>
                        <QrynLogo />
                        <h1>{title}</h1>
                    </div>

                    <p
                        style={{
                            color: theme.contrast,
                            fontSize: "10px",
                            marginTop: "5px",
                            marginLeft: "10px",
                            opacity: ".5",
                        }}
                    >
                        v{import.meta.env.VITE_APP_VERSION}
                    </p>
                </div>
            </div>
            <Button
                value={DOMPurify.sanitize("Save")}
                onClick={onSave}
                editing={true}
                primary={isDsSaved}
            />
            <Button
                value={DOMPurify.sanitize("Cancel")}
                onClick={cancelAction}
                editing={true}
                primary={isDsSaved}
            />

            <Button
                value={DOMPurify.sanitize("Back")}
                onClick={backOne}
                editing={true}
                primary={isDsSaved}
            />
        </div>
    );
}
