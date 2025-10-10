import * as React from 'react'
import { cn } from '@/lib/utils'
import { navigate, getPath } from '@/lib/router'

const items = [
  { href: '/app3/settings', label: 'Settings' },
]

function usePath() {
  const [path, setPath] = React.useState<string>(typeof window !== 'undefined' ? getPath() : '/app3/settings')
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
    <div className={cn('sticky top-0 z-30 w-full border-b bg-background/80 backdrop-blur', className)}>
      <div className="px-2 md:px-0 py-1">
        <h2 className="text-sm font-semibold text-muted-foreground">App 3</h2>
      </div>
      <div className="flex h-12 items-center gap-2 px-2 md:px-0">
        {items.map((item) => {
          const active = path === item.href
          return (
            <button onClick={() => navigate(item.href)} className={cn('rounded-md px-3 py-1.5 text-sm', active ? 'bg-accent text-accent-foreground' : 'text-muted-foreground hover:bg-accent hover:text-accent-foreground')}>
              {item.label}
            </button>
          )
        })}
      </div>
    </div>
  )
}


