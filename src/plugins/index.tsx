import clockPlugin from "./Clock";
import { initPlugins, PluginManager } from "./PluginManagerFactory";
import raggixPlugin from "./Raggix";


// load the imported plugins

let plugins = [
    clockPlugin,
    raggixPlugin
    
]

initPlugins(plugins)

export default PluginManager;
