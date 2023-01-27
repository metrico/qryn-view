import type { Identifier, XYCoord } from "dnd-core";
import type { FC } from "react";
import { useRef } from "react";
import { useDrag, useDrop } from "react-dnd";
import { useTheme } from "../../DataViews/components/QueryBuilder/hooks";
import OperationContainer from "./OperationContainer";

export const ItemTypes = {
    CARD: "card",
};

const style = (theme:any) => ({
    border: `1px solid ${theme.buttonBorder}`,
    backgroundColor: `${theme.inputBg}`,
    fontSize: "12px",
    cursor: "move",
    display: "flex",
    margin: "4px",
    borderRadius: "3px",
});

export interface CardProps {
    id: any;
    header: any;
    index: number;
    body: any;
    moveItem: (dragIndex: number, hoverIndex: number) => void;
    removeItem: any;
    opType:string;
}

interface DragItem {
    index: number;
    id: string;
    type: string;
}

export const Operations: FC<CardProps> = ({
    id,
    header,
    opType,
    index,
    body,
    moveItem,
    removeItem,
}) => {
    const ref = useRef<HTMLDivElement>(null);

    const theme = useTheme()
    const [{ handlerId }, drop] = useDrop<
        DragItem,
        void,
        { handlerId: Identifier | null }
    >({
        accept: ItemTypes.CARD,
        collect(monitor) {
            //console.log(monitor)
            return {
                handlerId: monitor.getHandlerId(),
            };
        },
        hover(item: DragItem, monitor) {
            if (!ref.current) {
                return;
            }
            const dragIndex = item.index;
            const hoverIndex = index;

            // Don't replace items with themselves
            if (dragIndex === hoverIndex) {
                return;
            }

            // Determine rectangle on screen
            const hoverBoundingRect = ref.current?.getBoundingClientRect();

            // Get hotizontal middle
            const hoverMiddleX =
                (hoverBoundingRect.right - hoverBoundingRect.left) / 2;
            // console.log(hoverMiddleX)
            // Determine mouse position
            const clientOffset = monitor.getClientOffset();

            // Get pixels to the top
            const hoverClientX =
                (clientOffset as XYCoord).x - hoverBoundingRect.left;

            // Only perform the move when the mouse has crossed half of the items height
            // When dragging downwards, only move when the cursor is below 50%
            // When dragging upwards, only move when the cursor is above 50%

            // Dragging downwards
            if (dragIndex < hoverIndex && hoverClientX < hoverMiddleX) {
                return;
            }

            // Dragging upwards
            if (dragIndex > hoverIndex && hoverClientX > hoverMiddleX) {
                return;
            }

            // Time to actually perform the action
            moveItem(dragIndex, hoverIndex);

            // Note: we're mutating the monitor item here!
            // Generally it's better to avoid mutations,
            // but it's good here for the sake of performance
            // to avoid expensive index searches.
            item.index = hoverIndex;
        },
    });

    const [{ isDragging }, drag] = useDrag({
        type: ItemTypes.CARD,
        item: () => {
            return { id, index };
        },
        collect: (monitor: any) => ({
            isDragging: monitor.isDragging(),
        }),
    });

    const opacity = isDragging ? 0.5 : 1;
    drag(drop(ref));
    return (
        <div
            ref={ref}
            style={{ ...style(theme), opacity }}
            data-handler-id={handlerId}
        >
            <OperationContainer
                id={id}
                header={header}
                opType={opType}
                body={body}
                index={index}
                removeItem={removeItem}
            />
        </div>
    );
};
