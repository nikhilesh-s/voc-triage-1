'use client';

import { AppProvider, useApp } from '@/app/context';
import Header from '@/app/components/Header';
import HomeScreen from '@/app/components/HomeScreen';
import DiseaseAtlas from '@/app/components/DiseaseAtlas';
import DiseaseDetail from '@/app/components/DiseaseDetail';
import VOCChecker from '@/app/components/VOCChecker';
import PanelBuilder from '@/app/components/PanelBuilder';
import TriageModal from '@/app/components/TriageModal';
import { useEffect } from 'react';

function AppContent() {
  const { currentScreen, setScrollY } = useApp();

  useEffect(() => {
    const handleScroll = () => {
      setScrollY(window.scrollY);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [setScrollY]);

  return (
    <div style={{ minHeight: '100vh', fontFamily: "'Inter', '-apple-system', 'BlinkMacSystemFont', 'Segoe UI', sans-serif", color: '#1C2833' }}>
      <Header />

      {currentScreen === 'home' && <HomeScreen />}
      {currentScreen === 'diseaseAtlas' && <DiseaseAtlas />}
      {currentScreen === 'diseaseDetail' && <DiseaseDetail />}
      {currentScreen === 'vocChecker' && <VOCChecker />}
      {currentScreen === 'panelBuilder' && <PanelBuilder />}

      <TriageModal />
    </div>
  );
}

export default function Home() {
  return (
    <AppProvider>
      <AppContent />
    </AppProvider>
  );
}
