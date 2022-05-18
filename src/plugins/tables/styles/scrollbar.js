import { css } from "@emotion/css";

export const getScrollbarStyles = (theme) => {
    return {
        customScrollbar: css`
            display: flex;
            flex-grow: 1;
            .scrollbar-view {
                display: flex;
                flex-grow: 1;
                flex-direction: column;
            }
            .track-vertical {
                border-radius: ${theme.shape.borderRadius(2)};
                width: ${theme.spacing(1)} !important;
                right: 0px;
                bottom: ${theme.spacing(0.25)};
                top: ${theme.spacing(0.25)};
            }
            .track-horizontal {
                border-radius: ${theme.shape.borderRadius(2)};
                height: ${theme.spacing(1)} !important;
                right: ${theme.spacing(0.25)};
                bottom: ${theme.spacing(0.25)};
                left: ${theme.spacing(0.25)};
            }
            .thumb-vertical {
                background: ${theme.colors.action.focus};
                border-radius: ${theme.shape.borderRadius(2)};
                opacity: 0;
            }
            .thumb-horizontal {
                background: ${theme.colors.action.focus};
                border-radius: ${theme.shape.borderRadius(2)};
                opacity: 0;
            }
            &:hover {
                .thumb-vertical,
                .thumb-horizontal {
                    opacity: 1;
                    transition: opacity 0.3s ease-in-out;
                }
            }
        `,
    };
};
