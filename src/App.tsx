import { BrowserRouter, Routes, Route } from "react-router-dom";
import MainLayout from "@/layout";
import HomePage from "@/pages/HomePage";
import ExplorePage from "@/pages/explore/ExplorePage";
import SchedulePage from "@/pages/schedule/SchedulePage";
import SchedulePlaceholderPage from "./pages/schedule/SchedulePlaceholderPage";
import ProfilePage from "@/pages/profile/ProfilePage";
import LoginPage from "@/pages/auth/LoginPage";
import RegisterPage from "@/pages/auth/RegisterPage";
import { GeneratedPlanProvider } from "@/context/GeneratedPlanProvider";
import ProtectedRoute from "@/components/auth/ProtectedRoute";
import PrivacyPolicyPage from "@/pages/legal/PrivacyPolicyPage";
import { useAuth } from "@/providers/AuthContext";
import { LoadingDots } from "@/components/design-system/atoms/LoadingDots";

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
      <GeneratedPlanProvider>
        <Routes>
          <Route element={<MainLayout />}>
            {/* Public routes — accessible to everyone */}
            <Route path="/" element={<HomePage />} />
            <Route path="/explore" element={<ExplorePage />} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/register" element={<RegisterPage />} />
            <Route path="/privacy-policy" element={<PrivacyPolicyPage />} />

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
    </BrowserRouter>
  );
}
export default App;
