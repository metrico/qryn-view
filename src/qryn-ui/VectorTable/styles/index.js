import styled from "@emotion/styled";

export const TableStyles = styled.div`

    
    display: block;
    overflow: auto;
        &::-webkit-scrollbar {
        width: 10px;
    }

    &::-webkit-scrollbar-thumb {
        border-radius: 10px;
        background: ${(props) => props.theme.scrollbarThumb};
    }
    .table {
        border-spacing: 0;
        border-radius: 4px;
        font-size: 12px;
        color: ${(props) => props.theme.textColor};
    &::-webkit-scrollbar {
        width: 10px;
    }

    &::-webkit-scrollbar-thumb {
        border-radius: 10px;
        background: ${(props) => props.theme.scrollbarThumb};
    }
        .tr {
            display: block;
            :last-child {
                .td {
                    border-bottom: 0;
                }
            }
        }
        .th {
            background: ${(props) => props.theme.buttonHover};
            border-bottom: none;
            :last-child {
                box-sizing: unset !important;
            }
        }
        .th,
        .td {
            display: block;
            flex: 1;
            margin: 0;
            padding: 0.5rem;
            justify-content: space-between;
            border-bottom: 1px solid ${(props) => props.theme.buttonBorder};
            border-right: 1px solid ${(props) => props.theme.buttonBorder};

            position:relative;
            white-space: nowrap;
            overflow: hidden;
            .show-add-labels {
                display: none;
            }
            &:hover {
                .show-add-labels {
                    display: flex;
                    align-items: center;
                }
            }

            :last-child {
                border-right: 0;
                padding-right: 0px;
            }

            .resizer {
                display: inline-block;
                background: ${(props) => props.theme.buttonBorder};
                width: 3px;
                height: 100%;
                position: absolute;
                right: 0;
                top: 0;
                transform: translateX(50%);
                z-index: 1;
                touch-action:none;
                &.isResizing {
                    background: blue;
                }
            }
        }
    }

    .pagination {
        padding: 0.5rem;
    }
`;

export const getStyles = (props, align = "left") => [
    props,
    {
        style: {
            alignItems: "center",
            display: "flex",
        },
    },
];
