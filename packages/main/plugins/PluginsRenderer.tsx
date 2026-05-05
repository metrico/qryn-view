import React from "react";
import PluginManager from ".";

interface PluginRendererProps {
    section: string;
    localProps: any;
}

const PluginRenderer: React.FC<PluginRendererProps> = (props) => {
    const { section, localProps } = props;
    const plugins = PluginManager.getPlugins(section);
    if (!plugins?.length) return null;
    return (
        <div
            style={{
                display: "flex",
                gap: ".5em",
                alignItems: "center",
                padding: ".5em",
            }}
        >
            {plugins.map(
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
                ) => (
                    <Component
                        key={idx}
                        localProps={localProps}
                        name={name}
                    />
                )
            )}
        </div>
    );
};

export default PluginRenderer;
