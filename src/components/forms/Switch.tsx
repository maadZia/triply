'use client'

import { cn } from '@/components/utils'
import * as Headless from '@headlessui/react'

export interface SwitchProps extends Omit<Headless.SwitchProps, 'as' | 'className' | 'children'> {
  className?: string
}

export function Switch({ className, ...props }: SwitchProps) {
  return (
    <Headless.Switch
      data-slot='control'
      {...props}
      className={cn(
        // base styles
        'group relative isolate inline-flex h-6 w-10 cursor-default rounded-full p-0.75 sm:h-5 sm:w-8',
        // transitions
        'transition duration-0 ease-in-out data-changing:duration-200',
        // unchecked
        'bg-accentMuted ring-borderSecondary ring-1 ring-inset',
        // checked
        'data-checked:bg-accentLight data-checked:ring-borderLight',
        // disabled
        'data-disabled:opacity-50',
        className
      )}
    >
      <span
        aria-hidden='true'
        className={cn(
          // basic layout
          'pointer-events-none relative inline-block size-4.5 rounded-full sm:size-3.5',
          // transition
          'translate-x-0 transition duration-200 ease-in-out',
          'ring-borderSecondary/50 bg-white shadow-xs ring-1',
          // checked
          'group-data-checked:bg-white group-data-checked:ring-borderLight/50',
          'group-data-checked:translate-x-4 sm:group-data-checked:translate-x-3',
          // disabled
          'group-data-checked:group-data-disabled:bg-white group-data-checked:group-data-disabled:shadow-xs group-data-checked:group-data-disabled:ring-black/5'
        )}
      />
    </Headless.Switch>
  )
}
