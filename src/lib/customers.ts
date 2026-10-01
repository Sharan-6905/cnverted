export interface Customer {
  name: string;
  file: string;
  width: number;
  height: number;
  category?: string;
  description?: string;
  website?: string;
}

// Names and artwork confirmed by the team. Introductions summarize the linked
// company pages; they do not claim customer-specific Cnvrted results.
export const CUSTOMERS: readonly Customer[] = [
  {
    name: "11FPS",
    file: "client-fps.png",
    width: 115,
    height: 115,
    category: "Film & creative",
    description:
      "An AI-native film studio in Bangalore, taking stories from the first idea to the final frame.",
    website: "https://www.11fps.com/",
  },
  {
    name: "SpinaBot",
    file: "client-symbol.png",
    width: 125,
    height: 125,
    category: "AI & automation",
    description:
      "A platform for building AI chatbots, voice agents, and automated business workflows.",
    website: "https://www.spinabot.com/",
  },
  {
    name: "Curato",
    file: "client-curato.png",
    width: 133,
    height: 120,
  },
  {
    name: "Buziness365",
    file: "client-365.png",
    width: 104,
    height: 120,
    category: "Business technology",
    description:
      "Business software, AI products, and automation tools that connect everyday operations.",
    website: "https://www.buziness365.com/",
  },
  {
    name: "Techscape AI",
    file: "client-abstract.png",
    width: 116,
    height: 116,
    category: "AI services",
    description:
      "Custom AI agents, business automation, and technology training for teams putting AI to work.",
    website: "https://techscapeai.in/",
  },
  {
    name: "Social Tag",
    file: "client-social-tag.png",
    width: 116,
    height: 116,
    category: "Influencer marketing",
    description:
      "Connects brands with creators through influencer campaigns, brand strategy, and talent management.",
    website: "https://www.linkedin.com/company/socialtag-india/",
  },
  {
    name: "Bahari Services",
    file: "client-bahari.svg",
    width: 216,
    height: 116,
  },
  {
    name: "Sonet Solutions",
    file: "client-sonet.png",
    width: 1000,
    height: 350,
    category: "IT infrastructure",
    description:
      "Designs and supports networking, security, data-centre, and audiovisual infrastructure.",
    website: "https://www.sonetsolutions.in/",
  },
];
