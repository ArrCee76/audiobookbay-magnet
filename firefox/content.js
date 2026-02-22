// content.js — ABB Magnet extension
// Scrapes hash, title, and trackers then injects a banner UI at the top of the page

const FALLBACK_TRACKERS = [
  'udp://tracker.opentrackr.org:1337/announce',
  'udp://open.tracker.cl:1337/announce',
  'udp://tracker.torrent.eu.org:451/announce',
  'udp://opentracker.i2p.rocks:6969/announce',
  'udp://tracker.dler.org:6969/announce',
];

function scrape() {
  const data = { hash: null, trackers: [], title: null };

  // --- Title: ABB's <title> tag contains the book name before the pipe ---
  // e.g. "Birdman (Jack Caffery #1 - Mo Hayder) | AudioBook Bay"
  const rawTitle = document.title || '';
  const titleFromMeta = rawTitle.split('|')[0].trim();

  // Also try the main h2 in the post content as a fallback
  const h2 = document.querySelector('h2');

  if (titleFromMeta && titleFromMeta.toLowerCase() !== 'audiobookbay') {
    data.title = titleFromMeta;
  } else if (h2) {
    data.title = h2.textContent.trim();
  }

  // --- Hash and trackers from table rows ---
  document.querySelectorAll('tr').forEach(row => {
    const cells = row.querySelectorAll('td');
    if (cells.length < 2) return;

    const label = cells[0].textContent.trim().toLowerCase();
    const value = cells[1].textContent.trim();

    if (label.includes('info hash')) {
      const match = value.match(/[0-9a-fA-F]{40}|[0-9a-fA-F]{64}/);
      if (match) data.hash = match[0].toLowerCase();
    }

    if (label.includes('tracker') || label.includes('announce url')) {
      const url = value.trim();
      if ((url.startsWith('http') || url.startsWith('udp')) && !data.trackers.includes(url)) {
        data.trackers.push(url);
      }
    }
  });

  return data;
}

function buildMagnet(hash, title, trackers) {
  let uri = `magnet:?xt=urn:btih:${hash}`;
  if (title) uri += `&dn=${encodeURIComponent(title)}`;
  const list = trackers.length ? trackers : FALLBACK_TRACKERS;
  list.forEach(t => { uri += `&tr=${encodeURIComponent(t)}`; });
  return uri;
}

function injectBanner(data) {
  // Don't inject twice
  if (document.getElementById('abb-magnet-banner')) return;

  const magnet = buildMagnet(data.hash, data.title, data.trackers);

  const banner = document.createElement('div');
  banner.id = 'abb-magnet-banner';
  banner.innerHTML = `
    <div id="abb-banner-header">
      <span id="abb-banner-label">▶ ABB Magnet</span>
    </div>
    <div id="abb-banner-title">${data.title ? escapeHtml(data.title) : 'Audiobook detected'}</div>
    <div id="abb-banner-hash">${data.hash}</div>
    <div id="abb-banner-actions">
      <button id="abb-btn-get">Get Magnet</button>
      <button id="abb-btn-copy">Copy</button>
      <button id="abb-btn-cancel">Cancel</button>
    </div>
    <div id="abb-banner-confirm">✓ Magnet sent to client</div>
    <div id="abb-banner-copied">✓ Copied to clipboard</div>
  `;

  document.body.appendChild(banner);

  // Slide in
  requestAnimationFrame(() => {
    requestAnimationFrame(() => banner.classList.add('visible'));
  });

  // Get Magnet
  document.getElementById('abb-btn-get').addEventListener('click', () => {
    window.location.href = magnet;

    // Show confirmation, hide buttons
    document.getElementById('abb-banner-actions').style.display = 'none';
    document.getElementById('abb-banner-confirm').style.display = 'block';

    // Slide away after 2s
    setTimeout(() => dismissBanner(banner), 2000);
  });

  // Copy magnet to clipboard
  document.getElementById('abb-btn-copy').addEventListener('click', () => {
    navigator.clipboard.writeText(magnet).then(() => {
      const copied = document.getElementById('abb-banner-copied');
      copied.style.display = 'block';
      setTimeout(() => { copied.style.display = 'none'; }, 2000);
    });
  });

  // Cancel
  document.getElementById('abb-btn-cancel').addEventListener('click', () => {
    dismissBanner(banner);
  });
}

function dismissBanner(banner) {
  banner.classList.remove('visible');
  banner.classList.add('hiding');
  setTimeout(() => banner.remove(), 350);
}

function escapeHtml(str) {
  return str.replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;').replace(/"/g,'&quot;');
}

// Run on page load
(function init() {
  const data = scrape();
  if (data.hash) {
    injectBanner(data);
  }
})();
