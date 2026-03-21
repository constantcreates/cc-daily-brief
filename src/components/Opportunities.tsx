

import { Lightbulb, ArrowRight } from 'lucide-react';

interface OpportunitiesProps {
  data: {
    type: string;
    title: string;
    description: string;
    priority: string;
  }[];
}

export default function Opportunities({ data }: OpportunitiesProps) {
  const typeIcons: Record<string, string> = {
    lead: '🎯',
    referral: '🤝',
    content: '📝',
    seo: '🔍',
    partnership: '🔗',
  };

  const priorityStyles: Record<string, string> = {
    high: 'bg-cc-sage/15 text-cc-sage border-cc-sage/30',
    medium: 'bg-blue-400/15 text-blue-400 border-blue-400/30',
    low: 'bg-cc-cream/10 text-cc-cream/50 border-cc-cream/10',
  };

  // Show top 3 actionable
  const top3 = data.slice(0, 3);
  const rest = data.slice(3);

  return (
    <div className="card-glow rounded-2xl bg-cc-forest/50 border border-cc-green/15 p-6">
      <div className="flex items-center justify-between mb-5">
        <h3 className="text-lg font-semibold text-cc-cream flex items-center gap-2">
          <Lightbulb className="w-5 h-5 text-cc-sage" />
          Opportunities
        </h3>
        <span className="text-xs text-cc-sage/50 uppercase tracking-wider">
          {data.length} identified
        </span>
      </div>

      {/* Top 3 featured */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
        {top3.map((opp, i) => (
          <div
            key={i}
            className={`rounded-xl p-4 border ${priorityStyles[opp.priority]} bg-opacity-50`}
          >
            <div className="flex items-center gap-2 mb-2">
              <span className="text-lg">{typeIcons[opp.type] || '💡'}</span>
              <span className="text-[10px] font-medium uppercase tracking-wider opacity-70">
                {opp.type}
              </span>
            </div>
            <p className="text-sm font-medium text-cc-cream mb-1">{opp.title}</p>
            <p className="text-xs text-cc-cream/50 leading-relaxed">
              {opp.description}
            </p>
          </div>
        ))}
      </div>

      {/* Remaining opportunities */}
      {rest.length > 0 && (
        <div className="space-y-2">
          {rest.map((opp, i) => (
            <div
              key={i}
              className="flex items-center gap-3 bg-cc-dark/20 rounded-lg px-4 py-3"
            >
              <span>{typeIcons[opp.type] || '💡'}</span>
              <div className="flex-1 min-w-0">
                <p className="text-sm text-cc-cream truncate">{opp.title}</p>
                <p className="text-xs text-cc-cream/40 truncate">
                  {opp.description}
                </p>
              </div>
              <ArrowRight className="w-4 h-4 text-cc-cream/30 shrink-0" />
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
