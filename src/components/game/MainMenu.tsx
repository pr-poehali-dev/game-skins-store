import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import Icon from '@/components/ui/icon';
import { weapons, skins, cases, maps, ranks, rarityColors, type Weapon, type GameCase } from './types';

interface MainMenuProps {
  activeSection: string;
  balance: number;
  inventory: Weapon[];
  experience: number;
  buyItem: (item: Weapon) => void;
  openCase: (caseItem: GameCase) => void;
  startGame: (mapId: string) => void;
  openedCase: Weapon | null;
  showCaseResult: boolean;
  setShowCaseResult: (show: boolean) => void;
}

export default function MainMenu({
  activeSection,
  balance,
  inventory,
  experience,
  buyItem,
  openCase,
  startGame,
  openedCase,
  showCaseResult,
  setShowCaseResult
}: MainMenuProps) {
  const currentRank = ranks.find(rank => experience >= rank.min && experience < rank.max) || ranks[0];
  const rankProgress = ((experience - currentRank.min) / (currentRank.max - currentRank.min)) * 100;

  return (
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
    </main>
  );
}
