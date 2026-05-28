import { ArrowUpRight, ArrowDownRight, Sparkles, AlertCircle, CheckCircle, AlertTriangle, Activity } from 'lucide-react';

export function WeeklySummary() {
  // Mock data for weekly trend
  const trendDays = [
    { day: 'Mon', calls: 12, conversions: 4, height: 'h-12' },
    { day: 'Tue', calls: 19, conversions: 6, height: 'h-20' },
    { day: 'Wed', calls: 15, conversions: 5, height: 'h-16' },
    { day: 'Thu', calls: 24, conversions: 8, height: 'h-24' },
    { day: 'Fri', calls: 18, conversions: 7, height: 'h-20' },
    { day: 'Sat', calls: 8, conversions: 2, height: 'h-8' },
    { day: 'Sun', calls: 5, conversions: 1, height: 'h-5' },
  ];

  const teamPerformance = [
    { name: 'Aarav Mehta', role: 'Sales', leads: 24, calls: 24, conversions: 8, winRate: 33, note: 'Strong discovery, weak trial push' },
    { name: 'Priya Nair', role: 'Sales', leads: 18, calls: 18, conversions: 6, winRate: 33, note: 'Warm, empathetic calls' },
    { name: 'Rohan Gupta', role: 'FSE', leads: 15, calls: 15, conversions: 9, winRate: 60, note: 'Thorough assessments' },
    { name: 'Sneha Iyer', role: 'FSE', leads: 12, calls: 12, conversions: 7, winRate: 58, note: 'Needs clear next steps' },
  ];

  return (
    <div className="mx-4 sm:mx-6 lg:mx-8 mb-12 mt-4 space-y-6">
      
      {/* 1. Band 1: Top KPI Strip */}
      <section>
        <div className="flex justify-between items-end mb-4">
          <div>
            <h2 className="text-xl font-bold text-gray-900">Weekly Call Summary</h2>
            <p className="text-sm text-gray-500 mt-1">May 18 - May 24, 2026</p>
          </div>
          <button className="text-sm font-medium text-blue-600 hover:text-blue-700 bg-blue-50 px-3 py-1.5 rounded-md transition-colors border border-blue-100">
            Export PDF
          </button>
        </div>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <MetricCard title="Total Leads" value="214" trend="+12% vs last wk" trendUp={true} color="blue" />
          <MetricCard title="Calls Made" value="196" subtext="80% of Target" progress={80} color="blue" />
          <MetricCard title="Conversions" value="79" subtext="Win Rate: 36%" color="green" />
          <MetricCard title="Pipeline Generated" value="₹17.8L" trend="+5% vs last wk" trendUp={true} color="purple" />
        </div>
      </section>

      {/* 2. Band 2: Trends & AI Insights */}
      <div className="grid grid-cols-1 lg:grid-cols-5 gap-6">
        
        {/* Left Column: Visual Trend Chart (3 cols) */}
        <section className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 lg:col-span-3 flex flex-col">
          <div className="flex justify-between items-center mb-6">
            <h3 className="text-base font-bold text-gray-900 flex items-center">
              <Activity className="w-5 h-5 mr-2 text-blue-500" /> Weekly Activity Trend
            </h3>
            <div className="flex items-center space-x-4 text-xs font-medium text-gray-500">
              <div className="flex items-center"><span className="w-3 h-3 rounded-sm bg-gray-100 border border-gray-200 mr-2"></span>Calls</div>
              <div className="flex items-center"><span className="w-3 h-1 bg-blue-500 mr-2"></span>Conversions</div>
            </div>
          </div>
          
          <div className="flex items-end justify-between flex-1 pt-4 border-b border-gray-100 pb-2 px-2 relative mt-4">
            {trendDays.map((stat, idx) => (
              <div key={idx} className="flex flex-col items-center gap-2 w-full group">
                <div className="relative w-full flex justify-center">
                   {/* Bar for calls */}
                   <div className={`w-8 sm:w-12 bg-gray-100 rounded-t-md relative ${stat.height} group-hover:bg-gray-200 transition-colors`}>
                     {/* Floating tooltip for values */}
                     <div className="absolute -top-8 left-1/2 -translate-x-1/2 bg-gray-800 text-white text-[10px] font-bold py-1 px-2 rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap pointer-events-none z-20">
                       {stat.calls} Calls, {stat.conversions} Conv
                     </div>
                   </div>
                   {/* Dot for conversions overlaying the bar */}
                   <div 
                     className="absolute left-1/2 -translate-x-1/2 w-2.5 h-2.5 rounded-full bg-blue-500 border-2 border-white z-10" 
                     style={{ bottom: `${(stat.conversions / stat.calls) * 100}%` }}
                   ></div>
                </div>
                <span className="text-xs font-medium text-gray-500">{stat.day}</span>
              </div>
            ))}
            
            {/* Fake SVG line connecting conversion dots to simulate a combo chart */}
            <svg className="absolute inset-0 w-full h-full pointer-events-none pb-8" preserveAspectRatio="none">
              {/* Very rough approximation curve for visual flair only */}
              <path d="M 7% 85% L 21% 75% L 35% 80% L 50% 65% L 64% 70% L 78% 90% L 93% 95%" fill="none" stroke="#3b82f6" strokeWidth="2" strokeDasharray="4 4" className="opacity-40" />
            </svg>
          </div>
        </section>

        {/* Right Column: AI Insights (2 cols) */}
        <section className="bg-blue-50/50 rounded-xl border border-blue-100 p-6 lg:col-span-2">
          <div className="flex items-center mb-6">
            <Sparkles className="w-5 h-5 text-blue-600 mr-2" />
            <h3 className="text-base font-bold text-gray-900">AI Weekly Insights</h3>
          </div>
          
          <div className="space-y-5">
            <div className="flex items-start bg-white p-3.5 rounded-lg border border-red-100 shadow-sm">
              <div className="p-1 bg-red-100 rounded text-red-600 mt-0.5 mr-3 flex-shrink-0">
                <AlertCircle className="w-3.5 h-3.5" />
              </div>
              <div>
                <span className="text-[10px] font-bold text-red-700 uppercase tracking-wider block mb-1">Risk</span>
                <p className="text-sm text-gray-800 leading-snug font-medium">Offline trial follow-ups are slipping (avg TAT increased by 1.2 days).</p>
              </div>
            </div>
            
            <div className="flex items-start bg-white p-3.5 rounded-lg border border-green-100 shadow-sm">
              <div className="p-1 bg-green-100 rounded text-green-600 mt-0.5 mr-3 flex-shrink-0">
                <CheckCircle className="w-3.5 h-3.5" />
              </div>
              <div>
                <span className="text-[10px] font-bold text-green-700 uppercase tracking-wider block mb-1">Win</span>
                <p className="text-sm text-gray-800 leading-snug font-medium">Aarav Mehta drove a record 36% conversion rate on online leads.</p>
              </div>
            </div>

            <div className="flex items-start bg-white p-3.5 rounded-lg border border-orange-100 shadow-sm">
              <div className="p-1 bg-orange-100 rounded text-orange-600 mt-0.5 mr-3 flex-shrink-0">
                <AlertTriangle className="w-3.5 h-3.5" />
              </div>
              <div>
                <span className="text-[10px] font-bold text-orange-700 uppercase tracking-wider block mb-1">Action</span>
                <p className="text-sm text-gray-800 leading-snug font-medium">14 fresh leads from Meta Ads are untouched. Reassign immediately.</p>
              </div>
            </div>
          </div>
        </section>
      </div>

      {/* 3. Band 3: Team Breakdown */}
      <section className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
        <div className="px-6 py-5 border-b border-gray-200 flex justify-between items-center bg-gray-50/50">
          <h3 className="text-base font-bold text-gray-900">Team Performance Breakdown</h3>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="border-b border-gray-200 text-[11px] uppercase tracking-wider text-gray-500 font-bold bg-white">
                <th className="px-6 py-4">Rep Name</th>
                <th className="px-6 py-4">Role</th>
                <th className="px-6 py-4 text-right">Leads Handled</th>
                <th className="px-6 py-4 text-right">Calls Made</th>
                <th className="px-6 py-4 text-right">Conversions</th>
                <th className="px-6 py-4 text-right">Win Rate</th>
                <th className="px-6 py-4">AI Performance Note</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {teamPerformance.map((rep, idx) => (
                <tr key={idx} className="hover:bg-gray-50 transition-colors bg-white">
                  <td className="px-6 py-4 whitespace-nowrap font-bold text-sm text-gray-900">{rep.name}</td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`text-[11px] font-bold px-2.5 py-1 rounded-full ${rep.role === 'Sales' ? 'bg-blue-50 text-blue-700 border border-blue-100' : 'bg-purple-50 text-purple-700 border border-purple-100'}`}>
                      {rep.role}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600 font-mono text-right">{rep.leads}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600 font-mono text-right">{rep.calls}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 font-bold font-mono text-right">{rep.conversions}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 font-bold font-mono text-right">{rep.winRate}%</td>
                  <td className="px-6 py-4 text-sm text-gray-600 truncate max-w-[200px]" title={rep.note}>{rep.note}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

    </div>
  );
}

function MetricCard({ title, value, trend, trendUp, subtext, progress, color = 'blue' }: any) {
  const colorMap: any = {
    blue: 'border-gray-200',
    green: 'border-gray-200',
    purple: 'border-gray-200',
    red: 'border-gray-200',
  };

  return (
    <div className={`bg-white rounded-xl shadow-sm border ${colorMap[color]} p-5`}>
      <div className="text-[13px] font-semibold text-gray-500 mb-1.5 uppercase tracking-wide">{title}</div>
      <div className="text-3xl font-black text-gray-900 tracking-tight mb-2.5">{value}</div>
      
      {trend && (
        <div className={`inline-flex items-center text-[11px] font-bold px-2 py-1 rounded-md ${
          trendUp ? 'text-green-700 bg-green-50/80 border border-green-100/50' : 'text-red-700 bg-red-50/80 border border-red-100/50'
        }`}>
          {trendUp ? <ArrowUpRight className="w-3.5 h-3.5 mr-1" /> : <ArrowDownRight className="w-3.5 h-3.5 mr-1" />}
          {trend}
        </div>
      )}
      
      {subtext && !progress && (
        <div className="text-xs font-semibold text-gray-500 mt-1">{subtext}</div>
      )}

      {progress && (
        <div className="mt-2">
          <div className="w-full bg-gray-100 rounded-full h-1.5 mb-1.5 overflow-hidden border border-gray-200/50">
            <div className={`h-1.5 rounded-full ${color === 'blue' ? 'bg-blue-500' : 'bg-green-500'}`} style={{ width: `${progress}%` }}></div>
          </div>
          <div className="text-[11px] font-semibold text-gray-500">{subtext}</div>
        </div>
      )}
    </div>
  );
}
