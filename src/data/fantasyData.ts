import { CharacterClassInfo, CharacterClassType } from '../types';

export const CLASS_DEFINITIONS: Record<CharacterClassType, CharacterClassInfo> = {
  Warrior: {
    name: 'Warrior',
    role: 'Vanguard Defender & Heavy Striker',
    primaryStat: 'Strength',
    description: 'Masters of martial combat, armored warfare, and devastating physical prowess on the frontline.',
    signatureAbility: 'Sundering Strike & Shield Wall',
    iconName: 'Shield',
    colorTheme: {
      bg: 'bg-[#181210]',
      text: 'text-[#e06c55]',
      border: 'border-[#4a261f]',
      badge: 'bg-[#211412] text-[#e87f6b] border-[#4a261f]',
      accent: 'from-[#c5a059] to-[#993b2a]',
    },
  },
  Mage: {
    name: 'Mage',
    role: 'Arcane Scholar & Spellweaver',
    primaryStat: 'Intelligence',
    description: 'Wielders of primordial forces who unravel the fabric of reality with incantations and ancient runes.',
    signatureAbility: 'Pyroclastic Surge & Astral Rift',
    iconName: 'Wand2',
    colorTheme: {
      bg: 'bg-[#12141f]',
      text: 'text-[#8b9cf5]',
      border: 'border-[#293259]',
      badge: 'bg-[#151929] text-[#9faef8] border-[#293259]',
      accent: 'from-[#c5a059] to-[#5b6bbd]',
    },
  },
  Rogue: {
    name: 'Rogue',
    role: 'Shadow Infiltrator & Critical Striker',
    primaryStat: 'Dexterity',
    description: 'Stealthy operatives skilled in evasion, lethal precision, lockpicking, and exploitation of enemy flaws.',
    signatureAbility: 'Shadow Veil & Flank Evisceration',
    iconName: 'Sword',
    colorTheme: {
      bg: 'bg-[#111714]',
      text: 'text-[#5ec99b]',
      border: 'border-[#224434]',
      badge: 'bg-[#13201a] text-[#71d9ac] border-[#224434]',
      accent: 'from-[#c5a059] to-[#2d7d59]',
    },
  },
  Paladin: {
    name: 'Paladin',
    role: 'Holy Crusader & Radiant Guardian',
    primaryStat: 'Charisma & Strength',
    description: 'Bound by sacred oath to champion justice, smite corruption with divine radiance, and heal comrades.',
    signatureAbility: 'Aegis of Light & Divine Smite',
    iconName: 'Sun',
    colorTheme: {
      bg: 'bg-[#1c1810]',
      text: 'text-[#c5a059]',
      border: 'border-[#47391e]',
      badge: 'bg-[#241f13] text-[#deb76f] border-[#47391e]',
      accent: 'from-[#e5c179] to-[#c5a059]',
    },
  },
  Ranger: {
    name: 'Ranger',
    role: 'Wilderness Marksman & Tracker',
    primaryStat: 'Dexterity & Wisdom',
    description: 'Sharpshooters attuned to untamed frontiers, commanding beast companions and longbow mastery.',
    signatureAbility: 'Piercing Gale Shot & Nature’s Camouflage',
    iconName: 'Compass',
    colorTheme: {
      bg: 'bg-[#101918]',
      text: 'text-[#5cbdb3]',
      border: 'border-[#1f423e]',
      badge: 'bg-[#132120] text-[#72cfc5] border-[#1f423e]',
      accent: 'from-[#c5a059] to-[#347870]',
    },
  },
  Bard: {
    name: 'Bard',
    role: 'Harmonic Virtuoso & Enchanter',
    primaryStat: 'Charisma',
    description: 'Weavers of song, inspiration, and lore capable of manipulating minds and energizing allies.',
    signatureAbility: 'Ballad of Echoes & Cacophony Burst',
    iconName: 'Music',
    colorTheme: {
      bg: 'bg-[#1a121c]',
      text: 'text-[#bf83da]',
      border: 'border-[#43234a]',
      badge: 'bg-[#221426] text-[#ce99e6] border-[#43234a]',
      accent: 'from-[#c5a059] to-[#7f4393]',
    },
  },
  Cleric: {
    name: 'Cleric',
    role: 'Divine Conduit & Restoration Healer',
    primaryStat: 'Wisdom',
    description: 'Ordained ministers of celestial powers who grant miraculous boons and mend mortal wounds.',
    signatureAbility: 'Sanctified Blessing & Turn Fiends',
    iconName: 'Sparkles',
    colorTheme: {
      bg: 'bg-[#10171d]',
      text: 'text-[#6cb4e4]',
      border: 'border-[#223f54]',
      badge: 'bg-[#132029] text-[#81c5f3] border-[#223f54]',
      accent: 'from-[#c5a059] to-[#3a759e]',
    },
  },
  Druid: {
    name: 'Druid',
    role: 'Primal Shapeshifter & Elementalist',
    primaryStat: 'Wisdom',
    description: 'Guardians of natural balance channeling raw storms, flora, fauna, and ferocious beast forms.',
    signatureAbility: 'Apex Beast Shift & Root Ensnarement',
    iconName: 'Leaf',
    colorTheme: {
      bg: 'bg-[#141a10]',
      text: 'text-[#92c55e]',
      border: 'border-[#334720]',
      badge: 'bg-[#192414] text-[#a4d772] border-[#334720]',
      accent: 'from-[#c5a059] to-[#557831]',
    },
  },
  Warlock: {
    name: 'Warlock',
    role: 'Pact Channeler & Occultist',
    primaryStat: 'Charisma',
    description: 'Practitioners bound to cosmic patrons, wielding eldritch blasts and forbidden hexes.',
    signatureAbility: 'Eldritch Desolation & Soul Harvest',
    iconName: 'Flame',
    colorTheme: {
      bg: 'bg-[#17101f]',
      text: 'text-[#a77bee]',
      border: 'border-[#3b2359]',
      badge: 'bg-[#20142d] text-[#ba94fa] border-[#3b2359]',
      accent: 'from-[#c5a059] to-[#6c3ea8]',
    },
  },
  Monk: {
    name: 'Monk',
    role: 'Martial Kinetic & Ki Striker',
    primaryStat: 'Dexterity & Wisdom',
    description: 'Disciplined ascetics who harness internal spiritual energy into blindingly swift physical attacks.',
    signatureAbility: 'Flurry of Ki & Quivering Palm',
    iconName: 'Zap',
    colorTheme: {
      bg: 'bg-[#1b150f]',
      text: 'text-[#e09a55]',
      border: 'border-[#4c341f]',
      badge: 'bg-[#241a11] text-[#f0aa67] border-[#4c341f]',
      accent: 'from-[#c5a059] to-[#9e5d26]',
    },
  },
};

export const FIRST_NAMES = [
  'Aeloria', 'Valen', 'Garrick', 'Lyra', 'Thorne', 'Elowen', 'Kaelen', 'Sylas',
  'Morgath', 'Baelor', 'Rowan', 'Cassian', 'Isolde', 'Zephyr', 'Darian', 'Freya',
  'Seraphina', 'Orin', 'Corvus', 'Vespera', 'Grimwald', 'Elandra', 'Taliesin',
  'Malakor', 'Branoc', 'Althea', 'Theron', 'Kaelith', 'Aldous', 'Rhiannon',
  'Fenric', 'Astrid', 'Vaelin', 'Caelan', 'Draven', 'Lyranna', 'Balthazar', 'Finnegan',
  'Yvaine', 'Roderick', 'Aurelia', 'Dareth', 'Elysia', 'Gideon', 'Khorin', 'Morrigan',
];

export const EPITHETS_AND_SURNAMES = [
  'Stormcaller', 'Silverleaf', 'Ironbreaker', 'Nightshade', 'Emberforge',
  'Shadowmend', 'Starseeker', 'Frostfang', 'Dawnbringer', 'Duskwarden',
  'Bloodthorn', 'Windrider', 'Voidwalker', 'Oakenshield', 'Gloomwhisper',
  'Sunstrider', 'Blackwood', 'Moonveil', 'Swiftfoot', 'Deepdelver',
  'Flameheart', 'Runecrest', 'Runescribe', 'Wolfbane', 'Crestfallen',
  'Thunderstride', 'Ironhide', 'Galeborn', 'Silentstep', 'Brighthelm',
];

export const FANTASY_RACES = [
  'High Elf', 'Mountain Dwarf', 'Human', 'Tiefling', 'Half-Orc',
  'Wood Elf', 'Dragonborn', 'Gnome', 'Aasimar', 'Halfling',
];

export const BACKGROUNDS = [
  'Exiled Royal Knight', 'Arcane Academy Outcast', 'Wilderness Guild Scout',
  'Underground Smuggler', 'Temple Acolyte', 'Wandering Mercenary',
  'Keeper of Forgotten Tomes', 'Highland Clan Champion', 'Mystic Herbalist',
];

export const ALIGNMENTS = [
  'Lawful Good', 'Neutral Good', 'Chaotic Good',
  'Lawful Neutral', 'True Neutral', 'Chaotic Neutral',
  'Lawful Evil', 'Neutral Evil', 'Chaotic Evil',
];

export const CLASS_QUOTES: Record<CharacterClassType, string[]> = {
  Warrior: [
    'Steel does not waver, and neither do I.',
    'A shield is only as unbreakable as the will holding it.',
    'Let them bring their armies. My blade is hungry.',
  ],
  Mage: [
    'Knowledge is the purest spark; reality is but fuel.',
    'I have counted the stars and memorized their whispers.',
    'To tame arcane fire, one must first respect its thirst.',
  ],
  Rogue: [
    'You cannot strike what has already stepped into your shadow.',
    'The lock hasn’t been made that can keep out patience.',
    'Gold talks, but quiet footsteps speak louder.',
  ],
  Paladin: [
    'Where shadow falls, my radiance shall ignite the path.',
    'Honor is not an ornament; it is the core of our strength.',
    'Stand behind me. No evil passes this vanguard.',
  ],
  Ranger: [
    'The wind knows every track long before you spot the trail.',
    'One arrow, one breath, one clean resolve.',
    'The wild answers only to those who listen.',
  ],
  Bard: [
    'Every battle has a rhythm—I simply conduct the symphony.',
    'A sharp verse can pierce deeper than any broadsword.',
    'Let history forget the battle, so long as they remember my song.',
  ],
  Cleric: [
    'May the divine grace shelter the weary and restore the broken.',
    'In darkness, faith is the brightest lantern.',
    'Healing is not weakness; it is the foundation of endurance.',
  ],
  Druid: [
    'Stone, root, and storm obey the ancient balance.',
    'Listen to the earth beneath your feet; it remembers everything.',
    'Nature does not negotiate; it endures.',
  ],
  Warlock: [
    'The bargain was struck in moonlight, and paid in power.',
    'Prying eyes fear the abyss; I made it my companion.',
    'Secrets hold weight, but eldritch flame burns them clean.',
  ],
  Monk: [
    'Mastery over oneself is the greatest victory.',
    'A tranquil mind channels the force of a tidal wave.',
    'Move like the breeze; strike like the lightning bolt.',
  ],
};
