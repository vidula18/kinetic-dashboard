import { useState, useEffect } from 'react';
import type { Lead } from '../data/mockLeads';
import { PhoneOff, Activity, Edit2 } from 'lucide-react';

interface LiveCallFlowProps {
  lead: Lead;
  onEndCall: () => void;
}

const MOCK_SCRIPT_STEPS = [
  "“Hi, am I speaking with [Name]?”",
  "“I saw you were looking into some fitness programs. What made you reach out today?”",
  "“Got it — and how old are they?”",
  "“Are you looking for something online or at a physical center?”",
  "“Great, let's go ahead and book an assessment slot for you.”"
];

export function LiveCallFlow({ lead, onEndCall }: LiveCallFlowProps) {
  const [seconds, setSeconds] = useState(0);
  const [scriptStep, setScriptStep] = useState(2); // Start at step 2 to match mockup "Got it..."
  const [notes, setNotes] = useState("");

  useEffect(() => {
    const interval = setInterval(() => {
      setSeconds(s => s + 1);
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  const formatTime = (totalSeconds: number) => {
    const m = Math.floor(totalSeconds / 60);
    const s = totalSeconds % 60;
    return `${m.toString().padStart(2, '0')}:${s.toString().padStart(2, '0')}`;
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

  return (
    <div className="flex-1 flex flex-col bg-white overflow-hidden relative">
      {/* Top Banner */}
      <div className="bg-red-500 text-white px-8 py-2 flex justify-between items-center shadow-md z-10 sticky top-0">
        <div className="flex items-center gap-4">
          <div className="flex items-center justify-center w-3 h-3 rounded-full bg-white animate-pulse">
            <div className="w-2 h-2 rounded-full bg-red-500"></div>
          </div>
          <h2 className="text-xl font-extrabold tracking-wide uppercase">Call Started</h2>
          <span className="text-xl font-medium tracking-widest font-mono bg-black/20 px-3 py-1 rounded-md ml-4">
            {formatTime(seconds)}
          </span>
        </div>
        <button 
          onClick={onEndCall}
          className="bg-white text-red-600 font-bold px-6 py-2 rounded-md shadow hover:bg-gray-50 flex items-center transition-colors"
        >
          <PhoneOff className="w-4 h-4 mr-2" />
          End Call
        </button>
      </div>

      <div className="flex-1 overflow-y-auto p-8 flex flex-col max-w-7xl mx-auto w-full">
        
        {/* Say This Next (Full Width) */}
        <div className="mb-10 text-center animate-in slide-in-from-bottom-2 fade-in duration-300 w-full">
            <h3 className="text-xs font-bold text-gray-400 uppercase tracking-[0.2em] mb-4">Say This Next</h3>
            <div className="text-3xl md:text-4xl font-extrabold text-blue-600 leading-tight">
              • {MOCK_SCRIPT_STEPS[scriptStep].replace('[Name]', lead.name.split(' ')[0])}
            </div>
            
            <div className="mt-6 flex justify-center gap-3">
              <button 
                onClick={() => setScriptStep(s => Math.max(0, s - 1))}
                disabled={scriptStep === 0}
                className="px-4 py-1.5 text-sm font-semibold text-gray-500 hover:text-gray-900 disabled:opacity-30 transition-colors"
              >
                Previous
              </button>
              <button 
                onClick={() => setScriptStep(s => Math.min(MOCK_SCRIPT_STEPS.length - 1, s + 1))}
                disabled={scriptStep === MOCK_SCRIPT_STEPS.length - 1}
                className="px-6 py-1.5 text-sm font-bold text-white bg-blue-500 rounded-full hover:bg-blue-600 disabled:opacity-50 transition-all shadow-sm hover:shadow"
              >
                Next Prompt
              </button>
            </div>
          </div>
        </div>

        {/* 2-Column Section */}
        <div className="flex flex-col lg:flex-row gap-12 w-full flex-1">
          
          {/* Left Column - Details & Notes */}
          <div className="flex-1 flex flex-col min-w-0">
            <div className="flex-1 grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
              {/* Details, Intent, and Pain */}
            <div>
              <h4 className="text-sm font-bold text-gray-900 border-b-2 border-gray-100 pb-2 mb-4">Details, Intent, and Pain</h4>
              <ul className="space-y-3">
                <li className="flex items-start gap-3">
                  <input type="checkbox" className="mt-1 w-4 h-4 text-blue-600 rounded border-gray-300 focus:ring-blue-500 cursor-pointer" />
                  <span className="text-sm font-medium text-gray-700 leading-relaxed">Establish the primary fitness goal (weight loss, strength, rehab).</span>
                </li>
                <li className="flex items-start gap-3">
                  <input type="checkbox" className="mt-1 w-4 h-4 text-blue-600 rounded border-gray-300 focus:ring-blue-500 cursor-pointer" />
                  <span className="text-sm font-medium text-gray-700 leading-relaxed">Ask about past injuries or existing conditions (PCOS, joint pain).</span>
                </li>
                <li className="flex items-start gap-3">
                  <input type="checkbox" className="mt-1 w-4 h-4 text-blue-600 rounded border-gray-300 focus:ring-blue-500 cursor-pointer" />
                  <span className="text-sm font-medium text-gray-700 leading-relaxed">Gauge urgency: Why are they starting now vs next month?</span>
                </li>
              </ul>
            </div>

            {/* Book Assessment */}
            <div>
              <h4 className="text-sm font-bold text-gray-900 border-b-2 border-gray-100 pb-2 mb-4">Book Assessment</h4>
              <ul className="space-y-3">
                <li className="flex items-start gap-3">
                  <input type="checkbox" className="mt-1 w-4 h-4 text-green-600 rounded border-gray-300 focus:ring-green-500 cursor-pointer" />
                  <span className="text-sm font-medium text-gray-700 leading-relaxed">Offer two specific slots (e.g., "Tomorrow at 9am or 4pm?").</span>
                </li>
                <li className="flex items-start gap-3">
                  <input type="checkbox" className="mt-1 w-4 h-4 text-green-600 rounded border-gray-300 focus:ring-green-500 cursor-pointer" />
                  <span className="text-sm font-medium text-gray-700 leading-relaxed">Confirm online vs. offline preference.</span>
                </li>
                <li className="flex items-start gap-3">
                  <input type="checkbox" className="mt-1 w-4 h-4 text-green-600 rounded border-gray-300 focus:ring-green-500 cursor-pointer" />
                  <span className="text-sm font-medium text-gray-700 leading-relaxed">Set expectation: "A trainer will call you via video."</span>
                </li>
              </ul>
            </div>
          </div>

        {/* Right Column - Context & Uncovered Points */}
        <div className="w-full lg:w-[400px] flex-shrink-0">
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden sticky top-4">
            <div className="px-5 py-3 border-b border-gray-100 bg-gray-50/50 flex items-center">
              <Activity className="w-4 h-4 mr-2 text-blue-600" />
              <h3 className="text-xs font-bold text-gray-900 uppercase tracking-wider">Insight & Context</h3>
            </div>
            
            <div className="p-5 space-y-6">
              
              {/* Context */}
              <div>
                <h4 className="text-[10px] font-bold text-gray-400 uppercase tracking-wider mb-2">Background</h4>
                <p className="text-sm text-gray-700 leading-snug">
                  {renderMarkdown(lead.aiInsight.split('. ')[0] + '.')}
                </p>
              </div>

              {/* Uncovered Points (Red) */}
              <div className="bg-red-50 border border-red-100 rounded-lg p-4">
                <h4 className="text-[10px] font-bold text-red-500 uppercase tracking-wider mb-2">Uncovered Points</h4>
                <ul className="space-y-2">
                  <li className="text-sm font-medium text-red-700 leading-snug">
                    • Exact availability for the assessment has not been verified yet.
                  </li>
                  <li className="text-sm font-medium text-red-700 leading-snug">
                    • Motivation/Pain point is vague (need to dig deeper into why now).
                  </li>
                </ul>
              </div>

              {/* Suggestions */}
              <div>
                <h4 className="text-[10px] font-bold text-gray-400 uppercase tracking-wider mb-2">Suggested Approach</h4>
                <p className="text-sm text-gray-700 leading-snug bg-gray-50 p-3 rounded border border-gray-100">
                  Highlight that our premium early-bird packages match their scheduling constraints. Keep tone consultative rather than pushy.
                </p>
              </div>

            </div>
          </div>
        </div>
        </div>

        {/* Notes Area (Full Width) */}
        <div className="mt-8 w-full">
          <h4 className="text-xs font-bold text-gray-500 uppercase tracking-wider mb-2 flex items-center">
            <Edit2 className="w-3 h-3 mr-1.5" /> Live Notes
          </h4>
          <textarea 
            value={notes}
            onChange={(e) => setNotes(e.target.value)}
            placeholder="Type your notes here during the call..."
            className="w-full h-32 p-4 border border-gray-200 rounded-xl bg-gray-50 text-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:bg-white transition-all resize-none shadow-inner"
          />
        </div>
      </div>
    </div>
  );
}
