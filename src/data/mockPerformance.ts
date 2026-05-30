export interface PerformanceCallLog {
  lead: string;
  when: string;
  dur: string;
  label: number;
  sent: 'pos' | 'neg';
  tat: string;
  ai: string;
}

export interface WeeklyCaller {
  name: string;
  initials: string;
  total: number;
  avgTat: string;
  days: [string, number][];
  labelDist: Record<number, number>;
  weekAI: string;
  log: PerformanceCallLog[];
}

export const WEEKLY_CALLERS: WeeklyCaller[] = [
  {
    name: 'Aarav Mehta', initials: 'AM', total: 24, avgTat: '3.8h',
    days: [['Mon', 5], ['Tue', 4], ['Wed', 6], ['Thu', 4], ['Fri', 3], ['Sat', 2], ['Sun', 0]],
    labelDist: { 1: 9, 2: 6, 3: 4, 4: 3, 5: 2 },
    weekAI: 'Consistent qualification calls with solid discovery — strong at surfacing pain points and quick to first contact (3.8h avg). 15 of 24 clients ended the week at Label 1–2, but a handful drifted to Label 4–5: push harder to book the trial within the first call before intent cools.',
    log: [
      { lead: 'Ananya Sharma', when: 'Mon, 18 May · 10:24 AM', dur: '06:12', label: 1, sent: 'pos', tat: '1.5h', ai: 'Knee pain, booking for self. High intent, comfortable with online — trial scheduled. Strong qualification.' },
      { lead: 'Rahul Verma',   when: 'Mon, 18 May · 04:05 PM', dur: '05:20', label: 1, sent: 'pos', tat: '1.1h', ai: 'Lower-back pain, desk job. Qualified fast and handed off for trial — clean call.' },
      { lead: 'Meera Joshi',   when: 'Tue, 19 May · 11:05 AM', dur: '03:21', label: 2, sent: 'pos', tat: '2.1h', ai: 'Post-pregnancy goals, prefers online. Engaged; asked for trainer credentials before committing.' },
      { lead: 'Vikram Rao',    when: 'Wed, 20 May · 02:40 PM', dur: '04:38', label: 3, sent: 'neg', tat: '6.2h', ai: 'Enquiring for father (62), offline near Indiranagar. Price-sensitive; follow-up on plans still pending.' },
      { lead: 'Sara Khan',     when: 'Fri, 22 May · 09:30 AM', dur: '07:02', label: 5, sent: 'neg', tat: '4.0h', ai: 'Language gap flagged mid-call — handed to AI to call back in their language and summarise.' },
      { lead: 'Karthik Reddy', when: 'Sat, 23 May · 12:15 PM', dur: '05:50', label: 4, sent: 'neg', tat: '9.4h', ai: 'Low urgency, intent 1/5. At risk — needs a win-back nudge or deprioritise.' }
    ]
  },
  {
    name: 'Priya Nair', initials: 'PN', total: 19, avgTat: '5.1h',
    days: [['Mon', 4], ['Tue', 5], ['Wed', 3], ['Thu', 4], ['Fri', 2], ['Sat', 1], ['Sun', 0]],
    labelDist: { 1: 7, 2: 5, 3: 3, 4: 2, 5: 2 },
    weekAI: 'Warm, empathetic calls with good rapport and strong online conversion — 12 of 19 clients ended at Label 1–2. First-call time is slower than target (5.1h avg) and a couple of offline follow-ups are slipping into Label 4. Tighten callback discipline to protect the at-risk ones.',
    log: [
      { lead: 'Neha Kapoor',  when: 'Mon, 18 May · 11:30 AM', dur: '06:10', label: 1, sent: 'pos', tat: '2.4h', ai: 'PCOS fitness goals, online. Built a 4-week starter plan; good engagement throughout.' },
      { lead: 'Divya Menon',  when: 'Tue, 19 May · 03:45 PM', dur: '05:48', label: 2, sent: 'pos', tat: '3.6h', ai: 'Knee-rehab focus, online. Explained progression clearly; client requested a nutrition add-on.' },
      { lead: 'Karan Bhatia', when: 'Wed, 20 May · 12:40 PM', dur: '06:25', label: 2, sent: 'pos', tat: '2.0h', ai: 'Strength baseline taken. Some pricing hesitation; sent plan options, leaning in.' },
      { lead: 'Rohan Shetty', when: 'Thu, 21 May · 01:12 PM', dur: '04:02', label: 4, sent: 'neg', tat: '8.7h', ai: 'Stalled at 38% likely. At risk — send a testimonial to re-engage.' },
      { lead: 'Aditya Nair',  when: 'Fri, 22 May · 09:50 AM', dur: '02:55', label: 4, sent: 'neg', tat: '11.0h', ai: 'Not ready yet, requested a callback next week. Low urgency — slow first contact hurt momentum.' },
      { lead: 'Priya Desai',  when: 'Sat, 23 May · 10:05 AM', dur: '03:30', label: 5, sent: 'neg', tat: '5.5h', ai: 'Rescheduled for an AI callback; queued in AI Alerts.' }
    ]
  }
];

export interface Prospect {
  lead: string;
  amount: number;
  likelihood: 'High' | 'Medium' | 'Low';
  ai: string;
}

export interface Loss {
  lead: string;
  reason: string;
  amount: number;
  note: string;
}

export interface Miss {
  lead: string;
  detail: string;
}

export interface Misses {
  reminder: Miss[];
  fresh: Miss[];
  cold: Miss[];
}

export interface SalespersonPerformance {
  leads: number;
  called: number;
  trial: number;
  conversions: number;
  captured: number;
  tatHours: number;
  convertDays: number;
  labelDist: Record<number, number>;
  prospects: Prospect[];
  losses: Loss[];
  misses: Misses;
}

export interface PeriodPerformance {
  [salesperson: string]: SalespersonPerformance;
}

export interface PerfData {
  week: PeriodPerformance;
  month: PeriodPerformance;
  quarter: PeriodPerformance;
}

export const PERF_DATA: PerfData = {
  week: {
    'Aarav Mehta': {
      leads: 22, called: 19, trial: 13, conversions: 8, captured: 178000, tatHours: 1.8, convertDays: 5.4,
      labelDist: { 1: 4, 2: 3, 3: 3, 4: 2, 5: 2 },
      prospects: [
        { lead: 'Karan Bhatia', amount: 44999, likelihood: 'High', ai: 'Offline trial done, hesitating on price. AI reads intent at 4/5 — send the plan comparison and a testimonial today.' },
        { lead: 'Vikram Rao', amount: 24999, likelihood: 'Medium', ai: 'Booking for father (62). Warm but price-sensitive — AI suggests leading with the 3-month offline plan plus a free doctor consult.' },
        { lead: 'Sara Khan', amount: 22999, likelihood: 'Medium', ai: 'Diabetes-management goal, awaiting slot confirmation. AI: follow up within 24h to keep momentum.' }
      ],
      losses: [
        { lead: 'Rohit Sen', reason: 'Competitor', amount: 24999, note: 'Chose a local gym with an in-person trainer.' },
        { lead: 'Aditya Nair', reason: 'Delay', amount: 12999, note: 'Callback slipped twice; went cold before the plan pitch.' }
      ],
      misses: {
        reminder: [{ lead: 'Aditya Nair', detail: 'Reminder for the 21 May callback fired but no call was logged.' }],
        fresh: [{ lead: 'Imran Qureshi', detail: 'Fresh lead from Meta Ads, untouched for 9 days.' }],
        cold: [{ lead: 'Deepa Rao', detail: 'Try 1 done 20 May; not moved to Cold within the 4-day SLA (now day 6).' }]
      }
    },
    'Priya Nair': {
      leads: 18, called: 15, trial: 9, conversions: 6, captured: 132000, tatHours: 2.9, convertDays: 6.8,
      labelDist: { 1: 3, 2: 3, 3: 2, 4: 2, 5: 2 },
      prospects: [
        { lead: 'Neha Kapoor', amount: 46998, likelihood: 'High', ai: 'PCOS fitness, strong engagement on the trial. AI: nudge toward the 6-month plan with the nutrition add-on.' },
        { lead: 'Meera Joshi', amount: 22999, likelihood: 'High', ai: 'Post-pregnancy goals, asked for trainer credentials. AI: share certified-trainer profiles — likely to book online.' },
        { lead: 'Arjun Das', amount: 12999, likelihood: 'Medium', ai: 'Weight-loss goal, comfortable to proceed but quiet since the trial. AI: re-engage with a starter offer.' }
      ],
      losses: [
        { lead: 'Sunil Pillai', reason: 'Pricing', amount: 22999, note: 'Found the 6-month plan too steep; declined even after a discount.' }
      ],
      misses: {
        reminder: [{ lead: 'Sara Khan', detail: 'Slot-confirmation reminder missed; lead still waiting on a callback.' }],
        fresh: [],
        cold: [{ lead: 'Tara Menon', detail: 'Try 1 on 19 May; the Cold transition is pending past the 4-day SLA.' }]
      }
    }
  },
  month: {
    'Aarav Mehta': {
      leads: 78, called: 71, trial: 44, conversions: 29, captured: 648000, tatHours: 2.1, convertDays: 6.0,
      labelDist: { 1: 14, 2: 11, 3: 10, 4: 8, 5: 6 },
      prospects: [
        { lead: 'Karan Bhatia', amount: 44999, likelihood: 'High', ai: 'High intent after the offline trial; only price stands in the way. AI: offer the 6-month plan at a small concession.' },
        { lead: 'Lakshmi Iyer', amount: 22999, likelihood: 'High', ai: 'Knee-rehab case comparing us with a physio clinic. AI: emphasise at-home convenience and progress tracking.' },
        { lead: 'Vikram Rao', amount: 24999, likelihood: 'Medium', ai: 'Father (62), offline near Indiranagar. AI: confirm a trial slot this week before interest cools.' },
        { lead: 'Sara Khan', amount: 22999, likelihood: 'Medium', ai: 'Diabetes-management goal; awaiting slot. AI: a doctor-consult add-on could tip this to a yes.' }
      ],
      losses: [
        { lead: 'Manish Gupta', reason: 'Pricing', amount: 44999, note: 'Wanted the 6-month plan at the 3-month price.' },
        { lead: 'Rohit Sen', reason: 'Competitor', amount: 24999, note: 'Chose a local gym with an in-person trainer.' },
        { lead: 'Aditya Nair', reason: 'Delay', amount: 12999, note: 'Callback slipped twice; went cold before the pitch.' },
        { lead: 'Farah Sheikh', reason: 'Delay', amount: 12999, note: 'Travelling; lost momentum after two reschedules.' }
      ],
      misses: {
        reminder: [
          { lead: 'Aditya Nair', detail: 'Callback reminder fired with no call logged.' },
          { lead: 'Pooja Reddy', detail: 'Two callback reminders missed in the same week.' }
        ],
        fresh: [
          { lead: 'Imran Qureshi', detail: 'Meta Ads lead untouched for 9 days.' },
          { lead: 'Sandeep Yadav', detail: 'Fresh referral lead pending for 11 days.' }
        ],
        cold: [{ lead: 'Deepa Rao', detail: 'Try 1 on 20 May; Cold transition breached the 4-day SLA.' }]
      }
    },
    'Priya Nair': {
      leads: 64, called: 58, trial: 33, conversions: 21, captured: 458000, tatHours: 3.1, convertDays: 7.2,
      labelDist: { 1: 12, 2: 10, 3: 9, 4: 7, 5: 5 },
      prospects: [
        { lead: 'Neha Kapoor', amount: 46998, likelihood: 'High', ai: 'Strong trial engagement. AI: 6-month plan with the nutrition add-on is the natural next step.' },
        { lead: 'Meera Joshi', amount: 22999, likelihood: 'High', ai: 'Wants trainer credentials before committing. AI: send certified-trainer profiles.' },
        { lead: 'Ritu Saxena', amount: 24999, likelihood: 'Medium', ai: 'Senior parent, wants offline near Whitefield. AI: confirm centre proximity — strong fit.' },
        { lead: 'Arjun Das', amount: 12999, likelihood: 'Medium', ai: 'Quiet since the trial. AI: a starter offer should re-open the conversation.' }
      ],
      losses: [
        { lead: 'Gaurav Malhotra', reason: 'Competitor', amount: 24999, note: 'Signed with a residential-society fitness program.' },
        { lead: 'Sunil Pillai', reason: 'Pricing', amount: 22999, note: 'Found the 6-month plan too steep even after a discount.' },
        { lead: 'Anjali Verma', reason: 'Delay', amount: 9999, note: 'Repeated reschedules; deprioritised.' }
      ],
      misses: {
        reminder: [{ lead: 'Sara Khan', detail: 'Slot-confirmation reminder missed.' }],
        fresh: [{ lead: 'Bhavna Shah', detail: 'Website lead pending for 8 days.' }],
        cold: [
          { lead: 'Tara Menon', detail: 'Try 1 on 19 May; Cold transition past the 4-day SLA.' },
          { lead: 'Vivek Anand', detail: 'Try 1 on 12 May; Cold SLA breached.' }
        ]
      }
    }
  },
  quarter: {
    'Aarav Mehta': {
      leads: 214, called: 196, trial: 121, conversions: 79, captured: 1786000, tatHours: 2.0, convertDays: 6.3,
      labelDist: { 1: 40, 2: 30, 3: 28, 4: 20, 5: 17 },
      prospects: [
        { lead: 'Naveen Kumar', amount: 49998, likelihood: 'High', ai: 'Corporate wellness enquiry for both parents. AI: bundle two memberships — high-value deal.' },
        { lead: 'Karan Bhatia', amount: 44999, likelihood: 'High', ai: 'Only price stands between trial and close. AI: a small 6-month concession should convert.' },
        { lead: 'Lakshmi Iyer', amount: 22999, likelihood: 'High', ai: 'Knee-rehab case; at-home convenience is the winning angle.' },
        { lead: 'Vikram Rao', amount: 24999, likelihood: 'Medium', ai: 'Offline trial for father; needs a firm slot to progress.' },
        { lead: 'Sara Khan', amount: 22999, likelihood: 'Medium', ai: 'A doctor-consult add-on could tip this to a yes.' }
      ],
      losses: [
        { lead: 'Manish Gupta', reason: 'Pricing', amount: 44999, note: 'Wanted the 6-month plan at the 3-month price.' },
        { lead: 'Rohit Sen', reason: 'Competitor', amount: 24999, note: 'Chose a local gym with an in-person trainer.' },
        { lead: 'Kavya Reddy', reason: 'Competitor', amount: 22999, note: 'Chose a celebrity-trainer app.' },
        { lead: 'Aditya Nair', reason: 'Delay', amount: 12999, note: 'Repeated callback slips; went cold.' }
      ],
      misses: {
        reminder: [
          { lead: 'Aditya Nair', detail: 'Callback reminder fired with no call logged.' },
          { lead: 'Pooja Reddy', detail: 'Two callback reminders missed in one week.' }
        ],
        fresh: [
          { lead: 'Imran Qureshi', detail: 'Meta Ads lead untouched for 9 days.' },
          { lead: 'Sandeep Yadav', detail: 'Referral lead pending for 11 days.' }
        ],
        cold: [
          { lead: 'Deepa Rao', detail: 'Try 1 on 20 May; Cold SLA breached.' },
          { lead: 'Nikhil Jain', detail: 'Try 1 on 2 May; Cold SLA breached.' }
        ]
      }
    },
    'Priya Nair': {
      leads: 178, called: 162, trial: 96, conversions: 58, captured: 1268000, tatHours: 3.0, convertDays: 7.0,
      labelDist: { 1: 34, 2: 28, 3: 24, 4: 18, 5: 16 },
      prospects: [
        { lead: 'Neha Kapoor', amount: 46998, likelihood: 'High', ai: '6-month plan with the nutrition add-on is the natural next step.' },
        { lead: 'Ritu Saxena', amount: 24999, likelihood: 'Medium', ai: 'Senior parent wants offline near Whitefield — confirm centre proximity.' },
        { lead: 'Harini Suresh', amount: 24498, likelihood: 'High', ai: 'Yoga + strength enquiry. AI: pitch 6-month with the emotional-wellbeing add-on.' },
        { lead: 'Meera Joshi', amount: 22999, likelihood: 'High', ai: 'Send certified-trainer profiles; likely to book online.' },
        { lead: 'Arjun Das', amount: 12999, likelihood: 'Medium', ai: 'A starter offer should re-open the conversation.' }
      ],
      losses: [
        { lead: 'Gaurav Malhotra', reason: 'Competitor', amount: 24999, note: 'Signed with a residential-society fitness program.' },
        { lead: 'Sunil Pillai', reason: 'Pricing', amount: 22999, note: 'Found the 6-month plan too steep.' },
        { lead: 'Anjali Verma', reason: 'Delay', amount: 9999, note: 'Repeated reschedules; deprioritised.' }
      ],
      misses: {
        reminder: [
          { lead: 'Sara Khan', detail: 'Slot-confirmation reminder missed.' },
          { lead: 'Mohit Bansal', detail: 'Reminder missed twice this month.' }
        ],
        fresh: [{ lead: 'Bhavna Shah', detail: 'Website lead pending for 8 days.' }],
        cold: [
          { lead: 'Tara Menon', detail: 'Try 1 on 19 May; Cold SLA breached.' },
          { lead: 'Vivek Anand', detail: 'Try 1 on 12 May; Cold SLA breached.' }
        ]
      }
    }
  }
};
