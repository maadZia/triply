import { cn } from '@/components/utils'

export const DarkCard = ({
  children,
  className,
  ...props
}: {
  children: React.ReactNode
  className?: string
} & React.HTMLAttributes<HTMLDivElement>) => {
  return (
    <div
      className={cn(
        'bg-backgroundSecondary border border-borderPrimary h-fit flex-1 space-y-4 rounded-xl p-6 shadow-md',
        className
      )}
      {...props}
    >
      {children}
    </div>
  )
}
