

import {
  DollarSign,
  TrendingUp,
  FileText,
  CreditCard,
  PenTool,
  Target,
} from 'lucide-react';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  ResponsiveContainer,
  Tooltip,
  Cell,
} from 'recharts';

interface RevenueProps {
  data: {
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
}

function MetricCard({
  icon: Icon,
  label,
  value,
  sub,
}: {
  icon: any;
  label: string;
  value: string;
  sub?: string;
}) {
  return (
    <div className="bg-cc-dark/40 rounded-xl p-4 border border-cc-green/10">
      <div className="flex items-center gap-2 mb-2">
        <Icon className="w-4 h-4 text-cc-sage/60" />
        <span className="text-xs text-cc-cream/50 uppercase tracking-wider">
          {label}
        </span>
      </div>
      <p className="text-xl font-semibold text-cc-cream">{value}</p>
      {sub && <p className="text-xs text-cc-sage/60 mt-1">{sub}</p>}
    </div>
  );
}

export default function Revenue({ data }: RevenueProps) {
  const progressPct = Math.min(
    (data.revenueThisMonth / data.monthlyGoal) * 100,
    100
  );
  const vsLastMonth =
    data.revenueLastMonth > 0
      ? ((data.revenueThisMonth - data.revenueLastMonth) /
          data.revenueLastMonth) *
        100
      : 0;

  return (
    <div className="card-glow rounded-2xl bg-cc-forest/50 border border-cc-green/15 p-6">
      <div className="flex items-center justify-between mb-5">
        <h3 className="text-lg font-semibold text-cc-cream flex items-center gap-2">
          <DollarSign className="w-5 h-5 text-cc-sage" />
          Revenue Overview
        </h3>
        <span className="text-xs text-cc-sage/50 uppercase tracking-wider">
          March 2026
        </span>
      </div>

      {/* Progress bar */}
      <div className="mb-6">
        <div className="flex justify-between text-sm mb-2">
          <span className="text-cc-cream/70">
            ${data.revenueThisMonth.toLocaleString()} of $
            {data.monthlyGoal.toLocaleString()} goal
          </span>
          <span className="text-cc-sage font-medium">
            {progressPct.toFixed(0)}%
          </span>
        </div>
        <div className="h-2 bg-cc-dark/60 rounded-full overflow-hidden">
          <div
            className="h-full bg-gradient-to-r from-cc-green to-cc-sage rounded-full transition-all duration-1000"
            style={{ width: `${progressPct}%` }}
          />
        </div>
        <div className="flex justify-between text-xs text-cc-cream/40 mt-1">
          <span>
            {vsLastMonth >= 0 ? '↑' : '↓'} {Math.abs(vsLastMonth).toFixed(0)}%
            vs last month
          </span>
          <span>
            Projected: ${data.projectedMonthly.toLocaleString()}
          </span>
        </div>
      </div>

      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 mb-6">
        <MetricCard
          icon={TrendingUp}
          label="Pipeline"
          value={`$${data.pipelineRevenue.toLocaleString()}`}
          sub="Active opportunities"
        />
        <MetricCard
          icon={FileText}
          label="Unpaid"
          value={`$${data.invoicesUnpaidAmount.toLocaleString()}`}
          sub={`${data.invoicesUnpaid} invoices`}
        />
        <MetricCard
          icon={CreditCard}
          label="This Week"
          value={`$${data.paymentsReceivedThisWeek.toLocaleString()}`}
          sub="Payments received"
        />
        <MetricCard
          icon={PenTool}
          label="Contracts"
          value={`${data.newContractsSigned}`}
          sub="Signed this month"
        />
      </div>

      {/* Weekly trend chart */}
      <div className="bg-cc-dark/30 rounded-xl p-4 border border-cc-green/10">
        <p className="text-xs text-cc-cream/50 uppercase tracking-wider mb-3">
          Weekly Revenue Trend
        </p>
        <div className="h-32">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={data.weeklyTrend}>
              <XAxis
                dataKey="week"
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
                formatter={(value: number) => [`$${value.toLocaleString()}`, 'Revenue']}
              />
              <Bar dataKey="amount" radius={[6, 6, 0, 0]}>
                {data.weeklyTrend.map((entry, index) => (
                  <Cell
                    key={`cell-${index}`}
                    fill={entry.amount > 0 ? '#BCCB96' : '#697A6240'}
                  />
                ))}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
}
