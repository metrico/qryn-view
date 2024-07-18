import { SettingsTitle } from "../styles";
import AddOutlinedIcon from "@mui/icons-material/AddOutlined";
import CachedOutlinedIcon from "@mui/icons-material/CachedOutlined";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import setIsDatasourceSaved from "../store/setIsDataSourceSaved";
import useTheme from "@ui/theme/useTheme";
import { SavingLoader } from "./header.styles";
import { ConfirmSave } from "./ConfirmSave";
import { FieldErrors } from "./FieldErrors";
import { Tooltip } from "@mui/material";

export type SectionHeaderProps = {
    isEditing?: boolean;
    isEdit?: boolean;
    isAdd?: boolean;
    title?: string;
    fieldErrors?: any;
    onClickAdd?: (e?: any) => void;
};

export function SectionHeader(props: SectionHeaderProps) {
    const { onClickAdd, isAdd, title, isEditing, fieldErrors } = props;
    const theme = useTheme();
    const dispatch: any = useDispatch();
    const [isSaved, setIsSaved] = useState(false);

    useEffect(() => {
        if (isEditing) {
            setTimeout(() => {
                setIsSaved(true);
                dispatch(setIsDatasourceSaved(true));
            }, 800);

            setIsSaved(false);
        }

        setIsSaved(false);

        return () => {
            setIsSaved(false);
        };
    }, [isEditing]);

    return (
        <SettingsTitle>
            <div style={{ display: "flex", alignItems: "center", gap: ".5em" }}>
                {title}
                {isAdd && (
                    <>
                        <Tooltip title={`Add ${title}`}>
                            <AddOutlinedIcon
                                fontSize={"small"}
                                style={{
                                    cursor: "pointer",
                                    display: "flex",
                                }}
                                onClick={onClickAdd}
                            />
                        </Tooltip>
                    </>
                )}
            </div>

            <div className="edit-buttons">
                {isEditing && (
                    <div className={SavingLoader}>
                        <CachedOutlinedIcon
                            style={{ height: "13px", width: "13px" }}
                        />{" "}
                        Saving ...
                    </div>
                )}

                <FieldErrors fieldErrors={fieldErrors} />

                {isSaved && (
                    <ConfirmSave theme={theme} setIsSaved={setIsSaved} />
                )}
            </div>
        </SettingsTitle>
    );
}
