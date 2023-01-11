import { useDispatch, useSelector } from "react-redux";
import { themes } from "../theme/themes";
import { UpdateStateFromQueryParams } from "../helpers/UpdateStateFromQueryParams";
import { useMediaQuery } from "react-responsive";
import { setTheme } from "../actions";
import { useMemo, useEffect} from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { MobileView } from "./Main/MobileView";
import { DesktopView } from "./Main/DesktopView";
import { useCookiesAvailable, useUrlAvailable } from "./Main/hooks";
import { updateDataSourcesWithUrl, updateDataSourcesFromLocalUrl } from "./Main/helpers";

export default function Main() {


    const navigate = useNavigate();
    const dataSources = useSelector((store: any) => store.dataSources);
    // get hash from current location
    const { hash } = useLocation();
    // get url params as object
    const paramsMemo = useMemo(() => {
        return new URLSearchParams(hash.replace("#", ""));
    }, [hash]);
    //
    UpdateStateFromQueryParams();
    
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
        // else, take url from location
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
        } else {
            updateDataSourcesFromLocalUrl(dataSources, dispatch, navigate);
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
    const isSplit = useSelector((store: any) => store.isSplit);
    const isEmbed = useSelector((store: any) => store.isEmbed);
    const theme = useSelector((store: any) => store.theme);
    const autoTheme = useSelector((store: any) => store.autoTheme);
    const settingsDialogOpen = useSelector(
        (store: any) => store.settingsDialogOpen
    );
    const themeMemo = useMemo(() => (themes as any)[theme], [theme]);

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
