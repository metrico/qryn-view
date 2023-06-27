import { useSelector } from "react-redux";

export function useTimeLabel() {
    return useSelector((store: any) => store.label);
}
