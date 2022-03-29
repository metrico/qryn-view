import { ApiSelector } from "./components/apiselector/ApiSelector";
import { StatusBarSelectors } from "./components/statusbarselectors/StatusBarSelectors";
import Logo from "./assets/cloki-logo.png";
import styled from "@emotion/styled";
import { useState, useEffect, useRef } from "react";

import SettingsDrawer from "../../plugins/settingsdrawer/SettingsDrawer";
import { useSelector, useDispatch } from "react-redux";
import { setSettingsMenuOpen } from "./actions/setMenuSettingsOpen";
import DisplaySettingsIcon from "@mui/icons-material/DisplaySettings";

const MenuButton = styled.button`
    display: none;
    background:none;
    border:none;
    margin-left:10px;
    color:${(props) => (props.isactive ? "orange" : "#ddd")};
    cursor:pointer;
    &:active{
        color:${(props) => (props.isActive ? "orange" : "#ddd")};
    }
    @media screen and (max-width: 850px) {
        display: flex;
    }
    @media screen and (max-width: 560px) {
        flex:1;
        justify-content: flex-end;
    }
`;

const StatusBarCont = styled.div`
    display: flex;
    justify-content: space-between;
    padding: 5px 10px;
`;

const StatusCont = styled.div`
    input {
        color: orange;
        background: #121212;
        border: none;
        margin: 3px;
        padding: 3px 6px;
        font-size: 13px;
        border-radius: 3px;
        &.limit {
            width: 50px;
        }
        &.url {
            width: 175px;
        }
        &.date-time-range {
            width: 120px;
        }
    }

    @media screen and (max-width: 565px) {
        display: none;
    }
`;

export default function StatusBar() {
    const dispatch = useDispatch();
    const menuOpen = useSelector((store) => store.settingsMenuOpen);

    function openSettings() {
        const shouldOpen = menuOpen ? false : true;

        dispatch(setSettingsMenuOpen(shouldOpen));
    }

    return (
        <StatusBarCont>
            <div className="logo-section">
                <img
                    src={Logo}
                    alt={"cLoki View"}
                    height={"28px"}
                    className={"logo"}
                />
    <MenuButton isactive={menuOpen} onClick={openSettings}>
                <DisplaySettingsIcon />
            </MenuButton>
                <ApiSelector />
            </div>

            <StatusCont>
                <StatusBarSelectors />
            </StatusCont>
        
        </StatusBarCont>
    );
}
