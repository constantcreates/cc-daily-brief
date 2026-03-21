

import { Compass, ChevronRight } from 'lucide-react';

interface StrategicSuggestionsProps {
  data: string[];
}

export default function StrategicSuggestions({ data }: StrategicSuggestionsProps) {
  return (
    <div className="card-glow rounded-2xl bg-cc-forest/50 border border-cc-green/15 p-6">
      <div className="flex items-center justify-between mb-5">
        <h3 className="text-lg font-semibold text-cc-cream flex items-center gap-2">
          <Compass className="w-5 h-5 text-cc-sage" />
          Strategic Growth Suggestions
        </h3>
        <span className="text-xs text-cc-sage/50 uppercase tracking-wider">
          Long-term
        </span>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
        {data.map((suggestion, i) => (
          <div
            key={i}
            className="group bg-cc-dark/30 rounded-xl p-4 border border-cc-green/10 hover:border-cc-sage/25 transition-colors cursor-default"
          >
            <div className="flex items-start gap-3">
              <div className="w-6 h-6 rounded-full bg-cc-sage/15 flex items-center justify-center shrink-0 mt-0.5">
                <span className="text-xs font-semibold text-cc-sage">
                  {i + 1}
                </span>
              </div>
              <p className="text-sm text-cc-cream/80 leading-relaxed">
                {suggestion}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
