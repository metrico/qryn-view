import styled from "@emotion/styled";
import { useMemo } from "react";
import QueryItem from "./QueryItem";

const QueriesContainerStyled = styled.div`
    background: ${({ theme }: { theme: any }) => `${theme.mainBgColor}`};
    border: 1px solid ${({ theme }: { theme: any }) => `${theme.buttonBorder}`};
    border-radius: 3px;
    padding: 6px;
    margin: 6px;
`;
export default function QueriesContainer(props: any) {
    const { queries } = props;
    const queriesLoad = useMemo(()=>queries,[queries])
    return (
        <QueriesContainerStyled>
            {queriesLoad &&
                queriesLoad.map((query: any, idx: number) => (
                    <QueryItem 
                    {...props} 
                    data={query} 
                    key={idx} />
                ))}
        </QueriesContainerStyled>
    );
}
