import fs from 'node:fs';
import assert from 'node:assert/strict';
import vm from 'node:vm';

const js = fs.readFileSync(new URL('../main.js', import.meta.url), 'utf8');
const readme = fs.readFileSync(new URL('../README.md', import.meta.url), 'utf8');

function extractConst(name) {
  const start = js.indexOf(`const ${name} = `);
  assert.notEqual(start, -1, `${name} constant must exist.`);
  const valueStart = start + `const ${name} = `.length;
  const first = js.slice(valueStart).trimStart()[0];
  if (first === '{') {
    const objectEnd = js.indexOf('\n};', valueStart);
    assert.notEqual(objectEnd, -1, `${name} object literal must end cleanly.`);
    return js.slice(valueStart, objectEnd + 2);
  }
  if (first === '[') {
    const arrayEnd = js.indexOf('\n];', valueStart);
    assert.notEqual(arrayEnd, -1, `${name} array literal must end cleanly.`);
    return js.slice(valueStart, arrayEnd + 2);
  }
  throw new Error(`${name} must be an object or array literal.`);
}

const cleanLiteral = source => source.replace(/;\s*$/, '');
const ITEMS = vm.runInNewContext(`(${cleanLiteral(extractConst('ITEMS'))})`);
const ENEMIES = vm.runInNewContext(`(${cleanLiteral(extractConst('ENEMIES'))})`);
const RUN_ENCOUNTERS = vm.runInNewContext(`(${cleanLiteral(extractConst('RUN_ENCOUNTERS'))})`);

const byEnemyId = Object.fromEntries(ENEMIES.map(enemy => [enemy.id, enemy]));
const battleEnemies = RUN_ENCOUNTERS
  .filter(encounter => encounter.type === 'battle')
  .map(encounter => ({ ...byEnemyId[encounter.enemyId], role: encounter.role, label: encounter.label }));

assert.equal(battleEnemies.length, 5, 'The run should still have 5 battles.');

const effectiveHp = enemy => enemy.hp + (enemy.block || 0);
const totalEffectiveHp = battleEnemies.reduce((sum, enemy) => sum + effectiveHp(enemy), 0);
assert.ok(totalEffectiveHp >= 420, `Enemy effective HP curve is too low (${totalEffectiveHp}); simple starter damage clears too easily.`);

const starterSwordDps = (ITEMS.sword.damage + ITEMS.fireStone.bonus.damage) / ITEMS.sword.cooldown;
const starterShieldBps = ITEMS.shield.block / ITEMS.shield.cooldown;

for (let index = 1; index < battleEnemies.length; index++) {
  assert.ok(
    effectiveHp(battleEnemies[index]) > effectiveHp(battleEnemies[index - 1]) * 1.18,
    `${battleEnemies[index].name} should be a clear durability step up from ${battleEnemies[index - 1].name}.`
  );
}

for (const enemy of battleEnemies) {
  const rawDps = enemy.attackDamage / enemy.attackCooldown;
  assert.ok(rawDps >= 2.5, `${enemy.name} raw DPS is too low to pressure the player.`);
  assert.ok(rawDps > starterShieldBps * 1.35, `${enemy.name} should beat starter shield sustain without upgrades.`);
}

const miniBoss = battleEnemies.find(enemy => enemy.role === 'miniBoss');
assert.ok(miniBoss, 'Run must include a mini boss.');
const starterTimeToKillBoss = effectiveHp(miniBoss) / starterSwordDps;
assert.ok(starterTimeToKillBoss >= 40, `Starter sword + fire stone kills mini boss too quickly (${starterTimeToKillBoss.toFixed(1)}s).`);
assert.ok(miniBoss.attackDamage >= 12, 'Mini boss hit damage must punish glass-cannon/simple builds.');
assert.ok(miniBoss.lockCooldown <= 5 && miniBoss.lockDuration >= 3, 'Mini boss lock mechanic must be frequent enough to disrupt one-item builds.');

assert.match(readme, /zorluk|zor|tehdit/i, 'README should document the harder difficulty pass.');

console.log('Difficulty validation passed.');
