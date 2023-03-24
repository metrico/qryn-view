import React, { createContext, useContext } from "react";
import { PluginManagerFactory, ILocations } from "./"

interface PluginContextValue {
  getPlugins(location: string): any[];
  getAllPlugins(): any[];
}

const PluginContext = createContext<PluginContextValue>({
  getPlugins: () => [],
  getAllPlugins: () => [],
});

interface PluginManagerProviderProps {
  factory: ReturnType<typeof PluginManagerFactory>;
}

export const PluginManagerProvider: React.FC<PluginManagerProviderProps> = ({
  factory,
  children,
}) => {
  const { getPlugins, getAllPlugins } = factory;

  return (
    <PluginContext.Provider value={{ getPlugins, getAllPlugins }}>
      {children}
    </PluginContext.Provider>
  );
};

export const usePluginManager = () => useContext(PluginContext);