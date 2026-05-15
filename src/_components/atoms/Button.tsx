import { cn } from '@/_frontend/utils'
import * as Headless from '@headlessui/react'
import React from 'react'
import { Link } from './Link'

const baseStyles =
  'inline-flex items-center justify-center font-medium rounded-full px-4 py-2 text-sm text-nowrap transition-colors hover:cursor-pointer'

const variantStyles = {
  default: {
    base: 'bg-actionDefault dark:border-borderSecondary dark:text-contentPrimary dark:border-2 border-1 border-borderDefault text-contentInverted custom-shadow',
    hover: 'hover:brightness-110 transition duration-200'
  },
  outline: {
    base: 'dark:border-2 border-1 dark:border-borderSecondary dark:text-contentSecondary border-borderDefault text-contentTertiary transition duration-200',
    hover: 'hover:bg-actionDefaultHover'
  },
  plain: {
    base: 'border-1 border-transparent text-contentTertiary transition duration-200',
    hover: ''
  },
  destructive: {
    base: 'bg-actionDestructive border-1 border-borderDestructive text-contentInverted custom-shadow',
    hover: 'hover:brightness-115 transition duration-200'
  },
  outlineDestructive: {
    base: 'border-1 border-borderDestructive text-contentDestructive bg-actionDestructive/5',
    hover: 'hover:brightness-115 transition duration-200'
  }
} as const

type VariantKey = keyof typeof variantStyles

type ButtonProps = {
  children: React.ReactNode
  className?: string
  to?: string
  variant?: VariantKey
  disabled?: boolean
} & Omit<Headless.ButtonProps, 'as' | 'className'>

export const Button = React.forwardRef<HTMLElement, ButtonProps>(function Button(
  { children, className, to, variant = 'default', disabled = false, ...props },
  ref
) {
  const variantClass = variantStyles[variant]

  const classes = cn(
    baseStyles,
    variantClass.base,
    variantClass.hover,
    disabled && 'opacity-50 hover:cursor-default pointer-events-none',
    className
  )

  if (to) {
    return (
      <Link to={to} className={classes} ref={ref as React.Ref<HTMLAnchorElement>}>
        {children}
      </Link>
    )
  }

  return (
    <Headless.Button {...props} className={classes} ref={ref} disabled={disabled}>
      {children}
    </Headless.Button>
  )
})
