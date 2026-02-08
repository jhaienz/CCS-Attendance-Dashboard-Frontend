

interface EventHeaderProps {
  title: string;
  date: string;
}

export function EventHeader({
  title,
  date
}: EventHeaderProps) {
  return (
    <div className="mb-6">
      <div className="flex items-center justify-between mb-4">
        <h1 className="text-2xl font-bold text-green">{title}</h1>
      </div>

      <div className="flex items-center gap-4">
        <div className="text-sm text-muted-foreground flex-1">
          {new Date(date).toLocaleDateString('en-US', {
            weekday: 'long',
            year: 'numeric',
            month: 'long',
            day: 'numeric'
          })}
        </div>
      </div>
    </div>
  );
}
