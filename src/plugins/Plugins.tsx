import { css, cx } from "@emotion/css";
import React, { useMemo, useState, useEffect } from "react"; // this page should have the 'plugins' list with title, image and description
import { useTheme } from "../theme";
import ExtensionOutlinedIcon from "@mui/icons-material/ExtensionOutlined";
import { LocalPluginsManagement } from "./PluginManagerFactory";
import { Switch } from "@mui/material";
import { useSelector } from "react-redux";

interface PluginCardProps {
    image?: string;
    name: string;
    description: string;
    active: boolean;
    section: string;
    theme: any;
}

const PluginPageStyles = (theme: any) => css`
    max-width: 1440px;
    padding: 10px;
    margin: 10px;
    width: 100%;
    display: -webkit-box;
    display: -webkit-flex;
    display: -ms-flexbox;
    display: flex;
    -webkit-flex: 1;
    -ms-flex: 1;
    flex: 1;
    overflow-x: hidden;
    display: flex;
    flex: 1;
    height: 100%;
    overflow: hidden;
    max-width: 1440px;
    align-self: center;
    .plugin-section {
        padding: 4px;
        font-size: 14px;
        color: ${theme.textColor};
    }
`;

const PluginCardStyles = (theme: any) => css`
    padding: 10px;
    margin: 4px;
    background: ${theme.widgetContainer};
    border: 1px solid ${theme.buttonBorder};
    color: ${theme.textColor};
    display: flex;
    align-items: flex-start;
    flex-direction: column;
    width: 350px;
    border-radius: 3px;
    height: fit-content;

    .image {
        display: flex;
        align-items: center;
    }

    .title {
        font-size: 16px;
        padding: 4px;
        align-self: flex-start;
        display: flex;
        align-items: center;
        width: 100%;
        .plugin-name {
            flex: 1;
            margin-left: 10px;
        }
        .switch {
            display: flex;
            align-items: center;
            justify-self: end;
        }
    }
    .text {
        font-size: 12px;
        padding: 4px;
        line-height: 1.5;
    }
    .icon {
        font-size: 60px;
        opacity: 0.25;
    }
`;

export const PluginCard: React.FC<PluginCardProps> = (props) => {
    const { theme, name, description, section, active } = props;
    return (
        <>
            <div className={cx(PluginCardStyles(theme))}>
                <div className="title">
                    <div className="image">
                        <ExtensionOutlinedIcon className={"icon"} />
                    </div>
                    <div className={"plugin-name"}> {name}</div>

                    <div className="switch">
                        <PluginSwitch
                            active={active}
                            name={name}
                            section={section}
                        />
                    </div>
                </div>
                <div className="text">{description}</div>
            </div>
        </>
    );
};

export const InlineSwitch = css`
    display: flex;
    align-items: center;
    justify-content: space-between;
`;

type PluginSwitchProps = {
    name: string;
    active: boolean;
    section: string;
};

export const PluginSwitch: React.FC<PluginSwitchProps> = (props) => {
    const { name, active, section } = props;

    const pl = LocalPluginsManagement();

    const [isActive, setIsActive] = useState(active);

    const handlePluginSwitch = (
        section: string,
        name: string,
        active: boolean
    ) => {
        setIsActive(() => !active);
        pl.togglePlugin(section, name, !active);
    };

    return (
        <>
            <Switch
                size={"small"}
                checked={isActive}
                onChange={(e) => handlePluginSwitch(section, name, isActive)}
                inputProps={{
                    "aria-label": "controlled",
                }}
            />
        </>
    );
};

export const PluginCards: React.FC<{
    components: any[];
    section: string;
}> = ({ components, section }) => {
    const userType = useSelector((store: any) => store.currentUser.role);

    const compList = useMemo(() => {
        return components?.filter((f: any) => f.roles.includes(userType));
    }, [userType, components]);

    const [filteredComponentList, setFilteredComponentList] =
        useState(compList);

    useEffect(() => {
        if (userType && components) {
            let newComp = components?.filter((f: any) =>
                f.roles.includes(userType)
            );
            setFilteredComponentList(newComp);
        }
    }, [userType, components]);

    const theme = useTheme();
    return (
        <div>
            {filteredComponentList?.length > 0 &&
                filteredComponentList?.map((component: any, k: number) => (
                    <PluginCard
                        theme={theme}
                        key={k}
                        name={component.name}
                        active={component.active}
                        section={section}
                        description={component.description}
                    />
                ))}
        </div>
    );
};

export default function Plugins() {
    const theme = useTheme();
    const pl = LocalPluginsManagement();
    const [local] = useState(pl.getAll());
    const plugins: any = useMemo(() => {
        if (Object.keys(local)?.length > 0) {
            return Object.entries(local);
        }
        return [];
    }, [local]);

    return (
        <div className={cx(PluginPageStyles(theme))}>
            {plugins?.length > 0 &&
                plugins?.map(([section, components]: any, index: number) => (
                    <div style={{ marginTop: "4px" }} key={index}>
                       
                        <PluginCards
                            components={components}
                            section={section}
                        />
                    </div>
                ))}
        </div>
    );
}
