export const ChartLabelList = (props) => {
    const handleLabelClick = (val) => {
        val.isVisible = !val.isVisible
        props.onLabelClick(props.labels,val)
       
    }
    return (
        <div
            style={{
                display: "flex",
                flexWrap: "wrap",
            }}
        >
            {props.labels.length &&
                props.labels.map((val, idx) => (
                    <div
                        key={idx}
                        style={{
                            fontSize: "12px",
                            color: "#ddd",
                            fontFamily: "sans-serif",
                            display: "flex",
                            alignItems: "center",
                            margin: "2px",
                            padding: "4px",
                            cursor: "pointer",
                            opacity: !val.isVisible ? "1" : ".75"

                        } }
                        
                        onClick={ e => handleLabelClick(val)}
                    >
                        <div
                            style={{
                                height: "4px",
                                width: "16px",
                                marginRight: "8px",
                                background: val.color,
                            }}
                        >
                            {" "}
                        </div>
                        <span>{val.label}</span>
                    </div>
                ))}
        </div>
    );
};