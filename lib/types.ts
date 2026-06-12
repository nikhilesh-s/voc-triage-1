export interface Disease {
  name: string;
  evidence: 'High' | 'Medium' | 'Low';
  evidenceColor: string;
  sampleSource: string;
  vocFamilies: string[];
  pathways: string[];
  confounders: string[];
}

export interface VOCEntry {
  name: string;
  specificity: 'High' | 'Medium' | 'Low';
  specificityColor: string;
  contexts: string[];
  recommendation: string;
}

export interface CandidatePanel {
  name: string;
  description: string;
  vocs: string[];
  confidence: string;
}

export interface TriageResult {
  flag: string;
  score: number;
  confidence: number;
  topFeatures: Array<{
    name: string;
    importance: number;
  }>;
  confounders: string[];
  recommendation: string;
}

export type Screen = 'home' | 'diseaseAtlas' | 'diseaseDetail' | 'vocChecker' | 'panelBuilder';
