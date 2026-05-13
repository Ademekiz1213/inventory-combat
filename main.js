const GRID_SIZE = 4;
const TOTAL_BATTLES = 5;

const ITEMS = {
  sword: {
    id: "sword", name: "Kılıç", type: "weapon", rarity: "common", icon: "⚔️",
    cooldown: 2, damage: 5, tags: ["physical"],
    description: "Her 2 saniyede 5 fiziksel hasar verir."
  },
  dagger: {
    id: "dagger", name: "Hançer", type: "weapon", rarity: "common", icon: "🗡️",
    cooldown: 1, damage: 2, tags: ["physical", "fast"],
    description: "Her 1 saniyede 2 hasar verir. Hızlı tetiklenir."
  },
  axe: {
    id: "axe", name: "Balta", type: "weapon", rarity: "uncommon", icon: "🪓",
    cooldown: 3.5, damage: 11, tags: ["physical", "heavy"],
    description: "Yavaş ama güçlüdür. Her 3.5 saniyede 11 hasar verir."
  },
  shield: {
    id: "shield", name: "Kalkan", type: "defense", rarity: "common", icon: "🛡️",
    cooldown: 3, block: 5,
    description: "Her 3 saniyede 5 blok verir."
  },
  armor: {
    id: "armor", name: "Zırh", type: "passive", rarity: "common", icon: "🥋",
    startBlock: 10,
    description: "Savaş başında 10 blok verir."
  },
  potion: {
    id: "potion", name: "İksir", type: "consumable", rarity: "common", icon: "🧪",
    heal: 12, hpThreshold: 18,
    description: "Can 18'in altına düşünce bir kez 12 can iyileştirir."
  },
  fireStone: {
    id: "fireStone", name: "Alev Taşı", type: "booster", rarity: "uncommon", icon: "🔥",
    bonus: { targetType: "weapon", damage: 3, label: "+3 ateş hasarı" },
    description: "Yanındaki silahlara +3 ateş hasarı verir."
  },
  speedRing: {
    id: "speedRing", name: "Hız Yüzüğü", type: "booster", rarity: "rare", icon: "💍",
    bonus: { targetType: "weapon", cooldownMultiplier: 0.8, label: "%20 daha hızlı" },
    description: "Yanındaki silahların cooldown süresini %20 azaltır."
  },
  bloodCrystal: {
    id: "bloodCrystal", name: "Kan Kristali", type: "booster", rarity: "rare", icon: "🩸",
    bonus: { targetType: "weapon", lifesteal: 0.25, label: "%25 can çalma" },
    description: "Yanındaki silahlar verdiği hasarın %25'i kadar can çalar."
  },
  iceStone: {
    id: "iceStone", name: "Buz Taşı", type: "booster", rarity: "uncommon", icon: "❄️",
    bonus: { targetType: "weapon", slow: 0.35, label: "düşman saldırısını geciktirir" },
    description: "Yanındaki silahlar vurduğunda düşmanın saldırısını biraz geciktirir."
  },
  thorn: {
    id: "thorn", name: "Diken", type: "booster", rarity: "uncommon", icon: "🌵",
    bonus: { targetType: "defense", reflect: 2, label: "blok üretince 2 hasar" },
    description: "Yanındaki kalkanlar blok üretince düşmana 2 hasar verir."
  },
  bomb: {
    id: "bomb", name: "Bomba", type: "start", rarity: "uncommon", icon: "💣",
    startDamage: 15,
    description: "Savaş başında bir kez 15 hasar verir."
  },
  barrierStone: {
    id: "barrierStone", name: "Bariyer Taşı", type: "defense", rarity: "rare", icon: "🔷",
    cooldown: 5, block: 8,
    description: "Her 5 saniyede 8 blok verir."
  }
};

const ENEMIES = [
  { id: "goblin", name: "Goblin", icon: "👺", hp: 35, block: 0, attackDamage: 6, attackCooldown: 3, intent: "🗡️ 3 sn sonra 6 hasar" },
  { id: "rat", name: "Mağara Sıçanı", icon: "🐀", hp: 28, block: 0, attackDamage: 3, attackCooldown: 1.5, intent: "🗡️ 1.5 sn sonra 3 hasar" },
  { id: "beetle", name: "Taş Böceği", icon: "🪲", hp: 48, block: 12, attackDamage: 5, attackCooldown: 3.5, intent: "🛡️ Zırhlı, 3.5 sn sonra 5 hasar" },
  { id: "spider", name: "Zehirli Örümcek", icon: "🕷️", hp: 42, block: 0, attackDamage: 4, attackCooldown: 2.7, poison: 1, intent: "☠️ 2.7 sn sonra 4 hasar + zehir" },
  { id: "bagBiter", name: "Çanta Kemiren", icon: "🐗", hp: 78, block: 8, attackDamage: 8, attackCooldown: 3.2, lockCooldown: 6, lockDuration: 2.2, intent: "🔒 Ara sıra eşya kilitler" }
];

const RUN_ENCOUNTERS = [
  { enemyId: "goblin", role: "normal", label: "Mağara Girişi", rewardGold: 5 },
  { enemyId: "rat", role: "normal", label: "Dar Tünel", rewardGold: 7 },
  { enemyId: "beetle", role: "elite", label: "Zırhlı Geçit", rewardGold: 10 },
  { enemyId: "spider", role: "normal", label: "Zehir Yuvası", rewardGold: 12 },
  { enemyId: "bagBiter", role: "miniBoss", label: "Çanta Yiyen İn", rewardGold: 18 }
];

const REWARD_POOL = ["dagger", "axe", "armor", "speedRing", "bloodCrystal", "iceStone", "thorn", "bomb", "barrierStone", "fireStone", "shield"];

let uid = 0;
let animationFrame = null;
let lastTime = 0;
let draggedInstanceId = null;

const state = {
  phase: "prep",
  battleIndex: 0,
  gold: 0,
  inventory: Array(GRID_SIZE * GRID_SIZE).fill(null),
  reserve: [],
  player: { maxHp: 50, hp: 50, block: 0, poison: 0 },
  enemy: null,
  combatItems: [],
  enemyTimer: 0,
  lockTimer: 0,
  stats: { damage: 0, blocked: 0 },
  runDamage: 0,
  speed: 1,
  battleHistory: [],
  activeBonuses: new Map()
};

const el = {
  grid: document.getElementById("inventoryGrid"),
  reserve: document.getElementById("reserveItems"),
  start: document.getElementById("startBattleBtn"),
  restart: document.getElementById("restartBtn"),
  endRestart: document.getElementById("endRestartBtn"),
  battleNumber: document.getElementById("battleNumber"),
  battleTotal: document.getElementById("battleTotal"),
  gold: document.getElementById("gold"),
  battleTitle: document.getElementById("battleTitle"),
  phaseBadge: document.getElementById("phaseBadge"),
  playerHpText: document.getElementById("playerHpText"),
  playerHpBar: document.getElementById("playerHpBar"),
  playerBlock: document.getElementById("playerBlock"),
  playerPoison: document.getElementById("playerPoison"),
  enemyTimerFill: document.getElementById("enemyTimerFill"),
  enemySubtitle: document.getElementById("enemySubtitle"),
  battlePath: document.getElementById("battlePath"),
  synergyList: document.getElementById("synergyList"),
  speedBtn: document.getElementById("speedBtn"),
  runDamage: document.getElementById("runDamage"),
  runStage: document.getElementById("runStage"),
  nextRewardPreview: document.getElementById("nextRewardPreview"),
  enemyName: document.getElementById("enemyName"),
  enemyIcon: document.getElementById("enemyIcon"),
  enemyHpText: document.getElementById("enemyHpText"),
  enemyHpBar: document.getElementById("enemyHpBar"),
  enemyBlock: document.getElementById("enemyBlock"),
  enemyIntent: document.getElementById("enemyIntent"),
  log: document.getElementById("combatLog"),
  tooltipTitle: document.getElementById("tooltipTitle"),
  tooltipBody: document.getElementById("tooltipBody"),
  dpsEstimate: document.getElementById("dpsEstimate"),
  blockEstimate: document.getElementById("blockEstimate"),
  synergyCount: document.getElementById("synergyCount"),
  rewardModal: document.getElementById("rewardModal"),
  rewardChoices: document.getElementById("rewardChoices"),
  endModal: document.getElementById("endModal"),
  endTitle: document.getElementById("endTitle"),
  endSummary: document.getElementById("endSummary"),
  playerCard: document.getElementById("playerCard"),
  enemyCard: document.getElementById("enemyCard")
};

function createInstance(itemId) {
  return { instanceId: `item_${++uid}`, itemId, timer: 0, used: false, lockedFor: 0 };
}

function initGame() {
  uid = 0;
  state.phase = "prep";
  state.battleIndex = 0;
  state.gold = 0;
  state.inventory = Array(GRID_SIZE * GRID_SIZE).fill(null);
  state.reserve = [];
  state.player = { maxHp: 50, hp: 50, block: 0, poison: 0 };
  state.stats = { damage: 0, blocked: 0 };
  state.runDamage = 0;
  state.speed = 1;
  state.battleHistory = [];
  if (el.speedBtn) el.speedBtn.textContent = "1x Hız";
  state.inventory[0] = createInstance("sword");
  state.inventory[1] = createInstance("fireStone");
  state.inventory[4] = createInstance("shield");
  state.inventory[5] = createInstance("potion");
  prepareEnemy();
  clearLog();
  addLog("Eşyaları sürükleyerek yerleştir. Güçlendiricileri silahların yanına koy.");
  renderAll();
}

function getCurrentEncounter() {
  return RUN_ENCOUNTERS[state.battleIndex] || RUN_ENCOUNTERS[RUN_ENCOUNTERS.length - 1];
}

function getEnemyById(enemyId) {
  return ENEMIES.find(enemy => enemy.id === enemyId) || ENEMIES[0];
}

function prepareEnemy() {
  const encounter = getCurrentEncounter();
  const base = getEnemyById(encounter.enemyId);
  state.enemy = { ...base, encounterRole: encounter.role, encounterLabel: encounter.label, maxHp: base.hp, timer: 0 };
  state.enemyTimer = 0;
  state.lockTimer = 0;
}

function renderAll() {
  calculateBonuses();
  renderGrid();
  renderReserve();
  renderStats();
  renderCombatants();
  renderRoadmap();
  renderSynergies();
}

function renderGrid() {
  el.grid.innerHTML = "";
  for (let i = 0; i < GRID_SIZE * GRID_SIZE; i++) {
    const slot = document.createElement("div");
    slot.className = "slot";
    slot.dataset.slot = i;
    if (state.inventory[i] && hasBonus(state.inventory[i].instanceId)) slot.classList.add("synergy");
    addDropHandlers(slot, "grid", i);
    const instance = state.inventory[i];
    if (instance) slot.appendChild(renderItem(instance));
    el.grid.appendChild(slot);
  }
}

function renderReserve() {
  el.reserve.innerHTML = "";
  const count = Math.max(4, state.reserve.length + 1);
  for (let i = 0; i < count; i++) {
    const slot = document.createElement("div");
    slot.className = "reserve-slot";
    slot.dataset.reserve = i;
    addDropHandlers(slot, "reserve", i);
    if (state.reserve[i]) slot.appendChild(renderItem(state.reserve[i]));
    el.reserve.appendChild(slot);
  }
}

function renderItem(instance) {
  const item = ITEMS[instance.itemId];
  const node = document.createElement("div");
  node.className = `item ${item.rarity}`;
  if (instance.lockedFor > 0) node.classList.add("locked");
  node.draggable = state.phase === "prep" || state.phase === "reward";
  node.dataset.instanceId = instance.instanceId;
  node.innerHTML = `<span class="icon">${item.icon}</span><span class="name">${item.name}</span><div class="cooldown"><span style="width:${cooldownPercent(instance)}%"></span></div>`;
  node.addEventListener("dragstart", () => { draggedInstanceId = instance.instanceId; });
  node.addEventListener("mouseenter", () => showTooltip(instance));
  node.addEventListener("click", () => showTooltip(instance));
  return node;
}

function cooldownPercent(instance) {
  const item = ITEMS[instance.itemId];
  if (!item.cooldown) return 0;
  const cd = getEffectiveCooldown(instance);
  return Math.min(100, (instance.timer / cd) * 100);
}

function addDropHandlers(slot, targetType, targetIndex) {
  slot.addEventListener("dragover", event => {
    if (state.phase === "combat") return;
    event.preventDefault();
    slot.classList.add("drag-over");
  });
  slot.addEventListener("dragleave", () => slot.classList.remove("drag-over"));
  slot.addEventListener("drop", event => {
    event.preventDefault();
    slot.classList.remove("drag-over");
    if (!draggedInstanceId || state.phase === "combat") return;
    moveItem(draggedInstanceId, targetType, targetIndex);
    draggedInstanceId = null;
  });
}

function moveItem(instanceId, targetType, targetIndex) {
  const source = findInstance(instanceId);
  if (!source) return;
  const moving = source.list[source.index];
  const targetList = targetType === "grid" ? state.inventory : state.reserve;
  const targetItem = targetList[targetIndex] || null;
  source.list[source.index] = targetItem;
  targetList[targetIndex] = moving;
  state.reserve = state.reserve.filter(Boolean);
  renderAll();
}

function findInstance(instanceId) {
  let index = state.inventory.findIndex(i => i?.instanceId === instanceId);
  if (index !== -1) return { list: state.inventory, index };
  index = state.reserve.findIndex(i => i?.instanceId === instanceId);
  if (index !== -1) return { list: state.reserve, index };
  return null;
}

function getPosition(instanceId) {
  const index = state.inventory.findIndex(i => i?.instanceId === instanceId);
  if (index === -1) return null;
  return { index, x: index % GRID_SIZE, y: Math.floor(index / GRID_SIZE) };
}

function getNeighborInstances(instanceId) {
  const pos = getPosition(instanceId);
  if (!pos) return [];
  const coords = [
    { x: pos.x, y: pos.y - 1 },
    { x: pos.x + 1, y: pos.y },
    { x: pos.x, y: pos.y + 1 },
    { x: pos.x - 1, y: pos.y }
  ];
  return coords
    .filter(c => c.x >= 0 && c.x < GRID_SIZE && c.y >= 0 && c.y < GRID_SIZE)
    .map(c => state.inventory[c.y * GRID_SIZE + c.x])
    .filter(Boolean);
}

function calculateBonuses() {
  state.activeBonuses = new Map();
  for (const instance of state.inventory.filter(Boolean)) {
    const item = ITEMS[instance.itemId];
    if (!item.bonus) continue;
    for (const neighbor of getNeighborInstances(instance.instanceId)) {
      const target = ITEMS[neighbor.itemId];
      if (target.type === item.bonus.targetType) {
        if (!state.activeBonuses.has(neighbor.instanceId)) state.activeBonuses.set(neighbor.instanceId, []);
        state.activeBonuses.get(neighbor.instanceId).push({ source: item.name, ...item.bonus });
      }
    }
  }
}

function hasBonus(instanceId) {
  if (state.activeBonuses.has(instanceId)) return true;
  const inst = findInstance(instanceId)?.list?.find?.(i => i?.instanceId === instanceId);
  if (!inst) return false;
  return getNeighborInstances(instanceId).some(n => state.activeBonuses.has(n.instanceId));
}

function getBonuses(instance) {
  return state.activeBonuses.get(instance.instanceId) || [];
}

function getEffectiveDamage(instance) {
  const item = ITEMS[instance.itemId];
  return (item.damage || 0) + getBonuses(instance).reduce((sum, b) => sum + (b.damage || 0), 0);
}

function getEffectiveCooldown(instance) {
  const item = ITEMS[instance.itemId];
  let cooldown = item.cooldown || 999;
  for (const bonus of getBonuses(instance)) {
    if (bonus.cooldownMultiplier) cooldown *= bonus.cooldownMultiplier;
  }
  return cooldown;
}

function showTooltip(instance) {
  const item = ITEMS[instance.itemId];
  const bonuses = getBonuses(instance);
  const lines = [
    `<strong>Tür:</strong> ${typeLabel(item.type)}`,
    `<strong>Etki:</strong> ${item.description}`
  ];
  if (item.cooldown) lines.push(`<strong>Cooldown:</strong> ${getEffectiveCooldown(instance).toFixed(1)} sn`);
  if (bonuses.length) {
    lines.push("<strong>Aktif bonuslar:</strong>");
    for (const bonus of bonuses) lines.push(`+ ${bonus.source}: ${bonus.label}`);
  } else if (item.type === "booster") {
    const affected = getNeighborInstances(instance.instanceId).filter(n => ITEMS[n.itemId].type === item.bonus.targetType);
    lines.push(`<strong>Şu anda etkilediği eşya:</strong> ${affected.map(a => ITEMS[a.itemId].name).join(", ") || "Yok"}`);
  }
  if (instance.lockedFor > 0) lines.push(`<strong>Durum:</strong> Kilitli (${instance.lockedFor.toFixed(1)} sn)`);
  el.tooltipTitle.textContent = `${item.icon} ${item.name}`;
  el.tooltipBody.innerHTML = lines.join("<br>");
}

function typeLabel(type) {
  return ({ weapon: "Silah", defense: "Savunma", booster: "Güçlendirici", passive: "Pasif", consumable: "Tek Kullanımlık", start: "Savaş Başı" })[type] || type;
}

function enemySubtitle(enemy) {
  const role = enemy.encounterRole === "miniBoss" ? "Mini boss" : enemy.encounterRole === "elite" ? "Elit savaş" : "Normal savaş";
  if (enemy.lockCooldown) return `${role} • eşya kilitler`;
  if (enemy.poison) return `${role} • zehir tehdidi`;
  if (enemy.block > 0) return `${role} • bloklu başlangıç`;
  if (enemy.attackCooldown < 2) return `${role} • hızlı saldırgan`;
  return `${role} • build testi`;
}

function renderRoadmap() {
  if (!el.battlePath) return;
  el.battlePath.innerHTML = "";
  RUN_ENCOUNTERS.forEach((encounter, index) => {
    const enemy = getEnemyById(encounter.enemyId);
    const node = document.createElement("div");
    node.className = "path-node";
    if (encounter.role === "elite") node.classList.add("elite");
    if (encounter.role === "miniBoss") node.classList.add("boss");
    if (index < state.battleIndex) node.classList.add("done");
    if (index === state.battleIndex) node.classList.add("active");
    const roleLabel = encounter.role === "miniBoss" ? "Mini Boss" : encounter.role === "elite" ? "Elit" : "Normal";
    node.innerHTML = `<span>${enemy.icon}</span><strong>${index + 1}. ${encounter.label}</strong><small>${roleLabel} • ${enemy.name}</small>`;
    el.battlePath.appendChild(node);
  });
}

function renderSynergies() {
  if (!el.synergyList) return;
  el.synergyList.innerHTML = "";
  const entries = [];
  for (const [instanceId, bonuses] of state.activeBonuses.entries()) {
    const instance = state.inventory.find(i => i?.instanceId === instanceId);
    if (!instance) continue;
    const target = ITEMS[instance.itemId];
    for (const bonus of bonuses) {
      entries.push(`<div class="synergy-line"><strong>${bonus.source}</strong> → ${target.icon} ${target.name}<br><span>${bonus.label}</span></div>`);
    }
  }
  el.synergyList.innerHTML = entries.length ? entries.join("") : `<div class="empty-state">Bonus yok. Taşları, yüzükleri veya dikenleri hedef eşyaların yanına koy.</div>`;
}

function renderStats() {
  const combatItems = state.inventory.filter(Boolean);
  let dps = 0;
  let block = 0;
  for (const instance of combatItems) {
    const item = ITEMS[instance.itemId];
    if (item.type === "weapon") dps += getEffectiveDamage(instance) / getEffectiveCooldown(instance);
    if (item.type === "defense") block += (item.block || 0) / getEffectiveCooldown(instance);
  }
  el.dpsEstimate.textContent = dps.toFixed(1);
  el.blockEstimate.textContent = block.toFixed(1);
  el.synergyCount.textContent = [...state.activeBonuses.values()].reduce((a, b) => a + b.length, 0);
  if (el.runDamage) el.runDamage.textContent = Math.ceil(state.runDamage);
  const currentEncounter = getCurrentEncounter();
  if (el.runStage) el.runStage.textContent = currentEncounter ? currentEncounter.label : "Run Tamamlandı";
  if (el.nextRewardPreview) {
    const preview = state.phase === "reward"
      ? "3 ganimetten 1'ini seç"
      : state.battleIndex >= TOTAL_BATTLES - 1
        ? "Son savaş: mini boss"
        : `Sıradaki ödül: +${currentEncounter?.rewardGold || 0} altın + eşya`;
    el.nextRewardPreview.textContent = preview;
  }
  el.battleNumber.textContent = Math.min(state.battleIndex + 1, TOTAL_BATTLES);
  el.battleTotal.textContent = TOTAL_BATTLES;
  el.gold.textContent = state.gold;
  el.phaseBadge.textContent = state.phase === "combat" ? "Savaş" : state.phase === "reward" ? "Ödül" : "Hazırlık";
  el.start.disabled = state.phase !== "prep";
}

function renderCombatants() {
  const p = state.player;
  const e = state.enemy;
  el.playerHpText.textContent = `${Math.ceil(p.hp)}/${p.maxHp}`;
  el.playerHpBar.style.width = `${Math.max(0, p.hp / p.maxHp * 100)}%`;
  el.playerBlock.textContent = Math.ceil(p.block);
  if (el.playerPoison) el.playerPoison.textContent = Math.ceil(p.poison || 0);
  el.enemyName.textContent = e.name;
  el.enemyIcon.textContent = e.icon;
  if (el.enemySubtitle) el.enemySubtitle.textContent = enemySubtitle(e);
  el.enemyHpText.textContent = `${Math.ceil(e.hp)}/${e.maxHp}`;
  el.enemyHpBar.style.width = `${Math.max(0, e.hp / e.maxHp * 100)}%`;
  el.enemyBlock.textContent = Math.ceil(e.block);
  el.enemyIntent.textContent = e.intent;
  el.battleTitle.textContent = state.phase === "combat" ? `${e.name} ile savaş` : `${e.name} için hazırlan`;
  if (el.enemyTimerFill) {
    const pct = Math.min(100, (state.enemyTimer / Math.max(0.1, e.attackCooldown)) * 100);
    el.enemyTimerFill.parentElement.style.background = `conic-gradient(var(--gold) ${pct}%, rgba(255,255,255,0.06) ${pct}%)`;
  }
}

function startCombat() {
  if (state.phase !== "prep") return;
  calculateBonuses();
  state.phase = "combat";
  state.stats = { damage: 0, blocked: 0 };
  state.combatItems = state.inventory.filter(Boolean).map(i => ({ ...i, timer: 0, used: false, lockedFor: 0 }));
  state.player.block = 0;
  state.player.poison = 0;
  const encounter = getCurrentEncounter();
  const baseEnemy = getEnemyById(encounter.enemyId);
  state.enemy.block = baseEnemy.block || 0;
  state.enemy.hp = state.enemy.maxHp;
  state.enemyTimer = 0;
  state.lockTimer = 0;
  clearLog();
  addLog(`${state.enemy.name} ortaya çıktı!`);

  for (const instance of state.combatItems) {
    const item = ITEMS[instance.itemId];
    if (item.startBlock) {
      state.player.block += item.startBlock;
      addLog(`${item.name} savaş başında ${item.startBlock} blok verdi.`);
    }
    if (item.startDamage) {
      damageEnemy(item.startDamage, item.name);
      instance.used = true;
    }
  }
  lastTime = performance.now();
  cancelAnimationFrame(animationFrame);
  animationFrame = requestAnimationFrame(gameLoop);
  renderAll();
}

function gameLoop(now) {
  const dt = Math.min(0.08, (now - lastTime) / 1000) * state.speed;
  lastTime = now;
  updateCombat(dt);
  renderCombatRuntime();
  if (state.phase === "combat") animationFrame = requestAnimationFrame(gameLoop);
}

function updateCombat(dt) {
  for (const instance of state.combatItems) {
    if (instance.lockedFor > 0) {
      instance.lockedFor = Math.max(0, instance.lockedFor - dt);
      continue;
    }
    const item = ITEMS[instance.itemId];
    if (item.type === "weapon" || item.type === "defense") {
      instance.timer += dt;
      const cooldown = getEffectiveCooldown(instance);
      if (instance.timer >= cooldown) {
        instance.timer = 0;
        triggerItem(instance);
      }
    } else if (item.type === "consumable" && !instance.used && state.player.hp <= item.hpThreshold) {
      instance.used = true;
      healPlayer(item.heal, item.name);
      triggerVisual(instance.instanceId);
    }
  }

  if (state.player.poison > 0) {
    state.player.hp -= state.player.poison * dt;
  }

  state.enemyTimer += dt;
  if (state.enemyTimer >= state.enemy.attackCooldown) {
    state.enemyTimer = 0;
    enemyAttack();
  }

  if (state.enemy.lockCooldown) {
    state.lockTimer += dt;
    if (state.lockTimer >= state.enemy.lockCooldown) {
      state.lockTimer = 0;
      lockRandomItem();
    }
  }

  if (state.enemy.hp <= 0) winBattle();
  if (state.player.hp <= 0) loseRun();
}

function triggerItem(instance) {
  const item = ITEMS[instance.itemId];
  triggerVisual(instance.instanceId);
  if (item.type === "weapon") {
    const damage = getEffectiveDamage(instance);
    damageEnemy(damage, item.name);
    for (const bonus of getBonuses(instance)) {
      if (bonus.lifesteal) healPlayer(Math.ceil(damage * bonus.lifesteal), "Can çalma");
      if (bonus.slow) {
        state.enemyTimer = Math.max(0, state.enemyTimer - bonus.slow);
        addLog(`${bonus.source} düşmanı yavaşlattı.`);
      }
    }
  }
  if (item.type === "defense") {
    state.player.block += item.block;
    addLog(`${item.name} ${item.block} blok verdi.`);
    flash(el.playerCard, "blocked");
    for (const bonus of getBonuses(instance)) {
      if (bonus.reflect) damageEnemy(bonus.reflect, bonus.source);
    }
  }
}

function damageEnemy(amount, source) {
  let damage = amount;
  const blocked = Math.min(state.enemy.block, damage);
  state.enemy.block -= blocked;
  damage -= blocked;
  state.enemy.hp -= damage;
  state.stats.damage += damage;
  state.runDamage += Math.max(0, damage);
  addLog(`${source} ${amount} hasar verdi${blocked ? ` (${blocked} bloklandı)` : ""}.`);
  floatNumber(el.enemyCard, `-${Math.ceil(damage)}`, "damage");
  flash(el.enemyCard, "hit");
}

function enemyAttack() {
  let damage = state.enemy.attackDamage;
  const blocked = Math.min(state.player.block, damage);
  state.player.block -= blocked;
  damage -= blocked;
  state.player.hp -= damage;
  state.stats.blocked += blocked;
  addLog(`${state.enemy.name} ${state.enemy.attackDamage} hasar verdi${blocked ? ` (${blocked} bloklandı)` : ""}.`);
  if (damage > 0) floatNumber(el.playerCard, `-${Math.ceil(damage)}`, "damage");
  if (blocked > 0) floatNumber(el.playerCard, `🛡 ${Math.ceil(blocked)}`, "block");
  if (state.enemy.poison) {
    state.player.poison += state.enemy.poison;
    addLog(`${state.enemy.name} ${state.enemy.poison} zehir uyguladı.`);
  }
  flash(el.playerCard, damage > 0 ? "hit" : "blocked");
}

function healPlayer(amount, source) {
  const before = state.player.hp;
  state.player.hp = Math.min(state.player.maxHp, state.player.hp + amount);
  const healed = Math.ceil(state.player.hp - before);
  addLog(`${source} ${healed} can iyileştirdi.`);
  if (healed > 0) floatNumber(el.playerCard, `+${healed}`, "heal");
}

function lockRandomItem() {
  const candidates = state.combatItems.filter(i => i.lockedFor <= 0);
  if (!candidates.length) return;
  const target = candidates[Math.floor(Math.random() * candidates.length)];
  target.lockedFor = state.enemy.lockDuration;
  addLog(`${state.enemy.name}, ${ITEMS[target.itemId].name} eşyasını kilitledi!`);
}

function renderCombatRuntime() {
  for (const runtime of state.combatItems) {
    const original = state.inventory.find(i => i?.instanceId === runtime.instanceId);
    if (original) {
      original.timer = runtime.timer;
      original.lockedFor = runtime.lockedFor;
    }
  }
  renderGrid();
  renderCombatants();
  renderStats();
  renderRoadmap();
}

function winBattle() {
  state.phase = "reward";
  cancelAnimationFrame(animationFrame);
  const encounter = getCurrentEncounter();
  const earnedGold = encounter.rewardGold || 5;
  state.gold += earnedGold;
  state.battleHistory.push({
    battle: state.battleIndex + 1,
    label: encounter.label,
    enemy: state.enemy.name,
    role: encounter.role,
    damage: Math.ceil(state.stats.damage),
    gold: earnedGold,
    hpLeft: Math.ceil(state.player.hp)
  });
  addLog(`Zafer! ${encounter.label} temizlendi. +${earnedGold} altın, ${Math.ceil(state.stats.damage)} hasar.`);
  state.battleIndex++;
  if (state.battleIndex >= TOTAL_BATTLES) {
    showEnd(true);
  } else {
    showRewards();
  }
  renderAll();
}

function loseRun() {
  state.phase = "end";
  cancelAnimationFrame(animationFrame);
  addLog("Yenildin. Lanetli çanta sessizleşti.");
  showEnd(false);
  renderAll();
}

function getRewardChoices(count = 3) {
  const ownedTypes = state.inventory.concat(state.reserve).filter(Boolean).map(instance => ITEMS[instance.itemId].type);
  const weighted = REWARD_POOL.flatMap(itemId => {
    const item = ITEMS[itemId];
    const weight = ownedTypes.includes(item.type) ? 2 : 1;
    return Array(weight).fill(itemId);
  });
  return [...new Set(shuffle(weighted))].slice(0, count);
}

function showRewards() {
  el.rewardChoices.innerHTML = "";
  const choices = getRewardChoices(3);
  for (const itemId of choices) {
    const item = ITEMS[itemId];
    const card = document.createElement("button");
    card.className = "reward-card";
    card.innerHTML = `<span class="big-icon">${item.icon}</span><p class="eyebrow">${typeLabel(item.type)} • ${item.rarity}</p><h3>${item.name}</h3><p>${item.description}</p>`;
    card.addEventListener("click", () => chooseReward(itemId));
    el.rewardChoices.appendChild(card);
  }
  el.rewardModal.classList.remove("hidden");
}

function chooseReward(itemId) {
  state.reserve.push(createInstance(itemId));
  el.rewardModal.classList.add("hidden");
  state.phase = "prep";
  state.player.hp = Math.min(state.player.maxHp, state.player.hp + 6);
  state.player.block = 0;
  prepareEnemy();
  const nextEncounter = getCurrentEncounter();
  addLog(`${ITEMS[itemId].name} yedek eşyalara eklendi. Sonraki durak: ${nextEncounter.label} — ${state.enemy.name}.`);
  renderAll();
}

function showEnd(won) {
  el.endTitle.textContent = won ? "Run Tamamlandı!" : "Game Over";
  const cleared = state.battleHistory.length;
  const last = state.battleHistory[state.battleHistory.length - 1];
  el.endSummary.textContent = won
    ? `Aşama 2 tamamlandı: 5 savaşlık run bitti. Toplam altın: ${state.gold}. Toplam hasar: ${Math.ceil(state.runDamage)}. Son zafer: ${last?.label || "Mini boss"}.`
    : `${state.battleIndex + 1}. savaşta yenildin. Temizlenen savaş: ${cleared}/5. Toplam altın: ${state.gold}.`;
  el.endModal.classList.remove("hidden");
}

function triggerVisual(instanceId) {
  const node = document.querySelector(`[data-instance-id="${instanceId}"]`);
  if (!node) return;
  node.classList.remove("triggered");
  void node.offsetWidth;
  node.classList.add("triggered");
}

function flash(node, className) {
  node.classList.remove(className, "shake");
  void node.offsetWidth;
  node.classList.add(className, "shake");
}

function floatNumber(target, text, kind) {
  if (!target) return;
  const rect = target.getBoundingClientRect();
  const node = document.createElement("div");
  node.className = `floating-number ${kind}`;
  node.textContent = text;
  node.style.left = `${rect.left + rect.width / 2}px`;
  node.style.top = `${rect.top + rect.height * 0.34}px`;
  document.body.appendChild(node);
  setTimeout(() => node.remove(), 900);
}

function addLog(text) {
  const line = document.createElement("div");
  line.className = "log-line";
  line.textContent = text;
  el.log.prepend(line);
}

function clearLog() {
  el.log.innerHTML = "";
}

function shuffle(array) {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
  return array;
}

el.start.addEventListener("click", startCombat);
if (el.speedBtn) {
  el.speedBtn.addEventListener("click", () => {
    state.speed = state.speed === 1 ? 1.5 : state.speed === 1.5 ? 2 : 1;
    el.speedBtn.textContent = `${state.speed}x Hız`;
  });
}
el.restart.addEventListener("click", () => {
  el.endModal.classList.add("hidden");
  el.rewardModal.classList.add("hidden");
  initGame();
});
el.endRestart.addEventListener("click", () => {
  el.endModal.classList.add("hidden");
  initGame();
});

initGame();
