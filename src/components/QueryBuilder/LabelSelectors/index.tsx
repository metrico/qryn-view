import { ThemeProvider } from "@emotion/react";
import styled from "@emotion/styled";
import { nanoid } from "nanoid";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { themes } from "../../../theme/themes";
import LabelSelectorItem from "./LabelSelectorsItem";

interface Theme {
    widgetContainer: string;
    textColor: string;
}

const LabelsCont = styled.div`
    background: ${({ theme }: { theme: Theme }) => theme.widgetContainer};
    color: ${({ theme }: { theme: Theme }) => theme.textColor};
    padding: 10px;
    .label {
        font-size: 12px;
        padding: 5px;
    }
    .label-groups {
        display:flex;
        flex-wrap:wrap;
        align-ittems:center;
        .label-group {
            margin: 3px;
            .opt-icon {
               margin-left:8px;
            }
            
        }
    }

`;

interface RootState {
    theme: "light" | "dark";
}

interface LabelState {
    id: string;
    label: string;
    op: string;
    value: string;
}

const LABEL_ITEM = { id: nanoid(), label: "", op: "equals", value: "" };

export default function LabelSelectors(props: any) {
    const [labelGroups, setLabelGroups] = useState<LabelState[]>([
        { id: nanoid(), label: "", op: "equals", value: "" },
    ]);

    const [labelsString, setLabelsString] = useState("");

    useEffect(() => {
        console.log(labelGroups);
    }, [labelGroups]);

    const theme = useSelector((store: RootState) => store.theme);

    const labelsToString = (labels: LabelState[]) => {
        let strOpen = "{";
        let strClose = "{";
        let or = "|";

        for (let label of labels) {
            let lb = "";
            let vl = "";
        }
    };

    const onSelectorChange = (label: LabelState) => {
        console.log(label, "LABEL");

        const prevLabelsCp = [...labelGroups];

        const hasPrev = prevLabelsCp.some((s) => s.id === label.id);

        if (!hasPrev || !label) return;

        const newLabels = prevLabelsCp.map((m: LabelState) => {
            if (m.id === label.id) {
                return { ...m, ...label };
            }
            return m;
        });

        setLabelGroups(newLabels);
    };

    const onSelectorRemove = (label: LabelState) => {
        setLabelGroups((prev) => {
            const hasPrev = prev.some((f) => f.id === label.id);
            if (!hasPrev) return prev;

            return prev.filter((f) => f.id !== label.id);
        });
    };

    const onSelectorAdd = (label: LabelState) => {
        setLabelGroups((prev) => {
            return [...prev, { ...label, id: nanoid() }];
        });
    };

    return (
        <ThemeProvider theme={themes[theme]}>
            <LabelsCont theme={themes[theme]}>
                <div className="label">Labels</div>
                <div className="label-groups">
                    {labelGroups.map((item, index) => (
                        <LabelSelectorItem
                            key={index}
                            {...props}
                            item={item}
                            onSelectorChange={onSelectorChange}
                            onSelectorAdd={onSelectorAdd}
                            onSelectorRemove={onSelectorRemove}
                        />
                    ))}
                </div>
            </LabelsCont>
        </ThemeProvider>
    );
}
