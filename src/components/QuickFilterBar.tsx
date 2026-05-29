import { useState } from 'react';
import { Filter, Calendar, Search, MapPin, X } from 'lucide-react';
import type { LabelType } from '../data/labelConfig';
import { MOCK_LABELS } from '../data/labelConfig';
import type { Lead } from '../data/mockLeads';

interface QuickFilterBarProps {
  leads: Lead[];
  activeFilter: LabelType | null;
  onFilterChange: (filter: LabelType | null) => void;
}

export function QuickFilterBar({ leads, activeFilter, onFilterChange }: QuickFilterBarProps) {
  const [isOpen, setIsOpen] = useState(false);

  // Compute label counts
  const labelCounts = MOCK_LABELS.map(label => {
    const count = leads.filter(lead => lead.labels.some(l => l.text === label.text)).length;
    return { ...label, count };
  }).filter(l => l.count > 0);

  return (
    <div className="bg-white border-b border-gray-200">
      <div className="px-4 py-3 sm:px-6 flex items-center justify-end">
        {/* Active Filter Visibility when closed */}
        {!isOpen && activeFilter && (
          <div className="mr-4 flex items-center text-sm">
            <span className="text-gray-500 mr-2">Showing:</span>
            <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-bold bg-blue-100 text-blue-800 border border-blue-200">
              {activeFilter}
              <button 
                onClick={(e) => { e.stopPropagation(); onFilterChange(null); }}
                className="ml-1.5 hover:text-blue-900 focus:outline-none"
              >
                <X className="w-3 h-3" />
              </button>
            </span>
          </div>
        )}

        <button 
          onClick={() => setIsOpen(true)}
          className={`flex items-center px-4 py-2 border rounded-md text-sm font-bold transition-all shadow-sm ${
            isOpen || activeFilter 
              ? 'bg-blue-600 text-white border-blue-700 hover:bg-blue-700' 
              : 'bg-white text-gray-700 border-gray-300 hover:bg-gray-50'
          }`}
        >
          <Filter className={`w-4 h-4 mr-2 ${isOpen || activeFilter ? 'text-blue-100' : 'text-gray-500'}`} />
          Filters
          {activeFilter && (
            <span className="ml-2 bg-blue-800 text-white py-0.5 px-2 rounded-full text-[11px]">
              1 Active
            </span>
          )}
        </button>
      </div>

      {/* Popup Modal for Filters */}
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-gray-900/50 backdrop-blur-sm">
          <div className="bg-white rounded-xl shadow-2xl w-full max-w-lg overflow-hidden flex flex-col max-h-full">
            
            {/* Modal Header */}
            <div className="px-6 py-4 border-b border-gray-200 flex items-center justify-between bg-gray-50/50">
              <h3 className="text-lg font-extrabold text-gray-900 flex items-center">
                <Filter className="w-5 h-5 mr-2 text-blue-600" />
                More Filters
              </h3>
              <button 
                onClick={() => setIsOpen(false)}
                className="text-gray-400 hover:text-gray-600 p-1 rounded-md hover:bg-gray-100 transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Modal Body */}
            <div className="p-6 overflow-y-auto space-y-5">
              
              {/* Source Mock Filter */}
              <div>
                <label className="block text-sm font-bold text-gray-700 mb-1.5">Source</label>
                <div className="relative">
                  <MapPin className="absolute left-3 top-2.5 h-4 w-4 text-gray-400" />
                  <select className="pl-10 w-full bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500 block p-2.5 shadow-sm">
                    <option>All Sources</option>
                    <option>Meta Ads</option>
                    <option>Google Ads</option>
                    <option>Referral</option>
                  </select>
                </div>
              </div>

              {/* Date Range Mock Filter */}
              <div>
                <label className="block text-sm font-bold text-gray-700 mb-1.5">Date Range</label>
                <div className="relative">
                  <Calendar className="absolute left-3 top-2.5 h-4 w-4 text-gray-400" />
                  <select className="pl-10 w-full bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500 block p-2.5 shadow-sm">
                    <option>Any Time</option>
                    <option>Today</option>
                    <option>Last 7 Days</option>
                    <option>Last 30 Days</option>
                  </select>
                </div>
              </div>
              
              {/* Search Mock Filter */}
              <div>
                <label className="block text-sm font-bold text-gray-700 mb-1.5">Search Keywords</label>
                <div className="relative">
                  <Search className="absolute left-3 top-2.5 h-4 w-4 text-gray-400" />
                  <input type="text" placeholder="Search by name, phone, or keyword..." className="pl-10 w-full bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500 block p-2.5 shadow-sm" />
                </div>
              </div>

              {/* Status Labels Filter */}
              <div>
                <label className="block text-sm font-bold text-gray-700 mb-2">Lead Status (Active)</label>
                <div className="flex flex-wrap gap-2">
                  {labelCounts.map((label, idx) => {
                    const Icon = label.icon;
                    const isActive = activeFilter === label.text;
                    return (
                      <button
                        key={idx}
                        onClick={() => onFilterChange(isActive ? null : label.text)}
                        className={`inline-flex items-center px-3 py-1.5 rounded-full text-xs font-bold border transition-colors ${
                          isActive 
                            ? 'bg-blue-600 text-white border-blue-700 shadow-sm' 
                            : 'bg-white text-gray-700 border-gray-300 hover:bg-gray-50'
                        }`}
                      >
                        <Icon className={`w-3.5 h-3.5 mr-1.5 ${isActive ? 'text-blue-100' : 'text-gray-400'}`} />
                        {label.text}
                        <span className={`ml-1.5 px-1.5 py-0.5 rounded-full text-[10px] ${
                          isActive ? 'bg-blue-800 text-blue-100' : 'bg-gray-100 text-gray-500'
                        }`}>
                          {label.count}
                        </span>
                      </button>
                    );
                  })}
                </div>
              </div>
            </div>

            {/* Modal Footer */}
            <div className="px-6 py-4 border-t border-gray-200 bg-gray-50 flex items-center justify-between">
              <button 
                onClick={() => {
                  onFilterChange(null);
                }}
                className="text-sm font-bold text-gray-600 hover:text-gray-900 px-4 py-2"
              >
                Clear All
              </button>
              <button 
                onClick={() => setIsOpen(false)}
                className="bg-blue-600 hover:bg-blue-700 text-white text-sm font-bold px-6 py-2 rounded-md shadow-sm transition-colors"
              >
                Apply Filters
              </button>
            </div>

          </div>
        </div>
      )}
    </div>
  );
}
