export const promptAssistants = [
  { name: "ChatGPT", url: "chatgpt.com", logo: "/brands/openai.svg", greeting: "What can I help with?", placeholder: "Ask anything", accent: "#111111", background: "#ffffff" },
  { name: "Claude", url: "claude.ai/new", logo: "/brands/claude-color.svg", greeting: "How can I help you today?", placeholder: "How can I help you today?", accent: "#b35f3f", background: "#faf9f5" },
  { name: "Gemini", url: "gemini.google.com/app", logo: "/brands/gemini-color.svg", greeting: "Hello, there", placeholder: "Ask Gemini", accent: "#1a73e8", background: "#ffffff" },
  { name: "Grok", url: "grok.com", logo: "/brands/grok.svg", greeting: "What do you want to know?", placeholder: "What do you want to know?", accent: "#18181b", background: "#fbfbfb" },
] as const;

export type Assistant = typeof promptAssistants[number];
