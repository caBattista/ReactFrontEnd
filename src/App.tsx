import * as React from 'react'
import Layout from './layout'
import Dashboard from './apps/app1/views/Dashboard.tsx'
import Projects from './apps/app1/views/Projects.tsx'
import Settings from './apps/app1/views/Settings.tsx'
import MyData from './apps/app1/views/MyData.tsx'
import App1NavBar from './apps/app1/AppNavBar'
import App2NavBar from './apps/app2/AppNavBar'
import App3NavBar from './apps/app3/AppNavBar'

function usePath(): string {
  const [path, setPath] = React.useState<string>(() => window.location.pathname || '/app1/projects')
  React.useEffect(() => {
    const onPop = () => setPath(window.location.pathname || '/app1/projects')
    window.addEventListener('popstate', onPop)
    if (!window.location.pathname || window.location.pathname === '/') {
      window.history.replaceState({}, '', '/app1/projects')
      setPath('/app1/projects')
    }
    return () => window.removeEventListener('popstate', onPop)
  }, [])
  return path
}

function View() {
  const path = usePath()
  if (path === '/app1' || path === '/app1/projects') {
    return <Projects />
  }
  if (path === '/app1/my-data') {
    return <MyData />
  }
  if (path === '/app2' || path === '/app2/dashboard') {
    return <Dashboard />
  }
  if (path === '/app3' || path === '/app3/settings') {
    return <Settings />
  }
  return <Projects />
}

// moved to src/views, will refactor App to import later

export default function App() {
  return (
    <Layout>
      <div className="h-full w-full flex flex-col min-h-0">
        {(() => {
          const p = usePath()
          if (p.startsWith('/app2')) return <App2NavBar />
          if (p.startsWith('/app3')) return <App3NavBar />
          return <App1NavBar />
        })()}
        <div className="flex-1 min-h-0">
          <View />
        </div>
      </div>
    </Layout>
  )
}
