import { SettingsTitle } from "../styles";
import { Button } from "../ui";
import EditOutlinedIcon from "@mui/icons-material/EditOutlined";
import AddOutlinedIcon from "@mui/icons-material/AddOutlined";

export function SectionHeader(props) {
    const {
        onClickSubmit,
        onClickCancel,
        isEditing,
        onClickEdit,
        onClickAdd,
        isEdit,
        isAdd,
        title,
    } = props;
    return (
        <SettingsTitle>
            {title}
            <div className="edit-buttons">
            {isAdd &&
                (
                    <>
                        <AddOutlinedIcon
                            fontSize={"small"}
                            style={{
                                cursor: "pointer",
                                display: isEditing ? "none" : "flex",
                            }}
                            onClick={onClickAdd}
                        />
                    </>
                )}
                {isEdit && (
                    <>
                        <Button
                            value={"Save"}
                            onClick={onClickSubmit}
                            editing={isEditing}
                            primary={true}
                        />

                        <Button
                            value={"Cancel"}
                            onClick={onClickCancel}
                            editing={isEditing}
                            primary={false}
                        />

                        <EditOutlinedIcon
                            fontSize={"small"}
                            style={{
                                cursor: "pointer",
                                display: isEditing ? "none" : "flex",
                                marginLeft: "30px",
                            }}
                            onClick={onClickEdit}
                        />
                    </>
                )}
            
            </div>
        </SettingsTitle>
    );
}
