import { useEffect } from "react";

import { useSelector, useDispatch } from "react-redux";
import { Alert } from "@mui/material";
import { removeAlert } from "../../actions";

export function Notification() {
    const { notifications } = useSelector((state) => state);
    const dispatch = useDispatch();
    const handleClose = (index) => {
        dispatch(removeAlert(index));
    };
    const Expire = (props) => {
        useEffect(() => {
            setTimeout(() => {
                dispatch(removeAlert(props.index));
            }, props.delay);
        }, [props]);

        return <div>{props.children}</div>;
    };

    return (
        <div className={"alertWrapper"}>
            {notifications.map((notification, index) => {
                if (notification.visible) {
                    return (
                        <Expire key={index} delay="4000" index={index}>
                            <div className={"alert"}>
                                <Alert
                                    elevation={6}
                                    variant="filled"
                                    onClose={() => handleClose(index)}
                                    severity={notification.type}
                                    sx={{ width: "100%" }}
                                >
                                    {notification.message}
                                </Alert>
                            </div>
                        </Expire>
                    );
                } else {
                    return undefined;
                }
            })}
        </div>
    );
}
