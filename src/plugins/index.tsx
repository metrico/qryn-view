import { lazy } from "react";
import { PluginManager } from "./PluginManagerFactory";

// load the imported plugins
//export const PluginBuilder = lazy(() => import("./TestPlugin/TestPlugin"));
export const Clock = lazy(()=> import("./Clock"));


PluginManager.registerPlugin(Clock, "Status Bar")
//PluginManager.registerPlugin(PluginBuilder,"Panel")

export default PluginManager

