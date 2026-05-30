import { Calendar, Phone, AlertTriangle, CheckCircle2, Clock, XCircle } from 'lucide-react';
import type { ElementType } from 'react';

export type LabelType = 'Try 1' | 'Try 2' | 'Try 3' | 'Cold' | 'Ready for the trial' | 'Trial scheduled' | 'Trial rescheduled' | 'Trial cancelled' | 'Future prospect';
export type LabelColor = 'green' | 'orange' | 'blue' | 'gray';

export interface LeadLabel {
  text: LabelType;
  color: LabelColor;
  icon: ElementType;
}

export const MOCK_LABELS: LeadLabel[] = [
  { text: 'Try 1', color: 'blue', icon: Phone },
  { text: 'Try 2', color: 'orange', icon: Phone },
  { text: 'Try 3', color: 'orange', icon: AlertTriangle },
  { text: 'Cold', color: 'gray', icon: Clock },
  { text: 'Ready for the trial', color: 'blue', icon: CheckCircle2 },
  { text: 'Trial scheduled', color: 'green', icon: Calendar },
  { text: 'Trial rescheduled', color: 'orange', icon: Calendar },
  { text: 'Trial cancelled', color: 'gray', icon: XCircle },
  { text: 'Future prospect', color: 'gray', icon: Clock },
];
