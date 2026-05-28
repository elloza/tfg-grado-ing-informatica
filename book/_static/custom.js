// Custom UI Injection (Language Switcher + PDF Button)
document.addEventListener("DOMContentLoaded", function () {
    const TEACHBOOK_VERSION = "3.0";
    if (window.TEACHBOOK_LOADED_VERSION === TEACHBOOK_VERSION) return;
    window.TEACHBOOK_LOADED_VERSION = TEACHBOOK_VERSION;

    console.log(`TeachBook v${TEACHBOOK_VERSION}: Loading UI components...`);

    // 1. Find languages.json by climbing directories
    // From /repo/es/intro.html:       ../_static/languages.json → found (prefix = "../")
    // From /repo/es/sub/page.html:    ../../_static/languages.json → found (prefix = "../../")
    // From /repo/index.html:          _static/languages.json → found (prefix = "")
    // The prefix that works IS the relative path to the book root.

    async function findLanguagesJson() {
        let prefix = '';
        for (let depth = 0; depth < 10; depth++) {
            try {
                const url = prefix + '_static/languages.json';
                const res = await fetch(url);
                if (res.ok) {
                    const languages = await res.json();
                    console.log(`TeachBook: Found languages.json at depth ${depth}, rootPrefix="${prefix}"`);
                    return { languages, rootPrefix: prefix };
                }
            } catch (e) { /* continue */ }
            prefix = '../' + prefix;
        }
        return null;
    }

    findLanguagesJson().then(result => {
        if (!result) {
            console.log("TeachBook: Language switcher disabled (languages.json not found).");
            return;
        }

        const { languages, rootPrefix } = result;

        if (languages.length > 1) {
            injectLanguageSwitcher(languages, rootPrefix);
        } else {
            console.log("TeachBook: Single language detected. Hiding switcher.");
        }

        // Inject PDF Button
        injectPDFButton(languages, rootPrefix);

        // Search page fix: Sphinx search sometimes generates duplicated language prefixes
        // like /es/es/page.html or sidebar links like es/intro.html inside /es/search.html.
        // We normalize those links client-side to keep search usable even if Sphinx emits
        // inconsistent paths in standalone multilingual builds.
        fixSearchPageLinks(rootPrefix, languages);

        // Page-level questions/comments powered by giscus + GitHub Discussions.
        injectGiscusComments();
    });

    // 3. Robust Sidebar Toggle (Manual Handler with Polling)
    // The theme's native behavior is unreliable due to ID mismatches.
    // We implement a manual toggle to guarantee functionality.
    // POLLING: We run this check multiple times to catch elements rendered late by theme JS.

    function applySidebarFix() {
        const primaryCheckbox = document.getElementById('pst-primary-sidebar-checkbox');
        // Find toggles that haven't been fixed yet
        const primaryToggles = document.querySelectorAll('label[for="__primary"]:not([data-fixed]), .primary-toggle:not([data-fixed])');

        primaryToggles.forEach(toggle => {
            console.log("TeachBook: Applying fix to primary toggle", toggle);

            primaryToggles.forEach(toggle => {
                console.log("TeachBook: Attaching desktop fix to primary toggle", toggle);

                // Mark as fixed
                toggle.setAttribute('data-fixed', 'true');

                // Do NOT remove 'for' or clone node. Let native/theme behavior persist.
                // Just ADD our listener for the desktop class toggle.
                toggle.addEventListener('click', (e) => {
                    // Do NOT prevent default or stop propagation.
                    // Let the theme handle the mobile logic.

                    // Toggle custom class for desktop support
                    // We typically only care about this on desktop, but toggling the class
                    // is harmless on mobile because our CSS is media-queried.
                    document.documentElement.classList.toggle('teachbook-sidebar-hidden');
                    console.log("TeachBook: Toggled 'teachbook-sidebar-hidden'");
                });
            });
        });

        // Secondary sidebar (if needed, same logic)
        const secondaryCheckbox = document.getElementById('pst-secondary-sidebar-checkbox');
        const secondaryToggles = document.querySelectorAll('label[for="__secondary"]:not([data-fixed]), .secondary-toggle:not([data-fixed])');

        secondaryToggles.forEach(toggle => {
            console.log("TeachBook: Applying fix to secondary toggle", toggle);
            secondaryToggles.forEach(toggle => {
                console.log("TeachBook: Attaching fix to secondary toggle", toggle);
                toggle.setAttribute('data-fixed', 'true');
                // Do NOT clone or strip. Just add listener if we needed custom logic.
                // Currently we don't need custom logic for secondary, as it usually works fine?
                // But if we wanted to be safe, we could add logic here.

                // For now, removing the cloneNode is the most important part to restore mobile.
            });
        });
    }

    // Run immediately
    applySidebarFix();

    // Re-run periodically to catch late-loading elements
    const intervalId = setInterval(applySidebarFix, 500);

    // Stop polling after 5 seconds to save resources
    setTimeout(() => clearInterval(intervalId), 5000);

    // Accessibility: OpenDyslexic Toggle
    (function() {
        // Load OpenDyslexic font from CDN (lazy — only when needed, but preloaded for instant toggle)
        const fontLink = document.createElement("link");
        fontLink.rel = "stylesheet";
        fontLink.href = "https://fonts.cdnfonts.com/css/opendyslexic";
        fontLink.id = "opendyslexic-font-link";
        document.head.appendChild(fontLink);

        // Create toggle button
        const header = document.querySelector(".article-header-buttons");
        if (!header) return;

        const btn = document.createElement("button");
        btn.className = "btn btn-sm teachbook-a11y-btn";
        btn.title = "Modo accesibilidad (OpenDyslexic) / Accessibility mode";
        btn.innerHTML = '<i class="fa-solid fa-universal-access"></i>';
        btn.setAttribute("aria-label", "Toggle accessibility font");

        // Check saved state
        if (localStorage.getItem("teachbook-opendyslexic") === "true") {
            document.documentElement.classList.add("opendyslexic-mode");
            btn.classList.add("active");
        }

        btn.addEventListener("click", function() {
            document.documentElement.classList.toggle("opendyslexic-mode");
            const isActive = document.documentElement.classList.contains("opendyslexic-mode");
            localStorage.setItem("teachbook-opendyslexic", isActive);
            btn.classList.toggle("active", isActive);
        });

        // Insert at the beginning of header buttons (before language switcher)
        header.prepend(btn);
    })();
});

function fixSearchPageLinks(rootPrefix, languages) {
    if (!window.location.pathname.endsWith('/search.html')) return;

    const langCodes = languages.map(l => l.code);

    function normalizeHref(href) {
        if (!href || href.startsWith('http://') || href.startsWith('https://') || href.startsWith('#')) {
            return href;
        }

        let fixed = href;

        // Fix duplicated lang prefix: es/es/foo.html -> es/foo.html
        langCodes.forEach(code => {
            const doubled = `${code}/${code}/`;
            if (fixed.includes(doubled)) {
                fixed = fixed.replace(doubled, `${code}/`);
            }
        });

        // On /es/search.html, sidebar links may incorrectly be rendered as es/foo.html
        // when they should be just foo.html relative to the language root.
        const currentPath = window.location.pathname;
        const currentLang = langCodes.find(code => currentPath.includes(`/${code}/`));
        if (currentLang && fixed.startsWith(`${currentLang}/`)) {
            fixed = fixed.slice(currentLang.length + 1);
        }

        return fixed;
    }

    function patchLinks(container) {
        const links = container.querySelectorAll('a[href]');
        links.forEach(link => {
            const href = link.getAttribute('href');
            const fixed = normalizeHref(href);
            if (fixed !== href) {
                link.setAttribute('href', fixed);
            }
        });
    }

    // Patch current DOM immediately
    patchLinks(document);

    // Patch search results as they are injected dynamically
    const target = document.getElementById('search-results') || document.body;
    const observer = new MutationObserver(() => patchLinks(document));
    observer.observe(target, { childList: true, subtree: true });

    console.log('TeachBook: search link fixer enabled');
}

function injectLanguageSwitcher(languages, rootPrefix) {
    const path = window.location.pathname;

    // Detect current language from URL using the codes from languages.json
    let currentLangCode = languages[0].code; // Default to first language
    languages.forEach(lang => {
        if (path.includes(`/${lang.code}/`)) currentLangCode = lang.code;
    });

    const dropdownHtml = `
        <div class="teachbook-lang-container">
            <button class="btn btn-sm teachbook-lang-btn dropdown-toggle"
                    type="button"
                    data-bs-toggle="dropdown"
                    aria-expanded="false"
                    title="Change Language / Cambiar Idioma">
                <i class="fa-solid fa-language"></i>
                <span class="lang-text">${currentLangCode.toUpperCase()}</span>
            </button>
            <ul class="teachbook-lang-dropdown">
                ${languages.map(l => {
        // rootPrefix is the relative path to the book root (e.g., "../" from /es/intro.html)
        // So rootPrefix + "en/intro.html" = "../en/intro.html" which resolves correctly
        const targetUrl = rootPrefix + `${l.code}/intro.html`;

        return `
                    <li>
                        <a href="${targetUrl}" class="dropdown-item ${l.code === currentLangCode ? 'active' : ''}">
                            ${l.name}
                        </a>
                    </li>
                    `;
    }).join('')}
            </ul>
        </div>
    `;

    const header = document.querySelector(".article-header-buttons");
    if (header) {
        const div = document.createElement("div");
        div.innerHTML = dropdownHtml.trim();
        const switcherElement = div.firstChild;
        header.prepend(switcherElement);
    }
}

function injectPDFButton(languages, rootPrefix) {
    const sidebar = document.querySelector(".bd-sidebar-primary");
    if (sidebar) {
        if (document.getElementById("custom-pdf-btn")) return;

        // Detect current language from URL using languages.json codes
        const path = window.location.pathname;
        let lang = languages[0].code;
        languages.forEach(l => {
            if (path.includes(`/${l.code}/`)) lang = l.code;
        });

        const pdfFilename = `teachbook_${lang}.pdf`;
        const pdfUrl = rootPrefix + `_static/${pdfFilename}`;

        const langStrings = {
            "es": { "text": "Libro Completo (PDF)", "title": "Descargar PDF completo" },
            "en": { "text": "Complete Book (PDF)", "title": "Download complete PDF" }
        };
        const strings = langStrings[lang] || langStrings["en"];

        const btnHtml = `
            <div class="sidebar-footer-pdf">
                <div class="custom-sidebar-pdf-container">
                    <a href="${pdfUrl}" id="custom-pdf-btn" class="btn btn-sm" download title="${strings.title}">
                        <i class="fa-solid fa-file-pdf"></i>
                        <span>${strings.text}</span>
                    </a>
                </div>
            </div>
        `;

        const div = document.createElement("div");
        div.innerHTML = btnHtml.trim();
        sidebar.appendChild(div.firstChild);
    }
}

function injectGiscusComments() {
    if (document.getElementById("tfg-giscus-thread")) return;

    const path = window.location.pathname;
    if (path.endsWith("/search.html") || path.endsWith("/genindex.html")) return;

    const article = document.querySelector("main.bd-content article.bd-article") ||
        document.querySelector("article.bd-article") ||
        document.querySelector(".bd-article");
    if (!article) return;

    const defaultConfig = {
        repo: "elloza/tfg-grado-ing-informatica",
        repoId: "R_kgDOSqGbzg",
        category: "Announcements",
        categoryId: "DIC_kwDOSqGbzs4C-AWx",
        mapping: "pathname",
        strict: "1",
        reactionsEnabled: "1",
        emitMetadata: "0",
        inputPosition: "bottom",
        theme: "preferred_color_scheme",
        lang: document.documentElement.lang && document.documentElement.lang.startsWith("en") ? "en" : "es",
        loading: "lazy",
        enableLocal: false
    };

    const config = Object.assign(defaultConfig, window.TFG_GISCUS_CONFIG || {});
    if (!config.repo || !config.repoId || !config.category || !config.categoryId) {
        console.info("TFG book: giscus is not fully configured yet. Set repoId and categoryId in custom.js or window.TFG_GISCUS_CONFIG.");
        return;
    }

    const localHosts = new Set(["localhost", "127.0.0.1", "::1", ""]);
    if (!config.enableLocal && localHosts.has(window.location.hostname)) {
        console.info("TFG book: giscus is configured but disabled on local preview.");
        return;
    }

    const wrapper = document.createElement("section");
    wrapper.id = "tfg-giscus-thread";
    wrapper.className = "tfg-giscus-thread";
    wrapper.setAttribute("aria-label", config.lang === "en" ? "Page comments" : "Comentarios de la pagina");

    const title = document.createElement("h2");
    title.textContent = config.lang === "en" ? "Questions and comments" : "Preguntas y comentarios";
    wrapper.appendChild(title);

    const help = document.createElement("p");
    help.className = "tfg-giscus-help";
    help.textContent = config.lang === "en"
        ? "Use this thread for questions about this page. Useful recurring questions may be incorporated into the FAQ."
        : "Usa este hilo para dudas sobre esta pagina. Las preguntas recurrentes utiles podran incorporarse a la FAQ.";
    wrapper.appendChild(help);

    const script = document.createElement("script");
    script.src = "https://giscus.app/client.js";
    script.async = true;
    script.crossOrigin = "anonymous";
    script.setAttribute("data-repo", config.repo);
    script.setAttribute("data-repo-id", config.repoId);
    script.setAttribute("data-category", config.category);
    script.setAttribute("data-category-id", config.categoryId);
    script.setAttribute("data-mapping", config.mapping);
    script.setAttribute("data-strict", config.strict);
    script.setAttribute("data-reactions-enabled", config.reactionsEnabled);
    script.setAttribute("data-emit-metadata", config.emitMetadata);
    script.setAttribute("data-input-position", config.inputPosition);
    script.setAttribute("data-theme", config.theme);
    script.setAttribute("data-lang", config.lang);
    script.setAttribute("data-loading", config.loading);

    wrapper.appendChild(script);
    article.appendChild(wrapper);
}
