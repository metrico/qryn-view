import { useMemo } from "react";
import { useSelector } from "react-redux";
import { themes } from "../../../../../theme/themes";
import { OPERATORS } from "../consts";
import { multiType } from "../helpers";


export const useTheme = () => {
    const theme = useSelector(
        (store: { theme: "light" | "dark" }) => store.theme
    );
    return useMemo(() => {
        return themes[theme];
    }, [theme]);
};

export const useLabelOpts = (valuesOpts: any) => {
    return useMemo(() => {
        if (valuesOpts && Object.keys(valuesOpts)?.length > 0) {
            return Object.keys(valuesOpts)
                ?.filter((f) => f !== "__name__")
                ?.map((m) => ({ label: m, value: m }));
        }
        return [];
    }, [valuesOpts]);
};

export const useValueSelectOpts = (valuesOpts: any, labelValue: any) => {
    return useMemo(() => {
        if (valuesOpts[labelValue.value]) {
            return valuesOpts[labelValue.value]?.map((val: any) => ({
                label: val,
                value: val,
            }));
        } else {
            return [{ label: "", value: "" }];
        }
    }, [labelValue.value, valuesOpts]);
};

export const useDefaultValue = (defaultValue: any, type: any, keyVal: any) => {
    return useMemo(() => {
        if (type === "operator") {
            return { value: defaultValue, label: OPERATORS[defaultValue] };
        }
        if (type === "value") {
            return keyVal.values;
        }

        return { key: defaultValue, label: defaultValue };
    }, [defaultValue]);
};


export const useIsMulti = (type: any, keyVal: any) => {
    return useMemo(() => {
        if (type === "metrics") {
            return false;
        }

        if (multiType(keyVal) && type === "value") {
            return true;
        }
        return false;
    }, [type, keyVal]);
};
