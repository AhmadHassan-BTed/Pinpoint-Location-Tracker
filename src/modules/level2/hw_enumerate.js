/**
 * Pinpoint Module: HW Enumerate
 * Level 2: Advanced Profiling
 */
export default {
    id: 'media',
    title: 'HW_Enumerate',
    level: 2,
    info: "Enumerates connected media hardware models.",
    steps: ["Query MediaDevices API.", "Map camera/mic models."],
    run: async () => {
        if (!navigator.mediaDevices) throw new Error("MediaDevices_Unsupported");
        const devices = await navigator.mediaDevices.enumerateDevices();
        return devices.map(d => ({
            kind: d.kind,
            label: d.label || "PERMISSION_REQUIRED",
            id: d.deviceId.substring(0, 8) + "..."
        }));
    }
};
