import { useState } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import Icon from '@/components/ui/icon';

type WeaponType = 'rifle' | 'pistol' | 'knife' | 'sniper';
type Rarity = 'common' | 'rare' | 'epic' | 'legendary';

interface Weapon {
  id: string;
  name: string;
  type: WeaponType;
  price: number;
  rarity: Rarity;
  skin?: string;
}

interface GameCase {
  id: string;
  name: string;
  price: number;
  image: string;
}

const weapons: Weapon[] = [
  { id: 'ak47', name: 'AK-47', type: 'rifle', price: 2700, rarity: 'common' },
  { id: 'm4a1', name: 'M4A1-S', type: 'rifle', price: 3100, rarity: 'common' },
  { id: 'awp', name: 'AWP', type: 'sniper', price: 4750, rarity: 'rare' },
  { id: 'deagle', name: 'Desert Eagle', type: 'pistol', price: 700, rarity: 'common' },
  { id: 'knife', name: 'Karambit', type: 'knife', price: 0, rarity: 'legendary', skin: 'Fade' },
  { id: 'knife2', name: 'Butterfly Knife', type: 'knife', price: 0, rarity: 'legendary', skin: 'Doppler' },
];

const skins: Weapon[] = [
  { id: 'ak-neon', name: 'AK-47 Neon Revolution', type: 'rifle', price: 1500, rarity: 'epic', skin: 'Neon Revolution' },
  { id: 'awp-asiimov', name: 'AWP Asiimov', type: 'sniper', price: 3500, rarity: 'epic', skin: 'Asiimov' },
  { id: 'm4-howl', name: 'M4A4 Howl', type: 'rifle', price: 5000, rarity: 'legendary', skin: 'Howl' },
];

const cases: GameCase[] = [
  { id: 'case1', name: 'Weapon Case', price: 250, image: '🎁' },
  { id: 'case2', name: 'Premium Case', price: 500, image: '💎' },
  { id: 'case3', name: 'Elite Case', price: 1000, image: '👑' },
];

const maps = [
  { id: 'dust2', name: 'Dust II', icon: '🏜️' },
  { id: 'mirage', name: 'Mirage', icon: '🏛️' },
  { id: 'inferno', name: 'Inferno', icon: '🔥' },
  { id: 'nuke', name: 'Nuke', icon: '☢️' },
];

const ranks = [
  { name: 'Новичок', min: 0, max: 100 },
  { name: 'Боец', min: 100, max: 300 },
  { name: 'Эксперт', min: 300, max: 600 },
  { name: 'Мастер', min: 600, max: 1000 },
  { name: 'Легенда', min: 1000, max: 2000 },
];

const rarityColors = {
  common: 'bg-gray-500',
  rare: 'bg-blue-500',
  epic: 'bg-purple-500',
  legendary: 'bg-yellow-500',
};

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

  const currentRank = ranks.find(rank => experience >= rank.min && experience < rank.max) || ranks[0];
  const rankProgress = ((experience - currentRank.min) / (currentRank.max - currentRank.min)) * 100;

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
    const currentMap = maps.find(m => m.id === selectedMap);
    return (
      <div className="min-h-screen bg-background relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-primary/10 to-background pointer-events-none" />
        
        <div className="relative z-10 p-6">
          <div className="flex justify-between items-center mb-8">
            <div className="flex items-center gap-4">
              <div className="text-2xl">{currentMap?.icon}</div>
              <div>
                <h2 className="text-xl font-bold">{currentMap?.name}</h2>
                <p className="text-sm text-muted-foreground">В игре</p>
              </div>
            </div>
            
            <div className="flex gap-4 items-center">
              <div className="bg-card px-6 py-3 rounded-lg border border-border">
                <div className="flex items-center gap-2">
                  <Icon name="Coins" size={20} className="text-accent" />
                  <span className="font-bold text-xl">${gameBalance}</span>
                </div>
              </div>
              
              <Button onClick={() => setShowShopInGame(true)} size="lg">
                <Icon name="ShoppingBag" size={20} className="mr-2" />
                Магазин
              </Button>
              
              <Button onClick={exitGame} variant="destructive" size="lg">
                <Icon name="LogOut" size={20} className="mr-2" />
                Выход
              </Button>
            </div>
          </div>

          <div className="text-center mt-32">
            <div className="text-6xl mb-4">🎯</div>
            <h1 className="text-4xl font-bold mb-2">Игра началась!</h1>
            <p className="text-muted-foreground">Откройте магазин для покупки оружия</p>
          </div>
        </div>

        <Dialog open={showShopInGame} onOpenChange={setShowShopInGame}>
          <DialogContent className="max-w-4xl max-h-[80vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle className="text-2xl">Магазин оружия</DialogTitle>
            </DialogHeader>
            
            <div className="grid grid-cols-2 gap-4 mt-4">
              {weapons.filter(w => w.price > 0).map((weapon) => (
                <Card key={weapon.id} className="p-4 hover:border-primary transition-colors">
                  <div className="flex justify-between items-start mb-3">
                    <div>
                      <h3 className="font-bold">{weapon.name}</h3>
                      <Badge className={`${rarityColors[weapon.rarity]} mt-1`}>
                        {weapon.rarity}
                      </Badge>
                    </div>
                    <div className="text-2xl">
                      {weapon.type === 'rifle' && '🔫'}
                      {weapon.type === 'pistol' && '🔫'}
                      {weapon.type === 'sniper' && '🎯'}
                    </div>
                  </div>
                  
                  <Button 
                    onClick={() => buyGameWeapon(weapon)}
                    disabled={gameBalance < weapon.price}
                    className="w-full"
                  >
                    <Icon name="ShoppingCart" size={16} className="mr-2" />
                    ${weapon.price}
                  </Button>
                </Card>
              ))}
            </div>
          </DialogContent>
        </Dialog>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <nav className="border-b border-border bg-card/50 backdrop-blur-sm sticky top-0 z-50">
        <div className="container mx-auto px-6 py-4">
          <div className="flex justify-between items-center">
            <div className="flex gap-6">
              {[
                { id: 'home', label: 'Главная', icon: 'Home' },
                { id: 'inventory', label: 'Инвентарь', icon: 'Package' },
                { id: 'shop', label: 'Магазин', icon: 'ShoppingBag' },
                { id: 'profile', label: 'Профиль', icon: 'User' },
                { id: 'stats', label: 'Статистика', icon: 'BarChart3' },
                { id: 'settings', label: 'Настройки', icon: 'Settings' },
              ].map((section) => (
                <button
                  key={section.id}
                  onClick={() => setActiveSection(section.id)}
                  className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-all ${
                    activeSection === section.id
                      ? 'bg-primary text-primary-foreground'
                      : 'text-muted-foreground hover:text-foreground hover:bg-muted'
                  }`}
                >
                  <Icon name={section.icon as any} size={20} />
                  <span className="font-medium">{section.label}</span>
                </button>
              ))}
            </div>
            
            <div className="flex items-center gap-4">
              <div className="bg-card px-4 py-2 rounded-lg border border-border">
                <div className="flex items-center gap-2">
                  <Icon name="Coins" size={20} className="text-accent" />
                  <span className="font-bold">${balance}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </nav>

      <main className="container mx-auto px-6 py-8">
        {activeSection === 'home' && (
          <div className="space-y-8">
            <div className="text-center space-y-4 py-12">
              <h1 className="text-6xl font-bold">TACTICAL SHOOTER</h1>
              <p className="text-xl text-muted-foreground">Минималистичный тактический шутер</p>
            </div>

            <Card className="p-8">
              <div className="flex items-center justify-between mb-6">
                <div>
                  <h2 className="text-2xl font-bold mb-2">Ваш ранг: {currentRank.name}</h2>
                  <p className="text-muted-foreground">{experience} / {currentRank.max} опыта</p>
                </div>
                <div className="text-5xl">
                  {currentRank.name === 'Новичок' && '🥉'}
                  {currentRank.name === 'Боец' && '🥈'}
                  {currentRank.name === 'Эксперт' && '🥇'}
                  {currentRank.name === 'Мастер' && '💎'}
                  {currentRank.name === 'Легенда' && '👑'}
                </div>
              </div>
              <Progress value={rankProgress} className="h-3" />
            </Card>

            <div>
              <h2 className="text-3xl font-bold mb-6">Выбор карты</h2>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {maps.map((map) => (
                  <Card 
                    key={map.id}
                    className="p-6 hover:border-primary transition-all cursor-pointer hover:scale-105"
                    onClick={() => startGame(map.id)}
                  >
                    <div className="text-6xl mb-4 text-center">{map.icon}</div>
                    <h3 className="text-xl font-bold text-center mb-4">{map.name}</h3>
                    <Button className="w-full" size="lg">
                      <Icon name="Play" size={20} className="mr-2" />
                      Играть
                    </Button>
                  </Card>
                ))}
              </div>
            </div>
          </div>
        )}

        {activeSection === 'shop' && (
          <div className="space-y-8">
            <h1 className="text-4xl font-bold">Магазин</h1>
            
            <Tabs defaultValue="weapons" className="w-full">
              <TabsList className="grid w-full grid-cols-3 max-w-md">
                <TabsTrigger value="weapons">Оружие</TabsTrigger>
                <TabsTrigger value="skins">Скины</TabsTrigger>
                <TabsTrigger value="cases">Кейсы</TabsTrigger>
              </TabsList>
              
              <TabsContent value="weapons" className="mt-6">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  {weapons.filter(w => w.price > 0).map((weapon) => (
                    <Card key={weapon.id} className="p-6 hover:border-primary transition-colors">
                      <div className="flex justify-between items-start mb-4">
                        <div>
                          <h3 className="text-xl font-bold mb-2">{weapon.name}</h3>
                          <Badge className={rarityColors[weapon.rarity]}>
                            {weapon.rarity}
                          </Badge>
                        </div>
                        <div className="text-4xl">
                          {weapon.type === 'rifle' && '🔫'}
                          {weapon.type === 'pistol' && '🔫'}
                          {weapon.type === 'sniper' && '🎯'}
                        </div>
                      </div>
                      
                      <div className="flex items-center justify-between mt-6">
                        <span className="text-2xl font-bold text-accent">${weapon.price}</span>
                        <Button 
                          onClick={() => buyItem(weapon)}
                          disabled={balance < weapon.price}
                        >
                          <Icon name="ShoppingCart" size={16} className="mr-2" />
                          Купить
                        </Button>
                      </div>
                    </Card>
                  ))}
                </div>
              </TabsContent>
              
              <TabsContent value="skins" className="mt-6">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  {skins.map((skin) => (
                    <Card key={skin.id} className="p-6 hover:border-primary transition-colors">
                      <div className="flex justify-between items-start mb-4">
                        <div>
                          <h3 className="text-xl font-bold mb-2">{skin.name}</h3>
                          <Badge className={rarityColors[skin.rarity]}>
                            {skin.rarity}
                          </Badge>
                        </div>
                        <div className="text-4xl">✨</div>
                      </div>
                      
                      <div className="flex items-center justify-between mt-6">
                        <span className="text-2xl font-bold text-accent">${skin.price}</span>
                        <Button 
                          onClick={() => buyItem(skin)}
                          disabled={balance < skin.price}
                        >
                          <Icon name="ShoppingCart" size={16} className="mr-2" />
                          Купить
                        </Button>
                      </div>
                    </Card>
                  ))}
                </div>
              </TabsContent>
              
              <TabsContent value="cases" className="mt-6">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  {cases.map((caseItem) => (
                    <Card key={caseItem.id} className="p-6 hover:border-secondary transition-colors">
                      <div className="text-6xl mb-4 text-center">{caseItem.image}</div>
                      <h3 className="text-xl font-bold text-center mb-4">{caseItem.name}</h3>
                      
                      <div className="flex items-center justify-between mt-6">
                        <span className="text-2xl font-bold text-accent">${caseItem.price}</span>
                        <Button 
                          onClick={() => openCase(caseItem)}
                          disabled={balance < caseItem.price}
                          variant="secondary"
                        >
                          <Icon name="Gift" size={16} className="mr-2" />
                          Открыть
                        </Button>
                      </div>
                    </Card>
                  ))}
                </div>
              </TabsContent>
            </Tabs>
          </div>
        )}

        {activeSection === 'inventory' && (
          <div className="space-y-8">
            <div className="flex justify-between items-center">
              <h1 className="text-4xl font-bold">Инвентарь</h1>
              <Badge variant="outline" className="text-lg px-4 py-2">
                {inventory.length} предметов
              </Badge>
            </div>
            
            {inventory.length === 0 ? (
              <Card className="p-12 text-center">
                <div className="text-6xl mb-4">📦</div>
                <h3 className="text-2xl font-bold mb-2">Инвентарь пуст</h3>
                <p className="text-muted-foreground">Купите оружие или скины в магазине</p>
              </Card>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {inventory.map((item, index) => (
                  <Card key={`${item.id}-${index}`} className="p-6">
                    <div className="flex justify-between items-start mb-4">
                      <div>
                        <h3 className="text-xl font-bold mb-2">{item.name}</h3>
                        {item.skin && (
                          <p className="text-sm text-muted-foreground mb-2">{item.skin}</p>
                        )}
                        <Badge className={rarityColors[item.rarity]}>
                          {item.rarity}
                        </Badge>
                      </div>
                      <div className="text-4xl">
                        {item.type === 'rifle' && '🔫'}
                        {item.type === 'pistol' && '🔫'}
                        {item.type === 'sniper' && '🎯'}
                        {item.type === 'knife' && '🔪'}
                      </div>
                    </div>
                  </Card>
                ))}
              </div>
            )}
          </div>
        )}

        {activeSection === 'profile' && (
          <div className="space-y-8">
            <h1 className="text-4xl font-bold">Профиль</h1>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Card className="p-8">
                <div className="flex items-center gap-6 mb-6">
                  <div className="w-24 h-24 bg-primary rounded-full flex items-center justify-center text-4xl">
                    👤
                  </div>
                  <div>
                    <h2 className="text-2xl font-bold">Игрок</h2>
                    <p className="text-muted-foreground">ID: #12345</p>
                  </div>
                </div>
                
                <div className="space-y-4">
                  <div className="flex justify-between items-center">
                    <span className="text-muted-foreground">Ранг</span>
                    <span className="font-bold">{currentRank.name}</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-muted-foreground">Опыт</span>
                    <span className="font-bold">{experience} XP</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-muted-foreground">Баланс</span>
                    <span className="font-bold text-accent">${balance}</span>
                  </div>
                </div>
              </Card>

              <Card className="p-8">
                <h3 className="text-xl font-bold mb-6">Прогресс по рангам</h3>
                <div className="space-y-4">
                  {ranks.map((rank) => (
                    <div key={rank.name} className="space-y-2">
                      <div className="flex justify-between items-center">
                        <span className={experience >= rank.min ? 'font-bold' : 'text-muted-foreground'}>
                          {rank.name}
                        </span>
                        <span className="text-sm text-muted-foreground">
                          {rank.min} - {rank.max} XP
                        </span>
                      </div>
                      <Progress 
                        value={experience >= rank.max ? 100 : experience >= rank.min ? ((experience - rank.min) / (rank.max - rank.min)) * 100 : 0} 
                        className="h-2"
                      />
                    </div>
                  ))}
                </div>
              </Card>
            </div>
          </div>
        )}

        {activeSection === 'stats' && (
          <div className="space-y-8">
            <h1 className="text-4xl font-bold">Статистика</h1>
            
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
              {[
                { label: 'Матчей сыграно', value: '42', icon: 'Trophy' },
                { label: 'Побед', value: '28', icon: 'TrendingUp' },
                { label: 'Винрейт', value: '67%', icon: 'Target' },
                { label: 'Лучшая серия', value: '8', icon: 'Flame' },
              ].map((stat) => (
                <Card key={stat.label} className="p-6 text-center">
                  <Icon name={stat.icon as any} size={32} className="mx-auto mb-4 text-primary" />
                  <div className="text-3xl font-bold mb-2">{stat.value}</div>
                  <div className="text-sm text-muted-foreground">{stat.label}</div>
                </Card>
              ))}
            </div>
          </div>
        )}

        {activeSection === 'settings' && (
          <div className="space-y-8">
            <h1 className="text-4xl font-bold">Настройки</h1>
            
            <Card className="p-8">
              <div className="space-y-6">
                <div>
                  <h3 className="text-xl font-bold mb-4">Игра</h3>
                  <div className="space-y-4">
                    <div className="flex justify-between items-center">
                      <span>Звук</span>
                      <Button variant="outline">80%</Button>
                    </div>
                    <div className="flex justify-between items-center">
                      <span>Чувствительность мыши</span>
                      <Button variant="outline">50%</Button>
                    </div>
                  </div>
                </div>
                
                <div>
                  <h3 className="text-xl font-bold mb-4">Графика</h3>
                  <div className="space-y-4">
                    <div className="flex justify-between items-center">
                      <span>Качество</span>
                      <Button variant="outline">Высокое</Button>
                    </div>
                  </div>
                </div>
              </div>
            </Card>
          </div>
        )}
      </main>

      <Dialog open={showCaseResult} onOpenChange={setShowCaseResult}>
        <DialogContent className="max-w-md">
          <DialogHeader>
            <DialogTitle className="text-2xl text-center">Вы получили!</DialogTitle>
          </DialogHeader>
          
          {openedCase && (
            <div className="text-center space-y-6 py-6">
              <div className="text-6xl">
                {openedCase.type === 'rifle' && '🔫'}
                {openedCase.type === 'pistol' && '🔫'}
                {openedCase.type === 'sniper' && '🎯'}
                {openedCase.type === 'knife' && '🔪'}
              </div>
              
              <div>
                <h3 className="text-2xl font-bold mb-2">{openedCase.name}</h3>
                {openedCase.skin && (
                  <p className="text-muted-foreground mb-3">{openedCase.skin}</p>
                )}
                <Badge className={`${rarityColors[openedCase.rarity]} text-lg px-4 py-2`}>
                  {openedCase.rarity}
                </Badge>
              </div>
              
              <Button 
                onClick={() => setShowCaseResult(false)}
                size="lg"
                className="w-full"
              >
                Отлично!
              </Button>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
}
