import React from "react";
import PluginManager from ".";

interface PluginRendererProps {
    section: string;
    localProps: any;
}

const PluginRenderer: React.FC<PluginRendererProps> = (props) => {
    const { section, localProps } = props;
    return (
        <div
            style={{
                display: "flex",
                gap: ".5em",
                alignItems: "center",
                padding: ".5em",
            }}
        >
            {PluginManager.getPlugins(section)?.length > 0 &&
                PluginManager.getPlugins(section)?.map(
                    (
                        {
                            name,
                            Component,
                        }: {
                            name: string;
                            Component: React.FC<
                                PluginRendererProps["localProps"]
                            >;
                        },
                        idx: number
                    ) => {
                        return (
                            <Component
                                key={idx}
                                localProps={localProps}
                                name={name}
                            />
                        );
                    }
                )}
        </div>
    );
};

export default PluginRenderer;
