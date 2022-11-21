import { ApiSelectorButton, ApiSelectorStyled } from "../../styled";

import { useNavigate } from "react-router-dom";
export function ApiSelector() {
    const navigate = useNavigate();
    return (
        <ApiSelectorStyled>
            <ApiSelectorButton
                title={"Data Sources Settings"}
                onClick={() => navigate("datasources")}
            >
                Data Sources
            </ApiSelectorButton>
        </ApiSelectorStyled>
    );
}
