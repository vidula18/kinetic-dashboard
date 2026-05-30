import { useState, useMemo } from 'react';
import { Sparkles, BarChart2, IndianRupee, Clock, AlertTriangle, TrendingUp, Filter } from 'lucide-react';
import { PERF_DATA, type PerfData, type SalespersonPerformance } from '../data/mockPerformance';

const LABEL_COLORS: Record<string, string> = {
  'Try 1': '#10b981', // green
  'Try 2': '#3b82f6', // blue
  'Try 3': '#f59e0b', // amber
  'Cold': '#ef4444', // red
  'Ready for the trial': '#8b5cf6', // purple
};

const LABEL_KEYS = ['Try 1', 'Try 2', 'Try 3', 'Cold', 'Ready for the trial'];

const PERIOD_LABELS: Record<string, string> = { 
  week: 'This Week', 
  month: 'This Month', 
  quarter: 'This Quarter' 
};
const SALES_REPS = ['Aarav Mehta', 'Priya Nair'];

function formatINR(amount: number) {
  if (amount >= 100000) return `₹${(amount / 100000).toFixed(1)}L`;
  return `₹${amount.toLocaleString()}`;
}

export function SalesPerformance() {
  const [period, setPeriod] = useState<keyof PerfData>('week');
  const [person, setPerson] = useState<string>('all');

  const slice = useMemo(() => {
    const all = PERF_DATA[period];
    const names = person === 'all' ? Object.keys(all) : [person];
    const recs = names.map(n => ({ name: n, ...all[n] }));
    
    const sum = (k: keyof SalespersonPerformance) => recs.reduce((s, r) => s + (r[k] as number), 0);
    
    const wLeads = sum('leads') || 1;
    const wConv = sum('conversions') || 1;
    const tatHours = recs.reduce((s, r) => s + r.tatHours * r.leads, 0) / wLeads;
    const convertDays = recs.reduce((s, r) => s + r.convertDays * r.conversions, 0) / wConv;
    
    const tag = <T,>(arr: T[], r: any) => arr.map(x => ({ ...x, owner: r.name } as T & { owner: string }));
    const prospects = recs.flatMap(r => tag(r.prospects, r));
    const losses = recs.flatMap(r => tag(r.losses, r));
    const misses = {
      reminder: recs.flatMap(r => tag(r.misses.reminder, r)),
      fresh: recs.flatMap(r => tag(r.misses.fresh, r)),
      cold: recs.flatMap(r => tag(r.misses.cold, r))
    };
    
    const labelDist = LABEL_KEYS.reduce((acc, l) => {
      acc[l] = recs.reduce((t, r) => t + (r.labelDist[l] || 0), 0);
      return acc;
    }, {} as Record<string, number>);

    return {
      multi: names.length > 1,
      leads: sum('leads'), called: sum('called'), trial: sum('trial'),
      conversions: sum('conversions'), captured: sum('captured'),
      missedLeads: sum('leads') - sum('called'), labelDist,
      tatHours, convertDays, prospects, losses, misses,
      potential: prospects.reduce((s, p) => s + p.amount, 0),
      missed: losses.reduce((s, l) => s + l.amount, 0)
    };
  }, [period, person]);

  const funnelStages: Array<{ label: string; n: number; all?: boolean; conv?: boolean; color?: string }> = [
    { label: 'All Leads', n: slice.leads, all: true },
    ...LABEL_KEYS.map(l => ({ label: l, n: slice.labelDist[l] || 0, color: LABEL_COLORS[l] })),
    { label: 'Converted', n: slice.conversions, conv: true }
  ];
  const fMax = slice.leads || 1;
  const convRate = slice.leads ? Math.round((slice.conversions / slice.leads) * 100) : 0;

  const missCount = slice.misses.reminder.length + slice.misses.fresh.length + slice.misses.cold.length;

  const firstName = (full: string) => full.split(' ')[0];

  return (
    <div className="mx-4 sm:mx-6 lg:mx-8 mb-12 mt-4 space-y-6">
      
      {/* Filters */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 bg-white p-4 rounded-xl border border-gray-200 shadow-sm">
        <div className="flex items-center space-x-2">
          <Filter className="w-4 h-4 text-gray-500" />
          <span className="text-xs font-bold text-gray-500 uppercase tracking-wider">Period</span>
          <div className="flex bg-gray-100 p-1 rounded-lg ml-2">
            {(Object.keys(PERIOD_LABELS) as Array<keyof PerfData>).map(p => (
              <button
                key={p}
                onClick={() => setPeriod(p)}
                className={`px-4 py-1.5 text-xs font-bold rounded-md transition-all ${period === p ? 'bg-white text-blue-700 shadow-sm' : 'text-gray-500 hover:text-gray-900'}`}
              >
                {PERIOD_LABELS[p]}
              </button>
            ))}
          </div>
        </div>
        <div className="flex items-center space-x-2">
          <span className="text-xs font-bold text-gray-500 uppercase tracking-wider">Salesperson</span>
          <select 
            value={person}
            onChange={(e) => setPerson(e.target.value)}
            className="text-sm font-semibold text-gray-700 border-gray-300 focus:outline-none focus:ring-blue-500 focus:border-blue-500 rounded-md shadow-sm border bg-white cursor-pointer py-1.5 pl-3 pr-8"
          >
            <option value="all">All Salespeople</option>
            {SALES_REPS.map(p => <option key={p} value={p}>{p}</option>)}
          </select>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Revenue & Time */}
        <div className="bg-white border border-gray-200 rounded-xl shadow-sm p-6">
          <div className="flex items-center justify-between mb-6 border-b border-gray-100 pb-3">
            <h3 className="text-[15px] font-bold text-gray-900 flex items-center">
              <IndianRupee className="w-5 h-5 mr-2 text-green-600" />
              Revenue & Timing
            </h3>
            <span className="text-[10px] text-gray-500 font-bold uppercase tracking-wide bg-gray-100 px-2 py-0.5 rounded-full">{PERIOD_LABELS[period]}</span>
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-6">
            <div className="bg-green-50/50 p-4 rounded-xl border border-green-100">
              <div className="text-[10px] font-bold text-green-700 uppercase tracking-wider mb-1">Captured</div>
              <div className="text-2xl font-black text-green-900 mb-1">{formatINR(slice.captured)}</div>
              <div className="text-[10px] text-green-600 font-medium">from {slice.conversions} conversions</div>
            </div>
            <div className="bg-red-50/50 p-4 rounded-xl border border-red-100">
              <div className="text-[10px] font-bold text-red-700 uppercase tracking-wider mb-1">Missed</div>
              <div className="text-2xl font-black text-red-900 mb-1">{formatINR(slice.missed)}</div>
              <div className="text-[10px] text-red-600 font-medium">from {slice.losses.length} losses</div>
            </div>
            <div className="bg-blue-50/50 p-4 rounded-xl border border-blue-100">
              <div className="text-[10px] font-bold text-blue-700 uppercase tracking-wider mb-1">Potential</div>
              <div className="text-2xl font-black text-blue-900 mb-1">{formatINR(slice.potential)}</div>
              <div className="text-[10px] text-blue-600 font-medium">across {slice.prospects.length} prospects</div>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="flex items-center p-3 bg-gray-50 border border-gray-100 rounded-lg">
              <Clock className="w-8 h-8 text-gray-400 mr-3" />
              <div>
                <div className="text-lg font-black text-gray-900">{slice.tatHours.toFixed(1)}h</div>
                <div className="text-[10px] font-bold text-gray-500 uppercase tracking-wider">Turn Around Time</div>
              </div>
            </div>
            <div className="flex items-center p-3 bg-gray-50 border border-gray-100 rounded-lg">
              <TrendingUp className="w-8 h-8 text-gray-400 mr-3" />
              <div>
                <div className="text-lg font-black text-gray-900">{slice.convertDays.toFixed(1)}d</div>
                <div className="text-[10px] font-bold text-gray-500 uppercase tracking-wider">Time to Convert</div>
              </div>
            </div>
          </div>
        </div>

        {/* Funnel */}
        <div className="bg-white border border-gray-200 rounded-xl shadow-sm p-6">
          <div className="flex items-center justify-between mb-6 border-b border-gray-100 pb-3">
            <h3 className="text-[15px] font-bold text-gray-900 flex items-center">
              <BarChart2 className="w-5 h-5 mr-2 text-blue-600" />
              Client Funnel
            </h3>
            <span className="text-[10px] text-gray-500 font-bold uppercase tracking-wide bg-gray-100 px-2 py-0.5 rounded-full">{PERIOD_LABELS[period]}</span>
          </div>

          <div className="space-y-3 mb-6">
            {funnelStages.map((st, idx) => (
              <div key={idx} className="flex items-center text-xs">
                <span className={`w-20 font-bold ${st.conv ? 'text-green-700' : st.all ? 'text-blue-700' : 'text-gray-600'}`}>{st.label}</span>
                <div className="flex-1 mx-3 flex justify-center">
                  <div 
                    className={`h-6 rounded-md transition-all ${st.conv ? 'bg-green-500' : st.all ? 'bg-blue-500' : ''}`}
                    style={{ 
                      width: `${Math.max(5, (st.n / fMax) * 100)}%`, 
                      backgroundColor: st.color,
                      opacity: st.color ? 0.9 : 1
                    }}
                  />
                </div>
                <span className={`w-10 text-right font-black ${st.conv ? 'text-green-700' : st.all ? 'text-blue-700' : 'text-gray-900'}`}>{st.n}</span>
              </div>
            ))}
          </div>
          
          <div className="bg-gray-50 border border-gray-100 rounded-lg p-3 text-center text-xs font-semibold text-gray-600">
            <span className="font-black text-gray-900">{slice.conversions} / {slice.leads}</span> conversions · {convRate}% of all leads converted
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Prospects */}
        <div className="bg-white border border-gray-200 rounded-xl shadow-sm p-6 flex flex-col h-full">
          <div className="flex items-center justify-between mb-4 border-b border-gray-100 pb-3">
            <h3 className="text-[15px] font-bold text-gray-900">Open Prospects</h3>
            <span className="text-[10px] text-gray-500 font-bold uppercase tracking-wide bg-gray-100 px-2 py-0.5 rounded-full">{slice.prospects.length}</span>
          </div>
          <div className="flex-1 overflow-y-auto max-h-96 pr-2 space-y-4">
            {slice.prospects.length === 0 ? (
              <div className="text-sm text-gray-400 italic text-center mt-8">No open prospects in this period.</div>
            ) : (
              slice.prospects.map((p, idx) => (
                <div key={idx} className="border border-gray-100 rounded-lg p-3 bg-gray-50/50">
                  <div className="flex justify-between items-start mb-2">
                    <div className="font-bold text-sm text-gray-900">
                      {p.lead}
                      {slice.multi && <span className="ml-2 px-1.5 py-0.5 bg-gray-200 text-gray-600 rounded text-[9px] uppercase tracking-wider">{firstName(p.owner)}</span>}
                    </div>
                    <div className="text-right">
                      <div className="font-black text-[13px] text-gray-900">{p.amount.toLocaleString()}</div>
                      <div className={`text-[9px] font-bold uppercase tracking-wider px-1.5 py-0.5 rounded-sm inline-block mt-1 ${p.likelihood === 'High' ? 'bg-green-100 text-green-700' : p.likelihood === 'Medium' ? 'bg-amber-100 text-amber-700' : 'bg-red-100 text-red-700'}`}>
                        {p.likelihood}
                      </div>
                    </div>
                  </div>
                  <div className="flex items-start text-xs text-blue-800 bg-blue-50/50 p-2 rounded border border-blue-100/50">
                    <Sparkles className="w-3.5 h-3.5 mr-1.5 mt-0.5 text-blue-500 flex-shrink-0" />
                    <span className="font-medium leading-snug">{p.ai}</span>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>

        {/* Misses */}
        <div className="bg-white border border-gray-200 rounded-xl shadow-sm p-6 flex flex-col h-full">
          <div className="flex items-center justify-between mb-4 border-b border-gray-100 pb-3">
            <h3 className="text-[15px] font-bold text-gray-900 flex items-center">
              Misses
              {missCount > 0 && <AlertTriangle className="w-4 h-4 ml-2 text-amber-500" />}
            </h3>
            <span className="text-[10px] text-gray-500 font-bold uppercase tracking-wide bg-gray-100 px-2 py-0.5 rounded-full">
              {slice.missedLeads} / {slice.leads} missed
            </span>
          </div>
          <div className="flex-1 overflow-y-auto max-h-96 pr-2 space-y-5">
            {missCount === 0 ? (
              <div className="text-sm text-gray-400 italic text-center mt-8">No misses in this period — reminders, SLAs and fresh-lead ages are all on track.</div>
            ) : (
              <>
                {slice.misses.reminder.length > 0 && (
                  <div>
                    <h4 className="text-[10px] font-bold text-amber-700 uppercase tracking-wider mb-2 flex justify-between">
                      Reminders missed <span>{slice.misses.reminder.length}</span>
                    </h4>
                    <div className="space-y-2">
                      {slice.misses.reminder.map((m, idx) => (
                        <div key={idx} className="text-xs flex items-start">
                          <div className="w-1.5 h-1.5 rounded-full bg-amber-400 mt-1 mr-2 flex-shrink-0" />
                          <span className="text-gray-600"><b className="text-gray-900">{m.lead}</b> {slice.multi && `· ${firstName(m.owner)}`} — {m.detail}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
                {slice.misses.fresh.length > 0 && (
                  <div>
                    <h4 className="text-[10px] font-bold text-amber-700 uppercase tracking-wider mb-2 flex justify-between">
                      Fresh leads pending {'>'} 7 days <span>{slice.misses.fresh.length}</span>
                    </h4>
                    <div className="space-y-2">
                      {slice.misses.fresh.map((m, idx) => (
                        <div key={idx} className="text-xs flex items-start">
                          <div className="w-1.5 h-1.5 rounded-full bg-amber-400 mt-1 mr-2 flex-shrink-0" />
                          <span className="text-gray-600"><b className="text-gray-900">{m.lead}</b> {slice.multi && `· ${firstName(m.owner)}`} — {m.detail}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
                {slice.misses.cold.length > 0 && (
                  <div>
                    <h4 className="text-[10px] font-bold text-amber-700 uppercase tracking-wider mb-2 flex justify-between">
                      Try 1 → Cold not done in 4 days <span>{slice.misses.cold.length}</span>
                    </h4>
                    <div className="space-y-2">
                      {slice.misses.cold.map((m, idx) => (
                        <div key={idx} className="text-xs flex items-start">
                          <div className="w-1.5 h-1.5 rounded-full bg-amber-400 mt-1 mr-2 flex-shrink-0" />
                          <span className="text-gray-600"><b className="text-gray-900">{m.lead}</b> {slice.multi && `· ${firstName(m.owner)}`} — {m.detail}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </>
            )}
          </div>
        </div>

        {/* Losses */}
        <div className="bg-white border border-gray-200 rounded-xl shadow-sm p-6 flex flex-col h-full">
          <div className="flex items-center justify-between mb-4 border-b border-gray-100 pb-3">
            <h3 className="text-[15px] font-bold text-gray-900">Losses</h3>
            <span className="text-[10px] text-gray-500 font-bold uppercase tracking-wide bg-gray-100 px-2 py-0.5 rounded-full">{slice.losses.length}</span>
          </div>
          <div className="flex-1 overflow-y-auto max-h-96 pr-2 space-y-4">
            {slice.losses.length === 0 ? (
              <div className="text-sm text-gray-400 italic text-center mt-8">No losses in this period.</div>
            ) : (
              slice.losses.map((l, idx) => (
                <div key={idx} className="border border-red-100 bg-red-50/30 rounded-lg p-3">
                  <div className="flex justify-between items-start mb-1">
                    <div className="font-bold text-sm text-gray-900">
                      {l.lead}
                      {slice.multi && <span className="ml-2 px-1.5 py-0.5 bg-gray-200 text-gray-600 rounded text-[9px] uppercase tracking-wider">{firstName(l.owner)}</span>}
                    </div>
                    <div className="text-[13px] font-black text-gray-900">{l.amount.toLocaleString()}</div>
                  </div>
                  <div className="flex items-center justify-between mt-2">
                    <span className="text-xs text-gray-600 font-medium italic pr-2">{l.note}</span>
                    <span className="text-[9px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full bg-red-100 text-red-700 flex-shrink-0">
                      {l.reason}
                    </span>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
