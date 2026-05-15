import { cn } from '@/_frontend/utils'
import React from 'react'

export function H1({ className, ...props }: React.ComponentPropsWithoutRef<'h1'>) {
  return (
    <h1
      {...props}
      className={cn(
        'text-contentPrimary text-3xl leading-tight font-semibold md:text-5xl md:leading-12',
        className
      )}
    />
  )
}
