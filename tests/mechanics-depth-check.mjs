import fs from 'node:fs';
import assert from 'node:assert/strict';
import vm from 'node:vm';

const js = fs.readFileSync(new URL('../main.js', import.meta.url), 'utf8');
const readme = fs.readFileSync(new URL('../README.md', import.meta.url), 'utf8');

function extractLiteral(name) {
  const start = js.indexOf(`const ${name} = `);
  assert.notEqual(start, -1, `${name} constant must exist.`);
  const valueStart = start + `const ${name} = `.length;
  const first = js.slice(valueStart).trimStart()[0];
  const terminator = first === '[' ? '\n];' : '\n};';
  const end = js.indexOf(terminator, valueStart);
  assert.notEqual(end, -1, `${name} literal must end cleanly.`);
  return js.slice(valueStart, end + 2);
}

const ITEMS = vm.runInNewContext(`(${extractLiteral('ITEMS')})`);
const ENEMIES = vm.runInNewContext(`(${extractLiteral('ENEMIES')})`);
const entries = Object.entries(ITEMS);

const basicKeys = new Set(['id', 'name', 'type', 'rarity', 'icon', 'cooldown', 'damage', 'block', 'startBlock', 'startDamage', 'heal', 'hpThreshold', 'description', 'tags', 'bonus']);
const mechanicKeysByItem = entries.map(([id, item]) => [id, Object.keys(item).filter(key => !basicKeys.has(key))]);
const specialItems = mechanicKeysByItem.filter(([, keys]) => keys.length > 0);
const uniqueMechanics = new Set(mechanicKeysByItem.flatMap(([, keys]) => keys));

assert.ok(specialItems.length >= 18, `At least 18 cards need non-stat mechanics; found ${specialItems.length}.`);
assert.ok(uniqueMechanics.size >= 10, `Card pool needs at least 10 distinct mechanics; found ${[...uniqueMechanics].join(', ')}.`);

const requiredMechanics = ['poison', 'pierce', 'executeThreshold', 'rampDamage', 'selfBlock', 'cleansePoison', 'enemyVulnerable', 'startSlow', 'maxHpBonus', 'regen'];
for (const mechanic of requiredMechanics) {
  assert.ok(uniqueMechanics.has(mechanic), `Missing card mechanic: ${mechanic}.`);
}

assert.match(js, /function\s+applyItemSpecialEffects\s*\(/, 'Combat must route item-specific mechanics through applyItemSpecialEffects().');
assert.match(js, /function\s+applyEnemySpecials\s*\(/, 'Enemy-specific mechanics must be handled by applyEnemySpecials().');
assert.match(js, /state\.enemy\.poisoned/, 'Enemy poison-over-time state must exist.');
assert.match(js, /enemyVulnerable/, 'Vulnerability mechanic must affect combat.');

const enemyMechanicKeys = ['enrageAt', 'enrageDamage', 'blockGainCooldown', 'blockGain', 'armorBreak', 'poison', 'lockCooldown', 'bleed'];
const enemiesWithMechanics = ENEMIES.filter(enemy => enemyMechanicKeys.some(key => key in enemy));
assert.ok(enemiesWithMechanics.length >= 5, 'Every battle enemy should have at least one meaningful mechanic.');
assert.ok(ENEMIES.some(enemy => enemy.enrageAt && enemy.enrageDamage), 'At least one enemy must enrage at low HP.');
assert.ok(ENEMIES.some(enemy => enemy.blockGainCooldown && enemy.blockGain), 'At least one enemy must gain block over time.');
assert.ok(ENEMIES.some(enemy => enemy.armorBreak), 'At least one enemy must break player block.');
assert.ok(ENEMIES.some(enemy => enemy.bleed), 'At least one enemy must apply bleed pressure.');

const effectiveHp = enemy => enemy.hp + (enemy.block || 0);
const totalEffectiveHp = ENEMIES.reduce((sum, enemy) => sum + effectiveHp(enemy), 0);
assert.ok(totalEffectiveHp >= 820, `Hard mode effective HP is still too low (${totalEffectiveHp}).`);
assert.ok(Math.min(...ENEMIES.map(enemy => enemy.attackDamage / enemy.attackCooldown)) >= 3.8, 'Even the weakest enemy should pressure the player.');

assert.match(readme, /özel mekanik|zehir|zırh kır/i, 'README should document that cards/enemies now have special mechanics, not only stat variants.');

console.log('Mechanics depth validation passed.');
