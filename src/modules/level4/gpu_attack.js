/**
 * Pinpoint Module: GPU Silicon Trace
 * Level 4: Critical Hardware Exposure
 */
export default {
    id: 'gpu_trace',
    title: 'GPU_Silicon_Trace',
    level: 4,
    info: "Extracts raw, unmasked GPU hardware and driver metadata bypassing browser anonymity layers.",
    steps: [
        "Initialize WebGL high-performance context.",
        "Request the WEBGL_debug_renderer_info extension.",
        "Extract UNMASKED_VENDOR and UNMASKED_RENDERER silicon IDs."
    ],
    run: async () => {
        const canvas = document.createElement('canvas');
        const gl = canvas.getContext('webgl') || canvas.getContext('experimental-webgl');
        if (!gl) throw new Error("WebGL_Unavailable");
        const debugInfo = gl.getExtension('WEBGL_debug_renderer_info');
        if (!debugInfo) return { status: "MASKED", note: "Standard browser masking active." };
        return {
            vendor: gl.getParameter(debugInfo.UNMASKED_VENDOR_WEBGL),
            renderer: gl.getParameter(debugInfo.UNMASKED_RENDERER_WEBGL),
            gl_version: gl.getParameter(gl.VERSION),
            shading_lang_version: gl.getParameter(gl.SHADING_LANGUAGE_VERSION)
        };
    }
};
