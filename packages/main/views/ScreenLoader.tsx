import useTheme from "@ui/theme/useTheme";
import { cx } from "@emotion/css";
import { QrynLogo } from "./DataSources/ui";

import {
    LoaderCont,
    LogoCont,
    CenterCircle,
    LogoBottom,
} from "./screenLoaderStyles";
export const LogoImg = () => {
    return <QrynLogo height={"200px"} />;
};

export default function ScreenLoader() {
    const theme = useTheme();
    return (
        <div className={cx(LoaderCont(theme))}>
            <div className={cx(LogoCont)}>
                <div className={cx(CenterCircle)}>
                    <LogoImg />
                </div>
                <div className={cx(LogoBottom(theme))}>Qryn</div>
            </div>
        </div>
    );
}
