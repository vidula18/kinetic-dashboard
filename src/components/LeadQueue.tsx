
import type { Lead } from '../data/mockLeads';
import { LeadItem } from './LeadItem';

interface LeadQueueProps {
  leads: Lead[];
  selectedLeadId: string | null;
  onSelectLead: (id: string) => void;
}

export function LeadQueue({ leads, selectedLeadId, onSelectLead }: LeadQueueProps) {
  if (leads.length === 0) {
    return (
      <div className="flex-1 flex items-center justify-center bg-white border-r border-gray-200">
        <p className="text-gray-500 text-sm">No leads match the selected filter.</p>
      </div>
    );
  }

  return (
    <div className="flex-1 overflow-y-auto bg-white border-r border-gray-200">
      {leads.map((lead) => (
        <LeadItem 
          key={lead.id} 
          lead={lead} 
          isSelected={lead.id === selectedLeadId} 
          onClick={() => onSelectLead(lead.id)} 
        />
      ))}
    </div>
  );
}
