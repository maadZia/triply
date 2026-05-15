import { Outlet } from "react-router-dom";
import { Navbar } from "@/components/navigation/Navbar";

export default function MainLayout() {
  return (
    <main className="mx-auto min-h-screen w-full max-w-7xl bg-backgroundPrimary text-contentPrimary py-2 px-4 space-y-8">
      <Navbar />
      <div>
        <Outlet />
      </div>
    </main>
  );
}