import { ThemeProvider } from "@emotion/react";
import styled from "@emotion/styled";
import { useDispatch, useSelector } from "react-redux";
import { themes } from "../theme/themes";
import Panel from "../components/Panel/Panel";
import { Notification } from "../qryn-ui/notifications";
import SettingsDialog from "../plugins/settingsdialog/SettingsDialog";
import { UpdateStateFromQueryParams } from "../helpers/UpdateStateFromQueryParams";
import StatusBar from "../components/StatusBar";
import QueryHistory from "../plugins/queryhistory";
import { useMediaQuery } from "react-responsive";
import MainTabs from "./MainTabs.js";
import { setTheme } from "../actions";
import { useMemo, useState, useEffect, useRef } from "react";
import { useCookies } from "react-cookie";
import { useLocation } from "react-router-dom";
import setDataSources from "./DataSources/store/setDataSources";
import { setShowDataSourceSetting } from "./Main/setShowDataSourceSetting";

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
        const widthTotal = refTotal.current.clientWidth;
        setHeight(refTotal.current.clientHeight);
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
        const realMaxWidth = !isSplit ? widthTotal : widthTotal - realMinWidth;
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
        const widthTotal = refTotal.current.clientWidth;
        setWidthLeftPercent(widthLeft / widthTotal);
        if (isSplit) {
            setWidthRightercent(widthRight / widthTotal);
        }
    }, [widthLeft, widthRight]);
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
                    {/* <ResizableBox
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
                    > */}
                    <Panel name="left" />
                    {/* </ResizableBox> */}
                    {isSplit && (
                        // <ResizableBox
                        //     width={widthRight}
                        //     minConstraints={[minWidth, height]}
                        //     maxConstraints={[maxWidth, height]}
                        //     minWidth={minWidth}
                        //     maxWidth={maxWidth}
                        //     minHeight={height}
                        //     maxHeight={height}
                        //     height={height}
                        //     axis={"x"}
                        //     resizeHandles={["w"]}
                        //     lockAspectRatio={false}
                        //     handleSize={[10, 10]}
                        //     onResize={onSplitResize}
                        // >
                        <Panel name="right" />
                        // </ResizableBox>
                    )}
                </div>
            </MainContainer>
            <SettingsDialog open={settingsDialogOpen} />
            <QueryHistory />
        </ThemeProvider>
    );
}

// useCookiesAvailable:

export function useCookiesAvailable(urlParams) {
    let cookieAuth = "";
    let cookiesAvailable = false;

    const hasCookie = useMemo(() => {
        return urlParams.has("cookie") || false;
    }, [urlParams]);

    const cookieParam = useMemo(() => {
        if (hasCookie) {
            return urlParams.get("cookie");
        }
        return "";
    }, [urlParams, hasCookie]);

    const [cookie, _] = useCookies([cookieParam]);

    if (cookie[cookieParam] && cookie[cookieParam] !== "") {
        cookieAuth = cookie[cookieParam];
        cookiesAvailable = true;
    }
    return { cookieAuth, cookiesAvailable };
}

// useUrlAvailable:

export function useUrlAvailable(urlParams) {
    const hasOneForAll = useMemo(() => {
        return urlParams.has("url");
    }, [urlParams]);

    const oneForAllParam = useMemo(() => {
        if (hasOneForAll) {
            return urlParams.get("url");
        }
        return "";
    }, [urlParams, hasOneForAll]);

    return { url: oneForAllParam, urlAvailable: hasOneForAll };
}

// updateDataSources:

export function updateDataSourcesWithUrl(
    dispatch,
    url,
    cookies,
    haveUrl,
    haveCookies,
    dataSources
) {
    let apiUrl = "";
    let basicAuth = false;
    let urlApi = false;
    let cookieAuth = {};

    if (haveUrl) {
        urlApi = true;
    }

    if (haveCookies) {
        let [auth, dsData] = cookies.split("@");
        let cookieDsData = "";
        if (dsData && dsData !== "") {
            try {
                cookieDsData = atob(dsData);
                cookieDsData = JSON.parse(cookieDsData);
                if (typeof cookieDsData === "object" && cookieDsData["url"]) {
                    apiUrl = cookieDsData["url"];
                    haveUrl = true;
                    urlApi = true;
                }
            } catch (e) {
                console.log(e);
            }
        }

        let [user, pass] = auth.split(":");

        if (user !== "" && pass !== "") {
            cookieAuth = { user, password: pass };
            basicAuth = true;
        }
    }

    if (!haveUrl && basicAuth) {
        apiUrl = window.location.protocol + "//" + window.location.host;
        urlApi = true;
    }

    if (apiUrl === "") {
        urlApi = true;
        apiUrl = url;
    }

    const dsCP = [...dataSources];
    const prevDs = JSON.parse(JSON.stringify(dsCP));

    const newDs = prevDs?.map((m) => ({
        ...m,
        url: urlApi ? apiUrl : m.url,
        auth: {
            ...m.auth,
            basicAuth: { ...m.auth.basicAuth, value: basicAuth },
            fields: {
                ...m.auth.fields,
                basicAuth: basicAuth
                    ? [...m.auth.fields.basicAuth]?.map((ba) => {
                          if (ba.name === "user") {
                              return { ...ba, value: cookieAuth.user };
                          }
                          if (ba.name === "password") {
                              return { ...ba, value: cookieAuth.password };
                          }
                          return ba;
                      })
                    : [...m.auth.fields.basicAuth],
            },
        },
    }));

    if (cookies && cookieAuth) {
        dispatch(setShowDataSourceSetting(false));
    }

    localStorage.setItem("dataSources", JSON.stringify(newDs));
    dispatch(setDataSources(newDs));
}

export default function Main() {
    UpdateStateFromQueryParams();

    const dataSources = useSelector((store) => store.dataSources);
    // get hash from current location
    const { hash } = useLocation();
    // get url params as object
    const paramsMemo = useMemo(() => {
        return new URLSearchParams(hash.replace("#", ""));
    }, [hash]);
    //

    const { cookiesAvailable, cookieAuth } = useCookiesAvailable(paramsMemo);
    const { urlAvailable, url } = useUrlAvailable(paramsMemo);
    useEffect(() => {
        const onlyCookie = cookiesAvailable && !urlAvailable;
        const onlyUrl = !cookiesAvailable && urlAvailable;
        const urlAndCookie =
            cookiesAvailable &&
            cookieAuth !== "" &&
            urlAvailable &&
            urlAvailable !== "";

        if (onlyCookie || onlyUrl || urlAndCookie) {
            // update datasources with url and basic auth
            updateDataSourcesWithUrl(
                dispatch,
                url,
                cookieAuth,
                urlAvailable,
                cookiesAvailable,
                dataSources
            );
        }
    }, []);

    useEffect(() => {
        const urlSetting = {
            url: window.location.hash,
            cookiesAvailable,
        };

        localStorage.setItem(
            btoa("cookie-location"),
            btoa(JSON.stringify(urlSetting))
        );
    }, [cookiesAvailable]);
    const isTabletOrMobile = useMediaQuery({ query: "(max-width: 914px)" });
    const isAutoDark = useMediaQuery({ query: "(prefers-color-scheme: dark)" });
    const dispatch = useDispatch();
    const isSplit = useSelector((store) => store.isSplit);
    const isEmbed = useSelector((store) => store.isEmbed);
    const theme = useSelector((store) => store.theme);
    const autoTheme = useSelector((store) => store.autoTheme);
    const settingsDialogOpen = useSelector((store) => store.settingsDialogOpen);
    const themeMemo = useMemo(() => themes[theme], [theme]);

    useEffect(() => {
        if (autoTheme) {
            const theme = isAutoDark ? "dark" : "light";
            dispatch(setTheme(theme));
            localStorage.setItem(
                "theme",
                JSON.stringify({ theme: theme, auto: autoTheme })
            );
        }
    }, [isAutoDark, autoTheme, dispatch]);
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
