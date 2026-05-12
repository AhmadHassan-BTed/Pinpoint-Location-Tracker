/**
 * Pinpoint Module: Environment Telemetry
 * Level 1: Standard Recon
 */
export default {
    id: 'metadata',
    title: 'Env_Telemetry',
    level: 1,
    info: "Extracts basic OS, browser, and hardware telemetry.",
    steps: ["Query Navigator object.", "Detect virtualization markers.", "Log system resolution."],
    run: async () => {
        return {
            userAgent: navigator.userAgent,
            platform: navigator.platform,
            language: navigator.language,
            cores: navigator.hardwareConcurrency,
            memory: navigator.deviceMemory,
            screen: `${window.screen.width}x${window.screen.height}`,
            cookiesEnabled: navigator.cookieEnabled,
            webdriver: navigator.webdriver
        };
    }
};
