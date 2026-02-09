import { Button } from '@/components/ui/button';
import { isAuthenticated, performLogout } from '@/lib/utils';
import { LogOut } from 'lucide-react';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';

export function Header() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  // Check token validity when tab becomes visible or storage changes
  useEffect(() => {
    const handleVisibilityChange = () => {
      if (!document.hidden && !isAuthenticated()) {
        performLogout();
      }
    };

    const handleStorageChange = (e: StorageEvent) => {
      if (e.key === "authToken") {
        if (e.newValue) {
          // Login event from another tab
          sessionStorage.setItem("token", e.newValue);
          document.cookie = `token=${e.newValue}; path=/; max-age=${24 * 60 * 60}; SameSite=Strict; Secure`;
          window.location.reload(); // Refresh to get new data
        } else {
          // Logout event from another tab
          performLogout();
        }
      }
    };

    document.addEventListener('visibilitychange', handleVisibilityChange);
    window.addEventListener('storage', handleStorageChange);

    // Also check on initial load
    if (!isAuthenticated()) {
      performLogout();
    }

    return () => {
      document.removeEventListener('visibilitychange', handleVisibilityChange);
      window.removeEventListener('storage', handleStorageChange);
    };
  }, []);

  const handleLogout = async () => {
    setLoading(false);
    performLogout();
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
