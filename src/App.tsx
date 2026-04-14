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
import ClientOnboarding from './components/ClientOnboarding';
import type { OnboardingData } from './components/ClientOnboarding';

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
  onboarding?: OnboardingData;
}

type TabType = 'brief' | 'onboarding';

export default function App() {
  const [data, setData] = useState<DashboardData | null>(null);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState<TabType>('brief');

  useEffect(() => {
    fetch('/data.json')
      .then((res) => res.json())
      .then((d: any) => {
        // Normalize data — handle both old format and new DashboardData format
        const normalized: DashboardData = {
          lastUpdated: d.lastUpdated || d.footer?.lastUpdated || new Date().toISOString(),
          overview: d.overview?.date
            ? d.overview
            : {
                date: d.dateKey || new Date().toISOString().split('T')[0],
                healthSummary: typeof d.overview === 'string' ? d.overview.replace(/<[^>]*>/g, '') : d.greeting || '',
                healthRating: d.statusBadge?.includes('Rest') ? 'moderate' : 'strong',
              },
          revenue: d.revenue?.revenueThisMonth !== undefined
            ? d.revenue
            : {
                revenueThisMonth: d.revenue?.collected || 0,
                projectedMonthly: d.revenue?.goal || 0,
                pipelineRevenue: 0,
                invoicesUnpaid: d.revenue?.outstandingInvoices?.length || 0,
                invoicesUnpaidAmount: 0,
                paymentsReceivedThisWeek: 0,
                newContractsSigned: 0,
                monthlyGoal: d.revenue?.goal || 5000,
                revenueLastMonth: 0,
                weeklyTrend: d.revenue?.metrics || [],
              },
          leadPipeline: d.leadPipeline || {
            newLeadsToday: d.leads?.metrics?.[0]?.value || 0,
            highScoreLeads: 0,
            brandAuditsCreated: 0,
            outreachEmailsSent: 0,
            repliesReceived: 0,
            warmLeadsDetected: 0,
            pipelineHealth: 'moderate',
            topLeads: (d.leads?.cards || []).map((c: any) => ({
              name: c.name || '',
              location: c.location || '',
              score: c.score || 0,
              reason: c.reason || c.summary || '',
            })),
          },
          contentEngine: d.contentEngine || {
            blogsScheduled: d.blog?.queued || 0,
            blogsPublishedThisWeek: d.blog?.published || 0,
            blogTrafficSpikes: 0,
            caseStudiesPublished: 0,
            seoOpportunities: 0,
            upcomingDeadlines: 0,
            topPerformingBlog: { title: '', views: 0, trend: '' },
            contentCalendar: [],
          },
          authorityGrowth: d.authorityGrowth || {
            linkedinPostsThisWeek: 0,
            linkedinEngagement: 0,
            youtubeVideosPublished: 0,
            youtubeSubscriberGrowth: 0,
            newsletterScheduled: false,
            newsletterSubscribers: 0,
            contentMomentum: 'moderate',
            linkedinTrend: [],
          },
          opportunities: d.opportunities || [],
          recommendedActions: d.recommendedActions || d.actions || [],
          strategicSuggestions: d.strategicSuggestions || [],
          onboarding: d.onboarding || undefined,
        };
        setData(normalized);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, []);

  // Check URL params for direct client portal access
  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    if (params.get('tab') === 'onboarding' || params.get('client')) {
      setActiveTab('onboarding');
    }
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
      <Header lastUpdated={data.lastUpdated} activeTab={activeTab} onTabChange={setActiveTab} />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6 mt-2">
        {activeTab === 'brief' ? (
          <>
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
          </>
        ) : (
          <ClientOnboarding
            data={
              data.onboarding || {
                stats: {
                  activeOnboardings: 0,
                  completedThisMonth: 0,
                  avgDaysToComplete: 0,
                  bottleneckPhase: '—',
                  clientsWaiting: 0,
                },
                activeClients: [],
              }
            }
          />
        )}
      </div>

      <footer className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-12 pt-6 border-t border-cc-green/20">
        <p className="text-center text-cc-cream/30 text-xs tracking-wider">
          CONSTANT CREATES DAILY BRIEF — BUILT FOR FOUNDERS WHO MOVE FAST
        </p>
      </footer>
    </main>
  );
}
