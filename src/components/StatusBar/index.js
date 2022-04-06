import { ApiSelector } from "./components/apiselector/ApiSelector";
import { StatusBarSelectors } from "./components/statusbarselectors/StatusBarSelectors";
import Logo from "./assets/cloki-logo.png";
import { StatusBarCont, StatusCont } from "./styled";
import ClokiMenu from "../../plugins/settingsmenu/Menu";


export default function StatusBar() {
    return (
        <StatusBarCont>
            <div className="logo-section">
                <img
                    src={Logo}
                    alt={"cLoki View"}
                    height={"28px"}
                    className={"logo"}
                />

                <ApiSelector />
            </div>

            <StatusCont>
                <StatusBarSelectors />

           <ClokiMenu/>
            </StatusCont>
        </StatusBarCont>
    );
}
