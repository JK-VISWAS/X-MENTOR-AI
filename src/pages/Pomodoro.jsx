import { useState, useEffect } from 'react'
import { Play, Pause, RotateCcw, Monitor, Coffee, Moon } from 'lucide-react'
import './Pomodoro.css'

export default function Pomodoro() {
    const [timeLeft, setTimeLeft] = useState(25 * 60)
    const [isRunning, setIsRunning] = useState(false)
    const [mode, setMode] = useState('work') // 'work', 'short', 'long'

    const modes = {
        work: { label: 'Focus', time: 25 * 60, icon: <Monitor size={18} /> },
        short: { label: 'Short Break', time: 5 * 60, icon: <Coffee size={18} /> },
        long: { label: 'Long Break', time: 15 * 60, icon: <Moon size={18} /> },
    }

    useEffect(() => {
        let interval = null
        if (isRunning && timeLeft > 0) {
            interval = setInterval(() => setTimeLeft(t => t - 1), 1000)
        } else if (timeLeft === 0) {
            setIsRunning(false)
            // Play a sound could happen here
        }
        return () => clearInterval(interval)
    }, [isRunning, timeLeft])

    const formatTime = (seconds) => {
        const m = Math.floor(seconds / 60)
        const s = seconds % 60
        return `${m.toString().padStart(2, '0')}:${s.toString().padStart(2, '0')}`
    }

    const switchMode = (newMode) => {
        setMode(newMode)
        setTimeLeft(modes[newMode].time)
        setIsRunning(false)
    }

    const resetTimer = () => {
        setTimeLeft(modes[mode].time)
        setIsRunning(false)
    }

    const progress = ((modes[mode].time - timeLeft) / modes[mode].time) * 100

    return (
        <main className="pomo-page">
            <div className="container pomo-container">

                <div className="pomo-card card">
                    <div className="pomo-glow" />

                    <h1 className="pomo-heading">X-Mentor Timer</h1>

                    <div className="pomo-modes">
                        {Object.keys(modes).map(m => (
                            <button
                                key={m}
                                className={`pomo-mode-btn ${mode === m ? 'active' : ''}`}
                                onClick={() => switchMode(m)}
                            >
                                {modes[m].icon}
                                {modes[m].label}
                            </button>
                        ))}
                    </div>

                    <div className="pomo-display">
                        {/* SVG Progress Ring */}
                        <svg className="pomo-ring" viewBox="0 0 100 100">
                            <circle className="ring-bg" cx="50" cy="50" r="45" />
                            <circle
                                className="ring-progress"
                                cx="50" cy="50" r="45"
                                style={{ strokeDashoffset: 283 - (283 * progress) / 100 }}
                            />
                        </svg>
                        <div className="pomo-time">{formatTime(timeLeft)}</div>
                    </div>

                    <div className="pomo-controls">
                        <button className="btn-primary pomo-play" onClick={() => setIsRunning(!isRunning)}>
                            {isRunning ? <Pause size={20} /> : <Play size={20} />}
                            {isRunning ? 'Pause' : 'Start'}
                        </button>
                        <button className="btn-ghost pomo-reset" onClick={resetTimer}>
                            <RotateCcw size={20} />
                        </button>
                    </div>
                </div>

            </div>
        </main>
    )
}
