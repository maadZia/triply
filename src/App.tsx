import { BrowserRouter, Routes, Route } from "react-router-dom";
import MainLayout from "./layout";
import HomePage from "./pages/HomePage";
import ExplorePage from "./pages/ExplorePage";
import SchedulePage from "./pages/SchedulePage";
import ProfilePage from "./pages/Profile";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<MainLayout />}>
          <Route path="/" element={<HomePage />} />
          <Route path="/explore" element={<ExplorePage />} />
          <Route path="/schedule" element={<SchedulePage />} />
          <Route path="/profile" element={<ProfilePage />} />
        </Route>
      </Routes>
    </BrowserRouter>
  )
}
export default App
