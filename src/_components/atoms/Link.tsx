import { cn } from '@/_frontend/utils'
import * as Headless from '@headlessui/react'
import { Link as RouterLink, type LinkProps } from 'react-router-dom'
import { forwardRef } from 'react'

export const Link = forwardRef<HTMLAnchorElement, LinkProps>(
  function Link(props, ref) {
    return (
      <Headless.DataInteractive>
        <RouterLink 
          {...props} 
          ref={ref} 
          className={cn('text-contentPrimary', props.className)} 
        />
      </Headless.DataInteractive>
    )
  }
)
