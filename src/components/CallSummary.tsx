import { useState } from 'react';
import { CheckCircle2, XCircle, Clock } from 'lucide-react';
import type { Lead } from '../data/mockLeads';

interface CallSummaryProps {
  lead: Lead;
  onClose: () => void;
}

export function CallSummary({ lead, onClose }: CallSummaryProps) {
  const [covered, setCovered] = useState("• Established primary fitness goal\n• Asked about past injuries\n• Offered assessment slots\n• Confirmed online/offline preference");
  const [missed, setMissed] = useState("• Did not establish urgency / timeline");
  const [summary, setSummary] = useState("Good initial call. Client is interested in personal training for rehabilitation. Needs a follow-up after their doctor's appointment next week.");

  return (
    <div className="flex-1 flex flex-col items-center justify-center bg-gray-50 p-6">
      <div className="max-w-4xl w-full bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden animate-in fade-in zoom-in duration-300">
        <div className="bg-blue-600 px-6 py-4 text-white text-center flex items-center justify-center gap-3">
          <div className="w-8 h-8 bg-white/20 rounded-full flex items-center justify-center backdrop-blur-sm">
            <CheckCircle2 className="w-5 h-5 text-white" />
          </div>
          <h2 className="text-xl font-extrabold tracking-wide">Call Finished with {lead.name}</h2>
        </div>

        <div className="p-6">
          <div className="flex items-center justify-center gap-8 mb-6 border-b border-gray-100 pb-6">
            <div className="text-center">
              <div className="text-2xl font-black text-gray-900 mb-1">02:45</div>
              <div className="text-[10px] font-bold text-gray-400 uppercase tracking-wider flex items-center justify-center">
                <Clock className="w-3 h-3 mr-1" /> Duration
              </div>
            </div>
            <div className="w-px h-8 bg-gray-200" />
            <div className="text-center">
              <div className="text-2xl font-black text-green-600 mb-1">4</div>
              <div className="text-[10px] font-bold text-gray-400 uppercase tracking-wider flex items-center justify-center">
                <CheckCircle2 className="w-3 h-3 mr-1" /> Qs Asked
              </div>
            </div>
            <div className="w-px h-8 bg-gray-200" />
            <div className="text-center">
              <div className="text-2xl font-black text-red-500 mb-1">1</div>
              <div className="text-[10px] font-bold text-gray-400 uppercase tracking-wider flex items-center justify-center">
                <XCircle className="w-3 h-3 mr-1" /> Qs Missed
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
            <div className="flex flex-col h-full">
              <h4 className="text-[11px] font-bold text-gray-900 uppercase tracking-wider mb-2 flex items-center">
                <CheckCircle2 className="w-3.5 h-3.5 mr-1.5 text-green-500" /> Questions Covered
              </h4>
              <textarea 
                value={covered}
                onChange={(e) => setCovered(e.target.value)}
                className="w-full flex-1 p-3 text-sm text-gray-700 bg-gray-50 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all resize-none min-h-[100px]"
              />
            </div>
            <div className="flex flex-col h-full">
              <h4 className="text-[11px] font-bold text-gray-900 uppercase tracking-wider mb-2 flex items-center">
                <XCircle className="w-3.5 h-3.5 mr-1.5 text-red-500" /> Missed Points
              </h4>
              <textarea 
                value={missed}
                onChange={(e) => setMissed(e.target.value)}
                className="w-full flex-1 p-3 text-sm text-red-800 bg-red-50/50 border border-red-100 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-red-500 transition-all resize-none min-h-[100px]"
              />
            </div>
            <div className="flex flex-col h-full">
              <h4 className="text-[11px] font-bold text-gray-900 uppercase tracking-wider mb-2 flex items-center">
                Overall Summary
              </h4>
              <textarea 
                value={summary}
                onChange={(e) => setSummary(e.target.value)}
                className="w-full flex-1 p-3 text-sm text-gray-800 bg-blue-50/30 border border-blue-100 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all resize-none min-h-[100px]"
                placeholder="Write a brief summary of the call..."
              />
            </div>
          </div>

          <button 
            onClick={onClose}
            className="w-full py-3.5 bg-gray-900 text-white rounded-lg font-bold hover:bg-black active:scale-[0.99] transition-all shadow-sm flex items-center justify-center gap-2"
          >
            Save & Return to Dashboard
          </button>
        </div>
      </div>
    </div>
  );
}
