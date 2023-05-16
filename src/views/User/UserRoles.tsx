import { useState } from "react";
import { cx, css } from "@emotion/css";
import { useTheme } from "../../theme";
import { nanoid } from "nanoid";
import Avatar from "react-avatar";
import CookieIcon from "@mui/icons-material/Cookie";
import { useCookies } from "react-cookie";
import { Switch } from "@mui/material";
import { useDispatch } from "react-redux";
import { setCurrentUser } from "./actions";

type ADMIN_ROLE = "admin";
type USER_ROLE = "user";
type GUEST_ROLE = "guest";

const USER_STORE = "store_user";

export function getUsersFromLocal() {
    let users: User[] = [];
    try {
        let usersFromLocal = localStorage.getItem(USER_STORE);

        if (usersFromLocal && typeof usersFromLocal === "string") {
            let parsed = JSON.parse(usersFromLocal);

            if (parsed && parsed?.length > 0) {
                users = parsed;
                return users;
            }
        }
        return users;
    } catch (e) {
        console.log("Error on retrieving users from localstorage: ", e);
        return users;
    }
}

type userType = ADMIN_ROLE | USER_ROLE | GUEST_ROLE;

export interface User {
    id: string;
    name: string;
    role: userType;
    active: boolean;
    selected: boolean;
}

const UserRolesStyles = (theme: any) => css`
    background: ${theme.viewBg};
    padding: 10px;
    display: flex;
    flex: 1;
    flex-direction: column;
    align-items: center;
    .cont {
        display: flex;
        width: 100%;
        border-radius: 3px;
        max-width: 1280px;
        background: ${theme.widgetContainer};
        border: 1px solid ${theme.buttonBorder};
        flex: 1;
        flex-direction: column;
    }
    .user-row {
        display: flex;
        align-items: center;

        margin: 5px;
        justify-content: space-between;
        border: 1px solid ${theme.buttonBorder};
        padding: 10px;
        border-radius: 3px;
        height: 30px;

        p {
            color: ${theme.textColor};
            font-size: 10px;
            letter-spacing: 1px;
            text-transform: uppercase;
        }

        select {
            margin-left: 4px;
            font-size: 12px;
            color: ${theme.textColor};
            padding: 4px;
            border-radius: 3px;
            background: ${theme.inputBg};
        }

        .action-buttons {
            display: flex;
            align-items: center;
            gap: 4px;
            button {
                display: flex;
                align-items: center;
                flex: 1;
                background: ${theme.widgetContainer};
                border: 1px solid ${theme.buttonBorder};
                border-radius: 3px;
                cursor: pointer;
                color: ${theme.textColor};
                &:hover {
                    background: ${theme.mainBgColor};
                }
                .cookie-icon {
                    font-size: 15px;
                    color: ${theme.textColor};
                }
            }
        }
    }
`;

const UserSelected = (theme: any, selected: boolean) => css`
    padding: 4px;
    border-radius: 3px;
    font-size: 12px;
    text-transform: uppercase;
    color: ${selected ? theme.primaryDark : theme.textColor} !important;
    //background:${selected ? theme.primaryDark : theme.inputBg};
    color: ${theme.inputBg};
    cursor: pointer;
    display: flex;
    align-items: center;
    &:hover {
        background: ${theme.buttonBorder};
    }
    &:after {
        content: "";
        margin-left: 4px;
        display: flex;
        width: 10px;
        height: 10px;
        border-radius: 3px;
        background: ${selected ? theme.primaryDark : theme.widgetContainer};
        border: 1px solid ${theme.primaryDark};
    }
`;

type UserRowProps = {
    user: User;
    onUserAdd(e: any): void;
    onUserRemove(e: any, id: string): void;
    onUserChange(e: any, data: User): void;
    onUserCookie(e: any, data: User): void;
    onUserSelect(e: any, data: User): void;
};

const UserRow: React.FC<UserRowProps> = (props) => {
    const {
        user,
        onUserAdd,
        onUserChange,
        onUserRemove,
        onUserCookie,
        onUserSelect,
    } = props;
    const { name, role, active, id } = user;

    const theme = useTheme();

    const [userEdit, setUserEdit] = useState(false);

    const onRoleChange = (e: any) => {
        let value = e?.target?.value;
        let newData = { ...user, role: value };

        onUserChange(e, newData);
    };

    const onActiveChange = (e: any) => {
        let value = e?.target?.checked;
        let newData = { ...user, active: value };

        onUserChange(e, newData);
    };

    const onUserNameChange = (e: any) => {
        let value = e?.target?.value;
        let newData = { ...user, name: value };
        onUserChange(e, newData);
    };

    const onUserConfirm = (e: any) => {
        if (e.key === "Enter") {
            console.log("do validate");
            setUserEdit(() => false);
        }
    };

    const onUserEdit = (e: any) => {
        setUserEdit((prev: boolean) => !prev);
    };


    return (
        <div className={"user-row"}>
            {!userEdit ? (
                <p onClick={onUserEdit}>
                    <Avatar name={name} size={"30px"} round={"3px"} /> {name}
                </p>
            ) : (
                <p>
                    <input
                        value={name}
                        onChange={onUserNameChange}
                        onKeyDown={onUserConfirm}
                    />
                </p>
            )}

            <p>
                Role
                <select onChange={onRoleChange} defaultValue={role}>
                    <option value={"user"}>User</option>
                    <option value={"admin"}>Admin</option>
                    <option value={"guest"}>Guest</option>
                </select>
            </p>

            <p>
                Active{" "}
                <Switch
                    checked={active}
                    size={"small"}
                    inputProps={{ "aria-label": "controlled" }}
                    onChange={onActiveChange}
                />
            </p>

            <div
                onClick={(e) => onUserSelect(e, user)}
                className={cx(UserSelected(theme, user.selected))}
            >
                Current User{" "}
            </div>

            <div className={"action-buttons"}>
                <button
                    title={"generate cookie from user"}
                    onClick={(e) => onUserCookie(e, user)}
                >
                    <CookieIcon className="cookie-icon" />
                </button>
                <button title={"add user"} onClick={onUserAdd}>
                    +
                </button>
                <button
                    title={"remove user"}
                    onClick={(e) => onUserRemove(e, id)}
                >
                    -
                </button>
            </div>
        </div>
    );
};
// should add active / inactive
const UserRows: React.FC = () => {
    const dispatch = useDispatch();

    const [users, setUsers] = useState<User[]>([
        {
            id: nanoid(),
            name: "Qryn Admin",
            role: "admin",
            active: true,
            selected: true,
        },
    ]);

    const [cookie, setCookie] = useCookies(["user-cookie"]);
    const onUserAdd = (e: any) => {
        setUsers((prev: User[]) => [
            ...prev,
            {
                id: nanoid(),
                name: "Qryn User",
                role: "user",
                active: true,
                selected: false,
            },
        ]);
        // min req: name / role
    };

    // remove only if user !== admin

    const onUserSelect = (e: any, data: User) => {
        setUsers((prev: User[]) => {
            let newUs = [...prev];

            return newUs?.map((u: User) => {
                if (u.id === data.id) {
                    return { ...data, selected: true };
                }

                return { ...u, selected: false };
            });
        });

        dispatch(setCurrentUser({ ...data, selected: true }));
    };

    const onUserRemove = (e: any, id: string) => {
        const prev = [...users]?.filter((f: User) => f.id !== id);
        setUsers(() => prev);
    };

    const onUserChange = (e: any, data: User) => {
        let prev = [...users];

        let newUsers = prev?.map((user: User) => {
            if (user.id === data.id) {
                return data;
            }
            return user;
        });

        setUsers(() => newUsers);
    };

    const onUserCookie = (e: any, data: User) => {
        try {
            setCookie("user-cookie", btoa(JSON.stringify(data)));
        } catch (e) {
            console.log(e, "Error on setting user cookie");
        }
    };

    return (
        <>
            {users?.length > 0 &&
                users.map((user: User, key: number) => (
                    <UserRow
                        key={key}
                        user={user}
                        onUserAdd={onUserAdd}
                        onUserChange={onUserChange}
                        onUserRemove={onUserRemove}
                        onUserCookie={onUserCookie}
                        onUserSelect={onUserSelect}
                    />
                ))}
        </>
    );
};

//CRUD user

const UserRoles: React.FC = () => {
    const theme = useTheme();

    return (
        <div className={cx(UserRolesStyles(theme))}>
            <div className="cont">
                <UserRows />
            </div>
        </div>
    );
};

export default UserRoles;

