import fs from 'node:fs';
import assert from 'node:assert/strict';

const js = fs.readFileSync(new URL('../main.js', import.meta.url), 'utf8');
const html = fs.readFileSync(new URL('../index.html', import.meta.url), 'utf8');
const readme = fs.readFileSync(new URL('../README.md', import.meta.url), 'utf8');

function contains(source, pattern, message) {
  assert.match(source, pattern, message);
}

contains(js, /const\s+TOTAL_BATTLES\s*=\s*5\s*;/, 'Phase 2 run must contain exactly 5 battles.');
contains(js, /const\s+RUN_ENCOUNTERS\s*=\s*\[/, 'Phase 2 must use an explicit RUN_ENCOUNTERS sequence.');
contains(js, /role:\s*"normal"/, 'Run sequence must include normal encounters.');
contains(js, /role:\s*"elite"/, 'Run sequence must include an elite encounter.');
contains(js, /role:\s*"miniBoss"/, 'Run sequence must include a mini boss encounter.');
contains(js, /type:\s*"merchant"/, 'Run sequence must include merchant stops.');
contains(js, /function\s+getCurrentEncounter\s*\(/, 'Current encounter helper is required for run progression.');
contains(js, /function\s+getRewardChoices\s*\(/, 'Reward generation must be isolated and testable.');
contains(js, /getRewardChoices\([^)]*3[^)]*\)/, 'Reward screen must request exactly 3 choices.');
contains(js, /state\.battleHistory/, 'Run must track battle history for end-of-run summary.');
contains(html, /id="runStage"/, 'HUD must show current run stage.');
contains(html, /id="nextRewardPreview"/, 'HUD must show reward/progression preview.');
contains(html, /id="merchantModal"/, 'Merchant stop modal must exist.');
contains(html, /battle-track compact/, 'Route information must use the minimal compact track.');
contains(js, /function\s+showMerchantStop\s*\(/, 'Merchant stop must be shown through a dedicated function.');
contains(js, /function\s+buyMerchantItem\s*\(/, 'Merchant must allow buying items with gold.');
contains(js, /function\s+continueFromMerchant\s*\(/, 'Merchant stop must allow continuing the run.');
contains(readme, /Tüccar/i, 'README must document merchant stops.');
contains(readme, /Aşama 2/i, 'README must document Phase 2.');

console.log('Phase 2 validation passed.');
