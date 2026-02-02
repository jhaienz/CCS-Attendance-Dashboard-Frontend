import { Button } from '@/components/ui/button';
import { LogOut } from 'lucide-react';

export function Header() {
  const handleLogout = () => {
    console.log('Logout clicked');
  }
  return (
    <header className="h-16 bg-secondary border-b border-border flex items-center justify-between px-6">
      {/* Logo */}
      <div className="flex items-center gap-2">
        <div className="w-8 h-8 bg-green rounded-lg flex items-center justify-center">
          <span className="text-white font-bold text-sm">CCS</span>
        </div>
        <span className="font-semibold text-lg">Attendance Dashboard</span>
      </div>

      {/* User Info & Actions */}
      <div className="flex items-center gap-4">
        <div className="text-right">
          <div className="text-sm font-medium">User Name</div>
          <div className="text-xs text-muted-foreground">Administrator</div>
        </div>

        <Button variant="ghost" size="icon" onClick={handleLogout}>
          <LogOut className="h-5 w-5" />
        </Button>
      </div>
    </header>
  );
}
