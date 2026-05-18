import { useLocation } from "react-router-dom";
import { Link } from "@/components/atoms/Link";
import { NavbarItem } from "./NavbarItem";
import { NAVBAR_LINKS_GUEST, NAVBAR_LINKS_USER } from "./navbarLinks";
import { Button } from "@/components/atoms/Button";

export function NavbarDesktop() {
  const { pathname } = useLocation();

  const isLoggedIn = true;

  const links = isLoggedIn ? NAVBAR_LINKS_USER : NAVBAR_LINKS_GUEST;

  return (
    <main className="flex items-center justify-between">
      <nav className="w-fit bg-backgroundPrimary rounded-full shadow-sm">
        <div className="flex items-center gap-8 custom-shadow rounded-full px-8 py-1.5">
          <Link to={"/"}>
            <img
              src="/triply-logo.svg"
              alt="logo"
              width={64}
              className="pt-0.5"
            />
          </Link>

          <section className="flex gap-8">
            {links.map((link) => (
              <NavbarItem
                key={`desktop-${link.to}`}
                to={link.to}
                current={
                  pathname === link.to ||
                  (link.to !== "/" && pathname.startsWith(link.to))
                }
              >
                {link.name}
              </NavbarItem>
            ))}
          </section>
        </div>
      </nav>

      {pathname !== "/login" &&
        (isLoggedIn ? (
          <Button outline to={"/login"}>
            Wyloguj się
          </Button>
        ) : (
          <Button to={"/login"}>Zaloguj się</Button>
        ))}
    </main>
  );
}
