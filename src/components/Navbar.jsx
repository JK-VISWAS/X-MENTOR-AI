import { Link, useLocation } from 'react-router-dom'
import { Menu, X } from 'lucide-react'
import { useState } from 'react'
import './Navbar.css'

const navLinks = [
    { path: '/', label: 'Home' },
    { path: '/tools', label: 'AI Tools' },
    { path: '/chat', label: 'Chat' },
    { path: '/feed', label: 'Tech Feed' },
    { path: '/pomodoro', label: 'Pomodoro' },
    { path: '/games', label: 'Brain IQ' },
]

export default function Navbar() {
    const location = useLocation()
    const [open, setOpen] = useState(false)

    return (
        <nav className="navbar">
            <div className="navbar-inner">
                <Link to="/" className="navbar-logo">
                    <span>X-<span className="logo-accent">Mentor AI</span></span>
                </Link>

                <ul className="navbar-links">
                    {navLinks.map(({ path, label }) => (
                        <li key={path}>
                            <Link
                                to={path}
                                className={`navbar-link ${location.pathname === path ? 'active' : ''}`}
                            >
                                {label}
                            </Link>
                        </li>
                    ))}
                </ul>

                <Link to="/chat" className="navbar-cta btn-primary" style={{ padding: '8px 20px', fontSize: '0.85rem' }}>
                    Try Chatbot
                </Link>

                <button className="navbar-hamburger" onClick={() => setOpen(!open)}>
                    {open ? <X size={22} /> : <Menu size={22} />}
                </button>
            </div>

            {open && (
                <div className="navbar-mobile">
                    {navLinks.map(({ path, label }) => (
                        <Link
                            key={path}
                            to={path}
                            className={`navbar-mobile-link ${location.pathname === path ? 'active' : ''}`}
                            onClick={() => setOpen(false)}
                        >
                            {label}
                        </Link>
                    ))}
                </div>
            )}
        </nav>
    )
}
