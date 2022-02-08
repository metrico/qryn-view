export const Legend = (props) => {
    const { title, text } = props;
    return (
        <div className="legend-container">
            <p className="legend-title">{title}</p>
            <small className="legend-text">
                {text}
            </small>
        </div>
    );
};