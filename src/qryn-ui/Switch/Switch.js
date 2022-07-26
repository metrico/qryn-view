import { useState } from "react";

import { styles } from "./styles";

const getBtnPos = (key, arr) => {
    const arrLen = arr.length;
    return key === 0 ? "first" : key === arrLen - 1 ? "last" : "center";
};

export default function QueryTypeSwitch(props) {
    const { Label, SwitchCont, SwitchBtn } = styles;
    const { options, defaultActive, onChange, label } = props;

    const [activeBtn, setActiveBtn] = useState(defaultActive);

    function setButtonValue(value) {
        setActiveBtn(value);
        onChange(value);
    }

    return (
        <>
            <Label>{label}</Label>
            <SwitchCont>
                {options &&
                    options.map((value, key, arr) => (
                        <SwitchBtn
                            key={key}
                            selected={value.value === activeBtn}
                            position={getBtnPos(key, arr)}
                            onClick={(e) => setButtonValue(value.value)}
                        >
                            {value.label}
                        </SwitchBtn>
                    ))}
            </SwitchCont>
        </>
    );
}
