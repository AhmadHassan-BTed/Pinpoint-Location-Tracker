# 📍 Pinpoint: Modular Geolocation Utility

[![License: MIT](https://img.shields.io/badge/License-MIT-blue.svg)](LICENSE)

**Pinpoint** is a professional-grade, modular JavaScript library for high-accuracy geolocation extraction and stealthy telemetry. Unlike simple scripts, Pinpoint is built as a set of **reusable utilities** that can be integrated into any web project.

---

## 🏛️ Architecture Overview

Pinpoint follows a **Service-Oriented Architecture** (SOA), separating the core acquisition logic from the transmission and presentation layers.

```text
/
├── src/
│   ├── tracker.js       # Core function: extractLocation()
│   ├── transmitter.js   # Core function: transmitData()
│   ├── metadata.js      # Core function: extractMetadata()
│   ├── network.js       # Core functions: resolvePublicIP(), extractConnectionInfo()
│   ├── battery.js       # Core function: extractBatteryStatus()
│   ├── performance.js   # Core function: extractPerformanceMetrics()
│   └── ui-mimic.js      # Core UI generation utilities
├── debug.html           # Professional Manual Debug Console
├── index.html           # Professional Diagnostic Tool (Entry Point)
└── LICENSE              # Open Source MIT License
```

---

## 🚀 Key Functions

### `extractLocation(options)`
The primary engine for pinpointing coordinates. It wraps the browser's Geolocation API in a robust Promise-based interface with high-accuracy defaults.

```javascript
import { extractLocation } from './src/tracker.js';

const location = await extractLocation();
console.log(location.latitude, location.longitude);
```

### `transmitData(endpoint, payload)`
A stealthy transmission utility for sending captured telemetry to a remote server.

### `extractMetadata()`
Gathers comprehensive browser and device identifiers (User-Agent, OS, Screen resolution, Timezone).

### `resolvePublicIP()`
An asynchronous utility that resolves the user's public IP address via external handshake.

### `extractBatteryStatus()`
Extracts real-time battery levels and charging states.

### `extractPerformanceMetrics()`
Gathers system memory usage and page load timing benchmarks.


---

## 🚦 Local Development

Due to browser security policies (**CORS**), ES6 modules cannot be loaded directly via the `file://` protocol. You must serve Pinpoint through a local web server.

### Option 1: Professional (Node.js)
```bash
npm install
npm start          # Starts the main dashboard
npm run debug      # Starts the manual debug console
```
This will launch a **BrowserSync** server at `http://localhost:3000` with hot-reloading.

### Option 2: Quick Start (Python)
```bash
python -m http.server 8000
```

### Option 3: VS Code
Use the [Live Server](https://marketplace.visualstudio.com/items?itemName=ritwickdey.LiveServer) extension and click "Go Live".

---

## 📄 License
This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

---

## 👨‍💻 Maintainer
- **Ahmad Hassan** - *Lead Architect*
