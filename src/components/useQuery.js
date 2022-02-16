import { useMemo } from 'react';
import { useLocation } from "react-router-dom";
export function useQuery() {
    const {hash}  = useLocation() 
    return useMemo(() => new URLSearchParams(hash.replace(/#/,"")), [hash])
}