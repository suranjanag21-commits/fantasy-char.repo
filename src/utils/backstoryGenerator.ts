import { Character } from '../types';

const CLASS_ORIGIN_TEMPLATES: Record<string, ((c: Character) => string[])> = {
  Warrior: (c) => [
    `Raised amidst the smoldering ruins of an ancient garrison, ${c.name} forged their unyielding resolve through relentless martial discipline. Now wielding ${c.classInfo.signatureAbility}, they march across the realm as a bulwark against creeping shadow.`,
    `Once an unassuming ${c.background.toLowerCase()}, ${c.name} discovered their true destiny when an invading legion desecrated their ancestral homelands. Armed with supreme combat prowess, they pledged their blade to defend the vulnerable.`,
    `Orphaned during the border wars, ${c.name} mastered every armament known to the vanguard regiments before setting forth as a legendary champion. Their mastery over battle formations strikes awe into allies and terror into foes.`,
  ],
  Mage: (c) => [
    `Initiated into the Grand Arcanum after unearthing a forbidden celestial codex, ${c.name} learned to bend the fabric of reality to their will. With mastery over ${c.classInfo.signatureAbility}, their pursuit of esoteric truth knows no mortal boundaries.`,
    `Born under a rare solar eclipse in a secluded spire, ${c.name} channeled primal arcane resonance from their earliest years. They now wander the continent unraveling forgotten relics and transmuting mystical anomalies.`,
    `Cast out from the scholastic cloisters for daring to peer into planar rifts, ${c.name} unlocked eldritch equations that reshaped their magical destiny. Their incantations illuminate the darkest reaches of the mortal realm.`,
  ],
  Rogue: (c) => [
    `Honing their lethal trade in the shadowed labyrinth of the Undercity, ${c.name} turned stealth and trickery into an exquisite art form. Striking unseen with ${c.classInfo.signatureAbility}, they command the shadows where even kings fear to tread.`,
    `A former ${c.background.toLowerCase()} who learned that survival favors the swift and cunning, ${c.name} vanished into the night after executing an audacious heist. No vault remains sealed when their lockpicks and daggers are drawn.`,
    `Trained by the unseen guild of silent blades, ${c.name} navigates court intrigue and treacherous ruins with effortless grace. They trade in deadly secrets and strike only when victory is guaranteed.`,
  ],
  Paladin: (c) => [
    `Bound by sacred oath upon the high altar of the Sunken Citadel, ${c.name} radiates divine conviction and righteous fury. Imbued with ${c.classInfo.signatureAbility}, they stand as an unbreakable shield between humanity and dark calamity.`,
    `Chosen by ancient celestial heralds during a time of famine and blight, ${c.name} took up their consecrated standard to cleanse the realm. Their luminous aura dispels sorrow and restores hope to beleaguered lands.`,
    `Forsaking worldly titles and royal inheritance, ${c.name} consecrated their life to the eternal vigil against malevolent entities. Each blow of their hammer is guided by unyielding celestial judgment.`,
  ],
  Ranger: (c) => [
    `Deep within the untamed primordial canopy, ${c.name} bonded with the ancient spirits of the wild and learned the hidden speech of the beasts. Armed with deadly marksmanship and ${c.classInfo.signatureAbility}, they protect the sacred borders from encroaching corruption.`,
    `Trekking across frozen tundras and desolate frontiers as a lone scout, ${c.name} mastered the survivalist arts of the deep woodlands. No adversary escapes their watchful gaze once a hunt has begun.`,
    `Guardian of the forgotten forest sanctuaries, ${c.name} tracks threats across uncharted wilderness with supernatural stealth. Their keen senses and deadly bow keep the realm's untamed frontiers secure.`,
  ],
  Bard: (c) => [
    `Wandering through grand imperial courts and smoky tavern taprooms, ${c.name} weaves ancient harmonies capable of swaying kings and shattering spells. Through the power of ${c.classInfo.signatureAbility}, their melodies immortalize legends and twist battlefield destinies.`,
    `Apprenticed to the College of Echoes atop misty coastal cliffs, ${c.name} collected forgotten sagas from across the known world. With a silver tongue and an enchanted instrument, they inspire armies and bewitch rivals.`,
    `Born with music flowing through their veins, ${c.name} turned ballads into deadly weapons and diplomatic triumphs across seven kingdoms. Their tales will echo long after mortal empires crumble to dust.`,
  ],
  Cleric: (c) => [
    `Anointed by the High Hierophant after receiving visionary omens in the sacred sanctuary, ${c.name} channels pure divine grace to mend fractured spirits and smite unholy terrors. Through ${c.classInfo.signatureAbility}, they bring celestial salvation to the darkest frontiers.`,
    `Having witnessed miraculous deliverance from a plague in their youth, ${c.name} consecrated their soul to the service of the divine light. Their blessed chants turn the tide of despair in the direst hours.`,
    `Vessel of sacred prophecy and guardian of holy relics, ${c.name} traverses battle-scarred realms delivering solace and divine judgment. The gods themselves answer their fervent invocations.`,
  ],
  Druid: (c) => [
    `Communing with the ancient heartbeat of the mother-roots, ${c.name} underwent the ritual of metamorphosis beneath a blood moon. Calling upon storm and flora with ${c.classInfo.signatureAbility}, they maintain the primordial balance of existence.`,
    `Reared by an ancient circle of stone-singers in misty mountain glens, ${c.name} commands elemental beasts and shifts between earthborn forms at will. Civilization trembles whenever nature's wrath is provoked through them.`,
    `Attuned to the celestial solstices, ${c.name} channels raw seasonal energy to revitalize withered groves and crush desecrators of the earth. Their communion with beasts and elements is ancient and absolute.`,
  ],
  Warlock: (c) => [
    `Forged in pact with an unfathomable entity from beyond the stars, ${c.name} traded their mortal birthright for eldritch power and forbidden knowledge. Channeling ${c.classInfo.signatureAbility}, their whispers unravel the sanity of all who oppose them.`,
    `Having discovered a dormant planar sigil deep within an ancient catacomb, ${c.name} struck a precarious bargain with the cosmos. Dark tendrils of sorcery now obey their command as they seek ultimate arcane autonomy.`,
    `Bound by arcane runes and cosmic bargains, ${c.name} harnesses the chaotic void to subjugate lesser minds and twist destiny. Few dare cross a soul whose patrons dwell beyond the veil of time.`,
  ],
  Monk: (c) => [
    `Tempered through decades of meditative fasting and mountain martial trials, ${c.name} unlocked the hidden chakras of spiritual energy within the soul. Delivering lightning strikes through ${c.classInfo.signatureAbility}, they move like the wind and strike like the thunderbolt.`,
    `Seeking perfect equilibrium in the secluded Monastery of the Seven Bells, ${c.name} transcended mortal physical limits through sheer discipline. Their bare hands channel kinetic forces that can shatter solid granite.`,
    `A master of internal ki and flow state, ${c.name} glides across the battlefield neutralizing strikes before they land. Inner stillness gives birth to insurmountable martial power.`,
  ],
};

export function generateProceduralBackstory(character: Character): string {
  const templates = CLASS_ORIGIN_TEMPLATES[character.characterClass];
  if (templates) {
    const list = templates(character);
    return list[Math.floor(Math.random() * list.length)];
  }

  return `Hailing from the storied lands as a seasoned ${character.race} ${character.characterClass}, ${character.name} embarked upon the adventuring path following a fateful turning point in their ${character.background.toLowerCase()} past. Drawing upon ${character.classInfo.signatureAbility}, they journey forward to carve their immortal name into the chronicles of the realm.`;
}

export async function fetchCharacterBackstory(character: Character): Promise<string> {
  try {
    const response = await fetch('/api/generate-backstory', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        name: character.name,
        fullName: character.fullName,
        characterClass: character.characterClass,
        race: character.race,
        background: character.background,
        alignment: character.alignment,
        signatureAbility: character.classInfo.signatureAbility,
        quote: character.quote,
        stats: character.stats,
      }),
    });

    if (response.ok) {
      const data = await response.json();
      if (data.backstory && typeof data.backstory === 'string' && data.backstory.trim().length > 0) {
        return data.backstory.trim();
      }
    }
  } catch (err) {
    console.warn('Backend backstory generation failed, using procedural generation:', err);
  }

  // Fallback to high-quality procedural generator
  return generateProceduralBackstory(character);
}
