import { aiTools } from '../data/aiTools'

const responses = {
    coding: {
        intro: "Great choice! Here are the top AI tools for **coding and development**:",
        tools: ['GitHub Copilot', 'Cursor', 'Codeium', 'Replit AI', 'Tabnine'],
        tip: "💡 *Pro tip: Start with Codeium (free) and upgrade to GitHub Copilot for team workflows.*",
    },
    writing: {
        intro: "Here are the best AI tools for **writing and content creation**:",
        tools: ['Notion AI', 'Grammarly AI', 'Quillbot', 'Copy.ai', 'Jasper AI'],
        tip: "💡 *Pro tip: Quillbot is ideal for students — it paraphrases and summarizes research papers instantly.*",
    },
    design: {
        intro: "Here are the leading AI tools for **design and image creation**:",
        tools: ['Canva AI', 'Midjourney', 'Adobe Firefly', 'Figma AI', 'DALL·E 3'],
        tip: "💡 *Pro tip: Use Canva AI for quick designs and Midjourney for high-quality art generation.*",
    },
    video: {
        intro: "Here are the top AI tools for **video creation and editing**:",
        tools: ['Runway ML', 'Pika Labs', 'HeyGen', 'Synthesia'],
        tip: "💡 *Pro tip: Runway ML's Gen-2 is the gold standard for text-to-video generation.*",
    },
    audio: {
        intro: "Here are the best AI tools for **audio and voice generation**:",
        tools: ['ElevenLabs', 'Murf AI', 'Suno AI'],
        tip: "💡 *Pro tip: ElevenLabs produces the most human-like voices — perfect for narration and podcasts.*",
    },
    research: {
        intro: "Here are the top AI tools for **research and academic work**:",
        tools: ['Perplexity AI', 'Consensus', 'Elicit', 'Semantic Scholar', 'Wolfram Alpha'],
        tip: "💡 *Pro tip: Perplexity AI for quick answers; Consensus and Elicit for peer-reviewed research.*",
    },
    productivity: {
        intro: "Here are the best AI tools for **productivity and organization**:",
        tools: ['Claude', 'Gemini', 'Notion AI', 'Otter.ai', 'Reclaim AI'],
        tip: "💡 *Pro tip: Claude excels at long-form analysis and reasoning tasks beyond basic chat.*",
    },
    education: {
        intro: "Here are the best AI tools for **learning and education**:",
        tools: ['Khan Academy Khanmigo', 'Socratic by Google', 'Photomath', 'Quillbot'],
        tip: "💡 *Pro tip: Khan Academy's Khanmigo acts as an AI tutor — it guides you without just giving answers.*",
    },
    free: {
        intro: "Here are the best **100% free AI tools** you can use right now:",
        tools: ['Codeium', 'AWS CodeWhisperer', 'Stable Diffusion', 'Socratic by Google', 'Semantic Scholar', 'Khan Academy Khanmigo'],
        tip: "💡 *Pro tip: These tools have no credit card required — perfect for students on a budget.*",
    },
    comparison: {
        intro: "Here's how the top AI assistants compare:",
        tools: ['ChatGPT', 'Claude', 'Gemini', 'Perplexity AI'],
        tip: "💡 *Summary: ChatGPT for general tasks, Claude for long documents, Gemini for Google Workspace, Perplexity for real-time search.*",
    },
}

const keywordMap = [
    { keywords: ['cod', 'programm', 'develop', 'javascript', 'python', 'debug', 'github', 'ide', 'software'], key: 'coding' },
    { keywords: ['writ', 'essay', 'blog', 'content', 'copy', 'grammar', 'paraphras'], key: 'writing' },
    { keywords: ['design', 'image', 'art', 'graphic', 'illustrat', 'figma', 'midjourney', 'logo', 'canva', 'generat'], key: 'design' },
    { keywords: ['video', 'film', 'animat', 'reel', 'cinematic', 'runway', 'synthes'], key: 'video' },
    { keywords: ['audio', 'voice', 'music', 'sound', 'speech', 'podcast', 'eleven'], key: 'audio' },
    { keywords: ['research', 'academic', 'paper', 'study', 'scholar', 'science', 'citation'], key: 'research' },
    { keywords: ['productiv', 'organiz', 'schedule', 'calendar', 'task', 'meeting', 'note'], key: 'productivity' },
    { keywords: ['learn', 'student', 'tutor', 'homework', 'education', 'lesson', 'math', 'school'], key: 'education' },
    { keywords: ['free', 'no cost', 'open source', 'without paying', 'budget'], key: 'free' },
    { keywords: ['vs', 'versus', 'compare', 'difference', 'best ai', 'which ai', 'better'], key: 'comparison' },
]

function matchKeyword(input) {
    const lower = input.toLowerCase()
    for (const { keywords, key } of keywordMap) {
        if (keywords.some(kw => lower.includes(kw))) return key
    }
    return null
}

function getToolDetails(name) {
    return aiTools.find(t => t.name.toLowerCase() === name.toLowerCase())
}

export function getChatResponse(input) {
    const key = matchKeyword(input)

    if (!key) {
        return {
            type: 'general',
            text: `I'm your **X-Mentor AI guide** 🤖\n\nI can help you discover the best AI tools for:\n\n🖥️ **Coding** — GitHub Copilot, Cursor, Codeium\n✍️ **Writing** — Notion AI, Grammarly, Quillbot\n🎨 **Design** — Midjourney, Canva AI, Figma AI\n🎬 **Video** — Runway ML, Pika Labs\n🔍 **Research** — Perplexity, Consensus, Elicit\n📚 **Education** — Khan Academy AI, Socratic\n\nTry asking: *"Best AI tools for coding"* or *"Free design tools"*`,
            tools: [],
        }
    }

    const { intro, tools: toolNames, tip } = responses[key]
    const toolDetails = toolNames.map(name => getToolDetails(name)).filter(Boolean)

    return {
        type: 'structured',
        intro,
        tools: toolDetails,
        tip,
    }
}

export const suggestedPrompts = [
    'Best AI tools for coding',
    'Free design tools for students',
    'AI for writing essays',
    'Best research AI tools',
    'ChatGPT vs Claude vs Gemini',
    'AI video generators',
]
