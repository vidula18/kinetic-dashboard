
import type { LabelType } from '../data/labelConfig';
import { MOCK_LABELS } from '../data/labelConfig';
import type { Lead } from '../data/mockLeads';

interface QuickFilterBarProps {
  leads: Lead[];
  activeFilter: LabelType | null;
  onFilterChange: (filter: LabelType | null) => void;
}

export function QuickFilterBar({ leads, activeFilter, onFilterChange }: QuickFilterBarProps) {
  // Compute label counts
  const labelCounts = MOCK_LABELS.map(label => {
    const count = leads.filter(lead => lead.labels.some(l => l.text === label.text)).length;
    return { ...label, count };
  }).filter(l => l.count > 0);

  return (
    <div className="bg-white border-b border-gray-200 px-4 py-3 sm:px-6 flex flex-wrap gap-2 items-center">
      <span className="text-sm font-semibold text-gray-700 mr-2">Filters:</span>
      <button 
        onClick={() => onFilterChange(null)}
        className={`px-3 py-1.5 rounded-full text-xs font-medium border transition-colors ${
          activeFilter === null 
            ? 'bg-gray-800 text-white border-gray-800' 
            : 'bg-white text-gray-600 border-gray-300 hover:bg-gray-50'
        }`}
      >
        All Leads ({leads.length})
      </button>
      {labelCounts.map(label => {
        const Icon = label.icon;
        return (
          <button
            key={label.text}
            onClick={() => onFilterChange(activeFilter === label.text ? null : label.text)}
            className={`flex items-center px-3 py-1.5 rounded-full text-xs font-medium border transition-colors ${
              activeFilter === label.text
                ? 'ring-2 ring-blue-500 ring-offset-1 border-transparent'
                : 'bg-white border-gray-300 hover:bg-gray-50'
            }`}
          >
            <Icon className="w-3.5 h-3.5 mr-1.5 opacity-70" />
            {label.text}
            <span className="ml-1.5 bg-gray-100 px-1.5 py-0.5 rounded-full text-[10px] text-gray-600 font-bold">
              {label.count}
            </span>
          </button>
        );
      })}
    </div>
  );
}
