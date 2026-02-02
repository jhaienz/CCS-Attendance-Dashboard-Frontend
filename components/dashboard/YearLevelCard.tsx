import { Card, CardContent } from '@/components/ui/card';
import { cn } from '@/lib/utils';
import { YearLevel } from '@/types/dashboard';
import { Users } from 'lucide-react';

interface YearLevelCardProps {
  yearLevel: YearLevel;
  isSelected: boolean;
  onClick: () => void;
}

export function YearLevelCard({ yearLevel, isSelected, onClick }: YearLevelCardProps) {
  const percentage = Math.round((yearLevel.present / yearLevel.total) * 100);

  return (
    <Card
      className={cn(
        'cursor-pointer transition-all hover:border-green/50',
        isSelected ? 'border-green border-2 bg-sidebar-accent' : 'border-border'
      )}
      onClick={onClick}
    >
      <CardContent className="p-6">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-2">
            <Users className="h-5 w-5" style={{ color: isSelected ? '#22c55e' : undefined }} />
            <h3 className="font-semibold text-sm text-muted-foreground">{yearLevel.year} Year</h3>
          </div>

          {/* SHOW SELECTED BADGE  */}
          {isSelected && (
            <div className="text-xs bg-green text-white px-2 py-0.5 rounded">
              SELECTED
            </div>
          )}
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
