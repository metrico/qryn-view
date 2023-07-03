export const menuItemStyle = { padding: "0 14px" };

export const typoStyle = (theme:any) => ({
    fontSize: "12px",
    color: theme.contrast,
});

export const formControlLabelStyle = (label:boolean) => ({
    padding: "0",
    marginRight: 0,
    cursor: !label ? "not-allowed" : "default",
});
