import { Outlet } from "react-router-dom";
import { Navbar } from "@/components/design-system/navigation/Navbar";

export default function MainLayout() {
  return (
    <main className="mx-auto flex flex-col h-screen w-full max-w-7xl bg-backgroundPrimary text-contentPrimary p-2 gap-8">
      <Navbar />
      <div className="flex-1 min-h-0">
        <Outlet />
      </div>
    </main>
  );
}
