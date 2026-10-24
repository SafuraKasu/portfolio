/*
 * Renders SITE_CONTENT into the page and handles hash routing (#research, #projects, ...).
 * All text is inserted with textContent / DOM nodes, never innerHTML.
 */
(function () {
    const C = window.SITE_CONTENT;
    const ROUTES = ['home', 'research', 'projects', 'writing', 'about', 'contact'];
    const showSlots = new URLSearchParams(location.search).has('slots');

    // ---------- tiny DOM helper ----------
    function h(tag, attrs, ...kids) {
        const el = document.createElement(tag);
        for (const [k, v] of Object.entries(attrs || {})) {
            if (v === false || v == null) continue;
            if (k === 'class') el.className = v;
            else el.setAttribute(k, v === true ? '' : v);
        }
        for (const kid of kids.flat()) {
            if (kid == null || kid === false) continue;
            el.append(kid.nodeType ? kid : document.createTextNode(kid));
        }
        return el;
    }
    // replaceChildren() would print "null"/"undefined" for skipped optional blocks, so filter first.
    function fill(el, ...kids) {
        el.replaceChildren(...kids.flat().filter((k) => k != null && k !== false && k !== ''));
    }
    const published = (list) => (list || []).filter((x) => x.published !== false);
    const paragraphs = (list) => (list || []).map((t) => h('p', null, t));

    function extLink(label, href) {
        return h('a', { href, target: '_blank', rel: 'noopener noreferrer' }, label);
    }
    function linksRow(links) {
        const ok = (links || []).filter((l) => l.href);
        return ok.length ? h('div', { class: 'card-links' }, ok.map((l) => extLink(l.label + ' ↗', l.href))) : null;
    }

    // ---------- media ----------
    function mediaNode(m) {
        const ext = (m.src || '').split('?')[0].split('.').pop().toLowerCase();
        let body;
        if (ext === 'pdf') {
            return h('p', null, extLink((m.caption || m.alt || 'View PDF') + ' ↗', m.src));
        } else if (ext === 'mp4' || ext === 'webm') {
            body = h('video', { src: m.src, controls: true, preload: 'metadata', 'aria-label': m.alt || null });
        } else {
            if (!m.alt && m.alt !== '') console.warn('Media item missing alt text:', m.src);
            body = h('img', { src: m.src, alt: m.alt || '', loading: 'lazy', decoding: 'async' });
        }
        return h('figure', null, body, m.caption ? h('figcaption', null, m.caption) : null);
    }

    function mediaBlock(entry) {
        const items = (entry.media || []).filter((m) => m.src);
        if (items.length) return h('div', { class: 'media' }, items.map(mediaNode));
        if (showSlots && entry.plannedMedia && entry.plannedMedia.length) {
            return h('div', { class: 'media' },
                entry.plannedMedia.map((label) => h('div', { class: 'media-slot' }, 'Media slot: ' + label)));
        }
        return null;
    }

    // ---------- cards ----------
    function entryCard(e, { compact = false } = {}) {
        const metaBits = [e.role, e.org, e.period, e.kind].filter(Boolean).join(' · ');
        return h('article', { class: 'card' },
            h('h3', null, e.title),
            (e.status || metaBits) && h('div', { class: 'meta' },
                e.status && h('span', { class: 'badge' }, e.status),
                metaBits),
            compact ? h('p', null, e.blurb || (e.summary || [])[0]) : paragraphs(e.summary),
            !compact && e.scope && h('p', null, e.scope),
            !compact && e.note && h('p', { class: 'note' }, e.note),
            e.tags && e.tags.length ? h('div', { class: 'tech' }, 'Tags: ' + e.tags.join(' | ')) : null,
            compact ? null : mediaBlock(e),
            compact ? null : linksRow(e.links)
        );
    }

    function pageHead(key) {
        const p = C.pages[key];
        const head = [h('h2', { class: 'section-title', id: 'title-' + key, tabindex: '-1' }, p.title)];
        if (p.intro) head.push(h('p', { class: 'section-intro' }, p.intro));
        return head;
    }

    function previewBlock(key, label, cards, moreLabel) {
        return h('div', { class: 'preview-block' },
            h('div', { class: 'preview-head' },
                h('h2', null, label),
                h('a', { class: 'more-link', href: '#' + key }, moreLabel + ' →')),
            h('div', { class: 'grid grid-3' }, cards));
    }

    // ---------- pages ----------
    function renderHome() {
        const hero = C.hero;
        const writingFeatured = published(C.writing.articles).filter((a) => a.featured).slice(0, 3);
        const writingCards = writingFeatured.length
            ? writingFeatured.map((a) => h('article', { class: 'card' },
                h('h3', null, a.title),
                a.date && h('div', { class: 'meta' }, a.date),
                a.description && h('p', null, a.description),
                linksRow([{ label: 'Read on Medium', href: a.url }])))
            : [h('article', { class: 'card' },
                h('h3', null, 'Writing'),
                h('p', null, C.pages.writing.intro),
                linksRow([{ label: 'Medium profile', href: C.writing.profileUrl }]))];

        const el = document.getElementById('page-home');
        fill(el, 
            h('div', { class: 'hero' },
                // Real text for assistive tech; the .fx copies below are the animated visuals.
                h('h1', { id: 'title-home', tabindex: '-1' },
                    h('span', { class: 'sr-only' }, hero.name),
                    h('span', { class: 'fx', 'aria-hidden': 'true', 'data-final': hero.name }, hero.name)),
                h('p', { class: 'subtitle' },
                    h('span', { class: 'sr-only' }, hero.headline),
                    h('span', { class: 'fx', 'aria-hidden': 'true', 'data-final': hero.headline }, hero.headline)),
                h('p', { class: 'hero-meta' }, hero.meta),
                h('div', { class: 'description' }, mediaBlock(hero), paragraphs(hero.intro)),
                h('div', { class: 'hero-actions' },
                    h('a', { class: 'nav-btn', href: '#research' }, 'See research'),
                    h('a', { class: 'nav-btn', href: '#projects' }, 'See projects'))),
            previewBlock('research', 'RESEARCH', published(C.research).filter((r) => r.featured).map((r) => entryCard(r, { compact: true })), 'All research'),
            previewBlock('projects', 'PROJECTS', published(C.projects).filter((p) => p.featured).map((p) => entryCard(p, { compact: true })), 'All projects'),
            previewBlock('writing', 'WRITING', writingCards, 'Writing')
        );
    }

    function renderResearch() {
        fill(document.getElementById('page-research'), 
            ...pageHead('research'),
            h('div', { class: 'grid' }, published(C.research).map((r) => entryCard(r))),
            C.researchInterests && h('div', { class: 'grid' },
                h('div', { class: 'card' }, h('p', null, C.researchInterests)))
        );
    }

    function renderProjects() {
        fill(document.getElementById('page-projects'), 
            ...pageHead('projects'),
            h('div', { class: 'grid grid-3' }, published(C.projects).map((p) => entryCard(p)))
        );
    }

    function renderWriting() {
        const w = C.writing;
        const articles = published(w.articles);
        fill(document.getElementById('page-writing'), 
            ...pageHead('writing'),
            articles.length
                ? h('div', { class: 'grid grid-3' }, articles.map((a) => h('article', { class: 'card' },
                    h('h3', null, a.title),
                    a.date && h('div', { class: 'meta' }, a.date),
                    a.description && h('p', null, a.description),
                    mediaBlock(a),
                    linksRow([{ label: 'Read on ' + w.platform, href: a.url }]))))
                : null,
            h('div', { class: 'grid', style: articles.length ? 'margin-top:2rem' : null },
                h('div', { class: 'card' },
                    h('h3', null, w.platform.toUpperCase()),
                    h('p', null, w.emptyNote),
                    showSlots && !articles.length ? h('div', { class: 'media' },
                        (w.plannedMedia || []).map((l) => h('div', { class: 'media-slot' }, 'Media slot: ' + l))) : null,
                    linksRow([{ label: w.platform + ' profile', href: w.profileUrl }])))
        );
    }

    function renderAbout() {
        const a = C.about;
        const skillsCard = h('div', { class: 'card' }, h('h3', null, 'SKILLS.QBT'),
            h('ul', { class: 'plain' }, a.skills.map((s) => h('li', null, s))));
        const achievements = published(a.achievements);
        fill(document.getElementById('page-about'), 
            ...pageHead('about'),
            h('div', { class: 'grid grid-2' },
                h('div', { class: 'card' }, h('h3', null, 'PROFILE.DAT'), paragraphs(a.paragraphs),
                    mediaBlock(a)),
                skillsCard),
            h('div', { class: 'grid grid-2' },
                h('div', { class: 'card' }, h('h3', null, 'EDUCATION.EDU'),
                    h('ul', { class: 'plain' }, a.education.map((e) => h('li', null,
                        h('strong', null, e.org), h('br'), e.detail, h('br'), e.period)))),
                h('div', { class: 'card' }, h('h3', null, 'EXPERIENCE.LOG'),
                    h('ul', { class: 'plain' }, a.experience.map((e) => h('li', null,
                        h('strong', null, e.role + ', ' + e.org), h('br'), e.period, h('br'), e.detail))))),
            achievements.length ? h('div', { class: 'grid' },
                h('div', { class: 'card' }, h('h3', null, 'ACHIEVEMENTS.LOG'),
                    h('ul', { class: 'plain' }, achievements.map((x) => h('li', null,
                        h('strong', null, x.title), x.detail ? h('br') : null, x.detail))))) : null
        );
    }

    function renderContact() {
        const c = C.contact;
        const address = c.email.user + '@' + c.email.domain;
        fill(document.getElementById('page-contact'), 
            h('div', { class: 'contact-info' },
                h('h2', { class: 'section-title', id: 'title-contact', tabindex: '-1' }, C.pages.contact.title),
                h('p', null, c.tagline),
                h('ul', { class: 'contact-list' },
                    h('li', null, 'Email: ', h('a', { href: 'mailto:' + address }, address)),
                    c.links.map((l) => h('li', null, l.label + ': ', extLink(l.href.replace(/^https?:\/\//, '').replace(/\/$/, ''), l.href))),
                    c.location && h('li', null, 'Location: ' + c.location)))
        );
    }

    // ---------- nav + router ----------
    function renderNav() {
        fill(document.getElementById('navList'), 
            ...ROUTES.map((r) => h('li', null, h('a', { href: '#' + r, 'data-route': r }, C.pages[r].nav))));
    }

    let heroPlayed = false;
    function currentRoute() {
        const r = location.hash.replace(/^#\/?/, '');
        return ROUTES.includes(r) ? r : 'home';
    }

    function show(route, moveFocus) {
        document.querySelectorAll('.content-section').forEach((s) => (s.hidden = s.dataset.route !== route));
        document.querySelectorAll('#navList a').forEach((a) => {
            if (a.dataset.route === route) a.setAttribute('aria-current', 'page');
            else a.removeAttribute('aria-current');
        });
        document.title = route === 'home' ? C.meta.siteTitle : C.pages[route].title + ' | ' + C.meta.name;
        window.scrollTo(0, 0);
        if (moveFocus) {
            const heading = document.getElementById('title-' + route);
            if (heading) heading.focus({ preventScroll: true });
        }
        if (route === 'home' && !heroPlayed) {
            heroPlayed = true;
            document.querySelectorAll('#page-home .fx').forEach((fx, i) =>
                window.SiteEffects.collapseText(fx, fx.dataset.final, i === 0 ? 100 : 500, i === 0 ? 600 : 900));
        }
    }

    document.getElementById('footerText').textContent = C.meta.footer;
    renderNav();
    renderHome();
    renderResearch();
    renderProjects();
    renderWriting();
    renderAbout();
    renderContact();

    window.addEventListener('hashchange', () => show(currentRoute(), true));
    show(currentRoute(), false);
})();
