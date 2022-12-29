import { useMemo } from "react";
import { useSelector } from "react-redux";
import { themes } from "../../../../../theme/themes";

export const useTheme = () => {
    const theme = useSelector(
        (store: { theme: "light" | "dark" }) => store.theme
    );
    return useMemo(() => {
        return themes[theme];
    }, [theme]);
};

export function useTimeLabel() {
    return useSelector((store: any) => store.label);
}
