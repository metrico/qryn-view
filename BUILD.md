<img src='https://user-images.githubusercontent.com/1423657/147935343-598c7dfd-1412-4bad-9ac6-636994810443.png' style="margin-left:-10px" width=220>

# :eye: qryn View

### Build Instructions

***clone the repository***, then:

##### install: 

```bash
~/$ pnpm install
```

##### serve (development mode): 

```bash
~/$ pnpm dev
```

will serve the UI on ``http://localhost:8080``

##### Build (dist):
 

```bash
~/$ pnpm run build
```
#### *Serve (dist):*

  1 - Install serve utility

```bash
~/$ npm i -g serve
```

2 - Serve 

```bash
~/$ serve -s ./packages/main/dist
```

will serve by default the UI on ``http://localhost:3000``


####  API Endpoint

- set backend using ``./src/environment/env.dev.js`` or using ENV

### Environment Variables:

- ``HOST`` default: `` 0.0.0.0``
- ``PORT`` default: ``8080``
- ``API_URL`` default: ``http://localhost:3100``

```bash
~/$ HOST=localhost PORT=8080 API_URL=http://qryn-host:3100 pnpm dev
```
