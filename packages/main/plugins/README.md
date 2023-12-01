<a href="https://qryn.cloud" target="_blank"><img src='https://user-images.githubusercontent.com/1423657/218816262-e0e8d7ad-44d0-4a7d-9497-0d383ed78b83.png' width=250></a>

[![Node.js CI](https://github.com/metrico/cloki-view/actions/workflows/npm_build_test.yml/badge.svg)](https://github.com/metrico/cloki-view/actions/workflows/npm_build_test.yml)
[![CodeQL](https://github.com/metrico/cloki-view/actions/workflows/codeql-scanner.yml/badge.svg)](https://github.com/metrico/cloki-view/actions/workflows/codeql-scanner.yml)

# Qryn View


### Qryn-View Custom Plugins

This documentation describes the process of creating a plugin for Qryn-View, including activation, deactivation, and development.

## Activation / Deactivation

To activate or deactivate you plugin:

1. Navigate to the "Settings" menu.
2. Look for the "Plugins" section.
3. Locate the plugin you want to activate or deactivate.
4. Click and toggle the Activate / Deactivate switch  next to the plugin.
5. Close the settings menu. 

## Development

To develop a custom plugin for this Qryn-View:

1. Create a new folder at `./src/plugins/YourPlugin`.
2. Create a React TypeScript `index.tsx` file for your plugin component in the new folder.
3. It should be exported in the following format:

```typescript
export interface Plugin {
  name: string;
  section: string;
  id: string;
  Component: React.FC;
  description: string;
  active: boolean;
}

// see /plugins/Clock as example

type YourPluginProps = {
    // the props will be inherited from the section component
    localProps:any // 
}
const YourPluginComponent:React.FC<YourPluginProps>(props) {
    // content 
    // you can import useTheme() hook from ../../themes 
    const theme = useTheme() 
    const {localProps} = props
    return <>...</>
}

const yourPlugin: Plugin = {
  name: "YourPlugin",
  section: "YourSection",
  id: "your-plugin-id",
  Component: YourPluginComponent,
  description: "YourPlugin description",
  active: true,
};

export default yourPlugin;
```

4. Use the following object as a reference to define your plugin's `section` in the UI:

```typescript
export const locations: ILocations = {
  Main: { parent: "", children: ["Status Bar", "Panel"] },
  "Status Bar": { parent: "Main", children: [""] },
  Panel: { parent: "Main", children: ["Queries", "Data Views"] },
  Queries: { parent: "Panel", children: ["Stats", "Data Views"] },
  Stats: { parent: "Queries", children: [""] },
  "Data Views": { parent: "Panel", children: ["Data View Header", "View"] },
  "Query Item": { parent: "Queries", children: [] },
};
```

5. Import your plugin in the `./src/plugins/index.tsx` file as follows:

```typescript
import yourPlugin from "./YourPlugin";

// add to the plugins array
const plugins: Plugin[] = [yourPlugin];

```

---

### About qryn

Consult the [qryn Wiki](https://github.com/metrico/qryn/wiki/LogQL-Supported-Queries) for a detailed list of the project and its supported features, [changelog](https://github.com/metrico/qryn/wiki/Changelog) and [API functionality](https://github.com/metrico/qryn/wiki/HTTP-API)

### Acknowledgements
- (C) 2022 QXIP BV see LICENSE for details

[^1]: qryn is not affiliated or endorsed by Grafana Labs or ClickHouse Inc. All rights belong to their respective owners.
[^2]: qryn-view is part of the qryn project, licensed under the AGPLv3 LICENSE by QXIP BV
