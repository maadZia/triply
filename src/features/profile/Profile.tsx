import { Button } from "@/components/atoms/Button";
import { Link, Outlet, useLocation } from "react-router-dom";
import { useAuth } from "@/providers/AuthContext";

export default function ProfilePage() {
  const { user, loading } = useAuth();
  const location = useLocation();

  if (loading) {
    return (
      <main className="flex min-h-[60vh] items-center justify-center">
        <p className="text-contentSecondary">Ładowanie profilu...</p>
      </main>
    );
  }

  if (!user) {
    return (
      <main className="flex min-h-[60vh] flex-col items-center justify-center gap-4">
        <p className="text-contentSecondary">Nie jesteś zalogowany.</p>
        <Button to="/login">Zaloguj się</Button>
      </main>
    );
  }

  const tabs = [
    { id: "plans", label: "Plany", path: "/profile/plans" },
    { id: "places", label: "Miejsca", path: "/profile/places" },
    { id: "preferences", label: "Preferencje", path: "/profile/preferences" },
  ];

  return (
    <main className="max-w-6xl mx-auto w-full mt-12 px-8">
      {/* Header section */}
      <div className="flex items-start justify-between">
        <div className="space-y-2">
          <h1 className="text-4xl font-bold text-contentPrimary">
            Moja Biblioteka
          </h1>
          <p className="text-contentSecondary text-sm">
            Zapisane plany, miejsca i preferencje
          </p>
        </div>

        {/* Small profile info flexed to the right */}
        <div className="flex items-center gap-3 bg-white p-2 pr-4 rounded-full shadow-sm border border-borderSecondary">
          {user.photoURL ? (
            <img
              src={user.photoURL}
              alt="Profile"
              className="w-10 h-10 rounded-full border border-borderSecondary object-cover"
            />
          ) : (
            <div className="w-10 h-10 rounded-full bg-accentLight flex items-center justify-center text-accentDark font-bold text-lg shadow-sm">
              {user.email?.[0].toUpperCase() || "U"}
            </div>
          )}
          <div className="flex flex-col">
            <span className="text-sm font-medium text-contentPrimary leading-tight">
              {user.displayName || "Użytkownik"}
            </span>
            <span className="text-xs text-contentSecondary leading-tight">
              {user.email}
            </span>
          </div>
        </div>
      </div>

      {/* Tabs */}
      <div className="mt-12">
        <div className="flex gap-8 border-b border-borderSecondary/60">
          {tabs.map((tab) => {
            const isActive = location.pathname.startsWith(tab.path);
            return (
              <Link
                key={tab.id}
                to={tab.path}
                className={`pb-3 px-1 text-sm font-medium transition-colors border-b-2 ${
                  isActive
                    ? "border-accentDark text-accentDark"
                    : "border-transparent text-contentSecondary hover:text-contentPrimary"
                }`}
              >
                {tab.label}
              </Link>
            );
          })}
        </div>

        {/* Tab content via React Router */}
        <div className="py-8">
          <Outlet />
        </div>
      </div>
    </main>
  );
}
