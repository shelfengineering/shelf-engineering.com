/* Shelf Engineering v2 — shared interactions.
   Everything is reveal-driven and respects prefers-reduced-motion. */
(function () {
  const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  // reveal on scroll
  const io = new IntersectionObserver((entries) => {
    entries.forEach((e) => {
      if (!e.isIntersecting) return;
      e.target.classList.add('revealed');
      io.unobserve(e.target);
      if (e.target.dataset.count !== undefined) countUp(e.target);
      if (e.target.dataset.console !== undefined) runConsole(e.target);
    });
  }, { threshold: 0.2, rootMargin: '0px 0px -6% 0px' });
  document.querySelectorAll('.reveal').forEach((el) => io.observe(el));

  // stat count-up: <span data-num="900" data-prefix="" data-suffix="M">
  function countUp(scope) {
    scope.querySelectorAll('[data-num]').forEach((el) => {
      const target = parseFloat(el.dataset.num);
      const prefix = el.dataset.prefix || '';
      const suffix = el.dataset.suffix || '';
      if (reduced) { el.textContent = prefix + target + suffix; return; }
      const t0 = performance.now(), dur = 1400;
      function tick(t) {
        const p = Math.min((t - t0) / dur, 1);
        const eased = 1 - Math.pow(1 - p, 3);
        el.textContent = prefix + Math.round(target * eased) + suffix;
        if (p < 1) requestAnimationFrame(tick);
      }
      requestAnimationFrame(tick);
    });
  }

  // console prompt lines appear one by one
  function runConsole(scope) {
    const lines = scope.querySelectorAll('.pline');
    lines.forEach((line, i) => {
      if (reduced) { line.classList.add('on'); return; }
      setTimeout(() => line.classList.add('on'), 500 + i * 700);
    });
  }

  // safety net: reveal everything after load regardless
  setTimeout(() => {
    document.querySelectorAll('.reveal:not(.revealed)').forEach((el) => {
      el.classList.add('revealed');
      if (el.dataset.count !== undefined) countUp(el);
      if (el.dataset.console !== undefined) runConsole(el);
    });
  }, 3000);
})();
