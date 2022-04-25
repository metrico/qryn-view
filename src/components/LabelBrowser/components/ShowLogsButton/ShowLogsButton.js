import { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { LoadingBtn, ShowLogsBtn } from "../styled";

export default function ShowLogsButton({
    disabled,
    onClick,
    isMobile,
    
}) {
    const SHOW_LOGS = "Show Logs";

const loading = useSelector(store => store.loading)

    const [isLoading,setIsLoading] = useState(loading)



    return (
        <>
            {loading ? (


<LoadingBtn
disabled={disabled}
type="submit"
onClick={onClick}

isMobile={isMobile}
>
{SHOW_LOGS}
</LoadingBtn>
        
            ) : (
                <ShowLogsBtn
                disabled={disabled}
                type="submit"
                onClick={onClick}
             
                isMobile={isMobile}
            >
                {SHOW_LOGS}
            </ShowLogsBtn>
            )}
        </>
    );
}
