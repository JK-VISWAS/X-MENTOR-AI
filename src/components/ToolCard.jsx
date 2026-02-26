import { ExternalLink, Image as ImageIcon } from 'lucide-react'
import './ToolCard.css'

const categoryColors = {
    Coding: 'badge-blue',
    Writing: 'badge-purple',
    Design: 'badge-pink',
    Video: 'badge-orange',
    Audio: 'badge-teal',
    Productivity: 'badge-green',
    Research: 'badge-yellow',
    Education: 'badge-red',
}

const pricingColors = {
    Free: 'pricing-free',
    Freemium: 'pricing-freemium',
    Paid: 'pricing-paid',
}

export default function ToolCard({ tool }) {
    const { id, name, category, pricing, description, emoji, url } = tool

    // The space for the student to upload JPGs. 
    // They just need to place their images in `<project_root>/public/images/tools/1.jpg`, etc.
    const imagePath = tool.imagePath || `/images/tools/${id}.jpg`
    const imageName = imagePath.split('/').pop()
    const fallbackFolder = window.location.pathname.includes('games') ? 'public/images/games' : 'public/images/tools'

    return (
        <div className="tool-card card">

            {/* ── Image Space ── */}
            <div className="tool-img-box">
                <img
                    src={imagePath}
                    alt={name}
                    className="tool-img"
                    onError={(e) => {
                        // If the user hasn't uploaded the image yet, show the fallback space
                        e.target.style.display = 'none'
                        e.target.nextElementSibling.style.display = 'flex'
                    }}
                />
                {/* Placeholder shown if image is missing */}
                <div className="tool-img-fallback">
                    <ImageIcon size={32} />
                    <span style={{ fontSize: '0.8rem', textAlign: 'center' }}>Upload {imageName} <br /> to {fallbackFolder}</span>
                </div>

                {/* Badges layered over the image */}
                <div className="tool-badges">
                    <span className={`badge ${categoryColors[category] || 'badge-green'}`}>{category}</span>
                    <span className={`pricing-badge ${pricingColors[pricing]}`}>{pricing}</span>
                </div>
            </div>

            {/* ── Base details (always visible) ── */}
            <div className="tool-content-base">
                <h3 className="tool-name">
                    <span className="tool-emoji">{emoji}</span>
                    {name}
                </h3>
            </div>

            {/* ── Hover Overlay (revealed on touch/hover) ── */}
            <div className="tool-card-overlay">
                <div className="overlay-content">
                    <h3 className="overlay-title">{emoji} {name}</h3>
                    <p className="overlay-desc">{description}</p>
                    <a
                        href={url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="btn-primary overlay-btn"
                        onClick={e => e.stopPropagation()}
                    >
                        Visit Tool <ExternalLink size={14} />
                    </a>
                </div>
            </div>

        </div>
    )
}
