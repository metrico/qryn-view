import { ApiSelector } from "./components/apiselector/ApiSelector";
import { StatusBarSelectors } from "./components/statusbarselectors/StatusBarSelectors";
import Logo from "./assets/qryn-logo.png";
import { StatusBarCont, StatusCont } from "./styled";
import ClokiMenu from "../../plugins/settingsmenu/Menu";
import { useSelector } from "react-redux";
import { themes } from "../../theme/themes";
import { ThemeProvider } from "@emotion/react";
import { css, cx } from "@emotion/css";

const LogoSection = css`
    display: flex;
    align-items: center;
    flex: 1;
`;
const LogoStyle = css`
    margin-left: 5px;
    height: 22px;
`;
export default function StatusBar() {
    const _themes: any = themes;
    const theme = useSelector(({ theme }: any) => theme);
    return (
        <ThemeProvider theme={_themes[theme]}>
            <StatusBarCont>
                <div className={cx(LogoSection)}>
                    <img
                        src={Logo}
                        alt="Qryn View"
                        height="22px"
                        className={LogoStyle}
                    />
                    <ApiSelector />
                </div>

                <StatusCont>
                    <StatusBarSelectors />
                    <ClokiMenu />
                </StatusCont>
            </StatusBarCont>
        </ThemeProvider>
    );
}
