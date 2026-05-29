import React, { useState } from 'react';
import { Sparkles, AlertCircle, CheckCircle, AlertTriangle, Activity, ChevronDown, ChevronUp, PlayCircle } from 'lucide-react';

export function SalesPerformance() {
  const [expandedRow, setExpandedRow] = useState<number | null>(null);

  // Mock data for weekly trend
  const trendDays = [
    { day: 'Mon', calls: 12, conversions: 4, height: 'h-12' },
    { day: 'Tue', calls: 19, conversions: 6, height: 'h-20' },
    { day: 'Wed', calls: 15, conversions: 5, height: 'h-16' },
    { day: 'Thu', calls: 24, conversions: 8, height: 'h-24' },
    { day: 'Fri', calls: 18, conversions: 7, height: 'h-20' },
    { day: 'Sat', calls: 8, conversions: 2, height: 'h-8' },
    { day: 'Sun', calls: 5, conversions: 1, height: 'h-5' },
  ];

  const teamPerformance = [
    { 
      name: 'Aarav Mehta', role: 'Sales', leads: 24, calls: 24, conversions: 8, winRate: 33, note: 'Strong discovery, weak trial push',
      leadsInteracted: [
        {
          leadName: 'John Doe',
          calls: [
            { datetime: 'May 18, 10:30 AM', outcome: 'Trial Started', duration: '12m 40s', summary: 'Good engagement on pricing. Needs follow up on Friday.' },
            { datetime: 'May 20, 2:15 PM', outcome: 'Follow Up', duration: '8m 15s', summary: 'Checked in on trial progress. Answered technical integration questions.' },
            { datetime: 'May 22, 11:00 AM', outcome: 'Converted', duration: '5m 20s', summary: 'Successfully closed. Sent payment link.' }
          ]
        },
        {
          leadName: 'Sarah Smith',
          calls: [
            { datetime: 'May 19, 2:15 PM', outcome: 'Not Interested', duration: '3m 10s', summary: 'Budget constraints.' }
          ]
        }
      ]
    },
    { 
      name: 'Priya Nair', role: 'Sales', leads: 18, calls: 18, conversions: 6, winRate: 33, note: 'Warm, empathetic calls',
      leadsInteracted: [
        {
          leadName: 'Amit Patel',
          calls: [
            { datetime: 'May 18, 1:00 PM', outcome: 'Converted', duration: '18m 20s', summary: 'Excellent rapport building. Signed up for Pro tier.' }
          ]
        },
        {
          leadName: 'Neha Sharma',
          calls: [
            { datetime: 'May 21, 4:45 PM', outcome: 'Follow Up', duration: '10m 05s', summary: 'Waiting for manager approval.' },
            { datetime: 'May 23, 10:30 AM', outcome: 'Follow Up', duration: '4m 10s', summary: 'Manager is out of office. Re-engage next week.' }
          ]
        }
      ]
    },
    { 
      name: 'Rohan Gupta', role: 'FSE', leads: 15, calls: 15, conversions: 9, winRate: 60, note: 'Thorough assessments',
      leadsInteracted: [
        {
          leadName: 'Vikram Singh',
          calls: [
            { datetime: 'May 22, 9:30 AM', outcome: 'Trial Started', duration: '22m 15s', summary: 'Deep dive into feature set. Very interested.' }
          ]
        }
      ]
    },
    { 
      name: 'Sneha Iyer', role: 'FSE', leads: 12, calls: 12, conversions: 7, winRate: 58, note: 'Needs clear next steps',
      leadsInteracted: [
        {
          leadName: 'Karan Desai',
          calls: [
            { datetime: 'May 23, 3:20 PM', outcome: 'Converted', duration: '15m 50s', summary: 'Quick close. Handled objections well.' }
          ]
        },
        {
          leadName: 'Pooja Reddy',
          calls: [
            { datetime: 'May 24, 11:45 AM', outcome: 'Follow Up', duration: '11m 30s', summary: 'Requested demo for larger team.' }
          ]
        }
      ]
    },
  ];

  return (
    <div className="mx-4 sm:mx-6 lg:mx-8 mb-12 mt-4 space-y-6">

      {/* 2. Band 2: Trends & AI Insights */}
      <div className="grid grid-cols-1 lg:grid-cols-5 gap-6">
        
        {/* Left Column: Visual Trend Chart (3 cols) */}
        <section className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 lg:col-span-3 flex flex-col">
          <div className="flex justify-between items-center mb-6">
            <h3 className="text-base font-bold text-gray-900 flex items-center">
              <Activity className="w-5 h-5 mr-2 text-blue-500" /> Weekly Activity Trend
            </h3>
            <div className="flex items-center space-x-4 text-xs font-medium text-gray-500">
              <div className="flex items-center"><span className="w-3 h-3 rounded-sm bg-gray-100 border border-gray-200 mr-2"></span>Total Calls</div>
              <div className="flex items-center"><span className="w-3 h-3 rounded-sm bg-blue-500 mr-2"></span>Conversions</div>
            </div>
          </div>
          
          {/* Chart Graphic Area */}
          <div className="flex items-end justify-between flex-1 pt-4 px-2 relative mt-4">
            {trendDays.map((stat, idx) => (
              <div key={idx} className="flex flex-col items-center w-full">
                <div className="relative w-8 sm:w-12 flex justify-center">
                   {/* Bar for calls */}
                   <div className={`w-full bg-gray-100 rounded-t-md relative ${stat.height} transition-colors hover:bg-gray-200`}>
                   </div>
                   {/* Solid bar for conversions overlaying the calls bar */}
                   <div 
                     className="absolute bottom-0 w-full rounded-b-md bg-blue-500 z-10 opacity-90 transition-all border-t border-blue-400" 
                     style={{ height: `${(stat.conversions / stat.calls) * 100}%` }}
                   ></div>
                </div>
              </div>
            ))}
          </div>
          
          {/* Summary Row */}
          <div className="flex justify-between px-2 mt-4 pt-4 border-t border-gray-100">
             {trendDays.map((stat, idx) => (
                <div key={`summary-${idx}`} className="flex flex-col items-center w-full text-[10px] sm:text-xs text-gray-500">
                   <div className="font-bold text-gray-800 mb-1.5">{stat.day}</div>
                   <div className="flex flex-col items-center gap-0.5">
                     <div>Calls: <span className="font-mono text-gray-900 font-medium">{stat.calls}</span></div>
                     <div>Conv: <span className="font-mono text-blue-600 font-bold">{stat.conversions}</span></div>
                     <div className="text-[10px] mt-1 text-gray-400 font-semibold bg-gray-50 px-1.5 py-0.5 rounded">{Math.round((stat.conversions/stat.calls)*100)}% Rate</div>
                   </div>
                </div>
             ))}
          </div>
        </section>

        {/* Right Column: AI Insights (2 cols) */}
        <section className="bg-blue-50/50 rounded-xl border border-blue-100 p-6 lg:col-span-2">
          <div className="flex items-center mb-6">
            <Sparkles className="w-5 h-5 text-blue-600 mr-2" />
            <h3 className="text-base font-bold text-gray-900">AI Weekly Insights</h3>
          </div>
          
          <div className="space-y-5">
            <div className="flex items-start bg-white p-3.5 rounded-lg border border-red-100 shadow-sm">
              <div className="p-1 bg-red-100 rounded text-red-600 mt-0.5 mr-3 flex-shrink-0">
                <AlertCircle className="w-3.5 h-3.5" />
              </div>
              <div>
                <span className="text-[10px] font-bold text-red-700 uppercase tracking-wider block mb-1">Risk</span>
                <p className="text-sm text-gray-800 leading-snug font-medium">Offline trial follow-ups are slipping (avg TAT increased by 1.2 days).</p>
              </div>
            </div>
            
            <div className="flex items-start bg-white p-3.5 rounded-lg border border-green-100 shadow-sm">
              <div className="p-1 bg-green-100 rounded text-green-600 mt-0.5 mr-3 flex-shrink-0">
                <CheckCircle className="w-3.5 h-3.5" />
              </div>
              <div>
                <span className="text-[10px] font-bold text-green-700 uppercase tracking-wider block mb-1">Win</span>
                <p className="text-sm text-gray-800 leading-snug font-medium">Aarav Mehta drove a record 36% conversion rate on online leads.</p>
              </div>
            </div>

            <div className="flex items-start bg-white p-3.5 rounded-lg border border-orange-100 shadow-sm">
              <div className="p-1 bg-orange-100 rounded text-orange-600 mt-0.5 mr-3 flex-shrink-0">
                <AlertTriangle className="w-3.5 h-3.5" />
              </div>
              <div>
                <span className="text-[10px] font-bold text-orange-700 uppercase tracking-wider block mb-1">Action</span>
                <p className="text-sm text-gray-800 leading-snug font-medium">14 fresh leads from Meta Ads are untouched. Reassign immediately.</p>
              </div>
            </div>
          </div>
        </section>
      </div>

      {/* 3. Band 3: Team Breakdown */}
      <section className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
        <div className="px-6 py-5 border-b border-gray-200 flex justify-between items-center bg-gray-50/50">
          <h3 className="text-base font-bold text-gray-900">Team Performance Breakdown</h3>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="border-b border-gray-200 text-[11px] uppercase tracking-wider text-gray-500 font-bold bg-white">
                <th className="px-6 py-4">Rep Name</th>
                <th className="px-6 py-4">Role</th>
                <th className="px-6 py-4 text-right">Leads Handled</th>
                <th className="px-6 py-4 text-right">Calls Made</th>
                <th className="px-6 py-4 text-right">Conversions</th>
                <th className="px-6 py-4 text-right">Win Rate</th>
                <th className="px-6 py-4">AI Performance Note</th>
                <th className="px-4 py-4"></th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {teamPerformance.map((rep, idx) => (
                <React.Fragment key={idx}>
                  <tr 
                    onClick={() => setExpandedRow(expandedRow === idx ? null : idx)}
                    className={`hover:bg-gray-50 transition-colors cursor-pointer border-l-4 ${expandedRow === idx ? 'bg-blue-50/50 border-l-blue-600' : 'bg-white border-l-transparent'}`}
                  >
                    <td className="px-6 py-4 whitespace-nowrap font-bold text-sm text-gray-900">{rep.name}</td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`text-[11px] font-bold px-2.5 py-1 rounded-full ${rep.role === 'Sales' ? 'bg-blue-50 text-blue-700 border border-blue-100' : 'bg-purple-50 text-purple-700 border border-purple-100'}`}>
                        {rep.role}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600 font-mono text-right">{rep.leads}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-blue-600 font-bold font-mono text-right underline decoration-blue-300 underline-offset-2 decoration-dashed">{rep.calls}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 font-bold font-mono text-right">{rep.conversions}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 font-bold font-mono text-right">{rep.winRate}%</td>
                    <td className="px-6 py-4 text-sm text-gray-600 truncate max-w-[200px]" title={rep.note}>{rep.note}</td>
                    <td className="px-4 py-4 text-right">
                      {expandedRow === idx ? <ChevronUp className="w-5 h-5 text-gray-400 inline" /> : <ChevronDown className="w-5 h-5 text-gray-400 inline" />}
                    </td>
                  </tr>
                  
                  {/* Expanded Call List Row - Grouped by Lead */}
                  {expandedRow === idx && (
                    <tr className="bg-gray-50/50">
                      <td colSpan={8} className="px-6 py-6 border-b border-gray-200">
                        <div className="bg-white border border-gray-200 rounded-lg shadow-sm p-5">
                          <div className="flex justify-between items-center mb-5">
                            <h4 className="text-sm font-bold text-gray-900">{rep.name}'s Call History (May 18 - 24)</h4>
                            <span className="text-xs font-medium bg-gray-100 text-gray-600 px-2.5 py-1 rounded-full">{rep.leadsInteracted.length} Leads Contacted</span>
                          </div>
                          
                          <div className="space-y-6">
                            {rep.leadsInteracted.map((leadGroup: any, lgIdx: number) => (
                              <div key={lgIdx} className="bg-gray-50/50 rounded-lg border border-gray-100 overflow-hidden shadow-sm">
                                {/* Lead Group Header */}
                                <div className="bg-gray-100/80 px-4 py-2 border-b border-gray-200/60 flex items-center">
                                   <div className="font-bold text-gray-800 text-sm flex items-center">
                                      <span className="w-6 h-6 rounded-full bg-blue-100 text-blue-700 flex items-center justify-center text-xs mr-2">{leadGroup.leadName.charAt(0)}</span>
                                      {leadGroup.leadName}
                                   </div>
                                   <div className="ml-3 text-[10px] font-bold text-gray-500 bg-white px-2 py-0.5 rounded shadow-sm border border-gray-200">
                                     {leadGroup.calls.length} Call{leadGroup.calls.length > 1 ? 's' : ''}
                                   </div>
                                </div>
                                
                                {/* Calls for this Lead */}
                                <div className="overflow-x-auto">
                                  <table className="w-full text-left text-sm">
                                    <tbody className="divide-y divide-gray-100">
                                      {leadGroup.calls.map((call: any, cIdx: number) => (
                                        <tr key={cIdx} className="hover:bg-white transition-colors">
                                          <td className="py-3 px-4 text-gray-500 text-xs w-32 whitespace-nowrap border-r border-gray-50">{call.datetime}</td>
                                          <td className="py-3 px-4 w-32">
                                            <span className={`px-2.5 py-1 rounded text-[10px] font-bold uppercase tracking-wider ${
                                              call.outcome === 'Converted' || call.outcome === 'Trial Started' ? 'bg-green-50 text-green-700 border border-green-100' :
                                              call.outcome === 'Follow Up' ? 'bg-blue-50 text-blue-700 border border-blue-100' :
                                              'bg-gray-100 text-gray-700 border border-gray-200'
                                            }`}>
                                              {call.outcome}
                                            </span>
                                          </td>
                                          <td className="py-3 px-4 text-gray-500 font-mono text-xs w-20">{call.duration}</td>
                                          <td className="py-3 px-4 w-24">
                                            <button className="text-blue-600 hover:text-blue-800 flex items-center font-medium text-[11px] transition-colors bg-blue-50 hover:bg-blue-100 px-2.5 py-1 rounded border border-blue-100">
                                              <PlayCircle className="w-3.5 h-3.5 mr-1.5" /> Play
                                            </button>
                                          </td>
                                          <td className="py-3 px-4 text-gray-600 text-xs pr-4">
                                            <div className="bg-white px-3 py-2 rounded border border-gray-100 flex shadow-sm">
                                              <Sparkles className="w-3 h-3 text-blue-500 mr-2 flex-shrink-0 mt-0.5" />
                                              <span className="italic leading-tight">{call.summary}</span>
                                            </div>
                                          </td>
                                        </tr>
                                      ))}
                                    </tbody>
                                  </table>
                                </div>
                              </div>
                            ))}
                          </div>
                        </div>
                      </td>
                    </tr>
                  )}
                </React.Fragment>
              ))}
            </tbody>
          </table>
        </div>
      </section>

    </div>
  );
}
