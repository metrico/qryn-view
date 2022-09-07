import { StyledInfoContent } from "../styled";

const InfoLabels = ({ labels }) => {
    if (labels?.length > 0)
        return (
            <p>
                Labels:
                {labels.map((val, key) => (
                    <span className={"label"} key={key}>
                        {val}
                    </span>
                ))}
            </p>
        );
    return null;
};

const InfoTitle = ({ idRef, expr, queryType }) => (
    <>
        <h4>{idRef}</h4>
        <div>
            <p>{expr}</p>
        </div>
        <p>Query Type: {queryType}</p>
    </>
);

export const InfoContent = ({
    expr,
    idRef,
    labels,
    limit,
    queryType,
    total,
}) => {
    const titleProps = {
        idRef,
        expr,
        queryType,
    };
    const infoLabelsProps = { labels };
    return (
        <StyledInfoContent>
            <InfoTitle {...titleProps} />
            <InfoLabels {...infoLabelsProps} />
            <p>Limit: {limit}</p>
            <p>Total: {total}</p>
        </StyledInfoContent>
    );
};
