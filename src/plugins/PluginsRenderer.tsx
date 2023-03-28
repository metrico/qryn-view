import React from "react";
import PluginManager from ".";

interface PluginRendererProps {
    section: string;
    localProps: any;
}

const PluginRenderer: React.FC<PluginRendererProps> = (props) => {
    const { section, localProps } = props;
    return (
        <>
            {PluginManager.getPlugins(section)?.map(
                (
                    Plugin: React.FC<PluginRendererProps["localProps"]>,
                    idx: number
                ) => {
                    return (
                        <div key={idx}>
                            <Plugin localProps={localProps} />
                        </div>
                    );
                }
            )}
        </>
    );
};

export default PluginRenderer;
