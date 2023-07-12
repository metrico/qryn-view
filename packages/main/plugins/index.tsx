import { initPlugins, PluginManager } from "./PluginManagerFactory";
import clockPlugin from "./Clock";
import { TotalSeriesPlugin } from './Cardinality'
//import raggixPlugin from "./Raggix";
//import aggregationPlugin from "./Aggregation"

let plugins = [
    clockPlugin,
   // raggixPlugin,
   // aggregationPlugin
   TotalSeriesPlugin
    
]

initPlugins(plugins)

export default PluginManager;
