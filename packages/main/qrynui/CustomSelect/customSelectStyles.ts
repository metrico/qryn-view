import { css } from '@emotion/css'

import { QrynTheme } from "@ui/theme/types";



export const selectStyles = (theme:QrynTheme) => css`

    text-align: left;
    border: 1px solid ${theme.lightNeutral};
    background: ${theme.background};
    position: relative;
    border-radius: 6px;
    cursor: pointer;
    width: -webkit-max-content;
    width: -moz-max-content;
    width: max-content;
    font-size:12px;


 .dropdown-input {
    padding: 4px 8px;
    display: -webkit-box;
    display: -ms-flexbox;
    background: ${theme.shadow};
    display: flex;
    -webkit-box-align: center;
    -ms-flex-align: center;
    align-items: center;
    -webkit-box-pack: justify;
    -ms-flex-pack: justify;
    justify-content: space-between;
    -webkit-user-select: none;
    -moz-user-select: none;
    -ms-user-select: none;
    user-select: none;
    gap: 7px;
}

.dropdown-input .dropdown-selected-value.placeholder {
    color: ${theme.contrast};
}

.dropdown-tool svg {
    -webkit-transition: all 0.2s ease-in-out;
    transition: all 0.2s ease-in-out;
}

.dropdown-tool svg.translate {
    -webkit-transform: rotate(180deg);
    -ms-transform: rotate(180deg);
    transform: rotate(180deg);
}

.dropdown-menu {
    width: -webkit-max-content;
    width: -moz-max-content;
    width: max-content;
    padding: 5px;
    position: absolute;
    -webkit-transform: translateY(6px);
    -ms-transform: translateY(6px);
    transform: translateY(6px);
    border: 1px solid ${theme.shadow};
    border-radius: 6px;
    overflow: auto;
    background-color: ${theme.background};
    z-index: 99;
    max-height: 312px;
    min-height: 50px;
}

.dropdown-menu::-webkit-scrollbar {
    width: 5px;
}

.dropdown-menu::-webkit-scrollbar-track {
    background: ${theme.background};
}

.dropdown-menu::-webkit-scrollbar-thumb {
    background: ${theme.shadow};
}

.dropdown-menu::-webkit-scrollbar-thumb:hover {
    background: ${theme.shadow};
}

.dropdown-menu.alignment--left {
    left: 0;
}

.dropdown-menu.alignment--right {
    right: 0;
}

.dropdown-item {
    padding: 7px 10px;
    cursor: pointer;
    
    -webkit-transition: background-color 0.35s ease;
    transition: background-color 0.35s ease;
    border-radius: 6px;
    font-weight: 500;
}

.dropdown-item:hover {
    background-color: ${theme.shadow};
    color: ${theme.contrast};
}

.dropdown-item.selected {
    background-color: ${theme.shadow};
    color: ${theme.contrast};
    font-weight: 600;
}

.search-box {
    padding: 5px;
}

.search-box input {
    width: 100%;
    -webkit-box-sizing: border-box;
    box-sizing: border-box;
    padding: 5px;
    background: ${theme.background};
    border: 1px solid ${theme.shadow};
    border-radius: 5px;
    :focus {
        border-color: ${theme.shadow};
        color: ${theme.contrast};
        outline: none;
    }
}

.dropdown-tags {
    display: -webkit-box;
    display: -ms-flexbox;
    display: flex;
    -ms-flex-wrap: wrap;
    flex-wrap: wrap;
    gap: 5px;
}

.dropdown-tag-item {
    background-color: #ff7300;
    color: #FFF;
    font-size: 12px;
    font-weight: 500;
    padding: 2px 4px;
    border-radius: 6px;
    display: -webkit-box;
    display: -ms-flexbox;
    display: flex;
    -webkit-box-align: center;
    -ms-flex-align: center;
    align-items: center;
}

.dropdown-tag-close {
    display: -webkit-box;
    display: -ms-flexbox;
    display: flex;
    -webkit-box-align: center;
    -ms-flex-align: center;
    align-items: center;
    margin-left: 5px;
}
`