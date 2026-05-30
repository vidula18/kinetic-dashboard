import { useState, useEffect } from 'react';
import type { Lead } from '../data/mockLeads';
import { PrimaryActionButton } from './PrimaryActionButton';
import { formatDistanceToNow } from 'date-fns';
import { Phone, Calendar, Clock, Briefcase, Activity, Edit2, Save, X, Star } from 'lucide-react';
import { MOCK_LABELS, type LabelType } from '../data/labelConfig';
import { LiveCallFlow } from './LiveCallFlow';
import { CallSummary } from './CallSummary';

interface LeadDetailProps {
  lead: Lead | null;
}

export function LeadDetail({ lead }: LeadDetailProps) {
  const [isEditing, setIsEditing] = useState(false);
  const [insightText, setInsightText] = useState("");
  const [rating, setRating] = useState(0);
  const [hoveredRating, setHoveredRating] = useState(0);
  const [selectedLabel, setSelectedLabel] = useState(lead?.labels[0]?.text || "Cold");
  const [callState, setCallState] = useState<'idle' | 'active' | 'summary'>('idle');

  useEffect(() => {
    if (lead) {
      setInsightText(lead.aiInsight);
      setRating(0);
      setHoveredRating(0);
      setSelectedLabel(lead.labels[0]?.text || "Cold");
      setIsEditing(false);
      setCallState('idle');
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

  if (callState === 'active') {
    return <LiveCallFlow lead={lead} onEndCall={() => setCallState('summary')} />;
  }

  if (callState === 'summary') {
    return <CallSummary lead={lead} onClose={() => setCallState('idle')} />;
  }

  const handleSave = () => {
    setIsEditing(false);
    // In a real app, you would save this via API
  };

  const renderMarkdown = (text: string) => {
    const parts = text.split(/(\*\*.*?\*\*)/g);
    return parts.map((part, index) => {
      if (part.startsWith('**') && part.endsWith('**')) {
        return <strong key={index} className="font-bold text-blue-900">{part.slice(2, -2)}</strong>;
      }
      return <span key={index}>{part}</span>;
    });
  };

  const renderStructuredInsight = (text: string) => {
    // Basic heuristic to split long paragraphs into structured parts
    const sentences = text.split('. ').filter(s => s.trim().length > 0).map(s => s.endsWith('.') ? s : s + '.');
    
    if (sentences.length <= 2) {
      return <p className="text-[15px] leading-relaxed text-gray-700 whitespace-pre-wrap">{renderMarkdown(text)}</p>;
    }
    
    const context = sentences[0];
    const nextAction = sentences[sentences.length - 1];
    const details = sentences.slice(1, sentences.length - 1).join(' ');

    return (
      <div className="space-y-3">
        <div>
          <h4 className="text-[11px] font-bold text-gray-500 uppercase tracking-wider mb-1 flex items-center">
             Lead Context
          </h4>
          <p className="text-sm leading-snug text-gray-800 bg-gray-50/50 p-2 rounded-md border border-gray-100">{renderMarkdown(context)}</p>
        </div>
        {details && !lead.isFresh && (
          <div>
            <h4 className="text-[11px] font-bold text-gray-500 uppercase tracking-wider mb-1 flex items-center">
               Supporting Notes
            </h4>
            <p className="text-sm leading-snug text-gray-800 bg-gray-50/50 p-2 rounded-md border border-gray-100">{renderMarkdown(details)}</p>
          </div>
        )}
        <div>
          <h4 className="text-[11px] font-bold text-gray-500 uppercase tracking-wider mb-1 flex items-center">
             Suggested Next Action
          </h4>
          <p className="text-sm leading-snug text-gray-900 font-medium bg-blue-50/50 p-2 rounded-md border border-blue-100">{renderMarkdown(nextAction)}</p>
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
          
          <PrimaryActionButton label="Start Call" onClick={() => setCallState('active')} />
        </div>

        <div className="mt-5 flex flex-col sm:flex-row sm:justify-between sm:items-center gap-4 border-t border-gray-100 pt-5">
          <div className="flex flex-wrap gap-2 items-center relative">
            {(() => {
              const currentLabelConfig = MOCK_LABELS.find(l => l.text === selectedLabel) || MOCK_LABELS[0];
              const Icon = currentLabelConfig.icon;
              return (
                <div className="relative inline-flex items-center">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <Icon className={`w-3.5 h-3.5 ${
                      currentLabelConfig.color === 'blue' ? 'text-blue-600' :
                      currentLabelConfig.color === 'green' ? 'text-green-600' :
                      currentLabelConfig.color === 'orange' ? 'text-orange-600' :
                      'text-gray-600'
                    }`} />
                  </div>
                  <select
                    value={selectedLabel}
                    onChange={(e) => setSelectedLabel(e.target.value as LabelType)}
                    className={`block w-full pl-8 pr-8 py-1.5 text-sm font-bold border-0 focus:outline-none focus:ring-2 focus:ring-blue-500 rounded-full shadow-sm cursor-pointer appearance-none ${
                      currentLabelConfig.color === 'blue' ? 'bg-blue-50 text-blue-700 ring-1 ring-inset ring-blue-600/20 hover:bg-blue-100' :
                      currentLabelConfig.color === 'green' ? 'bg-green-50 text-green-700 ring-1 ring-inset ring-green-600/20 hover:bg-green-100' :
                      currentLabelConfig.color === 'orange' ? 'bg-orange-50 text-orange-700 ring-1 ring-inset ring-orange-600/20 hover:bg-orange-100' :
                      'bg-gray-50 text-gray-700 ring-1 ring-inset ring-gray-600/20 hover:bg-gray-100'
                    }`}
                  >
                    {MOCK_LABELS.map((labelOption, idx) => (
                      <option key={idx} value={labelOption.text}>
                        {labelOption.text}
                      </option>
                    ))}
                  </select>
                  <div className="absolute inset-y-0 right-0 pr-2 flex items-center pointer-events-none">
                    <svg className={`h-4 w-4 ${
                      currentLabelConfig.color === 'blue' ? 'text-blue-500' :
                      currentLabelConfig.color === 'green' ? 'text-green-500' :
                      currentLabelConfig.color === 'orange' ? 'text-orange-500' :
                      'text-gray-500'
                    }`} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                      <path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" />
                    </svg>
                  </div>
                </div>
              );
            })()}
          </div>

          <div className="flex items-center gap-3 bg-gray-50 px-3 py-2 rounded-lg border border-gray-200">
            <span className="text-xs font-bold text-gray-600 uppercase tracking-wider">Lead Rate:</span>
            <div className="flex items-center gap-1">
              {[1, 2, 3, 4, 5].map((star) => (
                <button
                  key={star}
                  type="button"
                  onClick={() => setRating(star)}
                  onMouseEnter={() => setHoveredRating(star)}
                  onMouseLeave={() => setHoveredRating(0)}
                  className="focus:outline-none focus:scale-110 transition-transform"
                >
                  <Star 
                    className={`w-5 h-5 transition-colors ${
                      (hoveredRating ? star <= hoveredRating : star <= rating)
                        ? 'fill-yellow-400 text-yellow-400' 
                        : 'text-gray-300'
                    }`} 
                  />
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Content Workspace */}
      <div className="p-8 max-w-4xl">
        
        {/* AI Insight & Context Card */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden mb-6">
          <div className="px-6 py-4 border-b border-gray-100 flex justify-between items-center bg-gray-50/30">
            <h3 className="text-sm font-bold text-gray-900 uppercase tracking-wider flex items-center">
              <Activity className="w-4 h-4 mr-2 text-blue-600" /> 
              Insight & Context
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
                <p className="text-sm font-bold text-gray-900">Current Lead Captured</p>
                <p className="text-sm text-gray-500 mt-0.5">{formatDistanceToNow(lead.timeReceived, { addSuffix: true })} via {lead.source}</p>
              </div>
            </div>
            <div className="flex items-start relative pb-6 border-l-2 border-gray-200 ml-2">
              <div className="absolute w-3 h-3 rounded-full bg-gray-400 -left-[7px] top-1.5 ring-4 ring-white"></div>
              <div className="ml-6">
                <div className="flex items-center gap-2">
                  <p className="text-sm font-medium text-gray-700">Previous Interaction</p>
                  <span className="text-[9px] font-bold uppercase tracking-wider bg-orange-100 text-orange-700 px-1.5 py-0.5 rounded">Unseen</span>
                </div>
                <p className="text-sm text-gray-500 mt-0.5">1 month ago • Outbound Call</p>
              </div>
            </div>
            <div className="flex items-start relative ml-2">
              <div className="absolute w-3 h-3 rounded-full bg-gray-400 -left-[7px] top-1.5 ring-4 ring-white"></div>
              <div className="ml-6">
                <p className="text-sm font-medium text-gray-700">Initial Inquiry</p>
                <p className="text-sm text-gray-500 mt-0.5">1 year ago • Walk-in</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
