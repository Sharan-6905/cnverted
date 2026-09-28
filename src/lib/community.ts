export const SLACK_INVITE_URL =
  "https://join.slack.com/t/cnvrted/shared_invite/zt-4388qsrbr-x~RlkFSChnmWY7JojhV1fA";

export const COMMUNITY_STEPS = [
  { key: "fullName", label: "Full name", placeholder: "Please enter your full name here", autoComplete: "name", type: "text", maxLength: 100, hint: "What should we call you?" },
  { key: "email", label: "Email address", placeholder: "Your email address?", autoComplete: "email", type: "email", maxLength: 254, hint: "Use the email you’ll use for Slack." },
  { key: "company", label: "Business name", placeholder: "Your business name", autoComplete: "organization", type: "text", maxLength: 120, hint: "Working independently? You can write “Independent”." },
  { key: "industry", label: "Business domain", placeholder: "Your business domain?", autoComplete: "off", type: "text", maxLength: 120, hint: "Your industry or field — for example, B2B SaaS, retail, or consulting." },
  { key: "website", label: "Website (optional)", placeholder: "Your website (if any)", autoComplete: "url", type: "text", maxLength: 300, hint: "A company website or portfolio. You can leave this blank." },
] as const;

export type CommunityField = (typeof COMMUNITY_STEPS)[number]["key"];
export type CommunityAnswers = Record<CommunityField, string>;
export const EMPTY_COMMUNITY_ANSWERS: CommunityAnswers = { fullName: "", email: "", company: "", industry: "", website: "" };

export function normalizeWebsite(value: string): string | null {
  if (!value.trim()) return "";
  try {
    const url = new URL(/^https?:\/\//i.test(value.trim()) ? value.trim() : `https://${value.trim()}`);
    if (!["https:", "http:"].includes(url.protocol) || !url.hostname.includes(".") || url.username || url.password || /\s/.test(value)) return null;
    return url.href;
  } catch { return null; }
}

export function communityFieldError(field: CommunityField, value: string): string | undefined {
  const step = COMMUNITY_STEPS.find((item) => item.key === field)!;
  if (value.length > step.maxLength) return `Please keep this under ${step.maxLength} characters.`;
  if (field === "website") return normalizeWebsite(value) === null ? "Enter a valid website, such as cnvrted.com, or leave this blank." : undefined;
  if (field === "email") return /^[^\s@,;<>"']{1,64}@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)+$/.test(value.trim()) ? undefined : "Please enter a valid email address.";
  if (value.trim().length < 2) return `Please enter your ${step.label.toLowerCase()}.`;
}
