<img src='https://user-images.githubusercontent.com/1423657/147935343-598c7dfd-1412-4bad-9ac6-636994810443.png' style="margin-left:-10px" width=220>

[![Node.js CI](https://github.com/metrico/cloki-view/actions/workflows/npm_build_test.yml/badge.svg)](https://github.com/metrico/cloki-view/actions/workflows/npm_build_test.yml)
[![CodeQL](https://github.com/metrico/cloki-view/actions/workflows/codeql-scanner.yml/badge.svg)](https://github.com/metrico/cloki-view/actions/workflows/codeql-scanner.yml)

# :eye: cLoki View

### like Grafana Explore, but for cLoki

cLoki-view is a smart and minimal data explorer developed in React/JS and designed for LogQL APIs

<img src="https://user-images.githubusercontent.com/1423657/152640509-82d7704a-4e9a-4a2b-9b7e-1819984c7581.png"/><img src="https://user-images.githubusercontent.com/1423657/155606763-b83b4a65-0faa-4dd2-89f7-f578aa20db1f.png" />


### Setup

#### :busstop: **Basic Instructions**

***clone the repository***, then:

##### install: 

```bash
~/$ npm install
```

##### build (dist): 

```bash
~/$ npm run build
```
##### start (development mode): 

```bash
~/$ npm start
```

will serve the UI on ``http://localhost:8080``

#### :busstop:  **Important:** set api endpoint:

- go to ``./src/environment/env.dev.js``

### Environment Variables:

- ``HOST`` default: `` 0.0.0.0``
- ``PORT`` default: ``8080``
- ``API_URL`` default: ``http://localhost:3100``

```bash
~/$ HOST=localhost PORT=8080 API_URL=http://cloki-host:3100 npm start
```
  
### Basic Features

**Labels:** 

the labels will be loaded atomatically on every DOM change

**Label Values:** 

the values of each label will be retrieved clicking on the ``log browser => [click on some label]``

**Query:** 

The LogQL Query will be auto-formed by Label selection, and can be extended manually

**Show Logs:** 

click on ``show logs`` button to execute your LogQL Query

------------

### About cLoki

Consult the [cLoki Wiki](https://github.com/lmangani/cLoki/wiki/LogQL-Supported-Queries) for a detailed list of the project and its supported features, [changelog](https://github.com/lmangani/cLoki/wiki/Changelog) and [API functionality](https://github.com/lmangani/cLoki/wiki/HTTP-API)

### Acknowledgements
- (C) 2022 QXIP BV see LICENSE for details
- This project is not affiliated or endorsed by Grafana Labs. All rights belong to their respective owners.
