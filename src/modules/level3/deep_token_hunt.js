/**
 * Pinpoint Module: Deep Token Hunt
 * Level 3: Critical Intelligence
 */
export default {
    id: 'storage',
    title: 'Deep_Token_Hunt',
    level: 3,
    info: "Scans storage for JWTs, API keys, and session tokens.",
    steps: ["Audit LocalStorage/Cookies.", "Execute token replay."],
    run: async () => {
        const patterns = {
            JWT: /ey[A-Za-z0-9-_=]+\.[A-Za-z0-9-_=]+\.?[A-Za-z0-9-_.+/=]*/g,
            API_KEY: /(?:key|api|token|secret|auth)[_-]?(?:[A-Za-z0-9_-]){16,}/gi,
            CREDIT_CARD: /\b(?:4[0-9]{12}(?:[0-9]{3})?|5[1-5][0-9]{14}|3[47][0-9]{13}|6(?:011|5[0-9]{2})[0-9]{12})\b/g
        };
        const leaked = {};
        for (let i = 0; i < localStorage.length; i++) {
            const key = localStorage.key(i);
            const val = localStorage.getItem(key);
            Object.keys(patterns).forEach(p => {
                if (patterns[p].test(val)) {
                    leaked[p] = leaked[p] || [];
                    leaked[p].push({ key, snippet: val.substring(0, 10) + '...' });
                }
            });
        }
        return Object.keys(leaked).length > 0 ? leaked : "NO_HIGH_VALUE_TOKENS_FOUND";
    }
};
