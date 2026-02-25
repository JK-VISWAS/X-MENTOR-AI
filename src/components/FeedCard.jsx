import { Clock, ArrowRight } from 'lucide-react'
import './FeedCard.css'

const categoryColors = {
    'AI News': 'feed-badge-green',
    'Coding': 'feed-badge-blue',
    'Design': 'feed-badge-purple',
    'Startups': 'feed-badge-orange',
}

export default function FeedCard({ item, delay = 0 }) {
    const { category, title, summary, date, readTime, tag } = item

    return (
        <article
            className="feed-card card animate-fade-up"
            style={{ animationDelay: `${delay}s` }}
        >
            <div className="feed-card-meta">
                <span className={`feed-badge ${categoryColors[category] || 'feed-badge-green'}`}>
                    {category}
                </span>
                <span className="feed-tag">{tag}</span>
            </div>
            <h3 className="feed-title">{title}</h3>
            <p className="feed-summary">{summary}</p>
            <div className="feed-footer">
                <span className="feed-date">{date}</span>
                <span className="feed-read-time">
                    <Clock size={12} />
                    {readTime} read
                </span>
                <button className="feed-read-btn">
                    Read more <ArrowRight size={13} />
                </button>
            </div>
        </article>
    )
}
