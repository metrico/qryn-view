
import { useMemo} from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

import setIsDatasourceSaved from "../store/setIsDataSourceSaved";
import { Button, QrynLogo } from "../ui";


export interface HeaderProps {
    title: string;
    datasource?: any
}

export function Header(props: HeaderProps) {
    const navigate = useNavigate();
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
        dispatch(setIsDatasourceSaved(false));
        navigate(-1);
    };

    return (
        <div className="ds-header">
            <div style={{ display: "flex", alignItems: "center" }}>
                <QrynLogo />
                <h1>{title}</h1>
            </div>
            <Button
                value={buttonMessage}
                onClick={backOne}
                editing={true}
                primary={isDsSaved}
            />
        </div>
    );
}

