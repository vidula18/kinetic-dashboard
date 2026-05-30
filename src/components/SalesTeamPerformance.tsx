import { useState } from 'react';
import { Phone, Clock, Sparkles, ChevronDown, ChevronRight } from 'lucide-react';
import { WEEKLY_CALLERS, type WeeklyCaller } from '../data/mockPerformance';

const LABEL_COLORS: Record<number, string> = {
  1: '#10b981', // green
  2: '#3b82f6', // blue
  3: '#f59e0b', // amber
  4: '#ef4444', // red
  5: '#8b5cf6', // purple
};

export function SalesTeamPerformance() {
  const reps = WEEKLY_CALLERS;
  const totalCalls = reps.reduce((sum, p) => sum + p.total, 0);
  const avgTatHours = reps.reduce((sum, p) => sum + parseFloat(p.avgTat) * p.total, 0) / totalCalls;
  
  // Aggregate Days
  const daysMap = new Map<string, number>();
  reps.forEach(rep => {
    rep.days.forEach(([day, count]) => {
      daysMap.set(day, (daysMap.get(day) || 0) + count);
    });
  });
  const aggregatedDays = Array.from(daysMap.entries());

  // Aggregate Label Dist
  const aggregatedLabelDist: Record<number, number> = { 1: 0, 2: 0, 3: 0, 4: 0, 5: 0 };
  reps.forEach(rep => {
    [1, 2, 3, 4, 5].forEach(l => {
      aggregatedLabelDist[l] += rep.labelDist[l] || 0;
    });
  });

  const l12 = aggregatedLabelDist[1] + aggregatedLabelDist[2];
  const l45 = aggregatedLabelDist[4] + aggregatedLabelDist[5];
  const weekAI = `Across both reps the team logged ${totalCalls} calls this week at a ${avgTatHours.toFixed(1)}h average lead → first-call time. ${l12} of ${totalCalls} clients ended at Label 1–2 — a healthy top of funnel — while ${l45} slipped to Label 4–5 and need win-back attention. Aarav leads on volume and speed-to-contact; Priya converts well on online leads but is slower to first call. Team focus next week: tighten the first-call SLA and protect the at-risk Label 4–5 cohort.`;

  return (
    <div className="mx-4 sm:mx-6 lg:mx-8 mb-12 mt-4 space-y-6">
      <div className="flex justify-between items-end mb-4">
        <div>
          <h2 className="text-xl font-extrabold text-gray-900">Sales Team Performance</h2>
          <p className="text-sm text-gray-600 font-medium mt-1">Week of 18 – 24 May 2026</p>
        </div>
      </div>
      
      {/* Team Aggregated Row */}
      <PersonRow 
        isTeam={true}
        name="Sales Team — Combined"
        initials="∑"
        total={totalCalls}
        avgTat={`${avgTatHours.toFixed(1)}h`}
        days={aggregatedDays}
        labelDist={aggregatedLabelDist}
        weekAI={weekAI}
        log={[]}
      />

      {/* Individual Rep Rows */}
      {reps.map((rep, idx) => (
        <PersonRow key={idx} isTeam={false} {...rep} />
      ))}
    </div>
  );
}

// ---------------- Helper Components ----------------

function DayChart({ days }: { days: [string, number][] }) {
  const maxN = Math.max(1, ...days.map(d => d[1]));
  return (
    <div className="flex items-end h-24 gap-2 mt-4">
      {days.map(([day, n], idx) => {
        const heightPct = n === 0 ? 5 : Math.max(10, (n / maxN) * 100);
        return (
          <div key={idx} className="flex flex-col items-center flex-1">
            <span className="text-xs font-semibold text-gray-700 mb-1">{n}</span>
            <div 
              className={`w-full rounded-t-sm transition-all ${n === 0 ? 'bg-gray-200' : 'bg-blue-500'}`}
              style={{ height: `${heightPct}%` }}
            />
            <span className="text-[10px] text-gray-500 mt-1 uppercase font-semibold">{day}</span>
          </div>
        );
      })}
    </div>
  );
}

function LabelDistChart({ dist }: { dist: Record<number, number> }) {
  const total = Object.values(dist).reduce((a, b) => a + b, 0) || 1;
  return (
    <div className="space-y-2.5 mt-4">
      {[1, 2, 3, 4, 5].map(l => {
        const n = dist[l] || 0;
        const pct = Math.max(2, Math.round((n / total) * 100));
        return (
          <div key={l} className="flex items-center text-xs">
            <span className="w-14 font-semibold text-gray-600">Label {l}</span>
            <div className="flex-1 mx-3 h-2 bg-gray-100 rounded-full overflow-hidden">
              <div 
                className="h-full rounded-full" 
                style={{ width: `${pct}%`, backgroundColor: LABEL_COLORS[l] }}
              />
            </div>
            <span className="w-6 text-right font-bold text-gray-800">{n}</span>
          </div>
        );
      })}
    </div>
  );
}

function PersonRow(props: WeeklyCaller & { isTeam: boolean }) {
  const [expanded, setExpanded] = useState(props.isTeam);

  return (
    <div className="bg-white border border-gray-200 rounded-xl shadow-sm overflow-hidden mb-6 transition-all">
      {/* Header */}
      <div 
        className="flex items-center p-4 cursor-pointer hover:bg-gray-50 border-b border-gray-100"
        onClick={() => setExpanded(!expanded)}
      >
        <div className={`w-10 h-10 rounded-full flex items-center justify-center font-bold text-white shadow-sm flex-shrink-0 ${props.isTeam ? 'bg-gradient-to-br from-indigo-500 to-purple-600' : 'bg-blue-600'}`}>
          {props.initials}
        </div>
        <div className="ml-4 flex-1">
          <h3 className="text-[15px] font-bold text-gray-900">{props.name}</h3>
          {props.isTeam && <p className="text-xs text-gray-500">2 salespeople · this week</p>}
        </div>
        <div className="text-right mr-6">
          <div className="text-lg font-black text-gray-900">{props.total}</div>
          <div className="text-[10px] text-gray-500 font-bold uppercase tracking-wide">Calls this week</div>
        </div>
        {expanded ? <ChevronDown className="w-5 h-5 text-gray-400" /> : <ChevronRight className="w-5 h-5 text-gray-400" />}
      </div>

      {/* Body */}
      {expanded && (
        <div className="p-6 bg-gray-50/50">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 mb-6">
            
            {/* Card 1: Total Calls & TAT */}
            <div className="bg-white p-5 rounded-lg border border-gray-200 shadow-sm flex flex-col justify-center">
              <h4 className="text-[10px] font-bold text-gray-500 uppercase tracking-wider mb-2">Calls this week</h4>
              <div className="flex items-baseline mb-6">
                <span className="text-4xl font-black text-gray-900">{props.total}</span>
                <span className="text-sm text-gray-500 ml-2 font-medium">calls</span>
              </div>
              
              <div className="bg-blue-50 p-3 rounded-lg border border-blue-100 flex items-center">
                <Clock className="w-5 h-5 text-blue-600 mr-3" />
                <div>
                  <div className="text-lg font-bold text-blue-900">{props.avgTat}</div>
                  <div className="text-[10px] font-semibold text-blue-600 uppercase tracking-wide">Avg time · lead → first call</div>
                </div>
              </div>
            </div>

            {/* Card 2: Calls per day */}
            <div className="bg-white p-5 rounded-lg border border-gray-200 shadow-sm">
              <h4 className="text-[10px] font-bold text-gray-500 uppercase tracking-wider mb-1">Calls per day</h4>
              <DayChart days={props.days} />
            </div>

            {/* Card 3: Label Dist */}
            <div className="bg-white p-5 rounded-lg border border-gray-200 shadow-sm">
              <h4 className="text-[10px] font-bold text-gray-500 uppercase tracking-wider mb-1">Label Distribution</h4>
              <p className="text-[10px] text-gray-400 font-medium">Where each client sits by end of week</p>
              <LabelDistChart dist={props.labelDist} />
            </div>
          </div>

          {/* AI Summary */}
          <div className="bg-gradient-to-r from-blue-50 to-indigo-50 border border-blue-100 rounded-lg p-5 mb-6">
            <div className="flex items-center text-sm font-bold text-blue-800 mb-2">
              <Sparkles className="w-4 h-4 mr-2 text-blue-600" />
              AI Summary — {props.isTeam ? 'Sales team performance' : `${props.name.split(' ')[0]}'s performance`}
            </div>
            <p className="text-sm text-blue-900/80 leading-relaxed font-medium">
              {props.weekAI}
            </p>
          </div>

          {/* Detailed Call Log */}
          {!props.isTeam && props.log.length > 0 && (
            <div>
              <h4 className="text-[10px] font-bold text-gray-500 uppercase tracking-wider mb-4 border-b border-gray-200 pb-2">
                Clients addressed · {props.log.length} clients
              </h4>
              <div className="space-y-3">
                {props.log.map((call, idx) => (
                  <div key={idx} className={`bg-white border rounded-lg p-4 shadow-sm flex flex-col sm:flex-row gap-4 ${call.sent === 'pos' ? 'border-green-200' : 'border-red-200'}`}>
                    <div className="flex-shrink-0 mt-1">
                      <div className={`w-8 h-8 rounded-full flex items-center justify-center ${call.sent === 'pos' ? 'bg-green-100 text-green-600' : 'bg-red-100 text-red-600'}`}>
                        <Phone className="w-4 h-4" />
                      </div>
                    </div>
                    <div className="flex-1">
                      <div className="flex flex-wrap items-center gap-2 mb-1">
                        <span className="font-bold text-gray-900 text-[15px]">{call.lead}</span>
                        <span className="px-2 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider bg-gray-100 text-gray-600">Label {call.label}</span>
                        <span className={`px-2 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider ml-auto flex items-center ${call.sent === 'pos' ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'}`}>
                          <div className={`w-1.5 h-1.5 rounded-full mr-1.5 ${call.sent === 'pos' ? 'bg-green-500' : 'bg-red-500'}`} />
                          {call.sent === 'pos' ? 'Positive' : 'At risk'}
                        </span>
                      </div>
                      <div className="text-xs text-gray-500 font-medium mb-3">
                        {call.when} · <span className="text-gray-400">lead → 1st call</span> <span className="font-bold text-gray-700">{call.tat}</span>
                      </div>
                      <div className={`text-sm font-medium rounded-md p-3 flex items-start ${call.sent === 'pos' ? 'bg-green-50 text-green-900 border border-green-100' : 'bg-red-50 text-red-900 border border-red-100'}`}>
                        <Sparkles className={`w-4 h-4 mr-2 mt-0.5 flex-shrink-0 ${call.sent === 'pos' ? 'text-green-600' : 'text-red-600'}`} />
                        <span className="leading-relaxed">{call.ai}</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
