import { useState } from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Navbar from './components/Navbar'
import IntroScreen from './components/IntroScreen'
import Landing from './pages/Landing'
import Tools from './pages/Tools'
import Chat from './pages/Chat'
import Feed from './pages/Feed'
import Pomodoro from './pages/Pomodoro'
import GamesFeed from './pages/GamesFeed'

function App() {
    const [showIntro, setShowIntro] = useState(true)

    return (
        <BrowserRouter>
            {showIntro && <IntroScreen onDone={() => setShowIntro(false)} />}
            <Navbar />
            <Routes>
                <Route path="/" element={<Landing />} />
                <Route path="/tools" element={<Tools />} />
                <Route path="/chat" element={<Chat />} />
                <Route path="/feed" element={<Feed />} />
                <Route path="/pomodoro" element={<Pomodoro />} />
                <Route path="/games" element={<GamesFeed />} />
            </Routes>
        </BrowserRouter>
    )
}

export default App
