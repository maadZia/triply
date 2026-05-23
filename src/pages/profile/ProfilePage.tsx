import { Button } from "@/components/atoms/Button";
import { Tabs, TabItem } from "@/components/navigation/Tabs";
import { useAuth } from "@/providers/AuthContext";
import { useSearchParams } from "react-router-dom";
import { PlansSection } from "@/features/profile/sections/PlansSection";
import { PlacesSection } from "@/features/profile/sections/PlacesSection";
import { PreferencesSection } from "@/features/profile/sections/PreferencesSection";

export default function ProfilePage() {
  const { user, loading } = useAuth();
  const [searchParams, setSearchParams] = useSearchParams();

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
    { id: "plans", label: "Plany" },
    { id: "places", label: "Miejsca" },
    { id: "preferences", label: "Preferencje" },
  ] as const;

  const activeTab = searchParams.get("tab") ?? "plans";

  const handleTabChange = (tabId: string) => {
    setSearchParams((prev) => {
      const next = new URLSearchParams(prev);
      next.set("tab", tabId);
      return next;
    });
  };

  return (
    <main className="mx-auto mt-12 w-full max-w-6xl px-8">
      {/* Header */}
      <div className="flex items-start justify-between">
        <div className="space-y-2">
          <h1 className="text-4xl font-bold text-contentPrimary">
            Moja Biblioteka
          </h1>

          <p className="text-sm text-contentSecondary">
            Zapisane plany, miejsca i preferencje
          </p>
        </div>

        {/* Profile */}
        <div className="flex items-center gap-3 rounded-full border border-borderSecondary bg-white p-2 pr-4 shadow-sm">
          {user.photoURL ? (
            <img
              src={user.photoURL}
              alt="Profile"
              className="h-10 w-10 rounded-full border border-borderSecondary object-cover"
            />
          ) : (
            <div className="flex h-10 w-10 items-center justify-center rounded-full bg-accentLight text-lg font-bold text-accentDark shadow-sm">
              {user.email?.[0].toUpperCase() || "U"}
            </div>
          )}

          <div className="flex flex-col">
            <span className="text-sm font-medium leading-tight text-contentPrimary">
              {user.displayName || "Użytkownik"}
            </span>

            <span className="text-xs leading-tight text-contentSecondary">
              {user.email}
            </span>
          </div>
        </div>
      </div>

      {/* Tabs */}
      <div className="mt-12">
        <Tabs>
          {tabs.map((tab) => (
            <TabItem
              key={tab.id}
              current={activeTab === tab.id}
              onClick={() => handleTabChange(tab.id)}
            >
              {tab.label}
            </TabItem>
          ))}
        </Tabs>

        {/* Content */}
        <div className="py-8">
          {activeTab === "plans" && <PlansSection />}

          {activeTab === "places" && <PlacesSection />}

          {activeTab === "preferences" && <PreferencesSection />}
        </div>
      </div>
    </main>
  );
}
