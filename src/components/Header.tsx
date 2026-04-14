

import { Zap, LayoutDashboard, Rocket } from 'lucide-react';

type TabType = 'brief' | 'onboarding';

interface HeaderProps {
  lastUpdated: string;
  activeTab: TabType;
  onTabChange: (tab: TabType) => void;
}

export default function Header({ lastUpdated, activeTab, onTabChange }: HeaderProps) {
  const updatedDate = new Date(lastUpdated);
  const timeStr = updatedDate.toLocaleTimeString('en-US', {
    hour: 'numeric',
    minute: '2-digit',
    hour12: true,
  });

  return (
    <header className="border-b border-cc-green/20 bg-cc-dark/80 backdrop-blur-md sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between py-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-lg bg-cc-sage/20 flex items-center justify-center">
              <Zap className="w-5 h-5 text-cc-sage" />
            </div>
            <div>
              <h1 className="text-lg font-semibold text-cc-cream tracking-tight">
                Constant Creates
              </h1>
              <p className="text-xs text-cc-sage/70 tracking-wider uppercase">
                {activeTab === 'brief' ? 'Daily Brief' : 'Client Onboarding'}
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

        {/* Tab Navigation */}
        <div className="flex gap-1 -mb-px">
          <button
            onClick={() => onTabChange('brief')}
            className={`flex items-center gap-2 px-4 py-2.5 text-sm font-medium border-b-2 transition-colors ${
              activeTab === 'brief'
                ? 'border-cc-sage text-cc-sage'
                : 'border-transparent text-cc-cream/40 hover:text-cc-cream/60 hover:border-cc-green/30'
            }`}
          >
            <LayoutDashboard className="w-4 h-4" />
            Daily Brief
          </button>
          <button
            onClick={() => onTabChange('onboarding')}
            className={`flex items-center gap-2 px-4 py-2.5 text-sm font-medium border-b-2 transition-colors ${
              activeTab === 'onboarding'
                ? 'border-cc-sage text-cc-sage'
                : 'border-transparent text-cc-cream/40 hover:text-cc-cream/60 hover:border-cc-green/30'
            }`}
          >
            <Rocket className="w-4 h-4" />
            Client Onboarding
          </button>
        </div>
      </div>
    </header>
  );
}
