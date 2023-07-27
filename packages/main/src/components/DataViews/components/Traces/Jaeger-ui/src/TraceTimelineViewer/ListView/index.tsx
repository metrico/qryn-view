import React, { useEffect, useRef, useState } from "react";
import createPositions, { Positions } from "./Positions";

type TWrapperProps = {
    style: React.CSSProperties;
    ref: (elm: HTMLDivElement | null) => void;
    onScroll?: () => void;
};

type TListViewProps = {
    dataLength: number;
    getIndexFromKey: (key: string) => number;
    getKeyFromIndex: (index: number) => string;
    initialDraw?: number;
    itemHeightGetter: (index: number, key: string) => number;
    itemRenderer: (
        itemKey: string,
        style: React.CSSProperties,
        index: number,
        attributes: Record<string, string>
    ) => React.ReactNode;
    itemsWrapperClassName?: string;
    viewBuffer: number;
    viewBufferMin: number;
    windowScroller?: boolean;
    scrollElement?: Element;
};

const DEFAULT_INITIAL_DRAW = 100;

const ListView: React.FC<TListViewProps> = (props) => {
    const { viewBufferMin, viewBuffer, initialDraw } = props;
    const [yPositions, setYPositions] = useState<Positions>(
        createPositions(200)
    );
    const knownHeights = useRef<Map<string, number>>(new Map());
    const startIndexDrawn = useRef(2 ** 20);
    const endIndexDrawn = useRef(-(2 ** 20));
    const [startIndex, setStartIndex] = useState(0);
    const [endIndex, setEndIndex] = useState(0);
    const [viewHeight, setViewHeight] = useState(-1);
    const [scrollTop, setScrollTop] = useState(-1);
    const [isScrolledOrResized, setIsScrolledOrResized] = useState(false);
    const [htmlTopOffset, setHtmlTopOffset] = useState(-1);
    const [windowScrollListenerAdded, setWindowScrollListenerAdded] =
        useState(false);
    const htmlElm = document.documentElement as any;
    const wrapperElm = useRef<Element | null>(null);
    const itemHolderElm = useRef<HTMLElement | null>(null);

    const getViewHeight = () => viewHeight;

    const getBottomVisibleIndex = (): number => {
        const bottomY = scrollTop + viewHeight;
        return yPositions.findFloorIndex(bottomY, getHeight);
    };

    const getTopVisibleIndex = (): number =>
        yPositions.findFloorIndex(scrollTop, getHeight);

    const getRowPosition = (index: number): { height: number; y: number } =>
        yPositions.getRowPosition(index, getHeight);

    const scrollToIndex = (index: number) => {
        const { scrollElement } = props;
        const scrollElementTop =
            scrollElement?.getBoundingClientRect().top || 0;
        const listViewTop =
            (scrollElement?.scrollTop || 0) +
            (itemHolderElm.current?.getBoundingClientRect().top || 0);
        const listViewOffset = listViewTop - scrollElementTop;

        const itemOffset = getRowPosition(index).y;

        props.scrollElement?.scrollTo({
            top: itemOffset + listViewOffset - 80,
        });
    };

    const isViewChanged = () => {
        if (!wrapperElm.current) {
            return false;
        }
        const useRoot = props.windowScroller;
        const clientHeight = useRoot
            ? htmlElm.clientHeight
            : wrapperElm.current.clientHeight;
        const scrollTop = useRoot
            ? htmlElm.scrollTop
            : wrapperElm.current.scrollTop;
        return clientHeight !== viewHeight || scrollTop !== scrollTop;
    };

    const calcViewIndexes = () => {
        const useRoot = props.windowScroller;
        if (!useRoot) {
            if (!wrapperElm.current) {
                setViewHeight(-1);
                setStartIndex(0);
                setEndIndex(0);
                return;
            }
            setViewHeight(wrapperElm.current.clientHeight);
            setScrollTop(wrapperElm.current.scrollTop);
        } else {
            setViewHeight(window.innerHeight - htmlTopOffset);
            setScrollTop(window.scrollY);
        }
        const yStart = scrollTop;
        const yEnd = scrollTop + viewHeight;
        setStartIndex(yPositions.findFloorIndex(yStart, getHeight));
        setEndIndex(yPositions.findFloorIndex(yEnd, getHeight));
    };

    const positionList = () => {
        setIsScrolledOrResized(false);
        if (!wrapperElm.current) {
            return;
        }
        calcViewIndexes();
        const maxStart =
            props.viewBufferMin > startIndex
                ? 0
                : startIndex - props.viewBufferMin;
        const minEnd =
            props.viewBufferMin < props.dataLength - endIndex
                ? endIndex + props.viewBufferMin
                : props.dataLength - 1;
        if (
            maxStart < startIndexDrawn.current ||
            minEnd > endIndexDrawn.current
        ) {
            forceUpdate();
        }
    };

    const initWrapper = (elm: HTMLDivElement | null) => {
        if (!props.windowScroller) {
            return;
        }
        wrapperElm.current = elm;
        if (elm) {
            setViewHeight(elm.clientHeight);
        }
    };

    const initItemHolder = (elm: HTMLElement | null) => {
        itemHolderElm.current = elm;
        scanItemHeights();
    };

    const scanItemHeights = () => {
        const getIndexFromKey = props.getIndexFromKey;
        if (!itemHolderElm.current) {
            return;
        }
        let lowDirtyKey: string | null = null;
        let highDirtyKey: string | null = null;
        let isDirty = false;
        const nodes = itemHolderElm.current.childNodes;
        const max = nodes.length;
        for (let i = 0; i < max; i++) {
            const node: HTMLElement = nodes[i] as any;
            const itemKey = node.getAttribute("data-item-key");
            if (!itemKey) {
                console.warn("itemKey not found");
                continue;
            }
            const measureSrc: Element = node.firstElementChild || node;
            const observed = measureSrc.clientHeight;
            const known = knownHeights.current.get(itemKey);
            if (observed !== known) {
                knownHeights.current.set(itemKey, observed);
                if (!isDirty) {
                    isDirty = true;
                    lowDirtyKey = highDirtyKey = itemKey;
                } else {
                    highDirtyKey = itemKey;
                }
            }
        }
        if (lowDirtyKey != null && highDirtyKey != null) {
            const imin = getIndexFromKey(lowDirtyKey);
            const imax =
                highDirtyKey === lowDirtyKey
                    ? imin
                    : getIndexFromKey(highDirtyKey);
            yPositions.calcHeights(imax, getHeight, imin);
            forceUpdate();
        }
    };

    const getHeight = (i: number) => {
        const key = props.getKeyFromIndex(i);
        const known = knownHeights.current.get(key);
        return known != null && known === known
            ? known
            : props.itemHeightGetter(i, key);
    };

    const forceUpdate = () => {
        setYPositions({ ...yPositions });
    };

    useEffect(() => {
        if (props.windowScroller) {
            if (wrapperElm.current) {
                const { top } = wrapperElm.current.getBoundingClientRect();
                setHtmlTopOffset(top + htmlElm.scrollTop);
            }
            window.addEventListener("scroll", onScroll);
            setWindowScrollListenerAdded(true);
        } else {
            wrapperElm.current = props.scrollElement;
            wrapperElm.current?.addEventListener("scroll", onScroll);
        }

        return () => {
            if (windowScrollListenerAdded) {
                window.removeEventListener("scroll", onScroll);
            } else {
                wrapperElm.current?.removeEventListener("scroll", onScroll);
            }
        };
    }, [props.windowScroller]);

    useEffect(() => {
        if (itemHolderElm.current) {
            scanItemHeights();
        }
    }, [itemHolderElm.current]);

    useEffect(() => {
        if (!wrapperElm.current) return;
        if (isViewChanged()) {
            setIsScrolledOrResized(true);
            window.requestAnimationFrame(positionList);
        }
    }, [viewHeight, scrollTop]);

    const onScroll = () => {
        if (!isScrolledOrResized) {
            setIsScrolledOrResized(true);
            window.requestAnimationFrame(positionList);
        }
    };

    const items: React.ReactNode[] = [];
    let start;
    let end;

    yPositions.profileData(props.dataLength);

    if (!wrapperElm.current) {
        start = 0;
        end =
            initialDraw !== undefined && initialDraw < props.dataLength
                ? initialDraw - 1
                : props.dataLength - 1;
    } else {
        if (isViewChanged()) {
            calcViewIndexes();
        }
        const maxStart =
            viewBufferMin > startIndex ? 0 : startIndex - viewBufferMin;
        const minEnd =
            viewBufferMin < props.dataLength - endIndex
                ? endIndex + viewBufferMin
                : props.dataLength - 1;
        if (
            maxStart < startIndexDrawn.current ||
            minEnd > endIndexDrawn.current
        ) {
            start = viewBuffer > startIndex ? 0 : startIndex - viewBuffer;
            end = endIndex + viewBuffer;
            if (end >= props.dataLength) {
                end = props.dataLength - 1;
            }
        } else {
            start = startIndexDrawn.current;
            end =
                endIndexDrawn.current > props.dataLength - 1
                    ? props.dataLength - 1
                    : endIndexDrawn.current;
        }
    }

    yPositions.calcHeights(end, getHeight, start || -1);
    startIndexDrawn.current = start;
    endIndexDrawn.current = end;

    for (let i = start; i <= end; i++) {
        const { y: top, height } = yPositions.getRowPosition(i, getHeight);
        const style: React.CSSProperties = {
            height,
            top,
            position: "absolute",
        };
        const itemKey = props.getKeyFromIndex(i);
        const attrs = { "data-item-key": itemKey };
        items.push(props.itemRenderer(itemKey, style, i, attrs));
    }

    const wrapperProps: TWrapperProps = {
        style: { position: "inherit" },
        ref: initWrapper,
    };
    if (!props.windowScroller) {
        wrapperProps.onScroll = onScroll;
        wrapperProps.style.height = "100%";
        wrapperProps.style.overflowY = "auto";
    }

    return (
        <div {...wrapperProps}>
            <div
                style={{
                    position: "relative",
                    height: yPositions.getEstimatedHeight(),
                }}
            >
                <div
                    style={{
                        position: "absolute",
                        top: 0,
                        margin: 0,
                        padding: 0,
                    }}
                    className={props.itemsWrapperClassName}
                    ref={initItemHolder}
                >
                    {items}
                </div>
            </div>
        </div>
    );
};

ListView.defaultProps = {
    initialDraw: DEFAULT_INITIAL_DRAW,
    itemsWrapperClassName: "",
    windowScroller: false,
};

export default ListView;
