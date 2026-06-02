import { useState, useMemo } from 'react';
import { Filter, BarChart2, PieChart as PieChartIcon, Activity, Sparkles, Star, Search, Users, CheckCircle, TrendingUp, Calendar, DollarSign } from 'lucide-react';
import { MOCK_LEADS } from '../data/mockLeads';
import { LeadItem } from './LeadItem';
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, Cell, CartesianGrid, PieChart, Pie } from 'recharts';

const COLORS = ['#3b82f6', '#10b981', '#f59e0b', '#ef4444', '#8b5cf6', '#06b6d4'];

const renderPieLabel = (props: any) => {
  const { cx, cy, midAngle, outerRadius, percent, name, fill } = props;
  const RADIAN = Math.PI / 180;
  const sin = Math.sin(-midAngle * RADIAN);
  const cos = Math.cos(-midAngle * RADIAN);
  
  // Start line slightly away from pie
  const sx = cx + (outerRadius + 6) * cos;
  const sy = cy + (outerRadius + 6) * sin;
  
  // Mid point further out
  const mx = cx + (outerRadius + 18) * cos;
  const my = cy + (outerRadius + 18) * sin;
  
  // End point horizontal extension
  const ex = mx + (cos >= 0 ? 1 : -1) * 12;
  const ey = my;
  
  const textAnchor = cos >= 0 ? 'start' : 'end';
  const tx = ex + (cos >= 0 ? 6 : -6);
  
  const percentText = `${(percent * 100).toFixed(0)}%`;
  
  // Wrap long text
  const words = name.split(' ');
  let line1 = name;
  let line2 = '';
  
  if (name.length > 10 && words.length > 1) {
    const mid = Math.ceil(words.length / 2);
    line1 = words.slice(0, mid).join(' ');
    line2 = words.slice(mid).join(' ');
  }

  return (
    <g>
      <path d={`M${sx},${sy}L${mx},${my}L${ex},${ey}`} stroke={fill} fill="none" strokeWidth={1.5} opacity={0.5} />
      <text x={tx} y={ey} fill={fill} textAnchor={textAnchor} dominantBaseline="central" fontSize={11} fontWeight={600}>
        {line2 ? (
          <>
            <tspan x={tx} dy="-0.6em">{line1}</tspan>
            <tspan x={tx} dy="1.3em">{line2} {percentText}</tspan>
          </>
        ) : (
          <tspan x={tx} dy="0">{line1} {percentText}</tspan>
        )}
      </text>
    </g>
  );
};

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

  const overviewMetrics = useMemo(() => {
    const total = filteredLeads.length;
    let qualified = 0;
    let trialsBooked = 0;
    
    filteredLeads.forEach(lead => {
        if (lead.quality === 'Marketing qualified lead' || lead.quality === 'Sales qualified lead') qualified++;
        if (lead.labels && lead.labels.some(l => l.text.includes('Trial'))) trialsBooked++;
    });
    
    const conversionRate = total > 0 ? ((trialsBooked / total) * 100).toFixed(1) + '%' : '0%';
    const pipelineValue = `₹${(total * 25000 / 100000).toFixed(1)}L`; 
    const avgQuality = total > 0 ? (filteredLeads.reduce((sum, lead) => sum + (lead.stars || 0), 0) / total).toFixed(1) : '0';

    return { total, qualified, conversionRate, trialsBooked, pipelineValue, avgQuality };
  }, [filteredLeads]);

  const combinations = useMemo(() => {
    const map = new Map();
    filteredLeads.forEach(lead => {
        if (lead.source && lead.serviceInterest) {
            const key = `${lead.source}|${lead.serviceInterest}`;
            const data = map.get(key) || { leads: 0, converted: 0 };
            data.leads++;
            if (lead.labels && lead.labels.some(l => l.text.includes('Trial'))) data.converted++;
            map.set(key, data);
        }
    });
    
    return Array.from(map.entries()).map(([key, data]) => {
        const [source, service] = key.split('|');
        return {
            source,
            service,
            leads: data.leads,
            conversions: data.converted,
            rate: data.leads > 0 ? ((data.converted / data.leads) * 100).toFixed(1) + '%' : '0%'
        };
    }).sort((a, b) => b.leads - a.leads).slice(0, 5); 
  }, [filteredLeads]);

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
            className="text-sm font-semibold text-gray-700 border-gray-300 rounded-md shadow-sm border bg-gray-50 py-2 pl-3 pr-12 bg-[position:right_1rem_center] focus:outline-none focus:ring-blue-500 focus:border-blue-500"
          >
            <option value="All Time">All Time</option>
            <option value="This Week">This Week</option>
            <option value="This Month">This Month</option>
          </select>
          
          <select 
            value={filters.stars} onChange={e => updateFilter('stars', e.target.value)}
            className="text-sm font-semibold text-gray-700 border-gray-300 rounded-md shadow-sm border bg-gray-50 py-2 pl-3 pr-12 bg-[position:right_1rem_center] focus:outline-none focus:ring-blue-500 focus:border-blue-500"
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
            className="text-sm font-semibold text-gray-700 border-gray-300 rounded-md shadow-sm border bg-gray-50 py-2 pl-3 pr-12 bg-[position:right_1rem_center] focus:outline-none focus:ring-blue-500 focus:border-blue-500"
          >
            <option value="All">All Qualities</option>
            <option value="Marketing qualified lead">Marketing Qualified Lead</option>
            <option value="Sales qualified lead">Sales Qualified Lead</option>
            <option value="Non qualified lead">Non Qualified Lead</option>
            <option value="Not responding">Not Responding</option>
          </select>

          <select 
            value={filters.campaignName} onChange={e => updateFilter('campaignName', e.target.value)}
            className="text-sm font-semibold text-gray-700 border-gray-300 rounded-md shadow-sm border bg-gray-50 py-2 pl-3 pr-12 bg-[position:right_1rem_center] focus:outline-none focus:ring-blue-500 focus:border-blue-500"
          >
            <option value="All">All Campaigns</option>
            <option value="Summer Shred">Summer Shred</option>
            <option value="Postpartum Wellness">Postpartum Wellness</option>
            <option value="Knee Rehab">Knee Rehab</option>
          </select>

          <select 
            value={filters.campaignId} onChange={e => updateFilter('campaignId', e.target.value)}
            className="text-sm font-semibold text-gray-700 border-gray-300 rounded-md shadow-sm border bg-gray-50 py-2 pl-3 pr-12 bg-[position:right_1rem_center] focus:outline-none focus:ring-blue-500 focus:border-blue-500"
          >
            <option value="All">All Campaign IDs</option>
            <option value="CMP-001">CMP-001</option>
            <option value="CMP-002">CMP-002</option>
            <option value="CMP-003">CMP-003</option>
          </select>

          <select 
            value={filters.source} onChange={e => updateFilter('source', e.target.value)}
            className="text-sm font-semibold text-gray-700 border-gray-300 rounded-md shadow-sm border bg-gray-50 py-2 pl-3 pr-12 bg-[position:right_1rem_center] focus:outline-none focus:ring-blue-500 focus:border-blue-500"
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
          
          {/* Level 1: Overview KPIs */}
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
            <div className="bg-white p-4 rounded-xl border border-gray-200 shadow-sm">
              <div className="flex items-center gap-2 mb-2">
                <Users className="w-4 h-4 text-blue-600" />
                <h4 className="text-[10px] font-bold text-gray-500 uppercase tracking-wider">Total Leads</h4>
              </div>
              <div className="text-2xl font-black text-gray-900">{overviewMetrics.total}</div>
            </div>
            
            <div className="bg-white p-4 rounded-xl border border-gray-200 shadow-sm">
              <div className="flex items-center gap-2 mb-2">
                <CheckCircle className="w-4 h-4 text-green-600" />
                <h4 className="text-[10px] font-bold text-gray-500 uppercase tracking-wider">Qualified</h4>
              </div>
              <div className="text-2xl font-black text-gray-900">{overviewMetrics.qualified}</div>
            </div>

            <div className="bg-white p-4 rounded-xl border border-gray-200 shadow-sm">
              <div className="flex items-center gap-2 mb-2">
                <TrendingUp className="w-4 h-4 text-purple-600" />
                <h4 className="text-[10px] font-bold text-gray-500 uppercase tracking-wider">Conversion</h4>
              </div>
              <div className="text-2xl font-black text-gray-900">{overviewMetrics.conversionRate}</div>
            </div>

            <div className="bg-white p-4 rounded-xl border border-gray-200 shadow-sm">
              <div className="flex items-center gap-2 mb-2">
                <Calendar className="w-4 h-4 text-orange-600" />
                <h4 className="text-[10px] font-bold text-gray-500 uppercase tracking-wider">Trials Booked</h4>
              </div>
              <div className="text-2xl font-black text-gray-900">{overviewMetrics.trialsBooked}</div>
            </div>

            <div className="bg-white p-4 rounded-xl border border-gray-200 shadow-sm">
              <div className="flex items-center gap-2 mb-2">
                <DollarSign className="w-4 h-4 text-emerald-600" />
                <h4 className="text-[10px] font-bold text-gray-500 uppercase tracking-wider">Pipeline</h4>
              </div>
              <div className="text-2xl font-black text-gray-900">{overviewMetrics.pipelineValue}</div>
            </div>

            <div className="bg-white p-4 rounded-xl border border-gray-200 shadow-sm">
              <div className="flex items-center gap-2 mb-2">
                <Activity className="w-4 h-4 text-red-600" />
                <h4 className="text-[10px] font-bold text-gray-500 uppercase tracking-wider">Avg Quality</h4>
              </div>
              <div className="text-2xl font-black text-gray-900">{overviewMetrics.avgQuality}</div>
            </div>
          </div>

          {/* Level 2: Pie Charts Grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            
            {/* Conversion Stages Pie Chart */}
            <div className="bg-white border border-gray-200 rounded-xl shadow-sm p-6 flex flex-col">
              <div className="flex items-center mb-6 border-b border-gray-100 pb-3">
                <Activity className="w-5 h-5 mr-2 text-blue-600" />
                <h3 className="text-[15px] font-bold text-gray-900">Conversion Stages</h3>
              </div>
              <div className="h-48">
                {summaryData.funnelStages[0].value > 0 ? (
                  <ResponsiveContainer width="100%" height="100%">
                    <PieChart margin={{ top: 30, right: 70, bottom: 30, left: 70 }}>
                      <Pie data={summaryData.funnelStages} cx="50%" cy="50%" innerRadius={25} outerRadius={35} paddingAngle={2} dataKey="value" labelLine={false} label={renderPieLabel}>
                        {summaryData.funnelStages.map((_, index) => (
                          <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                        ))}
                      </Pie>
                      <Tooltip contentStyle={{ borderRadius: '8px', border: '1px solid #e5e7eb', boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)' }} />
                    </PieChart>
                  </ResponsiveContainer>
                ) : (
                  <div className="flex items-center justify-center h-full text-gray-400 font-medium text-sm">No data</div>
                )}
              </div>
            </div>

            {/* Service Interest Pie Chart */}
            <div className="bg-white border border-gray-200 rounded-xl shadow-sm p-6 flex flex-col">
              <div className="flex items-center mb-6 border-b border-gray-100 pb-3">
                <Sparkles className="w-5 h-5 mr-2 text-emerald-600" />
                <h3 className="text-[15px] font-bold text-gray-900">Service Interest</h3>
              </div>
              <div className="h-48">
                {summaryData.services.length > 0 ? (
                  <ResponsiveContainer width="100%" height="100%">
                    <PieChart margin={{ top: 30, right: 70, bottom: 30, left: 70 }}>
                      <Pie data={summaryData.services} cx="50%" cy="50%" innerRadius={0} outerRadius={35} dataKey="value" labelLine={false} label={renderPieLabel}>
                        {summaryData.services.map((_, index) => (
                          <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                        ))}
                      </Pie>
                      <Tooltip contentStyle={{ borderRadius: '8px', border: '1px solid #e5e7eb', boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)' }} />
                    </PieChart>
                  </ResponsiveContainer>
                ) : (
                  <div className="flex items-center justify-center h-full text-gray-400 font-medium text-sm">No data</div>
                )}
              </div>
            </div>

            {/* Lead Quality Pie Chart */}
            <div className="bg-white border border-gray-200 rounded-xl shadow-sm p-6 flex flex-col">
              <div className="flex items-center mb-6 border-b border-gray-100 pb-3">
                <Star className="w-5 h-5 mr-2 text-orange-600" />
                <h3 className="text-[15px] font-bold text-gray-900">Lead Quality</h3>
              </div>
              <div className="h-48">
                {summaryData.qualities.length > 0 ? (
                  <ResponsiveContainer width="100%" height="100%">
                    <PieChart margin={{ top: 30, right: 70, bottom: 30, left: 70 }}>
                      <Pie data={summaryData.qualities} cx="50%" cy="50%" innerRadius={25} outerRadius={35} dataKey="value" labelLine={false} label={renderPieLabel}>
                        {summaryData.qualities.map((_, index) => (
                          <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                        ))}
                      </Pie>
                      <Tooltip contentStyle={{ borderRadius: '8px', border: '1px solid #e5e7eb', boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)' }} />
                    </PieChart>
                  </ResponsiveContainer>
                ) : (
                  <div className="flex items-center justify-center h-full text-gray-400 font-medium text-sm">No data</div>
                )}
              </div>
            </div>

          </div>

          {/* Level 3: Performance Analysis */}
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
                  <div className="flex items-center justify-center h-full text-gray-400 font-medium text-sm">No data</div>
                )}
              </div>
            </div>

            {/* Top Performing Combinations Matrix */}
            <div className="bg-white border border-gray-200 rounded-xl shadow-sm p-6 flex flex-col">
              <div className="flex items-center mb-6 border-b border-gray-100 pb-3">
                <Activity className="w-5 h-5 mr-2 text-purple-600" />
                <h3 className="text-[15px] font-bold text-gray-900">Top Performing Combinations</h3>
              </div>

              <div className="space-y-3 flex-1">
                {combinations.length > 0 ? (
                  combinations.map((c, idx) => (
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
                  ))
                ) : (
                  <div className="flex items-center justify-center h-full text-gray-400 font-medium text-sm">No data</div>
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
