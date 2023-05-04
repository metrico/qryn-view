import { useState, useMemo } from "react";
import store from "../store/store";
import { setPlugins } from "./actions";
import { Plugin } from "./types";

export interface ILocation {
    parent: string;
    children: string[];
}

export interface ILocations {
    [key: string]: ILocation;
}

export const locations: ILocations = {
    Main: { parent: "", children: ["Status Bar", "Panel"] },
    "Status Bar": {
        parent: "Main",
        children: [""],
    },
    Panel: {
        parent: "Main",
        children: ["Queries", "Data Views"],
    },
    Queries: {
        parent: "Panel",
        children: ["Stats", "Data Views"],
    },
    Stats: { parent: "Queries", children: [""] },
    "Data Views": {
        parent: "Panel",
        children: ["Data View Header", "View"],
    },
    "Query Item": {
        parent: "Queries",
        children: [],
    },
};

export function LocalPluginsManagement() {
    function getAll() {
        try {
            return JSON.parse(localStorage.getItem("plugins") || "{}");
        } catch (e) {
            return {};
        }
    }

    function setPlugin(location: string, plugin: any) {
        let plugins = getAll();

        if (!plugins[location]) {
            plugins[location] = [];
        }

        if (!plugins[location]?.some((s: any) => s.name === plugin.name)) {
            plugins[location].push(plugin);
            localStorage.setItem("plugins", JSON.stringify(plugins));
        }
    }

    function getPluginsFromLocation(location: string) {
        let plugins = getAll();
        if (!plugins[location]) {
            return [];
        }
        return plugins[location];
    }

    function removePlugin(location: string, name: string) {
        let plugins = getAll();

        if (
            plugins[location] &&
            Array.isArray(plugins[location]) &&
            plugins[location]?.some((s: any) => s.name === name)
        ) {
            let filtered = plugins[location]?.filter(
                (f: any) => f.name !== name
            );
            plugins[location] = filtered;
            localStorage.setItem("plugins", JSON.stringify(plugins));
        }
    }

    function togglePlugin(location: string, name: string, active: boolean) {
        const plugins = getAll();
        const pluginIndex = plugins[location]?.findIndex(
            (pl: any) => pl?.name === name
        );

        if (pluginIndex >= 0) {
            const updatedPlugins = {
                ...plugins,
                [location]: plugins[location].map((pl: any, index: number) =>
                    index === pluginIndex ? { ...pl, active } : pl
                ),
            };

            localStorage.setItem("plugins", JSON.stringify(updatedPlugins));
        }
    }

    return {
        getAll,
        getPluginsFromLocation,
        setPlugin,
        removePlugin,
        togglePlugin,
    };
}

export function useLocalPlugins() {
    const pl = LocalPluginsManagement();
    const [local] = useState(pl.getAll());
    const plugins: any = useMemo(() => {
        if (Object.keys(local)?.length > 0) {
            return Object.entries(local);
        }
        return [];
    }, [local]);

    return plugins;
}

export function useActiveTabs(section: any) {
    const plugins: any = useLocalPlugins();
    const activeTabs = useMemo(() => {
        if (plugins?.some((s: any) => s[0] === section)) {
            let queryItemPlugins = plugins?.filter(
                ([el]: [el: string]) => el === section
            )[0][1];
            // return queryItemPlugins
            return queryItemPlugins?.filter((f: any) => f.active);
        }
        return [];
    }, [plugins]);



    const isActiveTabs = useMemo(() => {
        return activeTabs?.length > 0;
    }, activeTabs);

    return { activeTabs, isActiveTabs };
}

export function PluginManagerFactory(locations: ILocations) {
    const plugins: any = {};
    const lp = LocalPluginsManagement();
    let localPlugins = lp.getAll();

    // const dispatch = store.dispatch

    // add plugin to a specific location
    function registerPlugin(plugin: any) {
        if (!plugins[plugin.section]) {
            plugins[plugin.section] = [];
        }

        plugins[plugin.section].push(plugin);

        store.dispatch(setPlugins(plugins));

        if (
            !localPlugins[plugin.section]?.some(
                (s: any) => s.name === plugin.name
            )
        ) {
            lp.setPlugin(plugin.section, plugin);
        }
    }

    function registerPluginGlobally(plugin: any) {
        for (let location in locations) {
            if (location !== "Main") {
                registerPlugin(plugin);
            }
        }
    }

    function getPlugins(location: string) {
        let local = lp.getPluginsFromLocation(location);
        const unique = plugins?.[location]?.filter(
            (obj: any, index: number) =>
                plugins[location]?.findIndex(
                    (item: any) => item.name === obj.name
                ) === index
        );

        let active = [];

        if (unique?.length > 0) {
            for (let lp of local) {
                let compared = unique?.find?.((f: any) => f.name === lp.name);
                if (lp.active) {
                    active.push(compared);
                }
            }
        }

        return active || [];
    }

    function getPlugin(location: string, name: string) {
        const unique = plugins?.[location]
            ?.filter(
                (obj: any, index: number) =>
                    plugins[location]?.findIndex(
                        (item: any) => item.name === obj.name
                    ) === index
            )
           let found=unique?.find((f: any) => f?.name === name);
        return found || {};
    }

    function togglePlugin(location: string, name: string, active: boolean) {
        lp.togglePlugin(location, name, active);
    }

    function getAllPlugins() {
        const allPlugins: any[] = [];

        for (let location in locations) {
            if (location !== "Main") {
                allPlugins.push(...getPlugins(location));
            }
        }
        return allPlugins;
    }

    return {
        registerPlugin,
        registerPluginGlobally,
        getAllPlugins,
        getPlugins,
        getPlugin,
        togglePlugin,
    };
}

export const PluginManager = PluginManagerFactory(locations);

export function initPlugins(plugins: Plugin[]) {
    plugins.forEach((plugin: any) => {
        PluginManager.registerPlugin(plugin);
    });
}
