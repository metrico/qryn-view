import React from "react";

import { PluginManager } from "./PluginManagerFactory";

interface SinglePluginProps {
    section:string;
    localProps:any;
    name:any;

}

const SinglePlugin: React.FC<SinglePluginProps> = (props) => {
    const {section, localProps, name} = props 
console.log(PluginManager.getPlugin(section,name))
    const renderPlugin = ( name: any, Component:React.FC<SinglePluginProps["localProps"]>) => {
     
        return <Component localProps={localProps} section={section} name={name}/>
    }

    return <div className="renderer-content">
        {renderPlugin(name, PluginManager.getPlugin(section,name)['Component'])}
    </div>

}

export default SinglePlugin;