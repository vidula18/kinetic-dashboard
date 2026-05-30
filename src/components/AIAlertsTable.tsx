import { useState } from 'react';
import { Filter, X, Search, Calendar, AlertTriangle } from 'lucide-react';
import { LabelPill } from './LabelPill';
import { MOCK_ALERTS } from '../data/mockAlerts';

interface AIAlertsTableProps {
  onNavigateToLead?: (leadName: string) => void;
}

export function AIAlertsTable({ onNavigateToLead }: AIAlertsTableProps) {
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [activeFilter, setActiveFilter] = useState<string | null>(null);

  const filteredAlerts = activeFilter 
    ? MOCK_ALERTS.filter(a => a.labelText === activeFilter)
    : MOCK_ALERTS;

  const uniqueLabels = Array.from(new Set(MOCK_ALERTS.map(a => a.labelText)));

  return (
    <>
      <section className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden mx-4 sm:mx-6 lg:mx-8 mb-8 mt-6">
        <div className="px-6 py-5 border-b border-gray-200 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <h2 className="text-lg font-semibold text-gray-900">AI Alerts (past 30 days)</h2>
            <span className="bg-blue-100 text-blue-700 py-0.5 px-2.5 rounded-full text-xs font-medium">{filteredAlerts.length}</span>
          </div>
          <div className="flex items-center gap-2">
            
            {/* Active Filter Visibility when closed */}
            {!isFilterOpen && activeFilter && (
              <div className="mr-2 flex items-center text-sm">
                <span className="text-gray-500 mr-2">Showing:</span>
                <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-bold bg-blue-100 text-blue-800 border border-blue-200">
                  {activeFilter}
                  <button 
                    onClick={() => setActiveFilter(null)}
                    className="ml-1.5 hover:text-blue-900 focus:outline-none"
                  >
                    <X className="w-3 h-3" />
                  </button>
                </span>
              </div>
            )}

            <button 
              onClick={() => setIsFilterOpen(!isFilterOpen)}
              className={`flex items-center px-3 py-1.5 border rounded-md text-sm font-medium transition-all shadow-sm ${
                isFilterOpen || activeFilter 
                  ? 'bg-blue-600 text-white border-blue-700 hover:bg-blue-700' 
                  : 'bg-white text-gray-700 border-gray-300 hover:bg-gray-50'
              }`}
            >
              <Filter className={`w-4 h-4 mr-2 ${isFilterOpen || activeFilter ? 'text-blue-100' : 'text-gray-400'}`} /> 
              Filter {activeFilter ? '(1)' : ''}
            </button>
            <button className="flex items-center px-3 py-1.5 border border-gray-300 rounded-md text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 shadow-sm">
               Date · Newest
            </button>
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50/50">
              <tr>
                <th scope="col" className="px-6 py-3 text-left text-xs font-extrabold text-gray-700 uppercase tracking-wider w-[15%]">Status</th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-extrabold text-gray-700 uppercase tracking-wider w-[20%]">Lead Name</th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-extrabold text-gray-700 uppercase tracking-wider w-[50%]">AI Insight</th>
                <th scope="col" className="px-6 py-3 text-right text-xs font-extrabold text-gray-700 uppercase tracking-wider w-[15%]">Date of Alert</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {filteredAlerts.length > 0 ? filteredAlerts.map((alert) => (
                <tr key={alert.id} className="hover:bg-gray-50 transition-colors">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <LabelPill color={alert.labelColor}>{alert.labelText}</LabelPill>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div 
                      className={`text-sm font-bold text-gray-900 ${onNavigateToLead ? 'cursor-pointer hover:text-blue-600 hover:underline' : ''}`}
                      onClick={() => onNavigateToLead && onNavigateToLead(alert.leadName)}
                    >
                      {alert.leadName}
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="text-sm text-gray-600" dangerouslySetInnerHTML={{ 
                      __html: alert.insight.replace(/(\d+%|follow-up overdue|language gap flagged|call not started)/i, '<strong>$1</strong>') 
                    }} />
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium text-gray-500">
                    {alert.date}
                  </td>
                </tr>
              )) : (
                <tr>
                  <td colSpan={4} className="px-6 py-12 text-center text-sm text-gray-500 font-medium">
                    No alerts match the selected filters.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </section>

      {/* Filter Modal */}
      {isFilterOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div 
            className="absolute inset-0 bg-gray-900/40 backdrop-blur-sm"
            onClick={() => setIsFilterOpen(false)}
          />
          <div className="bg-white rounded-xl shadow-2xl w-full max-w-2xl max-h-[90vh] flex flex-col relative z-10 animate-in fade-in zoom-in duration-200">
            <div className="px-6 py-4 border-b border-gray-200 flex justify-between items-center bg-gray-50 rounded-t-xl">
              <h3 className="text-lg font-extrabold text-gray-900">Alert Filters</h3>
              <button 
                onClick={() => setIsFilterOpen(false)} 
                className="text-gray-400 hover:text-gray-600 transition-colors p-1 hover:bg-gray-200 rounded"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
            
            <div className="p-6 overflow-y-auto flex flex-col gap-6">
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                {/* Date Range Mock Filter */}
                <div>
                  <label className="block text-xs font-bold text-gray-700 mb-1.5">Date Range</label>
                  <div className="relative">
                    <Calendar className="absolute left-3 top-2.5 h-4 w-4 text-gray-400" />
                    <select className="pl-10 w-full bg-white border border-gray-300 text-gray-900 text-sm rounded-md focus:ring-blue-500 focus:border-blue-500 block p-2 shadow-sm">
                      <option>Any Time</option>
                      <option>Today</option>
                      <option>Last 7 Days</option>
                      <option>Last 30 Days</option>
                    </select>
                  </div>
                </div>
                
                {/* Search Mock Filter */}
                <div>
                  <label className="block text-xs font-bold text-gray-700 mb-1.5">Search Keywords</label>
                  <div className="relative">
                    <Search className="absolute left-3 top-2.5 h-4 w-4 text-gray-400" />
                    <input type="text" placeholder="Search alerts..." className="pl-10 w-full bg-white border border-gray-300 text-gray-900 text-sm rounded-md focus:ring-blue-500 focus:border-blue-500 block p-2 shadow-sm" />
                  </div>
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-gray-700 mb-2">Alert Type</label>
                <div className="flex flex-wrap gap-2.5">
                  <button 
                    onClick={() => setActiveFilter(null)}
                    className={`px-4 py-2 rounded-full text-xs font-bold border transition-colors shadow-sm ${
                      activeFilter === null 
                        ? 'bg-gray-900 text-white border-gray-900' 
                        : 'bg-white text-gray-600 border-gray-300 hover:bg-gray-100 hover:text-gray-900'
                    }`}
                  >
                    All Alerts ({MOCK_ALERTS.length})
                  </button>
                  {uniqueLabels.map(label => {
                    const isActive = activeFilter === label;
                    const count = MOCK_ALERTS.filter(a => a.labelText === label).length;
                    return (
                      <button
                        key={label}
                        onClick={() => setActiveFilter(isActive ? null : label)}
                        className={`flex items-center px-4 py-2 rounded-full text-xs font-bold border transition-all shadow-sm ${
                          isActive
                            ? 'bg-blue-600 text-white border-blue-700 ring-2 ring-blue-500 ring-offset-1'
                            : 'bg-white text-gray-700 border-gray-300 hover:bg-gray-100'
                        }`}
                      >
                        <AlertTriangle className={`w-3.5 h-3.5 mr-1.5 ${isActive ? 'opacity-100 text-blue-100' : 'opacity-70 text-gray-500'}`} />
                        {label}
                        <span className={`ml-1.5 px-1.5 py-0.5 rounded-full text-[10px] font-black ${
                          isActive ? 'bg-blue-800 text-white' : 'bg-gray-100 text-gray-600'
                        }`}>
                          {count}
                        </span>
                      </button>
                    );
                  })}
                </div>
              </div>

            </div>

            <div className="px-6 py-4 border-t border-gray-200 bg-gray-50 flex justify-end gap-3 rounded-b-xl">
              <button 
                onClick={() => {
                  setActiveFilter(null);
                  setIsFilterOpen(false);
                }}
                className="px-5 py-2 text-sm font-bold text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50 shadow-sm"
              >
                Clear Filters
              </button>
              <button 
                onClick={() => setIsFilterOpen(false)}
                className="px-5 py-2 text-sm font-bold text-white bg-blue-600 border border-transparent rounded-md hover:bg-blue-700 shadow-sm"
              >
                Apply Filters
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
