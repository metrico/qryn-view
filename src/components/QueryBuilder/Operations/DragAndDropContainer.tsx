import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";

import update from "immutability-helper";
import type { FC } from "react";
import { useCallback, useState } from "react";
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
    console.log(props)
    const {operations, setOperations} = props
    // const [operations, ] = useState([
    //     {
    //         id: 1,
    //         header: <div>Container Header</div>,
    //         body: <div>this bodyent is rendered</div>,
    //     },
    //     {
    //         id: 2,
    //         header: <div>Container Header2 </div>,
    //         body: <div>this bodyent is rendered</div>,
    //     },
    //     {
    //         id: 3,
    //         header: <div>Container Header3</div>,
    //         body: <div>this bodyent is rendered</div>,
    //     },
    //     {
    //         id: 4,
    //         header: <div>Container Header4</div>,
    //         body: <div>this somex bodyent is rendered</div>,
    //     },
    //     {
    //         id: 5, // add header inhere // also id should be array index
    //         header: <div>Container Header5</div>,
    //         body: <div>this Twitter bodyent is rendered</div>,
    //     },
    //     {
    //         id: 6,
    //         header: <div>Container Header6</div>,
    //         body: <div>this ??? bodyent is rendered</div>,
    //     },
    //     {
    //         id: 7,
    //         header: <div>Container Header7</div>,
    //         body: <div>this PROFIT content is rendered</div>,
    //     },
    // ]);

    const moveCard = useCallback((dragIndex: number, hoverIndex: number) => {
            console.log(dragIndex, hoverIndex)
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
        console.log(dragIndex) // should it be the hoverindex?
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
