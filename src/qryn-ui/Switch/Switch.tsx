import { useState } from "react";

import { styles } from "./Switch.styles";

const getBtnPos = (key: number, arr: any[]) => {
    const arrLen = arr.length;
    return key === 0 ? "first" : key === arrLen - 1 ? "last" : "center";
};

export default function QueryTypeSwitch(props: any) {
    const { Label, SwitchCont, SwitchBtn } = styles;
    const { options, defaultActive, onChange, label } = props;

    const [activeBtn, setActiveBtn] = useState(defaultActive);

    function setButtonValue(value: any) {
        setActiveBtn(value);
        onChange(value);
    }

    return (
        <>
            <Label>{label}</Label>
            <SwitchCont>
                {options &&
                    options.map((value: any, key: number, arr: any[]) => (
                        <SwitchBtn
                            key={key}
                            selected={value.value === activeBtn}
                            position={getBtnPos(key, arr)}
                            onClick={(e: any) => setButtonValue(value.value)}
                        >
                            {value.label}
                        </SwitchBtn>
                    ))}
            </SwitchCont>
        </>
    );
}
