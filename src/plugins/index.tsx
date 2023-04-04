import Clock from "./Clock";
import { PluginManager } from "./PluginManagerFactory";
import Raggix from "./Raggix";

// load the imported plugins
export const clock = {
    name: "Clock",
    Component: Clock,
};

export const raggix = {
    name:'Raggix',
    Component: Raggix
}


PluginManager.registerPlugin(clock, "Status Bar");
PluginManager.registerPlugin(raggix, "Query Item");

export default PluginManager;
