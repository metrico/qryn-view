import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";

import update from "immutability-helper";
import type { FC } from "react";
import { useCallback } from "react";
import { Operations } from "./Operations";
import { css, cx } from "@emotion/css";

// Drag and Drop container for the operation function for query builder

export const OperationsContainerStyles = css`
    width: 100%;
    display: flex;
`;
export interface Item {
    id: number;
    header: any;
    body: any;
    expressions:[];
    opType: string;
}

export interface ContainerState {
    operations: Item[];
}

export type OperationsContainerProps = {
    operations: any[];
    setOperations: (operations: any) => void;
};

// OPERATIONS CONTAINER

export const Container: FC<OperationsContainerProps> = (props:any) => {
    const { operations, setOperations } = props;

    
    const moveItem = useCallback((dragIndex: number, hoverIndex: number) => {
        setOperations((prevCards: Item[]) =>
            update(prevCards, {
                $splice: [
                    [dragIndex, 1],
                    [hoverIndex, 0, prevCards[dragIndex] as Item],
                ],
            })
        );
    }, []);

    const removeItem = useCallback((dragIndex: number) => {
        setOperations((prevCards: Item[]) =>
            update(prevCards, { $splice: [[dragIndex, 1]] })
        );
    }, []);

    const renderCard = useCallback((operation: Item, index: number) => {
        return (
            <Operations
                {...props}
                key={operation.id}
                index={index}
                id={operation.id}
                opType={operation.opType}
                header={operation.header}
                body={operation.body || <></>}
                moveItem={moveItem}
                removeItem={removeItem}
               
            />
        );
    }, []);

    return (
        <div className={cx(OperationsContainerStyles)}>
            {operations.map((operation: any, i: number) =>
                renderCard(operation, i)
            )}
        </div>
    );
};

// Drag and drop base provider
export default function DragAndDropContainer(props: any) {
    return (
        <DndProvider backend={HTML5Backend}>
            <Container {...props} />
        </DndProvider>
    );
}
