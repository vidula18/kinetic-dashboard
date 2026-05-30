import type { Lead } from '../data/mockLeads';
import { formatDistanceToNow } from 'date-fns';
import { ChevronRight } from 'lucide-react';

interface LeadItemProps {
  lead: Lead;
  isSelected: boolean;
  onClick: () => void;
  isCompact?: boolean;
}

export function LeadItem({ lead, isSelected, onClick, isCompact }: LeadItemProps) {
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
      className={`${isCompact ? 'p-2' : 'p-3'} rounded-lg border transition-all duration-200 cursor-pointer flex flex-col justify-center h-full relative overflow-hidden ${
        isSelected 
          ? (lead.isFresh 
              ? 'bg-yellow-50 border-y-yellow-400 border-r-yellow-400 border-l-[4px] border-l-yellow-600 shadow-md'
              : 'bg-blue-50 border-y-blue-300 border-r-blue-300 border-l-[4px] border-l-blue-600 shadow-md')
          : lead.isFresh
            ? 'bg-yellow-50/30 border-yellow-100 hover:shadow-md hover:border-yellow-200 border-l-[4px] border-l-yellow-300'
            : 'bg-white border-gray-200 hover:shadow-md hover:border-gray-300 border-l-[4px] border-l-transparent'
      }`}
    >
      {isSelected && (
        <div className={`absolute right-1 top-1/2 -translate-y-1/2 ${lead.isFresh ? 'text-yellow-600' : 'text-blue-600'}`}>
          <ChevronRight className="w-4 h-4" />
        </div>
      )}

      <div className={`flex items-center gap-2.5 ${isSelected ? 'pr-5' : ''}`}>
        {/* Avatar */}
        <div className={`flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center font-bold text-xs ${isSelected ? (lead.isFresh ? 'bg-yellow-500 text-white shadow-sm' : 'bg-blue-600 text-white shadow-sm') : lead.isFresh ? 'bg-yellow-50 text-yellow-600 border border-yellow-100' : 'bg-gray-100 text-gray-600 border border-gray-200'}`}>
          {initials}
        </div>
        
        <div className="flex-1 min-w-0 flex flex-col justify-center">
          {/* Top Row: Name */}
          <h3 className={`font-bold text-[14px] leading-tight mb-1 break-words pr-2 ${isSelected ? (lead.isFresh ? 'text-yellow-900' : 'text-blue-900') : 'text-gray-900'}`}>
            {lead.name}
          </h3>
          
          {/* Middle Row: Label and Time */}
          <div className="flex items-center gap-2 mb-1.5 overflow-hidden">
            <span className={`inline-flex items-center px-1.5 py-0.5 rounded text-[9px] font-bold uppercase tracking-wide whitespace-nowrap flex-shrink-0 ${colorStyles[primaryLabel.color]}`}>
              <Icon className="w-2.5 h-2.5 mr-1 flex-shrink-0 opacity-80" />
              {primaryLabel.text}
            </span>
            {lead.isFresh && !isSelected && (
              <span className="inline-flex items-center px-1.5 py-0.5 rounded text-[9px] font-bold uppercase tracking-wide whitespace-nowrap flex-shrink-0 bg-yellow-50 text-yellow-600 border border-yellow-100">
                FRESH
              </span>
            )}
            <div className="flex-1"></div>
            <span className={`text-[10px] font-medium whitespace-nowrap truncate flex-shrink-0 text-gray-400`}>
              {formatDistanceToNow(lead.timeReceived, { addSuffix: true })}
            </span>
          </div>
          
          {/* Bottom Row: Phone (hidden if compact) */}
          {!isCompact && (
            <span className="text-[11px] text-gray-500 font-medium truncate flex items-center">
              {lead.phone}
            </span>
          )}
        </div>
      </div>
    </div>
  );
}
