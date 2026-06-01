import { useState, useMemo } from 'react';
import { Sparkles, BarChart2, IndianRupee, Clock, AlertTriangle, TrendingUp, TrendingDown, Filter, X } from 'lucide-react';
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid, Cell } from 'recharts';
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

export function SalesPerformance({ onNavigateToLead }: { onNavigateToLead?: (name: string) => void }) {
  const [period, setPeriod] = useState<keyof PerfData>('week');
  const [person, setPerson] = useState<string>('all');
  const [modalState, setModalState] = useState<'captured' | 'missed' | 'potential' | null>(null);

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

  const capturedDetails = useMemo(() => {
    const count = slice.conversions;
    const avg = count > 0 ? Math.floor(slice.captured / count) : 0;
    const names = [
      'Ananya Sharma', 'Rahul Verma', 'Neha Kapoor', 'Divya Menon', 'Karan Bhatia',
      'Priya Desai', 'Arjun Das', 'Meera Joshi', 'Ritu Saxena', 'Sunil Pillai'
    ];
    
    // Show up to 10 recent conversions in the modal
    const displayCount = Math.min(count, 10);
    return Array.from({ length: displayCount }).map((_, i) => ({
      lead: names[i % names.length],
      amount: avg + (i % 2 === 0 ? 1500 : -1000),
      plan: i % 3 === 0 ? '6-Month Premium' : '3-Month Standard',
      ai: 'Successfully closed. High engagement during the trial phase and aligned perfectly with the suggested program.'
    }));
  }, [slice.conversions, slice.captured]);

  const funnelStages: Array<{ label: string; n: number; all?: boolean; conv?: boolean; color?: string }> = [
    { label: 'All Leads', n: slice.leads, all: true },
    { label: 'Fresh Leads', n: Math.max(0, slice.leads - Object.values(slice.labelDist).reduce((a, b) => a + b, 0) - slice.conversions), color: '#06b6d4' },
    ...LABEL_KEYS.map(l => ({ label: l, n: slice.labelDist[l] || 0, color: LABEL_COLORS[l] })),
    { label: 'Converted', n: slice.conversions, conv: true }
  ];
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
          
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-4">
            <button type="button" onClick={() => setModalState('captured')} className="text-left bg-green-50/50 p-4 rounded-xl border border-green-100 hover:shadow-md hover:border-green-200 transition-all cursor-pointer focus:outline-none focus:ring-2 focus:ring-green-500">
              <div className="text-[10px] font-bold text-green-700 uppercase tracking-wider mb-1">Captured</div>
              <div className="text-2xl font-black text-green-900 mb-1">{formatINR(slice.captured)}</div>
              <div className="text-[10px] text-green-600 font-medium mb-1.5">from {slice.conversions} conversions</div>
              <div className="text-[9px] font-bold text-green-600 flex items-center"><TrendingUp className="w-3 h-3 mr-0.5" /> 8% vs last week</div>
            </button>
            <button type="button" onClick={() => setModalState('missed')} className="text-left bg-red-50/50 p-4 rounded-xl border border-red-100 hover:shadow-md hover:border-red-200 transition-all cursor-pointer focus:outline-none focus:ring-2 focus:ring-red-500">
              <div className="text-[10px] font-bold text-red-700 uppercase tracking-wider mb-1">Missed</div>
              <div className="text-2xl font-black text-red-900 mb-1">{formatINR(slice.missed)}</div>
              <div className="text-[10px] text-red-600 font-medium mb-1.5">from {slice.losses.length} losses</div>
              <div className="text-[9px] font-bold text-red-600 flex items-center"><TrendingUp className="w-3 h-3 mr-0.5" /> 5% vs last week</div>
            </button>
            <button type="button" onClick={() => setModalState('potential')} className="text-left bg-blue-50/50 p-4 rounded-xl border border-blue-100 hover:shadow-md hover:border-blue-200 transition-all cursor-pointer focus:outline-none focus:ring-2 focus:ring-blue-500">
              <div className="text-[10px] font-bold text-blue-700 uppercase tracking-wider mb-1">Potential</div>
              <div className="text-2xl font-black text-blue-900 mb-1">{formatINR(slice.potential)}</div>
              <div className="text-[10px] text-blue-600 font-medium mb-1.5">across {slice.prospects.length} prospects</div>
              <div className="text-[9px] font-bold text-blue-600 flex items-center"><TrendingUp className="w-3 h-3 mr-0.5" /> 18% vs last week</div>
            </button>
          </div>
          
          <div className="bg-blue-50/50 p-4 rounded-xl border border-blue-100 flex items-center justify-between mb-4">
            <div className="flex items-center">
              <Clock className="w-5 h-5 text-blue-600 mr-2" />
              <span className="text-sm font-bold text-gray-700">Median Call Duration</span>
            </div>
            <div className="text-right">
              <div className="text-lg font-black text-blue-900">05:12</div>
              <div className="text-[9px] font-bold text-blue-600 flex items-center justify-end mt-0.5"><TrendingUp className="w-3 h-3 mr-0.5" /> 1m vs last week</div>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="flex items-center p-3 bg-gray-50 border border-gray-100 rounded-lg">
              <Clock className="w-8 h-8 text-gray-400 mr-3" />
              <div>
                <div className="text-lg font-black text-gray-900">{slice.tatHours.toFixed(1)}h</div>
                <div className="text-[10px] font-bold text-gray-500 uppercase tracking-wider mb-1">Turn Around Time</div>
                <div className="text-[9px] font-bold text-green-600 flex items-center"><TrendingDown className="w-3 h-3 mr-0.5" /> 0.3h vs last week</div>
              </div>
            </div>
            <div className="flex items-center p-3 bg-gray-50 border border-gray-100 rounded-lg">
              <TrendingUp className="w-8 h-8 text-gray-400 mr-3" />
              <div>
                <div className="text-lg font-black text-gray-900">{slice.convertDays.toFixed(1)}d</div>
                <div className="text-[10px] font-bold text-gray-500 uppercase tracking-wider mb-1">Time to Convert</div>
                <div className="text-[9px] font-bold text-green-600 flex items-center"><TrendingDown className="w-3 h-3 mr-0.5" /> 0.8d vs last week</div>
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

          <div className="h-64 mt-4 mb-4">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={funnelStages} layout="vertical" margin={{ top: 20, right: 30, left: 80, bottom: 20 }}>
                <CartesianGrid strokeDasharray="3 3" horizontal={true} vertical={true} stroke="#f3f4f6" />
                <XAxis type="number" tick={{ fontSize: 11, fill: '#6b7280' }} axisLine={{ stroke: '#e5e7eb' }} tickLine={{ stroke: '#e5e7eb' }} />
                <YAxis dataKey="label" type="category" axisLine={{ stroke: '#e5e7eb' }} tickLine={{ stroke: '#e5e7eb' }} tick={{ fontSize: 11, fill: '#4b5563', fontWeight: 600 }} />
                <Tooltip 
                  cursor={{ fill: '#f3f4f6' }}
                  contentStyle={{ borderRadius: '8px', border: '1px solid #e5e7eb', boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)' }}
                  labelStyle={{ fontWeight: 'bold', color: '#111827', marginBottom: '4px' }}
                />
                <Bar dataKey="n" name="Leads" radius={[0, 4, 4, 0]}>
                  {funnelStages.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color || '#e5e7eb'} />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
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

      {/* Popups for Revenue Metrics */}
      {modalState && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-gray-900/50 backdrop-blur-sm animate-in fade-in duration-200">
          <div className="bg-white rounded-xl shadow-xl w-full max-w-lg max-h-[80vh] flex flex-col overflow-hidden animate-in zoom-in-95 duration-200">
            <div className="px-6 py-4 border-b border-gray-100 flex items-center justify-between bg-gray-50/50">
              <h3 className="font-bold text-gray-900">
                {modalState === 'captured' && `Captured Leads (${slice.conversions})`}
                {modalState === 'missed' && `Missed Opportunities (${slice.losses.length})`}
                {modalState === 'potential' && `Open Prospects (${slice.prospects.length})`}
              </h3>
              <button onClick={() => setModalState(null)} className="text-gray-400 hover:text-gray-600 transition-colors p-1">
                <X className="w-5 h-5" />
              </button>
            </div>
            <div className="p-6 overflow-y-auto flex-1 space-y-4">
              
              {modalState === 'potential' && slice.prospects.map((p, idx) => (
                <div key={idx} className="border border-gray-100 rounded-lg p-3 bg-gray-50/50">
                  <div className="flex justify-between items-start mb-2">
                    <button onClick={() => onNavigateToLead?.(p.lead)} className="font-bold text-sm text-blue-600 hover:underline text-left cursor-pointer focus:outline-none">{p.lead}</button>
                    <div className="text-right">
                      <div className="font-black text-[13px] text-gray-900">₹{p.amount.toLocaleString()}</div>
                    </div>
                  </div>
                  <div className="text-xs text-gray-600 leading-snug">{p.ai}</div>
                </div>
              ))}
              
              {modalState === 'missed' && slice.losses.map((l, idx) => (
                <div key={idx} className="border border-red-100 bg-red-50/30 rounded-lg p-3">
                  <div className="flex justify-between items-start mb-1">
                    <button onClick={() => onNavigateToLead?.(l.lead)} className="font-bold text-sm text-blue-600 hover:underline text-left cursor-pointer focus:outline-none">{l.lead}</button>
                    <div className="text-[13px] font-black text-gray-900">₹{l.amount.toLocaleString()}</div>
                  </div>
                  <div className="text-xs text-gray-600 font-medium italic mb-2">{l.note}</div>
                  <span className="text-[9px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full bg-red-100 text-red-700 flex-shrink-0">
                    {l.reason}
                  </span>
                </div>
              ))}

              {modalState === 'captured' && (
                <>
                  <div className="text-sm font-medium text-gray-500 mb-2 px-1">
                    Showing {capturedDetails.length} of {slice.conversions} recent conversions
                  </div>
                  {capturedDetails.map((c, idx) => (
                    <div key={idx} className="border border-green-100 bg-green-50/30 rounded-lg p-3">
                      <div className="flex justify-between items-start mb-1">
                        <button onClick={() => onNavigateToLead?.(c.lead)} className="font-bold text-sm text-blue-600 hover:underline text-left cursor-pointer focus:outline-none">{c.lead}</button>
                        <div className="text-[13px] font-black text-gray-900">₹{c.amount.toLocaleString()}</div>
                      </div>
                      <div className="flex justify-between items-center mb-2">
                        <div className="text-xs text-gray-600 font-medium italic">{c.plan}</div>
                        <span className="text-[9px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full bg-green-100 text-green-700 flex-shrink-0">
                          Converted
                        </span>
                      </div>
                      <div className="flex items-start text-xs text-green-800 bg-green-50/50 p-2 rounded border border-green-100/50">
                        <Sparkles className="w-3.5 h-3.5 mr-1.5 mt-0.5 text-green-500 flex-shrink-0" />
                        <span className="font-medium leading-snug">{c.ai}</span>
                      </div>
                    </div>
                  ))}
                </>
              )}

            </div>
          </div>
        </div>
      )}

    </div>
  );
}
