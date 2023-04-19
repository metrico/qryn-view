import { initPlugins, PluginManager } from "./PluginManagerFactory";
import clockPlugin from "./Clock";
import raggixPlugin from "./Raggix";
import aggregationPlugin from "./Aggregation"

let plugins = [
    clockPlugin,
    raggixPlugin,
    aggregationPlugin
    
]

initPlugins(plugins)

export default PluginManager;
