import styled from '@emotion/styled'

export const Container: any = styled.div<{theme:any}>`
    position: absolute;
    left: 0;
    top: 0;
    background: ${({ theme }) => theme.background};
    display: flex;
    flex-direction: culumn;
    justify-content: center;
    color: ${({ theme }) => theme.contrast};
    flex: 1;
    height: 100%;
    width: 100%;

    .body-cont {
        max-width: 1440px;
        padding: 10px;
        margin: 10px;
        border-radius: 3px;
        flex: 1;
        background: ${({ theme }) => theme.shadow};
        overflow-y: auto;
        overflow-x: hidden;
    }
    .ds-header {
        padding: 10px;
        padding-bottom: 20px;
        font-size: 24px;
        flex: 1;
        display: flex;
        width: 100%;
        justify-content: space-between;
        align-items: center;
        padding-left: 0px;
        .logo {
            margin-right: 10px;
        }
    }
    .ds-cont {
        margin-bottom: 10px;
        border: 1px solid ${({ theme }) => theme.accentNeutral};
        border-radius: 3px;
        overflow-y: auto;
    }
    .ds-item {
        padding: 10px;
        //    margin-bottom: 10px;
        border-radius: 3px 3px 0px 0px;
        padding-bottom: 14px;
        display: flex;
        .logo {
            padding: 10px;
            padding-right: 20px;
            padding-left: 0px;
        }
        .ds-text {
            display: flex;
            flex-direction: column;
            flex: 1;
        }
        .ds-type {
            font-size: 18px;
            padding: 10px;
            padding-left: 0px;
            color: ${({ theme }) => theme.contrast};
        }
        small {
            font-size: 12px;
        }
        .setting-icon {
            justify-self: flex-end;
            cursor: pointer;
        }
        .ds-settings {
            background: ${({ theme }) => theme.shadow};
        }
    }
`;