# prohashing-http

prohashing-http provides a node web server that connects to the ProHashing WAMP API, obtains profitability updates, and then exposes those updates via an HTTP API.

The intention of this application is to provide a mechanism for services that don't support consuming WAMP updates, enabling them to obtain profitability metrics from prohashing via HTTP endpoints.

## Running ##

To execute this web service, run the following:

```sh
SERVER_HOST=<server_host> SERVER_PORT=<server_port> PROHASHING_API_KEY=<api_key> node app.js
```

Substitute `<server_host>`, `<server_port>`, and `<api_key>` accordingly.

This repository also contains a Dockerfile to build this service into a container.  A healthcheck exists to verify that the service is updating (updates were observed from the ProHashing WAMP interface within the last 10 minutes).

## Endpoints ##

### Service Status ###

#### Endpoint ####

`/`

#### Response ####

Returns an empty status code 200 response.

### WAMP Status ###

#### Endpoint ####

`/status`

#### Response ####

Returns metrics regarding whether the service is connected to the WAMP service and when the last profitability update occurred.  The following represents a typical response:

```json
{
  "connected": true,
  "updating": true,
  "lastUpdates": {
    "profitability": "2019-01-15T00:00:52+00:00"
  }
}
```

### Profitability ###

#### Endpoint ####

`/profitability`

#### Response ####

```json
{
  "1": {
    "algorithm_name": "Scrypt",
    "usd": 0.0025041009705167,
    "btc": 6.8628068694276e-7,
    "max_usd": 0.0052676028280028,
    "max_btc": 1.4445957481592e-6,
    "percentile_usd": 0.0023765266674273,
    "percentile_btc": 6.5173886514719e-7,
    "data_timestamp": 1547510680.4959,
    "server_timestamp": 1547510683.3438,
    "server_id": 4
  },
  "2": {
    "algorithm_name": "SHA-256",
    "usd": 1.3292067065643e-7,
    "btc": 3.6428598623226e-11,
    "max_usd": 2.0160622968307e-7,
    "max_btc": 5.5308075026561e-11,
    "percentile_usd": 1.3077709035238e-7,
    "percentile_btc": 3.5864319816693e-11,
    "data_timestamp": 1547510680.4959,
    "server_timestamp": 1547510683.3438,
    "server_id": 4
  },
  "4": {
    "algorithm_name": "X11",
    "usd": 5.8147956354503e-5,
    "btc": 1.5936186240546e-8,
    "max_usd": 8.1352916386365e-5,
    "max_btc": 2.2361681776327e-8,
    "percentile_usd": 5.4252906795833e-5,
    "percentile_btc": 1.4878321539867e-8,
    "data_timestamp": 1547510680.4959,
    "server_timestamp": 1547510683.3438,
    "server_id": 4
  },
  "8": {
    "algorithm_name": "Neoscrypt",
    "usd": 0.23415999103207,
    "btc": 6.4174520673117e-5,
    "max_usd": 0.21584435326879,
    "max_btc": 5.9101273857793e-5,
    "percentile_usd": 0.15927860499956,
    "percentile_btc": 4.3680577494642e-5,
    "data_timestamp": 1547510680.4959,
    "server_timestamp": 1547510683.3438,
    "server_id": 4
  },
  "10": {
    "algorithm_name": "Ethash",
    "usd": 0.01164037320812,
    "btc": 3.1901921749946e-6,
    "max_usd": 0.012436222579021,
    "max_btc": 3.4174553600879e-6,
    "percentile_usd": 0.011545586033066,
    "percentile_btc": 3.1662624458556e-6,
    "data_timestamp": 1547510680.4959,
    "server_timestamp": 1547510683.3438,
    "server_id": 4
  },
  "18": {
    "algorithm_name": "Equihash",
    "usd": 117.69168003521,
    "btc": 0.032254900250826,
    "max_usd": 139.22541125076,
    "max_btc": 0.038193023707383,
    "percentile_usd": 118.09314015189,
    "percentile_btc": 0.032385872289655,
    "data_timestamp": 1547510680.4959,
    "server_timestamp": 1547510683.3438,
    "server_id": 4
  },
  "29": {
    "algorithm_name": "Lyra2REv2",
    "usd": 0.00074612035152741,
    "btc": 2.044837622033e-7,
    "max_usd": 0.0020932822648438,
    "max_btc": 5.7411857799166e-7,
    "percentile_usd": 0.00075085637653836,
    "percentile_btc": 2.0591491332323e-7,
    "data_timestamp": 1547510680.4959,
    "server_timestamp": 1547510683.3438,
    "server_id": 4
  },
  "34": {
    "algorithm_name": "CryptonightV8",
    "usd": 200.23857101049,
    "btc": 0.054877924526006,
    "max_usd": 208.04849256568,
    "max_btc": 0.057018957828325,
    "percentile_usd": 201.02498153552,
    "percentile_btc": 0.055129107166311,
    "data_timestamp": 1547510680.4959,
    "server_timestamp": 1547510683.3438,
    "server_id": 4
  }
}
```

## License ##

Copyright © 2018, [OBM LLC](https://obm.mn/).  Released under the [GPL-3.0 License](LICENSE).
