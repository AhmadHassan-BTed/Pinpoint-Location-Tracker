/**
 * Pinpoint Core: WebRTC Discovery Utility
 * 
 * Demonstrates the extraction of internal (LAN) IP addresses via WebRTC leaks.
 */

/**
 * Discovers internal IP addresses by establishing a mock RTCPeerConnection.
 * @returns {Promise<Array>} - List of discovered internal/external IPs.
 */
export const extractInternalIPs = () => {
  return new Promise((resolve) => {
    const ips = [];
    const pc = new RTCPeerConnection({ iceServers: [] });
    
    pc.createDataChannel("");
    pc.createOffer().then(offer => pc.setLocalDescription(offer));
    
    pc.onicecandidate = (ice) => {
      if (!ice || !ice.candidate || !ice.candidate.candidate) {
        pc.close();
        resolve([...new Set(ips)]);
        return;
      }
      
      const parts = ice.candidate.candidate.split(" ");
      const ip = parts[4];
      if (ip) ips.push(ip);
    };

    // Timeout fallback
    setTimeout(() => {
      pc.close();
      resolve([...new Set(ips)]);
    }, 2000);
  });
};
