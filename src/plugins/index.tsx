import { lazy } from "react";
import { PluginManager } from "./PluginManagerFactory";

// load the imported plugins
//export const PluginBuilder = lazy(() => import("./TestPlugin/TestPlugin"));
export const Clock = lazy(()=> import("./Clock"));
export const Raggix = lazy(()=> import("./Raggix"));


PluginManager.registerPlugin(Clock, "Status Bar")
PluginManager.registerPlugin(Raggix, "Panel")
//PluginManager.registerPlugin(PluginBuilder,"Panel")

export default PluginManager

