import { useMemo } from "react";
import { Navigate } from "react-router-dom";

export default function ProtectedRoute({ children }: { children: any }) {
    const cookieMemo = useMemo(() => {
        let cookie = false;
        let url = "";
        try {
            const key = btoa("cookie-location");
            const hasCookie: any = localStorage.getItem(key);
            const parsed = JSON.parse(atob(hasCookie));
            if (parsed && parsed?.cookiesAvailable) {
                cookie = parsed?.cookiesAvailable;
                url = "/" + parsed?.url;
            } else {
                cookie = false;
            }
        } catch (e) {
            cookie = false;
        }
        return { cookie, url };
    }, []);

    if (cookieMemo.cookie) {
        return <Navigate to={cookieMemo.url} />;
    }
    return children;
}
