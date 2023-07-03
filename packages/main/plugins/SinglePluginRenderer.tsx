import React from "react";
import PluginManager from ".";

interface SingleRendererProps {
    section: string;
    localProps: any;
    name?: any;
}

const SinglePluginRenderer: React.FC<SingleRendererProps> = (props) => {
    const { section, localProps, name } = props;

    const renderPlugin = (
        name: any,
        Component: React.FC<SingleRendererProps["localProps"]>
    ) => {
        return (
            <Component localProps={localProps} section={section} name={name} />
        );
    };

    return (
        <div className="renderer-content">
            {renderPlugin(name, PluginManager.getPlugin(section, name))}
        </div>
    );
};

export default SinglePluginRenderer;
