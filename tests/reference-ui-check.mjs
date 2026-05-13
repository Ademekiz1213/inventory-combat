import fs from 'node:fs';
import assert from 'node:assert/strict';

const html = fs.readFileSync(new URL('../index.html', import.meta.url), 'utf8');
const css = fs.readFileSync(new URL('../style.css', import.meta.url), 'utf8');

function contains(source, pattern, message) {
  assert.match(source, pattern, message);
}

contains(html, /class="top-strip"/, 'Reference UI needs a compact top strip.');
contains(html, /id="routeTrack"/, 'Top strip must include a left route tracker.');
contains(html, /id="topModeTitle"/, 'Top center must expose the current mode title.');
contains(html, /class="resource-cluster"/, 'Top right must group gold and HP resources.');
contains(html, /class="reference-layout"/, 'Main area must use a three-column reference layout.');
contains(html, /class="left-hero-column"/, 'Left column must contain character/build panels.');
contains(html, /class="center-bag-column"/, 'Center column must contain the backpack board.');
contains(html, /class="right-enemy-column"/, 'Right column must contain enemy intent and enemy card.');
contains(html, /class="action-rail"/, 'A vertical action rail between hero and bag must exist.');
contains(html, /id="enemyIntentPanel"/, 'Right side must have a dedicated enemy intent panel.');
contains(html, /class="loot-row"/, 'Bottom of center area must show item/reward cards like the reference.');
contains(html, /id="bagTitle"/, 'Backpack panel must have a bag title header.');
contains(html, /class="[^"]*build-summary-toggle[^"]*"/, 'Left bottom must include a build summary box.');

contains(css, /\.top-strip\s*\{/, 'Top strip must be styled.');
contains(css, /\.reference-layout\s*\{[^}]*grid-template-columns:\s*240px\s+74px\s+minmax\(480px,\s*1fr\)\s+260px/s, 'Reference layout must use left/action/center/right columns.');
contains(css, /\.bag-frame\s*\{/, 'Central bag frame must be styled.');
contains(css, /\.action-rail\s*\{/, 'Action rail must be styled.');
contains(css, /\.enemy-intent-panel\s*\{/, 'Enemy intent panel must be styled.');
contains(css, /\.loot-row\s*\{/, 'Bottom item selection row must be styled.');
contains(css, /background:\s*radial-gradient[^;]+#050b0c/s, 'Overall palette should shift to dark forest/teal reference background.');

console.log('Reference UI validation passed.');
