import store from "../store/store";
import { setPlugins } from "./actions";


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
    "Query Item" :{
            parent: "Queries",
            children:[]
    }
};

export function PluginManagerFactory(locations: ILocations) {
    const plugins: any = store.getState().plugins || {};
   // const dispatch = store.dispatch

    // add plugin to a specific location
    function registerPlugin(plugin: any) {
        if (!plugins[plugin.section]) {
            plugins[plugin.section] = [];
        }

        plugins[plugin.section].push(plugin);

        store.dispatch(setPlugins(plugins))

        localStorage.setItem("plugins", JSON.stringify(plugins));
    }
    function registerPluginGlobally(plugin: any) {
        for (let location in locations) {
            if (location !== "Main") {
                registerPlugin(plugin);
            }
        }
    }

    function getPlugins(location: string) {
        const unique = plugins?.[location]?.filter(
            (obj: any, index: number) =>
                plugins[location]?.findIndex(
                    (item: any) => item.name === obj.name
                ) === index
        );

        return unique || [];
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

export const PluginManager = PluginManagerFactory(locations);

// add an id for each plugin
