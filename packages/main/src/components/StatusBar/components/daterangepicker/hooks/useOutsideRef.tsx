import React, { useEffect } from "react";

export default function useOutsideRef(onOpen: (value: boolean) => void) {
    const ref = React.createRef<HTMLDivElement>();

    const handleHideDateRange = (event: any) => {
        if (event.key === "Escape") {
            onOpen(false);
        }
    };
    const handleClickOutside = (event: any) => {
        if (ref.current && !ref.current.contains(event.target)) {
            onOpen(false);
        }
    };
    useEffect(() => {
        document.addEventListener("keydown", handleHideDateRange, true);
        document.addEventListener("click", handleClickOutside, true);

        return () => {
            // Unbind the event listener on clean up
            document.removeEventListener("keydown", handleHideDateRange, true);
            document.removeEventListener("click", handleClickOutside, true);
        };
    });
    return { ref };
}
