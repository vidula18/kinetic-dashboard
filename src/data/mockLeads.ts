import { MOCK_LABELS, type LeadLabel } from './labelConfig';

export interface Lead {
  id: string;
  name: string;
  source: string;
  phone: string;
  timeReceived: Date;
  labels: LeadLabel[];
  aiInsight: string;
  actionRequired: string;
  isFresh?: boolean;
}

const AI_INSIGHTS = [
  "This user clicked a Meta ad targeting **knee pain relief specifically for runners**. They watched the entire 2-minute video and immediately filled out the lead form. Patient states they have been experiencing chronic aches for over 6 months and have tried physical therapy previously with limited success. They are **highly motivated to find a permanent solution** and have high intent. Call immediately to secure a consultation slot.",
  "Follow-up is **overdue by 3 days**. User initially showed strong interest but dropped off during the pricing discussion.",
  "Language gap flagged by AI analysis of their initial inquiry. The user seems more comfortable **speaking in Hindi** based on their WhatsApp message syntax. Prepare to have a Hindi-speaking representative take this call. They asked specific questions about session timings and availability for evening slots, indicating **strong practical intent to join**.",
  "Call not started. This is a fresh lead from Google Ads searching for **postpartum weight loss programs**.",
  "User clicked on a referral link from an existing member. They have high intent but their availability seems limited based on the form responses. They mentioned they can **only attend sessions early morning before 7 AM**. Our AI indicates a 90% likelihood to convert if we can match their scheduling constraints. This is a premium lead looking for personal training options. Prepare to discuss our premium early-bird packages and emphasize the flexibility of our trainers. Ensure you mention that we have successfully accommodated similar schedules for other clients.",
  "21% likely to convert. Intent is currently evaluated at 1/5. User abandoned the signup flow multiple times. **At risk**—win-back or deprioritize based on current capacity.",
  "Rescheduled for AI call. The user was unavailable during the first attempt. An **AI callback is queued** for tomorrow morning. They are interested in nutritional guidance alongside physical training.",
  "User expressed frustration with their current gym setup. They are looking for a more personalized approach and specifically asked about our **1-on-1 coaching options**.",
  "Very hot lead! They downloaded our '10 Tips for Core Strength' eBook and immediately **booked a trial session**. However, they haven't confirmed the timing. Call now to lock in the appointment and discuss their specific core strength goals before the trial.",
  "Pending review. The user submitted incomplete contact information. We **only have their email address**. Send an automated follow-up sequence to capture their phone number.",
  "This is a **high-value corporate lead**. They are inquiring about bulk packages for their employees. This requires an immediate executive review. The user represents a company with over 500 employees local to our flagship gym. They mentioned a wellness budget that needs to be utilized by the end of the quarter. Prepare a customized corporate pitch highlighting our team-building sessions, dedicated account management, and employee health tracking metrics. This deal alone could fulfill this month's quota. Start the sales call with a focus on ROI and employee retention benefits.",
  "User is recovering from a **shoulder injury** and needs specialized **rehabilitation training**. They asked for certifications of our trainers.",
  "Just submitted a form. Standard follow-up required.",
  "User has been browsing our website for the last 45 minutes, specifically looking at the 'Transformations' page and the 'Pricing' page. They finally submitted a contact form 2 minutes ago. They are likely **comparing us with competitors right now**. A quick response is crucial.",
  "AI flagged this lead as potentially spam or **very low intent** due to gibberish in the 'goals' text field. Proceed with caution or deprioritize."
];

const ACTIONS = [
  "Start Sales Call",
  "Send Follow-up Email",
  "Assign Hindi Speaker",
  "Call Now",
  "Discuss Early Packages",
  "Deprioritize",
  "Queue AI Callback",
  "Pitch 1-on-1 Coaching",
  "Confirm Trial Slot",
  "Request Phone Number",
  "Prepare Corporate Pitch",
  "Assign Rehab Specialist",
  "Standard Intro Call",
  "Call Immediately",
  "Verify Lead Quality"
];

export const MOCK_LEADS: Lead[] = Array.from({ length: 15 }).map((_, i) => {
  const now = new Date();
  // Ensure the first few are very recent
  const minutesAgo = i < 3 ? (i + 1) * 2 : i * 45 + 30; 
  const randomLabels = [
    MOCK_LABELS[i % MOCK_LABELS.length]
  ];

  const names = ["Ananya Sharma", "Lakshmi Rao", "Dev Anand", "Ishaan Verma", "Neha Pillai", "Rohit Sinha", "Farah Sheikh", "Manoj Gupta", "Aditya Nair", "Priya Desai", "Karthik Reddy", "Meera Joshi", "Arjun Patel", "Neha Kulkarni", "Rohan Shetty"];
  const sources = ["Meta Ads", "Google Ads", "Instagram", "Referral", "WhatsApp"];
  
  return {
    id: `lead-${i}`,
    name: names[i] || `Lead ${i+1}`,
    source: sources[i % sources.length],
    phone: `+91 98${Math.floor(10000000 + Math.random() * 90000000)}`,
    timeReceived: new Date(now.getTime() - minutesAgo * 60000),
    labels: randomLabels,
    aiInsight: AI_INSIGHTS[i],
    actionRequired: ACTIONS[i],
    isFresh: i < 3
  };
});
