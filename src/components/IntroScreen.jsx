import { useEffect, useState } from 'react'
import './IntroScreen.css'

export default function IntroScreen({ onDone }) {
    const [phase, setPhase] = useState(0)
    // phase 0 = X draws in
    // phase 1 = "Mentor AI" types in + tagline fades
    // phase 2 = progress bar fills
    // phase 3 = whole screen fades out

    useEffect(() => {
        const timers = [
            setTimeout(() => setPhase(1), 1400), // Wait for X drawing + 3D spin (0.8s + 0.6s)
            setTimeout(() => setPhase(2), 2600), // Wait for Wordmark side reveal (1.2s)
            setTimeout(() => setPhase(3), 3800), // Wait for progress bar (1s)
            setTimeout(() => onDone(), 4500),    // Wait for exit fade (0.7s)
        ]
        return () => timers.forEach(clearTimeout)
    }, [onDone])

    return (
        <div className={`intro-screen ${phase >= 3 ? 'intro-exit' : ''}`}>
            {/* Radial glow behind logo */}
            <div className="intro-glow" />

            {/* Scan lines overlay */}
            <div className="intro-scanlines" />

            {/* Grid overlay */}
            <div className="intro-grid" />

            {/* Center content */}
            <div className="intro-center">
                {/* Logo row */}
                <div className="intro-logo-row">
                    {/* The X — Stylish Font Version */}
                    <div className="intro-x-text">X</div>

                    {/* "-Mentor AI" slides in */}
                    <div className={`intro-wordmark ${phase >= 1 ? 'intro-wordmark-in' : ''}`}>
                        <span className="intro-mentor">Mentor</span>
                        <span className="intro-ai"> AI</span>
                    </div>
                </div>

                {/* Tagline */}
                <p className={`intro-tagline ${phase >= 1 ? 'intro-tagline-in' : ''}`}>
                    Structured AI Intelligence for Students
                </p>

                {/* Progress bar */}
                <div className="intro-bar-wrap">
                    <div className={`intro-bar ${phase >= 2 ? 'intro-bar-fill' : ''}`} />
                </div>

                {/* System boot text */}
                <div className={`intro-boot ${phase >= 2 ? 'intro-boot-in' : ''}`}>
                    <span className="boot-dot" />&nbsp;Initializing discovery engine...
                </div>
            </div>

            {/* Corner decorations */}
            <div className="corner corner-tl" />
            <div className="corner corner-tr" />
            <div className="corner corner-bl" />
            <div className="corner corner-br" />

            {/* Floating particles */}
            {[...Array(12)].map((_, i) => (
                <div key={i} className="intro-particle" style={{
                    left: `${8 + (i * 7.5)}%`,
                    animationDelay: `${i * 0.15}s`,
                    animationDuration: `${2 + (i % 3) * 0.8}s`,
                }} />
            ))}
        </div>
    )
}
