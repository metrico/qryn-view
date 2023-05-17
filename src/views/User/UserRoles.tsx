import { useMemo, useState } from "react";
import { cx, css } from "@emotion/css";
import { useTheme } from "../../theme";
import { nanoid } from "nanoid";
import Avatar from "react-avatar";
import CookieIcon from "@mui/icons-material/Cookie";
import { useCookies } from "react-cookie";
import { Switch } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { setCurrentUser } from "./actions";
import DOMPurify from "isomorphic-dompurify";

export interface User {
    id: string;
    name: string;
    role: userType;
    active: boolean;
    selected: boolean;
}

type SUPER_ADMIN_ROLE = "superAdmin"; // super admin should not be editable
type ADMIN_ROLE = "admin";
type USER_ROLE = "user";
type GUEST_ROLE = "guest";

const USER_ROLES = {
    SUPER_ADMIN_ROLE: "superAdmin",
    ADMIN_ROLE: "admin",
    USER_ROLE: "user",
    GUEST_ROLE: "guest",
};

const USER_STORE = "store_user";

export type LocalFN = {
    set: (data: User[]) => void;
    get: () => User[];
};

export const getUsersFromLocal: LocalFN["get"] = () => {
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
};

export const setLocalUsers: LocalFN["set"] = (data) => {
    try {
        localStorage.setItem(USER_STORE, JSON.stringify(data));
    } catch (e) {
        console.log("Error storing users data", e);
    }
};

type userType = ADMIN_ROLE | USER_ROLE | GUEST_ROLE | SUPER_ADMIN_ROLE;

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
            display: flex;
            align-items: center;
        }
        .avatar {
            color: ${theme.textColor};
            font-size: 10px;
            letter-spacing: 1px;
            display: flex;
            align-items: center;
            gap: 4px;
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

        .user-role {
            display: flex;
            align-items: center;
            font-size: 10px;
            text-transform: uppercase;
            color: ${theme.textColor};
            p {
                margin-left: 4px;
            }
        }

        .name-input {
            display: flex;
            align-items: center;
            padding: 4px;
            border: 1px solid ${theme.buttonBorder};
            border-radius: 3px;
            background: ${theme.inputBg};
            color: ${theme.textColor};
            height: 28px;
            font-size: 12px;
        }

        .action-buttons {
            display: flex;
            align-items: center;
            gap: 4px;
            width:80px;
            button {
                display: flex;
                align-items: center;
                flex: 1;
                background: ${theme.widgetContainer};
                border: 1px solid ${theme.buttonBorder};
                border-radius: 3px;
                cursor: pointer;
                color: ${theme.textColor};
                max-width:25px;
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
    font-size: 10px;
    text-transform: uppercase;
    color: ${selected ? theme.primaryDark : theme.textColor} !important;
    color: ${theme.inputBg};
    cursor: pointer;
    display: flex;
    align-items: center;
    border: 1px solid transparent;
    &:hover {
        border: 1px solid ${theme.buttonBorder};
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

    const isSuperAdmin = role === USER_ROLES.SUPER_ADMIN_ROLE;

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
        if (value.trim() === "") {
            value = `Qryn ${role}`;
        }

        let newData = { ...user, name: DOMPurify.sanitize(value) };
        onUserChange(e, newData);
    };

    const onUserConfirm = (e: any) => {
        if (e.key === "Enter") {
            console.log("do validate");
            setUserEdit(() => false);
        }
    };

    const onUserEdit = (e: any) => {
        if (!isSuperAdmin) {
            setUserEdit((prev: boolean) => !prev);
        }
    };

    return (
        <div className={"user-row"}>
            {!userEdit ? (
                <div onClick={onUserEdit} className="avatar">
                    <Avatar name={name} size={"30px"} round={"3px"} />{" "}
                    <span>{name}</span>
                </div>
            ) : (
                <p>
                    <input
                        className={"name-input"}
                        value={name}
                        onChange={onUserNameChange}
                        onKeyDown={onUserConfirm}
                    />
                </p>
            )}

            <div className="user-role">
                Role:{" "}
                {isSuperAdmin ? (
                    <p>Super Admin</p>
                ) : (
                    <select onChange={onRoleChange} defaultValue={role}>
                        <option value={"user"}>User</option>
                        <option value={"admin"}>Admin</option>
                        <option value={"guest"}>Guest</option>
                    </select>
                )}
            </div>

            <p>
                Active{" "}
                {!isSuperAdmin && (
                    <Switch
                        checked={active}
                        size={"small"}
                        inputProps={{ "aria-label": "controlled" }}
                        onChange={onActiveChange}
                    />
                )}
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
                {!isSuperAdmin && (
                    <button
                        title={"remove user"}
                        onClick={(e) => onUserRemove(e, id)}
                    >
                        -
                    </button>
                )}
            </div>
        </div>
    );
};

const UserRows: React.FC = () => {
    const dispatch = useDispatch();
    const currentUser = useSelector((store: any) => store.currentUser);
    const usersFromLocal = useMemo(() => {
        return getUsersFromLocal();
    }, []);

    const [users, setUsers] = useState<User[]>(
        usersFromLocal?.length > 0
            ? usersFromLocal
            : [
                  {
                      id: nanoid(),
                      name: "Qryn Admin",
                      role: "superAdmin",
                      active: true,
                      selected: true,
                  },
              ]
    );

    const [cookie, setCookie] = useCookies(["user-cookie"]);

    console.log(cookie);

    const onUserAdd = (e: any) => {
        setUsers((prev: User[]) => {
            let usersUpdated: User[] = [
                ...prev,
                {
                    id: nanoid(),
                    name: "Qryn User",
                    role: "user",
                    active: true,
                    selected: false,
                },
            ];

            setLocalUsers(usersUpdated);

            return usersUpdated;
        });
    };

    const onUserSelect = (e: any, data: User) => {
        setUsers((prev: User[]) => {
            let newUs = [...prev];

            let userUpdated = newUs?.map((u: User) => {
                if (u.id === data.id) {
                    return { ...data, selected: true };
                }

                return { ...u, selected: false };
            });

            setLocalUsers(userUpdated);

            return userUpdated;
        });

        dispatch(setCurrentUser({ ...data, selected: true }));
    };

    const onUserRemove = (e: any, id: string) => {
        const prev = [...users]?.filter((f: User) => f.id !== id);

        // if user removed is currentuser, go back to admin
        // admin should not be removed if there is no other
        // should create the superAdmin category

        setUsers(() => {
            setLocalUsers(prev);
            return prev;
        });
    };

    const onUserChange = (e: any, data: User) => {
        let prev = [...users];

        let newUsers = prev?.map((user: User) => {
            if (user.id === data.id) {
                return data;
            }
            return user;
        });

        if (data.id === currentUser.id) {
            dispatch(setCurrentUser(data));
        }

        setUsers(() => newUsers);
        setLocalUsers(newUsers);
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
