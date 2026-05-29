import { ArrowUpRight, ArrowDownRight, ChevronLeft, ChevronRight } from 'lucide-react';

export function WeeklySummary() {


  return (
    <div className="mx-4 sm:mx-6 lg:mx-8 mb-12 mt-4 space-y-6">
      
      {/* Top KPI Strip */}
      <section>
        <div className="flex justify-between items-end mb-4">
          <div>
            <h2 className="text-xl font-bold text-gray-900">Weekly Summary Snapshot</h2>
            <div className="flex items-center space-x-2 mt-1">
              <button className="p-1 hover:bg-gray-200 rounded text-gray-500 transition-colors" title="Previous Week">
                <ChevronLeft className="w-4 h-4" />
              </button>
              <p className="text-sm text-gray-600 font-medium px-2">May 18 - May 24, 2026</p>
              <button className="p-1 hover:bg-gray-200 rounded text-gray-500 transition-colors" title="Next Week">
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          </div>
          <button className="text-sm font-medium text-blue-600 hover:text-blue-700 bg-blue-50 px-3 py-1.5 rounded-md transition-colors border border-blue-100">
            Export PDF
          </button>
        </div>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
          <MetricCard title="Total Leads" value="214" trend="+12% vs last wk" trendUp={true} color="blue" />
          <MetricCard title="Hot Leads" value="42" subtext="High AI Intent Score" color="green" />
          <MetricCard title="Ready to Convert" value="18" subtext="Trial ending soon" color="green" />
          <MetricCard title="Alerts Generated" value="35" trend="+5 this wk" trendUp={false} color="purple" />
          
          <MetricCard title="Follow-ups Due" value="64" subtext="Scheduled for this week" progress={65} color="blue" />
          <MetricCard title="Overdue Leads" value="12" subtext="Requires immediate action" color="red" />
          <MetricCard title="Calls Made" value="196" subtext="80% of Target" progress={80} color="blue" />
          <MetricCard title="Untouched Leads" value="24" subtext="Waiting in queue" color="orange" />
        </div>
      </section>

    </div>
  );
}

function MetricCard({ title, value, trend, trendUp, subtext, progress, color = 'blue' }: any) {
  const colorMap: any = {
    blue: 'border-blue-100 bg-blue-50/20',
    green: 'border-green-100 bg-green-50/20',
    purple: 'border-purple-100 bg-purple-50/20',
    red: 'border-red-100 bg-red-50/20',
    orange: 'border-orange-100 bg-orange-50/20',
  };

  return (
    <div className={`rounded-xl shadow-sm border ${colorMap[color]} p-5 hover:shadow-md transition-all`}>
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
          <div className="w-full bg-gray-200/50 rounded-full h-1.5 mb-1.5 overflow-hidden">
            <div className={`h-1.5 rounded-full ${color === 'blue' ? 'bg-blue-500' : 'bg-green-500'}`} style={{ width: `${progress}%` }}></div>
          </div>
          <div className="text-[11px] font-semibold text-gray-500">{subtext}</div>
        </div>
      )}
    </div>
  );
}
