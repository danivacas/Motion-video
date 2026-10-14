/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { AppProvider, useApp } from './context/AppContext';
import { Header } from './components/Header';
import { BottomNav } from './components/BottomNav';
import { DashboardScreen } from './components/screens/DashboardScreen';
import { CreateScreen } from './components/screens/CreateScreen';
import { PipelineScreen } from './components/screens/PipelineScreen';
import { InstagramScreen } from './components/screens/InstagramScreen';
import { AccountScreen } from './components/screens/AccountScreen';
import { GalleryScreen } from './components/screens/GalleryScreen';
import { VideoModal } from './components/modals/VideoModal';
import { Toast } from './components/modals/Toast';
import { OfflineBanner } from './components/common/OfflineBanner';
import { useNetworkStatus } from './hooks/useNetworkStatus';

const MainContent: React.FC = () => {
  const { activeTab, setActiveTab, lang } = useApp();
  const { isOnline } = useNetworkStatus();

  return (
    <div className="min-h-screen bg-[#0B0F12] text-[#E0E3E7] flex flex-col antialiased selection:bg-[#D4FF3A] selection:text-[#0B0F12]">
      {/* Offline Status Alert if connection is lost */}
      <OfflineBanner isOnline={isOnline} lang={lang} />

      {/* Persistent App Header with Back button on all secondary screens */}
      {activeTab === 'pipeline' ? (
        <Header
          showBack={true}
          backTitle={lang === 'es' ? 'Progreso de Generación' : 'Generation Progress'}
          onBack={() => setActiveTab('crear')}
        />
      ) : activeTab !== 'inicio' ? (
        <Header showBack={true} onBack={() => setActiveTab('inicio')} />
      ) : (
        <Header />
      )}

      {/* Main Viewport Content */}
      <main className="flex-1 w-full max-w-md sm:max-w-lg md:max-w-xl mx-auto px-4 pt-3 transition-all">
        {activeTab === 'inicio' && <DashboardScreen />}
        {activeTab === 'crear' && <CreateScreen />}
        {activeTab === 'pipeline' && <PipelineScreen />}
        {activeTab === 'instagram' && <InstagramScreen />}
        {activeTab === 'cuenta' && <AccountScreen />}
        {activeTab === 'galeria' && <GalleryScreen />}
      </main>

      {/* Persistent Bottom Navigation */}
      <BottomNav />

      {/* Interactive Overlays */}
      <VideoModal />
      <Toast />
    </div>
  );
};

export default function App() {
  return (
    <AppProvider>
      <MainContent />
    </AppProvider>
  );
}
