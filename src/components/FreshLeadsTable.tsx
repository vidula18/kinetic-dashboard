import { useState } from 'react';
import { ChevronDown, Users } from 'lucide-react';
import { formatDistanceToNow } from 'date-fns';
import { LabelPill } from './LabelPill';
import type { Lead } from '../data/mockLeads';
import type { LabelType } from '../data/labelConfig';
import { MOCK_LABELS } from '../data/labelConfig';

interface FreshLeadsTableProps {
  leads: Lead[];
}

export function FreshLeadsTable({ leads }: FreshLeadsTableProps) {
  const [showAllLeads, setShowAllLeads] = useState(false);
  const [activeFilter, setActiveFilter] = useState<LabelType | null>(null);

  // Compute label counts
  const labelCounts = MOCK_LABELS.map(label => {
    const count = leads.filter(lead => lead.labels.some(l => l.text === label.text)).length;
    return { ...label, count };
  }).filter(l => l.count > 0);

  const filteredLeads = activeFilter 
    ? leads.filter(lead => lead.labels.some(l => l.text === activeFilter))
    : leads;

  const visibleLeads = showAllLeads ? filteredLeads : filteredLeads.slice(0, 3);

  return (
    <section className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden mb-6 mx-4 sm:mx-6 lg:mx-8">
      <div className="px-6 py-5 border-b border-gray-200">
        <div className="flex items-center justify-between">
          <h2 className="text-lg font-semibold text-gray-900">Today's Fresh Leads</h2>
          <span className="bg-blue-100 text-blue-700 py-1 px-3 rounded-full text-sm font-medium">
            {leads.length} New
          </span>
        </div>

        {/* Quick Filter Bar */}
        <div className="mt-4 flex flex-wrap gap-2">
          <button 
            onClick={() => setActiveFilter(null)}
            className={`px-3 py-1.5 rounded-full text-xs font-medium border transition-colors ${
              activeFilter === null 
                ? 'bg-gray-800 text-white border-gray-800' 
                : 'bg-white text-gray-600 border-gray-300 hover:bg-gray-50'
            }`}
          >
            All
          </button>
          {labelCounts.map(label => {
            const Icon = label.icon;
            return (
              <button
                key={label.text}
                onClick={() => setActiveFilter(activeFilter === label.text ? null : label.text)}
                className={`flex items-center px-3 py-1.5 rounded-full text-xs font-medium border transition-colors ${
                  activeFilter === label.text
                    ? 'ring-2 ring-blue-500 ring-offset-1 border-transparent'
                    : 'bg-white border-gray-300 hover:bg-gray-50'
                }`}
              >
                <Icon className="w-3.5 h-3.5 mr-1.5 opacity-70" />
                {label.text}
                <span className="ml-1.5 bg-gray-100 px-1.5 py-0.5 rounded-full text-[10px] text-gray-600">
                  {label.count}
                </span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Table Layout */}
      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Lead</th>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status / Labels</th>
              <th scope="col" className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">Time Received</th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {visibleLeads.map((lead) => (
              <tr key={lead.id} className="hover:bg-gray-50 transition-colors group">
                <td className="px-6 py-3 whitespace-nowrap">
                  <div className="flex items-center">
                    <div className="flex-shrink-0 h-10 w-10 rounded-full bg-blue-50 flex items-center justify-center border border-blue-100">
                      <Users className="h-5 w-5 text-blue-500" />
                    </div>
                    <div className="ml-4">
                      <div className="text-sm font-bold text-gray-900 group-hover:text-blue-600 transition-colors">{lead.name}</div>
                      <div className="text-sm text-gray-500 flex items-center gap-2 mt-0.5">
                        <span>{lead.source}</span>
                        <span className="text-gray-300">•</span>
                        <span className="text-gray-400 font-mono text-xs">{lead.phone}</span>
                      </div>
                    </div>
                  </div>
                </td>
                <td className="px-6 py-3 whitespace-nowrap">
                  <div className="flex gap-2">
                    {lead.labels.map((label, idx) => {
                      const Icon = label.icon;
                      return (
                        <LabelPill key={idx} color={label.color}>
                          <Icon className="w-3 h-3 mr-1" />
                          {label.text}
                        </LabelPill>
                      );
                    })}
                  </div>
                </td>
                <td className="px-6 py-3 whitespace-nowrap text-right text-sm text-gray-500">
                  {formatDistanceToNow(lead.timeReceived, { addSuffix: true })}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Progressive Disclosure Footer */}
      {!showAllLeads && filteredLeads.length > 3 && (
        <div className="bg-gray-50 px-6 py-3 border-t border-gray-200 flex justify-center">
          <button 
            onClick={() => setShowAllLeads(true)}
            className="text-sm font-medium text-blue-600 hover:text-blue-800 flex items-center bg-white px-4 py-2 rounded-md shadow-sm border border-gray-200"
          >
            View All ({filteredLeads.length}) <ChevronDown className="ml-1 w-4 h-4" />
          </button>
        </div>
      )}
      {showAllLeads && (
        <div className="bg-gray-50 px-6 py-3 border-t border-gray-200 flex justify-center">
          <button 
            onClick={() => setShowAllLeads(false)}
            className="text-sm font-medium text-gray-600 hover:text-gray-900 flex items-center bg-white px-4 py-2 rounded-md shadow-sm border border-gray-200"
          >
            Show Less <ChevronDown className="ml-1 w-4 h-4 rotate-180" />
          </button>
        </div>
      )}
    </section>
  );
}
