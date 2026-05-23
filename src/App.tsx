import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import MainLayout from "@/layout";
import HomePage from "@/pages/HomePage";
import ExplorePage from "@/pages/explore/ExplorePage";
import SchedulePage from "@/pages/schedule/SchedulePage";
import ProfilePage from "@/pages/profile/ProfilePage";
import PlansTab from "@/features/profile/tabs/PlansTab";
import PlacesTab from "@/features/profile/tabs/PlacesTab";
import PreferencesTab from "@/features/profile/tabs/PreferencesTab";
import LoginPage from "@/pages/auth/LoginPage";
import RegisterPage from "@/pages/auth/RegisterPage";
import { AuthProvider } from "@/providers/AuthProvider";

function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Routes>
          <Route element={<MainLayout />}>
            <Route path="/" element={<HomePage />} />
            <Route path="/explore" element={<ExplorePage />} />
            <Route path="/schedule" element={<SchedulePage />} />

            <Route path="/profile" element={<ProfilePage />}>
              <Route index element={<Navigate to="plans" replace />} />
              <Route path="plans" element={<PlansTab />} />
              <Route path="places" element={<PlacesTab />} />
              <Route path="preferences" element={<PreferencesTab />} />
            </Route>

            <Route path="/login" element={<LoginPage />} />
            <Route path="/register" element={<RegisterPage />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  );
}
export default App;
