/**
 * Pinpoint Module: Node Health
 * Level 1: Standard Recon
 */
export default {
    id: 'performance',
    title: 'Node_Health',
    level: 1,
    info: "Measures system performance and memory load.",
    steps: ["Measure JS heap usage.", "Analyze navigation timings."],
    run: async () => {
        const perf = window.performance;
        const memory = perf.memory ? {
            used: Math.round(perf.memory.usedJSHeapSize / 1048576) + 'MB',
            total: Math.round(perf.memory.totalJSHeapSize / 1048576) + 'MB',
            limit: Math.round(perf.memory.jsHeapSizeLimit / 1048576) + 'MB'
        } : "Memory_API_Unsupported";

        return {
            loadTime: (perf.timing.loadEventEnd - perf.timing.navigationStart) + 'ms',
            domReady: (perf.timing.domContentLoadedEventEnd - perf.timing.navigationStart) + 'ms',
            memoryUsage: memory
        };
    }
};
