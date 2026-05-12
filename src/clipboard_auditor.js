/**
 * Pinpoint Core: Clipboard Security Auditor
 * 
 * Demonstrates the exposure and security restrictions of the Clipboard API.
 */

/**
 * Checks the current security state and availability of clipboard access.
 * @returns {Promise<Object>}
 */
export const checkClipboardSecurity = async () => {
  const results = {
    supported: !!navigator.clipboard,
    permissions: {}
  };

  if (!navigator.permissions || !navigator.clipboard) return results;

  try {
    const readStatus = await navigator.permissions.query({ name: "clipboard-read" });
    const writeStatus = await navigator.permissions.query({ name: "clipboard-write" });
    
    results.permissions = {
      read: readStatus.state,
      write: writeStatus.state
    };
  } catch (e) {
    results.permissions = "Permission Query Unsupported";
  }

  return results;
};
