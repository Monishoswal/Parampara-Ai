import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { AppProvider } from './context/AppContext';
import { PublicLayout } from './layouts/PublicLayout';
import { StudioLayout } from './layouts/StudioLayout';
import { CuratorLayout } from './layouts/CuratorLayout';

// Public Pages
import { HomePage } from './pages/HomePage';
import { ExplorePage } from './pages/ExplorePage';
import { CraftDetailPage } from './pages/CraftDetailPage';
import { HeritageLensPage } from './pages/HeritageLensPage';
import { StoriesPage } from './pages/StoriesPage';
import { ArtisanProfilePage } from './pages/ArtisanProfilePage';
import { OpportunitiesPage } from './pages/OpportunitiesPage';
import { BazaarPage } from './pages/BazaarPage';
import { AboutPage } from './pages/AboutPage';
import { SignUpPage } from './pages/SignUpPage';
import { UIOptionsPage } from './pages/UIOptionsPage';
import { CraftMapPage } from './pages/CraftMapPage';

// Studio Pages
import { StudioDashboardPage } from './pages/StudioDashboardPage';
import { RecordStoryPage } from './pages/RecordStoryPage';
import { ProductStudioPage } from './pages/ProductStudioPage';
import { StudioSubmissionsPage } from './pages/StudioSubmissionsPage';
import { StudioProfilePage } from './pages/StudioProfilePage';
import { StudioOpportunitiesPage } from './pages/StudioOpportunitiesPage';

// Curator Pages
import { CuratorQueuePage } from './pages/CuratorQueuePage';
import { CuratorSourcesPage } from './pages/CuratorSourcesPage';
import { CuratorAuditPage } from './pages/CuratorAuditPage';

export const App: React.FC = () => {
  return (
    <AppProvider>
      <BrowserRouter>
        <Routes>
          {/* Public Website Routes */}
          <Route path="/signup" element={<SignUpPage />} />
          <Route path="/signin" element={<SignUpPage />} />
          <Route path="/ui-options" element={<UIOptionsPage />} />

          <Route path="/" element={<PublicLayout />}>
            <Route index element={<ExplorePage />} />
            <Route path="explore" element={<ExplorePage />} />
            <Route path="explore/:craftSlug" element={<CraftDetailPage />} />
            <Route path="bazaar" element={<BazaarPage />} />
            <Route path="heritage-lens" element={<HeritageLensPage />} />
            <Route path="stories" element={<StoriesPage />} />
            <Route path="artisans/:artisanSlug" element={<ArtisanProfilePage />} />
            <Route path="opportunities" element={<OpportunitiesPage />} />
            <Route path="map" element={<CraftMapPage />} />
            <Route path="about" element={<AboutPage />} />
            <Route path="home" element={<HomePage />} />
            <Route path="marketplace" element={<Navigate to="/bazaar" replace />} />
          </Route>

          {/* Artisan Studio Workspace */}
          <Route path="/studio" element={<StudioLayout />}>
            <Route index element={<StudioDashboardPage />} />
            <Route path="stories/new" element={<RecordStoryPage />} />
            <Route path="products" element={<ProductStudioPage />} />
            <Route path="submissions" element={<StudioSubmissionsPage />} />
            <Route path="profile" element={<StudioProfilePage />} />
            <Route path="opportunities" element={<StudioOpportunitiesPage />} />
          </Route>

          {/* Curator Verification Console */}
          <Route path="/curator" element={<CuratorLayout />}>
            <Route index element={<CuratorQueuePage />} />
            <Route path="sources" element={<CuratorSourcesPage />} />
            <Route path="audit" element={<CuratorAuditPage />} />
          </Route>

          {/* Fallback */}
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </BrowserRouter>
    </AppProvider>
  );
};
