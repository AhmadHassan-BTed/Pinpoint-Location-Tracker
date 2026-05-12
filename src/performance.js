/**
 * Pinpoint Core: Performance Utility
 * 
 * Extracts memory and timing metrics from the browser.
 */

/**
 * Gathers browser performance and memory metrics.
 * @returns {Object}
 */
export const extractPerformanceMetrics = () => {
  const memory = performance.memory || {};
  const timing = performance.getEntriesByType('navigation')[0] || {};

  return {
    memory: {
      usedJSHeapSize: (memory.usedJSHeapSize / 1048576).toFixed(2) + ' MB',
      totalJSHeapSize: (memory.totalJSHeapSize / 1048576).toFixed(2) + ' MB',
      jsHeapSizeLimit: (memory.jsHeapSizeLimit / 1048576).toFixed(2) + ' MB',
    },
    timing: {
      loadTime: timing.loadEventEnd - timing.loadEventStart,
      domReady: timing.domContentLoadedEventEnd - timing.domContentLoadedEventStart,
      dnsLookup: timing.domainLookupEnd - timing.domainLookupStart,
    },
    uptime: performance.now().toFixed(0) + ' ms'
  };
};
