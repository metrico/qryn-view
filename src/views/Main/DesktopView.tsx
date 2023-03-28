import { ThemeProvider } from "@emotion/react";
import { useEffect, useRef, useState } from "react";
import { useSelector } from "react-redux";
import Panel from "../../sections/Panel";
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
    const [leftOpen, setLeftOpen] = useState(false);
    const [rightOpen, setRightOpen] = useState(false);
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

    const left = useSelector((store: any) => store.left);
    const right = useSelector((store: any) => store.right);
    useEffect(() => {
        setLeftOpen(left[0].open);
        setRightOpen(right[0].open);
        //eslint-disable-next-line
    }, [left[0].open, right[0].open]);

    const panelsRenderer = (leftOpen: boolean, rightOpen: boolean) => {
        return (
            <div className="panels-container" ref={refTotal}>
                {leftOpen === true && <Panel name="left" />}
                {rightOpen === true && <Panel name="right" />}
            </div>
        );
    };
    return (
        <ThemeProvider theme={theme}>
            <MainContainer>
                {!isEmbed && <StatusBar />}
                {panelsRenderer(leftOpen, rightOpen)}
            </MainContainer>

            <SettingsDialog open={settingsDialogOpen} />
            <QueryHistory />
        </ThemeProvider>
    );
}
