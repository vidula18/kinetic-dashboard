import { useState, useMemo } from 'react';
import { Filter, BarChart2, PieChart as PieChartIcon, Activity, Sparkles, Star, Search } from 'lucide-react';
import { MOCK_LEADS } from '../data/mockLeads';
import { LeadItem } from './LeadItem';
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, Cell, CartesianGrid, PieChart, Pie } from 'recharts';

const COLORS = ['#3b82f6', '#10b981', '#f59e0b', '#ef4444', '#8b5cf6', '#06b6d4'];

export function LeadAnalysis() {
  const [showSummary, setShowSummary] = useState(false);
  const [selectedLeadId, setSelectedLeadId] = useState<string | null>(null);

  const [filters, setFilters] = useState({
    timeline: 'All Time',
    stars: 'All',
    quality: 'All',
    campaignName: 'All',
    campaignId: 'All',
    source: 'All'
  });

  const filteredLeads = useMemo(() => {
    return MOCK_LEADS.filter(lead => {
      if (filters.stars !== 'All' && lead.stars !== parseInt(filters.stars)) return false;
      if (filters.quality !== 'All' && lead.quality !== filters.quality) return false;
      if (filters.campaignName !== 'All' && lead.campaignName !== filters.campaignName) return false;
      if (filters.campaignId !== 'All' && lead.campaignId !== filters.campaignId) return false;
      if (filters.source !== 'All' && lead.source !== filters.source) return false;
      return true;
    });
  }, [filters]);

  const summaryData = useMemo(() => {
    const sourceMap = new Map();
    const serviceMap = new Map();
    const qualityMap = new Map();

    filteredLeads.forEach(lead => {
      if (lead.source) sourceMap.set(lead.source, (sourceMap.get(lead.source) || 0) + 1);
      if (lead.serviceInterest) serviceMap.set(lead.serviceInterest, (serviceMap.get(lead.serviceInterest) || 0) + 1);
      if (lead.quality) qualityMap.set(lead.quality, (qualityMap.get(lead.quality) || 0) + 1);
    });

    const sources = Array.from(sourceMap.entries()).map(([name, count]) => ({ name, count })).sort((a,b) => b.count - a.count);
    const services = Array.from(serviceMap.entries()).map(([name, value]) => ({ name, value }));
    const qualities = Array.from(qualityMap.entries()).map(([name, value]) => ({ name, value }));
    
    // Funnel mock based on filtered subset size to show dropoff
    const total = filteredLeads.length;
    const funnelStages = [
      { name: 'Total Leads', value: total },
      { name: 'Contacted', value: Math.floor(total * 0.8) },
      { name: 'Qualified', value: Math.floor(total * 0.5) },
      { name: 'Converted', value: Math.floor(total * 0.25) }
    ];

    return { sources, services, qualities, funnelStages };
  }, [filteredLeads]);

  const updateFilter = (key: string, value: string) => {
    setFilters(prev => ({ ...prev, [key]: value }));
  };

  return (
    <div className="mx-4 sm:mx-6 lg:mx-8 mb-12 mt-4 space-y-6 animate-in fade-in duration-300">
      
      {/* Filters Bar */}
      <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm flex flex-col gap-4">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div className="flex items-center space-x-2">
            <Filter className="w-5 h-5 text-gray-500" />
            <span className="text-sm font-bold text-gray-700">Lead Filters</span>
          </div>
          <button 
            onClick={() => setShowSummary(!showSummary)}
            className="px-6 py-2.5 text-sm font-bold rounded-lg shadow-sm text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-colors flex items-center w-full sm:w-auto justify-center"
          >
            {showSummary ? <Filter className="w-4 h-4 mr-2" /> : <PieChartIcon className="w-4 h-4 mr-2" />}
            {showSummary ? 'Back to Leads' : 'Generate Summary'}
          </button>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3">
          <select 
            value={filters.timeline} onChange={e => updateFilter('timeline', e.target.value)}
            className="text-sm font-semibold text-gray-700 border-gray-300 rounded-md shadow-sm border bg-gray-50 py-2 pl-3 pr-8 focus:outline-none focus:ring-blue-500 focus:border-blue-500"
          >
            <option value="All Time">All Time</option>
            <option value="This Week">This Week</option>
            <option value="This Month">This Month</option>
          </select>
          
          <select 
            value={filters.stars} onChange={e => updateFilter('stars', e.target.value)}
            className="text-sm font-semibold text-gray-700 border-gray-300 rounded-md shadow-sm border bg-gray-50 py-2 pl-3 pr-8 focus:outline-none focus:ring-blue-500 focus:border-blue-500"
          >
            <option value="All">Any Rating</option>
            <option value="5">5 Stars</option>
            <option value="4">4 Stars</option>
            <option value="3">3 Stars</option>
            <option value="2">2 Stars</option>
            <option value="1">1 Star</option>
          </select>

          <select 
            value={filters.quality} onChange={e => updateFilter('quality', e.target.value)}
            className="text-sm font-semibold text-gray-700 border-gray-300 rounded-md shadow-sm border bg-gray-50 py-2 pl-3 pr-8 focus:outline-none focus:ring-blue-500 focus:border-blue-500"
          >
            <option value="All">All Qualities</option>
            <option value="Marketing qualified lead">MQL</option>
            <option value="Sales qualified lead">SQL</option>
            <option value="Non qualified lead">NQL</option>
            <option value="Not responding">Not responding</option>
          </select>

          <select 
            value={filters.campaignName} onChange={e => updateFilter('campaignName', e.target.value)}
            className="text-sm font-semibold text-gray-700 border-gray-300 rounded-md shadow-sm border bg-gray-50 py-2 pl-3 pr-8 focus:outline-none focus:ring-blue-500 focus:border-blue-500"
          >
            <option value="All">All Campaigns</option>
            <option value="Summer Shred">Summer Shred</option>
            <option value="Postpartum Wellness">Postpartum Wellness</option>
            <option value="Knee Rehab">Knee Rehab</option>
          </select>

          <select 
            value={filters.campaignId} onChange={e => updateFilter('campaignId', e.target.value)}
            className="text-sm font-semibold text-gray-700 border-gray-300 rounded-md shadow-sm border bg-gray-50 py-2 pl-3 pr-8 focus:outline-none focus:ring-blue-500 focus:border-blue-500"
          >
            <option value="All">All Campaign IDs</option>
            <option value="CMP-001">CMP-001</option>
            <option value="CMP-002">CMP-002</option>
            <option value="CMP-003">CMP-003</option>
          </select>

          <select 
            value={filters.source} onChange={e => updateFilter('source', e.target.value)}
            className="text-sm font-semibold text-gray-700 border-gray-300 rounded-md shadow-sm border bg-gray-50 py-2 pl-3 pr-8 focus:outline-none focus:ring-blue-500 focus:border-blue-500"
          >
            <option value="All">All Sources</option>
            <option value="Meta Ads">Meta Ads</option>
            <option value="Google Ads">Google Ads</option>
            <option value="Instagram">Instagram</option>
            <option value="Referral">Referral</option>
            <option value="WhatsApp">WhatsApp</option>
          </select>
        </div>
      </div>

      {showSummary ? (
        /* Summary Analytics Mode */
        <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            
            {/* Top Source Performance */}
            <div className="bg-white border border-gray-200 rounded-xl shadow-sm p-6 flex flex-col">
              <div className="flex items-center mb-6 border-b border-gray-100 pb-3">
                <BarChart2 className="w-5 h-5 mr-2 text-indigo-600" />
                <h3 className="text-[15px] font-bold text-gray-900">Source Performance</h3>
              </div>
              <div className="h-64">
                {summaryData.sources.length > 0 ? (
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={summaryData.sources} layout="vertical" margin={{ top: 10, right: 30, left: 40, bottom: 0 }}>
                      <CartesianGrid strokeDasharray="3 3" horizontal={true} vertical={false} stroke="#f3f4f6" />
                      <XAxis type="number" tick={{ fontSize: 11, fill: '#6b7280' }} axisLine={{ stroke: '#e5e7eb' }} tickLine={false} />
                      <YAxis dataKey="name" type="category" axisLine={{ stroke: '#e5e7eb' }} tickLine={false} tick={{ fontSize: 11, fill: '#4b5563', fontWeight: 600 }} />
                      <Tooltip cursor={{ fill: '#f3f4f6' }} contentStyle={{ borderRadius: '8px', border: '1px solid #e5e7eb', boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)' }} />
                      <Bar dataKey="count" name="Leads" radius={[0, 4, 4, 0]}>
                        {summaryData.sources.map((_, index) => (
                          <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                        ))}
                      </Bar>
                    </BarChart>
                  </ResponsiveContainer>
                ) : (
                  <div className="flex items-center justify-center h-full text-gray-400 font-medium text-sm">No data for selected filters</div>
                )}
              </div>
            </div>

            {/* Lead Funnel Pie Chart */}
            <div className="bg-white border border-gray-200 rounded-xl shadow-sm p-6 flex flex-col">
              <div className="flex items-center mb-6 border-b border-gray-100 pb-3">
                <Activity className="w-5 h-5 mr-2 text-blue-600" />
                <h3 className="text-[15px] font-bold text-gray-900">Lead Funnel</h3>
              </div>
              <div className="h-64">
                {summaryData.funnelStages[0].value > 0 ? (
                  <ResponsiveContainer width="100%" height="100%">
                    <PieChart>
                      <Pie data={summaryData.funnelStages} cx="50%" cy="50%" innerRadius={60} outerRadius={80} paddingAngle={2} dataKey="value" label={(props: any) => `${props.name} ${(props.percent * 100).toFixed(0)}%`}>
                        {summaryData.funnelStages.map((_, index) => (
                          <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                        ))}
                      </Pie>
                      <Tooltip contentStyle={{ borderRadius: '8px', border: '1px solid #e5e7eb', boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)' }} />
                    </PieChart>
                  </ResponsiveContainer>
                ) : (
                  <div className="flex items-center justify-center h-full text-gray-400 font-medium text-sm">No data for selected filters</div>
                )}
              </div>
            </div>

            {/* Service Interest Pie Chart */}
            <div className="bg-white border border-gray-200 rounded-xl shadow-sm p-6 flex flex-col">
              <div className="flex items-center mb-6 border-b border-gray-100 pb-3">
                <Sparkles className="w-5 h-5 mr-2 text-emerald-600" />
                <h3 className="text-[15px] font-bold text-gray-900">Service Interest</h3>
              </div>
              <div className="h-64">
                {summaryData.services.length > 0 ? (
                  <ResponsiveContainer width="100%" height="100%">
                    <PieChart>
                      <Pie data={summaryData.services} cx="50%" cy="50%" innerRadius={0} outerRadius={80} dataKey="value" label={(props: any) => `${props.name} ${(props.percent * 100).toFixed(0)}%`}>
                        {summaryData.services.map((_, index) => (
                          <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                        ))}
                      </Pie>
                      <Tooltip contentStyle={{ borderRadius: '8px', border: '1px solid #e5e7eb', boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)' }} />
                    </PieChart>
                  </ResponsiveContainer>
                ) : (
                  <div className="flex items-center justify-center h-full text-gray-400 font-medium text-sm">No data for selected filters</div>
                )}
              </div>
            </div>

            {/* Lead Quality Pie Chart */}
            <div className="bg-white border border-gray-200 rounded-xl shadow-sm p-6 flex flex-col">
              <div className="flex items-center mb-6 border-b border-gray-100 pb-3">
                <Star className="w-5 h-5 mr-2 text-orange-600" />
                <h3 className="text-[15px] font-bold text-gray-900">Lead Quality Breakdown</h3>
              </div>
              <div className="h-64">
                {summaryData.qualities.length > 0 ? (
                  <ResponsiveContainer width="100%" height="100%">
                    <PieChart>
                      <Pie data={summaryData.qualities} cx="50%" cy="50%" innerRadius={40} outerRadius={80} dataKey="value" label={(props: any) => `${props.name.substring(0, 3)} ${(props.percent * 100).toFixed(0)}%`}>
                        {summaryData.qualities.map((_, index) => (
                          <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                        ))}
                      </Pie>
                      <Tooltip contentStyle={{ borderRadius: '8px', border: '1px solid #e5e7eb', boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)' }} />
                    </PieChart>
                  </ResponsiveContainer>
                ) : (
                  <div className="flex items-center justify-center h-full text-gray-400 font-medium text-sm">No data for selected filters</div>
                )}
              </div>
            </div>

          </div>
        </div>
      ) : (
        /* Normal Lead List Mode */
        <div className="bg-gray-50/50 p-6 border border-gray-200 rounded-xl min-h-[600px] animate-in fade-in duration-300">
          <div className="flex items-center justify-between mb-6 border-b border-gray-200 pb-4">
            <h3 className="text-[15px] font-bold text-gray-900">Filtered Leads ({filteredLeads.length})</h3>
          </div>
          {filteredLeads.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
              {filteredLeads.map((lead) => (
                <LeadItem 
                  key={lead.id} 
                  lead={lead} 
                  isSelected={lead.id === selectedLeadId} 
                  onClick={() => setSelectedLeadId(lead.id)} 
                />
              ))}
            </div>
          ) : (
            <div className="flex flex-col items-center justify-center h-64 bg-white rounded-xl border border-dashed border-gray-300">
              <Search className="w-12 h-12 text-gray-300 mb-4" />
              <p className="text-gray-500 font-medium">No leads match the selected filters.</p>
              <button 
                onClick={() => setFilters({ timeline: 'All Time', stars: 'All', quality: 'All', campaignName: 'All', campaignId: 'All', source: 'All' })}
                className="mt-4 text-blue-600 font-bold hover:underline focus:outline-none"
              >
                Clear all filters
              </button>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
