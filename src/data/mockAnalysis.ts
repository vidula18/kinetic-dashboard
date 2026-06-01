export interface AnalysisOverview {
  totalLeads: number;
  qualifiedLeads: number;
  conversionRate: string;
  trialsScheduled: number;
  revenueInfluenced: number;
  averageLeadQuality: string;
}

export interface SourceMetric {
  source: string;
  leads: number;
  conversions: number;
  rate: string;
  cpl: number; // cost per lead
  qualityScore: number; // out of 5
}

export interface ServiceMetric {
  service: string;
  leads: number;
  conversions: number;
  rate: string;
  avgDealSize: number;
}

export interface CombinationMetric {
  source: string;
  service: string;
  leads: number;
  conversions: number;
  rate: string;
}

export interface FunnelStage {
  stage: string;
  count: number;
  dropoffRate: string;
}

export const MOCK_ANALYSIS_OVERVIEW: AnalysisOverview = {
  totalLeads: 428,
  qualifiedLeads: 245,
  conversionRate: "18.5%",
  trialsScheduled: 84,
  revenueInfluenced: 1250000,
  averageLeadQuality: "3.8/5"
};

export const MOCK_SOURCE_METRICS: SourceMetric[] = [
  { source: "Meta Ads", leads: 185, conversions: 24, rate: "13%", cpl: 450, qualityScore: 3.2 },
  { source: "Google Ads", leads: 110, conversions: 28, rate: "25.5%", cpl: 850, qualityScore: 4.1 },
  { source: "Organic Search", leads: 65, conversions: 12, rate: "18.5%", cpl: 0, qualityScore: 3.9 },
  { source: "Referral", leads: 48, conversions: 15, rate: "31.2%", cpl: 100, qualityScore: 4.8 },
  { source: "WhatsApp Promo", leads: 20, conversions: 0, rate: "0%", cpl: 20, qualityScore: 1.5 }
];

export const MOCK_SERVICE_METRICS: ServiceMetric[] = [
  { service: "Personal Training", leads: 150, conversions: 35, rate: "23.3%", avgDealSize: 24000 },
  { service: "Rehab & Recovery", leads: 120, conversions: 28, rate: "23.3%", avgDealSize: 18500 },
  { service: "Nutrition Coaching", leads: 85, conversions: 12, rate: "14.1%", avgDealSize: 8000 },
  { service: "Group Classes", leads: 73, conversions: 4, rate: "5.5%", avgDealSize: 4500 }
];

export const MOCK_COMBINATION_METRICS: CombinationMetric[] = [
  { source: "Google Ads", service: "Personal Training", leads: 45, conversions: 16, rate: "35.5%" },
  { source: "Referral", service: "Personal Training", leads: 30, conversions: 12, rate: "40.0%" },
  { source: "Meta Ads", service: "Rehab & Recovery", leads: 80, conversions: 15, rate: "18.8%" },
  { source: "Google Ads", service: "Rehab & Recovery", leads: 30, conversions: 10, rate: "33.3%" },
  { source: "Meta Ads", service: "Nutrition Coaching", leads: 50, conversions: 5, rate: "10.0%" },
  { source: "Organic Search", service: "Group Classes", leads: 40, conversions: 3, rate: "7.5%" }
];

export const MOCK_FUNNEL_STAGES: FunnelStage[] = [
  { stage: "New Leads", count: 428, dropoffRate: "0%" },
  { stage: "Contacted", count: 350, dropoffRate: "18%" },
  { stage: "Qualified", count: 245, dropoffRate: "30%" },
  { stage: "Trial Scheduled", count: 84, dropoffRate: "65%" },
  { stage: "Converted", count: 79, dropoffRate: "5%" }
];
