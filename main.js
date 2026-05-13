const GRID_SIZE = 4;
const TOTAL_BATTLES = 5;

const CHARACTERS = {
  "warrior": {
    "id": "warrior",
    "name": "Savaşçı",
    "icon": "🛡️",
    "description": "Dengeli saldırı ve savunma. Yeni oyuncular için güvenli başlangıç.",
    "baseMaxHp": 56,
    "goldBonus": 0,
    "startingItems": [
      { itemId: "sword", slot: 0 },
      { itemId: "fireStone", slot: 1 },
      { itemId: "shield", slot: 4 },
      { itemId: "armor", slot: 5 }
    ],
    "itemBonusDamage": 1,
    "startBlockBonus": 2,
    "traits": ["+6 maksimum can", "Silahlara +1 hasar", "Savaş başında +2 blok"]
  },
  "rogue": {
    "id": "rogue",
    "name": "Hırsız",
    "icon": "🗡️",
    "description": "Hızlı saldırılar, zehir ve erken ekonomiyle riskli ama patlayıcı build kurar.",
    "baseMaxHp": 44,
    "goldBonus": 4,
    "startingItems": [
      { itemId: "dagger", slot: 0 },
      { itemId: "speedRing", slot: 1 },
      { itemId: "throwingKnives", slot: 4 },
      { itemId: "antidote", slot: 5 }
    ],
    "globalCooldownMultiplier": 0.9,
    "poisonPower": 1,
    "traits": ["-6 maksimum can", "+4 başlangıç altını", "Eşyalar %10 hızlı", "Zehir etkileri +1"]
  },
  "alchemist": {
    "id": "alchemist",
    "name": "Simyacı",
    "icon": "🧪",
    "description": "Tek kullanımlık eşyalar, element taşları ve iyileştirmeyle adaptif oynar.",
    "baseMaxHp": 50,
    "goldBonus": 6,
    "startingItems": [
      { itemId: "potion", slot: 0 },
      { itemId: "fireStone", slot: 1 },
      { itemId: "iceStone", slot: 4 },
      { itemId: "bomb", slot: 5 }
    ],
    "consumableHealBonus": 4,
    "startDamageBonus": 4,
    "traits": ["+6 başlangıç altını", "İksirler +4 can iyileştirir", "Savaş başı hasarları +4"]
  },
  "guardian": {
    "id": "guardian",
    "name": "Gardiyan",
    "icon": "🛡️",
    "description": "Yüksek can, blok ve diken sinerjisiyle uzun savaşlarda dirençlidir.",
    "baseMaxHp": 64,
    "goldBonus": 0,
    "startingItems": [
      { itemId: "towerShield", slot: 0 },
      { itemId: "thorn", slot: 1 },
      { itemId: "armor", slot: 4 },
      { itemId: "potion", slot: 5 }
    ],
    "startBlockBonus": 8,
    "blockGainMultiplier": 1.15,
    "traits": ["+14 maksimum can", "Blok üretimi %15 güçlü", "Savaş başında +8 blok"]
  }
};

const ITEMS = {
  "sword": {
    "id": "sword",
    "name": "Kılıç",
    "type": "weapon",
    "rarity": "common",
    "icon": "⚔️",
    "cooldown": 2,
    "damage": 5,
    "tags": [
      "physical"
    ],
    "description": "Her 2 saniyede 5 fiziksel hasar verir."
  },
  "dagger": {
    "id": "dagger",
    "name": "Hançer",
    "type": "weapon",
    "rarity": "common",
    "icon": "🗡️",
    "cooldown": 1,
    "damage": 2,
    "tags": [
      "physical",
      "fast"
    ],
    "description": "Her 1 saniyede 2 hasar verir ve her vuruşta 1 zehir biriktirir.",
    "poison": 1
  },
  "spear": {
    "id": "spear",
    "name": "Mızrak",
    "type": "weapon",
    "rarity": "common",
    "icon": "🔱",
    "cooldown": 2.4,
    "damage": 6,
    "tags": [
      "physical"
    ],
    "description": "Her 2.4 saniyede 6 hasar verir. Hasarın %35’i bloktan sızar.",
    "pierce": 0.35
  },
  "club": {
    "id": "club",
    "name": "Sopa",
    "type": "weapon",
    "rarity": "common",
    "icon": "🏏",
    "cooldown": 2.8,
    "damage": 7,
    "tags": [
      "physical",
      "heavy"
    ],
    "description": "Her 2.8 saniyede 7 hasar verir ve düşmanı 4 sn boyunca %8 kırılgan yapar.",
    "enemyVulnerable": 0.08,
    "vulnerableDuration": 4
  },
  "sling": {
    "id": "sling",
    "name": "Sapan",
    "type": "weapon",
    "rarity": "common",
    "icon": "🪃",
    "cooldown": 1.6,
    "damage": 3,
    "tags": [
      "physical",
      "fast"
    ],
    "description": "Her 1.6 saniyede 3 hasar verir. Erken oyunda hızlı baskı kurar."
  },
  "shortBow": {
    "id": "shortBow",
    "name": "Kısa Yay",
    "type": "weapon",
    "rarity": "common",
    "icon": "🏹",
    "cooldown": 2.2,
    "damage": 5,
    "tags": [
      "physical"
    ],
    "description": "Her 2.2 saniyede 5 hasar verir; her atıştan sonra 2 blok kazanırsın.",
    "selfBlock": 2
  },
  "shield": {
    "id": "shield",
    "name": "Kalkan",
    "type": "defense",
    "rarity": "common",
    "icon": "🛡️",
    "cooldown": 3,
    "block": 5,
    "description": "Her 3 saniyede 5 blok verir ve 1 zehir temizler.",
    "cleansePoison": 1
  },
  "buckler": {
    "id": "buckler",
    "name": "Küçük Kalkan",
    "type": "defense",
    "rarity": "common",
    "icon": "🔰",
    "cooldown": 2.2,
    "block": 3,
    "description": "Her 2.2 saniyede 3 blok verir. Sık tetiklenir."
  },
  "woodenGuard": {
    "id": "woodenGuard",
    "name": "Tahta Muhafız",
    "type": "defense",
    "rarity": "common",
    "icon": "🪵",
    "cooldown": 4,
    "block": 6,
    "description": "Her 4 saniyede 6 blok verir. Basit savunma sağlar."
  },
  "ironGuard": {
    "id": "ironGuard",
    "name": "Demir Muhafız",
    "type": "defense",
    "rarity": "common",
    "icon": "⛓️",
    "cooldown": 4,
    "block": 7,
    "description": "Her 4 saniyede 7 blok verir. Orta tempolu blok üretir."
  },
  "armor": {
    "id": "armor",
    "name": "Zırh",
    "type": "passive",
    "rarity": "common",
    "icon": "🥋",
    "startBlock": 10,
    "description": "Savaş başında 10 blok ve +8 maksimum can verir.",
    "maxHpBonus": 8
  },
  "travelCloak": {
    "id": "travelCloak",
    "name": "Yolcu Pelerini",
    "type": "passive",
    "rarity": "common",
    "icon": "🧥",
    "startBlock": 6,
    "description": "Savaş başında 6 blok verir. Savaş boyunca saniyede 0.35 can yeniler.",
    "regen": 0.35
  },
  "luckyCharm": {
    "id": "luckyCharm",
    "name": "Şans Tılsımı",
    "type": "passive",
    "rarity": "common",
    "icon": "🍀",
    "startBlock": 4,
    "description": "Savaş başında 4 blok verir. Küçük bir güvenlik payı yaratır."
  },
  "potion": {
    "id": "potion",
    "name": "İksir",
    "type": "consumable",
    "rarity": "common",
    "icon": "🧪",
    "heal": 12,
    "hpThreshold": 18,
    "description": "Can 18'in altına düşünce bir kez 12 can iyileştirir."
  },
  "bandage": {
    "id": "bandage",
    "name": "Sargı Bezi",
    "type": "consumable",
    "rarity": "common",
    "icon": "🩹",
    "heal": 8,
    "hpThreshold": 22,
    "description": "Can 22'nin altına düşünce bir kez 8 can iyileştirir."
  },
  "antidote": {
    "id": "antidote",
    "name": "Panzehir",
    "type": "consumable",
    "rarity": "common",
    "icon": "💚",
    "heal": 10,
    "hpThreshold": 16,
    "description": "Can 16'nın altına düşünce 10 can iyileştirir ve tüm zehri temizler.",
    "cleansePoison": 99
  },
  "whetstone": {
    "id": "whetstone",
    "name": "Bileği Taşı",
    "type": "booster",
    "rarity": "common",
    "icon": "🪨",
    "bonus": {
      "targetType": "weapon",
      "damage": 1,
      "label": "+1 hasar"
    },
    "description": "Yanındaki silahlara +1 hasar verir."
  },
  "bomb": {
    "id": "bomb",
    "name": "Bomba",
    "type": "start",
    "rarity": "common",
    "icon": "💣",
    "startDamage": 15,
    "description": "Savaş başında bir kez 15 hasar verir."
  },
  "axe": {
    "id": "axe",
    "name": "Balta",
    "type": "weapon",
    "rarity": "uncommon",
    "icon": "🪓",
    "cooldown": 3.5,
    "damage": 11,
    "tags": [
      "physical",
      "heavy"
    ],
    "description": "Her 3.5 saniyede 11 hasar verir. Düşman %35 can altındaysa %80 daha sert vurur.",
    "executeThreshold": 0.35,
    "executeMultiplier": 1.8
  },
  "mace": {
    "id": "mace",
    "name": "Topuz",
    "type": "weapon",
    "rarity": "uncommon",
    "icon": "🔨",
    "cooldown": 3,
    "damage": 9,
    "tags": [
      "physical",
      "heavy"
    ],
    "description": "Her 3 saniyede 9 hasar verir ve düşmanın 5 blokunu kırar.",
    "armorBreak": 5
  },
  "rapier": {
    "id": "rapier",
    "name": "İnce Kılıç",
    "type": "weapon",
    "rarity": "uncommon",
    "icon": "🤺",
    "cooldown": 1.4,
    "damage": 4,
    "tags": [
      "physical",
      "fast"
    ],
    "description": "Her 1.4 saniyede 4 hasar verir. Her vuruştan sonra bu savaşta +0.45 hasar kazanır.",
    "rampDamage": 0.45
  },
  "crossbow": {
    "id": "crossbow",
    "name": "Arbalet",
    "type": "weapon",
    "rarity": "uncommon",
    "icon": "🎯",
    "cooldown": 2.8,
    "damage": 9,
    "tags": [
      "physical"
    ],
    "description": "Her 2.8 saniyede 9 hasar verir. Tek vuruşu güçlüdür."
  },
  "fireWand": {
    "id": "fireWand",
    "name": "Ateş Asası",
    "type": "weapon",
    "rarity": "uncommon",
    "icon": "🪄",
    "cooldown": 2.5,
    "damage": 8,
    "tags": [
      "fire"
    ],
    "description": "Her 2.5 saniyede 8 hasar verir ve düşmanı 3 sn %12 kırılgan yapar.",
    "enemyVulnerable": 0.12,
    "vulnerableDuration": 3
  },
  "towerShield": {
    "id": "towerShield",
    "name": "Kule Kalkanı",
    "type": "defense",
    "rarity": "uncommon",
    "icon": "🏰",
    "cooldown": 5,
    "block": 12,
    "description": "Her 5 saniyede 12 blok verir ve güvenli duruşla ekstra 3 blok sağlar.",
    "selfBlock": 3
  },
  "wardTotem": {
    "id": "wardTotem",
    "name": "Muhafız Totemi",
    "type": "defense",
    "rarity": "uncommon",
    "icon": "🗿",
    "cooldown": 3.2,
    "block": 6,
    "description": "Her 3.2 saniyede 6 blok verir. Dengeli savunma üretir."
  },
  "scaleVest": {
    "id": "scaleVest",
    "name": "Pul Yelek",
    "type": "defense",
    "rarity": "uncommon",
    "icon": "🦺",
    "cooldown": 4.5,
    "block": 8,
    "description": "Her 4.5 saniyede 8 blok verir. Uzun savaşlarda dayanıklılık verir."
  },
  "spikedArmor": {
    "id": "spikedArmor",
    "name": "Dikenli Zırh",
    "type": "passive",
    "rarity": "uncommon",
    "icon": "🦔",
    "startBlock": 12,
    "description": "Savaş başında 12 blok verir. Savunma buildleri için sağlam taban."
  },
  "warmBoots": {
    "id": "warmBoots",
    "name": "Sıcak Çizmeler",
    "type": "passive",
    "rarity": "uncommon",
    "icon": "🥾",
    "startBlock": 9,
    "description": "Savaş başında 9 blok verir. Buz ve yavaş savaş temalarıyla uyumludur."
  },
  "greaterPotion": {
    "id": "greaterPotion",
    "name": "Büyük İksir",
    "type": "consumable",
    "rarity": "uncommon",
    "icon": "🍷",
    "heal": 16,
    "hpThreshold": 20,
    "description": "Can 20'nin altına düşünce 16 can iyileştirir ve 2 zehir temizler.",
    "cleansePoison": 2
  },
  "smokeVial": {
    "id": "smokeVial",
    "name": "Duman Şişesi",
    "type": "consumable",
    "rarity": "uncommon",
    "icon": "🌫️",
    "heal": 14,
    "hpThreshold": 14,
    "description": "Can 14'ün altına düşünce 14 can iyileştirir ve düşman saldırı zamanını 1.5 sn geri iter.",
    "startSlow": 1.5
  },
  "fireStone": {
    "id": "fireStone",
    "name": "Alev Taşı",
    "type": "booster",
    "rarity": "uncommon",
    "icon": "🔥",
    "bonus": {
      "targetType": "weapon",
      "damage": 3,
      "label": "+3 ateş hasarı"
    },
    "description": "Yanındaki silahlara +3 ateş hasarı verir."
  },
  "iceStone": {
    "id": "iceStone",
    "name": "Buz Taşı",
    "type": "booster",
    "rarity": "uncommon",
    "icon": "❄️",
    "bonus": {
      "targetType": "weapon",
      "slow": 0.35,
      "label": "düşman saldırısını geciktirir"
    },
    "description": "Yanındaki silahlar vurduğunda düşmanın saldırısını biraz geciktirir."
  },
  "thorn": {
    "id": "thorn",
    "name": "Diken",
    "type": "booster",
    "rarity": "uncommon",
    "icon": "🌵",
    "bonus": {
      "targetType": "defense",
      "reflect": 2,
      "label": "blok üretince 2 hasar"
    },
    "description": "Yanındaki kalkanlar blok üretince düşmana 2 hasar verir."
  },
  "throwingKnives": {
    "id": "throwingKnives",
    "name": "Fırlatma Bıçakları",
    "type": "start",
    "rarity": "uncommon",
    "icon": "🔪",
    "startDamage": 12,
    "description": "Savaş başında 12 hasar verir ve düşmana kanama uygular.",
    "bleed": 2
  },
  "twinBlades": {
    "id": "twinBlades",
    "name": "Çift Bıçak",
    "type": "weapon",
    "rarity": "rare",
    "icon": "⚔️",
    "cooldown": 1.5,
    "damage": 6,
    "tags": [
      "physical",
      "fast"
    ],
    "description": "Her 1.5 saniyede 6 hasar verir. %35 ihtimalle ikinci kez vurur.",
    "doubleHitChance": 0.35
  },
  "frostStaff": {
    "id": "frostStaff",
    "name": "Buz Asası",
    "type": "weapon",
    "rarity": "rare",
    "icon": "🧊",
    "cooldown": 2.6,
    "damage": 10,
    "tags": [
      "ice"
    ],
    "description": "Her 2.6 saniyede 10 hasar verir ve düşman saldırısını 0.6 sn geciktirir.",
    "startSlow": 0.6
  },
  "warhammer": {
    "id": "warhammer",
    "name": "Savaş Çekici",
    "type": "weapon",
    "rarity": "rare",
    "icon": "🔨",
    "cooldown": 4,
    "damage": 16,
    "tags": [
      "physical",
      "heavy"
    ],
    "description": "Her 4 saniyede 16 hasar verir. Bloktan %50 sızar ve 8 blok kırar.",
    "pierce": 0.5,
    "armorBreak": 8
  },
  "barrierStone": {
    "id": "barrierStone",
    "name": "Bariyer Taşı",
    "type": "defense",
    "rarity": "rare",
    "icon": "🔷",
    "cooldown": 5,
    "block": 8,
    "description": "Her 5 saniyede 8 blok verir."
  },
  "vampireCharm": {
    "id": "vampireCharm",
    "name": "Vampir Tılsımı",
    "type": "passive",
    "rarity": "rare",
    "icon": "🦇",
    "startBlock": 8,
    "description": "Savaş başında 8 blok verir. Savaş boyunca yavaş can yeniler.",
    "regen": 0.25
  },
  "elixir": {
    "id": "elixir",
    "name": "Eliksir",
    "type": "consumable",
    "rarity": "rare",
    "icon": "⚗️",
    "heal": 22,
    "hpThreshold": 15,
    "description": "Can 15'in altına düşünce 22 can iyileştirir ve kısa süreli güçlü yenilenme sağlar.",
    "regen": 1.2
  },
  "speedRing": {
    "id": "speedRing",
    "name": "Hız Yüzüğü",
    "type": "booster",
    "rarity": "rare",
    "icon": "💍",
    "bonus": {
      "targetType": "weapon",
      "cooldownMultiplier": 0.8,
      "label": "%20 daha hızlı"
    },
    "description": "Yanındaki silahların cooldown süresini %20 azaltır."
  },
  "bloodCrystal": {
    "id": "bloodCrystal",
    "name": "Kan Kristali",
    "type": "booster",
    "rarity": "rare",
    "icon": "🩸",
    "bonus": {
      "targetType": "weapon",
      "lifesteal": 0.25,
      "label": "%25 can çalma"
    },
    "description": "Yanındaki silahlar verdiği hasarın %25'i kadar can çalar."
  },
  "focusLens": {
    "id": "focusLens",
    "name": "Odak Merceği",
    "type": "booster",
    "rarity": "rare",
    "icon": "🔎",
    "bonus": {
      "targetType": "weapon",
      "damage": 2,
      "label": "+2 hasar"
    },
    "description": "Yanındaki silahlara +2 hasar verir; odaklı vuruşlar kırılganlıkla iyi ölçeklenir.",
    "enemyVulnerable": 0.05
  },
  "holyWater": {
    "id": "holyWater",
    "name": "Kutsal Su",
    "type": "start",
    "rarity": "rare",
    "icon": "💧",
    "startDamage": 20,
    "description": "Savaş başında 20 hasar verir ve düşmanı 5 sn %15 kırılgan yapar.",
    "enemyVulnerable": 0.15,
    "vulnerableDuration": 5
  },
  "phoenixFeather": {
    "id": "phoenixFeather",
    "name": "Anka Tüyü",
    "type": "passive",
    "rarity": "epic",
    "icon": "🪶",
    "startBlock": 16,
    "description": "Savaş başında 16 blok, +12 maksimum can ve yavaş yenilenme verir.",
    "maxHpBonus": 12,
    "regen": 0.45
  },
  "amplifier": {
    "id": "amplifier",
    "name": "Güç Yankısı",
    "type": "booster",
    "rarity": "epic",
    "icon": "📣",
    "bonus": {
      "targetType": "weapon",
      "damage": 4,
      "label": "+4 hasar"
    },
    "description": "Yanındaki silahlara +4 hasar verir. Az sayıda güçlü silahı öne çıkarır."
  },
  "mirrorShard": {
    "id": "mirrorShard",
    "name": "Ayna Parçası",
    "type": "booster",
    "rarity": "epic",
    "icon": "🪞",
    "bonus": {
      "targetType": "defense",
      "cooldownMultiplier": 0.85,
      "label": "%15 daha hızlı blok"
    },
    "description": "Yanındaki savunma eşyaları %15 daha hızlı blok üretir."
  },
  "meteorShard": {
    "id": "meteorShard",
    "name": "Meteor Parçası",
    "type": "start",
    "rarity": "epic",
    "icon": "☄️",
    "startDamage": 25,
    "description": "Savaş başında 25 hasar verir ve düşmanın 12 blokunu parçalar.",
    "armorBreak": 12
  },
  "poisonBomb": {
    "id": "poisonBomb",
    "name": "Zehir Bombası",
    "type": "start",
    "rarity": "epic",
    "icon": "☠️",
    "startDamage": 18,
    "description": "Savaş başında 18 hasar verir ve düşmana 6 zehir uygular.",
    "poison": 6
  },
  "blackMirror": {
    "id": "blackMirror",
    "name": "Kara Ayna",
    "type": "booster",
    "rarity": "legendary",
    "icon": "🖤",
    "bonus": {
      "targetType": "weapon",
      "damage": 2,
      "cooldownMultiplier": 1.2,
      "label": "+2 hasar, %20 daha yavaş"
    },
    "description": "Yanındaki silaha +2 hasar verir ama ritmini %20 yavaşlatır. Ayrıca özel mekaniklerle riskli ölçeklenir.",
    "copyAdjacent": true
  }
};

const ENEMIES = [
  { id: "goblin", name: "Goblin Kaptan", icon: "👺", hp: 95, block: 0, attackDamage: 11, attackCooldown: 2.4, enrageAt: 0.45, enrageDamage: 5, intent: "🗡️ 2.4 sn sonra 11 hasar • düşük canda öfkelenir" },
  { id: "rat", name: "Kanlı Mağara Sürüsü", icon: "🐀", hp: 125, block: 0, attackDamage: 7, attackCooldown: 1.3, bleed: 1.2, intent: "🩸 1.3 sn sonra 7 hasar + kanama" },
  { id: "beetle", name: "Taş Zırhlı Böcek", icon: "🪲", hp: 170, block: 45, attackDamage: 13, attackCooldown: 2.5, blockGainCooldown: 4, blockGain: 14, armorBreak: 4, intent: "🛡️ Blok yeniler, 2.5 sn sonra 13 hasar + zırh kırma" },
  { id: "spider", name: "Zehirli Alfa Örümcek", icon: "🕷️", hp: 250, block: 25, attackDamage: 10, attackCooldown: 1.9, poison: 3, enrageAt: 0.35, enrageDamage: 4, intent: "☠️ 1.9 sn sonra 10 hasar + 3 zehir" },
  { id: "bagBiter", name: "Çanta Yiyen Dev", icon: "🐗", hp: 300, block: 80, attackDamage: 18, attackCooldown: 2.1, lockCooldown: 3.2, lockDuration: 4, blockGainCooldown: 5, blockGain: 18, armorBreak: 8, bleed: 2, enrageAt: 0.4, enrageDamage: 8, intent: "🔒 Eşya kilitler, blok yeniler, düşük canda ölümcül olur" }
];

const RUN_ENCOUNTERS = [
  { type: "battle", enemyId: "goblin", role: "normal", label: "Mağara Girişi", rewardGold: 5 },
  { type: "battle", enemyId: "rat", role: "normal", label: "Dar Tünel", rewardGold: 7 },
  { type: "merchant", role: "merchant", label: "Tüccar Kampı", icon: "🛒" },
  { type: "battle", enemyId: "beetle", role: "elite", label: "Zırhlı Geçit", rewardGold: 10 },
  { type: "battle", enemyId: "spider", role: "normal", label: "Zehir Yuvası", rewardGold: 12 },
  { type: "merchant", role: "merchant", label: "Gezgin Tüccar", icon: "🛒" },
  { type: "battle", enemyId: "bagBiter", role: "miniBoss", label: "Çanta Yiyen İn", rewardGold: 18 }
];

const REWARD_POOL = ["sword", "dagger", "spear", "club", "sling", "shortBow", "shield", "buckler", "woodenGuard", "ironGuard", "armor", "travelCloak", "luckyCharm", "potion", "bandage", "antidote", "whetstone", "bomb", "axe", "mace", "rapier", "crossbow", "fireWand", "towerShield", "wardTotem", "scaleVest", "spikedArmor", "warmBoots", "greaterPotion", "smokeVial", "fireStone", "iceStone", "thorn", "throwingKnives", "twinBlades", "frostStaff", "warhammer", "barrierStone", "vampireCharm", "elixir", "speedRing", "bloodCrystal", "focusLens", "holyWater", "phoenixFeather", "amplifier", "mirrorShard", "meteorShard", "poisonBomb", "blackMirror"];
const MERCHANT_POOL = ["sword", "dagger", "spear", "shortBow", "axe", "mace", "rapier", "crossbow", "fireWand", "shield", "buckler", "towerShield", "wardTotem", "barrierStone", "armor", "spikedArmor", "potion", "greaterPotion", "elixir", "fireStone", "iceStone", "thorn", "speedRing", "bloodCrystal", "focusLens", "bomb", "throwingKnives", "holyWater"];
const RARITY_REWARD_WEIGHTS = { common: 24, uncommon: 16, rare: 8, epic: 4, legendary: 1 };

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
  player: { maxHp: 50, hp: 50, block: 0, poison: 0, bleed: 0 },
  enemy: null,
  combatItems: [],
  enemyTimer: 0,
  lockTimer: 0,
  stats: { damage: 0, blocked: 0 },
  runDamage: 0,
  speed: 1,
  selectedCharacterId: "warrior",
  battleHistory: [],
  merchantStock: [],
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
  enemyCard: document.getElementById("enemyCard"),
  merchantModal: document.getElementById("merchantModal"),
  merchantChoices: document.getElementById("merchantChoices"),
  merchantContinue: document.getElementById("merchantContinueBtn"),
  characterPanel: document.getElementById("characterPanel"),
  characterChoices: document.getElementById("characterChoices"),
  heroPortrait: document.getElementById("heroPortrait"),
  heroName: document.getElementById("heroName"),
  heroDescription: document.getElementById("heroDescription")
};

function createInstance(itemId) {
  return { instanceId: `item_${++uid}`, itemId, timer: 0, used: false, lockedFor: 0 };
}

function getSelectedCharacter() {
  return CHARACTERS[state.selectedCharacterId] || CHARACTERS.warrior;
}

function applyCharacterLoadout(character = getSelectedCharacter()) {
  state.inventory = Array(GRID_SIZE * GRID_SIZE).fill(null);
  state.reserve = [];
  for (const entry of character.startingItems) {
    const instance = createInstance(entry.itemId);
    if (Number.isInteger(entry.slot) && entry.slot >= 0 && entry.slot < state.inventory.length && !state.inventory[entry.slot]) {
      state.inventory[entry.slot] = instance;
    } else {
      state.reserve.push(instance);
    }
  }
  state.gold = character.goldBonus || 0;
  state.player = { maxHp: character.baseMaxHp, hp: character.baseMaxHp, block: 0, poison: 0, bleed: 0 };
}

function selectCharacter(characterId) {
  if (!CHARACTERS[characterId] || state.phase === "combat") return;
  state.selectedCharacterId = characterId;
  initGame();
}

function applyCharacterCombatStart(character = getSelectedCharacter()) {
  if (character.startBlockBonus) {
    state.player.block += character.startBlockBonus;
    addLog(`${character.name} özelliği savaş başında ${character.startBlockBonus} blok verdi.`);
  }
}

function renderCharacterChoices() {
  if (!el.characterChoices) return;
  el.characterChoices.innerHTML = "";
  for (const character of Object.values(CHARACTERS)) {
    const button = document.createElement("button");
    button.className = "character-choice";
    if (character.id === state.selectedCharacterId) button.classList.add("selected");
    button.disabled = state.phase === "combat";
    button.innerHTML = `<span>${character.icon}</span><strong>${character.name}</strong><small>${character.traits.join(" • ")}</small>`;
    button.addEventListener("click", () => selectCharacter(character.id));
    el.characterChoices.appendChild(button);
  }
}

function renderSelectedCharacter() {
  const character = getSelectedCharacter();
  if (el.heroPortrait) el.heroPortrait.textContent = character.icon;
  if (el.heroName) el.heroName.textContent = character.name;
  if (el.heroDescription) el.heroDescription.textContent = character.description;
}

function initGame() {
  uid = 0;
  state.phase = "prep";
  state.battleIndex = 0;
  state.inventory = Array(GRID_SIZE * GRID_SIZE).fill(null);
  state.reserve = [];
  applyCharacterLoadout();
  state.stats = { damage: 0, blocked: 0 };
  state.runDamage = 0;
  state.speed = 1;
  state.battleHistory = [];
  state.merchantStock = [];
  if (el.speedBtn) el.speedBtn.textContent = "1x Hız";
  prepareEnemy();
  clearLog();
  const character = getSelectedCharacter();
  addLog(`${character.name} seçildi: ${character.traits.join(" • ")}.`);
  addLog("Eşyaları sürükleyerek yerleştir. Güçlendiricileri silahların yanına koy.");
  renderAll();
}

function getCurrentEncounter() {
  return RUN_ENCOUNTERS[state.battleIndex] || RUN_ENCOUNTERS[RUN_ENCOUNTERS.length - 1];
}

function getEnemyById(enemyId) {
  return ENEMIES.find(enemy => enemy.id === enemyId) || ENEMIES[0];
}

function isMerchantEncounter(encounter = getCurrentEncounter()) {
  return encounter?.type === "merchant";
}

function getCompletedBattles() {
  return state.battleHistory.length;
}

function getCurrentBattleNumber() {
  const before = RUN_ENCOUNTERS.slice(0, state.battleIndex).filter(e => e.type === "battle").length;
  return Math.min(TOTAL_BATTLES, before + (isMerchantEncounter() ? 0 : 1));
}

function prepareEnemy() {
  const encounter = getCurrentEncounter();
  if (isMerchantEncounter(encounter)) {
    state.enemy = {
      id: "merchant", name: encounter.label, icon: encounter.icon || "🛒", hp: 1, maxHp: 1, block: 0,
      attackDamage: 0, attackCooldown: 1, intent: "🛒 Alışveriş molası", encounterRole: "merchant", encounterLabel: encounter.label
    };
    state.enemyTimer = 0;
    state.lockTimer = 0;
    return;
  }
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
  renderSelectedCharacter();
  renderCharacterChoices();
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
  const character = getSelectedCharacter();
  const characterDamage = item.type === "weapon" ? (character.itemBonusDamage || 0) : 0;
  return (item.damage || 0) + characterDamage + getBonuses(instance).reduce((sum, b) => sum + (b.damage || 0), 0);
}

function getEffectiveCooldown(instance) {
  const item = ITEMS[instance.itemId];
  let cooldown = item.cooldown || 999;
  cooldown *= getSelectedCharacter().globalCooldownMultiplier || 1;
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
  if (enemy.encounterRole === "merchant") return "Tüccar • savaş yok";
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
    const enemy = encounter.type === "merchant" ? { icon: encounter.icon || "🛒", name: "Tüccar" } : getEnemyById(encounter.enemyId);
    const node = document.createElement("div");
    node.className = "path-node";
    if (encounter.role === "elite") node.classList.add("elite");
    if (encounter.role === "miniBoss") node.classList.add("boss");
    if (encounter.type === "merchant") node.classList.add("merchant");
    if (index < state.battleIndex) node.classList.add("done");
    if (index === state.battleIndex) node.classList.add("active");
    const roleLabel = encounter.type === "merchant" ? "Tüccar" : encounter.role === "miniBoss" ? "Boss" : encounter.role === "elite" ? "Elit" : "Savaş";
    node.title = `${encounter.label} • ${roleLabel}${encounter.type === "battle" ? ` • ${enemy.name}` : ""}`;
    node.innerHTML = `<span>${enemy.icon}</span><small>${index + 1}</small>`;
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
    const preview = state.phase === "merchant"
      ? "Tüccar: satın al veya geç"
      : state.phase === "reward"
        ? "3 ganimetten 1'ini seç"
        : isMerchantEncounter(currentEncounter)
          ? "Tüccar molası"
          : state.battleIndex >= RUN_ENCOUNTERS.length - 1
            ? "Son savaş: mini boss"
            : `Ödül: +${currentEncounter?.rewardGold || 0} altın`;
    el.nextRewardPreview.textContent = preview;
  }
  el.battleNumber.textContent = getCurrentBattleNumber();
  el.battleTotal.textContent = TOTAL_BATTLES;
  el.gold.textContent = state.gold;
  el.phaseBadge.textContent = state.phase === "combat" ? "Savaş" : state.phase === "reward" ? "Ödül" : state.phase === "merchant" ? "Tüccar" : "Hazırlık";
  el.start.disabled = state.phase !== "prep" || isMerchantEncounter();
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
  el.battleTitle.textContent = state.phase === "merchant" || e.encounterRole === "merchant" ? `${e.name} ziyareti` : state.phase === "combat" ? `${e.name} ile savaş` : `${e.name} için hazırlan`;
  if (el.enemyTimerFill) {
    const pct = Math.min(100, (state.enemyTimer / Math.max(0.1, e.attackCooldown)) * 100);
    el.enemyTimerFill.parentElement.style.background = `conic-gradient(var(--gold) ${pct}%, rgba(255,255,255,0.06) ${pct}%)`;
  }
}

function startCombat() {
  if (state.phase !== "prep" || isMerchantEncounter()) return;
  calculateBonuses();
  state.phase = "combat";
  state.stats = { damage: 0, blocked: 0 };
  state.combatItems = state.inventory.filter(Boolean).map(i => ({ ...i, timer: 0, used: false, lockedFor: 0 }));
  const maxHpBonus = state.combatItems.reduce((sum, instance) => sum + (ITEMS[instance.itemId].maxHpBonus || 0), 0);
  const character = getSelectedCharacter();
  const previousMaxHp = state.player.maxHp;
  state.player.maxHp = character.baseMaxHp + maxHpBonus;
  if (state.player.maxHp > previousMaxHp) state.player.hp += state.player.maxHp - previousMaxHp;
  state.player.hp = Math.min(state.player.hp, state.player.maxHp);
  state.player.block = 0;
  state.player.poison = 0;
  state.player.bleed = 0;
  const encounter = getCurrentEncounter();
  const baseEnemy = getEnemyById(encounter.enemyId);
  state.enemy = { ...baseEnemy, maxHp: baseEnemy.hp, block: baseEnemy.block || 0, poisoned: 0, bleed: 0, vulnerableFor: 0, vulnerability: 0, enraged: false, blockTimer: 0 };
  state.enemy.hp = state.enemy.maxHp;
  state.enemyTimer = 0;
  state.lockTimer = 0;
  clearLog();
  addLog(`${state.enemy.name} ortaya çıktı!`);
  applyCharacterCombatStart(character);

  for (const instance of state.combatItems) {
    const item = ITEMS[instance.itemId];
    if (item.startBlock) {
      const block = Math.ceil(item.startBlock * (character.blockGainMultiplier || 1));
      state.player.block += block;
      addLog(`${item.name} savaş başında ${block} blok verdi.`);
    }
    if (item.startDamage) {
      const startDamage = item.startDamage + (character.startDamageBonus || 0);
      damageEnemy(startDamage, item.name);
      applyItemSpecialEffects(instance, startDamage);
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
      healPlayer(item.heal + (getSelectedCharacter().consumableHealBonus || 0), item.name);
      applyItemSpecialEffects(instance, item.heal);
      triggerVisual(instance.instanceId);
    }
    if (item.regen && state.player.hp < state.player.maxHp) {
      state.player.hp = Math.min(state.player.maxHp, state.player.hp + item.regen * dt);
    }
  }

  if (state.player.poison > 0) {
    state.player.hp -= state.player.poison * dt;
  }
  if (state.player.bleed > 0) {
    state.player.hp -= state.player.bleed * dt;
    state.player.bleed = Math.max(0, state.player.bleed - dt * 0.25);
  }
  if (state.enemy.poisoned > 0) {
    state.enemy.hp -= state.enemy.poisoned * dt;
    state.runDamage += state.enemy.poisoned * dt;
  }
  if (state.enemy.bleed > 0) {
    state.enemy.hp -= state.enemy.bleed * dt;
    state.runDamage += state.enemy.bleed * dt;
    state.enemy.bleed = Math.max(0, state.enemy.bleed - dt * 0.2);
  }
  if (state.enemy.vulnerableFor > 0) {
    state.enemy.vulnerableFor = Math.max(0, state.enemy.vulnerableFor - dt);
    if (state.enemy.vulnerableFor === 0) state.enemy.vulnerability = 0;
  }

  applyEnemySpecials(dt);

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
    const damage = getSpecialDamage(instance);
    damageEnemy(damage, item.name, { pierce: item.pierce || 0 });
    applyItemSpecialEffects(instance, damage);
    for (const bonus of getBonuses(instance)) {
      if (bonus.lifesteal) healPlayer(Math.ceil(damage * bonus.lifesteal), "Can çalma");
      if (bonus.slow) {
        state.enemyTimer = Math.max(0, state.enemyTimer - bonus.slow);
        addLog(`${bonus.source} düşmanı yavaşlattı.`);
      }
    }
  }
  if (item.type === "defense") {
    const block = Math.ceil(item.block * (getSelectedCharacter().blockGainMultiplier || 1));
    state.player.block += block;
    if (item.selfBlock) state.player.block += Math.ceil(item.selfBlock * (getSelectedCharacter().blockGainMultiplier || 1));
    if (item.cleansePoison) state.player.poison = Math.max(0, state.player.poison - item.cleansePoison);
    addLog(`${item.name} ${block} blok verdi.`);
    flash(el.playerCard, "blocked");
    for (const bonus of getBonuses(instance)) {
      if (bonus.reflect) damageEnemy(bonus.reflect, bonus.source);
    }
  }
}

function getSpecialDamage(instance) {
  const item = ITEMS[instance.itemId];
  let damage = getEffectiveDamage(instance) + (instance.rampStacks || 0) * (item.rampDamage || 0);
  if (item.executeThreshold && state.enemy.hp / state.enemy.maxHp <= item.executeThreshold) {
    damage *= item.executeMultiplier || 1.5;
  }
  return damage;
}

function applyItemSpecialEffects(instance, damage = 0) {
  const item = ITEMS[instance.itemId];
  if (item.poison) {
    const poison = item.poison + (getSelectedCharacter().poisonPower || 0);
    state.enemy.poisoned = (state.enemy.poisoned || 0) + poison;
    addLog(`${item.name} ${poison} zehir biriktirdi.`);
  }
  if (item.bleed) {
    state.enemy.bleed = (state.enemy.bleed || 0) + item.bleed;
    addLog(`${item.name} kanama uyguladı.`);
  }
  if (item.armorBreak) {
    const broken = Math.min(state.enemy.block, item.armorBreak);
    state.enemy.block -= broken;
    if (broken > 0) addLog(`${item.name} ${broken} blok kırdı.`);
  }
  if (item.selfBlock && item.type !== "defense") {
    const selfBlock = Math.ceil(item.selfBlock * (getSelectedCharacter().blockGainMultiplier || 1));
    state.player.block += selfBlock;
    addLog(`${item.name} ${selfBlock} blok kazandırdı.`);
  }
  if (item.cleansePoison) {
    const before = state.player.poison;
    state.player.poison = Math.max(0, state.player.poison - item.cleansePoison);
    if (before !== state.player.poison) addLog(`${item.name} zehri temizledi.`);
  }
  if (item.enemyVulnerable) {
    state.enemy.vulnerability = Math.max(state.enemy.vulnerability || 0, item.enemyVulnerable);
    state.enemy.vulnerableFor = Math.max(state.enemy.vulnerableFor || 0, item.vulnerableDuration || 3);
    addLog(`${item.name} düşmanı kırılgan yaptı.`);
  }
  if (item.startSlow) {
    state.enemyTimer = Math.max(0, state.enemyTimer - item.startSlow);
    addLog(`${item.name} düşmanın saldırısını geciktirdi.`);
  }
  if (item.rampDamage) instance.rampStacks = (instance.rampStacks || 0) + 1;
  if (item.doubleHitChance && Math.random() < item.doubleHitChance) {
    damageEnemy(Math.max(1, damage * 0.65), `${item.name} ikinci vuruş`, { pierce: item.pierce || 0 });
  }
}

function applyEnemySpecials(dt) {
  if (state.enemy.enrageAt && !state.enemy.enraged && state.enemy.hp / state.enemy.maxHp <= state.enemy.enrageAt) {
    state.enemy.enraged = true;
    state.enemy.attackDamage += state.enemy.enrageDamage || 0;
    addLog(`${state.enemy.name} öfkelendi!`);
  }
  if (state.enemy.blockGainCooldown) {
    state.enemy.blockTimer = (state.enemy.blockTimer || 0) + dt;
    if (state.enemy.blockTimer >= state.enemy.blockGainCooldown) {
      state.enemy.blockTimer = 0;
      state.enemy.block += state.enemy.blockGain || 0;
      addLog(`${state.enemy.name} ${state.enemy.blockGain} blok yeniledi.`);
    }
  }
}

function damageEnemy(amount, source, options = {}) {
  let damage = amount;
  if (state.enemy.vulnerability) damage *= 1 + state.enemy.vulnerability;
  const pierceDamage = Math.min(state.enemy.block, damage * (options.pierce || 0));
  state.enemy.block -= pierceDamage;
  damage -= pierceDamage;
  const blocked = Math.min(state.enemy.block, damage);
  state.enemy.block -= blocked;
  damage -= blocked;
  const totalDamage = damage + pierceDamage;
  state.enemy.hp -= totalDamage;
  state.stats.damage += totalDamage;
  state.runDamage += Math.max(0, totalDamage);
  addLog(`${source} ${Math.ceil(totalDamage)} hasar verdi${blocked ? ` (${Math.ceil(blocked)} bloklandı)` : ""}.`);
  floatNumber(el.enemyCard, `-${Math.ceil(totalDamage)}`, "damage");
  flash(el.enemyCard, "hit");
}

function enemyAttack() {
  let damage = state.enemy.attackDamage;
  if (state.enemy.armorBreak && state.player.block > 0) {
    const broken = Math.min(state.player.block, state.enemy.armorBreak);
    state.player.block -= broken;
    addLog(`${state.enemy.name} ${broken} blok kırdı.`);
  }
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
  if (state.enemy.bleed) {
    state.player.bleed += state.enemy.bleed;
    addLog(`${state.enemy.name} kanama uyguladı.`);
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
  if (getCompletedBattles() >= TOTAL_BATTLES) {
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

function getRarityPrice(rarity, index = 0) {
  const prices = { common: 7, uncommon: 10, rare: 14, epic: 18, legendary: 24 };
  return prices[rarity] || (index === 0 ? 7 : 10);
}

function getMerchantStock(count = 3) {
  return [...new Set(shuffle([...MERCHANT_POOL]))].slice(0, count).map((itemId, index) => ({
    itemId,
    price: Math.max(6, getRarityPrice(ITEMS[itemId].rarity, index) - (index === 0 ? 1 : 0))
  }));
}

function showMerchantStop() {
  state.phase = "merchant";
  state.merchantStock = getMerchantStock(3);
  renderMerchantChoices();
  addLog(`${getCurrentEncounter().label}: Tüccar kampına ulaştın.`);
  el.merchantModal.classList.remove("hidden");
}

function renderMerchantChoices() {
  if (!el.merchantChoices) return;
  el.merchantChoices.innerHTML = "";
  const healCard = document.createElement("button");
  healCard.className = "reward-card merchant-card";
  healCard.innerHTML = `<span class="big-icon">❤️</span><p class="eyebrow">Hizmet • 6 altın</p><h3>Yara Sar</h3><p>12 can yeniler. Mevcut altın: ${state.gold}</p>`;
  healCard.disabled = state.gold < 6 || state.player.hp >= state.player.maxHp;
  healCard.addEventListener("click", () => buyMerchantHeal());
  el.merchantChoices.appendChild(healCard);

  for (const offer of state.merchantStock) {
    const item = ITEMS[offer.itemId];
    const card = document.createElement("button");
    card.className = "reward-card merchant-card";
    card.disabled = state.gold < offer.price;
    card.innerHTML = `<span class="big-icon">${item.icon}</span><p class="eyebrow">${typeLabel(item.type)} • ${offer.price} altın</p><h3>${item.name}</h3><p>${item.description}</p>`;
    card.addEventListener("click", () => buyMerchantItem(offer.itemId, offer.price));
    el.merchantChoices.appendChild(card);
  }
}

function buyMerchantItem(itemId, price) {
  if (state.gold < price) return;
  state.gold -= price;
  state.reserve.push(createInstance(itemId));
  addLog(`Tüccardan ${ITEMS[itemId].name} satın alındı. -${price} altın.`);
  state.merchantStock = state.merchantStock.filter(offer => offer.itemId !== itemId);
  renderMerchantChoices();
  renderAll();
}

function buyMerchantHeal() {
  if (state.gold < 6 || state.player.hp >= state.player.maxHp) return;
  state.gold -= 6;
  healPlayer(12, "Tüccar");
  renderMerchantChoices();
  renderAll();
}

function continueFromMerchant() {
  el.merchantModal.classList.add("hidden");
  state.battleIndex++;
  state.phase = "prep";
  prepareEnemy();
  addLog(`Tüccar kampından ayrıldın. Sonraki durak: ${getCurrentEncounter().label}.`);
  renderAll();
}

function getRewardChoices(count = 3) {
  const ownedTypes = state.inventory.concat(state.reserve).filter(Boolean).map(instance => ITEMS[instance.itemId].type);
  const weighted = [];
  for (const itemId of REWARD_POOL) {
    const item = ITEMS[itemId];
    const rarityWeight = RARITY_REWARD_WEIGHTS[item.rarity] || 1;
    const typeWeight = ownedTypes.includes(item.type) ? 2 : 1;
    const tickets = Math.max(1, Math.round(rarityWeight * typeWeight));
    for (let i = 0; i < tickets; i++) weighted.push(itemId);
  }
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
  state.player.hp = Math.min(state.player.maxHp, state.player.hp + 6);
  state.player.block = 0;
  prepareEnemy();
  const nextEncounter = getCurrentEncounter();
  if (isMerchantEncounter(nextEncounter)) {
    addLog(`${ITEMS[itemId].name} yedek eşyalara eklendi. Sonraki durak: ${nextEncounter.label}.`);
    showMerchantStop();
  } else {
    state.phase = "prep";
    addLog(`${ITEMS[itemId].name} yedek eşyalara eklendi. Sonraki durak: ${nextEncounter.label} — ${state.enemy.name}.`);
  }
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
  if (el.merchantModal) el.merchantModal.classList.add("hidden");
  initGame();
});
el.endRestart.addEventListener("click", () => {
  el.endModal.classList.add("hidden");
  if (el.merchantModal) el.merchantModal.classList.add("hidden");
  initGame();
});
if (el.merchantContinue) el.merchantContinue.addEventListener("click", continueFromMerchant);

initGame();
