import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import UseContextApiProvider from './Context/UseContextApiProvider.jsx'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { BrowserRouter } from 'react-router-dom'
const queryclient=new QueryClient()

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter>

    <QueryClientProvider client={queryclient}>
      <UseContextApiProvider>
    <App />


    </UseContextApiProvider>
    </QueryClientProvider>
    </BrowserRouter>
    
  </StrictMode>,
)
