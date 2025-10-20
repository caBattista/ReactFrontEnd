import * as React from 'react'
import { BrowserRouter as Router, Routes, Route, Navigate, useLocation } from 'react-router-dom'
import Layout from './layout'
import LoginDialog from './components/LoginDialog';

const Dashboard = React.lazy(() => import('./apps/app1/views/Dashboard'));
const Projects = React.lazy(() => import('./apps/app1/views/Projects'));
const MyData = React.lazy(() => import('./apps/app1/views/MyData'));
const App1NavBar = React.lazy(() => import('./apps/app1/AppNavBar'));
const App2NavBar = React.lazy(() => import('./apps/app2/AppNavBar'));
const Settings = React.lazy(() => import('./apps/settings/AppNavBar'));

function NavBarWrapper() {
  const location = useLocation();
  if (location.pathname.startsWith('/app2')) return <App2NavBar />;
  if (location.pathname.startsWith('/app3')) return <Settings />;
  return <App1NavBar />;
}

export default function App() {

  const [loginOpen, setLoginOpen] = React.useState(false);

  return (
    <Router>
      <Layout>
        <div className="h-full w-full flex flex-col min-h-0">
          <React.Suspense fallback={<div>Loading...</div>}>
            <NavBarWrapper />
            <div className="flex-1 min-h-0">
              <Routes>
                <Route path="/" element={<Navigate to="/app1/projects" replace />} />
                <Route path="/app1" element={<Projects />} />
                <Route path="/app1/projects" element={<Projects />} />
                <Route path="/app1/my-data" element={<MyData />} />
                <Route path="/app2" element={<Dashboard />} />
                <Route path="/app2/dashboard" element={<Dashboard />} />
                <Route path="/settings" element={<Settings />} />
                <Route path="/settings/settings" element={<Settings />} />
                <Route path="/login" element={ <LoginDialog onLogin={() => {/* handle login */}} open={loginOpen} onOpenChange={setLoginOpen} />} />
                <Route path="*" element={<Projects />} />
              </Routes>
            </div>
          </React.Suspense>
        </div>
      </Layout>
    </Router>
  )
}