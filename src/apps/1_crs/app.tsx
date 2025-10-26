import * as React from 'react'
import { Routes, Route } from 'react-router-dom'
import { cn } from '@/lib/utils'
import AppNavbar from '@/components/high_level/app-navbar.tsx'

const items = [
  { href: '/app1/projects', label: 'Projects' },
  { href: '/app1/mydata', label: 'My Data' },
  { href: '/app1/dasboard', label: 'Dashboard' },
]

const Dashboard = React.lazy(() => import('./views/dashboard.tsx'));
const MyData = React.lazy(() => import('./views/mydata.tsx'));
const Projects = React.lazy(() => import('./views/projects.tsx'));

export default function app1({ className }: { className?: string }) {
  return (
    <div className={cn('sticky top-0 z-30 w-full border-b bg-background/80 backdrop-blur supports-[backdrop-filter]:bg-background/60', className)}>
      <div className="px-2 md:px-0 py-1">
        <h2 className="text-sm font-semibold text-muted-foreground">App 1</h2>
      </div>
      <AppNavbar items={items}></AppNavbar>
      <Routes>
        <Route path="*" element={<Dashboard />} />
        <Route path="dasboard" element={<Dashboard />} />
        <Route path="mydata" element={<MyData />} />
        <Route path="projects" element={<Projects />} />
      </Routes>
    </div>
  )
}