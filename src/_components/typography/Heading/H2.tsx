import { cn } from '@/_frontend/utils'
import React from 'react'

export function H2({ className, ...props }: React.ComponentPropsWithoutRef<'h2'>) {
  return (
    <h2
      {...props}
      className={cn(
        'text-contentPrimary text-xl leading-tight font-semibold lg:text-3xl',
        className
      )}
    />
  )
}
