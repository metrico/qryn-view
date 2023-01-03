import { useEffect, useRef } from "react";
import { setRangeOpen } from '../../../../../actions/setRangeOpen';
import { useDispatch } from 'react-redux';

export default function useOutsideRef() {
 const dispatch = useDispatch()
    const ref = useRef(null);

    const handleHideDateRange = (event) => {
        if (event.key === "Escape") {
            dispatch(setRangeOpen(false));
        }
    };
    const handleClickOutside = (event) => {
        if (ref.current && !ref.current.contains(event.target)) {
            dispatch(setRangeOpen(false));
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
