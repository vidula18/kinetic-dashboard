import { TrendingUp, Clock, Globe, Phone, AlertTriangle, MessageSquare, CheckCircle2 } from 'lucide-react';
import type { ElementType } from 'react';

export type LabelType = 'Hot Lead' | 'Ready to Convert' | 'Follow-up' | 'Overdue' | 'Language Gap' | 'Needs Review' | 'Uncontacted' | 'Pending';
export type LabelColor = 'green' | 'orange' | 'blue' | 'gray';

export interface LeadLabel {
  text: LabelType;
  color: LabelColor;
  icon: ElementType;
}

export const MOCK_LABELS: LeadLabel[] = [
  { text: 'Hot Lead', color: 'green', icon: TrendingUp },
  { text: 'Follow-up', color: 'orange', icon: Clock },
  { text: 'Language Gap', color: 'blue', icon: Globe },
  { text: 'Uncontacted', color: 'gray', icon: Phone },
  { text: 'Overdue', color: 'orange', icon: AlertTriangle },
  { text: 'Needs Review', color: 'blue', icon: MessageSquare },
  { text: 'Ready to Convert', color: 'green', icon: CheckCircle2 },
  { text: 'Pending', color: 'gray', icon: Clock },
];
