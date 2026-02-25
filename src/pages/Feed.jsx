import { useState, useMemo } from 'react'
import { Rss } from 'lucide-react'
import FeedCard from '../components/FeedCard'
import { feedItems, feedCategories } from '../data/feedData'
import './Feed.css'

export default function Feed() {
    const [activeCategory, setActiveCategory] = useState('All')

    const filtered = useMemo(() => {
        if (activeCategory === 'All') return feedItems
        return feedItems.filter(item => item.category === activeCategory)
    }, [activeCategory])

    return (
        <main className="feed-page">
            <div className="container">
                <div className="feed-header">
                    <div className="section-label">
                        <Rss size={12} />
                        Tech Intelligence Feed
                    </div>
                    <h1 className="feed-heading">
                        Stay Ahead of the <span className="gradient-text">Curve</span>
                    </h1>
                    <p className="feed-sub">
                        Curated AI and technology intelligence — updated regularly so students always know what's next.
                    </p>
                </div>

                {/* Category filter */}
                <div className="feed-filters">
                    {feedCategories.map(cat => (
                        <button
                            key={cat}
                            id={`feed-cat-${cat.toLowerCase().replace(/\s+/g, '-')}`}
                            className={`filter-pill ${activeCategory === cat ? 'active' : ''}`}
                            onClick={() => setActiveCategory(cat)}
                        >
                            {cat}
                        </button>
                    ))}
                </div>

                {/* Count */}
                <div className="feed-count">
                    {filtered.length} article{filtered.length !== 1 ? 's' : ''}
                    {activeCategory !== 'All' ? ` in ${activeCategory}` : ''}
                </div>

                {/* Feed grid */}
                <div className="feed-grid">
                    {filtered.map((item, i) => (
                        <FeedCard key={item.id} item={item} delay={Math.min(i * 0.05, 0.3)} />
                    ))}
                </div>
            </div>
        </main>
    )
}
