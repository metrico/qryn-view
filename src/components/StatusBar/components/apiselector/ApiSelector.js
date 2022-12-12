import { ApiSelectorButton, ApiSelectorStyled } from "../../styled";

import { useNavigate } from "react-router-dom";

import TuneOutlinedIcon from '@mui/icons-material/TuneOutlined';


export function ApiSelector() {
    const navigate = useNavigate();
    return (
        <ApiSelectorStyled>
            <ApiSelectorButton
                title={"Data Sources Settings"}
                onClick={() => navigate("datasources")}
            >
                <TuneOutlinedIcon style={{
                    height:'13px', width:'13px', marginRight:'3px', marginBotton:'2px'
                }} fontSize={'small'} />
               <span> Data Sources</span>
            </ApiSelectorButton>
        </ApiSelectorStyled>
    );
}
