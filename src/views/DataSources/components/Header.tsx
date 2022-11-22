import { useNavigate } from "react-router-dom";
import { Button, QrynLogo } from "../ui";

export interface HeaderProps {
    title: string;
}

export function Header(props: HeaderProps) {
    const navigate = useNavigate();
    const { title } = props;

    return (
        <div className="ds-header">
            <div style={{ display: "flex", alignItems: "center" }}>
                <QrynLogo />
                <h1>{title}</h1>
            </div>

            <Button
                value={"Back"}
                onClick={() => navigate(-1)}
                editing={true}
                primary={false}
            />
        </div>
    );
}
