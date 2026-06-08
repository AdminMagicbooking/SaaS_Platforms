# Multi-vendor energy API reference (orientation comparison)

> Purpose: ECOGRID is **vendor-agnostic** — it orchestrates above the hardware. This is an orientation map of the integration options per vendor/standard, to keep in memory.
> ⚠ Confidence: **medium**. Built from working knowledge (≈2025); auth details, rate limits and control availability change and are often gated behind developer/installer programs. Verify per vendor before committing. FoxESS has its own detailed reference (`FoxESS_OpenAPI_reference.md`).

## Two integration philosophies (decide early)
1. **Cloud APIs (per vendor):** easy to start, but typically **read-rich / control-limited**, rate-limited, and create vendor dependency. Good for monitoring + light control + aggregation.
2. **Local edge gateway (per site):** Modbus TCP/RTU, SunSpec, OCPP, MQTT on a local controller. **Most control, lowest latency, truly vendor-agnostic** — but needs on-site hardware (an ECOGRID edge box). Required for real-time MPC/dispatch piloting.

→ Likely target architecture: **local edge controller per site** (does the real-time optimization/dispatch via local protocols) **+ cloud aggregation layer** (fleet dashboard, VPP, ESG, billing). Standardize on an internal **device-abstraction layer** so each device plugs in via the best available channel.

## Inverters / hybrid inverters

| Vendor | API / channel | Auth & access | Read | Control | Notes |
|---|---|---|---|---|---|
| **FoxESS** | Cloud Open API (REST) + Modbus (data logger) | api-key + signature, or OAuth2 (VPP) | Rich | Yes (work modes, SoC, charge windows, export limit, peakshaving, EMS) | Best-documented for our case; 1440 calls/inverter/day. See dedicated ref. |
| **SolarEdge** | Monitoring API (REST) | account API key per site | Rich (energy, power, inventory, sensors) | **Limited** (mostly read; some storage/charge-discharge profile) | Tight rate limit (~300 req/day/site historically). Multi-site under account. |
| **Huawei FusionSolar** | Northbound API (REST) | Northbound account (granted by admin), token/XSRF | Station KPI, device real-time/history, alarms | Device param control for licensed installer | Access gated; good fleet support. Also Modbus on SmartLogger locally. |
| **SMA** | Sunny Portal / ennexOS (limited cloud) + **Modbus TCP / SunSpec** local | cloud by request; local open | Local read rich | Local control via Modbus | SMA's strength is **local Modbus/SunSpec** + Data Manager (EMS). Cloud API restricted. |
| **Sungrow** | iSolarCloud OpenAPI (REST) | appkey + secret, developer approval | Station/device real-time + history | Some control | Requires developer onboarding. |
| **GoodWe** | SEMS Portal API | login token | Station monitoring | Limited | Semi-public; verify ToS. |
| **Growatt** | Server/OSS API (ShineServer) | login-based | PV/battery read | Some param control | Widely reverse-engineered, **not officially open** — ToS/stability risk. |

General rule: vendor **clouds = monitoring + light control**; **local Modbus/SunSpec = reliable control**. Storage is usually controlled **through the hybrid inverter**, not the battery directly.

## EV charging

| Standard / vendor | Channel | Use |
|---|---|---|
| **OCPP 1.6J / 2.0.1** (Open Charge Alliance) | WebSocket/JSON, charger ↔ your CSMS | **The vendor-agnostic key.** Run a CSMS → `RemoteStart/Stop`, `SetChargingProfile` for **smart charging / load management** (cap power, shift to solar peak). Most chargers speak OCPP. |
| Zaptec / Wallbox / EVBox / Alfen | own REST APIs | vendor extras, but OCPP is the common denominator |
| **OCPI** | network-to-network | roaming & billing between charging networks |
| **ISO 15118** | EV ↔ EVSE | Plug & Charge, **V2G** (vehicle-to-grid) |

→ For ECOGRID, **standardize on OCPP** to control any compliant charger; SetChargingProfile is how the optimizer schedules EV load around solar/occupancy.

## Batteries / storage

| Vendor | Channel | Auth | Control | Notes |
|---|---|---|---|---|
| **Tesla Powerwall** | Fleet API (cloud, OAuth) + local Gateway API | Tesla developer app + OAuth | backup reserve, operation mode (self-powered/autonomous) | Cloud control of energy sites; local API for live data. |
| **Victron** | VRM API (cloud REST) + local (Modbus TCP, MQTT, dbus, Node-RED) | VRM token | Local control rich (Venus OS) | Excellent for commercial/DIY orchestration; strong local stack. |
| **Pylontech** | BMS only (CAN/RS485) — **no cloud API** | — | via inverter | Monitored/controlled through the hybrid inverter. |

## Meters & market data

| Source | Channel | Use |
|---|---|---|
| **Shelly** (EM / Pro 3EM) | local HTTP/RPC + MQTT + Cloud API | cheap retrofit **consumption metering** (CT), easy edge integration |
| **Carlo Gavazzi** (EM24/EM340) | Modbus | common grid meter in solar installs |
| Generic Modbus / **SunSpec** meters | Modbus TCP/RTU | local, reliable |
| **ENTSO-E Transparency Platform** | REST/XML, free token | **day-ahead prices, load, generation per bidding zone** → arbitrage & tariff optimization signals |
| Nordpool / EPEX | commercial | price data feeds |

## Takeaways for ECOGRID
- **Don't bind the product to any single vendor cloud.** Build the abstraction layer; integrate per device via cloud API **or** local Modbus/OCPP/MQTT.
- **Real-time piloting (MPC/dispatch) → local edge controller** per site (cloud control is too rate-limited/laggy for fast optimization).
- **OCPP for EV, Modbus/SunSpec for inverters/meters, vendor cloud for fleet aggregation** is a sensible default stack.
- **Market/occupancy data are inputs to the optimizer** — ENTSO-E prices + COREPROMA occupancy/bookings are the two highest-value feeds (the occupancy feed is our differentiator).
