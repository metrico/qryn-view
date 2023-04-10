import { initPlugins, PluginManager } from "./PluginManagerFactory";
import clockPlugin from "./Clock";
import raggixPlugin from "./Raggix";

let plugins = [
    clockPlugin,
    raggixPlugin
    
]

initPlugins(plugins)

export default PluginManager;
