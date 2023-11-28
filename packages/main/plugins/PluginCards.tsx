import React, { useMemo, useState, useEffect } from "react";
import ExtensionOutlinedIcon from "@mui/icons-material/ExtensionOutlined";
import { cx } from "@emotion/css";
import { PluginCardStyles } from "./PluginStyles";
import { PluginSwitch } from "./PluginSwitch";
import useTheme from "@ui/theme/useTheme";
import { useSelector } from "react-redux";

export interface PluginCardProps {
    image?: string;
    name: string;
    description: string;
    active: boolean;
    section: string;
    theme: any;
}

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
