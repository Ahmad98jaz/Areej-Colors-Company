import { ViteReactSSG } from 'vite-react-ssg'
import '@fontsource/cairo/400.css'
import '@fontsource/cairo/700.css'
import './styles/main.scss'
import Layout from './components/Layout'
import Home from './pages/Home'
import Service from './pages/Service'
import About from './pages/About'
import { SERVICES, ABOUT } from './config/site'

export const routes = [{
  path: '/', element: <Layout />,
  children: [{ index: true, element: <Home /> }, { path: ABOUT.path, element: <About /> }, ...SERVICES.map((s) => ({ path: s.path, element: <Service s={s} /> }))],
}]
export const createRoot = ViteReactSSG({ routes })
