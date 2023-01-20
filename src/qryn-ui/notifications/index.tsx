import { useEffect } from "react";

import { useSelector, useDispatch } from "react-redux";
import { Alert } from "@mui/material";
import { removeAlert } from "../../actions";
import styled from "@emotion/styled";

export const AlertWrapper = styled.div`
    position: fixed;
    bottom: 20px;
    right: 15%;
   
    display: flex;
    flex-direction: column;
    z-index: 10000;
    pointer-events: none;
    .alert {
        margin-top: 10px;
        pointer-events: all;
    }

`

export function Notification() {
    const { notifications }: {notifications: any[]} = useSelector((state) => state) as any;
    const dispatch = useDispatch();
    const handleClose = (index: any) => {
        dispatch(removeAlert(index));
    };
    const Expire = (props: any) => {
        useEffect(() => {
            setTimeout(() => {
                dispatch(removeAlert(props.index));
            }, props.delay);
        }, [props]);

        return <div>{props.children}</div>;
    };

    return (
        <AlertWrapper>
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
        </AlertWrapper>
    );
}
