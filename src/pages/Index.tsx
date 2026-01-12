import { useState } from 'react';
import Navigation from '@/components/game/Navigation';
import GameScreen from '@/components/game/GameScreen';
import MainMenu from '@/components/game/MainMenu';
import { weapons, skins, type Weapon, type GameCase } from '@/components/game/types';

export default function Index() {
  const [activeSection, setActiveSection] = useState('home');
  const [balance, setBalance] = useState(10000);
  const [inventory, setInventory] = useState<Weapon[]>([]);
  const [experience, setExperience] = useState(450);
  const [isGameActive, setIsGameActive] = useState(false);
  const [selectedMap, setSelectedMap] = useState('');
  const [showShopInGame, setShowShopInGame] = useState(false);
  const [gameBalance, setGameBalance] = useState(800);
  const [openedCase, setOpenedCase] = useState<Weapon | null>(null);
  const [showCaseResult, setShowCaseResult] = useState(false);

  const buyItem = (item: Weapon) => {
    if (balance >= item.price) {
      setBalance(balance - item.price);
      setInventory([...inventory, item]);
    }
  };

  const buyGameWeapon = (weapon: Weapon) => {
    if (gameBalance >= weapon.price) {
      setGameBalance(gameBalance - weapon.price);
    }
  };

  const openCase = (caseItem: GameCase) => {
    if (balance >= caseItem.price) {
      setBalance(balance - caseItem.price);
      const allItems = [...weapons.filter(w => w.rarity !== 'common'), ...skins];
      const randomItem = allItems[Math.floor(Math.random() * allItems.length)];
      setOpenedCase(randomItem);
      setInventory([...inventory, randomItem]);
      setShowCaseResult(true);
    }
  };

  const startGame = (mapId: string) => {
    setSelectedMap(mapId);
    setIsGameActive(true);
    setGameBalance(800);
  };

  const exitGame = () => {
    setIsGameActive(false);
    setSelectedMap('');
    setShowShopInGame(false);
  };

  if (isGameActive) {
    return (
      <GameScreen
        selectedMap={selectedMap}
        gameBalance={gameBalance}
        showShopInGame={showShopInGame}
        setShowShopInGame={setShowShopInGame}
        exitGame={exitGame}
        buyGameWeapon={buyGameWeapon}
      />
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <Navigation
        activeSection={activeSection}
        setActiveSection={setActiveSection}
        balance={balance}
      />
      
      <MainMenu
        activeSection={activeSection}
        balance={balance}
        inventory={inventory}
        experience={experience}
        buyItem={buyItem}
        openCase={openCase}
        startGame={startGame}
        openedCase={openedCase}
        showCaseResult={showCaseResult}
        setShowCaseResult={setShowCaseResult}
      />
    </div>
  );
}
