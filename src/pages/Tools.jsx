import { useState, useMemo, useRef, useEffect } from 'react'
import { Search, SlidersHorizontal, ChevronRight, ChevronLeft } from 'lucide-react'
import ToolCard from '../components/ToolCard'
import { aiTools, categories, pricingOptions } from '../data/aiTools'
import './Tools.css'

function CategoryCarousel({ category, tools, index }) {
    const trackRef = useRef(null)
    const animationRef = useRef(null)
    const [isDragging, setIsDragging] = useState(false)
    const [isHovered, setIsHovered] = useState(false)
    const [startX, setStartX] = useState(0)
    const [scrollLeft, setScrollLeft] = useState(0)
    const autoScrollDir = useRef(index % 2 === 0 ? 1 : -1) // Alternate starting direction: 1 based on Right, -1 based on Left

    if (tools.length === 0) return null;

    const scroll = (dir) => {
        if (trackRef.current) {
            const scrollAmount = trackRef.current.clientWidth * 0.8
            trackRef.current.scrollBy({
                left: dir === 'left' ? -scrollAmount : scrollAmount,
                behavior: 'smooth'
            })
        }
    }

    // Auto-scroll logic via requestAnimationFrame
    useEffect(() => {
        const track = trackRef.current
        if (!track || tools.length <= 3) return // Don't auto-scroll if few items

        const animateScroll = () => {
            if (!isDragging && !isHovered) {
                // Move pixels depending on direction
                track.scrollLeft += autoScrollDir.current * 0.5

                // Bounce behavior at edges
                if (track.scrollLeft <= 0) {
                    autoScrollDir.current = 1 // hit left, go right
                } else if (Math.ceil(track.scrollLeft) >= track.scrollWidth - track.clientWidth) {
                    autoScrollDir.current = -1 // hit right, go left
                }
            }
            animationRef.current = requestAnimationFrame(animateScroll)
        }

        animationRef.current = requestAnimationFrame(animateScroll)

        return () => cancelAnimationFrame(animationRef.current)
    }, [isDragging, isHovered, tools.length])

    // Drag-to-scroll handlers
    const onMouseDown = (e) => {
        setIsDragging(true)
        setStartX(e.pageX - trackRef.current.offsetLeft)
        setScrollLeft(trackRef.current.scrollLeft)
        trackRef.current.style.cursor = 'grabbing'
        trackRef.current.style.scrollBehavior = 'auto' // Disable smooth scroll while dragging
    }

    const onMouseLeave = () => {
        setIsDragging(false)
        if (trackRef.current) {
            trackRef.current.style.cursor = 'grab'
            trackRef.current.style.scrollBehavior = 'smooth'
        }
    }

    const onMouseUp = () => {
        setIsDragging(false)
        if (trackRef.current) {
            trackRef.current.style.cursor = 'grab'
            trackRef.current.style.scrollBehavior = 'smooth'
        }
    }

    const onMouseMove = (e) => {
        if (!isDragging) return
        e.preventDefault()
        const x = e.pageX - trackRef.current.offsetLeft
        const walk = (x - startX) * 2 // Scroll-fast multiplier
        trackRef.current.scrollLeft = scrollLeft - walk
    }

    return (
        <div className="category-section">
            <div className="category-header">
                <h2 className="category-title">{category} Tools</h2>
                <div className="carousel-nav">
                    <button className="carousel-nav-btn" onClick={() => scroll('left')} aria-label="Scroll Left">
                        <ChevronLeft size={20} />
                    </button>
                    <button className="carousel-nav-btn" onClick={() => scroll('right')} aria-label="Scroll Right">
                        <ChevronRight size={20} />
                    </button>
                </div>
            </div>

            {/* Smooth horizontal scrolling container */}
            <div
                className="carousel-track-wrapper"
                ref={trackRef}
                onMouseDown={onMouseDown}
                onMouseLeave={(e) => { onMouseLeave(e); setIsHovered(false); }}
                onMouseEnter={() => setIsHovered(true)}
                onMouseUp={onMouseUp}
                onMouseMove={onMouseMove}
            >
                <div className="carousel-track">
                    {tools.map((tool, i) => (
                        <div className="carousel-item" key={tool.id}>
                            <ToolCard tool={tool} />
                        </div>
                    ))}
                </div>
            </div>
        </div>
    )
}

export default function Tools() {
    const [query, setQuery] = useState('')
    const [activeCategory, setActiveCategory] = useState('All')
    const [activePricing, setActivePricing] = useState('All')

    const filtered = useMemo(() => {
        return aiTools.filter(tool => {
            const matchesQuery =
                query.trim() === '' ||
                tool.name.toLowerCase().includes(query.toLowerCase()) ||
                tool.description.toLowerCase().includes(query.toLowerCase()) ||
                tool.category.toLowerCase().includes(query.toLowerCase())

            const matchesCategory = activeCategory === 'All' || tool.category === activeCategory
            const matchesPricing = activePricing === 'All' || tool.pricing === activePricing

            return matchesQuery && matchesCategory && matchesPricing
        })
    }, [query, activeCategory, activePricing])

    // Group filtered tools by category to render them in carousels
    const toolsByCategory = useMemo(() => {
        const grouped = {}
        // If activeCategory is 'All', split them by their real categories.
        // Otherwise, just stick them all under the selected category so it's one big carousel.
        filtered.forEach(tool => {
            const groupKey = activeCategory === 'All' ? tool.category : activeCategory
            if (!grouped[groupKey]) grouped[groupKey] = []
            grouped[groupKey].push(tool)
        })
        return grouped
    }, [filtered, activeCategory])

    return (
        <main className="tools-page">
            <div className="container">
                {/* Header */}
                <div className="tools-header">
                    <div className="section-label">AI Tools Hub</div>
                    <h1 className="tools-heading">
                        Find the Right <span className="gradient-text">AI Tool</span>
                    </h1>
                    <p className="tools-sub">
                        {aiTools.length} curated tools — hover or touch any card to learn more.
                    </p>
                </div>

                {/* Search */}
                <div className="tools-search-wrap">
                    <Search size={18} className="search-icon" />
                    <input
                        id="tools-search"
                        type="text"
                        className="search-input"
                        placeholder="Search tools, categories, descriptions..."
                        value={query}
                        onChange={e => setQuery(e.target.value)}
                    />
                </div>

                {/* Filters */}
                <div className="tools-filters">
                    <div className="filter-group">
                        <SlidersHorizontal size={14} className="filter-group-icon" />
                        <div className="filter-pills" id="category-filters">
                            {categories.map(cat => (
                                <button
                                    key={cat}
                                    id={`cat-${cat.toLowerCase().replace(' ', '-')}`}
                                    className={`filter-pill ${activeCategory === cat ? 'active' : ''}`}
                                    onClick={() => setActiveCategory(cat)}
                                >
                                    {cat}
                                </button>
                            ))}
                        </div>
                    </div>

                    <div className="filter-group pricing-group">
                        {pricingOptions.map(p => (
                            <button
                                key={p}
                                id={`pricing-${p.toLowerCase()}`}
                                className={`filter-pill pricing-pill ${activePricing === p ? 'active' : ''} ${p !== 'All' ? `pill-${p.toLowerCase()}` : ''}`}
                                onClick={() => setActivePricing(p)}
                            >
                                {p}
                            </button>
                        ))}
                    </div>
                </div>

                {/* Results count */}
                <div className="tools-count">
                    Showing <strong>{filtered.length}</strong> tool{filtered.length !== 1 ? 's' : ''}
                    {activeCategory !== 'All' ? ` in ${activeCategory}` : ''}
                    {activePricing !== 'All' ? ` · ${activePricing}` : ''}
                </div>

                {/* Carousels */}
                {filtered.length > 0 ? (
                    <div className="tools-carousels">
                        {Object.keys(toolsByCategory).map((categoryKey, index) => (
                            <CategoryCarousel
                                key={categoryKey}
                                category={categoryKey}
                                tools={toolsByCategory[categoryKey]}
                                index={index}
                            />
                        ))}
                    </div>
                ) : (
                    <div className="tools-empty animate-fade-up">
                        <span className="empty-emoji">🔍</span>
                        <h3>No tools found</h3>
                        <p>Try adjusting your search or filters to find what you're looking for.</p>
                        <button
                            className="btn-ghost"
                            onClick={() => { setQuery(''); setActiveCategory('All'); setActivePricing('All') }}
                        >
                            Clear Filters
                        </button>
                    </div>
                )}

            </div>
        </main>
    )
}
