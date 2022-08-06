<img src='https://user-images.githubusercontent.com/1423657/173144443-fc7ba783-d5bf-47f9-bf59-707693da5ed1.png' style="margin-left:-10px" width=220>

[![Node.js CI](https://github.com/metrico/cloki-view/actions/workflows/npm_build_test.yml/badge.svg)](https://github.com/metrico/cloki-view/actions/workflows/npm_build_test.yml)
[![CodeQL](https://github.com/metrico/cloki-view/actions/workflows/codeql-scanner.yml/badge.svg)](https://github.com/metrico/cloki-view/actions/workflows/codeql-scanner.yml)


# :eye: qryn view

*qryn-view* is a smart and minimal LOgQL API data explorer developed in React/JS and designed for [qryn](https://cloki.org)

<img src="https://user-images.githubusercontent.com/1423657/152640509-82d7704a-4e9a-4a2b-9b7e-1819984c7581.png"/><img src="https://user-images.githubusercontent.com/1423657/155608224-8654694b-b999-4781-994a-5a87e39dfddf.png" /><img src="https://user-images.githubusercontent.com/1423657/182931606-4bffa314-1aef-4712-8229-716e43e4efc3.png" />


### Features
- Label Browser
- Display Logs & Charts
- Timerange Selector
- Split data view
- Multi query execution
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

### About qryn

Consult the [qryn Wiki](https://github.com/metrico/qryn/wiki/LogQL-Supported-Queries) for a detailed list of the project and its supported features, [changelog](https://github.com/metrico/qryn/wiki/Changelog) and [API functionality](https://github.com/metrico/qryn/wiki/HTTP-API)

### Acknowledgements
- (C) 2022 QXIP BV see LICENSE for details

[^1]: qryn is not affiliated or endorsed by Grafana Labs or ClickHouse Inc. All rights belong to their respective owners.
[^2]: qryn is part of the cLoki project, licensed under the AGPLv3 LICENSE by QXIP BV

