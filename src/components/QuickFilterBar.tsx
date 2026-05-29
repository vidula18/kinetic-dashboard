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
      <div className="px-4 py-3 sm:px-6 flex items-center">
        <button 
          onClick={() => setIsOpen(!isOpen)}
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
        
        {/* Active Filter Visibility when closed */}
        {!isOpen && activeFilter && (
          <div className="ml-4 flex items-center text-sm">
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
      </div>

      <div 
        className={`overflow-hidden transition-all duration-300 ease-in-out ${
          isOpen ? 'max-h-[500px] border-t border-gray-100' : 'max-h-0'
        }`}
      >
        <div className="p-4 sm:px-6 bg-gray-50 flex flex-col gap-4">
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {/* Source Mock Filter */}
            <div>
              <label className="block text-xs font-bold text-gray-700 mb-1">Source</label>
              <div className="relative">
                <MapPin className="absolute left-2.5 top-2.5 h-4 w-4 text-gray-400" />
                <select className="pl-9 w-full bg-white border border-gray-300 text-gray-900 text-sm rounded-md focus:ring-blue-500 focus:border-blue-500 block p-2 shadow-sm">
                  <option>All Sources</option>
                  <option>Meta Ads</option>
                  <option>Google Ads</option>
                  <option>Referral</option>
                </select>
              </div>
            </div>

            {/* Date Range Mock Filter */}
            <div>
              <label className="block text-xs font-bold text-gray-700 mb-1">Date Range</label>
              <div className="relative">
                <Calendar className="absolute left-2.5 top-2.5 h-4 w-4 text-gray-400" />
                <select className="pl-9 w-full bg-white border border-gray-300 text-gray-900 text-sm rounded-md focus:ring-blue-500 focus:border-blue-500 block p-2 shadow-sm">
                  <option>Any Time</option>
                  <option>Today</option>
                  <option>Last 7 Days</option>
                  <option>Last 30 Days</option>
                </select>
              </div>
            </div>
            
            {/* Search Mock Filter */}
            <div className="lg:col-span-2">
              <label className="block text-xs font-bold text-gray-700 mb-1">Search Keywords</label>
              <div className="relative">
                <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-gray-400" />
                <input type="text" placeholder="Search by name, phone, or keyword..." className="pl-9 w-full bg-white border border-gray-300 text-gray-900 text-sm rounded-md focus:ring-blue-500 focus:border-blue-500 block p-2 shadow-sm" />
              </div>
            </div>
          </div>

          <div>
            <label className="block text-xs font-bold text-gray-700 mb-2 mt-2">Lead Labels</label>
            <div className="flex flex-wrap gap-2.5">
              <button 
                onClick={() => onFilterChange(null)}
                className={`px-3 py-1.5 rounded-full text-xs font-bold border transition-colors shadow-sm ${
                  activeFilter === null 
                    ? 'bg-gray-900 text-white border-gray-900' 
                    : 'bg-white text-gray-600 border-gray-300 hover:bg-gray-100 hover:text-gray-900'
                }`}
              >
                All Leads ({leads.length})
              </button>
              {labelCounts.map(label => {
                const Icon = label.icon;
                const isActive = activeFilter === label.text;
                return (
                  <button
                    key={label.text}
                    onClick={() => onFilterChange(isActive ? null : label.text)}
                    className={`flex items-center px-3 py-1.5 rounded-full text-xs font-bold border transition-all shadow-sm ${
                      isActive
                        ? 'bg-blue-600 text-white border-blue-700 ring-2 ring-blue-500 ring-offset-1'
                        : 'bg-white text-gray-700 border-gray-300 hover:bg-gray-100'
                    }`}
                  >
                    <Icon className={`w-3.5 h-3.5 mr-1.5 ${isActive ? 'opacity-100 text-blue-100' : 'opacity-70 text-gray-500'}`} />
                    {label.text}
                    <span className={`ml-1.5 px-1.5 py-0.5 rounded-full text-[10px] font-black ${
                      isActive ? 'bg-blue-800 text-white' : 'bg-gray-100 text-gray-600'
                    }`}>
                      {label.count}
                    </span>
                  </button>
                );
              })}
            </div>
          </div>

          <div className="flex justify-end gap-2 mt-4 pt-4 border-t border-gray-200">
            <button 
              onClick={() => {
                onFilterChange(null);
                setIsOpen(false);
              }}
              className="px-4 py-2 text-sm font-bold text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50 flex items-center shadow-sm"
            >
              <X className="w-4 h-4 mr-1" />
              Clear Filters
            </button>
            <button 
              onClick={() => setIsOpen(false)}
              className="px-4 py-2 text-sm font-bold text-white bg-blue-600 border border-transparent rounded-md hover:bg-blue-700 shadow-sm"
            >
              Apply Filters
            </button>
          </div>

        </div>
      </div>
    </div>
  );
}
