import { useState } from 'react';
import { Filter, Users, CheckCircle, TrendingUp, Calendar, DollarSign, Activity, BarChart2, Layers, Network } from 'lucide-react';
import { 
  MOCK_ANALYSIS_OVERVIEW, 
  MOCK_SOURCE_METRICS, 
  MOCK_SERVICE_METRICS, 
  MOCK_COMBINATION_METRICS, 
  MOCK_FUNNEL_STAGES 
} from '../data/mockAnalysis';
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, Cell, CartesianGrid } from 'recharts';

function formatINR(amount: number) {
  if (amount >= 100000) return `₹${(amount / 100000).toFixed(1)}L`;
  return `₹${amount.toLocaleString()}`;
}

export function LeadAnalysis() {
  const [dateRange, setDateRange] = useState('This Month');

  return (
    <div className="mx-4 sm:mx-6 lg:mx-8 mb-12 mt-4 space-y-6 animate-in fade-in duration-300">
      
      {/* Filters Bar */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 bg-white p-4 rounded-xl border border-gray-200 shadow-sm">
        <div className="flex items-center space-x-2">
          <Filter className="w-4 h-4 text-gray-500" />
          <span className="text-xs font-bold text-gray-500 uppercase tracking-wider">Analysis Period</span>
          <div className="flex bg-gray-100 p-1 rounded-lg ml-2">
            {['This Week', 'This Month', 'This Quarter'].map(p => (
              <button
                key={p}
                onClick={() => setDateRange(p)}
                className={`px-4 py-1.5 text-xs font-bold rounded-md transition-all ${dateRange === p ? 'bg-white text-blue-700 shadow-sm' : 'text-gray-500 hover:text-gray-900'}`}
              >
                {p}
              </button>
            ))}
          </div>
        </div>
        
        <div className="flex gap-2">
          <select className="text-sm font-semibold text-gray-700 border-gray-300 rounded-md shadow-sm border bg-white cursor-pointer py-1.5 pl-3 pr-8 focus:outline-none focus:ring-blue-500 focus:border-blue-500">
            <option>All Sources</option>
            <option>Meta Ads</option>
            <option>Google Ads</option>
            <option>Organic</option>
          </select>
          <select className="text-sm font-semibold text-gray-700 border-gray-300 rounded-md shadow-sm border bg-white cursor-pointer py-1.5 pl-3 pr-8 focus:outline-none focus:ring-blue-500 focus:border-blue-500">
            <option>All Services</option>
            <option>Personal Training</option>
            <option>Rehab & Recovery</option>
          </select>
        </div>
      </div>

      {/* Overview Metrics */}
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
        <div className="bg-white p-4 rounded-xl border border-gray-200 shadow-sm">
          <div className="flex items-center gap-2 mb-2">
            <Users className="w-4 h-4 text-blue-600" />
            <h4 className="text-[10px] font-bold text-gray-500 uppercase tracking-wider">Total Leads</h4>
          </div>
          <div className="text-2xl font-black text-gray-900">{MOCK_ANALYSIS_OVERVIEW.totalLeads}</div>
        </div>
        
        <div className="bg-white p-4 rounded-xl border border-gray-200 shadow-sm">
          <div className="flex items-center gap-2 mb-2">
            <CheckCircle className="w-4 h-4 text-green-600" />
            <h4 className="text-[10px] font-bold text-gray-500 uppercase tracking-wider">Qualified</h4>
          </div>
          <div className="text-2xl font-black text-gray-900">{MOCK_ANALYSIS_OVERVIEW.qualifiedLeads}</div>
        </div>

        <div className="bg-white p-4 rounded-xl border border-gray-200 shadow-sm">
          <div className="flex items-center gap-2 mb-2">
            <TrendingUp className="w-4 h-4 text-purple-600" />
            <h4 className="text-[10px] font-bold text-gray-500 uppercase tracking-wider">Conversion</h4>
          </div>
          <div className="text-2xl font-black text-gray-900">{MOCK_ANALYSIS_OVERVIEW.conversionRate}</div>
        </div>

        <div className="bg-white p-4 rounded-xl border border-gray-200 shadow-sm">
          <div className="flex items-center gap-2 mb-2">
            <Calendar className="w-4 h-4 text-orange-600" />
            <h4 className="text-[10px] font-bold text-gray-500 uppercase tracking-wider">Trials Booked</h4>
          </div>
          <div className="text-2xl font-black text-gray-900">{MOCK_ANALYSIS_OVERVIEW.trialsScheduled}</div>
        </div>

        <div className="bg-white p-4 rounded-xl border border-gray-200 shadow-sm">
          <div className="flex items-center gap-2 mb-2">
            <DollarSign className="w-4 h-4 text-emerald-600" />
            <h4 className="text-[10px] font-bold text-gray-500 uppercase tracking-wider">Pipeline</h4>
          </div>
          <div className="text-2xl font-black text-gray-900">{formatINR(MOCK_ANALYSIS_OVERVIEW.revenueInfluenced)}</div>
        </div>

        <div className="bg-white p-4 rounded-xl border border-gray-200 shadow-sm">
          <div className="flex items-center gap-2 mb-2">
            <Activity className="w-4 h-4 text-red-600" />
            <h4 className="text-[10px] font-bold text-gray-500 uppercase tracking-wider">Avg Quality</h4>
          </div>
          <div className="text-2xl font-black text-gray-900">{MOCK_ANALYSIS_OVERVIEW.averageLeadQuality}</div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Source Performance */}
        <div className="bg-white border border-gray-200 rounded-xl shadow-sm p-6 flex flex-col">
          <div className="flex items-center mb-6 border-b border-gray-100 pb-3">
            <Network className="w-5 h-5 mr-2 text-indigo-600" />
            <h3 className="text-[15px] font-bold text-gray-900">Source Performance</h3>
          </div>
          
          <div className="h-64 mb-4">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={MOCK_SOURCE_METRICS} layout="vertical" margin={{ top: 20, right: 30, left: 40, bottom: 20 }}>
                <CartesianGrid strokeDasharray="3 3" horizontal={true} vertical={true} stroke="#f3f4f6" />
                <XAxis type="number" tick={{ fontSize: 11, fill: '#6b7280' }} axisLine={{ stroke: '#e5e7eb' }} tickLine={{ stroke: '#e5e7eb' }} />
                <YAxis dataKey="source" type="category" axisLine={{ stroke: '#e5e7eb' }} tickLine={{ stroke: '#e5e7eb' }} tick={{ fontSize: 11, fill: '#4b5563', fontWeight: 600 }} />
                <Tooltip 
                  cursor={{ fill: '#f3f4f6' }}
                  contentStyle={{ borderRadius: '8px', border: '1px solid #e5e7eb', boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)' }}
                  labelStyle={{ fontWeight: 'bold', color: '#111827', marginBottom: '4px' }}
                />
                <Bar dataKey="leads" name="Total Leads" radius={[0, 4, 4, 0]}>
                  {MOCK_SOURCE_METRICS.map((_, index) => (
                    <Cell key={`cell-${index}`} fill={['#3b82f6', '#10b981', '#f59e0b', '#8b5cf6', '#ef4444'][index % 5]} />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>

          <div className="overflow-x-auto mt-auto">
            <table className="w-full text-left text-sm border-collapse">
              <thead>
                <tr className="border-b border-gray-200">
                  <th className="pb-2 font-bold text-[10px] uppercase text-gray-500 tracking-wider">Source</th>
                  <th className="pb-2 font-bold text-[10px] uppercase text-gray-500 tracking-wider text-right">Conv. Rate</th>
                  <th className="pb-2 font-bold text-[10px] uppercase text-gray-500 tracking-wider text-right">Cost/Lead</th>
                  <th className="pb-2 font-bold text-[10px] uppercase text-gray-500 tracking-wider text-right">Quality</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {MOCK_SOURCE_METRICS.map((s, idx) => (
                  <tr key={idx} className="hover:bg-gray-50 transition-colors">
                    <td className="py-2.5 font-bold text-gray-900">{s.source}</td>
                    <td className="py-2.5 font-semibold text-green-600 text-right">{s.rate}</td>
                    <td className="py-2.5 text-gray-600 text-right">₹{s.cpl}</td>
                    <td className="py-2.5 font-semibold text-gray-700 text-right">{s.qualityScore} / 5</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Funnel Drop-off */}
        <div className="bg-white border border-gray-200 rounded-xl shadow-sm p-6 flex flex-col">
          <div className="flex items-center mb-6 border-b border-gray-100 pb-3">
            <BarChart2 className="w-5 h-5 mr-2 text-blue-600" />
            <h3 className="text-[15px] font-bold text-gray-900">Lead Funnel & Drop-off</h3>
          </div>

          <div className="h-64 mt-4 mb-4">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={MOCK_FUNNEL_STAGES} layout="vertical" margin={{ top: 20, right: 30, left: 60, bottom: 20 }}>
                <CartesianGrid strokeDasharray="3 3" horizontal={true} vertical={true} stroke="#f3f4f6" />
                <XAxis type="number" tick={{ fontSize: 11, fill: '#6b7280' }} axisLine={{ stroke: '#e5e7eb' }} tickLine={{ stroke: '#e5e7eb' }} />
                <YAxis dataKey="stage" type="category" axisLine={{ stroke: '#e5e7eb' }} tickLine={{ stroke: '#e5e7eb' }} tick={{ fontSize: 11, fill: '#4b5563', fontWeight: 600 }} />
                <Tooltip 
                  cursor={{ fill: '#f3f4f6' }}
                  contentStyle={{ borderRadius: '8px', border: '1px solid #e5e7eb', boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)' }}
                  labelStyle={{ fontWeight: 'bold', color: '#111827', marginBottom: '4px' }}
                />
                <Bar dataKey="count" name="Leads" fill="#3b82f6" radius={[0, 4, 4, 0]}>
                  {MOCK_FUNNEL_STAGES.map((_, index) => (
                    <Cell key={`cell-${index}`} fillOpacity={1 - (index * 0.15)} />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Service Interest */}
        <div className="bg-white border border-gray-200 rounded-xl shadow-sm p-6">
          <div className="flex items-center mb-6 border-b border-gray-100 pb-3">
            <Layers className="w-5 h-5 mr-2 text-emerald-600" />
            <h3 className="text-[15px] font-bold text-gray-900">Service Interest & Value</h3>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-sm border-collapse">
              <thead>
                <tr className="border-b border-gray-200 bg-gray-50/50">
                  <th className="p-3 font-bold text-[10px] uppercase text-gray-500 tracking-wider rounded-tl-lg">Service</th>
                  <th className="p-3 font-bold text-[10px] uppercase text-gray-500 tracking-wider text-right">Leads</th>
                  <th className="p-3 font-bold text-[10px] uppercase text-gray-500 tracking-wider text-right">Conv. Rate</th>
                  <th className="p-3 font-bold text-[10px] uppercase text-gray-500 tracking-wider text-right rounded-tr-lg">Avg Value</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {MOCK_SERVICE_METRICS.map((s, idx) => (
                  <tr key={idx} className="hover:bg-blue-50/30 transition-colors">
                    <td className="p-3 font-bold text-gray-900">{s.service}</td>
                    <td className="p-3 text-gray-700 text-right font-medium">{s.leads}</td>
                    <td className="p-3 font-bold text-green-600 text-right">{s.rate}</td>
                    <td className="p-3 font-black text-gray-900 text-right">{formatINR(s.avgDealSize)}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Source x Service Matrix */}
        <div className="bg-white border border-gray-200 rounded-xl shadow-sm p-6">
          <div className="flex items-center mb-6 border-b border-gray-100 pb-3">
            <Activity className="w-5 h-5 mr-2 text-orange-600" />
            <h3 className="text-[15px] font-bold text-gray-900">Top Performing Combinations</h3>
          </div>

          <div className="space-y-3">
            {MOCK_COMBINATION_METRICS.sort((a, b) => parseFloat(b.rate) - parseFloat(a.rate)).map((c, idx) => (
              <div key={idx} className="flex items-center justify-between p-3 rounded-lg border border-gray-100 bg-gray-50 hover:bg-white hover:shadow-sm transition-all hover:border-gray-200">
                <div>
                  <div className="flex items-center gap-2 mb-1">
                    <span className="text-[10px] font-bold text-blue-700 uppercase tracking-wider bg-blue-100 px-2 py-0.5 rounded-full">{c.source}</span>
                    <span className="text-gray-400">→</span>
                    <span className="text-[10px] font-bold text-emerald-700 uppercase tracking-wider bg-emerald-100 px-2 py-0.5 rounded-full">{c.service}</span>
                  </div>
                  <div className="text-xs text-gray-500 font-medium mt-1.5">
                    {c.leads} leads · {c.conversions} conversions
                  </div>
                </div>
                <div className="text-right">
                  <div className="text-xl font-black text-green-600">{c.rate}</div>
                  <div className="text-[9px] uppercase tracking-wider text-gray-400 font-bold">Conversion</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

    </div>
  );
}
