import * as React from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Layout from './layout'
import LoginDialog from './components/low_level/LoginDialog';

const App1 = React.lazy(() => import('./apps/1_crs/app'));
const App2 = React.lazy(() => import('./apps/2_markdown/app'));
const Settings = React.lazy(() => import('./apps/3_settings/app'));

export default function App() {
  const [loginOpen, setLoginOpen] = React.useState(false);
  return (
    <Router>
      <Layout>
        <div className="h-full w-full flex flex-col min-h-0">
          <React.Suspense fallback={<div>Loading...</div>}>
            <div className="flex-1 min-h-0">
              <Routes>
                <Route path="*" element={<App1 />} />
                <Route path="login" element={ <LoginDialog onLogin={() => {/* handle login */}} open={loginOpen} onOpenChange={setLoginOpen} />} />
                <Route path="app1/*" element={<App1 />} />
                <Route path="app2/*" element={<App2 />} />
                <Route path="settings/*" element={<Settings />} />
              </Routes>
            </div>
          </React.Suspense>
        </div>
      </Layout>
    </Router>
  )
}