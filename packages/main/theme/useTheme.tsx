import { useSelector } from "react-redux";
import { lightTheme } from "./light";
import { darkTheme } from "./dark";
import { useMemo } from "react";

const useTheme = () => {
    const themeSet = useSelector((store: any) => store.theme);
    return useMemo(() => {
        if (themeSet === "dark") return darkTheme;
        return lightTheme;
    }, [themeSet]);
};

export default useTheme;
