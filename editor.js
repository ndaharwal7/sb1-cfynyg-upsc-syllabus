let editor = null;
let currentTheme = 'vs';
let currentZoom = 1;
let resizeObserver = null;

// Monaco Editor Setup
require.config({ paths: { vs: 'https://cdn.jsdelivr.net/npm/monaco-editor@0.43.0/min/vs' }});

require(['vs/editor/editor.main'], function() {
    initializeEditor();
    setupEventListeners();
    setupResizeHandling();
});

function initializeEditor() {
    editor = monaco.editor.create(document.getElementById('editor'), {
        value: window.diagramTemplates.flowchart,
        language: 'markdown',
        theme: currentTheme,
        minimap: { enabled: false },
        automaticLayout: false, // Changed to false to handle resize manually
        wordWrap: 'on',
        lineNumbers: 'on',
        scrollBeyondLastLine: false,
        fontSize: 14
    });

    // Initial render
    setTimeout(renderDiagram, 100);
}

function setupResizeHandling() {
    // Cleanup existing observer if any
    if (resizeObserver) {
        resizeObserver.disconnect();
    }

    // Create new ResizeObserver with debounced handler
    resizeObserver = new ResizeObserver(debounce(() => {
        if (editor) {
            editor.layout();
        }
    }, 100));

    // Observe the editor container
    const editorContainer = document.querySelector('.editor-container');
    if (editorContainer) {
        resizeObserver.observe(editorContainer);
    }
}

function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

function setupEventListeners() {
    // Diagram Type Change
    document.getElementById('diagramType').addEventListener('change', () => {
        const type = document.getElementById('diagramType').value;
        editor?.setValue(window.diagramTemplates[type]);
        renderDiagram();
    });

    // Theme Change
    document.getElementById('theme').addEventListener('change', () => {
        const theme = document.getElementById('theme').value;
        mermaid.initialize({
            startOnLoad: true,
            theme: theme
        });
        renderDiagram();
    });

    // Editor Theme Toggle
    document.getElementById('themeToggle').addEventListener('click', () => {
        currentTheme = currentTheme === 'vs' ? 'vs-dark' : 'vs';
        monaco.editor.setTheme(currentTheme);
    });

    // Render Button
    document.getElementById('renderBtn').addEventListener('click', renderDiagram);

    // Download Button
    document.getElementById('downloadBtn').addEventListener('click', downloadSVG);

    // Template Buttons
    document.querySelectorAll('.template-buttons button').forEach(button => {
        button.addEventListener('click', (e) => {
            const templateName = e.target.dataset.template;
            if (window.templates[templateName]) {
                editor?.setValue(window.templates[templateName]);
                renderDiagram();
            }
        });
    });

    // Zoom Controls
    document.getElementById('zoomInBtn').addEventListener('click', () => {
        currentZoom = Math.min(currentZoom * 1.2, 3);
        applyZoom();
    });

    document.getElementById('zoomOutBtn').addEventListener('click', () => {
        currentZoom = Math.max(currentZoom / 1.2, 0.3);
        applyZoom();
    });

    document.getElementById('resetZoomBtn').addEventListener('click', () => {
        currentZoom = 1;
        applyZoom();
    });

    // Handle window resize
    window.addEventListener('resize', debounce(() => {
        if (editor) {
            editor.layout();
        }
    }, 100));
}

function applyZoom() {
    const diagram = document.getElementById('diagram');
    diagram.style.transform = `scale(${currentZoom})`;
    diagram.style.transformOrigin = 'top left';
}

function renderDiagram() {
    if (!editor) return;

    const diagramDiv = document.getElementById('diagram');
    const errorDiv = document.getElementById('errorMessage');
    const code = editor.getValue();

    diagramDiv.innerHTML = `<pre class="mermaid">${code}</pre>`;
    errorDiv.style.display = 'none';

    try {
        mermaid.initialize({
            startOnLoad: true,
            theme: document.getElementById('theme').value,
            securityLevel: 'loose',
            flowchart: {
                curve: 'basis',
                padding: 15
            },
            er: {
                layoutDirection: 'TB',
                minEntityWidth: 100,
                minEntityHeight: 75
            },
            gantt: {
                fontSize: 14,
                numberSectionStyles: 4
            }
        });
        
        mermaid.init(undefined, '.mermaid');
        applyZoom();
    } catch (error) {
        errorDiv.textContent = `Error: ${error.message}`;
        errorDiv.style.display = 'block';
    }
}

function downloadSVG() {
    const svgElement = document.querySelector('#diagram svg');
    if (svgElement) {
        const svgData = new XMLSerializer().serializeToString(svgElement);
        const blob = new Blob([svgData], { type: 'image/svg+xml' });
        const url = URL.createObjectURL(blob);
        const link = document.createElement('a');
        link.href = url;
        link.download = 'diagram.svg';
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
        URL.revokeObjectURL(url);
    }
}

// Initialize Mermaid
mermaid.initialize({
    startOnLoad: true,
    theme: 'default',
    securityLevel: 'loose',
    flowchart: {
        curve: 'basis',
        padding: 15
    }
});