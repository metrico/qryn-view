<img src='https://user-images.githubusercontent.com/1423657/147935343-598c7dfd-1412-4bad-9ac6-636994810443.png' style="margin-left:-10px" width=220>

[![Node.js CI](https://github.com/metrico/cloki-view/actions/workflows/npm_build_test.yml/badge.svg)](https://github.com/metrico/cloki-view/actions/workflows/npm_build_test.yml)
[![CodeQL](https://github.com/metrico/cloki-view/actions/workflows/codeql-scanner.yml/badge.svg)](https://github.com/metrico/cloki-view/actions/workflows/codeql-scanner.yml)

# :eye: cLoki View

### like Grafana Explore, but for cLoki

cLoki-view is a smart and minimal data explorer developed in React/JS and designed for LogQL APIs and [cLoki](https://cloki.org)

<img src="https://user-images.githubusercontent.com/1423657/152640509-82d7704a-4e9a-4a2b-9b7e-1819984c7581.png"/><img src="https://user-images.githubusercontent.com/1423657/155608224-8654694b-b999-4781-994a-5a87e39dfddf.png" />

### Features
- Label Browser
- Display Logs & Charts
- Timerange Selector
- Query History
- Mobile View
- Embeddable Results
- 100% Client-Side


### Usage

Use the [public client](https://view.cloki.org) _(no data goes through the server)_ or [build](BUILD.md) and run your own instance

#### Environment Variables:

- ``HOST`` default: `` 0.0.0.0``
- ``PORT`` default: ``8080``
- ``API_URL`` default: ``http://localhost:3100``

##### Example 
```bash
~/$ HOST=localhost PORT=8080 API_URL=http://cloki-host:3100 npm start
```

##### URL Parameters
cLoki-view can be controlled through URL parameters

| param | description |  |
|-------|-------------|---------|
| `apiUrl` | _LogQL API URL_ | http://localhost:3100 |
| `query`  | _LogQL query_   | |
| `from`   | _timestamp Ns_  | |
| `to`     | _timestamp Ns_  | |
| `limit`  | _query limit_   | |
| `step`   | _query step_    | |
| `isEmbed` | _embed mode_   | false |


------------

### About cLoki

Consult the [cLoki Wiki](https://github.com/lmangani/cLoki/wiki/LogQL-Supported-Queries) for a detailed list of the project and its supported features, [changelog](https://github.com/lmangani/cLoki/wiki/Changelog) and [API functionality](https://github.com/lmangani/cLoki/wiki/HTTP-API)

### Acknowledgements
- (C) 2022 QXIP BV see LICENSE for details
- This project is not affiliated or endorsed by Grafana Labs. All rights belong to their respective owners.
