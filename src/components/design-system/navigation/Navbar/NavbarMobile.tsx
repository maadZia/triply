import { useState, useEffect } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { useLocation, useNavigate } from "react-router-dom";
import { Bars3Icon, XMarkIcon } from "@heroicons/react/24/outline";
import { Link } from "@/components/design-system/atoms/Link";
import { NAVBAR_LINKS_GUEST, NAVBAR_LINKS_USER } from "./navbarLinks";
import { Button } from "@/components/design-system/atoms/Button";
import { useAuth } from "@/providers/AuthContext";
import { signOut } from "firebase/auth";
import { auth } from "@/lib/firebase";
import { NavbarItemMobile } from "./NavbarItemMobile";
import { LoadingDots } from "../../atoms/LoadingDots";
import { Divider } from "../../atoms/Divider";

export function NavbarMobile() {
  const [open, setOpen] = useState(false);
  const { pathname } = useLocation();
  const navigate = useNavigate();

  const { user, loading } = useAuth();
  const isLoggedIn = !!user;

  const links = isLoggedIn ? NAVBAR_LINKS_USER : NAVBAR_LINKS_GUEST;

  const handleClose = () => setOpen(false);

  const handleSignOut = async () => {
    await signOut(auth);
    navigate("/login");
    setOpen(false);
  };

  // lock scroll when open
  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "unset";
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [open]);

  return (
    <main className="flex items-center justify-between">
      {/* TOP BAR */}
      <Link to="/">
        <img src="/triply-logo.svg" alt="logo" width={64} />
      </Link>

      <button onClick={() => setOpen(true)} aria-label="Open menu">
        <Bars3Icon className="h-6 w-6" />
      </button>

      {/* DRAWER */}
      <AnimatePresence>
        {open && (
          <>
            {/* overlay */}
            <motion.div
              className="fixed inset-0 z-40 bg-black/50"
              initial={{ opacity: 0 }}
              animate={{ opacity: 0.5 }}
              exit={{ opacity: 0 }}
              onClick={handleClose}
            />

            {/* panel */}
            <motion.div
              className="fixed right-0 top-0 z-50 h-full w-72 bg-backgroundPrimary shadow-lg"
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ type: "tween", duration: 0.3 }}
            >
              {/* header */}
              <div className="flex items-center justify-between px-4 py-3">
                <Link to="/" onClick={handleClose}>
                  <img src="/triply-logo.svg" alt="logo" width={64} />
                </Link>

                <button onClick={handleClose}>
                  <XMarkIcon className="h-6 w-6" />
                </button>
              </div>

              {/* content */}
              <div className="flex flex-col gap-2 px-4 py-3">
                {loading ? (
                  <LoadingDots />
                ) : (
                  <>
                    {links.map((link) => (
                      <NavbarItemMobile
                        key={link.to}
                        to={link.to}
                        current={
                          pathname === link.to ||
                          (link.to !== "/" && pathname.startsWith(link.to))
                        }
                        onClick={handleClose}
                      >
                        {link.name}
                      </NavbarItemMobile>
                    ))}

                    <Divider className="my-3" />

                    {isLoggedIn ? (
                      <Button
                        outline
                        onClick={handleSignOut}
                        className="w-full"
                      >
                        Wyloguj się
                      </Button>
                    ) : (
                      <Button
                        to="/login"
                        onClick={handleClose}
                        className="w-full"
                      >
                        Zaloguj się
                      </Button>
                    )}
                  </>
                )}
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </main>
  );
}
