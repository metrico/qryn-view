import { ThemeProvider } from "@emotion/react";
import { useEffect, useRef, useState } from "react";
import Panel from "../../components/Panel/Panel";
import StatusBar from "../../components/StatusBar";
import QueryHistory from "../../plugins/queryhistory";
import SettingsDialog from "../../plugins/settingsdialog/SettingsDialog";
import { MainContainer } from "./styled";

/**
 *
 * @param {theme, isEmbed, isSplit, settingsDialogOpen}
 * @returns Desktop View
 */

export interface Props {
    theme: any;
    isEmbed: boolean;
    isSplit: boolean;
    settingsDialogOpen: boolean;
}
export function DesktopView({
    theme,
    isEmbed,
    isSplit,
    settingsDialogOpen,
}: Props) {
    const [widthTotal, setWidthTotal] = useState(0);
    const [widthLeft, setWidthLeft] = useState(0);
    const [widthRight, setWidthRight] = useState(0);
    const [widthLeftPercent, setWidthLeftPercent] = useState(0);
    const [widthRightPercent, setWidthRightercent] = useState(0);
    const [minWidth, setMinWidth] = useState(0);
    const refTotal: any = useRef(null);
    useEffect(() => {
        const widthTotal = refTotal.current.clientWidth;
        setWidthTotal(refTotal.current.clientWidth);
        setWidthLeft(widthTotal / (isSplit ? 2 : 1));
        if (isSplit) {
            setWidthRight(widthTotal / 2);
        }
        const realMinWidth = !isSplit
            ? widthTotal
            : widthTotal / 4 > 370
            ? widthTotal / 4
            : 370;
        setMinWidth(realMinWidth);
    }, [
        setWidthLeft,
        setWidthRight,
        setWidthTotal,
        setMinWidth,
        minWidth,
        isSplit,
    ]);
    useEffect(() => {
        const widthTotal = refTotal.current.clientWidth;
        setWidthLeftPercent(widthLeft / widthTotal);
        if (isSplit) {
            setWidthRightercent(widthRight / widthTotal);
        }
    }, [widthLeft, widthRight, isSplit]);
    useEffect(() => {
        const onWindowResize = () => {
            const widthTotal = refTotal.current.clientWidth;
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

    return (
        <ThemeProvider theme={theme}>
            <MainContainer>
                {!isEmbed && <StatusBar />}
                <div className="panels-container" ref={refTotal}>
                    <Panel name="left" />

                    {isSplit && <Panel name="right" />}
                </div>
            </MainContainer>
            <SettingsDialog open={settingsDialogOpen} />
            <QueryHistory />
        </ThemeProvider>
    );
}
