import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { HeroUIProvider } from '@heroui/react'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import AuthContextProvider from './context/AuthContext.jsx'
const queryClient = new QueryClient()
createRoot(document.getElementById('root')).render(
  <StrictMode>
    <HeroUIProvider>
      <QueryClientProvider client={queryClient}>
        <AuthContextProvider>

        <App />
        </AuthContextProvider>
      </QueryClientProvider>

    </HeroUIProvider>
  </StrictMode>,
)
