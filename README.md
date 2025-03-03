<a href="https://qryn.cloud" target="_blank"><img src='https://user-images.githubusercontent.com/1423657/218816262-e0e8d7ad-44d0-4a7d-9497-0d383ed78b83.png' width=250></a>

[![Node.js CI](https://github.com/metrico/cloki-view/actions/workflows/ci-release.yml/badge.svg)](https://github.com/metrico/cloki-view/actions/workflows/ci-release.yml)
[![CodeQL](https://github.com/metrico/cloki-view/actions/workflows/codeql-scanner.yml/badge.svg)](https://github.com/metrico/cloki-view/actions/workflows/codeql-scanner.yml)


# :eye: qryn view

*qryn-view* is a smart and minimal LogQl, Metrics, Traces and Flux API data explorer developed in React/JS and designed for [qryn](https://qryn.dev)

![qryn-view-demo](https://user-images.githubusercontent.com/1423657/200136242-f4133229-ee7c-45e0-8228-8734cf56140a.gif)

<!--
<img src="https://user-images.githubusercontent.com/1423657/152640509-82d7704a-4e9a-4a2b-9b7e-1819984c7581.png"/><img src="https://user-images.githubusercontent.com/1423657/155608224-8654694b-b999-4781-994a-5a87e39dfddf.png" /><img src="https://user-images.githubusercontent.com/1423657/182931606-4bffa314-1aef-4712-8229-716e43e4efc3.png" />
-->

### Features

**Data Sources Settings**
- URL, Headers
- Basic Auth
- Quick Setting (clone one setting for all datasources)
- Use for all (use current setting for all datasources)
  
**Browsers:** 
- Logs
- Metrics
- Traces
- Flux (experimental)

**Display:**  
- Logs & Charts
- Traces View
- Table view
- Link Logs with Traces
- Split data views
- Multi query execution
- Timerange Selector
- Query History
- Mobile View
- 100% Client-Side

------------
### Usage



**Local development:** 

Clone Repo 

```bash 
git clone https://github.com/metrico/qryn-view
```

Install packages
```bash 
pnpm install 
```
---

**Local Build:**

Build local clone
```bash
pnpm run build 
```
Install Serve (npm serve)
```bash
sudo npm i -g serve

serve -s ./packages/main/dist
```
---

**Releases**
 
 check our [Qryn View Releases](https://github.com/metrico/qryn-view/releases)


---




_Use the [public client](https://view.cloki.org) _(no data goes through the server)_ or [build](BUILD.md) and run your own instance_

#### Environment Variables:

- ``host`` default: `` 0.0.0.0``

- ``port`` default: ``5173``


##### Example 
```bash
~/$  pnpm dev -- --host localhost --port 8080
```
------------

##### Available Routes

- qryn-view works under a hash router to make it flexible for static deployments and simpler to run over a single route.

Current available routes: 

`/#/datasources` : Datasources settings


`/#/search` : Main search view


`/#/users` : users reserved route


`/#/plugins` : custom plugins 

------------

##### URL Parameters


_qryn-view can be controlled globally through URL parameters__



| param | description | default |
|-------|-------------|---------|
| `start`   | _timestamp Ns_  | now |
| `stop`     | _timestamp Ns_  | |
| `isEmbed` | _embed mode_   | false |
| `theme` | _application theme_ | dark |
| `left` | _left panel queries details_ | |
| `right` | _right panel queries details_ | |


------------

#### Query Data (logql, metrics, traces, flux) inside left or right panel
_JSON stringifyed and URL encoded_

- *id*: - query ID
- *idRef* - Title for a query
- *expr* - query expression (neeeds to be URL encoded)
- *limit* - query limit
- *dataSourceType* - 'logs', 'metrics', 'traces', 'flux'.
- *dataSourceURL* - the datasource API URL.
- *dataSourceId* - Data Source Id inside Data Sources Setting

------------

### Local Proxy for headeless qryn-view (for experimentation purposes only): 

Add to you .env file: 

`VITE_API_BASE_URL= { your local qryn api }`
should we with same protocol as your qryn-view instance 

### About qryn

Consult the [qryn Wiki](https://github.com/metrico/qryn/wiki/LogQL-Supported-Queries) for a detailed list of the project and its supported features, [changelog](https://github.com/metrico/qryn/wiki/Changelog) and [API functionality](https://github.com/metrico/qryn/wiki/HTTP-API)

### Acknowledgements
- (C) 2022 QXIP BV see LICENSE for details

[^1]: qryn is not affiliated or endorsed by Grafana Labs or ClickHouse Inc. All rights belong to their respective owners.
[^2]: qryn-view is part of the qryn project, licensed under the AGPLv3 LICENSE by QXIP BV

