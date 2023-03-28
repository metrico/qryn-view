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
};


export function PluginManagerFactory(locations: ILocations) {
    const plugins: any = {};

    // add plugin to a specific location
    function registerPlugin(plugin: any, location: string) {
        if (!plugins[location]) {
            plugins[location] = [];
        }
        plugins[location].push(plugin);
    }
    function registerPluginGlobally(plugin: any) {
        for (let location in locations) {
            if (location !== "Main") {
                registerPlugin(plugin, location);
            }
        }
    }
    function getPlugins(location: string) {
        return plugins[location] || [];
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
    };
}

export const PluginManager = PluginManagerFactory(locations)
