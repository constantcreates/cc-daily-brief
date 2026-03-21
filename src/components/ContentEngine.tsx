

import { FileText, Calendar, TrendingUp, Search, BookOpen, Clock } from 'lucide-react';

interface ContentEngineProps {
  data: {
    blogsScheduled: number;
    blogsPublishedThisWeek: number;
    blogTrafficSpikes: number;
    caseStudiesPublished: number;
    seoOpportunities: number;
    upcomingDeadlines: number;
    topPerformingBlog: { title: string; views: number; trend: string };
    contentCalendar: { date: string; title: string; status: string }[];
  };
}

export default function ContentEngine({ data }: ContentEngineProps) {
  const statusColors: Record<string, string> = {
    draft: 'bg-yellow-400/15 text-yellow-400',
    scheduled: 'bg-cc-sage/15 text-cc-sage',
    idea: 'bg-blue-400/15 text-blue-400',
    published: 'bg-green-400/15 text-green-400',
  };

  return (
    <div className="card-glow rounded-2xl bg-cc-forest/50 border border-cc-green/15 p-6 h-full">
      <div className="flex items-center justify-between mb-5">
        <h3 className="text-lg font-semibold text-cc-cream flex items-center gap-2">
          <FileText className="w-5 h-5 text-cc-sage" />
          Content Engine
        </h3>
      </div>

      <div className="grid grid-cols-3 gap-3 mb-5">
        <div className="text-center p-3 bg-cc-dark/40 rounded-lg border border-cc-green/10">
          <Calendar className="w-4 h-4 text-cc-sage/60 mx-auto mb-1" />
          <p className="text-lg font-semibold text-cc-cream">{data.blogsScheduled}</p>
          <p className="text-[10px] text-cc-cream/40 uppercase">Scheduled</p>
        </div>
        <div className="text-center p-3 bg-cc-dark/40 rounded-lg border border-cc-green/10">
          <BookOpen className="w-4 h-4 text-cc-sage/60 mx-auto mb-1" />
          <p className="text-lg font-semibold text-cc-cream">{data.blogsPublishedThisWeek}</p>
          <p className="text-[10px] text-cc-cream/40 uppercase">Published</p>
        </div>
        <div className="text-center p-3 bg-cc-dark/40 rounded-lg border border-cc-green/10">
          <Search className="w-4 h-4 text-cc-sage/60 mx-auto mb-1" />
          <p className="text-lg font-semibold text-cc-cream">{data.seoOpportunities}</p>
          <p className="text-[10px] text-cc-cream/40 uppercase">SEO Ops</p>
        </div>
      </div>

      <div className="flex gap-4 text-xs text-cc-cream/50 mb-5 px-1">
        <span className="flex items-center gap-1">
          <TrendingUp className="w-3 h-3" /> {data.blogTrafficSpikes} traffic spike{data.blogTrafficSpikes !== 1 ? 's' : ''}
        </span>
        <span>{data.caseStudiesPublished} case stud{data.caseStudiesPublished !== 1 ? 'ies' : 'y'}</span>
        <span className="flex items-center gap-1">
          <Clock className="w-3 h-3" /> {data.upcomingDeadlines} deadlines
        </span>
      </div>

      {/* Top performing blog */}
      <div className="bg-cc-dark/30 rounded-lg p-3 border border-cc-green/10 mb-4">
        <p className="text-xs text-cc-sage/60 uppercase tracking-wider mb-1">
          Top Performing
        </p>
        <p className="text-sm font-medium text-cc-cream leading-snug">
          {data.topPerformingBlog.title}
        </p>
        <div className="flex items-center gap-2 mt-1">
          <span className="text-xs text-cc-sage">{data.topPerformingBlog.views} views</span>
          {data.topPerformingBlog.trend === 'up' && (
            <TrendingUp className="w-3 h-3 text-cc-sage" />
          )}
        </div>
      </div>

      {/* Content calendar */}
      <div className="space-y-2">
        <p className="text-xs text-cc-sage/60 uppercase tracking-wider">
          Upcoming Content
        </p>
        {data.contentCalendar.map((item, i) => (
          <div
            key={i}
            className="flex items-center justify-between bg-cc-dark/20 rounded-lg px-3 py-2"
          >
            <div className="flex-1 min-w-0">
              <p className="text-xs font-medium text-cc-cream truncate">
                {item.title}
              </p>
              <p className="text-[10px] text-cc-cream/40">
                {new Date(item.date + 'T12:00:00').toLocaleDateString('en-US', {
                  month: 'short',
                  day: 'numeric',
                })}
              </p>
            </div>
            <span
              className={`text-[10px] font-medium capitalize px-2 py-0.5 rounded-full shrink-0 ml-2 ${
                statusColors[item.status] || 'bg-cc-cream/10 text-cc-cream/50'
              }`}
            >
              {item.status}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}
