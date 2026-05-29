import { useState } from 'react';
import { ChevronDown, Users } from 'lucide-react';
import { formatDistanceToNow } from 'date-fns';
import type { Lead } from '../data/mockLeads';

interface FreshLeadsTableProps {
  leads: Lead[];
  onNavigateToLead?: (leadName: string) => void;
}

export function FreshLeadsTable({ leads, onNavigateToLead }: FreshLeadsTableProps) {
  const [showAllLeads, setShowAllLeads] = useState(false);

  const visibleLeads = showAllLeads ? leads : leads.slice(0, 3);

  return (
    <section className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden mb-6 mx-4 sm:mx-6 lg:mx-8">
      <div className="px-6 py-5 border-b border-gray-200">
        <div className="flex items-center justify-between">
          <h2 className="text-lg font-extrabold text-gray-900">Today's Fresh Leads</h2>
          <span className="bg-blue-100 text-blue-700 py-1 px-3 rounded-full text-sm font-medium">
            {leads.length} New
          </span>
        </div>

      </div>

      {/* Card Grid Layout */}
      <div className="p-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {visibleLeads.map((lead) => (
            <div 
              key={lead.id} 
              className={`bg-white rounded-lg border p-4 transition-all flex flex-col justify-between h-full relative overflow-hidden group ${onNavigateToLead ? 'cursor-pointer hover:shadow-md hover:border-gray-300 active:bg-blue-50 active:border-blue-300' : 'border-gray-200 hover:shadow-md'}`}
              onClick={() => onNavigateToLead && onNavigateToLead(lead.name)}
            >
              <div className="flex items-start justify-between mb-3">
                <div className="flex items-center">
                  <div className="flex-shrink-0 h-10 w-10 rounded-full bg-blue-50 flex items-center justify-center border border-blue-100 mr-3 group-active:bg-blue-100 group-active:border-blue-300 transition-colors">
                    <Users className="h-5 w-5 text-blue-500 group-active:text-blue-700" />
                  </div>
                  <div>
                    <h3 className="text-[15px] font-bold text-gray-900 group-active:text-blue-700 transition-colors leading-tight">
                      {lead.name}
                    </h3>
                    <div className="text-[12px] text-gray-500 group-active:text-blue-600/80 font-medium flex items-center gap-1.5 mt-0.5 transition-colors">
                      <span className="truncate">{lead.source}</span>
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="flex items-center justify-between mt-3 pt-3 border-t border-gray-100 group-active:border-blue-100 transition-colors">
                <span className="text-[12px] font-medium text-gray-500 group-active:text-blue-800 truncate mr-2 flex items-center transition-colors">
                   <span className="mr-1.5 opacity-60">📞</span> {lead.phone}
                </span>
                <span className="text-[11px] font-bold text-gray-400 group-active:text-blue-700 whitespace-nowrap bg-gray-50 group-active:bg-white group-active:border-blue-200 px-2 py-0.5 rounded-full border border-gray-100 shadow-sm transition-colors">
                  {formatDistanceToNow(lead.timeReceived, { addSuffix: true })}
                </span>
              </div>
            </div>
          ))}
        </div>
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
