import { SettingsTitle } from "../styles";
import AddOutlinedIcon from "@mui/icons-material/AddOutlined";
import CachedOutlinedIcon from "@mui/icons-material/CachedOutlined";

import { cx, css } from "@emotion/css";

const SavingLoader = css`
    display: flex;
    align-items: center;
    font-size: 12px;
    &.loading-icon {
        height: 14px;
        width: 14px;
    }
`;

export function SectionHeader(props) {
    const { onClickAdd, isAdd, title, isEditing } = props;

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
