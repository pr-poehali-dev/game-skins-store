export type WeaponType = 'rifle' | 'pistol' | 'knife' | 'sniper';
export type Rarity = 'common' | 'rare' | 'epic' | 'legendary';

export interface Weapon {
  id: string;
  name: string;
  type: WeaponType;
  price: number;
  rarity: Rarity;
  skin?: string;
}

export interface GameCase {
  id: string;
  name: string;
  price: number;
  image: string;
}

export interface Map {
  id: string;
  name: string;
  icon: string;
}

export interface Rank {
  name: string;
  min: number;
  max: number;
}

export const weapons: Weapon[] = [
  { id: 'ak47', name: 'AK-47', type: 'rifle', price: 2700, rarity: 'common' },
  { id: 'm4a1', name: 'M4A1-S', type: 'rifle', price: 3100, rarity: 'common' },
  { id: 'awp', name: 'AWP', type: 'sniper', price: 4750, rarity: 'rare' },
  { id: 'deagle', name: 'Desert Eagle', type: 'pistol', price: 700, rarity: 'common' },
  { id: 'knife', name: 'Karambit', type: 'knife', price: 0, rarity: 'legendary', skin: 'Fade' },
  { id: 'knife2', name: 'Butterfly Knife', type: 'knife', price: 0, rarity: 'legendary', skin: 'Doppler' },
];

export const skins: Weapon[] = [
  { id: 'ak-neon', name: 'AK-47 Neon Revolution', type: 'rifle', price: 1500, rarity: 'epic', skin: 'Neon Revolution' },
  { id: 'awp-asiimov', name: 'AWP Asiimov', type: 'sniper', price: 3500, rarity: 'epic', skin: 'Asiimov' },
  { id: 'm4-howl', name: 'M4A4 Howl', type: 'rifle', price: 5000, rarity: 'legendary', skin: 'Howl' },
];

export const cases: GameCase[] = [
  { id: 'case1', name: 'Weapon Case', price: 250, image: '🎁' },
  { id: 'case2', name: 'Premium Case', price: 500, image: '💎' },
  { id: 'case3', name: 'Elite Case', price: 1000, image: '👑' },
];

export const maps: Map[] = [
  { id: 'dust2', name: 'Dust II', icon: '🏜️' },
  { id: 'mirage', name: 'Mirage', icon: '🏛️' },
  { id: 'inferno', name: 'Inferno', icon: '🔥' },
  { id: 'nuke', name: 'Nuke', icon: '☢️' },
];

export const ranks: Rank[] = [
  { name: 'Новичок', min: 0, max: 100 },
  { name: 'Боец', min: 100, max: 300 },
  { name: 'Эксперт', min: 300, max: 600 },
  { name: 'Мастер', min: 600, max: 1000 },
  { name: 'Легенда', min: 1000, max: 2000 },
];

export const rarityColors = {
  common: 'bg-gray-500',
  rare: 'bg-blue-500',
  epic: 'bg-purple-500',
  legendary: 'bg-yellow-500',
};
