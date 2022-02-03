<img src='https://user-images.githubusercontent.com/1423657/147935343-598c7dfd-1412-4bad-9ac6-636994810443.png' style="margin-left:-10px" width=220>

# :smirk: cLoki View

### like Grafana Explore, but for Clickhouse

------

### Setup

#### :busstop: **Basic Instructions**

***clone***, then:

##### install: 

```bash
~/$ npm install
```

##### build: 

```bash
~/$ npm run build
```
##### start (development hot reload mode): 

```bash
~/$ npm start
```

will start on ``http://localhost:3000``

#### :busstop:  **Important:** change api endpoint:

- go to ``./src/environment/env.dev.js``

### Environment Variables:

- ``HOST`` default: `` 0.0.0.0``
- ``PORT`` default: ``8080``
- ``API_URL`` default: ``http://localhost:3100``

```bash
~/$ HOST=localhost PORT=8080 API_URL=http://localhost:3100 npm start
```



### Basics


**Labels:** 

the labels will be loaded atomatically on every DOM change

**Label Values:** 

the values of each label will be retrieved clicking on the ``log browser => [click on some label]``

**Query:** 

the query will be generated once clicked on values, also could be edited on input

**Show Logs:** 

click on ``show logs`` button once query is done

------------

##### Project Status

Consult the [Wiki](https://github.com/lmangani/cLoki/wiki/LogQL-Supported-Queries) for a detailed list of supported features, [changelog](https://github.com/lmangani/cLoki/wiki/Changelog) and [API functionality](https://github.com/lmangani/cLoki/wiki/HTTP-API)

--------------


#### Acknowledgements
cLoki is not affiliated or endorsed by Grafana Labs. All rights belong to their respective owners.
