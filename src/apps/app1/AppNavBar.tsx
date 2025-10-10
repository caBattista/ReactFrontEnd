import * as React from 'react'
import { cn } from '@/lib/utils'
import { navigate, getPath } from '@/lib/router'

type NavItem = { href: string; label: string }

const items: NavItem[] = [
  { href: '/app1/projects', label: 'Projects' },
  { href: '/app1/my-data', label: 'My Data' },
]

function usePath() {
  const [path, setPath] = React.useState<string>(typeof window !== 'undefined' ? getPath() : '/app1/projects')
  React.useEffect(() => {
    const onPop = () => setPath(getPath())
    window.addEventListener('popstate', onPop)
    return () => window.removeEventListener('popstate', onPop)
  }, [])
  return path
}

export default function AppNavBar({ className }: { className?: string }) {
  const path = usePath()
  return (
    <div
      className={cn(
        'sticky top-0 z-30 w-full border-b bg-background/80 backdrop-blur supports-[backdrop-filter]:bg-background/60',
        className
      )}
    >
      <div className="px-2 md:px-0 py-1">
        <h2 className="text-sm font-semibold text-muted-foreground">App 1</h2>
      </div>
      <div className="flex h-12 items-center gap-2 px-2 md:px-0">
        {items.map((item) => {
          const active = path === item.href
          return (
            <button
              key={item.href}
              onClick={() => navigate(item.href)}
              className={cn(
                'rounded-md px-3 py-1.5 text-sm transition-colors',
                active
                  ? 'bg-accent text-accent-foreground'
                  : 'text-muted-foreground hover:bg-accent hover:text-accent-foreground'
              )}
              aria-current={active ? 'page' : undefined}
            >
              {item.label}
            </button>
          )
        })}
      </div>
    </div>
  )
}


