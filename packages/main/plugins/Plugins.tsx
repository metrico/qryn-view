import { cx } from "@emotion/css";
import { useMemo, useState } from "react";
import useTheme from "@ui/theme/useTheme";
import { LocalPluginsManagement } from "./PluginManagerFactory";
import { PluginPageStyles } from "./PluginStyles";
import { PluginCards } from "./PluginCards";
import { useWebVitals } from "@util/useWebVitals";

export default function Plugins() {
    const theme = useTheme();
    useWebVitals({page:"Plugins"});
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
