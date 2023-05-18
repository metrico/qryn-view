import { useMemo } from "react";
import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";

export default function ProtectedRoute({ children }: { children: any }) {
    const userType = useSelector((store:any)=> store.currentUser.role)
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

    if (cookieMemo.cookie || (userType !== 'admin' || userType !== 'superAdmin')) {
        return <Navigate to={"/"} />;
    }
    return children;
}
