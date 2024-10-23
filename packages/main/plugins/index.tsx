import { initPlugins, PluginManager } from "./PluginManagerFactory";
import clockPlugin from "./Clock";
import { CardinalViewPlugin } from "./Cardinality/";
//import { WebVitalsPlugin } from "./WebVitals";
//import raggixPlugin from "./Raggix";
//import aggregationPlugin from "./Aggregation"

let plugins = [
    clockPlugin,
    // raggixPlugin,
    // aggregationPlugin

    CardinalViewPlugin,
    //WebVitalsPlugin,
];

initPlugins(plugins);

export default PluginManager;
