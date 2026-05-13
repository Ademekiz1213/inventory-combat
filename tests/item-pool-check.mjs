import fs from 'node:fs';
import assert from 'node:assert/strict';
import vm from 'node:vm';

const js = fs.readFileSync(new URL('../main.js', import.meta.url), 'utf8');

function extractConst(name) {
  const start = js.indexOf(`const ${name} = `);
  assert.notEqual(start, -1, `${name} constant must exist.`);
  const valueStart = start + `const ${name} = `.length;
  const end = js.indexOf('\n};', valueStart);
  assert.notEqual(end, -1, `${name} object must end with };`);
  return js.slice(valueStart, end + 2);
}

const ITEMS = vm.runInNewContext(`(${extractConst('ITEMS')})`);
const rewardPoolMatch = js.match(/const\s+REWARD_POOL\s*=\s*\[([^\]]+)\]/);
const merchantPoolMatch = js.match(/const\s+MERCHANT_POOL\s*=\s*\[([^\]]+)\]/);
assert.ok(rewardPoolMatch, 'REWARD_POOL must be defined.');
assert.ok(merchantPoolMatch, 'MERCHANT_POOL must be defined.');

const parsePool = source => [...source.matchAll(/"([^"]+)"/g)].map(m => m[1]);
const rewardPool = parsePool(rewardPoolMatch[1]);
const merchantPool = parsePool(merchantPoolMatch[1]);
const rewardWeightsMatch = js.match(/const\s+RARITY_REWARD_WEIGHTS\s*=\s*({[^;]+});/s);
assert.ok(rewardWeightsMatch, 'Reward generation must define rarity weights for balanced card frequency.');
const rewardWeights = vm.runInNewContext(`(${rewardWeightsMatch[1]})`);
const entries = Object.entries(ITEMS);
const ids = entries.map(([id, item]) => item.id || id);

assert.equal(entries.length, 50, 'Item/card pool must contain exactly 50 cards.');
assert.equal(new Set(ids).size, 50, 'Every card id must be unique.');

for (const [key, item] of entries) {
  assert.equal(item.id, key, `${key} id must match its object key.`);
  assert.ok(item.name && item.description && item.icon, `${key} must have name, description and icon.`);
  assert.ok(['weapon', 'defense', 'booster', 'passive', 'consumable', 'start'].includes(item.type), `${key} has a supported type.`);
  assert.ok(['common', 'uncommon', 'rare', 'epic', 'legendary'].includes(item.rarity), `${key} has a supported rarity.`);
  if (item.type === 'weapon') {
    assert.ok(item.damage > 0 && item.cooldown >= 0.8 && item.cooldown <= 5, `${key} weapon must have balanced damage/cooldown.`);
    const dps = item.damage / item.cooldown;
    assert.ok(dps >= 1.6 && dps <= 5.2, `${key} weapon DPS must stay in prototype balance band.`);
  }
  if (item.type === 'defense') {
    assert.ok(item.block > 0 && item.cooldown >= 2 && item.cooldown <= 6, `${key} defense must have balanced block/cooldown.`);
    const bps = item.block / item.cooldown;
    assert.ok(bps >= 1.2 && bps <= 2.8, `${key} block-per-second must stay in prototype balance band.`);
  }
  if (item.type === 'booster') {
    assert.ok(item.bonus?.targetType, `${key} booster must declare a targetType.`);
    assert.ok(item.bonus.label, `${key} booster must explain its bonus label.`);
  }
}

const byType = entries.reduce((acc, [, item]) => ({ ...acc, [item.type]: (acc[item.type] || 0) + 1 }), {});
assert.deepEqual(byType, {
  weapon: 14,
  defense: 8,
  passive: 7,
  consumable: 6,
  booster: 10,
  start: 5
}, '50-card pool must keep a balanced type spread.');

const byRarity = entries.reduce((acc, [, item]) => ({ ...acc, [item.rarity]: (acc[item.rarity] || 0) + 1 }), {});
assert.deepEqual(byRarity, {
  common: 18,
  uncommon: 16,
  rare: 10,
  epic: 5,
  legendary: 1
}, '50-card pool must keep a controlled rarity curve.');

assert.ok(
  rewardWeights.common > rewardWeights.uncommon &&
  rewardWeights.uncommon > rewardWeights.rare &&
  rewardWeights.rare > rewardWeights.epic &&
  rewardWeights.epic > rewardWeights.legendary,
  'Reward rarity weights must make common cards more frequent than legendary cards.'
);

assert.equal(rewardPool.length, 50, 'Reward pool must expose all 50 cards.');
assert.equal(new Set(rewardPool).size, 50, 'Reward pool must not duplicate cards.');
assert.deepEqual(new Set(rewardPool), new Set(ids), 'Reward pool must match the full card list.');
assert.ok(merchantPool.length >= 20, 'Merchant pool should have enough variety.');
for (const id of merchantPool) assert.ok(ITEMS[id], `Merchant pool references existing item ${id}.`);

console.log('50-card item pool validation passed.');
