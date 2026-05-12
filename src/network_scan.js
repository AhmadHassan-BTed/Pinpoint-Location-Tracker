/**
 * Pinpoint Core: Advanced LAN Reconnaissance
 * 
 * Professional service discovery for local network infrastructure.
 */

export const probeLocalNetwork = async () => {
    const gateways = ['192.168.1.1', '192.168.0.1', '10.0.0.1', '127.0.0.1'];
    const criticalPorts = [
        { port: 22, service: 'SSH' },
        { port: 445, service: 'SMB/DS' },
        { port: 3389, service: 'RDP' },
        { port: 5432, service: 'PostgreSQL' },
        { port: 6379, service: 'Redis' },
        { port: 8080, service: 'HTTP-ALT' }
    ];

    const results = [];

    // Parallel probing for efficiency
    const probes = gateways.flatMap(ip => 
        criticalPorts.map(async ({ port, service }) => {
            const start = Date.now();
            try {
                // We use a short timeout to distinguish between open/filtered
                const controller = new AbortController();
                const timeout = setTimeout(() => controller.abort(), 1500);

                await fetch(`http://${ip}:${port}`, { 
                    mode: 'no-cors', 
                    signal: controller.signal 
                });
                
                clearTimeout(timeout);
                results.push({ target: `${ip}:${port}`, service, status: 'OPEN/RESPONDING', rtt: Date.now() - start });
            } catch (e) {
                if (e.name === 'AbortError') {
                    results.push({ target: `${ip}:${port}`, service, status: 'FILTERED (TIMED_OUT)' });
                } else {
                    results.push({ target: `${ip}:${port}`, service, status: 'CLOSED/REFUSED' });
                }
            }
        })
    );

    await Promise.all(probes);
    return results.sort((a, b) => (a.status === 'OPEN/RESPONDING' ? -1 : 1));
};
