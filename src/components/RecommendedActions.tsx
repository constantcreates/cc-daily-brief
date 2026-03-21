

import { Rocket, Clock, CheckCircle2 } from 'lucide-react';
import { useState } from 'react';

interface RecommendedActionsProps {
  data: {
    action: string;
    category: string;
    impact: string;
    timeEstimate: string;
  }[];
}

export default function RecommendedActions({ data }: RecommendedActionsProps) {
  const [completed, setCompleted] = useState<Set<number>>(new Set());

  const toggle = (i: number) => {
    setCompleted((prev) => {
      const next = new Set(prev);
      if (next.has(i)) next.delete(i);
      else next.add(i);
      return next;
    });
  };

  const categoryColors: Record<string, string> = {
    outreach: 'bg-cc-sage/15 text-cc-sage',
    content: 'bg-blue-400/15 text-blue-400',
    authority: 'bg-purple-400/15 text-purple-400',
    networking: 'bg-amber-400/15 text-amber-400',
    engagement: 'bg-cyan-400/15 text-cyan-400',
  };

  const impactColors: Record<string, string> = {
    high: 'text-cc-sage',
    medium: 'text-blue-400',
    low: 'text-cc-cream/40',
  };

  return (
    <div className="card-glow rounded-2xl bg-gradient-to-br from-cc-forest/80 to-cc-green/20 border border-cc-sage/20 p-6">
      <div className="flex items-center justify-between mb-5">
        <h3 className="text-lg font-semibold text-cc-cream flex items-center gap-2">
          <Rocket className="w-5 h-5 text-cc-sage" />
          Today's Top 5 Actions
        </h3>
        <span className="text-xs text-cc-sage/70">
          {completed.size}/{data.length} complete
        </span>
      </div>

      <div className="space-y-3">
        {data.map((item, i) => {
          const isDone = completed.has(i);
          return (
            <div
              key={i}
              onClick={() => toggle(i)}
              className={`flex items-start gap-4 rounded-xl p-4 border cursor-pointer transition-all duration-200 ${
                isDone
                  ? 'bg-cc-sage/10 border-cc-sage/20 opacity-60'
                  : 'bg-cc-dark/40 border-cc-green/10 hover:border-cc-sage/30'
              }`}
            >
              <div className="mt-0.5 shrink-0">
                <div
                  className={`w-6 h-6 rounded-full border-2 flex items-center justify-center transition-colors ${
                    isDone
                      ? 'bg-cc-sage border-cc-sage'
                      : 'border-cc-green/30'
                  }`}
                >
                  {isDone && <CheckCircle2 className="w-4 h-4 text-cc-dark" />}
                  {!isDone && (
                    <span className="text-xs font-bold text-cc-cream/50">
                      {i + 1}
                    </span>
                  )}
                </div>
              </div>

              <div className="flex-1 min-w-0">
                <p
                  className={`text-sm font-medium leading-snug ${
                    isDone ? 'line-through text-cc-cream/40' : 'text-cc-cream'
                  }`}
                >
                  {item.action}
                </p>
                <div className="flex items-center gap-3 mt-2">
                  <span
                    className={`text-[10px] font-medium uppercase px-2 py-0.5 rounded-full ${
                      categoryColors[item.category] || 'bg-cc-cream/10 text-cc-cream/50'
                    }`}
                  >
                    {item.category}
                  </span>
                  <span className={`text-[10px] font-medium ${impactColors[item.impact]}`}>
                    {item.impact} impact
                  </span>
                  <span className="text-[10px] text-cc-cream/40 flex items-center gap-1">
                    <Clock className="w-3 h-3" />
                    {item.timeEstimate}
                  </span>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
