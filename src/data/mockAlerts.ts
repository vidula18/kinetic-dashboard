import type { LabelColor } from './labelConfig';

export interface Alert {
  id: string;
  leadName: string;
  insight: string;
  action: string;
  date: string;
  labelColor: LabelColor;
  labelText: string;
}

export const MOCK_ALERTS: Alert[] = [
  { id: '1', leadName: 'Ananya Sharma', insight: '82% likely to convert', action: 'Call Now', date: '27 May 2026', labelColor: 'green', labelText: 'Hot Lead' },
  { id: '2', leadName: 'Karthik Reddy', insight: 'call not started', action: 'Call Now', date: '26 May 2026', labelColor: 'blue', labelText: 'Uncontacted' },
  { id: '3', leadName: 'Aditya Nair', insight: '21% likely · intent 1/5', action: 'Review', date: '25 May 2026', labelColor: 'orange', labelText: 'At Risk' },
  { id: '4', leadName: 'Vikram Rao', insight: 'follow-up overdue · 3 days', action: 'Confirm Slot', date: '24 May 2026', labelColor: 'orange', labelText: 'Overdue' },
  { id: '5', leadName: 'Sara Khan', insight: 'language gap flagged', action: 'Queue AI', date: '22 May 2026', labelColor: 'blue', labelText: 'Language Gap' },
];
