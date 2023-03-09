import { useMemo } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

import setIsDatasourceSaved from "../store/setIsDataSourceSaved";
import { Button, QrynLogo } from "../ui";
import DOMPurify from 'isomorphic-dompurify'
export interface HeaderProps {
    title: string;
    datasource?: any;
}

export function Header(props: HeaderProps) {
    const navigate = useNavigate();
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
        if ((isLocation || buttonMessage === "Back")&& title !== "DataSources") {
            navigate(-1);
        } else {
            navigate("/");
        }
    };

    return (
        <div className="ds-header">
            <div style={{ display: "flex", alignItems: "center" }}>
                <QrynLogo />
                <h1>{title}</h1>
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
