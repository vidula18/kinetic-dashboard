import { Filter } from 'lucide-react';
import { LabelPill } from './LabelPill';
import { MOCK_ALERTS } from '../data/mockAlerts';

interface AIAlertsTableProps {
  onNavigateToLead?: (leadName: string) => void;
}

export function AIAlertsTable({ onNavigateToLead }: AIAlertsTableProps) {
  return (
    <section className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden mx-4 sm:mx-6 lg:mx-8 mb-8 mt-6">
      <div className="px-6 py-5 border-b border-gray-200 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <h2 className="text-lg font-semibold text-gray-900">AI Alerts (past 30 days)</h2>
          <span className="bg-blue-100 text-blue-700 py-0.5 px-2.5 rounded-full text-xs font-medium">10</span>
        </div>
        <div className="flex items-center gap-2">
          <button className="flex items-center px-3 py-1.5 border border-gray-300 rounded-md text-sm font-medium text-gray-700 bg-white hover:bg-gray-50">
            <Filter className="w-4 h-4 mr-2 text-gray-400" /> Filter (5)
          </button>
          <button className="flex items-center px-3 py-1.5 border border-gray-300 rounded-md text-sm font-medium text-gray-700 bg-white hover:bg-gray-50">
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
              <th scope="col" className="px-6 py-3 text-left text-xs font-extrabold text-gray-700 uppercase tracking-wider w-[45%]">AI Insight</th>
              <th scope="col" className="px-6 py-3 text-right text-xs font-extrabold text-gray-700 uppercase tracking-wider w-[20%]">Date of Alert</th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {MOCK_ALERTS.map((alert) => (
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
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 font-medium text-right">
                  {alert.date}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </section>
  );
}
