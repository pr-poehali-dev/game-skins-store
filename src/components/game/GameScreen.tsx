import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import Icon from '@/components/ui/icon';
import { weapons, maps, rarityColors, type Weapon } from './types';

interface GameScreenProps {
  selectedMap: string;
  gameBalance: number;
  showShopInGame: boolean;
  setShowShopInGame: (show: boolean) => void;
  exitGame: () => void;
  buyGameWeapon: (weapon: Weapon) => void;
}

export default function GameScreen({
  selectedMap,
  gameBalance,
  showShopInGame,
  setShowShopInGame,
  exitGame,
  buyGameWeapon
}: GameScreenProps) {
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
