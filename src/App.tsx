import { BrowserRouter, Routes, Route } from "react-router-dom";
import MainLayout from "@/layout";
import HomePage from "@/features/home/HomePage";
import ExplorePage from "@/features/explore/ExplorePage";
import SchedulePage from "@/features/schedule/SchedulePage";
import ProfilePage from "@/features/profile/Profile";
import LoginPage from "@/features/auth/screens/LoginPage";
import RegisterPage from "@/features/auth/screens/RegisterPage";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<MainLayout />}>
          <Route path="/" element={<HomePage />} />
          <Route path="/explore" element={<ExplorePage />} />
          <Route path="/schedule" element={<SchedulePage />} />
          <Route path="/profile" element={<ProfilePage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}
export default App;
