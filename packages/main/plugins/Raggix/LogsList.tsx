type Props = {
    logs: any;
    open: boolean;
    loading: boolean;
    theme: any;
};
const LogStyle = (theme: any) => ({
    color: theme.contrast,
    fontSize: "12px",
    fontFamily: "monospace",
    display: "flex",
});
const LogsList: React.FC<Props> = (props) => {
    const { logs, open, loading, theme } = props;
    if (logs?.values?.length > 0 && open && !loading) {
        return (
            <div style={{ padding: "10px" }}>
                {logs?.values?.length > 0 &&
                    logs?.values?.map((log: any, idx: any) => {
                        const [ts, text] = log;
                        return (
                            <div style={LogStyle(theme)} key={idx}>
                                <span style={{ margin: "2px" }}>{ts}</span>{" "}
                                <span style={{ margin: "2px" }}>{text}</span>
                            </div>
                        );
                    })}
            </div>
        );
    }
    return <></>;
};

export default LogsList;
