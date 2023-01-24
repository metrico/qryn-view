import { SettingsTitle } from "../styles";
import AddOutlinedIcon from "@mui/icons-material/AddOutlined";
import CachedOutlinedIcon from "@mui/icons-material/CachedOutlined";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import { cx, css } from "@emotion/css";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import setIsDatasourceSaved from "../store/setIsDataSourceSaved";
import { useTheme } from "../../../components/DataViews/components/QueryBuilder/hooks";
import ErrorOutlineIcon from "@mui/icons-material/ErrorOutline";

const confirmSaveLoaderIcon = css`
    height: 12px !important;
    width: 12px !important;
    color: white;
    margin: 0px 4px;
`;

const confirmSaveLoaderCont = (theme: any) => css`
    display: flex;
    align-items: center;
    background: ${theme.primaryDark};
    color: white;
    font-size: 11px;
    padding: 4px;
    border-radius: 3px;
    margin-right: 10px;
    cursor: pointer;
    span {
        margin-right: 4px;
        font-weight: bold;
    }
`;

const inputErrorCont = css`
    display: flex;
    align-items: center;
    background: #b62c14;
    color: white;
    font-size: 12px;
    padding: 4px;
    border-radius: 3px;
    margin-right: 10px;
    cursor: pointer;
    span {
        margin-right: 4px;
        font-weight: bold;
    }
`;

const SavingLoader = css`
    display: flex;
    align-items: center;
    font-size: 12px;
    &.loading-icon {
        height: 14px;
        width: 14px;
    }
`;

const ConfirmSave = ({ setIsSaved }: { setIsSaved: any }) => {
    const theme = useTheme();
    return (
        <div
            className={cx(confirmSaveLoaderCont(theme))}
            onClick={(e) => setIsSaved(false)}
        >
            <CheckCircleIcon className={cx(confirmSaveLoaderIcon)} />{" "}
            <span>Saved</span>
        </div>
    );
};

const InputErrorWarning = ({ errorText }: { errorText: string }) => {
    return (
        <div className={cx(inputErrorCont)}>
            <ErrorOutlineIcon className={cx(confirmSaveLoaderIcon)} />{" "}
            <span>{errorText}</span>
        </div>
    );
};

export function SectionHeader(props: any) {
    const { onClickAdd, isAdd, title, isEditing, fieldErrors } = props;
    const dispatch = useDispatch();
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
            {title}
            <div className="edit-buttons">
                {isEditing && (
                    <div className={SavingLoader}>
                        <CachedOutlinedIcon
                            style={{ height: "13px", width: "13px" }}
                        />{" "}
                        Saving ...
                    </div>
                )}
                {fieldErrors?.protocol && (
                    <InputErrorWarning
                        errorText={
                            "Insecure Mixed Content. Mixing HTTP and HTTPS is insecure and is not supported."
                        }
                    />
                )}
                {fieldErrors?.url && (
                    <InputErrorWarning errorText={"Please complete API URL"} />
                )}
                {isSaved && <ConfirmSave setIsSaved={setIsSaved} />}

                {isAdd && (
                    <>
                        <AddOutlinedIcon
                            fontSize={"small"}
                            style={{
                                cursor: "pointer",
                                display: "flex",
                            }}
                            onClick={onClickAdd}
                        />
                    </>
                )}
            </div>
        </SettingsTitle>
    );
}
