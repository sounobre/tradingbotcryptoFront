import { Routes, Route, NavLink, useNavigate } from 'react-router-dom'
import { LayoutDashboard, LineChart, Settings, FlaskConical } from 'lucide-react'
import Dashboard from './pages/Dashboard'
import Backtests from './pages/Backtests'
import SettingsPage from './pages/SettingsPage'
import { Button } from './components/ui/Button'


export default function App() {
return (
<div className="min-h-screen grid grid-cols-[240px_1fr]">
<aside className="border-r border-border p-4 space-y-4">
<h1 className="text-xl font-bold">CryptoTrade</h1>
<nav className="flex flex-col gap-1">
<NavLink to="/" end className={({isActive})=>`px-3 py-2 rounded hover:bg-muted ${isActive?'bg-muted font-medium':''}`}><LayoutDashboard className="inline mr-2" size={18}/>Dashboard</NavLink>
<NavLink to="/backtests" className={({isActive})=>`px-3 py-2 rounded hover:bg-muted ${isActive?'bg-muted font-medium':''}`}><LineChart className="inline mr-2" size={18}/>Backtests</NavLink>
<NavLink to="/settings" className={({isActive})=>`px-3 py-2 rounded hover:bg-muted ${isActive?'bg-muted font-medium':''}`}><Settings className="inline mr-2" size={18}/>Configurações</NavLink>
</nav>
<div className="pt-6">
<ThemeToggle />
</div>
</aside>
<main className="p-6">
<Routes>
<Route path="/" element={<Dashboard/>} />
<Route path="/backtests" element={<Backtests/>} />
<Route path="/settings" element={<SettingsPage/>} />
</Routes>
</main>
</div>
)
}


function ThemeToggle() {
const isDark = typeof document !== 'undefined' && document.documentElement.classList.contains('dark')
const toggle = () => document.documentElement.classList.toggle('dark')
return <Button onClick={toggle} variant="outline">{isDark ? 'Claro' : 'Escuro'}</Button>
}