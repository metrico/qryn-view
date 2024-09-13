import { cx } from "@emotion/css";
import { useMemo, useState } from "react";
import useTheme from "@ui/theme/useTheme";
import { LocalPluginsManagement } from "./PluginManagerFactory";
import { PluginPageStyles } from "./PluginStyles";
import { PluginCards } from "./PluginCards";
import { useWebVitals } from "@ui/plugins/WebVitals/useWebVitals";

export default function Plugins() {
    const theme = useTheme();
     // check web vitals 
    useWebVitals({ page: "Plugins" });
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
            <div className="page-header">
                <h1>Plugins</h1>
                <h3>(need to reload page to activate)</h3>
            </div>
            <div className="cards-container">
                {plugins?.length > 0 &&
                    plugins?.map(
                        ([section, components]: any, index: number) => (
                            <PluginCards
                                key={index}
                                components={components}
                                section={section}
                            />
                        )
                    )}
            </div>
        </div>
    );
}
