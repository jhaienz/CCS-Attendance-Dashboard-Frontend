import { ScrollArea } from '@/components/ui/scroll-area';
import { cn } from '@/lib/utils';
import { Event } from '@/types/dashboard';
import { Calendar } from 'lucide-react';

interface EventsSidebarProps {
  events: Event[];
  selectedEventId: string | null;
  onEventSelect: (eventId: string) => void;
}

export function EventsSidebar({ events, selectedEventId, onEventSelect }: EventsSidebarProps) {
  return (
    <div className="w-60 h-screen bg-sidebar border-r border-sidebar-border flex flex-col">
      {/* Events List */}
      <ScrollArea className="flex-1 px-3 py-4">
        <div className="space-y-1">
          <h2 className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-3 px-3">
            Events
          </h2>
          {events.map((event) => (
            <button
              key={event.id}
              onClick={() => onEventSelect(event.id)}
              className={cn(
                'w-full text-left px-3 py-2 rounded-lg text-sm transition-colors',
                'hover:bg-sidebar-accent',
                selectedEventId === event.id
                  ? 'bg-sidebar-accent text-sidebar-accent-foreground border border-green'
                  : 'text-sidebar-foreground'
              )}
            >
              <div className="flex items-center gap-2">
                <Calendar className="h-4 w-4 shrink-0" style={{ color: selectedEventId === event.id ? '#22c55e' : undefined }} />
                <span className="truncate">{event.title}</span>
              </div>
              <div className="text-xs text-muted-foreground mt-0.5 ml-6">
                {new Date(event.date).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}
              </div>
            </button>
          ))}
        </div>
      </ScrollArea>
    </div>
  );
}
