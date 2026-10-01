export const SLACK_INVITE_URL =
  "https://join.slack.com/t/cnvrted/shared_invite/zt-4388qsrbr-x~RlkFSChnmWY7JojhV1fA";

export const COMMUNITY_STEPS = [
  { key: "fullName", label: "Full name", question: "What should we call you?", placeholder: "Your full name", autoComplete: "name", type: "text", maxLength: 100, hint: "The name you’d like the community to know." },
  { key: "email", label: "Email address", question: "Where can we reach you?", placeholder: "you@company.com", autoComplete: "email", type: "email", maxLength: 254, hint: "Use the email you’ll use for Slack." },
  { key: "company", label: "Business name", question: "Who are you building with?", placeholder: "Your company name", autoComplete: "organization", type: "text", maxLength: 120, hint: "Working independently? Just write “Independent”." },
  { key: "industry", label: "Industry", question: "What’s your corner of the world?", placeholder: "e.g. B2B SaaS", autoComplete: "off", type: "text", maxLength: 120, hint: "Your industry or field, from retail to consulting." },
  { key: "website", label: "Website (optional)", question: "Where can we see your work?", placeholder: "yourcompany.com", autoComplete: "url", type: "text", maxLength: 300, hint: "A website or portfolio. Feel free to skip this one." },
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
