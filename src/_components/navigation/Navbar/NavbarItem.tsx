import { cn } from '@/_frontend/utils'
import type React from 'react'
import { forwardRef } from 'react'
import { Link, type LinkProps } from 'react-router-dom'

export interface NavbarItemProps extends Omit<LinkProps, 'className'> {
  current?: boolean
  className?: string
  children: React.ReactNode
}

export const NavbarItem = forwardRef<HTMLAnchorElement, NavbarItemProps>(
  function NavbarItem({ current, className, children, ...props }, ref) {
    const classes = cn(
      // base
      'relative flex min-w-0 items-center gap-3 rounded-lg text-center text-base transition-colors',
      // active / inactive colors
      current
        ? 'font-semibold text-contentSecondary'
        : 'font-light text-contentPrimary',
      className
    )

    return (
      <Link
        {...props}
        className={classes}
        data-current={current ? 'true' : undefined}
        ref={ref}
      >
        {children}
      </Link>
    )
  }
)
