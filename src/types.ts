export type CharacterClassType =
  | 'Warrior'
  | 'Mage'
  | 'Rogue'
  | 'Paladin'
  | 'Ranger'
  | 'Bard'
  | 'Cleric'
  | 'Druid'
  | 'Warlock'
  | 'Monk';

export interface CharacterClassInfo {
  name: CharacterClassType;
  role: string;
  primaryStat: string;
  description: string;
  signatureAbility: string;
  iconName: string;
  colorTheme: {
    bg: string;
    text: string;
    border: string;
    badge: string;
    accent: string;
  };
}

export interface Character {
  id: string;
  name: string;
  title: string;
  fullName: string;
  characterClass: CharacterClassType;
  classInfo: CharacterClassInfo;
  race: string;
  background: string;
  alignment: string;
  level: number;
  stats: {
    strength: number;
    dexterity: number;
    intelligence: number;
    wisdom: number;
    constitution: number;
    charisma: number;
  };
  quote: string;
  createdAt: number;
  portraitUrl?: string;
  portraitPrompt?: string;
  backstory?: string;
}
