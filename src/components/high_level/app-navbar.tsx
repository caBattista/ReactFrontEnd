import * as React from 'react'
import { cn } from '@/lib/utils'
import { navigate, getPath } from '@/lib/router'

type NavItem = {
  href: string
  label: string
}

type NavBarProps = {
  items: NavItem[]
}

function usePath() {
  const [path, setPath] = React.useState<string>(
    typeof window !== 'undefined' ? getPath() : ''
  )
  React.useEffect(() => {
    const onPop = () => setPath(getPath())
    window.addEventListener('popstate', onPop)
    return () => window.removeEventListener('popstate', onPop)
  }, [])
  return path
}

export default function AppNavBar({
  items,
}: NavBarProps) {
  const path = usePath()
  return (
    <div className="flex h-12 items-center gap-2 px-2 md:px-0">
      {items.map((item) => {
        const active = path === item.href
        return (
          <button
            key={item.href}
            onClick={() => navigate(item.href)}
            className={cn(
              'rounded-md px-3 py-1.5 text-sm',
              active ? 'bg-accent text-accent-foreground' : 'text-muted-foreground hover:bg-accent hover:text-accent-foreground'
            )}
          >
            {item.label}
          </button>
        )
      })}
    </div>
  )
}