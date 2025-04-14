import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import 'maplibre-gl/dist/maplibre-gl.css';
import 'mapbox-gl/dist/mapbox-gl.css';
import { Toaster } from 'sonner';

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <Toaster position="top-center" expand visibleToasts={3} toastOptions={{
    unstyled: false,
    classNames: {
      toast: 'p-3',
    },
  }}/>
    <App />
  </StrictMode>,
)
