/**
 * Pinpoint Core: Permission Auditor
 * 
 * Demonstrates how a site can check which sensitive permissions are already granted.
 */

/**
 * Checks the status of sensitive browser permissions.
 * @returns {Promise<Object>}
 */
export const auditPermissions = async () => {
  const sensors = ['geolocation', 'notifications', 'push', 'camera', 'microphone'];
  const results = {};

  if (!navigator.permissions) return { supported: false };

  for (const sensor of sensors) {
    try {
      const status = await navigator.permissions.query({ name: sensor });
      results[sensor] = status.state;
    } catch (e) {
      results[sensor] = 'unsupported';
    }
  }

  return results;
};
