<a href="https://qryn.cloud" target="_blank"><img src='https://user-images.githubusercontent.com/1423657/218816262-e0e8d7ad-44d0-4a7d-9497-0d383ed78b83.png' width=250></a>

[![Node.js CI](https://github.com/metrico/cloki-view/actions/workflows/npm_build_test.yml/badge.svg)](https://github.com/metrico/cloki-view/actions/workflows/npm_build_test.yml)
[![CodeQL](https://github.com/metrico/cloki-view/actions/workflows/codeql-scanner.yml/badge.svg)](https://github.com/metrico/cloki-view/actions/workflows/codeql-scanner.yml)

# Qryn View


# Qryn Raggix

Qryn Raggix  is a feature that provides suggestions for potential requests that have results. This feature allows users to preview and select from a list of potential queries and provides logs and additional options for customizing and scheduling queries.

## Overview

Qryn Raggix displays potential requests as squares on the screen. Users can hover over each square to see a preview of the query request. Clicking on a square opens a sample of logs with that request. The request query is displayed above the squares, and a button that says "send query" appears after the request query.

## Features

### Show/hide logs preview

Users have the option to toggle the display of logs preview on or off.

### Select range for previews request

Users can select the range of requests to display for previews.

### Recurrent requests

Users can switch on a "recurrent requests" feature that allows for automatic scheduling of queries. When this feature is activated, a time selector appears with the option to select the frequency of the recurring query. Users can then set a time range for the recurrence.

## How to Use
_Send a query from preview_

1. Switch On Raggix.
2. Select a time range for the queries sample
3. Click on "Launch" for lauching the queries lookup. It will take some time threading all the requests needed.
4. Hover over a square to see a preview of the query request.
5. Click on a square to open a sample of logs with that request.
6. If it sounds good, click on 'Send Query', to send to current datasource query.

_Activate recurrent previews_

1. Open 'Recurrent' Switch.
1. Select the range of requests to display for previews using the select option provided.
2. Switch on the "recurrent requests" feature to schedule automatic queries. Select the frequency and time range for the recurring query.

We hope you find Qryn Raggix useful and efficient for your Qryn queries.

---

### About qryn

Consult the [qryn Wiki](https://github.com/metrico/qryn/wiki/LogQL-Supported-Queries) for a detailed list of the project and its supported features, [changelog](https://github.com/metrico/qryn/wiki/Changelog) and [API functionality](https://github.com/metrico/qryn/wiki/HTTP-API)

### Acknowledgements
- (C) 2022 QXIP BV see LICENSE for details

[^1]: qryn is not affiliated or endorsed by Grafana Labs or ClickHouse Inc. All rights belong to their respective owners.
[^2]: qryn-view is part of the qryn project, licensed under the AGPLv3 LICENSE by QXIP BV

