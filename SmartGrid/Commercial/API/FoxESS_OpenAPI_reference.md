# FoxESS Cloud — Open API Reference (learned notes)

> Source: https://www.foxesscloud.com/public/i18n/en/OpenApiDocument.html (doc version v1.1.16, May 2026).
> Captured: public info, auth/OAuth, limits, errors, code example, real-time variable catalog.
> ⚠ Gap: the detailed request/response field tables for EMS, Meter, GMAX, Heat, Data Logger, Scheduler V2/V3 and PeakShaving were past the fetch truncation — paths are known, full field schemas to be pulled on demand.
> Relevance to ECOGRID: this is exactly the inverter/battery telemetry + control layer our EMS would integrate with (read PV/battery/grid data, set charge windows, work modes, export limits, VPP onboarding).

## Basics
- **Style:** RESTful, JSON, UTF-8. Get an **api-key** in Cloud Platform → personal center → API management.
- **Request domain:** `https://www.foxesscloud.com/` (global). Regional variants exist, e.g. US `https://portal.foxesscloud.us`. Keep the domain you were issued.
- **Must set a custom `User-Agent`** for scripted calls.

## Authentication — two mutually exclusive modes
**A. Private token (per-account api-key)** — header `token`.
**B. OAuth 2.0** — header `Authorization: Bearer <access_token>`. Don't use both at once.

**Required headers (all requests):**
| Header | Req | Notes |
|---|---|---|
| `timestamp` | yes | current time in **milliseconds** |
| `signature` | yes | `md5( path + "\r\n" + token + "\r\n" + timestamp )` — for OAuth, use the access_token in place of token |
| `lang` | yes | e.g. `en` |
| `token` | no | the api-key (private-token mode) |
| `Authorization` | no | `Bearer <access_token>` (OAuth mode) |

Signature is built on the **path** (e.g. `/op/v0/device/real/query`), not the full URL host. md5 hex, lowercase.

## OAuth 2.0 (added v1.1.0, guide updated v1.1.16)
- **Grant types:** Authorization Code (apps acting for a user) and Client Credentials (server-to-server, **VPP operators only** — must register client in v1 Platform and contact FoxESS support to enable).
- **Create client:** v1 Platform → avatar → User Profile → API Management → Authorization Token → "Create Client Side". You set Client Name, Redirect Address (`redirect_uri`), Scopes. Get `client_id` + `client_secret` (**secret shown once**).
- **Scopes:** `data_access` (read device data), `device_control` (control devices).
- **Authorization Code flow:**
  1. `GET https://{domain}/h5/auth/foxessIndex?response_type=code&client_id=..&redirect_uri=..&scope=..`
  2. callback `…?code=ABC123&state=XYZ`
  3. `POST https://{domain}/oauth2/token` (x-www-form-urlencoded): `grant_type=authorization_code, client_id, client_secret, code, redirect_uri` → returns `access_token` (**valid 24h**) + `refresh_token`.
  4. Devices auto-onboarded to your client on consent.
  - Refresh: `POST /oauth2/refresh` (`grant_type=refresh_token, client_id, client_secret, refresh_token`).
- **Client Credentials flow:** `POST /oauth2/client_token` (`grant_type=client_credentials, client_id, client_secret`) → access_token (no refresh_token; just repeat). Devices **not** auto-onboarded — must bind manually.
- **Device boarding:**
  - Check: `GET /op/v0/device/boarding/status?sn=...`
  - Set: `POST /op/v0/device/boarding/status/set` `{sn, status}`
  - Client onboard (client-creds/VPP): `POST /op/v0/vpp/oauth2/client/onboard` `{deviceSN}`; offboard `/op/v0/vpp/oauth2/client/offboard`.
- **Revoke:** `POST /oauth2/revoke` (single) / `POST /oauth2/revokeAllTokens` (all).

## Rate limits
- **1440 interface calls per inverter per day**, per account.
- Query interfaces: **max 1 / second** (counted per interface).
- Insert/update interfaces: **max 1 / 2 seconds** (per interface).

## Common errors
- `40256` missing/invalid request **header** params.
- `40257` invalid request **body** params.
- `40400` requests too frequent (slow down).

## Endpoint catalog (paths)
**Power Station / Plant**
- `POST /op/v0/plant/list` `{currentPage, pageSize}`
- `GET /op/v0/plant/detail` `{id}`
- create / delete / edit power station (detail schemas in doc).

**Device / Inverter**
- `POST /op/v0/device/list` `{currentPage, pageSize}`
- `GET /op/v0/device/detail` `{sn}` (incl. battery model/capacity, third-party PV flag — recent versions)
- `GET /op/v0/device/variable/get` — list available variables
- `POST /op/v0/device/real/query` `{sn, variables:[]}` (empty = all; V1 supports batch SNs)
- `POST /op/v0/device/history/query` `{sn, variables:[], begin, end}` (begin/end = ms timestamps)
- `POST /op/v0/device/report/query` `{sn, year, month, day, dimension:"day|month|year", variables:[…]}`
- `GET /op/v0/device/generation` `{sn}`
- `GET /op/v0/device/fault/history` (v1.1.13)

**Battery**
- `GET /op/v0/device/battery/soc/get` `{sn}` · `POST …/soc/set` `{sn, minSoc, minSocOnGrid}`
- `GET /op/v0/device/battery/forceChargeTime/get` `{sn}` · `POST …/forceChargeTime/set` `{sn, enable1, enable2, startTime1{hour,minute}, endTime1{…}, startTime2{…}, endTime2{…}}`

**Scheduler (work-mode time segments)** — V1, V2 (v1.1.6), V3 (v1.1.10/.10)
- `POST /op/v0/device/scheduler/get/flag` `{deviceSN}` — main switch status
- `POST /op/v0/device/scheduler/set` `{deviceSN, enable}` — set main switch
- `POST /op/v0/device/scheduler/get` `{deviceSN}`
- `POST /op/v0/device/scheduler/enable` `{deviceSN, groups:[{enable, startHour, startMinute, endHour, endMinute, workMode, minSocOnGrid, fdSoc, fdPwr}, …]}`
- **Work modes:** `SelfUse`, `Feedin`, `Backup`, `ForceCharge`, `ForceDischarge`. (V1 also supports max-SOC get/set.)

**Device settings / control** (added progressively)
- Device settings item get/set (supports ExportLimit, work mode, H1/H3 series, AI Link/EMS options).
- Device time get/set; PeakShaving settings get/set (v1.1.2); Meter Reader get/set; battery heating get/set; display sleep (MicroStorage); device boarding status.

**Other device families** (paths under `/op/v0/...`; full schemas TBD)
- **Data Logger:** list, details, signal, **Modbus commands** (transparent pass-through), wifi info, lan info.
- **EMS:** list, real-time data, history data, system setting get/set, rate setting, AC output control, power-limit control, more setting, gen setting.
- **Meter:** list, settings item get/set.
- **Heat (heat pump):** register, register list, status change.
- **GMAX:** list, history, real data, peak-and-valley arbitrage get/set.

**Platform**
- `GET /op/v0/user/getAccessCount` — public interface access count
- Installer device count.
- `POST /op/v0/module/list` `{currentPage, pageSize}` — data loggers/modules.

## Real-time variable catalog (from `variable/get` / `real/query`)
Units vary by device; availability differs by model (grid-tied vs energy-storage inverter).
- **PV strings:** `pvPower` (kW); `pv1…pv24` each `Volt`(V)/`Current`(A)/`Power`(kW).
- **Grid phases:** `RVolt/RCurrent/RFreq/RPower`, same for `S` and `T` (Hz for freq).
- **EPS (backup) output:** `epsPower`, `epsVoltR/S/T`, `epsCurrentR/S/T`, `epsPowerR/S/T` (energy-storage only).
- **Power flows:** `loadsPower` (+R/S/T), `generationPower` (output), `feedinPower` (export), `gridConsumptionPower` (import), `meterPower`/`meterPower2`/`meterPowerR/S/T`.
- **Battery:** `SoC` (%), `batVolt`, `batCurrent`, `batChargePower`, `batDischargePower`, `invBatVolt/Current/Power` (note: **positive = discharge, negative = charge**), `ResidualEnergy` (0.01 kWh), `batTemperature`, SOH (v1.0.9), battery throughput (v1.0.4).
- **Energy totals:** `todayYield` (today generation), `generation` (cumulative kWh), report fields `generation, feedin, gridConsumption, chargeEnergyToTal, dischargeEnergyToTal` + PV generation.
- **Temps:** `ambientTemperation`, `boostTemperation`, `invTemperation`, `chargeTemperature`, `batTemperature`, `dspTemperature` (°C).
- **Power quality:** `ReactivePower` (kVar), `PowerFactor`, `runningState`.

## Notes for ECOGRID integration
- Control levers we'd use: `scheduler/enable` (time-segmented work modes incl. ForceCharge/ForceDischarge for arbitrage & peak shaving), `battery/soc/set` (min SoC floors), `battery/forceChargeTime/set`, device settings `ExportLimit` (grid export cap — relevant to APER/connection limits), PeakShaving, and EMS power-limit/AC-output control.
- VPP/aggregation → Client Credentials grant + onboard APIs (requires FoxESS to enable VPP on the client).
- Watch the **1440 calls/inverter/day** budget when polling a multi-site fleet — design polling cadence accordingly (e.g. real-time at most every few minutes, batch via V1 multi-SN query).
- Kafka integration documented (v1.1.14) for push-style data ingestion — likely better than polling at fleet scale; schema not captured here.
