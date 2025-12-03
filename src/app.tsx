import * as React from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Layout from './layout'
import LoginDialog from './components/low_level/LoginDialog';
import { AuthContext } from 'react-oauth2-code-pkce';

const App1 = React.lazy(() => import('./apps/1_crs/app'));
const App2 = React.lazy(() => import('./apps/2_markdown/app'));
const Settings = React.lazy(() => import('./apps/3_settings/app'));

export default function App() {
  const {token, tokenData, logIn, logOut} = React.useContext(AuthContext);
  const [loginOpen, setLoginOpen] = React.useState(false);

  React.useEffect(() => {
    if (token) {
      console.log('Logged in with token:', token);
      console.log('Logged in with token data:', tokenData);
      fetchHello();
    }
  }, [token, tokenData]);

  const fetchHello = async () => {
    try {
      const res = await fetch("http://localhost:8082/api/employees", {
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'text/plain; charset=utf-8'
        }
      });
      if (!res.ok) throw new Error(`HTTP error! status: ${res.status}`);
      const data = await res.text();
      console.log('Fetched data:', data);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  }

  return (
    <Router>
      <Layout>{!token ? (
        <div className="h-full w-full flex items-center justify-center">
          <button
            className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
            onClick={() => logIn()}> Log In</button>
         </div>
      ) : (
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
      )}
      </Layout>
    </Router>
  )
}