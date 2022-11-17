import { ThemeProvider } from "@emotion/react";
import styled from "@emotion/styled";
import { useSelector } from "react-redux";
import { themes } from "../theme/themes";
import Panel from "../components/Panel/Panel";
import { Notification } from "../qryn-ui/notifications";
import SettingsDialog from "../plugins/settingsdialog/SettingsDialog";
import { UpdateStateFromQueryParams } from "../helpers/UpdateStateFromQueryParams";
import StatusBar from "../components/StatusBar";
import QueryHistory from "../plugins/queryhistory";
import { useMediaQuery } from "react-responsive";
import MainTabs from "./MainTabs.js";
import { useMemo, useState, useEffect, useRef } from "react";
import { ResizableBox } from "../plugins/ResizableBox/ResiableBox";
export const MainContainer = styled.div`
    position: absolute;
    display: flex;
    flex-direction: column;
    height: 100%;
    width: 100%;
    flex: 1;

    background-color: ${(props) => props.theme.mainBgColor} !important;
    &::-webkit-scrollbar-corner {
        background: transparent;
    }
    &::-webkit-scrollbar-thumb {
        border-radius: 5px;
        background: ${(props) => props.theme.scrollbarThumb} !important;
    }
    .panels-container {
        display: flex;
        background: ${({ theme }) => theme.shBgColor};
        height: calc(100vh - 45px);
    }
`;

/**
 *
 * @param {theme, isEmbed, settingsDialogOpen}
 * @returns Mobile View
 */

export function MobileView({ theme, isEmbed, settingsDialogOpen }) {
    return (
        <ThemeProvider theme={theme}>
            {!isEmbed && <StatusBar />}

            <MainContainer>
                <MainTabs />
            </MainContainer>

            <Notification />
            <SettingsDialog open={settingsDialogOpen} />
            <QueryHistory />
        </ThemeProvider>
    );
}

/**
 *
 * @param {theme, isEmbed, isSplit, settingsDialogOpen}
 * @returns Desktop View
 */

export function DesktopView({ theme, isEmbed, isSplit, settingsDialogOpen }) {
    const [height, setHeight] = useState(0);
    const [widthTotal, setWidthTotal] = useState(0);
    const [widthLeft, setWidthLeft] = useState(0);
    const [widthRight, setWidthRight] = useState(0);
    const [widthLeftPercent, setWidthLeftPercent] = useState(0);
    const [widthRightPercent, setWidthRightercent] = useState(0);
    const [minWidth, setMinWidth] = useState(0);
    const [maxWidth, setMaxWidth] = useState(0);
    const refTotal = useRef(null);
    useEffect(() => {
        const widthTotal = refTotal.current.clientWidth
        setHeight(refTotal.current.clientHeight);
        setWidthTotal(refTotal.current.clientWidth);
        setWidthLeft(widthTotal / (isSplit ? 2 : 1));
        if (isSplit) {
            setWidthRight(widthTotal / 2);
        }
        const realMinWidth = !isSplit ? widthTotal : widthTotal / 4 > 370 ? widthTotal / 4 : 370;
        setMinWidth(realMinWidth);
        const realMaxWidth = !isSplit ? widthTotal : widthTotal - realMinWidth
        setMaxWidth(realMaxWidth);
    }, [
        setWidthLeft,
        setWidthRight,
        setWidthTotal,
        setHeight,
        setMinWidth,
        setMaxWidth,
        minWidth,
        isSplit,
    ]);
    useEffect(() => {
        const widthTotal = refTotal.current.clientWidth
        setWidthLeftPercent(widthLeft / widthTotal);
        if (isSplit) {
            setWidthRightercent(widthRight / widthTotal);
        }
    }, [widthLeft, widthRight]);
    useEffect(() => {
        const onWindowResize = () => {
            const widthTotal = refTotal.current.clientWidth
            setWidthTotal(widthTotal);
            setWidthLeft(widthTotal * widthLeftPercent);
            if (isSplit) {
                setWidthRight(widthTotal * widthRightPercent);
            }
        };
        window.addEventListener("resize", onWindowResize);
        return () => {
            window.removeEventListener("resize", onWindowResize);
        };
    }, [
        widthTotal,
        widthLeft,
        widthRight,
        widthLeftPercent,
        widthRightPercent,
        isSplit,
    ]);
    const onSplitResize = (event, { element, size, handle }) => {
        if (handle === "e") {
            setWidthRight(widthTotal - size.width);
            setWidthLeft(size.width);
        } else {
            setWidthLeft(widthTotal - size.width);
            setWidthRight(size.width);
        }
        setWidthLeftPercent(widthLeft / widthTotal);
        setWidthRightercent(widthRight / widthTotal);
    };

    return (
        <ThemeProvider theme={theme}>
            <MainContainer>
                {!isEmbed && <StatusBar />}
                <div className="panels-container" ref={refTotal}>
                    <ResizableBox
                        width={widthLeft}
                        minConstraints={[minWidth, height]}
                        maxConstraints={[maxWidth, height]}
                        minWidth={minWidth}
                        maxWidth={maxWidth}
                        minHeight={height}
                        maxHeight={height}
                        height={height}
                        axis={"x"}
                        resizeHandles={isSplit ? ["e"] : []}
                        lockAspectRatio={false}
                        handleSize={[10, 10]}
                        onResize={onSplitResize}
                    >
                        <Panel name="left" />
                    </ResizableBox>
                    {isSplit && (
                        <ResizableBox
                            width={widthRight}
                            minConstraints={[minWidth, height]}
                            maxConstraints={[maxWidth, height]}
                            minWidth={minWidth}
                            maxWidth={maxWidth}
                            minHeight={height}
                            maxHeight={height}
                            height={height}
                            axis={"x"}
                            resizeHandles={["w"]}
                            lockAspectRatio={false}
                            handleSize={[10, 10]}
                            onResize={onSplitResize}
                        >
                            <Panel name="right" />
                        </ResizableBox>
                    )}
                </div>
            </MainContainer>
            <SettingsDialog open={settingsDialogOpen} />
            <QueryHistory />
        </ThemeProvider>
    );
}

export default function Main() {
    UpdateStateFromQueryParams();
    const isTabletOrMobile = useMediaQuery({ query: "(max-width: 914px)" });
    const isSplit = useSelector((store) => store.isSplit);
    const isEmbed = useSelector((store) => store.isEmbed);
    const theme = useSelector((store) => store.theme);
    const settingsDialogOpen = useSelector((store) => store.settingsDialogOpen);
    const themeMemo = useMemo(() => themes[theme], [theme]);

    if (!isTabletOrMobile) {
        // desktop view
        return (
            <DesktopView
                isEmbed={isEmbed}
                isSplit={isSplit}
                theme={themeMemo}
                settingsDialogOpen={settingsDialogOpen}
            />
        );
    } else {
        // mobile view
        return (
            <MobileView
                isEmbed={isEmbed}
                theme={themeMemo}
                settingsDialogOpen={settingsDialogOpen}
            />
        );
    }
}
