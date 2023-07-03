import { useMemo } from "react";

export const RangesSelector = (props: any) => {
    const { initial, onChange } = props;
    const rangeOpts: any[] = useMemo(() => {
        return ["$__interval", "1m", "5m", "10m", "1h", "24h"]?.map(
            (m: string) => ({ name: m, value: m })
        );
    }, []);

    return (
        <select defaultValue={initial} onChange={onChange}>
            {rangeOpts.map(
                (opt: { name: string; value: string }, key: number) => (
                    <option key={key} value={opt.value}>
                        {opt.name}
                    </option>
                )
            )}
        </select>
    );
};

export const QuantilesSelector = (props: any) => {
    const { initial, onChange } = props;
    const rangeOpts: any[] = useMemo(() => {
        return ["0.25", "0.5", "0.75", "0.9", "0.99"]?.map((m: string) => ({
            name: m,
            value: m,
        }));
    }, []);

    return (
        <select defaultValue={initial} onChange={onChange}>
            {rangeOpts.map(
                (opt: { name: string; value: string }, key: number) => (
                    <option key={key} value={opt.value}>
                        {opt.name}
                    </option>
                )
            )}
        </select>
    );
};

export const BinaryOperatorsSelector = (props: any) => {
    // intial:   divide
    const { initial, onChange, opts } = props;

    return (
        <select defaultValue={initial} onChange={onChange}>
            {opts.map((opt: { name: string; value: string }, key: number) => (
                <option key={key} value={opt.value}>
                    {opt.name}
                </option>
            ))}
        </select>
    );
};

export const ConversionFunctionSelector = (props: any) => {
    const { initial, onChange } = props;
    const rangeOpts: any[] = useMemo(() => {
        return ["duration", "duration_seconds", "bytes", ""]?.map(
            (m: string) => ({ name: m, value: m })
        );
    }, []);

    return (
        <select defaultValue={initial} onChange={onChange}>
            {rangeOpts.map(
                (opt: { name: string; value: string }, key: number) => (
                    <option key={key} value={opt.value}>
                        {opt.name}
                    </option>
                )
            )}
        </select>
    );
};

export const RangeLabelsSelector = (props: any) => {
    const { initial, onChange, labels } = props;

    const labelOpts: any[] = useMemo(() => {
        return (
            labels?.map((m: string) => ({ name: m, value: m })) || [
                { name: "Select Label", value: "" },
            ]
        );
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    return (
        <select defaultValue={initial} onChange={onChange}>
            {labelOpts.map(
                (opt: { name: string; value: string }, key: number) => (
                    <option key={key} value={opt.value}>
                        {opt.name}
                    </option>
                )
            )}
        </select>
    );
};
