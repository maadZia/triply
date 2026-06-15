import { BrowserRouter, Routes, Route } from "react-router-dom";
import MainLayout from "@/layout";
import { ScrollToTop } from "@/components/ScrollToTop";
import HomePage from "@/pages/HomePage";
import ExplorePage from "@/pages/explore/ExplorePage";
import SchedulePage from "@/pages/schedule/SchedulePage";
import SchedulePlaceholderPage from "./pages/schedule/SchedulePlaceholderPage";
import ProfilePage from "@/pages/profile/ProfilePage";
import LoginPage from "@/pages/auth/LoginPage";
import RegisterPage from "@/pages/auth/RegisterPage";
import { GeneratedPlanProvider } from "@/context/plan/GeneratedPlanProvider";
import { ToastProvider } from "@/context/toast/ToastProvider";
import ProtectedRoute from "@/components/ProtectedRoute";
import PrivacyPolicyPage from "@/pages/legal/PrivacyPolicyPage";
import { useAuth } from "@/auth/AuthContext";
import { LoadingDots } from "@/components/design-system/atoms/LoadingDots";
import TermsAndConditionsPage from "@/pages/legal/TermsAndConditions";

function App() {
  const { loading } = useAuth();

  if (loading) {
    return (
      <main className="flex h-screen items-center justify-center">
        <LoadingDots />
      </main>
    );
  }
  return (
    <BrowserRouter>
      <ScrollToTop />
      <ToastProvider>
        <GeneratedPlanProvider>
          <Routes>
            <Route element={<MainLayout />}>
              {/* Public routes — accessible to everyone */}
              <Route path="/" element={<HomePage />} />
              <Route path="/explore" element={<ExplorePage />} />
              <Route path="/login" element={<LoginPage />} />
              <Route path="/register" element={<RegisterPage />} />
              <Route path="/privacy-policy" element={<PrivacyPolicyPage />} />
              <Route
                path="/terms-and-conditions"
                element={<TermsAndConditionsPage />}
              />

              {/* Protected routes — require authentication */}
              <Route element={<ProtectedRoute />}>
                {/* /schedule - placeholder/redirect page */}
                <Route path="/schedule" element={<SchedulePlaceholderPage />} />

                {/* /schedule/:id - plan view (generated or from backend) */}
                <Route path="/schedule/:id" element={<SchedulePage />} />

                <Route path="/profile" element={<ProfilePage />} />
              </Route>
            </Route>
          </Routes>
        </GeneratedPlanProvider>
      </ToastProvider>
    </BrowserRouter>
  );
}
export default App;
