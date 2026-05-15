import type React from 'react'
import { cn } from '@/components/utils'

export const Divider = ({
  soft = false,
  className,
  ...props
}: { soft?: boolean } & React.ComponentPropsWithoutRef<'hr'>) => {
  return (
    <hr
      role='presentation'
      {...props}
      className={cn(
        'w-full border-t',
        soft && 'border-borderSecondary',
        !soft && 'border-borderPrimary',
        className
      )}
    />
  )
}
