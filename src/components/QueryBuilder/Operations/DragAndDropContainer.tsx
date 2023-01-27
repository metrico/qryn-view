import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";

import update from "immutability-helper";
import type { FC } from "react";
import { useCallback } from "react";
import { Operations } from "./Operations";

const style = {
    width: "100%",
    display: "flex",
    margin: "2px",
};

export interface Item {
    id: number;
    header: any;
    body: any;
}

export interface ContainerState {
    operations: Item[];
}

export const Container: FC = (props:any) => {
    const {operations, setOperations} = props

    const moveCard = useCallback((dragIndex: number, hoverIndex: number) => {
        setOperations((prevCards: Item[]) =>
            update(prevCards, {
                $splice: [
                    [dragIndex, 1],
                    [hoverIndex, 0, prevCards[dragIndex] as Item],
                ],
            })
        );
    }, []);

    const removeCard = useCallback((dragIndex:number)=>{
      
        setOperations((prevCards:Item[])=>
        update( prevCards,  { $splice: [[dragIndex,1]]})
        )
    },[])

    const renderCard = useCallback(
        (operation: { id: number; header: any; body?: any }, index: number) => {
            return (
                <Operations
                    key={operation.id}
                    index={index}
                    id={operation.id}
                    header={operation.header}
                    body={operation.body || <></>}
                    moveCard={moveCard}
                    removeCard={removeCard}
                />
            );
        },
        []
    );

    return (
        <>
            <div style={style}>
                {operations.map((operation:any, i:number) => renderCard(operation, i))}
            </div>
        </>
    );
};

export default function DragAndDropContainer(props:any) {
    
    return (
        <DndProvider backend={HTML5Backend}>
            
            <Container {...props}/>
        </DndProvider>
    );
}
