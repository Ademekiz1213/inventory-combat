import fs from 'node:fs';
import assert from 'node:assert/strict';

const js = fs.readFileSync(new URL('../main.js', import.meta.url), 'utf8');
const html = fs.readFileSync(new URL('../index.html', import.meta.url), 'utf8');
const css = fs.readFileSync(new URL('../style.css', import.meta.url), 'utf8');
const readme = fs.readFileSync(new URL('../README.md', import.meta.url), 'utf8');

function contains(source, pattern, message) {
  assert.match(source, pattern, message);
}

contains(js, /const\s+CHARACTERS\s*=\s*\{/, 'Playable characters must be defined in a data-driven CHARACTERS registry.');
contains(js, /selectedCharacterId:\s*"warrior"/, 'Run state must track the currently selected character.');
contains(js, /function\s+selectCharacter\s*\(/, 'Character selection must go through a selectCharacter helper.');
contains(js, /function\s+applyCharacterLoadout\s*\(/, 'Character starting items/stats must be applied through an isolated helper.');
contains(js, /function\s+applyCharacterCombatStart\s*\(/, 'Character battle-start traits must be applied through an isolated helper.');

const characterMatches = [...js.matchAll(/"(warrior|rogue|alchemist|guardian)"\s*:\s*\{/g)].map(match => match[1]);
assert.deepEqual(new Set(characterMatches), new Set(['warrior', 'rogue', 'alchemist', 'guardian']), 'Warrior, Rogue, Alchemist, and Guardian must all be playable.');

for (const id of ['warrior', 'rogue', 'alchemist', 'guardian']) {
  const blockMatch = js.match(new RegExp(`"${id}"\\s*:\\s*\\{([\\s\\S]*?)\\n\\s*\\}`, 'm'));
  assert.ok(blockMatch, `${id} character block must exist.`);
  const block = blockMatch[1];
  contains(block, /"?startingItems"?:\s*\[/, `${id} must define a starting item loadout.`);
  contains(block, /"?traits"?:\s*\[/, `${id} must show readable trait text.`);
}

contains(js, /"?baseMaxHp"?:\s*6[04]/, 'At least one character must change maximum HP from the default 50.');
contains(js, /"?goldBonus"?:\s*[1-9]/, 'At least one character must start with bonus gold.');
contains(js, /"?globalCooldownMultiplier"?:\s*0\.[0-9]+/, 'At least one character must alter item cooldowns.');
contains(js, /"?poisonPower"?:\s*[1-9]/, 'At least one character must specialize in poison/status scaling.');
contains(js, /"?startBlockBonus"?:\s*[1-9]/, 'At least one character must gain character-based battle-start block.');

contains(html, /id="characterPanel"/, 'HUD must include a character selection panel.');
contains(html, /id="characterChoices"/, 'Character choices container must exist.');
contains(html, /id="heroName"/, 'Hero card must render selected character name.');
contains(html, /id="heroDescription"/, 'Hero card must render selected character description.');
contains(html, /id="heroPortrait"/, 'Hero card must render selected character portrait.');
contains(css, /\.character-panel/, 'Character selection panel must be styled.');
contains(readme, /Karakter/i, 'README must document playable characters.');

console.log('Character selection validation passed.');
