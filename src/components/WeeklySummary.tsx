import { TrendingUp, Users, Clock, AlertTriangle, CheckCircle2, ChevronRight, Activity, Bell } from 'lucide-react';
import { LabelPill } from './LabelPill';
import { MOCK_LABELS } from '../data/labelConfig';
import type { Lead } from '../data/mockLeads';
import type { Alert } from '../data/mockAlerts';

interface WeeklySummaryProps {
  leads: Lead[];
  alerts: Alert[];
  onNavigateToTab: (tab: 'Alerts' | 'Leads') => void;
}

export function WeeklySummary({ leads, alerts, onNavigateToTab }: WeeklySummaryProps) {
  // Mock data for weekly trend
  const trendDays = [
    { day: 'Mon', count: 12, height: 'h-12' },
    { day: 'Tue', count: 19, height: 'h-20' },
    { day: 'Wed', count: 15, height: 'h-16' },
    { day: 'Thu', count: 24, height: 'h-24' },
    { day: 'Fri', count: 18, height: 'h-20' },
    { day: 'Sat', count: 8, height: 'h-8' },
    { day: 'Sun', count: 5, height: 'h-5' },
  ];

  return (
    <div className="mx-4 sm:mx-6 lg:mx-8 mb-12 mt-4 space-y-6">
      
      {/* 1. Summary Metrics */}
      <section>
        <h2 className="text-lg font-bold text-gray-900 mb-4">This Week at a Glance</h2>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
          <MetricCard title="Total Leads" value={leads.length.toString()} icon={Users} trend="+12%" trendUp={true} />
          <MetricCard title="Hot Leads" value="4" icon={TrendingUp} trend="+2" trendUp={true} color="green" />
          <MetricCard title="Follow-ups Due" value="7" icon={Clock} trend="-3" trendUp={true} color="orange" />
          <MetricCard title="Overdue Leads" value="2" icon={AlertTriangle} trend="+1" trendUp={false} color="red" />
          <MetricCard title="Ready to Convert" value="5" icon={CheckCircle2} trend="+4" trendUp={true} color="green" />
          <MetricCard title="Alerts Generated" value={alerts.length.toString()} icon={Bell} trend="Steady" color="blue" />
        </div>
      </section>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* 2. Trend / Activity Section */}
        <section className="bg-white rounded-xl shadow-sm border border-gray-200 p-5 lg:col-span-2">
          <div className="flex justify-between items-center mb-6">
            <h3 className="text-base font-bold text-gray-900 flex items-center">
              <Activity className="w-5 h-5 mr-2 text-blue-500" /> Lead Volume Trend
            </h3>
            <span className="text-sm text-gray-500">Past 7 Days</span>
          </div>
          
          <div className="flex items-end justify-between h-40 pt-4 border-b border-gray-100 pb-2 px-2">
            {trendDays.map((stat, idx) => (
              <div key={idx} className="flex flex-col items-center gap-2 group">
                <span className="text-xs font-bold text-gray-400 opacity-0 group-hover:opacity-100 transition-opacity">
                  {stat.count}
                </span>
                <div className={`w-8 sm:w-12 bg-blue-100 hover:bg-blue-500 rounded-t-md transition-colors ${stat.height} relative`}>
                  {idx === 3 && ( // Highlight peak day
                    <div className="absolute -top-1 left-0 w-full h-1 bg-blue-500 rounded-t-md"></div>
                  )}
                </div>
                <span className="text-xs font-medium text-gray-500">{stat.day}</span>
              </div>
            ))}
          </div>
        </section>

        {/* 3. Priority Breakdown */}
        <section className="bg-white rounded-xl shadow-sm border border-gray-200 p-5">
          <h3 className="text-base font-bold text-gray-900 mb-4">Top Priorities</h3>
          <div className="space-y-4">
            {MOCK_LABELS.slice(0, 5).map((label, idx) => {
              const Icon = label.icon;
              return (
                <div key={idx} className="flex items-center justify-between">
                  <div className="flex items-center">
                    <LabelPill color={label.color}>
                      <Icon className="w-3.5 h-3.5 mr-1.5 opacity-70" />
                      {label.text}
                    </LabelPill>
                  </div>
                  <span className="text-sm font-bold text-gray-700">
                    {Math.floor(Math.random() * 5) + 1} leads
                  </span>
                </div>
              );
            })}
          </div>
          <button 
            onClick={() => onNavigateToTab('Leads')}
            className="w-full mt-6 py-2 px-4 bg-gray-50 hover:bg-gray-100 text-sm font-medium text-blue-600 rounded-lg transition-colors border border-gray-200"
          >
            Filter all priorities
          </button>
        </section>
      </div>

      {/* 4. Top Actions */}
      <section>
        <h2 className="text-lg font-bold text-gray-900 mb-4">Recommended Actions</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <ActionBlock 
            title="Call Overdue Leads" 
            desc="2 leads have passed their SLA." 
            icon={AlertTriangle} 
            color="orange"
            onClick={() => onNavigateToTab('Leads')}
          />
          <ActionBlock 
            title="Review AI Alerts" 
            desc={`${alerts.length} new insights detected.`} 
            icon={Bell} 
            color="blue"
            onClick={() => onNavigateToTab('Alerts')}
          />
          <ActionBlock 
            title="Address Language Gaps" 
            desc="3 leads need regional reps." 
            icon={Users} 
            color="gray"
            onClick={() => onNavigateToTab('Leads')}
          />
          <ActionBlock 
            title="Close Hot Leads" 
            desc="4 leads ready for trial." 
            icon={TrendingUp} 
            color="green"
            onClick={() => onNavigateToTab('Leads')}
          />
        </div>
      </section>

    </div>
  );
}

function MetricCard({ title, value, icon: Icon, trend, trendUp, color = 'blue' }: any) {
  const colorMap: any = {
    blue: 'text-blue-600 bg-blue-50',
    green: 'text-green-600 bg-green-50',
    orange: 'text-orange-600 bg-orange-50',
    red: 'text-red-600 bg-red-50',
  };

  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-4">
      <div className="flex justify-between items-start mb-2">
        <div className={`p-2 rounded-lg ${colorMap[color]}`}>
          <Icon className="w-5 h-5" />
        </div>
        {trend && (
          <span className={`text-[11px] font-bold px-1.5 py-0.5 rounded ${
            trendUp === true ? 'text-green-700 bg-green-50' : 
            trendUp === false ? 'text-red-700 bg-red-50' : 'text-gray-500 bg-gray-100'
          }`}>
            {trend}
          </span>
        )}
      </div>
      <div>
        <div className="text-2xl font-black text-gray-900">{value}</div>
        <div className="text-xs font-medium text-gray-500 mt-1">{title}</div>
      </div>
    </div>
  );
}

function ActionBlock({ title, desc, icon: Icon, color, onClick }: any) {
  const hoverBorder: any = {
    blue: 'hover:border-blue-300',
    green: 'hover:border-green-300',
    orange: 'hover:border-orange-300',
    gray: 'hover:border-gray-400',
  };

  const iconColor: any = {
    blue: 'text-blue-500',
    green: 'text-green-500',
    orange: 'text-orange-500',
    gray: 'text-gray-600',
  };

  return (
    <div 
      onClick={onClick}
      className={`bg-white rounded-xl shadow-sm border border-gray-200 p-5 cursor-pointer transition-all duration-200 hover:shadow-md group ${hoverBorder[color]}`}
    >
      <div className="flex justify-between items-start mb-3">
        <Icon className={`w-6 h-6 ${iconColor[color]}`} />
        <ChevronRight className="w-4 h-4 text-gray-300 group-hover:text-gray-500 transition-colors" />
      </div>
      <h4 className="text-sm font-bold text-gray-900 mb-1">{title}</h4>
      <p className="text-xs text-gray-500">{desc}</p>
    </div>
  );
}
