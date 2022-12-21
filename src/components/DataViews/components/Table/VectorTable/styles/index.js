import styled from "@emotion/styled";

export const TableStyles = styled.div`

    
    display: block;
    overflow: auto;
        &::-webkit-scrollbar {
        width: 5px;
    }
    &::-webkit-scrollbar-corner {
        background: transparent;
      }
    &::-webkit-scrollbar-thumb {
        border-radius: 5px;
        background: ${({theme}) => theme.scrollbarThumb};
    }
    .table {
        border-spacing: 0;
        border-radius: 4px;
        font-size: 12px;
        color: ${({theme}) => theme.textColor};
    &::-webkit-scrollbar {
        width: 5px;
    }
    &::-webkit-scrollbar-corner {
        background: transparent;
      }
    &::-webkit-scrollbar-thumb {
        border-radius: 5px;
        background: ${({theme}) => theme.scrollbarThumb};
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
            background: ${({theme}) => theme.buttonHover};
            border-bottom: none;
            padding:3px;
            :last-child {
                box-sizing: unset !important;
            }
        }
        .th,
        .td {
            display: block;
            flex: 1;
            margin: 0;
            justify-content: space-between;
            border-bottom: 1px solid ${({theme}) => theme.buttonBorder};
            border-right: 1px solid ${({theme}) => theme.buttonBorder};
            padding:3px;
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
                background: ${({theme}) => theme.buttonBorder};
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
       // padding: 0.5rem;
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
