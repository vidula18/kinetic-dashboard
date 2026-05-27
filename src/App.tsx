import React, { useState } from 'react';
import { 
  Search, LayoutDashboard, BarChart3, Users, Calendar, 
  Bell, Filter, TrendingUp, AlertTriangle, 
  MessageSquare, Clock, Phone, Globe, CheckCircle2, ChevronDown
} from 'lucide-react';
import { formatDistanceToNow } from 'date-fns';

// Data types
type LabelType = 'Hot Lead' | 'Ready to Convert' | 'Follow-up' | 'Overdue' | 'Language Gap' | 'Needs Review' | 'Uncontacted' | 'Pending';
type LabelColor = 'green' | 'orange' | 'blue' | 'gray';

interface LeadLabel {
  text: LabelType;
  color: LabelColor;
  icon: React.ElementType;
}

interface Lead {
  id: string;
  name: string;
  source: string;
  phone: string;
  timeReceived: Date;
  labels: LeadLabel[];
}

interface Alert {
  id: string;
  leadName: string;
  insight: string;
  action: string;
  date: string;
  labelColor: LabelColor;
  labelText: string;
}

// Mock Data
const MOCK_LABELS: LeadLabel[] = [
  { text: 'Hot Lead', color: 'green', icon: TrendingUp },
  { text: 'Follow-up', color: 'orange', icon: Clock },
  { text: 'Language Gap', color: 'blue', icon: Globe },
  { text: 'Uncontacted', color: 'gray', icon: Phone },
  { text: 'Overdue', color: 'orange', icon: AlertTriangle },
  { text: 'Needs Review', color: 'blue', icon: MessageSquare },
  { text: 'Ready to Convert', color: 'green', icon: CheckCircle2 },
  { text: 'Pending', color: 'gray', icon: Clock },
];

const MOCK_LEADS: Lead[] = Array.from({ length: 15 }).map((_, i) => {
  const now = new Date();
  // Ensure the first few are very recent
  const minutesAgo = i < 3 ? (i + 1) * 5 : i * 45 + 30; 
  const randomLabels = [
    MOCK_LABELS[i % MOCK_LABELS.length],
    ...(i % 3 === 0 ? [MOCK_LABELS[(i + 2) % MOCK_LABELS.length]] : [])
  ];

  const names = ["Ishaan Verma", "Lakshmi Rao", "Dev Anand", "Ananya Sharma", "Neha Pillai", "Rohit Sinha", "Farah Sheikh", "Manoj Gupta", "Aditya Nair", "Priya Desai", "Karthik Reddy", "Meera Joshi", "Arjun Patel", "Neha Kulkarni", "Rohan Shetty"];
  const sources = ["Meta Ads", "Google Ads", "Instagram", "Referral", "WhatsApp"];
  
  return {
    id: `lead-${i}`,
    name: names[i] || `Lead ${i+1}`,
    source: sources[i % sources.length],
    phone: `+91 98${Math.floor(10000000 + Math.random() * 90000000)}`,
    timeReceived: new Date(now.getTime() - minutesAgo * 60000),
    labels: randomLabels,
  };
});

const MOCK_ALERTS: Alert[] = [
  { id: '1', leadName: 'Ananya Sharma', insight: '82% likely to convert', action: 'Call Now', date: '27 May 2026', labelColor: 'green', labelText: 'Hot Lead' },
  { id: '2', leadName: 'Karthik Reddy', insight: 'call not started', action: 'Call Now', date: '26 May 2026', labelColor: 'blue', labelText: 'Uncontacted' },
  { id: '3', leadName: 'Aditya Nair', insight: '21% likely · intent 1/5', action: 'Review', date: '25 May 2026', labelColor: 'orange', labelText: 'At Risk' },
  { id: '4', leadName: 'Vikram Rao', insight: 'follow-up overdue · 3 days', action: 'Confirm Slot', date: '24 May 2026', labelColor: 'orange', labelText: 'Overdue' },
  { id: '5', leadName: 'Sara Khan', insight: 'language gap flagged', action: 'Queue AI', date: '22 May 2026', labelColor: 'blue', labelText: 'Language Gap' },
];

// Helper Components
const Pill = ({ color, children, className = '' }: { color: LabelColor, children: React.ReactNode, className?: string }) => {
  const colorStyles = {
    green: 'bg-green-100 text-green-700 border-green-200',
    orange: 'bg-orange-100 text-orange-700 border-orange-200',
    blue: 'bg-blue-100 text-blue-700 border-blue-200',
    gray: 'bg-gray-100 text-gray-700 border-gray-200',
  };

  return (
    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium border ${colorStyles[color]} ${className}`}>
      {children}
    </span>
  );
};

export default function App() {
  const [showAllLeads, setShowAllLeads] = useState(false);
  const [activeFilter, setActiveFilter] = useState<LabelType | null>(null);

  // Compute label counts for the filter bar
  const labelCounts = MOCK_LABELS.map(label => {
    const count = MOCK_LEADS.filter(lead => lead.labels.some(l => l.text === label.text)).length;
    return { ...label, count };
  }).filter(l => l.count > 0);

  // Filter leads based on active filter
  const filteredLeads = activeFilter 
    ? MOCK_LEADS.filter(lead => lead.labels.some(l => l.text === activeFilter))
    : MOCK_LEADS;

  const visibleLeads = showAllLeads ? filteredLeads : filteredLeads.slice(0, 5);

  return (
    <div className="min-h-screen bg-gray-50 flex">
      {/* Sidebar Navigation */}
      <aside className="w-64 bg-white border-r border-gray-200 hidden md:flex flex-col">
        <div className="p-4 border-b border-gray-200 flex items-center space-x-2">
          <div className="w-8 h-8 bg-blue-600 rounded-md flex items-center justify-center text-white font-bold">KA</div>
          <div>
            <h1 className="text-sm font-bold text-gray-900">Kinetic Age</h1>
            <p className="text-xs text-gray-500">Admin Panel</p>
          </div>
        </div>
        
        <div className="flex-1 overflow-y-auto py-4">
          <p className="px-4 text-xs font-semibold text-gray-400 uppercase tracking-wider mb-2">Navigation</p>
          <nav className="space-y-1">
            <a href="#" className="flex items-center px-4 py-2 text-sm font-medium text-blue-600 bg-blue-50">
              <LayoutDashboard className="mr-3 h-5 w-5 text-blue-600" /> Dashboard
            </a>
            <a href="#" className="flex items-center px-4 py-2 text-sm font-medium text-gray-600 hover:bg-gray-50 hover:text-gray-900">
              <BarChart3 className="mr-3 h-5 w-5 text-gray-400" /> Analytics
            </a>
            <a href="#" className="flex items-center px-4 py-2 text-sm font-medium text-gray-600 hover:bg-gray-50 hover:text-gray-900">
              <Users className="mr-3 h-5 w-5 text-gray-400" /> Clients
            </a>
            <a href="#" className="flex items-center px-4 py-2 text-sm font-medium text-gray-600 hover:bg-gray-50 hover:text-gray-900">
              <Calendar className="mr-3 h-5 w-5 text-gray-400" /> Sessions
            </a>
          </nav>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 flex flex-col min-w-0 overflow-hidden">
        {/* Header */}
        <header className="bg-white border-b border-gray-200 px-4 py-3 sm:px-6 flex items-center justify-between">
          <div className="flex-1 flex items-center">
            <button className="md:hidden p-2 text-gray-400 hover:text-gray-500">
              <span className="sr-only">Open sidebar</span>
              <MenuIcon className="h-6 w-6" />
            </button>
            <div className="max-w-md w-full ml-4 md:ml-0 relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Search className="h-4 w-4 text-gray-400" />
              </div>
              <input 
                type="text" 
                className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md leading-5 bg-gray-50 placeholder-gray-500 focus:outline-none focus:placeholder-gray-400 focus:ring-1 focus:ring-blue-500 focus:border-blue-500 sm:text-sm" 
                placeholder="Search leads, clients, sessions..." 
              />
            </div>
          </div>
          <div className="ml-4 flex items-center md:ml-6">
            <button className="p-1 rounded-full text-gray-400 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500">
              <Bell className="h-6 w-6" />
            </button>
            <div className="ml-3 relative flex items-center gap-3">
              <div className="text-right hidden sm:block">
                <p className="text-sm font-medium text-gray-900">Riddhi</p>
                <p className="text-xs text-gray-500">Admin</p>
              </div>
              <div className="h-8 w-8 rounded-full bg-blue-100 flex items-center justify-center text-blue-700 font-medium">
                AD
              </div>
            </div>
          </div>
        </header>

        {/* Content Area */}
        <div className="flex-1 overflow-y-auto bg-gray-50 p-4 sm:p-6 lg:p-8">
          
          {/* Tabs */}
          <div className="mb-6 flex space-x-1 p-1 bg-gray-100 rounded-lg inline-flex">
            <button className="px-4 py-2 text-sm font-medium bg-white rounded-md shadow text-gray-900">Alerts</button>
            <button className="px-4 py-2 text-sm font-medium text-gray-500 hover:text-gray-700">Leads</button>
            <button className="px-4 py-2 text-sm font-medium text-gray-500 hover:text-gray-700">Weekly Summary</button>
          </div>

          {/* Fresh Leads Section */}
          <section className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden mb-8">
            <div className="px-6 py-5 border-b border-gray-200">
              <div className="flex items-center justify-between">
                <h2 className="text-lg font-semibold text-gray-900">Today's Fresh Leads</h2>
                <span className="bg-blue-100 text-blue-700 py-1 px-3 rounded-full text-sm font-medium">
                  {MOCK_LEADS.length} New
                </span>
              </div>

              {/* Quick Filter Bar */}
              <div className="mt-4 flex flex-wrap gap-2">
                <button 
                  onClick={() => setActiveFilter(null)}
                  className={`px-3 py-1.5 rounded-full text-xs font-medium border transition-colors ${
                    activeFilter === null 
                      ? 'bg-gray-800 text-white border-gray-800' 
                      : 'bg-white text-gray-600 border-gray-300 hover:bg-gray-50'
                  }`}
                >
                  All
                </button>
                {labelCounts.map(label => {
                  const Icon = label.icon;
                  return (
                    <button
                      key={label.text}
                      onClick={() => setActiveFilter(activeFilter === label.text ? null : label.text)}
                      className={`flex items-center px-3 py-1.5 rounded-full text-xs font-medium border transition-colors ${
                        activeFilter === label.text
                          ? 'ring-2 ring-blue-500 ring-offset-1 border-transparent'
                          : 'bg-white border-gray-300 hover:bg-gray-50'
                      }`}
                    >
                      <Icon className="w-3.5 h-3.5 mr-1.5 opacity-70" />
                      {label.text}
                      <span className="ml-1.5 bg-gray-100 px-1.5 py-0.5 rounded-full text-[10px] text-gray-600">
                        {label.count}
                      </span>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Table Layout for Leads */}
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Lead</th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status / Labels</th>
                    <th scope="col" className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">Time Received</th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {visibleLeads.map((lead) => (
                    <tr key={lead.id} className="hover:bg-gray-50 transition-colors group">
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center">
                          <div className="flex-shrink-0 h-10 w-10 rounded-full bg-blue-50 flex items-center justify-center border border-blue-100">
                            <Users className="h-5 w-5 text-blue-500" />
                          </div>
                          <div className="ml-4">
                            <div className="text-sm font-bold text-gray-900 group-hover:text-blue-600 transition-colors">{lead.name}</div>
                            <div className="text-sm text-gray-500 flex items-center gap-2 mt-0.5">
                              <span>{lead.source}</span>
                              <span className="text-gray-300">•</span>
                              <span className="text-gray-400 font-mono text-xs">{lead.phone}</span>
                            </div>
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex gap-2">
                          {lead.labels.map((label, idx) => {
                            const Icon = label.icon;
                            return (
                              <Pill key={idx} color={label.color}>
                                <Icon className="w-3 h-3 mr-1" />
                                {label.text}
                              </Pill>
                            );
                          })}
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-right text-sm text-gray-500">
                        {formatDistanceToNow(lead.timeReceived, { addSuffix: true })}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* Progressive Disclosure Footer */}
            {!showAllLeads && filteredLeads.length > 5 && (
              <div className="bg-gray-50 px-6 py-4 border-t border-gray-200 flex justify-center">
                <button 
                  onClick={() => setShowAllLeads(true)}
                  className="text-sm font-medium text-blue-600 hover:text-blue-800 flex items-center bg-white px-4 py-2 rounded-md shadow-sm border border-gray-200"
                >
                  View All ({filteredLeads.length}) <ChevronDown className="ml-1 w-4 h-4" />
                </button>
              </div>
            )}
            {showAllLeads && (
              <div className="bg-gray-50 px-6 py-4 border-t border-gray-200 flex justify-center">
                <button 
                  onClick={() => setShowAllLeads(false)}
                  className="text-sm font-medium text-gray-600 hover:text-gray-900 flex items-center bg-white px-4 py-2 rounded-md shadow-sm border border-gray-200"
                >
                  Show Less <ChevronDown className="ml-1 w-4 h-4 rotate-180" />
                </button>
              </div>
            )}
          </section>

          {/* AI Alerts Section */}
          <section className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
            <div className="px-6 py-5 border-b border-gray-200 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <h2 className="text-lg font-semibold text-gray-900">AI Alerts (past 30 days)</h2>
                <span className="bg-blue-100 text-blue-700 py-0.5 px-2.5 rounded-full text-xs font-medium">10</span>
              </div>
              <div className="flex items-center gap-2">
                <button className="flex items-center px-3 py-1.5 border border-gray-300 rounded-md text-sm font-medium text-gray-700 bg-white hover:bg-gray-50">
                  <Filter className="w-4 h-4 mr-2 text-gray-400" /> Filter (5)
                </button>
                <button className="flex items-center px-3 py-1.5 border border-gray-300 rounded-md text-sm font-medium text-gray-700 bg-white hover:bg-gray-50">
                   Date · Newest
                </button>
              </div>
            </div>

            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider w-[15%]">Status</th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider w-[20%]">Lead Name</th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider w-[35%]">AI Insight</th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider w-[15%]">Action</th>
                    <th scope="col" className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider w-[15%]">Date</th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {MOCK_ALERTS.map((alert) => (
                    <tr key={alert.id} className="hover:bg-gray-50 transition-colors">
                      <td className="px-6 py-4 whitespace-nowrap">
                        <Pill color={alert.labelColor}>{alert.labelText}</Pill>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm font-bold text-gray-900">{alert.leadName}</div>
                      </td>
                      <td className="px-6 py-4">
                        <div className="text-sm text-gray-600" dangerouslySetInnerHTML={{ 
                          __html: alert.insight.replace(/(\d+%|follow-up overdue|language gap flagged|call not started)/i, '<strong>$1</strong>') 
                        }} />
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <button className="inline-flex items-center px-3 py-1.5 border border-transparent text-xs font-medium rounded-md shadow-sm text-white bg-gray-900 hover:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-900">
                          {alert.action}
                        </button>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-right text-sm text-gray-500">
                        {alert.date}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </section>

        </div>
      </main>
    </div>
  );
}

// Minimal missing icon
function MenuIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" {...props}>
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
    </svg>
  );
}
