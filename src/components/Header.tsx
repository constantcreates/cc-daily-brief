

import { Zap } from 'lucide-react';

interface HeaderProps {
  lastUpdated: string;
}

export default function Header({ lastUpdated }: HeaderProps) {
  const updatedDate = new Date(lastUpdated);
  const timeStr = updatedDate.toLocaleTimeString('en-US', {
    hour: 'numeric',
    minute: '2-digit',
    hour12: true,
  });

  return (
    <header className="border-b border-cc-green/20 bg-cc-dark/80 backdrop-blur-md sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-lg bg-cc-sage/20 flex items-center justify-center">
              <Zap className="w-5 h-5 text-cc-sage" />
            </div>
            <div>
              <h1 className="text-lg font-semibold text-cc-cream tracking-tight">
                Constant Creates
              </h1>
              <p className="text-xs text-cc-sage/70 tracking-wider uppercase">
                Daily Brief
              </p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <div className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-cc-green/15 border border-cc-green/20">
              <span className="w-2 h-2 rounded-full bg-cc-sage pulse-dot" />
              <span className="text-xs text-cc-sage/80">
                Updated {timeStr}
              </span>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}
