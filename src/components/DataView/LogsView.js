import React, { PureComponent, memo, createRef } from "react";
import memoize from "memoize-one";
import { VariableSizeList as List, areEqual } from "react-window";
import ValueTags from "./ValueTags";
import { ThemeProvider } from "@emotion/react";
import { themes } from "../../theme/themes";
import { LogRow, RowLogContent, RowTimestamp } from "./styled";
import { useSelector } from "react-redux";
import { formatDate, getRowColor } from "./helpers";

// If list items are expensive to render,
// Consider using PureComponent to avoid unnecessary re-renders.
// https://reactjs.org/docs/react-api.html#reactpurecomponent

const Row = ({ data, index, style, onUpdate }) => {
    // Data passed to List as "itemData" is available as props.data
    const { items, toggleItemActive } = data;
    const item = items[index];
    console.log(style);

    return (
        <LogRow
            rowColor={getRowColor(item.tags)}
            onClick={() =>{
              toggleItemActive(index)
              onUpdate(index)
            } }
            style={{
                ...style,...{    display: "flex",
                height: (item.showLabels ? "100px" : "35px") + " !important"}
            
            }}
        >
            <div className="log-ts-row">
                <RowTimestamp>{formatDate(item.timestamp)}</RowTimestamp>
                <RowLogContent>{item.text}</RowLogContent>
            </div>

            {item.showLabels && <ValueTags tags={item.tags} />}
        </LogRow>
    );
};

// This helper function memoizes incoming props,
// To avoid causing unnecessary re-renders pure Row components.
// This is only needed since we are passing multiple props with a wrapper object.
// If we were only passing a single, stable value (e.g. items),
// We could just pass the value directly.
const createItemData = memoize((items, toggleItemActive) => ({
    items,
    toggleItemActive,
}));

// In this example, "items" is an Array of objects to render,
// and "toggleItemActive" is a function that updates an item's state.
function Example({ height, items, toggleItemActive, width }) {
    // Bundle additional data to list items using the "itemData" prop.
    // It will be accessible to item renderers as props.data.
    // Memoize this data to avoid bypassing shouldComponentUpdate().

    // calculate item size after tags ammount
    const listRef = createRef(null)
    console.log(items)
    const itemData = createItemData(items, toggleItemActive);
    const theme = useSelector((store) => store.theme);
    const limit = useSelector((store)=> store.limit)
    function calculateItemSize(idx) {
      return items[idx].showLabels ?   Object.keys(items[idx].tags).length * 25 + 40 : 35
      
    }
   function updateIndex(idx){
     listRef.current.resetAfterIndex(idx, true)
   }

    return (
        <ThemeProvider theme={themes[theme]}>
            <List
               ref={listRef}
                height={height}
                itemCount={items.length}
                itemData={itemData}
                itemSize={calculateItemSize}
                width={width}
               
            >
               {Row}
            </List>
        </ThemeProvider>
    );
}

export class ExampleWrapper extends PureComponent {
    constructor(props) {
        super(props);
        const { messages } = props || [];
        this.state = {
            messages,
        };
    }

    toggleItemActive = (index) =>
        this.setState((prevState) => {
            const message = prevState.messages[index];
            const messages = prevState.messages.concat();
            messages[index] = {
                ...message,
                showLabels: !message.showLabels,
            };
            return { messages };
        });
    // items == messages
    render() {
        return (
            <Example
                height={window.innerHeight}
                items={this.state.messages}
                toggleItemActive={this.toggleItemActive}
                width={window.innerWidth}
            />
        );
    }
}
