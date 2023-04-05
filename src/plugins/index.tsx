import { nanoid } from "nanoid";
import Clock from "./Clock";
import { PluginManager } from "./PluginManagerFactory";
import Raggix from "./Raggix";



// load the imported plugins
export const clock = {
    name: "Clock",
    section:"Status Bar",
    id: nanoid(),
    Component: Clock,
    active:true,
};

export const raggix = {
    name:'Raggix',
    section: "Query Item",
    id: nanoid(),
    Component: Raggix,
    active:true,
}

let plugins = [
    clock,
    raggix 
]


function registerPlugins() {
    plugins.forEach((plugin:any) => {
            PluginManager.registerPlugin(plugin) 
    })
}

registerPlugins()

export default PluginManager;
