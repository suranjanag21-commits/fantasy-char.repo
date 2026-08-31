import { Character, CharacterClassType } from '../types';

/**
 * Builds a prompt for cartoon / video-game style character portrait generation.
 */
export function generateCharacterPortraitPrompt(
  character: Character,
  variation: number = 0
): string {
  const classThemes: Record<CharacterClassType, string> = {
    Warrior:
      'heavy forged plate armor with glowing red runic trim, carrying an ornate greatsword with ember sparks, battle-worn confident heroic expression, intense warrior stance',
    Mage:
      'flowing arcane starry indigo robes with glowing cosmic runes, glowing eyes, holding a crystal tipped spell staff with swirling astral nebula vortex and floating purple sparks',
    Rogue:
      'stealthy shadowed dark leather cowl and hooded mantle, dual emerald-glowing daggers, cunning smirk, shadowy mist and green glinting edge',
    Paladin:
      'gleaming sun-forged gold and white armor, glowing holy halo aura, wielding a radiant sunlit warhammer, noble righteous gaze with divine golden sparkles',
    Ranger:
      'wilderness leather tunic and leafy camo cloak, feathered quiver and ornate elven recurve bow with wind vortex arrows, sharp hawk-like gaze, forest leaf wisps',
    Bard:
      'stylish renaissance duelist doublet with violet feather cap, smiling charismatically while holding an enchanted acoustic lute surrounded by glowing musical notes and pastel magical ripples',
    Cleric:
      'ceremonial silver and sapphire holy vestments, sacred solar amulet glowing with celestial healing light, kind benevolent gaze with divine blessing aura',
    Druid:
      'antlered wooden crown, living floral and moss-woven garments, glowing emerald eyes, primal nature power with spiraling green leaves and spirit animal silhouette',
    Warlock:
      'dark obsidian mantle with floating eldritch sigils, demonic horn circlet, sinister glowing violet void flames in palms, glowing mystical gaze',
    Monk:
      'traditional martial arts combat wraps and prayer beads, disciplined zen battle pose, fists enveloped in crackling golden-orange ki energy and kinetic shockwaves',
  };

  const variationModifiers = [
    'heroic 3/4 angle pose with dramatic rim lighting',
    'dynamic combat-ready headshot with glowing aura and floating particles',
    'master portrait bust with intricate costume details and vibrant background motif',
    'stylized expressive video game avatar icon with bold lines and vivid highlights',
  ];

  const selectedModifier = variationModifiers[variation % variationModifiers.length];
  const classDetail = classThemes[character.characterClass] || 'fantasy hero attire with magical aura';

  return `Vibrant cartoon video-game style concept art portrait of a fantasy ${character.race} ${character.characterClass} named "${character.fullName}". ${classDetail}. ${selectedModifier}. Stylized 2D RPG video game avatar, clean bold outlines, rich colorful lighting, high contrast, expressive fantasy game asset illustration, polished digital cartoon art, clean dark background with subtle class-themed ambient glow.`;
}

/**
 * Procedurally creates a rich, stylized cartoon/video-game SVG portrait for any character class & race.
 * Used as an instant high-fidelity asset and dependable fallback.
 */
export function generateStylizedGamePortrait(
  character: Character,
  seed: number = 0
): string {
  const cls = character.characterClass;
  const hash = Math.abs(
    (character.name.split('').reduce((acc, c) => acc + c.charCodeAt(0), 0) + seed * 73) % 1000
  );

  // Class specific color palettes & iconography
  const palette: Record<
    CharacterClassType,
    {
      bg1: string;
      bg2: string;
      accent: string;
      glow: string;
      armor1: string;
      armor2: string;
      eyeColor: string;
      symbol: string;
    }
  > = {
    Warrior: {
      bg1: '#1a0e0c',
      bg2: '#3d1610',
      accent: '#e06c55',
      glow: '#ff5722',
      armor1: '#3c3f4a',
      armor2: '#c5a059',
      eyeColor: '#ffb300',
      symbol: '⚔️',
    },
    Mage: {
      bg1: '#0e1124',
      bg2: '#1b224d',
      accent: '#8b9cf5',
      glow: '#6366f1',
      armor1: '#2e1c59',
      armor2: '#c5a059',
      eyeColor: '#93c5fd',
      symbol: '🔮',
    },
    Rogue: {
      bg1: '#0c1611',
      bg2: '#152d22',
      accent: '#5ec99b',
      glow: '#10b981',
      armor1: '#1e2421',
      armor2: '#34d399',
      eyeColor: '#6ee7b7',
      symbol: '🗡️',
    },
    Paladin: {
      bg1: '#1f1a0d',
      bg2: '#3d3114',
      accent: '#e5c179',
      glow: '#fbbf24',
      armor1: '#e2e8f0',
      armor2: '#c5a059',
      eyeColor: '#fef08a',
      symbol: '🛡️',
    },
    Ranger: {
      bg1: '#0d1816',
      bg2: '#16312c',
      accent: '#5cbdb3',
      glow: '#14b8a6',
      armor1: '#2b382d',
      armor2: '#c5a059',
      eyeColor: '#5eead4',
      symbol: '🏹',
    },
    Bard: {
      bg1: '#1a0f21',
      bg2: '#381647',
      accent: '#bf83da',
      glow: '#c084fc',
      armor1: '#4a154b',
      armor2: '#e9d5ff',
      eyeColor: '#f472b6',
      symbol: '🎵',
    },
    Cleric: {
      bg1: '#0d1721',
      bg2: '#162e42',
      accent: '#6cb4e4',
      glow: '#38bdf8',
      armor1: '#dbeafe',
      armor2: '#c5a059',
      eyeColor: '#7dd3fc',
      symbol: '✨',
    },
    Druid: {
      bg1: '#111a0c',
      bg2: '#233814',
      accent: '#92c55e',
      glow: '#84cc16',
      armor1: '#362a1e',
      armor2: '#84cc16',
      eyeColor: '#bef264',
      symbol: '🌿',
    },
    Warlock: {
      bg1: '#140c1e',
      bg2: '#2c1245',
      accent: '#a77bee',
      glow: '#a855f7',
      armor1: '#181224',
      armor2: '#c084fc',
      eyeColor: '#d8b4fe',
      symbol: '🔥',
    },
    Monk: {
      bg1: '#1c130b',
      bg2: '#382211',
      accent: '#e09a55',
      glow: '#f97316',
      armor1: '#422006',
      armor2: '#fed7aa',
      eyeColor: '#fdba74',
      symbol: '⚡',
    },
  };

  const p = palette[cls] || palette.Warrior;

  // Race adjustments for skin tone & ear/horn styles
  const isElf = character.race.includes('Elf');
  const isTiefling = character.race.includes('Tiefling');
  const isOrc = character.race.includes('Orc');
  const isDwarf = character.race.includes('Dwarf');

  let skinTone = '#f3c5a5';
  let skinShadow = '#d49b78';
  if (isOrc) {
    skinTone = '#8fa378';
    skinShadow = '#677d54';
  } else if (isTiefling) {
    skinTone = '#c75662';
    skinShadow = '#993540';
  } else if (isElf) {
    skinTone = '#fae4d6';
    skinShadow = '#dfb8a5';
  } else if (isDwarf) {
    skinTone = '#e2af89';
    skinShadow = '#bf845b';
  }

  // Generate unique hair color variations based on character name seed
  const hairColors = ['#271911', '#5c3a21', '#c4974f', '#d97706', '#9a3412', '#4b5563', '#e2e8f0', '#7c3aed'];
  const hairColor = hairColors[hash % hairColors.length];

  const svg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 400 400" width="100%" height="100%">
  <defs>
    <radialGradient id="bgGrad_${hash}" cx="50%" cy="40%" r="65%">
      <stop offset="0%" stop-color="${p.bg2}" />
      <stop offset="100%" stop-color="${p.bg1}" />
    </radialGradient>
    <radialGradient id="glowGrad_${hash}" cx="50%" cy="50%" r="50%">
      <stop offset="0%" stop-color="${p.glow}" stop-opacity="0.6" />
      <stop offset="100%" stop-color="${p.glow}" stop-opacity="0" />
    </radialGradient>
    <linearGradient id="armorGrad_${hash}" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="${p.armor2}" />
      <stop offset="50%" stop-color="${p.armor1}" />
      <stop offset="100%" stop-color="#111111" />
    </linearGradient>
    <linearGradient id="goldTrim_${hash}" x1="0%" y1="0%" x2="0%" y2="100%">
      <stop offset="0%" stop-color="#fef08a" />
      <stop offset="50%" stop-color="#c5a059" />
      <stop offset="100%" stop-color="#78591e" />
    </linearGradient>
    <filter id="shadow_${hash}">
      <feDropShadow dx="0" dy="4" stdDeviation="4" flood-color="#000000" flood-opacity="0.5"/>
    </filter>
  </defs>

  <!-- Background Base & Radial Magic Glow -->
  <rect width="400" height="400" fill="url(#bgGrad_${hash})" />
  <circle cx="200" cy="180" r="140" fill="url(#glowGrad_${hash})" />

  <!-- Magic Aura Rune Ring in Background -->
  <circle cx="200" cy="190" r="125" fill="none" stroke="${p.accent}" stroke-width="1.5" stroke-dasharray="6,8" opacity="0.35" />
  <circle cx="200" cy="190" r="110" fill="none" stroke="${p.accent}" stroke-width="1" opacity="0.2" />

  <!-- Floating Magic Sparks / Particles -->
  <circle cx="90" cy="110" r="3" fill="${p.glow}" opacity="0.7" />
  <circle cx="310" cy="130" r="4" fill="${p.accent}" opacity="0.8" />
  <circle cx="120" cy="270" r="2.5" fill="${p.glow}" opacity="0.5" />
  <circle cx="290" cy="260" r="3" fill="${p.glow}" opacity="0.6" />
  <polygon points="190,60 193,70 203,73 193,76 190,86 187,76 177,73 187,70" fill="${p.accent}" opacity="0.6" />

  <!-- Body / Armor / Clothing Layer -->
  <g filter="url(#shadow_${hash})">
    <!-- Cloak / Shoulder Pads -->
    <path d="M 90 400 C 90 310 130 280 200 280 C 270 280 310 310 310 400 Z" fill="url(#armorGrad_${hash})" />
    <path d="M 120 400 C 130 330 160 300 200 300 C 240 300 270 330 280 400 Z" fill="${p.armor1}" stroke="${p.armor2}" stroke-width="2" />
    
    <!-- Chest Crest / Collar Trim -->
    <path d="M 170 300 L 200 340 L 230 300 Z" fill="url(#goldTrim_${hash})" stroke="#262624" stroke-width="1.5" />
    <circle cx="200" cy="320" r="6" fill="${p.glow}" />
    
    <!-- Pauldrons / Shoulders -->
    <path d="M 85 340 Q 120 300 150 330 Q 110 370 85 340 Z" fill="url(#goldTrim_${hash})" stroke="#121210" stroke-width="2" />
    <path d="M 315 340 Q 280 300 250 330 Q 290 370 315 340 Z" fill="url(#goldTrim_${hash})" stroke="#121210" stroke-width="2" />
  </g>

  <!-- Neck -->
  <rect x="175" y="230" width="50" height="60" rx="10" fill="${skinShadow}" />

  <!-- Tiefling Horns (if Tiefling) -->
  ${
    isTiefling
      ? `
    <path d="M 140 160 Q 100 110 90 70 Q 120 80 150 130 Z" fill="#4a1525" stroke="#2a0a14" stroke-width="2" />
    <path d="M 260 160 Q 300 110 310 70 Q 280 80 250 130 Z" fill="#4a1525" stroke="#2a0a14" stroke-width="2" />
  `
      : ''
  }

  <!-- Elven Pointed Ears (if Elf) -->
  ${
    isElf
      ? `
    <path d="M 125 180 Q 75 160 85 140 Q 120 165 130 185 Z" fill="${skinTone}" stroke="${skinShadow}" stroke-width="1.5" />
    <path d="M 275 180 Q 325 160 315 140 Q 280 165 270 185 Z" fill="${skinTone}" stroke="${skinShadow}" stroke-width="1.5" />
  `
      : `
    <!-- Standard Round Ears -->
    <circle cx="125" cy="185" r="14" fill="${skinTone}" stroke="${skinShadow}" stroke-width="1.5" />
    <circle cx="275" cy="185" r="14" fill="${skinTone}" stroke="${skinShadow}" stroke-width="1.5" />
  `
  }

  <!-- Head Base / Face -->
  <g filter="url(#shadow_${hash})">
    <ellipse cx="200" cy="185" rx="68" ry="76" fill="${skinTone}" stroke="#2a1a14" stroke-width="2.5" />
    <!-- Cheeks shadow -->
    <path d="M 140 210 Q 200 260 260 210 Q 200 248 140 210 Z" fill="${skinShadow}" opacity="0.4" />
  </g>

  <!-- Hairstyle & Headgear Matching Class -->
  <g filter="url(#shadow_${hash})">
    <!-- Back Hair -->
    <path d="M 130 160 C 120 100 280 100 270 160 C 290 230 250 250 250 250 C 250 250 240 200 200 200 C 160 200 150 250 150 250 C 150 250 110 230 130 160 Z" fill="${hairColor}" />

    <!-- Class-specific Headgear / Crown / Helm / Hood / Circlet -->
    ${
      cls === 'Warrior' || cls === 'Paladin'
        ? `
      <!-- Winged Combat Circlet / Helm -->
      <path d="M 130 145 Q 200 105 270 145 L 260 120 Q 200 85 140 120 Z" fill="url(#goldTrim_${hash})" stroke="#262624" stroke-width="2" />
      <polygon points="200,90 208,125 192,125" fill="#fef08a" />
      <circle cx="200" cy="125" r="6" fill="${p.glow}" />
    `
        : cls === 'Mage' || cls === 'Warlock'
        ? `
      <!-- Arcane Circlet / Horned Gem Diadem -->
      <path d="M 140 140 Q 200 115 260 140 L 255 125 Q 200 105 145 125 Z" fill="#2d1b4e" stroke="${p.accent}" stroke-width="2" />
      <polygon points="200,105 209,128 191,128" fill="${p.accent}" />
      <circle cx="200" cy="122" r="5" fill="${p.glow}" />
    `
        : cls === 'Rogue'
        ? `
      <!-- Shadow Hood -->
      <path d="M 120 180 Q 120 90 200 80 Q 280 90 280 180 Q 250 130 200 130 Q 150 130 120 180 Z" fill="#151e19" stroke="#224434" stroke-width="2" />
    `
        : cls === 'Druid' || cls === 'Ranger'
        ? `
      <!-- Antler / Leaf Wreath -->
      <path d="M 135 140 Q 200 120 265 140" stroke="#4d7c0f" stroke-width="6" fill="none" stroke-linecap="round" />
      <circle cx="160" cy="132" r="6" fill="#84cc16" />
      <circle cx="200" cy="126" r="7" fill="#65a30d" />
      <circle cx="240" cy="132" r="6" fill="#84cc16" />
    `
        : `
      <!-- Refined Bard/Monk/Cleric Forehead Band -->
      <path d="M 136 145 Q 200 125 264 145 L 260 135 Q 200 115 140 135 Z" fill="url(#goldTrim_${hash})" stroke="#262624" stroke-width="1.5" />
      <circle cx="200" cy="135" r="4" fill="${p.glow}" />
    `
    }
  </g>

  <!-- Facial Features (Expressive Cartoon Style) -->
  <!-- Eyebrows -->
  <path d="M 152 165 Q 170 155 185 163" stroke="#2a1a14" stroke-width="4.5" stroke-linecap="round" fill="none" />
  <path d="M 215 163 Q 230 155 248 165" stroke="#2a1a14" stroke-width="4.5" stroke-linecap="round" fill="none" />

  <!-- Expressive Big Cartoon Anime/Game Eyes -->
  <!-- Left Eye -->
  <ellipse cx="168" cy="180" rx="14" ry="12" fill="#ffffff" stroke="#2a1a14" stroke-width="2" />
  <ellipse cx="169" cy="180" rx="8" ry="10" fill="${p.eyeColor}" />
  <ellipse cx="169" cy="180" rx="5" ry="6" fill="#111827" />
  <circle cx="166" cy="176" r="3.5" fill="#ffffff" />
  <circle cx="172" cy="183" r="1.5" fill="#ffffff" />

  <!-- Right Eye -->
  <ellipse cx="232" cy="180" rx="14" ry="12" fill="#ffffff" stroke="#2a1a14" stroke-width="2" />
  <ellipse cx="231" cy="180" rx="8" ry="10" fill="${p.eyeColor}" />
  <ellipse cx="231" cy="180" rx="5" ry="6" fill="#111827" />
  <circle cx="228" cy="176" r="3.5" fill="#ffffff" />
  <circle cx="234" cy="183" r="1.5" fill="#ffffff" />

  <!-- Nose -->
  <path d="M 197 185 Q 203 198 196 204 Q 201 206 206 203" stroke="${skinShadow}" stroke-width="2.5" fill="none" stroke-linecap="round" />

  <!-- Mouth -->
  <path d="M 184 225 Q 200 236 216 225" stroke="#4a1515" stroke-width="3" fill="none" stroke-linecap="round" />
  
  <!-- Dwarf Beard (if Dwarf) -->
  ${
    isDwarf
      ? `
    <path d="M 140 215 C 130 280 150 310 200 310 C 250 310 270 280 260 215 Q 200 240 140 215 Z" fill="${hairColor}" stroke="#1f140e" stroke-width="2" />
    <path d="M 170 218 Q 200 230 230 218 Q 200 224 170 218 Z" fill="#1f140e" />
  `
      : ''
  }

  <!-- Orc Tusks (if Orc) -->
  ${
    isOrc
      ? `
    <polygon points="178,230 182,216 186,230" fill="#fef9c3" stroke="#222" stroke-width="1" />
    <polygon points="214,230 218,216 222,230" fill="#fef9c3" stroke="#222" stroke-width="1" />
  `
      : ''
  }

  <!-- Outer Ornate Game Border Frame -->
  <rect x="8" y="8" width="384" height="384" rx="16" fill="none" stroke="#262624" stroke-width="4" />
  <rect x="14" y="14" width="372" height="372" rx="12" fill="none" stroke="${p.accent}" stroke-width="1.5" opacity="0.6" />

  <!-- Corner Brackets -->
  <polygon points="8,8 28,8 28,12 12,12 12,28 8,28" fill="#c5a059" />
  <polygon points="392,8 372,8 372,12 388,12 388,28 392,28" fill="#c5a059" />
  <polygon points="8,392 28,392 28,388 12,388 12,372 8,372" fill="#c5a059" />
  <polygon points="392,392 372,392 372,388 388,388 388,372 392,372" fill="#c5a059" />

  <!-- Class Tag Banner at Bottom -->
  <g filter="url(#shadow_${hash})">
    <rect x="90" y="356" width="220" height="32" rx="8" fill="#121210" stroke="#c5a059" stroke-width="1.5" />
    <text x="200" y="377" fill="#c5a059" font-family="Cinzel, serif, sans-serif" font-size="12" font-weight="bold" letter-spacing="3" text-anchor="middle" text-transform="uppercase">
      ${character.characterClass} • LVL ${character.level}
    </text>
  </g>
</svg>`;

  return `data:image/svg+xml;utf8,${encodeURIComponent(svg)}`;
}

/**
 * Calls backend /api/generate-portrait to generate AI cartoon/video game portrait,
 * or gracefully returns the custom stylized video-game SVG artwork.
 */
export async function fetchCharacterPortrait(
  character: Character,
  seedVariation: number = 0
): Promise<{ imageUrl: string; prompt: string; source: 'ai' | 'procedural' }> {
  const prompt = generateCharacterPortraitPrompt(character, seedVariation);

  try {
    const response = await fetch('/api/generate-portrait', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        name: character.fullName,
        characterClass: character.characterClass,
        race: character.race,
        background: character.background,
        alignment: character.alignment,
        signatureAbility: character.classInfo.signatureAbility,
        variation: seedVariation,
        prompt,
      }),
    });

    if (response.ok) {
      const data = await response.json();
      if (data.imageUrl) {
        return {
          imageUrl: data.imageUrl,
          prompt: data.prompt || prompt,
          source: data.source === 'gemini' ? 'ai' : 'procedural',
        };
      }
    }
  } catch (err) {
    console.warn('API portrait generation encountered error, utilizing stylized game art generator:', err);
  }

  // Guaranteed instant high-fidelity stylized cartoon/game fallback
  const fallbackUrl = generateStylizedGamePortrait(character, seedVariation);
  return {
    imageUrl: fallbackUrl,
    prompt,
    source: 'procedural',
  };
}
