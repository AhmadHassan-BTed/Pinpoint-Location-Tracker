/**
 * Pinpoint Framework: Dynamic Engine
 * Zero Coupling // High Cohesion
 */

export const PinpointEngine = {
    modules: [],
    
    async bootstrap() {
        try {
            // Step 1: Discover modules from manifest
            const response = await fetch('./src/config/modules.json');
            const { active_modules } = await response.json();
            
            // Step 2: Dynamic Import (Zero Coupling)
            const loadPromises = active_modules.map(async (path) => {
                try {
                    // Import dynamically using relative path
                    const module = await import(`../../${path}`);
                    return module.default;
                } catch (e) {
                    console.error(`Failed to load module at ${path}:`, e);
                    return null;
                }
            });

            this.modules = (await Promise.all(loadPromises)).filter(m => m !== null);
            this.render();
        } catch (e) {
            console.error("Framework Bootstrap Failed:", e);
        }
    },

    render() {
        const container = document.getElementById('sections-container');
        if (!container) return;
        container.innerHTML = '';

        const levels = [
            { lvl: 1, title: 'Level 1 // Standard Reconnaissance' },
            { lvl: 2, title: 'Level 2 // Advanced Profiling' },
            { lvl: 3, title: 'Level 3 // Critical Intelligence' },
            { lvl: 4, title: 'Level 4 // High-Fidelity HW Exploits' }
        ];

        levels.forEach(level => {
            const section = document.createElement('div');
            section.className = `threat-section lvl-${level.lvl}`;
            section.innerHTML = `
                <div class="threat-header">${level.title}</div>
                <div class="grid" id="grid-${level.lvl}"></div>
            `;
            container.appendChild(section);
        });

        this.modules.forEach(mod => {
            const grid = document.getElementById(`grid-${mod.level}`);
            if (!grid) return;
            
            const card = document.createElement('div');
            card.className = 'cyber-card';
            card.innerHTML = `
                <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 20px; border-bottom: 1px solid rgba(255,255,255,0.05); padding-bottom: 12px;">
                    <div style="display: flex; align-items: center;">
                        <div class="info-btn" id="info-${mod.id}">i</div>
                        <span style="font-size: 10px; font-weight: bold; letter-spacing: 2px;">${mod.title}</span>
                    </div>
                    <button class="cyber-btn" id="exec-${mod.id}">EXEC</button>
                </div>
                <pre id="field-${mod.id}" class="terminal-output">_AWAITING_COMMAND...</pre>
            `;
            grid.appendChild(card);

            document.getElementById(`info-${mod.id}`).onclick = () => this.showRisk(mod);
            document.getElementById(`exec-${mod.id}`).onclick = () => this.runModule(mod);
        });
    },

    showRisk(mod) {
        const modal = document.getElementById('modal-box');
        modal.className = `modal-content m-lvl-${mod.level}`;
        document.getElementById('m-title').innerText = `RECON_INTEL: ${mod.id.toUpperCase()}`;
        let list = '<ul class="steps-list">' + mod.steps.map(s => `<li>${s}</li>`).join('') + '</ul>';
        document.getElementById('m-body').innerHTML = `
            <p><b class="m-accent" style="letter-spacing:2px; text-transform:uppercase;">Exposure:</b><br><span class="m-accent" style="opacity:0.8;">${mod.info}</span></p>
            <span class="m-accent" style="font-weight:bold; letter-spacing:2px; text-transform:uppercase;">Attack_Phases:</span>
            ${list}
        `;
        document.getElementById('modal-overlay').style.display = 'flex';
    },

    async runModule(mod) {
        const field = document.getElementById(`field-${mod.id}`);
        field.innerText = ">> INITIALIZING_DYNAMIC_MODULE...\n>> PROBING_VECTORS...";
        try {
            const data = await mod.run();
            field.innerText = ">> DATA_ACQUIRED\n>> PAYLOAD:\n" + JSON.stringify(data, null, 2);
        } catch (error) {
            field.innerText = ">> EXECUTION_TERMINATED\n>> " + error.message;
        }
    }
};
