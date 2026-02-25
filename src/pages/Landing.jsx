import { Link } from 'react-router-dom'
import { ArrowRight, Cpu, MessageCircle, Rss, Search, Star, Users, Zap } from 'lucide-react'
import './Landing.css'

const stats = [
    { value: '40+', label: 'AI Tools Curated', icon: <Cpu size={18} /> },
    { value: '8', label: 'Categories', icon: <Star size={18} /> },
    { value: '∞', label: 'Student Potential', icon: <Users size={18} /> },
]

const steps = [
    {
        icon: <Search size={24} />,
        step: '01',
        title: 'Discover',
        desc: 'Browse 40+ curated AI tools filtered by category and pricing — all in one place.',
    },
    {
        icon: <MessageCircle size={24} />,
        step: '02',
        title: 'Get Guided',
        desc: 'Ask our smart chatbot for personalized tool recommendations with explanations.',
    },
    {
        icon: <Rss size={24} />,
        step: '03',
        title: 'Stay Updated',
        desc: 'Read the latest AI and tech intelligence news curated for students and builders.',
    },
]

export default function Landing() {
    return (
        <main className="landing">
            {/* Hero */}
            <section className="hero section">
                <div className="container">
                    <div className="hero-badge animate-fade-up">
                        <Zap size={12} fill="currentColor" />
                        AI Intelligence Platform for Students
                    </div>

                    <h1 className="hero-heading animate-fade-up-delay-1">
                        Discover the Right <br />
                        <span className="gradient-text">AI Tools Faster.</span>
                    </h1>

                    <p className="hero-sub animate-fade-up-delay-2">
                        X-Mentor AI is a centralized discovery hub — not just a chatbot.<br />
                        Search, filter, and understand the best AI tools for every student need.
                    </p>

                    <div className="hero-ctas animate-fade-up-delay-3">
                        <Link to="/tools" className="btn-primary">
                            Explore AI Tools <ArrowRight size={16} />
                        </Link>
                        <Link to="/chat" className="btn-ghost">
                            Try the Chatbot
                        </Link>
                    </div>

                    {/* Stats */}
                    <div className="hero-stats animate-fade-up-delay-3">
                        {stats.map(({ value, label, icon }) => (
                            <div className="stat-card" key={label}>
                                <div className="stat-icon">{icon}</div>
                                <div className="stat-value">{value}</div>
                                <div className="stat-label">{label}</div>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Background glow */}
                <div className="hero-glow" />
            </section>

            {/* How It Works */}
            <section className="how-section section">
                <div className="container">
                    <div className="section-label">How It Works</div>
                    <h2 className="section-heading">
                        Built for student decision-making
                    </h2>
                    <p className="section-sub">
                        Three steps from confusion to clarity — guided by structured AI intelligence.
                    </p>

                    <div className="steps-grid">
                        {steps.map(({ icon, step, title, desc }, i) => (
                            <div className="step-card card" key={step} style={{ animationDelay: `${i * 0.1}s` }}>
                                <div className="step-icon-row">
                                    <div className="step-icon">{icon}</div>
                                    <span className="step-number">{step}</span>
                                </div>
                                <h3 className="step-title">{title}</h3>
                                <p className="step-desc">{desc}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* CTA Banner */}
            <section className="cta-banner section">
                <div className="container">
                    <div className="cta-box">
                        <div className="cta-glow" />
                        <h2 className="cta-heading">Ready to navigate AI intelligence?</h2>
                        <p className="cta-sub">
                            Join thousands of students discovering the right tools, faster.
                        </p>
                        <div className="cta-buttons">
                            <Link to="/tools" className="btn-primary">
                                Browse All Tools <ArrowRight size={16} />
                            </Link>
                            <Link to="/feed" className="btn-ghost">
                                Read Tech Feed
                            </Link>
                        </div>
                    </div>
                </div>
            </section>

            {/* Footer */}
            <footer className="footer">
                <div className="container">
                    <div className="footer-inner">
                        <div className="footer-logo">
                            <Zap size={16} fill="currentColor" />
                            X-Mentor<span> AI</span>
                        </div>
                        <p className="footer-tagline">Structured AI intelligence for the next generation.</p>
                        <div className="footer-links">
                            <Link to="/">Home</Link>
                            <Link to="/tools">Tools</Link>
                            <Link to="/chat">Chat</Link>
                            <Link to="/feed">Feed</Link>
                        </div>
                    </div>
                </div>
            </footer>
        </main>
    )
}
