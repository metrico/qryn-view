import React, {
    Children,
    cloneElement,
    createContext,
    isValidElement,
    type CSSProperties,
    type ReactElement,
    type ReactNode,
    type SyntheticEvent,
    useContext,
    useMemo,
    useState,
} from "react";

export const qrynTabClasses = {
    selected: "QrynTab-selected",
};

export const qrynButtonClasses = {
    disabled: "QrynTab-disabled",
};

type TabValue = number | string | boolean;

type TabsContextValue = {
    value: TabValue;
    onSelect: (event: SyntheticEvent, value: TabValue) => void;
};

const TabsContext = createContext<TabsContextValue | null>(null);

export type QrynTabsProps = {
    children: ReactNode;
    className?: string;
    defaultValue?: TabValue;
    onChange?: (event: SyntheticEvent, value: TabValue) => void;
    style?: CSSProperties;
    value?: TabValue;
};

export function QrynTabs({
    children,
    className,
    defaultValue = 0,
    onChange,
    style,
    value,
}: QrynTabsProps) {
    const [internalValue, setInternalValue] = useState<TabValue>(defaultValue);
    const selectedValue = value ?? internalValue;

    const contextValue = useMemo(
        () => ({
            value: selectedValue,
            onSelect: (event: SyntheticEvent, nextValue: TabValue) => {
                if (value === undefined) {
                    setInternalValue(nextValue);
                }
                onChange?.(event, nextValue);
            },
        }),
        [onChange, selectedValue, value]
    );

    return (
        <TabsContext.Provider value={contextValue}>
            <div className={className} style={style}>
                {children}
            </div>
        </TabsContext.Provider>
    );
}

export type QrynTabsListProps = {
    children: ReactNode;
    className?: string;
};

export function QrynTabsList({ children, className, ...props }: QrynTabsListProps) {
    return (
        <div className={className} role="tablist" {...props}>
            {Children.map(children, (child, index) => {
                if (!isValidElement(child)) {
                    return child;
                }
                const tab = child as ReactElement<{ value?: TabValue }>;
                return cloneElement(tab, {
                    value: tab.props.value ?? index,
                });
            })}
        </div>
    );
}

export type QrynTabProps = {
    children: ReactNode;
    className?: string;
    disabled?: boolean;
    value?: TabValue;
};

export function QrynTab({
    children,
    className = "",
    disabled = false,
    value = 0,
    ...props
}: QrynTabProps) {
    const tabs = useContext(TabsContext);
    const selected = tabs?.value === value;
    const classes = [
        className,
        selected ? qrynTabClasses.selected : "",
        disabled ? qrynButtonClasses.disabled : "",
    ]
        .filter(Boolean)
        .join(" ");

    return (
        <button
            className={classes}
            disabled={disabled}
            onClick={(event) => tabs?.onSelect(event, value)}
            role="tab"
            type="button"
            {...props}
        >
            {children}
        </button>
    );
}

export type QrynTabPanelProps = {
    children: ReactNode;
    className?: string;
    value: TabValue;
};

export function QrynTabPanel({
    children,
    className,
    value,
    ...props
}: QrynTabPanelProps) {
    const tabs = useContext(TabsContext);
    const hidden = tabs?.value !== value;

    return (
        <div className={className} hidden={hidden} role="tabpanel" {...props}>
            {!hidden && children}
        </div>
    );
}
