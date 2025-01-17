import { createRoot } from 'react-dom/client'
import App from './App.tsx'
import './style/index.css'
import { AuthProvider } from './provider/AuthContext.tsx'

createRoot(document.getElementById('root')!).render(
  <AuthProvider>
    <App />
  </AuthProvider>,
)
