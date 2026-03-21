import { useEffect, useState } from 'react';
import Header from './components/Header';
import Overview from './components/Overview';
import Revenue from './components/Revenue';
import LeadPipeline from './components/LeadPipeline';
import ContentEngine from './components/ContentEngine';
import AuthorityGrowth from './components/AuthorityGrowth';
import Opportunities from './components/Opportunities';
import RecommendedActions from './components/RecommendedActions';
import StrategicSuggestions from './components/StrategicSuggestions';

export interface DashboardData {
  lastUpdated: string;
  overview: {
    date: string;
    healthSummary: string;
    healthRating: string;
  };
  revenue: {
    revenueThisMonth: number;
    projectedMonthly: number;
    pipelineRevenue: number;
    invoicesUnpaid: number;
    invoicesUnpaidAmount: number;
    paymentsReceivedThisWeek: number;
    newContractsSigned: number;
    monthlyGoal: number;
    revenueLastMonth: number;
    weeklyTrend: { week: string; amount: number }[];
  };
  leadPipeline: {
    newLeadsToday: number;
    highScoreLeads: number;
    brandAuditsCreated: number;
    outreachEmailsSent: number;
    repliesReceived: number;
    warmLeadsDetected: number;
    pipelineHealth: string;
    topLeads: { name: string; location: string; score: number; reason: string }[];
  };
  contentEngine: {
    blogsScheduled: number;
    blogsPublishedThisWeek: number;
    blogTrafficSpikes: number;
    caseStudiesPublished: number;
    seoOpportunities: number;
    upcomingDeadlines: number;
    topPerformingBlog: { title: string; views: number; trend: string };
    contentCalendar: { date: string; title: string; status: string }[];
  };
  authorityGrowth: {
    linkedinPostsThisWeek: number;
    linkedinEngagement: number;
    youtubeVideosPublished: number;
    youtubeSubscriberGrowth: number;
    newsletterScheduled: boolean;
    newsletterSubscribers: number;
    contentMomentum: string;
    linkedinTrend: { day: string; impressions: number }[];
  };
  opportunities: {
    type: string;
    title: string;
    description: string;
    priority: string;
  }[];
  recommendedActions: {
    action: string;
    category: string;
    impact: string;
    timeEstimate: string;
  }[];
  strategicSuggestions: string[];
}

export default function App() {
  const [data, setData] = useState<DashboardData | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch('/data.json')
      .then((res) => res.json())
      .then((d) => {
        setData(d);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-cc-dark">
        <div className="text-center">
          <div className="w-12 h-12 border-2 border-cc-sage border-t-transparent rounded-full animate-spin mx-auto mb-4" />
          <p className="text-cc-sage/70 text-sm tracking-wider uppercase">Loading Daily Brief...</p>
        </div>
      </div>
    );
  }

  if (!data) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-cc-dark">
        <p className="text-cc-cream/50">Unable to load dashboard data.</p>
      </div>
    );
  }

  return (
    <main className="min-h-screen bg-cc-dark pb-16">
      <Header lastUpdated={data.lastUpdated} />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
        <div className="animate-fade-in animate-delay-1">
          <Overview data={data.overview} />
        </div>

        <div className="animate-fade-in animate-delay-2">
          <Revenue data={data.revenue} />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div className="animate-fade-in animate-delay-3">
            <LeadPipeline data={data.leadPipeline} />
          </div>
          <div className="animate-fade-in animate-delay-4">
            <ContentEngine data={data.contentEngine} />
          </div>
        </div>

        <div className="animate-fade-in animate-delay-5">
          <AuthorityGrowth data={data.authorityGrowth} />
        </div>

        <div className="animate-fade-in animate-delay-6">
          <Opportunities data={data.opportunities} />
        </div>

        <div className="animate-fade-in animate-delay-7">
          <RecommendedActions data={data.recommendedActions} />
        </div>

        <div className="animate-fade-in animate-delay-8">
          <StrategicSuggestions data={data.strategicSuggestions} />
        </div>
      </div>

      <footer className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-12 pt-6 border-t border-cc-green/20">
        <p className="text-center text-cc-cream/30 text-xs tracking-wider">
          CONSTANT CREATES DAILY BRIEF — BUILT FOR FOUNDERS WHO MOVE FAST
        </p>
      </footer>
    </main>
  );
}
