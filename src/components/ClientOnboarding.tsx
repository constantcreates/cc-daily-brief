import { useState } from 'react';
import {
  Rocket,
  CheckCircle2,
  Clock,
  AlertCircle,
  ChevronDown,
  ChevronRight,
  Users,
  Zap,
  Timer,
  User,
  Bot,
  UserCheck,
} from 'lucide-react';

// ── Types ──────────────────────────────────────────────────────
export interface OnboardingStep {
  order: number;
  step: string;
  phase: string;
  status: string;
  owner: string;
  timeEstimate?: string;
}

export interface OnboardingClient {
  name: string;
  business: string;
  package: string;
  startDate: string;
  currentPhase: string;
  overallProgress: number;
  steps: OnboardingStep[];
  waitingOnClient: string[];
  nextAction: string;
  nextActionOwner: string;
}

export interface OnboardingStats {
  activeOnboardings: number;
  completedThisMonth: number;
  avgDaysToComplete: number;
  bottleneckPhase: string;
  clientsWaiting: number;
}

export interface OnboardingData {
  stats: OnboardingStats;
  activeClients: OnboardingClient[];
}

// ── Constants ──────────────────────────────────────────────────
const PHASES = [
  'Pre-Sale',
  'Contract & Payment',
  'Welcome',
  'Brand Discovery',
  'Asset Collection',
  'Project Setup',
  'Design Phase',
  'Revisions',
  'Launch',
  'Handoff',
  'Post-Launch',
];

const PHASE_COLORS: Record<string, string> = {
  'Pre-Sale': 'bg-blue-400',
  'Contract & Payment': 'bg-purple-400',
  'Welcome': 'bg-emerald-400',
  'Brand Discovery': 'bg-amber-400',
  'Asset Collection': 'bg-orange-400',
  'Project Setup': 'bg-cyan-400',
  'Design Phase': 'bg-pink-400',
  'Revisions': 'bg-rose-400',
  'Launch': 'bg-cc-sage',
  'Handoff': 'bg-teal-400',
  'Post-Launch': 'bg-lime-400',
};

const OWNER_ICONS: Record<string, any> = {
  Faye: User,
  Client: UserCheck,
  Automated: Bot,
  Both: Users,
};

// ── Stat Card ──────────────────────────────────────────────────
function StatCard({
  icon: Icon,
  label,
  value,
  sub,
  accent,
}: {
  icon: any;
  label: string;
  value: string | number;
  sub?: string;
  accent?: boolean;
}) {
  return (
    <div className="bg-cc-dark/40 rounded-xl p-4 border border-cc-green/10">
      <div className="flex items-center gap-2 mb-2">
        <Icon className={`w-4 h-4 ${accent ? 'text-cc-sage' : 'text-cc-sage/60'}`} />
        <span className="text-xs text-cc-cream/50 uppercase tracking-wider">{label}</span>
      </div>
      <p className={`text-xl font-semibold ${accent ? 'text-cc-sage' : 'text-cc-cream'}`}>{value}</p>
      {sub && <p className="text-xs text-cc-sage/60 mt-1">{sub}</p>}
    </div>
  );
}

// ── Phase Progress Bar ─────────────────────────────────────────
function PhaseProgressBar({ steps, currentPhase }: { steps: OnboardingStep[]; currentPhase: string }) {
  const currentPhaseIndex = PHASES.indexOf(currentPhase);

  return (
    <div className="flex items-center gap-0.5 w-full">
      {PHASES.map((phase, i) => {
        const phaseSteps = steps.filter((s) => s.phase === phase);
        const completedSteps = phaseSteps.filter((s) => s.status === 'Completed').length;
        const totalSteps = phaseSteps.length;
        const phasePct = totalSteps > 0 ? (completedSteps / totalSteps) * 100 : 0;

        const isActive = i === currentPhaseIndex;
        const isPast = i < currentPhaseIndex;
        const isFuture = i > currentPhaseIndex;

        return (
          <div key={phase} className="flex-1 group relative">
            <div
              className={`h-2 rounded-full transition-all duration-300 ${
                isPast
                  ? 'bg-cc-sage'
                  : isActive
                  ? 'bg-cc-sage/40'
                  : 'bg-cc-dark/60'
              }`}
            >
              {isActive && (
                <div
                  className="h-full bg-cc-sage rounded-full transition-all duration-500"
                  style={{ width: `${phasePct}%` }}
                />
              )}
            </div>
            {/* Tooltip on hover */}
            <div className="absolute -top-8 left-1/2 -translate-x-1/2 hidden group-hover:block z-10">
              <div className="bg-cc-forest border border-cc-green/30 rounded px-2 py-1 whitespace-nowrap">
                <span className="text-[10px] text-cc-cream">
                  {phase} {isPast ? '✓' : isActive ? `${completedSteps}/${totalSteps}` : '—'}
                </span>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}

// ── Client Card ────────────────────────────────────────────────
function ClientCard({ client }: { client: OnboardingClient }) {
  const [expanded, setExpanded] = useState(false);
  const [selectedPhase, setSelectedPhase] = useState<string | null>(null);

  const completedSteps = client.steps.filter((s) => s.status === 'Completed').length;
  const totalSteps = client.steps.length;
  const daysSinceStart = Math.floor(
    (Date.now() - new Date(client.startDate).getTime()) / (1000 * 60 * 60 * 24)
  );

  const displayPhases = selectedPhase
    ? [selectedPhase]
    : PHASES.filter((p) => client.steps.some((s) => s.phase === p));

  return (
    <div className="card-glow rounded-2xl bg-cc-forest/50 border border-cc-green/15 overflow-hidden">
      {/* Client Header */}
      <div
        className="p-5 cursor-pointer hover:bg-cc-green/5 transition-colors"
        onClick={() => setExpanded(!expanded)}
      >
        <div className="flex items-start justify-between mb-3">
          <div className="flex-1">
            <div className="flex items-center gap-3 mb-1">
              <h4 className="text-base font-semibold text-cc-cream">{client.business}</h4>
              <span className="text-xs px-2 py-0.5 rounded-full bg-cc-sage/15 text-cc-sage font-medium">
                {client.package}
              </span>
            </div>
            <p className="text-xs text-cc-cream/40">{client.name} · Started {new Date(client.startDate).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}</p>
          </div>
          <div className="flex items-center gap-3">
            <div className="text-right">
              <p className="text-lg font-semibold text-cc-sage">{client.overallProgress}%</p>
              <p className="text-[10px] text-cc-cream/40">{completedSteps}/{totalSteps} steps</p>
            </div>
            {expanded ? (
              <ChevronDown className="w-4 h-4 text-cc-cream/40" />
            ) : (
              <ChevronRight className="w-4 h-4 text-cc-cream/40" />
            )}
          </div>
        </div>

        {/* Phase progress bar */}
        <PhaseProgressBar steps={client.steps} currentPhase={client.currentPhase} />
        <div className="flex justify-between mt-1.5">
          <span className="text-[10px] text-cc-cream/30">Pre-Sale</span>
          <span className="text-[10px] text-cc-sage/70 font-medium">{client.currentPhase}</span>
          <span className="text-[10px] text-cc-cream/30">Post-Launch</span>
        </div>

        {/* Status row */}
        <div className="flex items-center gap-4 mt-3 text-xs">
          {client.waitingOnClient.length > 0 && (
            <span className="flex items-center gap-1 text-amber-400/80">
              <AlertCircle className="w-3 h-3" />
              {client.waitingOnClient.length} waiting on client
            </span>
          )}
          <span className="flex items-center gap-1 text-cc-cream/50">
            <Timer className="w-3 h-3" />
            Day {daysSinceStart > 0 ? daysSinceStart : 1}
          </span>
          <span className="flex items-center gap-1 text-cc-sage/70">
            <Zap className="w-3 h-3" />
            Next: {client.nextAction}
          </span>
        </div>
      </div>

      {/* Expanded Detail */}
      {expanded && (
        <div className="border-t border-cc-green/10 bg-cc-dark/20">
          {/* Phase filter pills */}
          <div className="px-5 pt-4 pb-2 flex flex-wrap gap-1.5">
            <button
              onClick={() => setSelectedPhase(null)}
              className={`text-[10px] px-2.5 py-1 rounded-full border transition-colors ${
                !selectedPhase
                  ? 'bg-cc-sage/20 border-cc-sage/40 text-cc-sage'
                  : 'border-cc-green/20 text-cc-cream/40 hover:text-cc-cream/60'
              }`}
            >
              All Phases
            </button>
            {PHASES.filter((p) => client.steps.some((s) => s.phase === p)).map((phase) => {
              const phaseSteps = client.steps.filter((s) => s.phase === phase);
              const done = phaseSteps.filter((s) => s.status === 'Completed').length;
              return (
                <button
                  key={phase}
                  onClick={() => setSelectedPhase(selectedPhase === phase ? null : phase)}
                  className={`text-[10px] px-2.5 py-1 rounded-full border transition-colors ${
                    selectedPhase === phase
                      ? 'bg-cc-sage/20 border-cc-sage/40 text-cc-sage'
                      : 'border-cc-green/20 text-cc-cream/40 hover:text-cc-cream/60'
                  }`}
                >
                  {phase} ({done}/{phaseSteps.length})
                </button>
              );
            })}
          </div>

          {/* Steps list */}
          <div className="px-5 pb-5 space-y-1">
            {displayPhases.map((phase) => (
              <div key={phase}>
                <p className="text-[10px] text-cc-sage/50 uppercase tracking-wider mt-3 mb-1.5 flex items-center gap-2">
                  <span className={`w-2 h-2 rounded-full ${PHASE_COLORS[phase] || 'bg-cc-sage'}`} />
                  {phase}
                </p>
                {client.steps
                  .filter((s) => s.phase === phase)
                  .map((step) => {
                    const OwnerIcon = OWNER_ICONS[step.owner] || User;
                    const isCompleted = step.status === 'Completed';
                    const isWaiting = step.status === 'Waiting on Client';
                    const isInProgress = step.status === 'In Progress';

                    return (
                      <div
                        key={step.order}
                        className={`flex items-center gap-3 py-2 px-3 rounded-lg transition-colors ${
                          isCompleted
                            ? 'bg-cc-sage/5'
                            : isInProgress
                            ? 'bg-cc-sage/10 border border-cc-sage/20'
                            : isWaiting
                            ? 'bg-amber-400/5 border border-amber-400/15'
                            : 'bg-transparent'
                        }`}
                      >
                        {isCompleted ? (
                          <CheckCircle2 className="w-4 h-4 text-cc-sage shrink-0" />
                        ) : isWaiting ? (
                          <AlertCircle className="w-4 h-4 text-amber-400/70 shrink-0" />
                        ) : isInProgress ? (
                          <div className="w-4 h-4 rounded-full border-2 border-cc-sage border-t-transparent animate-spin shrink-0" />
                        ) : (
                          <div className="w-4 h-4 rounded-full border border-cc-green/30 shrink-0" />
                        )}
                        <span
                          className={`text-xs flex-1 ${
                            isCompleted
                              ? 'text-cc-cream/40 line-through'
                              : isInProgress
                              ? 'text-cc-cream font-medium'
                              : isWaiting
                              ? 'text-amber-400/80'
                              : 'text-cc-cream/50'
                          }`}
                        >
                          {step.step}
                        </span>
                        <div className="flex items-center gap-2">
                          {step.timeEstimate && (
                            <span className="text-[10px] text-cc-cream/25">{step.timeEstimate}</span>
                          )}
                          <OwnerIcon className="w-3 h-3 text-cc-cream/25" />
                        </div>
                      </div>
                    );
                  })}
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

// ── Main Component ─────────────────────────────────────────────
export default function ClientOnboarding({ data }: { data: OnboardingData }) {
  if (!data || !data.activeClients || data.activeClients.length === 0) {
    return (
      <div className="space-y-6">
        <div className="card-glow rounded-2xl bg-cc-forest/50 border border-cc-green/15 p-8 text-center">
          <Rocket className="w-10 h-10 text-cc-sage/40 mx-auto mb-3" />
          <h3 className="text-lg font-semibold text-cc-cream mb-1">No Active Onboardings</h3>
          <p className="text-sm text-cc-cream/40">
            When a new client signs, their onboarding progress will appear here.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Stats row */}
      <div className="animate-fade-in animate-delay-1">
        <div className="card-glow rounded-2xl bg-cc-forest/50 border border-cc-green/15 p-6">
          <div className="flex items-center justify-between mb-5">
            <h3 className="text-lg font-semibold text-cc-cream flex items-center gap-2">
              <Rocket className="w-5 h-5 text-cc-sage" />
              Client Onboarding
            </h3>
            <span className="text-xs text-cc-sage/50 uppercase tracking-wider">
              {data.activeClients.length} active
            </span>
          </div>

          <div className="grid grid-cols-2 lg:grid-cols-5 gap-3">
            <StatCard
              icon={Users}
              label="Active"
              value={data.stats.activeOnboardings}
              sub="Onboarding now"
              accent
            />
            <StatCard
              icon={CheckCircle2}
              label="Completed"
              value={data.stats.completedThisMonth}
              sub="This month"
            />
            <StatCard
              icon={Timer}
              label="Avg Days"
              value={data.stats.avgDaysToComplete}
              sub="To complete"
            />
            <StatCard
              icon={AlertCircle}
              label="Bottleneck"
              value={data.stats.bottleneckPhase}
            />
            <StatCard
              icon={Clock}
              label="Waiting"
              value={data.stats.clientsWaiting}
              sub="On client action"
            />
          </div>
        </div>
      </div>

      {/* Client cards */}
      {data.activeClients.map((client, i) => (
        <div key={client.name} className={`animate-fade-in animate-delay-${Math.min(i + 2, 8)}`}>
          <ClientCard client={client} />
        </div>
      ))}

      {/* Legend */}
      <div className="animate-fade-in animate-delay-8">
        <div className="flex flex-wrap items-center justify-center gap-4 text-[10px] text-cc-cream/30 py-2">
          <span className="flex items-center gap-1">
            <User className="w-3 h-3" /> Faye
          </span>
          <span className="flex items-center gap-1">
            <UserCheck className="w-3 h-3" /> Client
          </span>
          <span className="flex items-center gap-1">
            <Bot className="w-3 h-3" /> Automated
          </span>
          <span className="flex items-center gap-1">
            <Users className="w-3 h-3" /> Both
          </span>
          <span className="mx-2">|</span>
          <span className="flex items-center gap-1">
            <CheckCircle2 className="w-3 h-3 text-cc-sage" /> Done
          </span>
          <span className="flex items-center gap-1">
            <div className="w-3 h-3 rounded-full border-2 border-cc-sage border-t-transparent" /> In Progress
          </span>
          <span className="flex items-center gap-1">
            <AlertCircle className="w-3 h-3 text-amber-400/70" /> Waiting
          </span>
          <span className="flex items-center gap-1">
            <div className="w-3 h-3 rounded-full border border-cc-green/30" /> Not Started
          </span>
        </div>
      </div>
    </div>
  );
}
