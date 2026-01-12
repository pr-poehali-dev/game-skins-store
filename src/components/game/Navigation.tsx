import Icon from '@/components/ui/icon';

interface NavigationProps {
  activeSection: string;
  setActiveSection: (section: string) => void;
  balance: number;
}

export default function Navigation({ activeSection, setActiveSection, balance }: NavigationProps) {
  return (
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
  );
}
