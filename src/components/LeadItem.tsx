
import type { Lead } from '../data/mockLeads';
import { formatDistanceToNow } from 'date-fns';

interface LeadItemProps {
  lead: Lead;
  isSelected: boolean;
  onClick: () => void;
}

export function LeadItem({ lead, isSelected, onClick }: LeadItemProps) {
  // Use the primary label for the queue item to save space
  const primaryLabel = lead.labels[0];
  const Icon = primaryLabel.icon;

  const colorStyles = {
    green: 'text-green-700',
    orange: 'text-orange-700',
    blue: 'text-blue-700',
    gray: 'text-gray-700',
  };

  return (
    <div 
      onClick={onClick}
      className={`border-b border-gray-100 p-4 cursor-pointer transition-colors ${
        isSelected 
          ? 'bg-blue-50 border-l-4 border-l-blue-600' 
          : 'bg-white hover:bg-gray-50 border-l-4 border-l-transparent'
      }`}
    >
      <div className="flex justify-between items-start mb-1">
        <h3 className={`font-bold text-[16px] truncate ${isSelected ? 'text-blue-900' : 'text-gray-900'}`}>
          {lead.name}
        </h3>
        <span className="text-[12px] text-gray-400 whitespace-nowrap ml-2">
          {formatDistanceToNow(lead.timeReceived, { addSuffix: true })}
        </span>
      </div>
      
      <div className="flex items-center text-sm text-gray-500 mb-2">
        <span className="truncate">{lead.source}</span>
        <span className="mx-1.5 text-gray-300">•</span>
        <span className="font-mono text-[13px] text-gray-400 truncate">{lead.phone}</span>
      </div>

      <div className={`inline-flex items-center text-[13px] font-medium ${colorStyles[primaryLabel.color]}`}>
        <Icon className="w-4 h-4 mr-1.5 opacity-80" />
        {primaryLabel.text}
      </div>
    </div>
  );
}
