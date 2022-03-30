import ApiSelector from "./ApiSelector/ApiSelector";
import StepInput from "./StepInput/StepInput";
import { useDispatch, useSelector } from "react-redux";
import { setSettingsMenuOpen } from "../../components/StatusBar/actions/setMenuSettingsOpen";
import LimitInput from "./LimitInput/LimitInput";
import CopyButton from "./CopyButton/CopyButton";
import SettingsDrawer from "./SettingsDrawer";

export default function SettingsMenu() {
    const dispatch = useDispatch();
    const settingsOpen = useSelector((store) => store.settingsMenuOpen);
    function onClose() {
        dispatch(setSettingsMenuOpen(false));
    }

    return (
        <div>
            <SettingsDrawer
                apiSelector={<ApiSelector />}
                stepInput={<StepInput />}
                limitInput={<LimitInput />}
                copyUrlButton={<CopyButton />}
                open={settingsOpen}
                onClose={onClose}
            />
        </div>
    );
}
