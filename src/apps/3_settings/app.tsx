import { cn } from '@/lib/utils'
import NavBar from '@/components/high_level/app-navbar'

const items = [
  { href: '/app3/settings', label: 'Settings' },
]

export default function AppNavBar({ className }: { className?: string }) {
  return (
    <div className={cn('sticky top-0 z-30 w-full border-b bg-background/80 backdrop-blur', className)}>
      <div className="px-2 md:px-0 py-1">
        <h2 className="text-sm font-semibold text-muted-foreground">App 3</h2>
      </div>
      <NavBar items={items} title="My App" />
    </div>
  )
}