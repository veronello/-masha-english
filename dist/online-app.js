(() => {
  'use strict';

  // Normal browser tabs keep their usual behavior.
  const standalone = window.matchMedia('(display-mode: standalone)').matches ||
    window.navigator.standalone === true;
  if (!standalone || !/^https?:$/.test(window.location.protocol)) return;

  // GitHub Pages supplies Last-Modified for its published static files.
  // This is the date of the document actually loaded, even if it came from HTTP cache.
  const loadedModified = Date.parse(document.lastModified);
  const currentUrl = new URL(window.location.href);
  const refreshTime = Number(currentUrl.searchParams.get('_app_refresh'));
  const freshNavigation = refreshTime > 0 &&
    Math.abs(Date.now() - refreshTime) < 30000;
  currentUrl.searchParams.delete('_app_refresh');
  window.history.replaceState(window.history.state, '', currentUrl.href);

  let checking = false;
  let navigating = false;
  let pendingResume = false;

  async function checkForUpdate() {
    if (checking || navigating || document.visibilityState !== 'visible' ||
        window.navigator.onLine === false) return;
    checking = true;
    const controller = new AbortController();
    const timeout = window.setTimeout(() => controller.abort(), 8000);
    try {
      const probe = new URL(currentUrl.href);
      probe.searchParams.set('_app_check', String(Date.now()));
      const response = await fetch(probe.href, {
        method: 'HEAD',
        cache: 'no-store',
        signal: controller.signal
      });
      if (!response.ok || document.visibilityState !== 'visible') return;
      const contentType = response.headers.get('content-type') || '';
      if (!contentType.includes('text/html')) return;
      const publishedModified = Date.parse(response.headers.get('last-modified'));
      if (Number.isFinite(loadedModified) && Number.isFinite(publishedModified) &&
          publishedModified <= loadedModified) return;

      // A fresh URL bypasses the old HTML cache. The marker suppresses a second
      // startup check, including when a host does not supply Last-Modified.
      const next = new URL(currentUrl.href);
      next.searchParams.set('_app_refresh', String(Date.now()));
      navigating = true;
      window.location.replace(next.href);
    } catch {
      // A failed connection leaves the currently open page undisturbed.
    } finally {
      window.clearTimeout(timeout);
      checking = false;
      if (pendingResume && !navigating) {
        pendingResume = false;
        void checkForUpdate();
      }
    }
  }

  function resume() {
    if (document.visibilityState !== 'visible') return;
    if (checking) pendingResume = true;
    else void checkForUpdate();
  }

  document.addEventListener('visibilitychange', resume);
  window.addEventListener('pageshow', event => { if (event.persisted) resume(); });
  window.addEventListener('online', resume);
  if (!freshNavigation) void checkForUpdate();
})();
