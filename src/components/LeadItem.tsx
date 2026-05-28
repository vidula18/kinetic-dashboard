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
    green: 'bg-green-100 text-green-700',
    orange: 'bg-orange-100 text-orange-700',
    blue: 'bg-blue-100 text-blue-700',
    gray: 'bg-gray-100 text-gray-700',
  };

  // Extract initials for the avatar
  const initials = lead.name.split(' ').map(n => n[0]).join('').substring(0, 2).toUpperCase();

  return (
    <div 
      onClick={onClick}
      className={`p-3.5 mb-3 rounded-lg border transition-all duration-200 cursor-pointer ${
        isSelected 
          ? 'bg-blue-50 border-blue-500 shadow-sm' 
          : 'bg-white border-gray-200 hover:shadow-md hover:border-gray-300'
      }`}
    >
      <div className="flex items-start gap-3">
        {/* Avatar */}
        <div className={`flex-shrink-0 w-10 h-10 rounded-full flex items-center justify-center font-bold text-sm ${isSelected ? 'bg-blue-600 text-white' : 'bg-gray-100 text-gray-600'}`}>
          {initials}
        </div>
        
        <div className="flex-1 min-w-0">
          {/* Top Row: Name */}
          <div className="flex justify-between items-center mb-1.5">
            <h3 className={`font-bold text-[16px] truncate ${isSelected ? 'text-blue-900' : 'text-gray-900'}`}>
              {lead.name}
            </h3>
            {isSelected && (
              <span className="w-2 h-2 rounded-full bg-blue-500"></span>
            )}
          </div>
          
          {/* Middle Row: Label + Time */}
          <div className="flex items-center gap-2 mb-2 flex-wrap">
            <span className={`inline-flex items-center px-2 py-0.5 rounded text-[11px] font-semibold ${colorStyles[primaryLabel.color]}`}>
              <Icon className="w-3 h-3 mr-1 opacity-80" />
              {primaryLabel.text}
            </span>
            <span className="text-[12px] text-gray-400 whitespace-nowrap">
              {formatDistanceToNow(lead.timeReceived, { addSuffix: true })}
            </span>
          </div>

          {/* Bottom Row: Phone */}
          <div className="text-[13px] text-gray-500 font-medium">
            📞 {lead.phone}
          </div>
        </div>
      </div>
    </div>
  );
}
