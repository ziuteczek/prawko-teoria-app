import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import Rout from './router'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <Rout/>
  </StrictMode>,
)
