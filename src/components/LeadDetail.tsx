import type { Lead } from '../data/mockLeads';
import { LabelPill } from './LabelPill';
import { PrimaryActionButton } from './PrimaryActionButton';
import { formatDistanceToNow } from 'date-fns';
import { Phone, Calendar, Clock, Briefcase, Activity } from 'lucide-react';

interface LeadDetailProps {
  lead: Lead | null;
}

export function LeadDetail({ lead }: LeadDetailProps) {
  if (!lead) {
    return (
      <div className="flex-1 flex items-center justify-center bg-gray-50 p-8 text-center">
        <div className="max-w-md">
          <div className="w-16 h-16 bg-gray-200 rounded-full flex items-center justify-center mx-auto mb-4">
            <Activity className="w-8 h-8 text-gray-400" />
          </div>
          <h2 className="text-xl font-bold text-gray-900 mb-2">No Lead Selected</h2>
          <p className="text-gray-500">Select a lead from the queue on the left to view their detailed information and AI insights.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="flex-1 flex flex-col bg-gray-50 overflow-y-auto relative">
      {/* Header Area */}
      <div className="bg-white px-8 py-6 border-b border-gray-200 sticky top-0 z-10">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
          <div>
            <h2 className="text-2xl font-extrabold text-gray-900 mb-1">{lead.name}</h2>
            <div className="flex items-center text-sm text-gray-500 gap-3">
              <span className="flex items-center"><Phone className="w-4 h-4 mr-1.5" /> {lead.phone}</span>
              <span className="text-gray-300">•</span>
              <span className="flex items-center"><Briefcase className="w-4 h-4 mr-1.5" /> {lead.source}</span>
              <span className="text-gray-300">•</span>
              <span className="flex items-center"><Clock className="w-4 h-4 mr-1.5" /> {formatDistanceToNow(lead.timeReceived, { addSuffix: true })}</span>
            </div>
          </div>
          
          <PrimaryActionButton label={lead.actionRequired} />
        </div>

        <div className="mt-5 flex flex-wrap gap-2">
          {lead.labels.map((label, idx) => {
            const Icon = label.icon;
            return (
              <LabelPill key={idx} color={label.color}>
                <Icon className="w-3.5 h-3.5 mr-1.5" />
                {label.text}
              </LabelPill>
            );
          })}
        </div>
      </div>

      {/* Content Workspace */}
      <div className="p-8 max-w-4xl">
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 mb-6">
          <h3 className="text-sm font-bold text-gray-900 uppercase tracking-wider mb-4 flex items-center">
            <Activity className="w-4 h-4 mr-2 text-blue-600" /> 
            AI Insight & Context
          </h3>
          <div className="text-[15px] leading-relaxed text-gray-700 whitespace-pre-wrap">
            {lead.aiInsight}
          </div>
        </div>

        {/* Mock additional sections to show scrolling capability if needed */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <h3 className="text-sm font-bold text-gray-900 uppercase tracking-wider mb-4 flex items-center">
            <Calendar className="w-4 h-4 mr-2 text-blue-600" /> 
            Interaction History
          </h3>
          <div className="space-y-4">
            <div className="flex items-start">
              <div className="flex-shrink-0 w-2 h-2 mt-2 rounded-full bg-blue-500"></div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-900">Lead Captured</p>
                <p className="text-sm text-gray-500">{formatDistanceToNow(lead.timeReceived, { addSuffix: true })} via {lead.source}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
