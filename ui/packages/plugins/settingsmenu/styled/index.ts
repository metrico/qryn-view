import styled from "@emotion/styled";

export const MenuButton = styled.button`
    border: none;
    background: ${(props: any) => props.theme.neutral};
    border: 1px solid ${(props: any) => props.theme.accentNeutral};
    color: ${(props: any) => props.theme.contrast};
    padding: 3px 12px;
    border-radius: 3px;
    font-size: 12px;
    cursor: pointer;
    user-select: none;
    line-height: 20px;
    display: flex;
    align-items: center;
    margin-left: 10px;
    height: 26px;
`;

export const MenuStyles = (theme: any) => ({
    color: `${theme.contrast}`,
    overflow: "visible",
    fontSize: "12px",
    background: `${theme.shadow}`,
    border: `1px solid ${theme.accentNeutral}`,
    mt: 1.5,
    "& .MuiAvatar-root": {
        width: 32,
        height: 32,
        ml: -0.5,
        mr: 1,
    },

    "&:before": {
        content: '""',
        display: "block",
        position: "absolute",
        top: 0,
        right: 14,
        width: 10,
        height: 10,
        borderLeft: `1px solid ${theme.accentNeutral}`,
        borderTop: `1px solid ${theme.accentNeutral}`,
        bgcolor: `${theme.shadow}`,
        transform: "translateY(-50%) rotate(45deg)",
        zIndex: 0,
    },
    "& .icon": {
        fontSize: "16px",
        marginRight: "4px",
        color: `${theme.contrast}`,
    },
    "& .item": {
        fontSize: "12px",
        color: `${theme.contrast}`,
    },
});
