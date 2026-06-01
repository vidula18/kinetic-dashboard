import { useState } from 'react';
import { Phone, Clock, Sparkles, ChevronDown, ChevronRight, TrendingUp, TrendingDown } from 'lucide-react';
import { WEEKLY_CALLERS, type WeeklyCaller } from '../data/mockPerformance';
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts';

const LABEL_COLORS: Record<string, string> = {
  'Try 1': '#10b981',
  'Try 2': '#3b82f6',
  'Try 3': '#f59e0b',
  'Cold': '#ef4444',
  'Ready for the trial': '#8b5cf6',
};

const LABEL_KEYS = ['Try 1', 'Try 2', 'Try 3', 'Cold', 'Ready for the trial'];

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
  const aggregatedLabelDist: Record<string, number> = {};
  LABEL_KEYS.forEach(l => aggregatedLabelDist[l] = 0);
  
  reps.forEach(rep => {
    LABEL_KEYS.forEach(l => {
      aggregatedLabelDist[l] += rep.labelDist[l] || 0;
    });
  });

  const l12 = aggregatedLabelDist['Try 1'] + aggregatedLabelDist['Try 2'];
  const l45 = aggregatedLabelDist['Cold'] + aggregatedLabelDist['Ready for the trial'];
  const weekAI = `Across both reps the team logged ${totalCalls} calls this week at a ${avgTatHours.toFixed(1)}h average lead → first-call time. ${l12} of ${totalCalls} clients ended at Label Try 1–2 — a healthy top of funnel — while ${l45} slipped to Cold/Ready for the trial and need win-back attention. Aarav leads on volume and speed-to-contact; Priya converts well on online leads but is slower to first call. Team focus next week: tighten the first-call SLA and protect the at-risk cohort.`;

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
  const chartData = days.map(([day, calls]) => ({ name: day, calls }));

  return (
    <div className="h-32 mt-4 w-full">
      <ResponsiveContainer width="100%" height="100%">
        <BarChart data={chartData} margin={{ top: 10, right: 0, left: -25, bottom: 0 }}>
          <XAxis 
            dataKey="name" 
            axisLine={false} 
            tickLine={false} 
            tick={{ fontSize: 10, fill: '#6b7280', fontWeight: 600 }}
            dy={5}
          />
          <YAxis 
            axisLine={false} 
            tickLine={false} 
            tick={{ fontSize: 10, fill: '#9ca3af', fontWeight: 500 }}
            tickCount={4}
          />
          <Tooltip 
            cursor={{ fill: '#f3f4f6' }}
            contentStyle={{ borderRadius: '8px', border: 'none', boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)', fontSize: '12px', fontWeight: 'bold' }}
            itemStyle={{ color: '#3b82f6' }}
            formatter={(value: any) => [`${value} calls`, 'Calls']}
            labelStyle={{ color: '#6b7280', marginBottom: '4px' }}
          />
          <Bar dataKey="calls" fill="#3b82f6" radius={[4, 4, 0, 0]} />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}

function LabelDistChart({ dist }: { dist: Record<string, number> }) {
  const total = Object.values(dist).reduce((a, b) => a + b, 0) || 1;
  return (
    <div className="space-y-2.5 mt-4">
      {LABEL_KEYS.map(l => {
        const n = dist[l] || 0;
        const pct = Math.max(2, Math.round((n / total) * 100));
        return (
          <div key={l} className="flex items-center text-xs">
            <span className="w-24 font-semibold text-gray-600 truncate" title={l}>{l}</span>
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
    <div className="bg-white border border-gray-200 rounded-xl shadow-sm overflow-hidden mb-6">
      {/* Header */}
      <div 
        className={`flex items-center p-4 bg-gray-50 border-b border-gray-100 ${!props.isTeam ? 'cursor-pointer hover:bg-gray-100 transition-colors' : ''}`}
        onClick={() => !props.isTeam && setExpanded(!expanded)}
      >
        <div className={`w-10 h-10 rounded-full flex items-center justify-center font-bold text-white shadow-sm flex-shrink-0 ${props.isTeam ? 'bg-gradient-to-br from-indigo-500 to-purple-600' : 'bg-blue-600'}`}>
          {props.initials}
        </div>
        <div className="ml-4 flex-1">
          <h3 className="text-[15px] font-bold text-gray-900">{props.name}</h3>
          {props.isTeam && <p className="text-xs text-gray-500">2 salespeople · this week</p>}
        </div>
        <div className="text-right mr-4">
          <div className="text-lg font-black text-gray-900">{props.total}</div>
          <div className="text-[10px] text-gray-500 font-bold uppercase tracking-wide mb-0.5">Calls this week</div>
          <div className="flex items-center justify-end text-[9px] font-bold text-green-600">
            <TrendingUp className="w-3 h-3 mr-0.5" /> 12% vs last week
          </div>
        </div>
        {!props.isTeam && (
          <div className="text-gray-400">
            {expanded ? <ChevronDown className="w-5 h-5" /> : <ChevronRight className="w-5 h-5" />}
          </div>
        )}
      </div>

      {/* Body */}
      {expanded && (
        <div className="p-6">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 mb-6">
          
          {/* Card 1: Total Calls & TAT */}
          <div className="bg-white p-5 rounded-lg border border-gray-200 shadow-sm flex flex-col justify-center">
            <h4 className="text-[10px] font-bold text-gray-500 uppercase tracking-wider mb-2">Calls this week</h4>
            <div className="flex items-baseline mb-6">
              <span className="text-4xl font-black text-gray-900">{props.total}</span>
              <span className="text-sm text-gray-500 ml-2 font-medium">calls</span>
            </div>
            <div className="flex items-center text-xs font-bold text-green-600 mb-6 mt-[-1rem]">
              <TrendingUp className="w-3.5 h-3.5 mr-1" />
              12% higher vs last week
            </div>
            
            <div className="bg-blue-50 p-3 rounded-lg border border-blue-100 flex items-center">
              <Clock className="w-5 h-5 text-blue-600 mr-3" />
              <div>
                <div className="text-lg font-bold text-blue-900">{props.avgTat}</div>
                <div className="text-[10px] font-semibold text-blue-600 uppercase tracking-wide mb-1">Avg time · lead → first call</div>
                <div className="flex items-center text-[10px] font-bold text-green-600">
                  <TrendingDown className="w-3 h-3 mr-1" />
                  0.5h faster vs last week
                </div>
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
                      <span className="px-2 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider bg-gray-100 text-gray-600">{call.label}</span>
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
