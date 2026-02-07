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
  // pag kua kang year level from CSY like  "BSCS-2" convert to "2nd"
  const getYearLevel = (csy: string): string => {
    const yearMatch = csy.match(/\d/);
    if (yearMatch) {
      const year = parseInt(yearMatch[0]);
      const yearSuffix = year === 1 ? '1st' : year === 2 ? '2nd' : year === 3 ? '3rd' : '4th';
      return yearSuffix;
    }
    return 'Unknown';
  };

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
                key={attendee.studentId}
                className="flex items-center gap-3 p-3 rounded-lg bg-secondary hover:bg-secondary/80 transition-colors"
              >
                <div className="flex-1 min-w-0">
                  <div className="font-medium truncate">
                    {attendee.lastName}, {attendee.firstName}
                  </div>
                  <div className="text-xs text-muted-foreground">{attendee.studentId}</div>
                </div>
                <div className="text-xs font-medium text-muted-foreground">
                  {getYearLevel(attendee.CSY)} Year
                </div>
                <div className="flex gap-1">
                  {attendee.AM && <Badge className="bg-green text-white">AM</Badge>}
                  {attendee.PM && <Badge className="bg-blue text-white">PM</Badge>}
                  {attendee.AMOut && <Badge className="bg-yellow text-black">AM Out</Badge>}
                  {attendee.PMOut && <Badge className="bg-orange text-white">PM Out</Badge>}
                </div>
              </div>
            ))}
          </div>
        </ScrollArea>
      </CardContent>
    </Card>
  );
}
