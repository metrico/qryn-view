import type { Identifier, XYCoord } from "dnd-core";
import type { FC } from "react";
import { useRef } from "react";
import { useDrag, useDrop } from "react-dnd";
import { useTheme } from "../../DataViews/components/QueryBuilder/hooks";
import OperationContainer from "./OperationContainer";

export const ItemTypes = {
    CARD: "card",
};

const style = (theme: any) => ({
    border: `1px solid ${theme.buttonBorder}`,
    backgroundColor: `${theme.inputBg}`,
    fontSize: "12px",
    cursor: "move",
    display: "flex",
    margin: "4px",
    borderRadius: "3px",
});

export interface OperationProps {
    id: any;
    header: any;
    index: number;
    body: any;
    rate: string;
    prev_args:string;
    after_args:string;
    moveItem: (dragIndex: number, hoverIndex: number) => void;
    removeItem: any;
    opType: string;
    expressions: any[];
    conversion_function: string;
    labelValue: string;
    filterText: string;
    lineFilter: string;
    binaryOperation: any;
    labelFilter: any;
    quantile: string | number
    kValue: number;
    labels: any[];
    labelOpts: string[];
    onExpChange: (expressions: any[]) => void;
    setOperations: any;
    addBinary(index:number):void

}

interface DragItem {
    index: number;
    id: string;
    type: string;
}

export const Operations: FC<OperationProps> = (props) => {
    const {
        id,
        header,
        rate,
        opType,
        index,
        body,
        moveItem,
        removeItem,
        kValue,
        quantile,
        labelFilter,
        filterText,
        lineFilter,
        conversion_function,
        labelValue,
        labelOpts,
        binaryOperation,
    } = props;

    const ref = useRef<HTMLDivElement>(null);

    const theme = useTheme();
    const [{ handlerId }, drop] = useDrop<
        DragItem,
        void,
        { handlerId: Identifier | null }
    >({
        accept: ItemTypes.CARD,
        collect(monitor) {
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
            // Determine mouse position
            const clientOffset = monitor.getClientOffset();

            // Get pixels to the top
            const hoverClientX =
                (clientOffset as XYCoord).x - hoverBoundingRect.left;


            if (dragIndex < hoverIndex && hoverClientX < hoverMiddleX) {
                return;
            }

            if (dragIndex > hoverIndex && hoverClientX > hoverMiddleX) {
                return;
            }

      
            moveItem(dragIndex, hoverIndex);

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
                {...props}
                rate={rate}
                id={id}
                header={header}
                opType={opType}
                body={body}
                index={index}
                kValue={kValue}
                quantile={quantile}
                labelFilter={labelFilter}
                binaryOperation={binaryOperation}
                conversion_function={conversion_function}
                labelValue={labelValue}
                lineFilter={lineFilter}
                labelOpts={labelOpts}
                filterText={filterText}
                removeItem={removeItem}
            />
        </div>
    );
};
