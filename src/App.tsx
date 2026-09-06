/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useEffect } from 'react';
import { Route, Switch, useLocation } from 'wouter';
import { AuthProvider } from './context/AuthContext';
import { Header } from './components/Header';
import { Footer } from './components/Footer';
import { HomePage } from './pages/HomePage';
import { ProductListingPage } from './pages/ProductListingPage';
import { ProductDetailPage } from './pages/ProductDetailPage';
import { ErrorState } from './components/ErrorState';
import { LoginModal } from './components/LoginModal';
import { LogoutModal } from './components/LogoutModal';
import { PayEmiModal } from './components/PayEmiModal';
import { AccountModal } from './components/AccountModal';
import { InfoModal } from './components/InfoModal';
import { ToastNotification } from './components/ToastNotification';

export default function App() {
  const [location] = useLocation();

  // Scroll to top on navigation change
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [location]);

  return (
    <AuthProvider>
      <div className="flex flex-col min-h-screen bg-[#FAFAFA] text-slate-900 selection:bg-orange-100 selection:text-orange-900">
        {/* Header */}
        <Header />

        {/* Main Content Router */}
        <main className="flex-1">
          <Switch>
            <Route path="/" component={HomePage} />
            <Route path="/products" component={ProductListingPage} />
            <Route path="/products/:slug" component={ProductDetailPage} />
            <Route>
              <div className="py-16">
                <ErrorState
                  type="not-found"
                  title="Page Not Found"
                  message="The page you requested does not exist on 1Fi Marketplace."
                />
              </div>
            </Route>
          </Switch>
        </main>

        {/* Footer */}
        <Footer />

        {/* Global Interactive Animated Popups */}
        <LoginModal />
        <LogoutModal />
        <PayEmiModal />
        <AccountModal />
        <InfoModal />
        <ToastNotification />
      </div>
    </AuthProvider>
  );
}
