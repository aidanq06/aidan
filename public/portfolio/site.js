(() => {
  'use strict';
  const html = document.documentElement;
  let theme = html.dataset.theme === 'dark' ? 'dark' : 'light';
  const toggle = document.querySelector('[data-theme-toggle]');
  function syncTheme() {
    html.dataset.theme = theme;
    if (toggle) {
      toggle.querySelector('span:last-child').textContent = theme === 'light' ? 'Dark mode' : 'Light mode';
      toggle.setAttribute('aria-label', `Switch to ${theme === 'light' ? 'dark' : 'light'} mode`);
    }
  }
  toggle?.addEventListener('click', () => {
    theme = theme === 'light' ? 'dark' : 'light';
    try { localStorage.setItem('aq-portfolio-theme', theme); } catch (_) {}
    syncTheme();
  });
  syncTheme();
  document.querySelectorAll('.t-row, .ledger-line').forEach((row, i) => row.style.setProperty('--line-number', '"' + String(i + 1).padStart(2, '0') + '"'));
})();

(() => {
  'use strict';
  const reduce = matchMedia('(prefers-reduced-motion: reduce)');
  const disclosures = [];
  document.querySelectorAll('[data-disclosure]').forEach(details => {
    const summary = details.querySelector('summary');
    const panel = details.querySelector('.ledger-panel');
    let expanded = details.open;
    let animation;
    let reveals = [];
    function finish() {
      details.open = expanded;
      details.style.height = '';
      details.style.overflow = '';
      reveals.forEach(item => item.cancel());
      reveals = [];
      animation = null;
    }
    function setExpanded(next) {
      const from = details.getBoundingClientRect().height;
      const wasOpen = details.open;
      const elements = [...panel.querySelectorAll('[data-reveal]')];
      const frames = elements.map(el => ({ opacity: getComputedStyle(el).opacity, transform: getComputedStyle(el).transform }));
      animation?.cancel();
      reveals.forEach(item => item.cancel());
      expanded = next;
      details.dataset.expanded = String(next);
      summary.setAttribute('aria-expanded', String(next));
      panel.inert = !next;
      if (reduce.matches || !details.animate) { finish(); return; }
      details.open = true;
      details.style.height = '';
      const border = parseFloat(getComputedStyle(details).borderTopWidth) + parseFloat(getComputedStyle(details).borderBottomWidth);
      const to = next ? details.getBoundingClientRect().height : summary.getBoundingClientRect().height + border;
      details.style.height = from + 'px';
      details.style.overflow = 'hidden';
      animation = details.animate([{ height: from + 'px' }, { height: to + 'px' }], { duration: next ? 480 : 300, easing: next ? 'cubic-bezier(.16,1,.3,1)' : 'cubic-bezier(.4,0,.2,1)' });
      reveals = elements.map((el, i) => el.animate([
        wasOpen ? frames[i] : { opacity: 0, transform: 'translateY(8px)' },
        { opacity: next ? 1 : 0, transform: next ? 'translateY(0)' : 'translateY(-4px)' }
      ], { duration: next ? 340 : 160, delay: next ? 45 + i * 40 : 0, easing: 'cubic-bezier(.16,1,.3,1)', fill: 'both' }));
      animation.onfinish = finish;
    }
    summary.setAttribute('aria-expanded', String(expanded));
    summary.setAttribute('aria-controls', panel.id = summary.id + '-detail');
    panel.inert = !expanded;
    summary.addEventListener('click', event => {
      event.preventDefault();
      const next = !expanded;
      if (next) disclosures.forEach(other => { if (other.details !== details && other.isExpanded()) other.setExpanded(false); });
      setExpanded(next);
    });
    reduce.addEventListener('change', () => { if (reduce.matches && animation) { animation.cancel(); finish(); } });
    disclosures.push({ details, setExpanded, isExpanded: () => expanded });
  });

})();
