import { CheckCircle2, XCircle, Clock } from 'lucide-react';
import type { Lead } from '../data/mockLeads';

interface CallSummaryProps {
  lead: Lead;
  onClose: () => void;
}

export function CallSummary({ lead, onClose }: CallSummaryProps) {
  return (
    <div className="flex-1 flex flex-col items-center justify-center bg-gray-50 p-8">
      <div className="max-w-2xl w-full bg-white rounded-2xl shadow-sm border border-gray-200 overflow-hidden animate-in fade-in zoom-in duration-300">
        <div className="bg-blue-600 px-8 py-6 text-white text-center">
          <div className="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center mx-auto mb-4 backdrop-blur-sm">
            <CheckCircle2 className="w-8 h-8 text-white" />
          </div>
          <h2 className="text-2xl font-extrabold tracking-wide mb-2">Call Finished</h2>
          <p className="text-blue-100 font-medium">Successfully logged interaction with {lead.name}</p>
        </div>

        <div className="p-8">
          <div className="flex items-center justify-center gap-8 mb-8 border-b border-gray-100 pb-8">
            <div className="text-center">
              <div className="text-3xl font-black text-gray-900 mb-1">02:45</div>
              <div className="text-[10px] font-bold text-gray-400 uppercase tracking-wider flex items-center justify-center">
                <Clock className="w-3 h-3 mr-1" /> Duration
              </div>
            </div>
            <div className="w-px h-12 bg-gray-200" />
            <div className="text-center">
              <div className="text-3xl font-black text-green-600 mb-1">4</div>
              <div className="text-[10px] font-bold text-gray-400 uppercase tracking-wider flex items-center justify-center">
                <CheckCircle2 className="w-3 h-3 mr-1" /> Qs Asked
              </div>
            </div>
            <div className="w-px h-12 bg-gray-200" />
            <div className="text-center">
              <div className="text-3xl font-black text-red-500 mb-1">1</div>
              <div className="text-[10px] font-bold text-gray-400 uppercase tracking-wider flex items-center justify-center">
                <XCircle className="w-3 h-3 mr-1" /> Qs Missed
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
            <div>
              <h4 className="text-xs font-bold text-gray-900 uppercase tracking-wider mb-4 flex items-center">
                <CheckCircle2 className="w-4 h-4 mr-2 text-green-500" /> Questions Covered
              </h4>
              <ul className="space-y-3">
                <li className="text-sm font-medium text-gray-600 flex items-start">
                  <span className="text-green-500 mr-2">✓</span> Established primary fitness goal
                </li>
                <li className="text-sm font-medium text-gray-600 flex items-start">
                  <span className="text-green-500 mr-2">✓</span> Asked about past injuries
                </li>
                <li className="text-sm font-medium text-gray-600 flex items-start">
                  <span className="text-green-500 mr-2">✓</span> Offered assessment slots
                </li>
                <li className="text-sm font-medium text-gray-600 flex items-start">
                  <span className="text-green-500 mr-2">✓</span> Confirmed online/offline preference
                </li>
              </ul>
            </div>
            <div>
              <h4 className="text-xs font-bold text-gray-900 uppercase tracking-wider mb-4 flex items-center">
                <XCircle className="w-4 h-4 mr-2 text-red-500" /> Missed Points
              </h4>
              <ul className="space-y-3 bg-red-50 p-4 rounded-lg border border-red-100">
                <li className="text-sm font-medium text-red-700 flex items-start">
                  <span className="text-red-500 mr-2">✗</span> Did not establish urgency / timeline
                </li>
              </ul>
            </div>
          </div>

          <button 
            onClick={onClose}
            className="w-full py-4 bg-gray-900 text-white rounded-xl font-bold hover:bg-black transition-colors shadow-sm"
          >
            Save & Return to Dashboard
          </button>
        </div>
      </div>
    </div>
  );
}
