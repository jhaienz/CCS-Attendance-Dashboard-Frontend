import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Attendee } from '@/types/dashboard';
import { UserCheck } from 'lucide-react';

interface AttendeeListCardProps {
  attendees: Attendee[];
  selectedYearLevel: string | null;
}

export function AttendeeListCard({ attendees, selectedYearLevel }: AttendeeListCardProps) {
  return (
    <Card className="h-full">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <UserCheck className="h-5 w-5" style={{ color: '#22c55e' }} />
          <span>Attendee List</span>
          {selectedYearLevel && (
            <Badge variant="secondary" className="ml-auto">
              {selectedYearLevel} Year Only
            </Badge>
          )}
        </CardTitle>
        <p className="text-sm text-muted-foreground">
          <span className="text-green font-semibold">{attendees.length}</span> {attendees.length === 1 ? 'student' : 'students'} present
        </p>
      </CardHeader>
      <CardContent>
        <ScrollArea className="h-[720px]">
          <div className="space-y-3">
            {attendees.map((attendee) => (
              <div
                key={attendee.id}
                className="flex items-center gap-3 p-3 rounded-lg bg-secondary hover:bg-secondary/80 transition-colors"
              >
                <div className="flex-1 min-w-0">
                  <div className="font-medium truncate">{attendee.name}</div>
                  <div className="text-xs text-muted-foreground">{attendee.studentId}</div>
                </div>
                <div className="text-xs font-medium text-muted-foreground">
                  {attendee.yearLevel} Year
                </div>
              </div>
            ))}
          </div>
        </ScrollArea>
      </CardContent>
    </Card>
  );
}
