import { forwardRef, useEffect, useState } from "react";
import { EmptyOption } from "./consts";
import Select from "react-select";
import { cStyles } from "./styles";
import { updateSelectedOption, selectTheme } from "./helpers";
import { useDefaultValue, useIsMulti } from "./hooks";

export const InputSelect = forwardRef((props: any, ref: any) => {
    const {
        selectOpts,
        mainTheme,
        minWidth,
        onChange,
        defaultValue,
        type,
        keyVal,
        objId,
        labelsLength,
    } = props;

    const defaultValueMemo = useDefaultValue(defaultValue, type, keyVal);

    const [selectedOption, setSelectedOption] = useState(
        defaultValueMemo || EmptyOption
    );

    const isMulti = useIsMulti(type, keyVal);

    useEffect(() => {
        updateSelectedOption(setSelectedOption, type, keyVal);
          // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [labelsLength]);

    const onsSelectValueChange = (e: any) => {
        setSelectedOption((prev: any) => e);
        onChange({ value: e, id: objId });
    };

    return (
        <Select
            id={objId}
            isMulti={isMulti}
            options={selectOpts}
            styles={cStyles(mainTheme, minWidth)}
            value={selectedOption}
            ref={ref}
            defaultValue={defaultValueMemo}
            theme={(theme) => selectTheme(theme, mainTheme)}
            onChange={onsSelectValueChange}
        />
    );
});
