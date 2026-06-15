import { Outlet } from "react-router-dom";
import { Navbar } from "@/components/design-system/navigation/Navbar";

export default function MainLayout() {
  return (
    <main className="mx-auto flex flex-col min-h-screen w-full max-w-7xl bg-backgroundPrimary text-contentPrimary py-2 px-4 gap-4">
      <Navbar />
      <div className="flex-1 py-8">
        <Outlet />
      </div>
    </main>
  );
}
