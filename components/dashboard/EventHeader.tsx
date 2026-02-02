import { Calendar } from 'lucide-react';

interface EventHeaderProps {
  title: string;
  date: string;
}

export function EventHeader({ title, date }: EventHeaderProps) {
  const formattedDate = new Date(date).toLocaleDateString('en-US', {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  });

  return (
    <div className="mb-6">
      <h1 className="text-2xl font-bold text-green mb-1">{title}</h1>
      <div className="flex items-center gap-2 text-muted-foreground">
        <Calendar className="h-4 w-4" />
        <span className="text-sm">{formattedDate}</span>
      </div>
    </div>
  );
}
