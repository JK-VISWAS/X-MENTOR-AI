import { brainGames } from '../data/gamesData'
import ToolCard from '../components/ToolCard' // Reuse ToolCard for games

export default function GamesFeed() {
    return (
        <main className="tools-page"> {/* Reusing tools page layout styling */}
            <div className="container">

                <div className="tools-header">
                    <div className="section-label">🧠 Brain IQ Feed</div>
                    <h1 className="tools-heading">
                        Train Your <span className="gradient-text">Mind</span>
                    </h1>
                    <p className="tools-sub">
                        Curated games and apps scientifically designed to improve focus, memory, and cognitive flexibility.
                    </p>
                </div>

                <div className="tools-count">
                    Showing <strong>{brainGames.length}</strong> games
                </div>

                <div className="tools-grid grid-3">
                    {brainGames.map((game, i) => (
                        <div
                            key={game.id}
                            className="animate-fade-up"
                            style={{ animationDelay: `${Math.min(i * 0.1, 0.4)}s` }}
                        >
                            {/* Reuse ToolCard but map properties */}
                            <ToolCard
                                tool={{
                                    ...game,
                                    pricing: game.difficulty, // Hack: show difficulty in pricing badge slot
                                    imagePath: `/images/games/${game.id}.jpg`
                                }}
                            />
                        </div>
                    ))}
                </div>

            </div>
        </main>
    )
}
