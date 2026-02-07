import { Button } from '@/components/ui/button';
import { AuthService } from '@/services/auth-service';
import { LogOut } from 'lucide-react';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { useState } from 'react';

export function Header() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  const handleLogout = async () => {
    try {
      setLoading(true);
      await AuthService.officerLogout();
    } catch (error) {
      console.error('Logout failed:', error);
    } finally {
      // Clear token from session storage and cookies
      sessionStorage.removeItem('token');
      document.cookie = 'token=; path=/; expires=Thu, 01 Jan 1970 00:00:00 UTC;';
      setLoading(false);
      router.push('/login');
    }
  };

  return (
    <header className="h-16 bg-secondary border-b border-border flex items-center justify-between px-6">
      {/* Logo */}
      <div className="flex items-center gap-2">
        <Image src="/ccs_attendance.png" alt="Logo" width={42} height={42} />
        <span className="font-semibold text-lg">Attendance Dashboard</span>
      </div>

      {/* User Info & Actions */}
      <div className="flex items-center gap-4">
        <div className="text-right">
          <div className="text-sm font-medium">User</div>
          <div className="text-xs text-muted-foreground">Administrator</div>
        </div>

        <Button variant="ghost" size="icon" onClick={handleLogout} disabled={loading}>
          <LogOut className="h-5 w-5" />
        </Button>
      </div>
    </header>
  );
}
