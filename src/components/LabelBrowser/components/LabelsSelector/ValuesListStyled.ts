import styled from "@emotion/styled";

const ValuesListStyled = styled.div`
    background: ${({theme}: any) => theme.widgetContainer};

    .valuesList {
        transition: 0.02s all;
        display: flex;
        flex-wrap: wrap;
        flex: 1;
        flex-direction: column;
        font-size: 13px;
        margin: 5px 0px;
        border-radius: 4px;
        transition: 0.02s all;
        .valuelist-title {
            display: flex;
            flex-direction: column;
            flex: 1;
            justify-content: space-between;
            font-size: 1em;
            flex: 1;
            margin: 5px;
        }
        .valuelist-content {
            display: flex;
            font-size: 14px;
            align-items: center;
            flex-wrap: wrap;
            max-height: 500px;
            overflow: auto;
            .metric-label {
                background: gray;
            }
        }
        .valuelist-filter {
            display: flex;
            flex: 1;
            flex-direction: column;

            .valuelist-filter-title {
                font-size: 0.75em;
            }
            input {
                color: white;
                background: $black-quoise;
                padding: 6px 3px;
                border-radius: 4px;
                flex: 1;
                margin: 0px 3px;
                outline: none;
                border: none;
            }
        }
        &::-webkit-scrollbar {
            width: 10px;
        }
        &::-webkit-scrollbar-corner {
            background: transparent;
        }
        &::-webkit-scrollbar-thumb {
            border-radius: 10px;
            background: $grey-light;
        }
    }

    .valuelist-content {
        small {
            color: ${({theme}: any) => theme.textColor};
            background: ${({theme}: any) => theme.buttonDefault};
            border: 1px solid ${({theme}: any) => theme.buttonBorder};

            margin: 2px;
            padding: 3px 6px;
            border-radius: 3px;
            line-height: 1.5;
            font-size: 12px;
            cursor: pointer;
            align-items: center;
            white-space: nowrap;
            text-overflow: ellipsis;
            overflow: hidden;
            max-width: 40ch;
            transition: .5s all;
            &:hover {
                background: ${({ theme }: any) => theme.buttonHover};
            }
            &.metric {
                color: ${({theme}: any) => theme.buttonText};
                background: ${({theme}: any) => theme.primaryDark};
            }
        }
    }


    
    .values-container {
        .values-container-column {
            display: flex;
            flex-wrap: wrap;
            max-width: 100%;
            .values-column {
                margin: 5px;
                border-radius: 3px;
                height: fit-content;
                min-width: 278px;
                max-width: 278px;
                flex: 1;
                background: ${({theme}: any) => theme.buttonHover};

                .column {
                    border: 1px solid ${({theme}: any) => theme.buttonBorder};
                    background: ${({theme}: any) => theme.widgetContainer};
                    border-top: none;
                    max-height: 350px;
                    &::-webkit-scrollbar {
                        width: 10px;
                        color: #58585898;
                        background: #ffffff1f;
                    }
                    &::-webkit-scrollbar-corner {
                        background: transparent;
                    }
                    &::-webkit-scrollbar-thumb {
                        border-radius: 10px;
                        background: $grey-light;
                    }
                }
                .values-column-title {
                    padding: 4px;
                    font-size: 1em;
                    border-radius: 4px 4px 0px 0px;
                    display: flex;
                    flex: 1;
                    transition: 0.02s all;
                    justify-content: space-between;
                    color: ${({theme}: any) => theme.textColor};
                    background: ${({theme}: any) => theme.widgetContainer};
                    border: 1px solid ${({theme}: any) => theme.buttonBorder};
                    .close-column {
                        align-self: flex-end;
                        justify-self: end;
                        cursor: pointer;
                        padding: 2px;
                        border-radius: 10px;
                        display: flex;
                        align-items: center;
                        justify-content: center;

                        font-size: 10px;
                        &:hover {
                            background: $dark-quoise-hover;

                            color: black;
                        }
                    }
                }
            }
        }
    }
`;

export default ValuesListStyled;
