import { useState, useEffect } from 'react';
import type { Lead } from '../data/mockLeads';
import { LabelPill } from './LabelPill';
import { PrimaryActionButton } from './PrimaryActionButton';
import { formatDistanceToNow } from 'date-fns';
import { Phone, Calendar, Clock, Briefcase, Activity, Edit2, Save, X } from 'lucide-react';

interface LeadDetailProps {
  lead: Lead | null;
}

export function LeadDetail({ lead }: LeadDetailProps) {
  const [isEditing, setIsEditing] = useState(false);
  const [insightText, setInsightText] = useState("");
  const [leadRate, setLeadRate] = useState("Unrated");

  useEffect(() => {
    if (lead) {
      setInsightText(lead.aiInsight);
      setLeadRate("Unrated");
      setIsEditing(false);
    }
  }, [lead?.id]);

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

  const handleSave = () => {
    setIsEditing(false);
    // In a real app, you would save this via API
  };

  const renderStructuredInsight = (text: string) => {
    // Basic heuristic to split long paragraphs into structured parts
    const sentences = text.split('. ').filter(s => s.trim().length > 0).map(s => s.endsWith('.') ? s : s + '.');
    
    if (sentences.length <= 2) {
      return <p className="text-[15px] leading-relaxed text-gray-700 whitespace-pre-wrap">{text}</p>;
    }
    
    const context = sentences[0];
    const nextAction = sentences[sentences.length - 1];
    const details = sentences.slice(1, sentences.length - 1).join(' ');

    return (
      <div className="space-y-5">
        <div>
          <h4 className="text-xs font-bold text-gray-500 uppercase tracking-wider mb-1.5 flex items-center">
             Lead Context
          </h4>
          <p className="text-[15px] leading-relaxed text-gray-800 bg-gray-50/50 p-3 rounded-md border border-gray-100">{context}</p>
        </div>
        {details && (
          <div>
            <h4 className="text-xs font-bold text-gray-500 uppercase tracking-wider mb-1.5 flex items-center">
               Supporting Notes
            </h4>
            <p className="text-[15px] leading-relaxed text-gray-800 bg-gray-50/50 p-3 rounded-md border border-gray-100">{details}</p>
          </div>
        )}
        <div>
          <h4 className="text-xs font-bold text-gray-500 uppercase tracking-wider mb-1.5 flex items-center">
             Suggested Next Action
          </h4>
          <p className="text-[15px] leading-relaxed text-gray-900 font-medium bg-blue-50/50 p-3 rounded-md border border-blue-100">{nextAction}</p>
        </div>
      </div>
    );
  };

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
        
        {/* AI Insight & Context Card */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden mb-6">
          <div className="px-6 py-4 border-b border-gray-100 flex justify-between items-center bg-gray-50/30">
            <h3 className="text-sm font-bold text-gray-900 uppercase tracking-wider flex items-center">
              <Activity className="w-4 h-4 mr-2 text-blue-600" /> 
              AI Insight & Context
            </h3>
            
            {!isEditing && (
              <button 
                onClick={() => setIsEditing(true)} 
                className="text-xs font-bold text-gray-500 hover:text-blue-600 flex items-center px-2 py-1 rounded transition-colors"
              >
                <Edit2 className="w-3.5 h-3.5 mr-1" /> Edit
              </button>
            )}
          </div>
          
          <div className="p-6">
            {isEditing ? (
              <div className="space-y-3">
                <textarea
                  value={insightText}
                  onChange={(e) => setInsightText(e.target.value)}
                  className="w-full h-48 p-3 border border-blue-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-[15px] leading-relaxed text-gray-800"
                  placeholder="Enter insight details..."
                />
                <div className="flex justify-end gap-2">
                  <button 
                    onClick={() => {
                      setInsightText(lead.aiInsight);
                      setIsEditing(false);
                    }}
                    className="px-3 py-1.5 text-sm font-medium text-gray-600 hover:bg-gray-100 rounded-md flex items-center"
                  >
                    <X className="w-4 h-4 mr-1" /> Cancel
                  </button>
                  <button 
                    onClick={handleSave}
                    className="px-3 py-1.5 text-sm font-bold text-white bg-blue-600 hover:bg-blue-700 rounded-md flex items-center shadow-sm"
                  >
                    <Save className="w-4 h-4 mr-1.5" /> Save Changes
                  </button>
                </div>
              </div>
            ) : (
              renderStructuredInsight(insightText)
            )}

            {/* Sales Team Input Section */}
            <div className="mt-6 pt-5 border-t border-gray-100">
              <div className="flex items-center gap-4 bg-gray-50/50 p-3 rounded-lg border border-gray-200 inline-flex">
                <span className="text-sm font-bold text-gray-700">Sales Team Lead Rate:</span>
                <select 
                  value={leadRate}
                  onChange={(e) => setLeadRate(e.target.value)}
                  className="bg-white border border-gray-300 text-gray-900 text-sm font-medium rounded-md focus:ring-blue-500 focus:border-blue-500 p-1.5 px-3 shadow-sm cursor-pointer"
                >
                  <option value="Unrated">Unrated</option>
                  <option value="Hot">🔥 Hot</option>
                  <option value="Warm">☀️ Warm</option>
                  <option value="Cold">❄️ Cold</option>
                </select>
              </div>
            </div>
          </div>
        </div>

        {/* Interaction History */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <h3 className="text-sm font-bold text-gray-900 uppercase tracking-wider mb-4 flex items-center">
            <Calendar className="w-4 h-4 mr-2 text-blue-600" /> 
            Interaction History
          </h3>
          <div className="space-y-4">
            <div className="flex items-start relative pb-6 border-l-2 border-gray-200 ml-2">
              <div className="absolute w-3 h-3 rounded-full bg-blue-500 -left-[7px] top-1.5 ring-4 ring-white"></div>
              <div className="ml-6">
                <p className="text-sm font-bold text-gray-900">Lead Captured</p>
                <p className="text-sm text-gray-500 mt-0.5">{formatDistanceToNow(lead.timeReceived, { addSuffix: true })} via {lead.source}</p>
              </div>
            </div>
            <div className="flex items-start relative ml-2">
              <div className="absolute w-3 h-3 rounded-full bg-gray-300 -left-[7px] top-1.5 ring-4 ring-white"></div>
              <div className="ml-6">
                <p className="text-sm font-medium text-gray-500">Awaiting Contact</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
