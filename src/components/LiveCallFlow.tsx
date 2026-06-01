import { useState, useEffect } from 'react';
import type { Lead } from '../data/mockLeads';
import { PhoneOff, Calendar, Activity, Edit2, CheckSquare } from 'lucide-react';

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
  const [scriptStep, setScriptStep] = useState(0);
  const [notes, setNotes] = useState("");
  const [checkedItems, setCheckedItems] = useState<Record<number, boolean>>({});

  useEffect(() => {
    const timer = setTimeout(() => {
      setCheckedItems(prev => {
        const next = { ...prev };
        if (scriptStep >= 1) next[0] = true;
        if (scriptStep >= 2) next[1] = true;
        if (scriptStep >= 3) { next[2] = true; next[3] = true; }
        if (scriptStep >= 4) { next[4] = true; next[5] = true; next[6] = true; next[7] = true; }
        return next;
      });
    }, 1200);
    return () => clearTimeout(timer);
  }, [scriptStep]);

  useEffect(() => {
    const interval = setInterval(() => {
      setSeconds(s => s + 1);
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    // Automatically advance scriptStep every 2 seconds for prototype demonstration
    const advanceInterval = setInterval(() => {
      setScriptStep(current => {
        if (current < MOCK_SCRIPT_STEPS.length - 1) {
          return current + 1;
        }
        clearInterval(advanceInterval);
        return current;
      });
    }, 2000);
    return () => clearInterval(advanceInterval);
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
        <div className="flex gap-3">
          <button className="bg-white/10 text-white border border-white/20 font-bold px-6 py-2.5 rounded-lg shadow-sm hover:bg-white/20 active:scale-[0.98] flex items-center transition-all text-sm">
            <Calendar className="w-4 h-4 mr-2" />
            Schedule Trial
          </button>
          <button 
            onClick={onEndCall}
            className="bg-white text-red-600 font-bold px-6 py-2.5 rounded-lg shadow hover:bg-gray-50 active:scale-[0.98] flex items-center transition-all text-sm"
          >
            <PhoneOff className="w-4 h-4 mr-2" />
            End Call
          </button>
        </div>
      </div>

      <div className="flex-1 overflow-y-auto p-6 flex flex-col max-w-7xl mx-auto w-full">
        
        {/* Say This Next (Full Width) */}
          <div className="mb-6 text-center animate-in slide-in-from-bottom-2 fade-in duration-300 w-full relative">
            <h3 className="text-xs font-bold text-gray-400 uppercase tracking-[0.2em] mb-4">Say This Next</h3>
            <div className="text-3xl md:text-4xl font-extrabold text-blue-600 leading-tight min-h-[100px] flex items-center justify-center">
              {MOCK_SCRIPT_STEPS[scriptStep].replace('[Name]', lead.name.split(' ')[0])}
            </div>
          </div>

        {/* 2-Column Section */}
        <div className="flex flex-col lg:flex-row gap-8 w-full mb-4">
          
          {/* Left Column - Details & Notes */}
          <div className="flex-1 flex flex-col min-w-0">
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
              <div className="px-5 py-3 border-b border-gray-100 bg-gray-50/50 flex items-center">
                <CheckSquare className="w-4 h-4 mr-2 text-blue-600" />
                <h3 className="text-xs font-bold text-gray-900 uppercase tracking-wider">Call Checklist</h3>
              </div>
              <div className="p-4">
                <ul className="space-y-3">
                <li className="flex items-center gap-3">
                  <input type="checkbox" checked={checkedItems[0] || false} onChange={e => setCheckedItems(p => ({...p, 0: e.target.checked}))} className="w-4 h-4 text-blue-600 rounded border-gray-300 focus:ring-blue-500 cursor-pointer" />
                  <span className="text-sm font-medium text-gray-700">Primary fitness goal</span>
                </li>
                <li className="flex items-center gap-3">
                  <input type="checkbox" checked={checkedItems[1] || false} onChange={e => setCheckedItems(p => ({...p, 1: e.target.checked}))} className="w-4 h-4 text-blue-600 rounded border-gray-300 focus:ring-blue-500 cursor-pointer" />
                  <span className="text-sm font-medium text-gray-700">Past injuries or conditions</span>
                </li>
                <li className="flex items-center gap-3">
                  <input type="checkbox" checked={checkedItems[2] || false} onChange={e => setCheckedItems(p => ({...p, 2: e.target.checked}))} className="w-4 h-4 text-blue-600 rounded border-gray-300 focus:ring-blue-500 cursor-pointer" />
                  <span className="text-sm font-medium text-gray-700">Urgency (Why now?)</span>
                </li>
                <li className="flex items-center gap-3">
                  <input type="checkbox" checked={checkedItems[3] || false} onChange={e => setCheckedItems(p => ({...p, 3: e.target.checked}))} className="w-4 h-4 text-green-600 rounded border-gray-300 focus:ring-green-500 cursor-pointer" />
                  <span className="text-sm font-medium text-gray-700">Offer two specific slots</span>
                </li>
                <li className="flex items-center gap-3">
                  <input type="checkbox" checked={checkedItems[4] || false} onChange={e => setCheckedItems(p => ({...p, 4: e.target.checked}))} className="w-4 h-4 text-green-600 rounded border-gray-300 focus:ring-green-500 cursor-pointer" />
                  <span className="text-sm font-medium text-gray-700">Confirm online/offline</span>
                </li>
                <li className="flex items-center gap-3">
                  <input type="checkbox" checked={checkedItems[5] || false} onChange={e => setCheckedItems(p => ({...p, 5: e.target.checked}))} className="w-4 h-4 text-green-600 rounded border-gray-300 focus:ring-green-500 cursor-pointer" />
                  <span className="text-sm font-medium text-gray-700">Set expectation for video call</span>
                </li>
                <li className="flex items-center gap-3">
                  <input type="checkbox" checked={checkedItems[6] || false} onChange={e => setCheckedItems(p => ({...p, 6: e.target.checked}))} className="w-4 h-4 text-red-600 rounded border-red-300 focus:ring-red-500 cursor-pointer" />
                  <span className="text-sm font-medium text-red-600">Verify assessment availability</span>
                </li>
                <li className="flex items-center gap-3">
                  <input type="checkbox" checked={checkedItems[7] || false} onChange={e => setCheckedItems(p => ({...p, 7: e.target.checked}))} className="w-4 h-4 text-red-600 rounded border-red-300 focus:ring-red-500 cursor-pointer" />
                  <span className="text-sm font-medium text-red-600">Dig deeper into motivation</span>
                </li>
                </ul>
              </div>
            </div>
          </div>

        {/* Right Column - Context & Uncovered Points */}
        <div className="w-full lg:w-[400px] flex-shrink-0">
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden sticky top-4">
            <div className="px-5 py-3 border-b border-gray-100 bg-gray-50/50 flex items-center">
              <Activity className="w-4 h-4 mr-2 text-blue-600" />
              <h3 className="text-xs font-bold text-gray-900 uppercase tracking-wider">Insight & Context</h3>
            </div>
            
            <div className="p-4 space-y-4">
              
              {/* Context */}
              <div>
                <h4 className="text-[9px] font-bold text-gray-400 uppercase tracking-wider mb-1">Background</h4>
                <p className="text-sm text-gray-700 leading-relaxed">
                  {renderMarkdown(lead.aiInsight)}
                </p>
              </div>
            </div>
          </div>
        </div>
        </div>

        {/* Notes Area (Full Width) */}
        <div className="mt-4 w-full flex-1 flex flex-col min-h-[160px]">
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
