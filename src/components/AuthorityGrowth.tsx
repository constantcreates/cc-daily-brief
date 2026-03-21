

import { Award, Linkedin, Youtube, Mail, Users, TrendingUp } from 'lucide-react';
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  ResponsiveContainer,
  Tooltip,
} from 'recharts';

interface AuthorityGrowthProps {
  data: {
    linkedinPostsThisWeek: number;
    linkedinEngagement: number;
    youtubeVideosPublished: number;
    youtubeSubscriberGrowth: number;
    newsletterScheduled: boolean;
    newsletterSubscribers: number;
    contentMomentum: string;
    linkedinTrend: { day: string; impressions: number }[];
  };
}

export default function AuthorityGrowth({ data }: AuthorityGrowthProps) {
  const momentumColor =
    data.contentMomentum === 'high'
      ? 'text-cc-sage bg-cc-sage/15'
      : data.contentMomentum === 'steady'
      ? 'text-blue-400 bg-blue-400/15'
      : 'text-orange-400 bg-orange-400/15';

  const momentumLabel =
    data.contentMomentum === 'high'
      ? 'High Momentum'
      : data.contentMomentum === 'steady'
      ? 'Steady Growth'
      : 'Needs Attention';

  return (
    <div className="card-glow rounded-2xl bg-cc-forest/50 border border-cc-green/15 p-6">
      <div className="flex items-center justify-between mb-5">
        <h3 className="text-lg font-semibold text-cc-cream flex items-center gap-2">
          <Award className="w-5 h-5 text-cc-sage" />
          Authority & Audience Growth
        </h3>
        <span className={`text-xs font-medium px-3 py-1 rounded-full ${momentumColor}`}>
          {momentumLabel}
        </span>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-5 gap-3 mb-6">
        <div className="bg-cc-dark/40 rounded-xl p-4 border border-cc-green/10">
          <div className="flex items-center gap-2 mb-2">
            <Linkedin className="w-4 h-4 text-cc-sage/60" />
            <span className="text-xs text-cc-cream/50 uppercase">Posts</span>
          </div>
          <p className="text-xl font-semibold text-cc-cream">
            {data.linkedinPostsThisWeek}
          </p>
          <p className="text-xs text-cc-sage/60 mt-1">This week</p>
        </div>

        <div className="bg-cc-dark/40 rounded-xl p-4 border border-cc-green/10">
          <div className="flex items-center gap-2 mb-2">
            <TrendingUp className="w-4 h-4 text-cc-sage/60" />
            <span className="text-xs text-cc-cream/50 uppercase">Engage</span>
          </div>
          <p className="text-xl font-semibold text-cc-cream">
            {data.linkedinEngagement}
          </p>
          <p className="text-xs text-cc-sage/60 mt-1">Interactions</p>
        </div>

        <div className="bg-cc-dark/40 rounded-xl p-4 border border-cc-green/10">
          <div className="flex items-center gap-2 mb-2">
            <Youtube className="w-4 h-4 text-cc-sage/60" />
            <span className="text-xs text-cc-cream/50 uppercase">Videos</span>
          </div>
          <p className="text-xl font-semibold text-cc-cream">
            {data.youtubeVideosPublished}
          </p>
          <p className="text-xs text-cc-sage/60 mt-1">
            +{data.youtubeSubscriberGrowth} subs
          </p>
        </div>

        <div className="bg-cc-dark/40 rounded-xl p-4 border border-cc-green/10">
          <div className="flex items-center gap-2 mb-2">
            <Mail className="w-4 h-4 text-cc-sage/60" />
            <span className="text-xs text-cc-cream/50 uppercase">Newsletter</span>
          </div>
          <p className="text-xl font-semibold text-cc-cream">
            {data.newsletterScheduled ? 'Ready' : 'None'}
          </p>
          <p className="text-xs text-cc-sage/60 mt-1">
            {data.newsletterScheduled ? 'Scheduled' : 'Not scheduled'}
          </p>
        </div>

        <div className="bg-cc-dark/40 rounded-xl p-4 border border-cc-green/10">
          <div className="flex items-center gap-2 mb-2">
            <Users className="w-4 h-4 text-cc-sage/60" />
            <span className="text-xs text-cc-cream/50 uppercase">Subs</span>
          </div>
          <p className="text-xl font-semibold text-cc-cream">
            {data.newsletterSubscribers}
          </p>
          <p className="text-xs text-cc-sage/60 mt-1">Newsletter list</p>
        </div>
      </div>

      {/* LinkedIn impressions chart */}
      <div className="bg-cc-dark/30 rounded-xl p-4 border border-cc-green/10">
        <p className="text-xs text-cc-cream/50 uppercase tracking-wider mb-3">
          LinkedIn Impressions This Week
        </p>
        <div className="h-28">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={data.linkedinTrend}>
              <defs>
                <linearGradient id="sageGradient" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#BCCB96" stopOpacity={0.3} />
                  <stop offset="95%" stopColor="#BCCB96" stopOpacity={0} />
                </linearGradient>
              </defs>
              <XAxis
                dataKey="day"
                tick={{ fill: '#F5F3E180', fontSize: 11 }}
                axisLine={false}
                tickLine={false}
              />
              <YAxis hide />
              <Tooltip
                contentStyle={{
                  backgroundColor: '#3d4f44',
                  border: '1px solid #697A6240',
                  borderRadius: '8px',
                  color: '#F5F3E1',
                  fontSize: '12px',
                }}
              />
              <Area
                type="monotone"
                dataKey="impressions"
                stroke="#BCCB96"
                strokeWidth={2}
                fill="url(#sageGradient)"
              />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
}
