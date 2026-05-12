/**
 * Pinpoint Module: Net Uplink
 * Level 2: Advanced Profiling
 */
export default {
    id: 'network',
    title: 'Net_Uplink',
    level: 2,
    info: "Resolves public IP and connection latency.",
    steps: ["Query external IP API.", "Measure uplink/downlink latency."],
    run: async () => {
        const response = await fetch('https://api.ipify.org?format=json');
        const { ip } = await response.json();
        const conn = navigator.connection || {};
        return {
            public_ip: ip,
            downlink: conn.downlink + 'Mbps',
            effectiveType: conn.effectiveType,
            rtt: conn.rtt + 'ms'
        };
    }
};
