import React from 'react'
import { PluginManagerFactory } from '..';

type Props = {
    message: string;
  };
  
  const MyPlugin: React.FC<Props> = ({ message }) => {
    return (
      <div>{message}</div>
    );
  };
  
  const pluginManager = PluginManagerFactory({});
  
  pluginManager.registerPlugin(MyPlugin, 'myLocation');
  
  const allPlugins = pluginManager.getAllPlugins()


  export default function PluginTemplate() {
    return (
        <div>
        {allPlugins.map((Plugin: React.FC<Props>, index: number) => (
          <div key={index}>
            <Plugin message={`Hello from Plugin ${index}`} />
          </div>
        ))}
      </div>
    )
  }
  