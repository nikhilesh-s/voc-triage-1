'use client';

import React, { createContext, useContext, useState } from 'react';

export type Screen = 'home' | 'diseaseAtlas' | 'diseaseDetail' | 'vocChecker' | 'panelBuilder';

export interface Disease {
  name: string;
  evidence: 'High' | 'Medium' | 'Low';
  evidenceColor: string;
  sampleSource: string;
  vocFamilies: string[];
  pathways: string[];
  confounders: string[];
}

export interface VOC {
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
  topFeatures: Array<{ name: string; importance: number }>;
  confounders: string[];
  recommendation: string;
}

interface AppContextType {
  currentScreen: Screen;
  setCurrentScreen: (screen: Screen) => void;
  diseaseSearch: string;
  setDiseaseSearch: (search: string) => void;
  vocSearch: string;
  setVocSearch: (search: string) => void;
  selectedDisease: Disease | null;
  setSelectedDisease: (disease: Disease | null) => void;
  showTriageModal: boolean;
  setShowTriageModal: (show: boolean) => void;
  scrollY: number;
  setScrollY: (y: number) => void;
  diseases: Disease[];
  vocDatabase: Record<string, VOC>;
  candidatePanels: CandidatePanel[];
  demoTriageResult: TriageResult;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

export const AppProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [currentScreen, setCurrentScreen] = useState<Screen>('home');
  const [diseaseSearch, setDiseaseSearch] = useState('');
  const [vocSearch, setVocSearch] = useState('');
  const [selectedDisease, setSelectedDisease] = useState<Disease | null>(null);
  const [showTriageModal, setShowTriageModal] = useState(false);
  const [scrollY, setScrollY] = useState(0);

  const diseases: Disease[] = [
    {
      name: "Parkinson's Disease",
      evidence: 'High',
      evidenceColor: '#34C759',
      sampleSource: 'Sebum volatiles',
      vocFamilies: ['Aldehydes', 'Alkenes', 'Aromatic Compounds'],
      pathways: ['Dopamine synthesis pathway', 'Mitochondrial dysfunction', 'Protein aggregation cascade'],
      confounders: ['Age (>60)', 'Diet & alcohol consumption', 'Recent exercise'],
    },
    {
      name: 'Type 2 Diabetes',
      evidence: 'Medium',
      evidenceColor: '#609E99',
      sampleSource: 'Breath volatiles',
      vocFamilies: ['Ketones', 'Aldehydes', 'Sulfur compounds'],
      pathways: ['Glucose metabolism', 'Lipid oxidation', 'Inflammatory response'],
      confounders: ['Fasting state', 'Recent meals', 'Physical activity'],
    },
    {
      name: 'Lung Cancer',
      evidence: 'High',
      evidenceColor: '#34C759',
      sampleSource: 'Breath volatiles',
      vocFamilies: ['Alkanes', 'Aromatics', 'Carbonyl compounds'],
      pathways: ['Lipid peroxidation', 'Tumor angiogenesis', 'Oxidative stress'],
      confounders: ['Smoking status', 'Air quality exposure', 'Medications'],
    },
    {
      name: 'Breast Cancer',
      evidence: 'Medium',
      evidenceColor: '#609E99',
      sampleSource: 'Skin volatiles',
      vocFamilies: ['Terpenes', 'Esters', 'Ketones'],
      pathways: ['Estrogen metabolism', 'Cell proliferation', 'Angiogenesis'],
      confounders: ['Hormonal cycle', 'Cosmetic use', 'Skin condition'],
    },
    {
      name: "Crohn's Disease",
      evidence: 'Medium',
      evidenceColor: '#609E99',
      sampleSource: 'Fecal volatiles',
      vocFamilies: ['Short-chain fatty acids', 'Indoles', 'Sulfides'],
      pathways: ['Gut microbiota dysbiosis', 'Intestinal barrier dysfunction', 'Immune dysregulation'],
      confounders: ['Diet composition', 'Antibiotic use', 'Probiotic intake'],
    },
    {
      name: 'Cardiovascular Disease',
      evidence: 'Low',
      evidenceColor: '#AAB3B8',
      sampleSource: 'Exhaled breath',
      vocFamilies: ['Volatile nitrates', 'Alkyl nitrites', 'Benzene derivatives'],
      pathways: ['Endothelial dysfunction', 'Atherosclerosis', 'Oxidative stress'],
      confounders: ['Recent exercise', 'Coffee consumption', 'Air pollution'],
    },
  ];

  const vocDatabase: Record<string, VOC> = {
    isoprene: {
      name: 'Isoprene',
      specificity: 'Low',
      specificityColor: '#AAB3B8',
      contexts: ["Parkinson's Disease", 'Type 2 Diabetes', 'Cardiovascular Disease'],
      recommendation: 'General metabolic marker across multiple conditions. Best paired with high-specificity VOCs for robust panels.',
    },
    dimethyl_sulfide: {
      name: 'Dimethyl Sulfide',
      specificity: 'High',
      specificityColor: '#34C759',
      contexts: ["Crohn's Disease", 'Gut Dysbiosis'],
      recommendation: 'Strong specificity for gut-related conditions. Excellent standalone or panel marker.',
    },
    acetone: {
      name: 'Acetone',
      specificity: 'Medium',
      specificityColor: '#609E99',
      contexts: ['Type 2 Diabetes', 'Metabolic Syndrome'],
      recommendation: 'Reliable ketone metabolism indicator. Validates well in multi-marker panels.',
    },
    benzene: {
      name: 'Benzene',
      specificity: 'High',
      specificityColor: '#34C759',
      contexts: ['Lung Cancer', 'Respiratory Disease'],
      recommendation: 'Strong respiratory pathology association. Critical for pulmonary screening panels.',
    },
  };

  const candidatePanels: CandidatePanel[] = [
    {
      name: 'Early Detection Panel',
      description: 'Optimized for sensitivity in asymptomatic screening',
      vocs: ['Dimethyl Sulfide', 'Acetone', 'Isoprene'],
      confidence: '82%',
    },
    {
      name: 'Specificity Panel',
      description: 'Maximizes disease discrimination across multi-condition cohorts',
      vocs: ['Dimethyl Sulfide', 'Benzene', 'Indole'],
      confidence: '78%',
    },
    {
      name: 'Field Deployment Panel',
      description: 'Minimal markers for point-of-care testing',
      vocs: ['Acetone'],
      confidence: '65%',
    },
  ];

  const demoTriageResult: TriageResult = {
    flag: '🚨 High Priority Match',
    score: 87,
    confidence: 91,
    topFeatures: [
      { name: 'Dimethyl Sulfide', importance: 92 },
      { name: 'Isoprene', importance: 78 },
      { name: 'Acetaldehyde', importance: 71 },
      { name: 'Benzaldehyde', importance: 64 },
      { name: 'Limonene', importance: 52 },
    ],
    confounders: ['Recent garlic/onion consumption', 'Age-related metabolism', 'Stress levels'],
    recommendation: 'Sample demonstrates strong disease signature. Recommend clinical validation and neurological assessment.',
  };

  const value: AppContextType = {
    currentScreen,
    setCurrentScreen,
    diseaseSearch,
    setDiseaseSearch,
    vocSearch,
    setVocSearch,
    selectedDisease,
    setSelectedDisease,
    showTriageModal,
    setShowTriageModal,
    scrollY,
    setScrollY,
    diseases,
    vocDatabase,
    candidatePanels,
    demoTriageResult,
  };

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
};

export const useApp = (): AppContextType => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useApp must be used within AppProvider');
  }
  return context;
};
