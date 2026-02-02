import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { TrendingUp } from 'lucide-react';

interface TotalAttendanceCardProps {
  totalPresent: number;
  totalEnrolled: number;
}

export function TotalAttendanceCard({ totalPresent, totalEnrolled }: TotalAttendanceCardProps) {
  const percentage = Math.round((totalPresent / totalEnrolled) * 100);
  const radius = 70;
  const circumference = 2 * Math.PI * radius;
  const strokeDashoffset = circumference - (percentage / 100) * circumference;

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <TrendingUp className="h-5 w-5" style={{ color: '#22c55e' }} />
          <span>Total Attendance</span>
        </CardTitle>
        <p className="text-sm text-muted-foreground">All year levels combined</p>
      </CardHeader>
      <CardContent className="flex flex-col items-center">
        {/* Circular Progress */}
        <div className="relative w-48 h-48 mb-6">
          <svg className="transform -rotate-90 w-full h-full">
            {/* Background circle */}
            <circle
              cx="96"
              cy="96"
              r={radius}
              stroke="currentColor"
              strokeWidth="12"
              fill="none"
              className="text-secondary"
            />
            {/* Progress circle */}
            <circle
              cx="96"
              cy="96"
              r={radius}
              stroke="#22c55e"
              strokeWidth="12"
              fill="none"
              strokeDasharray={circumference}
              strokeDashoffset={strokeDashoffset}
              strokeLinecap="round"
              className="transition-all duration-1000 ease-out"
            />
          </svg>
          {/* Center text */}
          <div className="absolute inset-0 flex flex-col items-center justify-center">
            <div className="text-4xl font-bold text-green">{percentage}%</div>
            <div className="text-sm text-muted-foreground">Attendance</div>
          </div>
        </div>

        {/* Stats */}
        <div className="w-full grid grid-cols-2 gap-4">
          <div className="text-center p-3 rounded-lg bg-secondary">
            <div className="text-2xl font-bold text-green">{totalPresent}</div>
            <div className="text-xs text-muted-foreground">Present</div>
          </div>
          <div className="text-center p-3 rounded-lg bg-secondary">
            <div className="text-2xl font-bold">{totalEnrolled}</div>
            <div className="text-xs text-muted-foreground">Enrolled</div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
