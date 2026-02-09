import { Card, CardContent } from '@/components/ui/card';
import { cn } from '@/lib/utils';
import { YearLevel } from '@/types/dashboard';
import { Users } from 'lucide-react';

interface YearLevelCardProps {
  yearLevel: YearLevel;
}

export function YearLevelCard({ yearLevel }: YearLevelCardProps) {
  const percentage = Math.round((yearLevel.present / yearLevel.total) * 100);

  return (
    <Card
      className={cn(
        'cursor-pointer transition-all',
      )}
    >
      <CardContent className="p-6">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-2">
            <Users className="h-5 w-5" />
            <h3 className="font-semibold text-sm text-muted-foreground">{yearLevel.year} Year</h3>
          </div>
        </div>

        <div className="space-y-2">
          <div className="text-3xl font-bold text-green">{yearLevel.present}</div>
          <div className="text-sm text-muted-foreground">
            out of {yearLevel.total} ({percentage}%)
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
