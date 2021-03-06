import { ApiSelector } from "./components/apiselector/ApiSelector";
import { StatusBarSelectors } from "./components/statusbarselectors/StatusBarSelectors";
import Logo from "./assets/cloki-logo.png";
import { StatusBarCont, StatusCont } from "./styled";
import ClokiMenu from "../../plugins/settingsmenu/Menu";
import { useSelector } from "react-redux";


export default function StatusBar() {
const isEmbed = useSelector(store => store.isEmbed)
    return ( !isEmbed && (
        <StatusBarCont>
        <div className="logo-section">
            <img
                src={Logo}
                alt={"cLoki View"}
                height={"24px"}
                className={"logo"}
            />
            <ApiSelector />
        </div>

        <StatusCont>
            <StatusBarSelectors />
            <ClokiMenu />
        </StatusCont>
    </StatusBarCont>


    )
    
    );
}
