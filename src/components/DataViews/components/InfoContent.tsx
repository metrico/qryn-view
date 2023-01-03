import { StyledInfoContent } from "../styled";

const InfoLabels = ({ labels }: { labels: any }) => {
    if (labels?.length > 0)
        return (
            <p>
                Labels:
                {labels.map((val: any, key: any) => (
                    <span className={"label"} key={key}>
                        {val}
                    </span>
                ))}
            </p>
        );
    return null;
};

interface InfoTitleProps {
    idRef: string;
    expr: string;
    queryType: string;
}

const InfoTitle = ({ idRef, expr, queryType }: InfoTitleProps) => (
    <>
        <h4>{idRef}</h4>
        <div>
            <p>{expr}</p>
        </div>
        <p>Query Type: {queryType}</p>
    </>
);

interface InfoContentProps {
    expr: string;
    idRef: string;
    labels: any;
    limit: any;
    queryType: any;
    total: any;
}

export const InfoContent = ({
    expr,
    idRef,
    labels,
    limit,
    queryType,
    total,
}: InfoContentProps) => {
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
