import { useLocation } from 'react-router-dom'
import { Link } from "@/_components/atoms/Link"
import { NavbarItem } from './NavbarItem'
import { NAVBAR_LINKS } from './navbarLinks'

export function NavbarDesktop() {
  const { pathname } = useLocation()

  return (
    <nav className="w-fit bg-backgroundPrimary rounded-full shadow-sm">
      <main className="flex items-center gap-8 custom-shadow rounded-full px-8 py-1.5">
        <Link to={'/'}>
          <img src='/triply-logo.svg' alt='logo' width={64} className='pt-0.5' />
        </Link>

        <section className="flex gap-8">
          {NAVBAR_LINKS.map(link => (
            <NavbarItem
              key={`desktop-${link.to}`}
              to={link.to}
              current={pathname === link.to || (link.to !== '/' && pathname.startsWith(link.to))}
            >
              {link.name}
            </NavbarItem>
          ))}
        </section>
      </main>
    </nav>
  )
}
