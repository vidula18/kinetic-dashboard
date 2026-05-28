import { useState } from 'react';
import { ChevronDown, Users } from 'lucide-react';
import { formatDistanceToNow } from 'date-fns';
import type { Lead } from '../data/mockLeads';

interface FreshLeadsTableProps {
  leads: Lead[];
}

export function FreshLeadsTable({ leads }: FreshLeadsTableProps) {
  const [showAllLeads, setShowAllLeads] = useState(false);

  const visibleLeads = showAllLeads ? leads : leads.slice(0, 3);

  return (
    <section className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden mb-6 mx-4 sm:mx-6 lg:mx-8">
      <div className="px-6 py-5 border-b border-gray-200">
        <div className="flex items-center justify-between">
          <h2 className="text-lg font-semibold text-gray-900">Today's Fresh Leads</h2>
          <span className="bg-blue-100 text-blue-700 py-1 px-3 rounded-full text-sm font-medium">
            {leads.length} New
          </span>
        </div>

      </div>

      {/* Table Layout */}
      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Lead</th>
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
                <td className="px-6 py-3 whitespace-nowrap text-right text-sm text-gray-500">
                  {formatDistanceToNow(lead.timeReceived, { addSuffix: true })}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Progressive Disclosure Footer */}
      {!showAllLeads && leads.length > 3 && (
        <div className="bg-gray-50 px-6 py-3 border-t border-gray-200 flex justify-center">
          <button 
            onClick={() => setShowAllLeads(true)}
            className="text-sm font-medium text-blue-600 hover:text-blue-800 flex items-center bg-white px-4 py-2 rounded-md shadow-sm border border-gray-200"
          >
            View All ({leads.length}) <ChevronDown className="ml-1 w-4 h-4" />
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
