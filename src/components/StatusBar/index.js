import { ApiSelector } from "./components/apiselector/ApiSelector";
import { StatusBarSelectors } from "./components/statusbarselectors/StatusBarSelectors";
import Logo from "./assets/cloki-logo.png";

import { useSelector, useDispatch } from "react-redux";
import { setSettingsMenuOpen } from "./actions/setMenuSettingsOpen";
import DisplaySettingsIcon from "@mui/icons-material/DisplaySettings";
import { MenuButton, StatusBarCont, StatusCont } from "./styled";

export default function StatusBar() {
    const dispatch = useDispatch();
    const menuOpen = useSelector((store) => store.settingsMenuOpen);
    function openSettings() {
        const shouldOpen = menuOpen ? false : true;

        dispatch(setSettingsMenuOpen(shouldOpen));
    }

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
                <MenuButton isActive={menuOpen} onClick={openSettings}>
                    <DisplaySettingsIcon />
                </MenuButton>
            </StatusCont>
        </StatusBarCont>
    );
}
