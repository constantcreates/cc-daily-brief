

import { Users, UserPlus, Mail, MessageCircle, Star, Shield } from 'lucide-react';

interface LeadPipelineProps {
  data: {
    newLeadsToday: number;
    highScoreLeads: number;
    brandAuditsCreated: number;
    outreachEmailsSent: number;
    repliesReceived: number;
    warmLeadsDetected: number;
    pipelineHealth: string;
    topLeads: { name: string; location: string; score: number; reason: string }[];
  };
}

export default function LeadPipeline({ data }: LeadPipelineProps) {
  const healthColor =
    data.pipelineHealth === 'strong'
      ? 'text-cc-sage bg-cc-sage/15'
      : data.pipelineHealth === 'moderate'
      ? 'text-yellow-400 bg-yellow-400/15'
      : 'text-orange-400 bg-orange-400/15';

  return (
    <div className="card-glow rounded-2xl bg-cc-forest/50 border border-cc-green/15 p-6 h-full">
      <div className="flex items-center justify-between mb-5">
        <h3 className="text-lg font-semibold text-cc-cream flex items-center gap-2">
          <Users className="w-5 h-5 text-cc-sage" />
          Lead Pipeline
        </h3>
        <span className={`text-xs font-medium capitalize px-3 py-1 rounded-full ${healthColor}`}>
          {data.pipelineHealth}
        </span>
      </div>

      <div className="grid grid-cols-3 gap-3 mb-5">
        <div className="text-center p-3 bg-cc-dark/40 rounded-lg border border-cc-green/10">
          <UserPlus className="w-4 h-4 text-cc-sage/60 mx-auto mb-1" />
          <p className="text-lg font-semibold text-cc-cream">{data.newLeadsToday}</p>
          <p className="text-[10px] text-cc-cream/40 uppercase">New Today</p>
        </div>
        <div className="text-center p-3 bg-cc-dark/40 rounded-lg border border-cc-green/10">
          <Star className="w-4 h-4 text-cc-sage/60 mx-auto mb-1" />
          <p className="text-lg font-semibold text-cc-cream">{data.highScoreLeads}</p>
          <p className="text-[10px] text-cc-cream/40 uppercase">High Score</p>
        </div>
        <div className="text-center p-3 bg-cc-dark/40 rounded-lg border border-cc-green/10">
          <Shield className="w-4 h-4 text-cc-sage/60 mx-auto mb-1" />
          <p className="text-lg font-semibold text-cc-cream">{data.brandAuditsCreated}</p>
          <p className="text-[10px] text-cc-cream/40 uppercase">Audits</p>
        </div>
      </div>

      <div className="flex gap-4 text-xs text-cc-cream/50 mb-5 px-1">
        <span className="flex items-center gap-1">
          <Mail className="w-3 h-3" /> {data.outreachEmailsSent} sent
        </span>
        <span className="flex items-center gap-1">
          <MessageCircle className="w-3 h-3" /> {data.repliesReceived} replies
        </span>
        <span>{data.warmLeadsDetected} warm</span>
      </div>

      <div className="space-y-3">
        <p className="text-xs text-cc-sage/60 uppercase tracking-wider">
          Top Leads
        </p>
        {data.topLeads.map((lead, i) => (
          <div
            key={i}
            className="bg-cc-dark/30 rounded-lg p-3 border border-cc-green/10"
          >
            <div className="flex items-start justify-between mb-1">
              <div>
                <p className="text-sm font-medium text-cc-cream">{lead.name}</p>
                <p className="text-xs text-cc-cream/40">{lead.location}</p>
              </div>
              <div className="flex items-center gap-1 px-2 py-0.5 rounded-full bg-cc-sage/15">
                <span className="text-xs font-semibold text-cc-sage">{lead.score}</span>
              </div>
            </div>
            <p className="text-xs text-cc-cream/50 mt-1">{lead.reason}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
