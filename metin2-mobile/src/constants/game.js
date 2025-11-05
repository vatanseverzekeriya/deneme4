// Metin2 Mobile - Game Constants

export const KINGDOMS = [
  {
    id: 'shinsoo',
    name: 'Shinsoo',
    displayName: 'Blue Dragon Kingdom',
    color: '#3B82F6',
    description: 'The kingdom of wisdom and water. Masters of magic and strategy.',
    flag: '🐉',
    characters: ['ninja', 'shaman'],
  },
  {
    id: 'chunjo',
    name: 'Chunjo',
    displayName: 'Yellow Tiger Kingdom',
    color: '#EAB308',
    description: 'The kingdom of prosperity and earth. Warriors of honor and strength.',
    flag: '🐯',
    characters: ['warrior', 'sura'],
  },
  {
    id: 'jinno',
    name: 'Jinno',
    displayName: 'Red Phoenix Kingdom',
    color: '#EF4444',
    description: 'The kingdom of fire and passion. Fierce fighters and mystics.',
    flag: '🔥',
    characters: ['warrior', 'ninja', 'sura', 'shaman'],
  },
];

export const CHARACTERS = [
  {
    id: 'warrior',
    name: 'Warrior',
    description: 'Master of close combat with exceptional defense',
    icon: '⚔️',
    stats: {
      strength: 90,
      intelligence: 40,
      dexterity: 60,
      vitality: 85,
    },
    abilities: ['Body Force', 'Mental Fight'],
    paths: [
      {
        name: 'Body Warrior',
        description: 'Tank specialist with high defense',
        icon: '🛡️',
      },
      {
        name: 'Mental Warrior',
        description: 'Damage dealer with powerful strikes',
        icon: '💥',
      },
    ],
  },
  {
    id: 'ninja',
    name: 'Ninja',
    description: 'Swift assassin with deadly precision',
    icon: '🗡️',
    stats: {
      strength: 70,
      intelligence: 50,
      dexterity: 95,
      vitality: 60,
    },
    abilities: ['Assassination', 'Archery'],
    paths: [
      {
        name: 'Assassin',
        description: 'Melee DPS with critical strikes',
        icon: '🥷',
      },
      {
        name: 'Archer',
        description: 'Ranged DPS with piercing arrows',
        icon: '🏹',
      },
    ],
  },
  {
    id: 'sura',
    name: 'Sura',
    description: 'Dark magic wielder with hybrid combat',
    icon: '🔮',
    stats: {
      strength: 75,
      intelligence: 80,
      dexterity: 65,
      vitality: 70,
    },
    abilities: ['Black Magic', 'Weaponary'],
    paths: [
      {
        name: 'Black Magic',
        description: 'Offensive magic specialist',
        icon: '⚡',
      },
      {
        name: 'Weaponary',
        description: 'Melee and magic hybrid',
        icon: '🗡️',
      },
    ],
  },
  {
    id: 'shaman',
    name: 'Shaman',
    description: 'Support specialist with healing powers',
    icon: '✨',
    stats: {
      strength: 50,
      intelligence: 95,
      dexterity: 55,
      vitality: 75,
    },
    abilities: ['Dragon Force', 'Healing'],
    paths: [
      {
        name: 'Dragon Shaman',
        description: 'Buffer with powerful enchantments',
        icon: '🐲',
      },
      {
        name: 'Healing Shaman',
        description: 'Healer with restoration magic',
        icon: '💚',
      },
    ],
  },
];

export const GAME_CONFIG = {
  maxLevel: 99,
  startingLevel: 1,
  startingGold: 1000,
  inventorySize: 24,

  stats: {
    strength: { label: 'Strength', icon: '💪', color: '#EF4444' },
    intelligence: { label: 'Intelligence', icon: '🧠', color: '#3B82F6' },
    dexterity: { label: 'Dexterity', icon: '⚡', color: '#10B981' },
    vitality: { label: 'Vitality', icon: '❤️', color: '#F59E0B' },
  },
};

export default { KINGDOMS, CHARACTERS, GAME_CONFIG };
