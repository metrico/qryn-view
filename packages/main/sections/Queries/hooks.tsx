import { useMemo } from "react";

export const useIdRefs = (name: string) =>
    useMemo(() => {
        const alpha = Array.from(Array(26)).map((e, i) => i + 65);
        const alphabet = alpha.map(
            (x) =>
                name?.slice(0, 1)?.toUpperCase() + "-" + String.fromCharCode(x)
        );
        return alphabet;
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);
