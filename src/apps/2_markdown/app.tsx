import * as React from 'react'
import { cn } from '@/lib/utils'
import { Routes, Route } from 'react-router-dom'
import AppNavbar from '@/components/high_level/app-navbar.tsx'

const items = [
  { href: '/app2/markdown', label: 'Edtior' }
]

const Editor = React.lazy(() => import('./views/editor.tsx'));

export default function app2({ className }: { className?: string }) {
  return (
    <div className={cn('sticky top-0 z-30 w-full border-b bg-background/80 backdrop-blur supports-[backdrop-filter]:bg-background/60', className)}>
      <div className="px-2 md:px-0 py-1">
        <h2 className="text-sm font-semibold text-muted-foreground">App2</h2>
      </div>
      <AppNavbar items={items}></AppNavbar>
      <Routes>
        <Route path="*" element={<Editor />} />
        <Route path="editor" element={<Editor />} />
      </Routes>
    </div>
  )
}