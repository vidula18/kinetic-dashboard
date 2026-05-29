import { ArrowUpRight, ChevronLeft, ChevronRight, Activity, Flame, PhoneCall, AlertTriangle, Clock, Zap } from 'lucide-react';

export function WeeklySummary() {
  return (
    <div className="mx-4 sm:mx-6 lg:mx-8 mb-12 mt-4 space-y-6">
      
      <div className="flex justify-between items-end mb-4">
        <div>
          <h2 className="text-xl font-extrabold text-gray-900">Weekly Summary Snapshot</h2>
          <div className="flex items-center space-x-2 mt-1">
            <button className="p-1 hover:bg-gray-200 rounded text-gray-500 transition-colors" title="Previous Week">
              <ChevronLeft className="w-4 h-4" />
            </button>
            <p className="text-sm text-gray-600 font-medium px-2">May 18 - May 24, 2026</p>
            <button className="p-1 hover:bg-gray-200 rounded text-gray-500 transition-colors" title="Next Week">
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        </div>
        <button className="text-sm font-medium text-blue-600 hover:text-blue-700 bg-blue-50 px-3 py-1.5 rounded-md transition-colors border border-blue-100">
          Export PDF
        </button>
      </div>
        
      {/* Bento-box Grid Layout */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        
        {/* Top-Left: Hero Card (spanning 2 columns, 2 rows) */}
        <div className="md:col-span-2 lg:col-span-2 md:row-span-2 flex">
          <div className="bg-gradient-to-br from-blue-600 to-indigo-700 rounded-2xl shadow-md border border-blue-800 p-6 flex flex-col justify-between w-full relative overflow-hidden group">
            <div className="absolute top-0 right-0 p-6 opacity-20 transform group-hover:scale-110 transition-transform duration-700">
              <Activity className="w-32 h-32 text-white" />
            </div>
            <div className="relative z-10">
              <div className="text-blue-100 font-bold uppercase tracking-widest text-[11px] mb-2 flex items-center">
                <Zap className="w-3.5 h-3.5 mr-2" />
                Total Leads Captured
              </div>
              <div className="text-6xl font-black text-white tracking-tighter mb-3 drop-shadow-sm">
                214
              </div>
              <div className="inline-flex items-center text-xs font-bold px-2.5 py-1 rounded-md text-white bg-white/20 backdrop-blur-sm border border-white/30">
                <ArrowUpRight className="w-3.5 h-3.5 mr-1" />
                +12% vs last week
              </div>
            </div>
            
            <div className="relative z-10 mt-6 pt-5 border-t border-blue-500/50 flex gap-6">
              <div>
                <div className="text-blue-200 text-[10px] font-semibold uppercase mb-0.5">Online</div>
                <div className="text-xl font-bold text-white">168</div>
              </div>
              <div>
                <div className="text-blue-200 text-[10px] font-semibold uppercase mb-0.5">Walk-in</div>
                <div className="text-xl font-bold text-white">46</div>
              </div>
            </div>
          </div>
        </div>

        {/* Top-Right: 2 Stat Cards */}
        <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-4 flex flex-col justify-between">
          <div className="flex items-center justify-between mb-3">
            <div className="w-8 h-8 rounded-full bg-orange-50 flex items-center justify-center">
              <Flame className="w-4 h-4 text-orange-500" />
            </div>
            <span className="text-[10px] font-bold text-orange-600 bg-orange-50 px-2 py-0.5 rounded border border-orange-100">Action Needed</span>
          </div>
          <div>
            <div className="text-2xl font-black text-gray-900">42</div>
            <div className="text-xs font-bold text-gray-500 mt-1">Hot Leads</div>
          </div>
        </div>

        <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-4 flex flex-col justify-between">
          <div className="flex items-center justify-between mb-3">
            <div className="w-8 h-8 rounded-full bg-green-50 flex items-center justify-center">
              <Activity className="w-4 h-4 text-green-500" />
            </div>
            <span className="text-[10px] font-bold text-green-600 bg-green-50 px-2 py-0.5 rounded border border-green-100">Near Finish</span>
          </div>
          <div>
            <div className="text-2xl font-black text-gray-900">18</div>
            <div className="text-xs font-bold text-gray-500 mt-1">Ready to Convert</div>
          </div>
        </div>

        {/* Middle-Right: Progress Card & Trend Card */}
        <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-4 flex flex-col justify-center">
          <div className="flex justify-between items-start mb-2">
            <div className="text-xs font-bold text-gray-500">Calls Made</div>
            <PhoneCall className="w-4 h-4 text-gray-400" />
          </div>
          <div className="flex items-baseline gap-2 mb-3">
            <div className="text-3xl font-black text-gray-900">196</div>
            <div className="text-xs font-medium text-gray-400">/ 245</div>
          </div>
          <div className="w-full bg-gray-100 rounded-full h-2 overflow-hidden">
            <div className="bg-blue-500 h-2 rounded-full" style={{ width: '80%' }}></div>
          </div>
          <div className="text-[10px] font-bold text-gray-500 mt-1.5 text-right">80% of Target</div>
        </div>

        <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-4 flex flex-col justify-center relative overflow-hidden">
          <div className="text-xs font-bold text-gray-500 mb-1 z-10">Alerts Generated</div>
          <div className="text-3xl font-black text-gray-900 z-10">35</div>
          <div className="flex items-center text-[11px] font-bold text-red-600 mt-1.5 z-10">
            <ArrowUpRight className="w-3 h-3 mr-1" />
            +5 this week
          </div>
          {/* Mock Sparkline Graphic */}
          <div className="absolute bottom-0 left-0 w-full h-1/2 flex items-end px-2 opacity-30 pointer-events-none">
             <div className="flex w-full items-end gap-1">
               <div className="w-1/6 bg-purple-400 rounded-t-sm h-1/3"></div>
               <div className="w-1/6 bg-purple-400 rounded-t-sm h-1/2"></div>
               <div className="w-1/6 bg-purple-400 rounded-t-sm h-2/5"></div>
               <div className="w-1/6 bg-purple-400 rounded-t-sm h-3/4"></div>
               <div className="w-1/6 bg-purple-400 rounded-t-sm h-full"></div>
             </div>
          </div>
        </div>

        {/* Bottom Wide: Attention Needed Area */}
        <div className="md:col-span-2 lg:col-span-4 bg-orange-50/50 rounded-2xl border border-orange-100 p-5 mt-1">
          <div className="flex items-center gap-2 mb-4">
            <div className="p-1.5 bg-orange-100 rounded-lg text-orange-600">
              <AlertTriangle className="w-4 h-4" />
            </div>
            <h3 className="text-sm font-extrabold text-gray-900">Requires Attention</h3>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="bg-white rounded-xl border border-red-100 shadow-sm p-3 flex items-center gap-3 border-l-4 border-l-red-500">
              <div className="w-10 h-10 bg-red-50 rounded-full flex items-center justify-center flex-shrink-0">
                <Clock className="w-5 h-5 text-red-500" />
              </div>
              <div>
                <div className="text-xl font-black text-gray-900">12</div>
                <div className="text-[11px] font-bold text-gray-500">Overdue Leads</div>
              </div>
            </div>
            
            <div className="bg-white rounded-xl border border-orange-100 shadow-sm p-3 flex items-center gap-3 border-l-4 border-l-orange-500">
              <div className="w-10 h-10 bg-orange-50 rounded-full flex items-center justify-center flex-shrink-0">
                <Activity className="w-5 h-5 text-orange-500" />
              </div>
              <div>
                <div className="text-xl font-black text-gray-900">24</div>
                <div className="text-[11px] font-bold text-gray-500">Untouched Leads</div>
              </div>
            </div>

            <div className="bg-white rounded-xl border border-blue-100 shadow-sm p-3 flex items-center gap-3 border-l-4 border-l-blue-500">
              <div className="w-10 h-10 bg-blue-50 rounded-full flex items-center justify-center flex-shrink-0">
                <PhoneCall className="w-5 h-5 text-blue-500" />
              </div>
              <div>
                <div className="text-xl font-black text-gray-900">64</div>
                <div className="text-[11px] font-bold text-gray-500">Follow-ups Due</div>
              </div>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}
