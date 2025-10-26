import * as React from 'react';
import * as Dialog from '@radix-ui/react-dialog';

interface LoginProps {
  onLogin: () => void;
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

const LoginDialog: React.FC<LoginProps> = ({ onLogin, open, onOpenChange }) => {
  const [email, setEmail] = React.useState('');
  const [password, setPassword] = React.useState('');
  const [error, setError] = React.useState<string | null>(null);
  const [loading, setLoading] = React.useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setLoading(true);
    try {
      const res = await fetch('/api/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
      });
      const data = await res.json();
      if (data.token) {
        localStorage.setItem('token', data.token); // Consider using httpOnly cookies for critical apps
        setEmail('');
        setPassword('');
        onLogin();
        onOpenChange(false); // Close dialog on success
      } else {
        setError(data.message || 'Invalid credentials');
      }
    } catch (e) {
      setError('Login failed. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <Dialog.Root open={open} onOpenChange={onOpenChange}>
      <Dialog.Portal>
        <Dialog.Overlay className="bg-black/50 fixed inset-0" />
        <Dialog.Content className="bg-white rounded shadow-lg p-8 max-w-sm mx-auto my-32">
          <Dialog.Title className="text-lg font-bold mb-4">Login</Dialog.Title>
          <form onSubmit={handleSubmit}>
            <input
              value={email}
              onChange={e => setEmail(e.target.value)}
              placeholder="Email"
              type="email"
              autoComplete="email"
              className="block w-full mb-3 p-2 border rounded"
              required
            />
            <input
              value={password}
              onChange={e => setPassword(e.target.value)}
              type="password"
              placeholder="Password"
              autoComplete="current-password"
              className="block w-full mb-3 p-2 border rounded"
              required
            />
            <button
              type="submit"
              disabled={loading}
              className="w-full p-2 bg-blue-600 text-white rounded"
            >
              {loading ? 'Logging in...' : 'Login'}
            </button>
            {error && (
              <div className="mt-2 text-red-600">{error}</div>
            )}
          </form>
          <Dialog.Close asChild>
            <button className="absolute top-2 right-2 p-1">&times;</button>
          </Dialog.Close>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
};

export default LoginDialog;