import { Character, CharacterClassType } from '../types';
import {
  ALIGNMENTS,
  BACKGROUNDS,
  CLASS_DEFINITIONS,
  CLASS_QUOTES,
  EPITHETS_AND_SURNAMES,
  FANTASY_RACES,
  FIRST_NAMES,
} from '../data/fantasyData';

function getRandomItem<T>(array: T[]): T {
  return array[Math.floor(Math.random() * array.length)];
}

function getRandomStat(min = 10, max = 18): number {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

export function generateFantasyCharacter(preferredClass?: CharacterClassType): Character {
  const firstName = getRandomItem(FIRST_NAMES);
  const surname = getRandomItem(EPITHETS_AND_SURNAMES);
  const fullName = `${firstName} ${surname}`;

  const availableClasses = Object.keys(CLASS_DEFINITIONS) as CharacterClassType[];
  const characterClass = preferredClass || getRandomItem(availableClasses);
  const classInfo = CLASS_DEFINITIONS[characterClass];

  const race = getRandomItem(FANTASY_RACES);
  const background = getRandomItem(BACKGROUNDS);
  const alignment = getRandomItem(ALIGNMENTS);
  const quote = getRandomItem(CLASS_QUOTES[characterClass]);

  // Base stats with class weighting
  let str = getRandomStat(8, 15);
  let dex = getRandomStat(8, 15);
  let int = getRandomStat(8, 15);
  let wis = getRandomStat(8, 15);
  let con = getRandomStat(8, 15);
  let cha = getRandomStat(8, 15);

  switch (characterClass) {
    case 'Warrior':
      str = getRandomStat(15, 19);
      con = getRandomStat(14, 18);
      break;
    case 'Mage':
      int = getRandomStat(16, 20);
      wis = getRandomStat(13, 17);
      break;
    case 'Rogue':
      dex = getRandomStat(16, 20);
      cha = getRandomStat(12, 16);
      break;
    case 'Paladin':
      str = getRandomStat(14, 18);
      cha = getRandomStat(15, 19);
      break;
    case 'Ranger':
      dex = getRandomStat(15, 19);
      wis = getRandomStat(13, 17);
      break;
    case 'Bard':
      cha = getRandomStat(16, 20);
      dex = getRandomStat(13, 17);
      break;
    case 'Cleric':
      wis = getRandomStat(16, 20);
      con = getRandomStat(13, 17);
      break;
    case 'Druid':
      wis = getRandomStat(15, 19);
      con = getRandomStat(12, 16);
      break;
    case 'Warlock':
      cha = getRandomStat(16, 20);
      int = getRandomStat(13, 17);
      break;
    case 'Monk':
      dex = getRandomStat(15, 19);
      wis = getRandomStat(14, 18);
      break;
  }

  return {
    id: `${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
    name: firstName,
    title: surname,
    fullName,
    characterClass,
    classInfo,
    race,
    background,
    alignment,
    level: Math.floor(Math.random() * 5) + 1,
    stats: {
      strength: str,
      dexterity: dex,
      intelligence: int,
      wisdom: wis,
      constitution: con,
      charisma: cha,
    },
    quote,
    createdAt: Date.now(),
  };
}
