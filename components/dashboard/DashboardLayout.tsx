import { ReactNode } from 'react';
import { Header } from './Header';
import { EventsSidebar } from './EventsSidebar';
import { Event } from '@/types/dashboard';

interface DashboardLayoutProps {
  children: ReactNode;
  events: Event[];
  selectedEventId: string | null;
  onEventSelect: (eventId: string) => void;
}

export function DashboardLayout({ children, events, selectedEventId, onEventSelect }: DashboardLayoutProps) {
  return (
    <div className="h-screen flex flex-col bg-background text-foreground">
      <Header />
      <div className="flex flex-1 overflow-hidden">
        <EventsSidebar 
          events={events} 
          selectedEventId={selectedEventId}
          onEventSelect={onEventSelect}
        />
        <main className="flex-1 overflow-auto">
          {children}
        </main>
      </div>
    </div>
  );
}
