

import { Activity } from 'lucide-react';

interface OverviewProps {
  data: {
    date: string;
    healthSummary: string;
    healthRating: string;
  };
}

export default function Overview({ data }: OverviewProps) {
  const dateObj = new Date(data.date + 'T12:00:00');
  const dateStr = dateObj.toLocaleDateString('en-US', {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });

  const ratingColor =
    data.healthRating === 'strong'
      ? 'text-cc-sage'
      : data.healthRating === 'moderate'
      ? 'text-yellow-400'
      : 'text-orange-400';

  const ratingBg =
    data.healthRating === 'strong'
      ? 'bg-cc-sage/15 border-cc-sage/30'
      : data.healthRating === 'moderate'
      ? 'bg-yellow-400/15 border-yellow-400/30'
      : 'bg-orange-400/15 border-orange-400/30';

  return (
    <div className="card-glow rounded-2xl bg-cc-forest/50 border border-cc-green/15 p-6 sm:p-8">
      <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-4">
        <div className="flex-1">
          <p className="text-cc-sage/60 text-sm tracking-wider uppercase mb-1">
            {dateStr}
          </p>
          <h2 className="text-2xl sm:text-3xl font-serif font-semibold text-cc-cream mb-3">
            Good Morning, Faye
          </h2>
          <p className="text-cc-cream/70 leading-relaxed max-w-2xl">
            {data.healthSummary}
          </p>
        </div>
        <div className={`flex items-center gap-2 px-4 py-2 rounded-full border ${ratingBg} shrink-0`}>
          <Activity className={`w-4 h-4 ${ratingColor}`} />
          <span className={`text-sm font-medium capitalize ${ratingColor}`}>
            {data.healthRating}
          </span>
        </div>
      </div>
    </div>
  );
}
