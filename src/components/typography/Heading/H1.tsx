import { cn } from '@/components/utils'
import React from 'react'

export function H1({ className, ...props }: React.ComponentPropsWithoutRef<'h1'>) {
  return (
    <h1
      {...props}
      className={cn(
        'text-contentPrimary text-2xl leading-tight font-bold md:text-4xl md:leading-12',
        className
      )}
    />
  )
}
