import React from "react";
import { BrowserRouter, Routes as RouterRoutes, Route } from "react-router-dom";
import ScrollToTop from "components/ScrollToTop";
import ErrorBoundary from "components/ErrorBoundary";
import NotFound from "pages/NotFound";
import HomeDashboard from './pages/home-dashboard';
import UserProfileDashboard from './pages/user-profile-dashboard';
import RestaurantDetailPage from './pages/restaurant-detail-page';
import AddRestaurant from './pages/add-restaurant';
import SearchDiscovery from './pages/search-discovery';
import LoginRegisterScreen from './pages/login-register-screen';

const Routes = () => {
  return (
    <BrowserRouter>
      <ErrorBoundary>
      <ScrollToTop />
      <RouterRoutes>
        {/* Define your route here */}
        <Route path="/" element={<AddRestaurant />} />
        <Route path="/home-dashboard" element={<HomeDashboard />} />
        <Route path="/user-profile-dashboard" element={<UserProfileDashboard />} />
        <Route path="/restaurant-detail-page" element={<RestaurantDetailPage />} />
        <Route path="/add-restaurant" element={<AddRestaurant />} />
        <Route path="/search-discovery" element={<SearchDiscovery />} />
        <Route path="/login-register-screen" element={<LoginRegisterScreen />} />
        <Route path="*" element={<NotFound />} />
      </RouterRoutes>
      </ErrorBoundary>
    </BrowserRouter>
  );
};

export default Routes;
