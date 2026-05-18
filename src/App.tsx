import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import MainLayout from "@/layout";
import HomePage from "@/features/home/HomePage";
import ExplorePage from "@/features/explore/ExplorePage";
import SchedulePage from "@/features/schedule/SchedulePage";
import ProfilePage from "@/features/profile/Profile";
import PlansTab from "@/features/profile/tabs/PlansTab";
import PlacesTab from "@/features/profile/tabs/PlacesTab";
import PreferencesTab from "@/features/profile/tabs/PreferencesTab";
import LoginPage from "@/features/auth/pages/LoginPage";
import RegisterPage from "@/features/auth/pages/RegisterPage";
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
