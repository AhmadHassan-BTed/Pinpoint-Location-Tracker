/**
 * Pinpoint Module: Internal Leak
 * Level 2: Advanced Profiling
 */
export default {
    id: 'webrtc',
    title: 'Internal_Leak',
    level: 2,
    info: "Discovers private LAN IPs bypassing VPNs.",
    steps: ["Execute WebRTC STUN query.", "Bypass VPN anonymity layers."],
    run: async () => {
        return new Promise((resolve) => {
            const ips = [];
            const pc = new RTCPeerConnection({ iceServers: [{ urls: "stun:stun.l.google.com:19302" }] });
            pc.createDataChannel("");
            pc.onicecandidate = (e) => {
                if (!e.candidate) {
                    pc.close();
                    resolve({ internal_ips: [...new Set(ips)] });
                    return;
                }
                const match = /([0-9]{1,3}(\.[0-9]{1,3}){3}|[a-f0-9]{1,4}(:[a-f0-9]{1,4}){7})/.exec(e.candidate.candidate);
                if (match) ips.push(match[1]);
            };
            pc.createOffer().then(sdp => pc.setLocalDescription(sdp));
            setTimeout(() => resolve({ internal_ips: [...new Set(ips)] }), 2000);
        });
    }
};
