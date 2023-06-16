import { useMemo } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

import setIsDatasourceSaved from "../store/setIsDataSourceSaved";
import { Button, QrynLogo } from "../ui";
import DOMPurify from "isomorphic-dompurify";
import { useTheme } from "../../../components/DataViews/components/QueryBuilder/hooks";
export interface HeaderProps {
    title: string;
    datasource?: any;
}

export function Header(props: HeaderProps) {
    const navigate = useNavigate();
    const theme = useTheme();
    const urlLocation = useSelector((store: any) => store.urlLocation);
    const dispatch = useDispatch();
    const { title } = props;
    const isDsSaved = useSelector((store: any) => store.isDsSaved);
    const buttonMessage = useMemo(() => {
        if (isDsSaved) {
            return "Save";
        }
        return "Back";
    }, [isDsSaved]);

    const backOne = () => {
        let isLocation = urlLocation?.length > 0;
        dispatch(setIsDatasourceSaved(false));
        if (
            (isLocation || buttonMessage === "Back") &&
            title !== "DataSources"
        ) {
            navigate(-1);
        } else {
            navigate("/");
        }
    };

    return (
        <div className="ds-header">
            <div style={{ display: "flex", alignItems: "center" }}>
                <div style={{display:'flex', flexDirection:'column'}}>
                <div style={{display:'flex'}}>
                <QrynLogo />
                <h1>{title}</h1>
                </div>
               
                <p
                        style={{
                            color: theme.textColor,
                            fontSize: "10px",
                            marginTop:'5px',
                            marginLeft:'10px',
                            opacity:'.5',
                        }}
                    >
                        v{process.env.REACT_APP_VERSION}
                    </p>
            </div>
            </div>
            <Button
                value={DOMPurify.sanitize(buttonMessage)}
                onClick={backOne}
                editing={true}
                primary={isDsSaved}
            />
        </div>
    );
}
